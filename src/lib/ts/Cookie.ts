/**
 * COOKIE 类
 * @author PHCS
 * @author 子不语<zz@pohun.com>
 */

export default class Cookie {

    static set(cname: string, cvalue: string|number, time:number, domain = "") {
        var d = new Date();
        time += 28800;
        time *= 1000;
        d.setTime(d.getTime() + (time));
        // var expires = "expires="+ d.toGMTString();
        var expires = "expires="+ d.toUTCString();
        let cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
        if (domain) cookie += ';domain='+domain;
        document.cookie = cookie;
    }

    static get(cname: string) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for(var i = 0; i <ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
         }
        return "";
    }

    static clear(name: string = "", domain: string = "") {
        Cookie.set(name, '', -1, domain);
    }

}