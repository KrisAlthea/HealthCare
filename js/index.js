import {fetchUserInfo} from "./main.js";

// 修改用户数据
async function displayUserData() {
    const userData = await fetchUserInfo();
    if (userData) {
        document.getElementById('basic-info').innerHTML = `
            <h2>基本信息</h2>
            <ul>
                <li>步数: ${userData.steps}</li>
                <li>卡路里: ${userData.calories}</li>
                <li>运动时间: ${userData.exerciseTime}分钟</li>
            </ul>
        `;

        // 更新睡眠信息
        const sleepStartFormatted = formatTime(userData.sleepStartTime);
        const sleepEndFormatted = formatTime(userData.sleepEndTime);
        document.getElementById('sleep-info').innerHTML = `
            <h2>睡眠</h2>
            <ul>
                <li>时长: ${userData.sleepDuration}分钟</li>
                <li>入睡时间: ${sleepStartFormatted}</li>
                <li>醒来时间: ${sleepEndFormatted}</li>
            </ul>
        `;

        // 更新其他信息
        document.getElementById('other-info').innerHTML = `
            <h2>其他</h2>
            <ul>
                <li>心率: ${userData.heartRate} bpm</li>
                <li>血压: ${userData.bloodPressure} mmHg</li>
                <li>血氧: ${userData.bloodOxygen}%</li>
            </ul>
        `;
    }
}

// 格式化睡眠时间
function formatTime(timeString) {
    const time = new Date(timeString);
    let hours = time.getHours().toString().padStart(2, '0');
    let minutes = time.getMinutes().toString().padStart(2, '0');
    let seconds = time.getSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
}

// 执行函数
displayUserData();
