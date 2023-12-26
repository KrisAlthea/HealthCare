import config from './config.js';

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

// 实现了简单的注册以及登录跳转，具体细节 TODO
document.getElementById('form').addEventListener('submit', async function(event) {
    event.preventDefault(); // 阻止表单默认提交行为

    const isLogin = document.getElementById('login-btn').classList.contains('active');
    const url = isLogin ? config.loginUrl : config.registerUrl

    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries());
    if (!isLogin) {
        data.checkPassword = formData.get('confirmPassword'); // 为注册操作添加确认密码
    }
    // 以 JSON 格式获取后端响应
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        // 如果获取到响应 200(ok)，表示请求成功
        if (response.ok) {
            const responseData = await response.json();
            if (isLogin) {
                alert('登录成功');
                window.location.href = 'index.html'; // 跳转到首页
            } else {
                alert('注册成功，用户ID: ' + responseData);
            }
        } else {
            alert('请求失败: ' + response.status);
        }
    } catch (error) {
        console.error('请求错误', error);
    }
});