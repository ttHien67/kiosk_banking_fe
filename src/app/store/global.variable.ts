import { base64DecodeUnicode, base64EncodeUnicode } from "../utils/convert.util";


export class GlobalVariable {

    private static authenticationData = {
        currentUser: null,
    };

    public static setAuth(payload: any) {
        this.authenticationData = payload;
        sessionStorage.setItem('remember', base64EncodeUnicode(JSON.stringify(payload)));
    }

    public static getAuth() {
        return this.authenticationData;
    }

    public static restoreAuth() {
        if (sessionStorage.getItem('remember')) {
            this.authenticationData = JSON.parse(base64DecodeUnicode(sessionStorage.getItem('remember')));
            return this.authenticationData;
        }
        return null;
    }

    public static clearVariables() {
        this.authenticationData = {
            currentUser: null,
        };
        sessionStorage.removeItem('remember');
        sessionStorage.removeItem('X-Token');
        sessionStorage.removeItem('ID');
        this.deleteCookie('numberOfTabs');
        this.deleteCookie('lastTime');
    }

    public static getCookie(name: any) {
        if (!name) {
            return null;
        }
        const nameEQ = name + '=';
        const ca = document.cookie.split(';');
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1, c.length);
            }
            if (c.indexOf(nameEQ) === 0) {
                return c.substring(nameEQ.length, c.length);
            }
        }
        return null;
    }

    public static deleteCookie(name: any) {
        this.setCookie(name, '', -1);
    }

    public static setCookie(name: any, value: any, days: any) {
        let expires = '';
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = '; expires=' + date.toUTCString();
        }
        document.cookie = name + '=' + value + expires + '; path=/';
    }

}

