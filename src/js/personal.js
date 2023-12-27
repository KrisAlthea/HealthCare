import config from "./config.js";
import {fetchUserInfo, request} from "./main.js";

document.addEventListener('DOMContentLoaded', function () {
    const trophies = document.querySelectorAll('.trophy');

    trophies.forEach(trophy => {
        trophy.addEventListener('mouseenter', function () {
            const tooltipText = this.getAttribute('data-tooltip');
            const tooltip = document.createElement('div');
            tooltip.classList.add('tooltip');
            tooltip.textContent = tooltipText;

            document.body.appendChild(tooltip);
            const tooltipWidth = tooltip.offsetWidth;

            // 计算并设置工具提示的位置
            const rect = this.getBoundingClientRect();
            tooltip.style.position = 'absolute';
            tooltip.style.left = `${rect.left + window.scrollX + (rect.width / 2) - (tooltipWidth / 2)}px`;
            tooltip.style.top = `${rect.bottom + window.scrollY + 10}px`; // 10px是奖杯与工具提示之间的间距
        });

        trophy.addEventListener('mouseleave', function () {
            const tooltip = document.querySelector('.tooltip');
            if (tooltip) {
                document.body.removeChild(tooltip);
            }
        });
    });
});

// 退出登录
document.addEventListener('DOMContentLoaded', function() {
    const logoutButton = document.querySelector('.logout-button');
    if (logoutButton) {
        logoutButton.addEventListener('click', async function() {
            const result = await request(config.logoutUrl, {
                method: 'POST'
            });

            if (result === 0) {
                alert('注销成功');
                window.location.href = 'login.html'; // 注销后重定向到登录页面
            } else {
                alert('注销失败');
            }
        });
    }
});


// 更新用户名和头像
async function updateUserInfo() {
    const userInfo = await fetchUserInfo();
    if (userInfo) {
        // 更新用户名
        const userNameElement = document.querySelector('.profile h2');
        if (userNameElement) {
            userNameElement.textContent = userInfo.username;
        }

        // 更新头像URL
        const userAvatarElement = document.querySelector('.profile img');
        if (userAvatarElement) {
            userAvatarElement.src = userInfo.avatarUrl;
        }
    }
}

updateUserInfo();


document.addEventListener('DOMContentLoaded', function () {
    const updateHealthDataButton = document.querySelector('.update-health-data-button');
    const updateHealthDataForm = document.querySelector('.update-health-data-form');
    const cancelButton = document.querySelector('.cancel-button');
    const form = document.getElementById('health-data-form');
    const submitButton = form.querySelector('button[type="submit"]');

    // 显示或隐藏更新健康数据的表单
    updateHealthDataButton.addEventListener('click', function() {
        updateHealthDataForm.style.display = 'block';
    });

    // 隐藏表单
    cancelButton.addEventListener('click', function() {
        updateHealthDataForm.style.display = 'none';
    });

    // // 表单输入事件处理，检查至少一个字段是否已填写
    // form.addEventListener('input', function() {
    //     let isAnyFieldFilled = Array.from(form.querySelectorAll('input')).some(input => input.value.trim() !== '');
    //     submitButton.disabled = !isAnyFieldFilled;
    // });

    // 表单提交事件处理
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        // 收集表单数据
        const data = {
            steps: form.steps.value,
            calories: form.calories.value,
            activityTime: form.activityTime.value,
            sleepDuration: form.sleepDuration.value,
            sleepTime: form.sleepTime.value,
            wakeTime: form.wakeTime.value,
            heartRate: form.heartRate.value,
            bloodPressure: form.bloodPressure.value,
            bloodOxygen: form.bloodOxygen.value
        };

        console.log('提交的健康数据:', data);
        alert('健康数据已提交');
        // 这里可以添加发送数据到服务器的代码
        updateHealthDataForm.style.display = 'none';
    });
});
