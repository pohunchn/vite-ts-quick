/**
 * 网络请求基类
 * @author PHCS
 * @author orzi!<zz@pohun.com>
 */

export default class NetBase {

    private config = {} as NetBaseConfig

    constructor(config: NetBaseConfig) {
        for (let key in config) {
            this.config[key as keyof NetBaseConfig] = config[key as keyof NetBaseConfig]
        }
    }

    async post<T>(url: string, params: NetParams = {}): Promise<T> {
        url = this.config.baseUrl  + url;
        return NetBase.spost<T>(url, params, this.config)
    }

    async get<T>(url: string, params: NetParams = {}): Promise<T> {
        url = this.config.baseUrl + url;
        return NetBase.sget(url, params, this.config);
    }

    static create(config: NetBaseConfig) {
        return new NetBase(config);
    }

    static async spost<T>(url: string, params: NetParams = {}, config?: NetConfig): Promise<T> {
        let _config: NetQueryConfig = {
            method: 'POST',
            body: NetBase.getParams(params),
            mode: config?.mode || "cors",
            credentials: config?.credentials || "include",
            headers: config?.headers || {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }
        if (_config.headers["Content-Type"] === "application/x-www-form-urlencoded") {
            _config.body = NetBase.params2Params(_config.body)
        }
        return NetBase.request<T>(url, _config, params, config as NetBaseConfig);
    }

    static async sget<T>(url: string, params: NetParams = {}, config?: NetConfig): Promise<T> {
        let _config: NetQueryConfig = {
            method: "GET",
            mode: config?.mode || "cors",
            credentials: config?.credentials || "include"
        }
        let _params: AnyObject = NetBase.getParams(params);
        url = NetBase.params2GetUrl(url, _params);
        return NetBase.request<T>(url, _config, params, config as NetBaseConfig)
    }

    static async sput<T>(url: string, params: NetParams = {}, config?: NetConfig): Promise<T> {
        let _config: NetQueryConfig = {
            method: 'PUT',
            body: NetBase.getParams(params),
            mode: config?.mode || "cors",
            credentials: config?.credentials || "include",
            headers: config?.headers || {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }
        if (_config.headers["Content-Type"] === "application/x-www-form-urlencoded") {
            _config.body = NetBase.params2Params(_config.body)
        }
        return NetBase.request<T>(url, _config, params, config as NetBaseConfig);
    }

    static async sdelete<T>(url: string, params: NetParams = {}, config?: NetConfig): Promise<T> {
        let _config: NetQueryConfig = {
            method: 'DELETE',
            body: NetBase.getParams(params),
            mode: config?.mode || "cors",
            credentials: config?.credentials || "include",
            headers: config?.headers || {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }
        if (_config.headers["Content-Type"] === "application/x-www-form-urlencoded") {
            _config.body = NetBase.params2Params(_config.body)
        }
        return NetBase.request<T>(url, _config, params, config as NetBaseConfig);
    }

    /** 获取请求数据（私有） */
    private static getParams(obj: NetParams): AnyObject {
		var param: AnyObject = {};
		for (var key in obj) {
			if (!['_success', '_fail', '_complete'].includes(key)) param[key] = obj[key];
		}
		return param;
    }

    private static params2Params(obj: AnyObject | string): string {
        if (typeof obj == "string") obj = JSON.parse(obj) as AnyObject;
        let params: string[] = []
        for (let key in obj) {
            // 过滤空数据
            if (obj[key] === null || obj[key] === undefined) continue;
            let value = obj[key];
            // 如果为数组或对象就格式化为 json字符串
            if (typeof value === "object") value = JSON.stringify(value);
            params.push(encodeURIComponent(key)+'='+encodeURIComponent(String(value)));
        }
        return params.join("&");
    }

    private static params2GetUrl(url: string, obj: AnyObject | string): string {
        let sparam = this.params2Params(obj);
        let and: string = "?";
        if (url.includes("?")) and = "&";
        sparam = sparam ? and+sparam : "";
        return url+sparam;
    }

    private static getWithUrl(url: string, args: any[]): string {
        const extraPath = args
            .filter(arg => arg !== null && arg !== undefined)
            .map(arg => encodeURIComponent(String(arg)))
            .join("/");
        return extraPath ? url + "/" + extraPath : url;
    }

    private static async requestText<T>(res: Response, params: NetParams, baseConfig?: NetBaseConfig): Promise<T> {
        return res.text()
            .then(text => {
                let result: string | T = text as T;
                if (baseConfig?.baseSuccess) result = baseConfig.baseSuccess(result) || result;
                if (baseConfig?.baseComplete) baseConfig.baseComplete(result);
                if (params._success) params._success(result);
                if (params._complete) params._complete(result);
                return result as T;
            })
            .catch(err => {
                if (baseConfig?.baseFail) err = baseConfig.baseFail(err) || err;
                if (baseConfig?.baseComplete) baseConfig.baseComplete(err);
                if (params._fail) params._fail(err);
                if (params._complete) params._complete(err);
                throw err;
            })
    }

    private static async request<T>(url: string, config: NetConfig, params: NetParams, baseConfig?: NetBaseConfig): Promise<T> {
        return new Promise<T>((resolve: (value: T) => void, reject: (reason?: any) => void) => {
            fetch(url, config)
                .then(res=> {
                    if (res.ok) {
                        const contentType = res.headers.get("content-type") || "";
                        if (baseConfig?.canNoJson && !contentType.includes("application/json")) {
                            NetBase.requestText<T>(res, params, baseConfig)
                                .then(resolve)
                                .catch(reject);
                            return;
                        }
                        res.json()
                            .then(json => {
                                if (baseConfig?.baseSuccess) json = baseConfig.baseSuccess(json) || json;
                                if (baseConfig?.baseComplete) baseConfig.baseComplete(json);
                                if (params._success) params._success(json);
                                if (params._complete) params._complete(json);
                                resolve(json);
                            })
                            .catch(err => {
                                if (baseConfig?.canNoJson) {
                                    NetBase.requestText<T>(res, params, baseConfig)
                                        .then(resolve)
                                        .catch(reject);
                                } else {
                                    if (baseConfig?.baseFail) err = baseConfig.baseFail(err) || err;
                                    if (baseConfig?.baseComplete) baseConfig.baseComplete(err);
                                    if (params._fail) params._fail(err);
                                    if (params._complete) params._complete(err);
                                    reject(err);
                                }
                            })
                    } else {
                        if (baseConfig?.baseFail) res = baseConfig.baseFail(res) || res;
                        if (baseConfig?.baseComplete) baseConfig.baseComplete(res);
                        if (params._fail) params._fail(res);
                        if (params._complete) params._complete(res);
                        reject(res);
                    }
                })
                .catch(res => {
                    if (baseConfig?.baseFail) res = baseConfig.baseFail(res) || res;
                    if (baseConfig?.baseComplete) baseConfig.baseComplete(res);
                    if (params._fail) params._fail(res);
                    if (params._complete) params._complete(res);
                    reject(res);
                })
        })
    }

    /**
     * 创建接口代理对象，支持链式调用，如 api.user.get._self() 对应 GET /user，api.user.post._self() 对应 POST /user
     * @param baseUrl 
     * @returns 
     */
    static createApi<T>(baseUrl: string = ""): T {
        const createProxy = (...names: string[]) => new Proxy((...args: any) => {
            let _path: string[] = [];
            let method = "GET";
            let specialType = ""; // download, multipartPost, etc.

            // Allowed methods and special types
            const methods = ["GET", "POST", "PUT", "DELETE"];
            const specialTypes = [
                "DOWNLOAD",
                "MULTIPARTPOST",
                "STREAM",
                "GETWITHURL",
                "POSTWITHURL",
            ];

            for (const name of names) {
                const upperName = name.toUpperCase();
                if (methods.includes(upperName)) {
                    method = upperName;
                } else if (specialTypes.includes(upperName)) {
                    specialType = upperName;
                } else {
                    _path.push(name);
                }
            }

            // 如果最后一条路径是 _self 则代表不需要它，直接去掉它
            if (_path[_path.length - 1] === "_self") _path.pop();

            // Build URL
            const urlPath = _path.join("/");

            // Dispatch based on method/type
            // if (specialType === "DOWNLOAD") {
            //     return NetBase.download(baseUrl + "/" + urlPath, args[0], args[1]);
            // }
            // if (specialType === "MULTIPARTPOST") {
            //     return NetBase.multipartPost(baseUrl + "/" + urlPath, args[0], args[1]);
            // }
            if (specialType === "GETWITHURL") {
                // arguments are part of the URL
                return NetBase.sget(NetBase.getWithUrl(baseUrl + "/" + urlPath, args));
            }
            if (specialType === "POSTWITHURL") {
                return NetBase.spost(NetBase.getWithUrl(baseUrl + "/" + urlPath, args));
            }

            // Standard methods
            switch (method) {
                case "POST":
                    return NetBase.spost(baseUrl + "/" + urlPath, args[0]);
                case "PUT":
                    return NetBase.sput(baseUrl + "/" + urlPath, args[0]);
                case "DELETE":
                    return NetBase.sdelete(baseUrl + "/" + urlPath, args[0]);
                case "GET":
                default:
                    return NetBase.sget(baseUrl + "/" + urlPath, args[0]);
            }
        }, {
            get(target: any, p: string) {
                if (p === "then") return undefined;
                if (!target[p]) {
                    target[p] = createProxy(...names, p);
                }
                return target[p];
            }
        });

        return createProxy() as T;
    }

    /** 网络请求/上传文件 */
    // static async postFile(obj: NetParams): Promise<any> {
    //     if (!Core.config && obj.url !== '/static/json/config.json') {
    //         obj.__isFile = true;
    //         NetBase._postarr.push(obj);
    //         return;
    //     }
	// 	let formData;
	// 	if (obj.form) {
	// 		formData = new FormData(obj.form);
	// 	} else {
	// 		formData = new FormData();
	// 	}
    //     let url = obj.url || Core.URL_API;
    //     url += obj.s ? '' + obj.s : '';
	// 	let params = NetBase._getPostParams(obj);
    //     // formData.append(JSON.stringify(params));
    //     for (let key in params) {
    //         formData.append(key, params[key]);
    //     }
    //     if (obj.file) formData.append('file', obj.file)
    //     // formData.append('file', 'test')
    //     let _obj = {
    //         method: obj._method || 'POST',
    //         // body: formData,
    //         body: formData,
    //         mode: "cors",
    //         credentials: obj._credentials || "include",
    //         headers: {
    //             // "enctype": "multipart/form-data"
    //             // 'Access-Control-Allow-Origin': '*'
    //             // 'Content-Type':'application/x-www-form-urlencoded'
    //         }
    //     }
    //     return NetBase.request(url, _obj, obj);
    // }

}