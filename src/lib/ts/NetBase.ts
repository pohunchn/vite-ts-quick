/**
 * 网络请求基类
 * @author PHCS
 * @author 子不语<zz@pohun.com>
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
        // 拦截器，但是为什么要拦截？
        // config = config as NetBaseConfig;
        // _config = config.Interceptor && config.Interceptor.post ? config.Interceptor.post(_config) || _config;
        if (_config.headers["Content-Type"] === "application/x-www-form-urlencoded") {
            _config.body = NetBase.params2Params(_config.body)
        }
        // _config = NetBase.interceptor.post(_config);
        return NetBase.request<T>(url, _config, params, config as NetBaseConfig);
    }

    static async sget<T>(url: string, params: NetParams = {}, config?: NetConfig): Promise<T> {
        let _config: NetQueryConfig = {
            method: "GET",
            mode: config?.mode || "cors"
        }
        let _params: AnyObject = NetBase.getParams(params);
        url = NetBase.params2GetUrl(url, _params);
        // 拦截器，但是为什么要拦截？
        // config = config as NetBaseConfig;
        // _config = config.Interceptor && config.Interceptor.get ? config.Interceptor.get(_config) || _config;
        return NetBase.request<T>(url, _config, params, config as NetBaseConfig)
    }

    // static interceptor = {
    //     post: ((config: (config: NetConfig) => {})): NetConfig => { return config },
    //     get: (config: NetConfig): NetConfig => { return config },
    // }

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
            // 如果为数组或对象就格式化为 json字符串
            if (typeof obj[key] === "object") obj[key] = JSON.stringify(obj[key]);
            // 过滤空数据
            if (obj[key] === null || obj[key] === undefined) continue;
            params.push(key+'='+obj[key]);
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

    private static async request<T>(url: string, config: NetConfig, params: NetParams, baseConfig?: NetBaseConfig): Promise<T> {
        return new Promise<T>((resolve: (value: T) => void, reject: (reason?: any) => void) => {
            fetch(url, config)
                .then(res=> {
                    if (res.status === 200) {
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
                                    res.text()
                                        .then(text => {
                                            if (baseConfig?.baseSuccess) baseConfig.baseSuccess(text);
                                            if (baseConfig?.baseComplete) baseConfig.baseComplete(text);
                                            if (params._success) params._success(text);
                                            if (params._complete) params._complete(text);
                                            resolve(text as any);
                                        })
                                        .catch(err => {
                                            if (baseConfig?.baseFail) err = baseConfig.baseFail(err) || err;
                                            if (baseConfig?.baseComplete) baseConfig.baseComplete(err);
                                            if (params._fail) params._fail(err);
                                            if (params._complete) params._complete(err);
                                            reject(err);
                                        })
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