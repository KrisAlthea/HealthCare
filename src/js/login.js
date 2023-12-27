import config from './config.js';
import {request} from "./main.js";

document.getElementById('register-btn').addEventListener('click', function() {
    // 动态添加确认密码输入框
    var confirmPasswordContainer = document.getElementById('confirm-password-container');
    confirmPasswordContainer.innerHTML = '<input type="password" class="input-field" name="confirmPassword" placeholder="确认密码" required>';

    // 更新按钮高亮状态
    this.classList.add('active');
    document.getElementById('login-btn').classList.remove('active');

    // 更改提交按钮文字为"注册"，并调整表单action属性
    document.querySelector('.submit-button').innerText = '注册';
    document.getElementById('form').action = '/register';
});

document.getElementById('login-btn').addEventListener('click', function() {
    // 移除确认密码输入框
    var confirmPasswordContainer = document.getElementById('confirm-password-container');
    confirmPasswordContainer.innerHTML = '';

    // 更新按钮高亮状态
    this.classList.add('active');
    document.getElementById('register-btn').classList.remove('active');

    // 更改提交按钮文字为"登录"，并调整表单action属性
    document.querySelector('.submit-button').innerText = '登录';
    document.getElementById('form').action = '/login';
});

// 处理登录/注册表单提交
document.getElementById('form').addEventListener('submit', async function(event) {
    event.preventDefault(); // 阻止表单默认提交行为

    const isLogin = document.getElementById('login-btn').classList.contains('active');
    const url = isLogin ? config.loginUrl : config.registerUrl;

    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries());

    if (!isLogin) {
        const password = formData.get('password');
        const confirmPassword = formData.get('confirmPassword');

        // 检查确认密码是否一致
        if (password !== confirmPassword) {
            alert('两次输入的密码不一致！');
            return;
        }

        data.checkPassword = confirmPassword; // 为注册操作添加确认密码
    }

    try {
        const responseData = await request(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (isLogin) {
            // 登录操作
            if (responseData) {
                alert('登录成功');
                window.location.href = 'index.html'; // 跳转到首页
            } else {
                alert('登录失败');
            }
        } else {
            // 注册操作
            if (responseData === -1) {
                // 注册失败
                alert('注册失败，用户名不能重复或有特殊字符！');
            } else {
                // 注册成功
                alert('注册成功，用户ID：' + responseData);
                document.getElementById('login-btn').click(); // 注册成功后自动切换到登录页面
            }
        }
    } catch (error) {
        console.error('请求错误', error);
        alert(isLogin ? '登录请求错误' : '注册请求错误');
    }
});
