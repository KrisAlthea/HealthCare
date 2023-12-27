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

