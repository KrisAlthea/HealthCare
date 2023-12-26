import config from './config.js';

// 从后端获取用户数据
export async function fetchUserInfo() {
    try {
        const response = await fetch(config.fetchUserInfoUrl);  // 从后端获取用户信息
        if (!response.ok) {
            throw new Error('请求失败');
        }
        return await response.json();
    } catch (error) {
        console.error('Unable to fetch user info:', error);
        return null;
    }
}
