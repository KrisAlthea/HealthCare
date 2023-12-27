import { fetchUserInfo } from "./main.js";

document.addEventListener('DOMContentLoaded', function() {
    // 页面加载时，只显示加载动画
    showLoadingAnimation();

    // 获取用户数据
    displayUserData();
});

// 修改用户数据
async function displayUserData() {
    const userData = await fetchUserInfo();

    // 获取到数据后隐藏加载动画并显示所有卡片内容
    hideLoadingAnimation();
    if (userData) {
        // 更新卡片内容
        updateCardContents(userData);
    }
}

// 更新卡片内容
function updateCardContents(userData) {
    // 基本信息
    document.getElementById('basic-info').innerHTML = getBasicInfoHTML(userData);
    // 睡眠信息
    document.getElementById('sleep-info').innerHTML = getSleepInfoHTML(userData);
    // 其他信息
    document.getElementById('other-info').innerHTML = getOtherInfoHTML(userData);

    // 显示所有卡片内容
    showCards();
}

// 显示所有卡片内容
function showCards() {
    document.getElementById('basic-info').style.display = 'block';
    document.getElementById('sleep-info').style.display = 'block';
    document.getElementById('other-info').style.display = 'block';
    document.getElementById('health-goals').style.display = 'block';
    document.getElementById('family-health-updates').style.display = 'block';
}

// 显示加载动画
function showLoadingAnimation() {
    const dots = document.querySelectorAll('.dot');
    dots.forEach(dot => dot.style.visibility = 'visible');
    document.getElementById('loader').style.display = 'flex';
    // 隐藏所有卡片内容
    hideCards();
}


// 隐藏所有卡片内容
function hideCards() {
    document.getElementById('basic-info').style.display = 'none';
    document.getElementById('sleep-info').style.display = 'none';
    document.getElementById('other-info').style.display = 'none';
    document.getElementById('health-goals').style.display = 'none';
    document.getElementById('family-health-updates').style.display = 'none';
}

// 隐藏加载动画
function hideLoadingAnimation() {
    document.getElementById('loader').style.display = 'none';
}

// 获取基本信息的HTML
function getBasicInfoHTML(userData) {
    return `
        <h2>基本信息</h2>
        <ul>
            <li>👣步数: ${userData.steps} 步</li>
            <li>🔥卡路里: ${userData.calories} kcal</li>
            <li>🕘运动时间: ${userData.exerciseTime} 分钟</li>
        </ul>
    `;
}

// 获取睡眠信息的HTML
function getSleepInfoHTML(userData) {
    const sleepStartFormatted = formatTime(userData.sleepStartTime);
    const sleepEndFormatted = formatTime(userData.sleepEndTime);
    return `
        <h2>睡眠</h2>
        <ul>
            <li>⏲️时长: ${userData.sleepDuration} 分钟</li>
            <li>💤入睡时间: ${sleepStartFormatted}</li>
            <li>⏰醒来时间: ${sleepEndFormatted}</li>
        </ul>
    `;
}

// 获取其他信息的HTML
function getOtherInfoHTML(userData) {
    return `
        <h2>其他</h2>
        <ul>
            <li>💓心率: ${userData.heartRate} bpm</li>
            <li>🌡️血压: ${userData.bloodPressure} mmHg</li>
            <li>📏血氧: ${userData.bloodOxygen}%</li>
        </ul>
    `;
}

// 格式化睡眠时间
function formatTime(timeString) {
    const time = new Date(timeString);
    let hours = time.getHours().toString().padStart(2, '0');
    let minutes = time.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
}

// 执行函数
displayUserData();
