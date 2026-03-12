/**
 * 全局方法类基类
 * @author PHCS
 * @author Orzi!<zz@pohun.com>
 */

import Cookie from './Cookie';
import NetBase from './NetBase';
import Storage from './Storage';

const IS_DEV = process.env.NODE_ENV == 'development'

export default class Base {

    static IS_DEV = IS_DEV;

    static NetBase = NetBase
    static Cookie = Cookie
    static Storage = Storage

    /**
     * 浅拷贝数据
     * @param data
     */
    static shallowClone<T>(data: T): T {
        return JSON.parse(JSON.stringify(data));
    }

    /**
     * 深拷贝数据
     * @param data 
     * @returns 
     */
    static deepClone<T>(data: T): T {
        const cloneObj = (obj: AnyObject) => {
            let _obj: AnyObject = {};
            for (let key in obj) {
                _obj[key] = Base.deepClone(obj[key]);
            }
            return _obj;
        }
        const cloneArr = <R>(arr: R[]): R[] => {
            let _arr: R[] = [];
            for (let i = 0; i < arr.length; i++) {
                _arr.push(Base.deepClone(arr[i]));
            }
            return _arr;
        }
        if (typeof data === 'object') {
            if (data === null) return data;
            if (Array.isArray(data)) return cloneArr(data) as T;
            return cloneObj(data) as T;
        }
        return data;
    }
    
}
