/**
 * 全局方法类基类
 * @author PHCS
 * @author 子不语<zz@pohun.com>
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

    /** 复制对象或数组 */
    static cloneObjOrArr(obj: object) {
        let a = JSON.stringify(obj);
        let b = JSON.parse(a);
        return b;
    }
    
}
