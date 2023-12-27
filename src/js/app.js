// ===============================================
// 注意：每个页面刷新和加载时都会执行一次该文件！
// ===============================================

import config from './config.js';
import {request} from "./main.js";

// 检查用户是否登录
async function checkUserLoggedIn() {
    return request(config.loginStateUrl, {
        method: 'GET'
    });
}

// 在页面加载时检查用户是否登录
document.addEventListener('DOMContentLoaded', async () => {
    const isLoggedIn = await checkUserLoggedIn();
    const currentPath = window.location.pathname;
    const loginPagePath = '/login.html'; // 根据实际情况修改登录页面的路径

    if (!isLoggedIn) {
        if (currentPath !== loginPagePath) {
            alert("请先登录！");
            window.location.href = 'login.html'; // 未登录且当前不是登录页面，重定向到登录页面
        }
    } else {
        if (currentPath === loginPagePath) {
            window.location.href = 'index.html'; // 已登录且当前是登录页面，重定向到首页
        }
    }
});


