import config from './config.js';

// 通用的请求函数
export async function request(url, options = {}) {
    try {
        const response = await fetch(url, {
            credentials: 'include', // 默认包含凭证
            ...options,             // 允许覆盖或添加额外的选项
        });
        if (!response.ok) {
            throw new Error('网络请求失败');
        }
        return await response.json();
    } catch (error) {
        console.error('请求错误:', error);
        return null;
    }
}

// 从后端获取用户数据
export async function fetchUserInfo() {
    return request(config.fetchUserInfoUrl, {
        method: 'GET'
    });
}



