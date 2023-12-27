import config from "./config.js";
import {request} from "./main.js";

// 从后端获取健康建议
async function fetchHealthAdvice() {
    return request(config.adviceUrl, {
        method: 'GET'
    });
}

// 显示健康建议
async function displayHealthAdvice() {
    // 显示加载动画
    document.querySelectorAll('.loading-animation').forEach(el => el.style.display = 'block');

    const healthAdvice = await fetchHealthAdvice();

    if (healthAdvice) {
        // 更新文章
        const articlesContent = document.getElementById('articles-content');
        articlesContent.innerHTML = healthAdvice.articles.map(article => `
            <div class="article">
                <h3><a href="${article.url}" target="_blank">📙${article.title}</a></h3>
                <p>${article.outline}</p>
            </div>
        `).join('');

        // 更新问答互动
        const qaContent = document.getElementById('qa-content');
        qaContent.innerHTML = healthAdvice.qa.map(qa => `
            <div class="qa">
                <p><span class="qa-prefix">Q:</span> ${qa.question}</p>
                <p><span class="qa-prefix">A:</span> ${qa.answer}</p>
            </div>
        `).join('');

        // 更新小贴士
        const tipsContent = document.getElementById('tips-content');
        tipsContent.innerHTML = healthAdvice.tips.map(tip => `
            <p>✅${tip.content}</p>
        `).join('');

        // 隐藏加载动画
        document.querySelectorAll('.loading-animation').forEach(el => el.style.display = 'none');
    } else {
        // 如果没有获取到健康建议，可以在这里处理错误或显示一个消息
        document.querySelectorAll('.loading-animation').forEach(el => el.textContent = '加载失败');
    }
}

displayHealthAdvice();
