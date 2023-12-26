const config = {
    apiUrl: 'http://localhost:8080/api',
    timeout: 5000,
    loginEndpoint: '/user/login',
    registerEndpoint: '/user/register',
    fetchUserInfoEndpoint: '/user/current',
    adviceEndpoint: '/advice',

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
    get fetchUserInfoUrl() {
        return `${this.apiUrl}${this.fetchUserInfoEndpoint}`;
    },
    get adviceUrl() {
        return `${this.apiUrl}${this.adviceEndpoint}`;
    }
};

export default config;