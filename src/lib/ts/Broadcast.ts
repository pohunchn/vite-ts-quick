/**
 * 广播基类
 * @author PHCS
 * @author orzi!<zz@pohun.com>
 */

class BroadcastClass {
	private _name: string;
	private _BroadcastChannel: BroadcastChannel | null = null;
	private _callback: Map<string, Map<Function, number>>;
	private _func = (event: any) => {
		if (!_broadcastMap.has(this._name) || this._callback.size === 0) {
			return;
		}
		// detail 为 dispatchEvent 广播，data 为 BroadcastChannel 广播
		// 跨页面不会有 dispatchEvent 广播
		if (event.data) {
			this._push(event.data);
		}
		// 同页面不会有 BroadcastChannel 广播
		if (event.detail) {
			this._push(event.detail);
		}
	};
	private _push = (data: { type: string; data: any[] }) => {
		let _cs = this._callback.get(data.type);
		if (_cs) {
			for (let key of _cs.keys()) {
				for (let i = 0; i < _cs.get(key)!; i++) {
					key(...data.data);
				}
			}
		}
	};

	constructor(name: string) {
		this._callback = new Map();
		this._name = name;
		this._BroadcastChannel = new BroadcastChannel(name);

		window.addEventListener(name, this._func);
		this._BroadcastChannel.onmessage = this._func;
	}

	send(type: string, ...args: any) {
		let _event = new CustomEvent(this._name, {
			detail: {
				type: type,
				data: [...args],
			},
		});
		window.dispatchEvent(_event);
		_broadcastMap.get(this._name)!._BroadcastChannel?.postMessage({
			type: type,
			data: [...args],
		});
		_event = null as any;
	}

	on(type: string, callback: (...args: any) => void) {
		if (this._callback.has(type)) {
			if (this._callback.get(type)!.has(callback)) {
				this._callback
					.get(type)!
					.set(callback, this._callback.get(type)!.get(callback)! + 1);
			} else this._callback.get(type)!.set(callback, 1);
		} else {
			this._callback.set(type, new Map());
			this._callback.get(type)!.set(callback, 1);
		}
		return () => {
			this.off(type, callback);
		};
	}

	once(type: string, callback: (...args: any) => void) {
		let _callback = (...args: any) => {
			callback(...args);
			this.off(type, _callback);
		};
		if (!this._callback.has(type)) {
			this._callback.set(type, new Map());
		}
		this._callback.get(type)!.set(_callback, 1);
	}

	off(type: string, callback: (...args: any) => void) {
		if (this._callback.has(type) && this._callback.get(type)!.has(callback)) {
			this._callback.get(type)!.delete(callback);
			if (this._callback.get(type)!.size === 0) {
				this._callback.delete(type);
			}
		}
	}

	close() {
		window.removeEventListener(this._name, this._func);
		this._BroadcastChannel?.close();
		_broadcastMap.delete(this._name);
	}

	getCallbackLen() {
		return this._callback.size;
	}
}

export function createBroadcast<T = { [key: string]: (...args: any) => any }>(
  name: string = "__IBroadcast__",
): BroadcastManager<T> {
  // 没有就创建
  if (!_broadcastMap.has(name)) {
    _broadcastMap.set(name, new BroadcastClass(name));
  }
  let createProxy = (...types: string[]) =>
    new Proxy(
      (...args: any) => {
        let _types = JSON.parse(JSON.stringify(types));
        let _type = _types.pop();
        let _path = _types.join(".");
        switch (_type) {
          case "send":
            return _broadcastMap.get(name)!.send(_path, ...args);
          case "on":
          case "once":
          case "off":
            return (_broadcastMap.get(name)! as any)[_type](_path, args[0]);
          default:
            break;
        }
      },
      {
        get(target: any, p: string, receiver) {
          if (p === "then") return undefined;
          if (!target[p]) {
            target[p] = createProxy(...types, p);
          }
          return target[p];
        },
      },
    );
  return createProxy() as any;
}

let _broadcastMap = new Map<string, BroadcastClass>();
