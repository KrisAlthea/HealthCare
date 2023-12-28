const config = {
    apiUrl: 'http://localhost:8080/api',
    timeout: 5000,
    loginEndpoint: '/user/login',
    registerEndpoint: '/user/register',
    loginStateEndpoint: '/user/loginstate',
    logoutEndpoint: '/user/logout',
    fetchUserInfoEndpoint: '/user/current',
    updateInfoEndpoint: '/user/updatehealthdata',
    adviceEndpoint: '/advice/get',

    /*
     在外部文件中调用示例：
     1. 先引入：import config from '../js/config.js';
     2. const loginUrl = config.loginUrl;
     */
    get loginUrl() {
        return `${this.apiUrl}${this.loginEndpoint}`;
    },
    get registerUrl() {
        return `${this.apiUrl}${this.registerEndpoint}`;
    },
    get loginStateUrl() {
        return `${this.apiUrl}${this.loginStateEndpoint}`;
    },
    get logoutUrl() {
        return `${this.apiUrl}${this.logoutEndpoint}`;
    },
    get fetchUserInfoUrl() {
        return `${this.apiUrl}${this.fetchUserInfoEndpoint}`;
    },
    get updateInfoUrl() {
        return `${this.apiUrl}${this.updateInfoEndpoint}`;
    },
    get adviceUrl() {
        return `${this.apiUrl}${this.adviceEndpoint}`;
    }
};

export default config;