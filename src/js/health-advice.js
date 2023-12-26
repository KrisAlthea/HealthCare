import config from "./config";

// 从后端获取健康建议
async function fetchHealthAdvice() {
    try {
        const response = await fetch(config.adviceUrl);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Unable to fetch health advice:', error);
        return null;
    }
}

// 显示健康建议
async function displayHealthAdvice() {
    const healthAdvice = await fetchHealthAdvice();
    if (healthAdvice) {
        // 更新文章
        const articlesContainer = document.querySelector('.articles');
        articlesContainer.innerHTML = healthAdvice.articles.map(article => `
            <div class="article">
                <h3><a href="${article.url}" target="_blank">${article.title}</a></h3>
                <p>${article.outline}</p>
            </div>
        `).join('');

        // 更新问答互动
        const qaContainer = document.querySelector('.q-and-a');
        qaContainer.innerHTML = healthAdvice.qa.map(qa => `
            <div class="qa">
                <p><span class="qa-prefix">Q:</span> ${qa.question}</p>
                <p><span class="qa-prefix">A:</span> ${qa.answer}</p>
            </div>
        `).join('');

        // 更新小贴士
        const tipsContainer = document.querySelector('.tips');
        tipsContainer.innerHTML = healthAdvice.tips.map(tip => `
            <p>${tip.content}</p>
        `).join('');
    }
}

displayHealthAdvice();

