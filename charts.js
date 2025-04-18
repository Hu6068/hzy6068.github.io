// 图表配置对象
const CHART_CONFIG = {
    type: 'line',
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: { 
                ticks: { color: '#666' },
                title: { display: true, text: '月考名称' }
            },
            y: {
                min: 0,
                ticks: { color: '#666' },
                title: { display: true, text: '分数' }
            }
        },
        plugins: {
            legend: { position: 'top' },
            tooltip: { enabled: true }
        },
        interaction: {
            intersect: false
        }
    },
    plugins: [Chart.SmoothLine]
};

// 初始化分数趋势图
function initScoreChart() {
    const data = getStoredData();
    const labels = data.map(item => item.examName);
    const datasets = [
        { label: '总分', data: data.map(item => item.totalScore), borderColor: '#e74c3c', tension: 0.4 },
        { label: '语文', data: data.map(item => item.chinese), borderColor: '#2ecc71', tension: 0.4 },
        { label: '数学', data: data.map(item => item.math), borderColor: '#3498db', tension: 0.4 },
        { label: '英语', data: data.map(item => item.english), borderColor: '#f1c40f', tension: 0.4 },
        { label: '物理', data: data.map(item => item.physics), borderColor: '#8e44ad', tension: 0.4 },
        { label: '化学', data: data.map(item => item.chemistry), borderColor: '#e67e22', tension: 0.4 },
        { label: '生物', data: data.map(item => item.biology), borderColor: '#2c3e50', tension: 0.4 }
    ];
    const config = {...CHART_CONFIG, data: { labels, datasets }};
    new Chart(document.getElementById('scoreChart'), config);
}

// 初始化科目分数对比图（简化为示例）
function initSubjectChart() { /* 同上 */ }

// 初始化排名对比图（反转Y轴）
function initTotalRankChart() {
    const data = getStoredData();
    const labels = data.map(item => item.examName);
    const datasets = [
        { label: '班级排名', data: data.map(item => item.totalClassRank), borderColor: '#e74c3c', tension: 0.4 },
        { label: '年级排名', data: data.map(item => item.totalGradeRank), borderColor: '#3498db', tension: 0.4 }
    ];
    const config = {
        ...CHART_CONFIG,
        options: {
            ...CHART_CONFIG.options,
            scales: {
                y: {
                    min: 0,
                    max: 100, // 假设班级最大100人
                    reversed: true,
                    ticks: { color: '#666' }
                }
            }
        },
        data: { labels, datasets }
    };
    new Chart(document.getElementById('totalRankChart'), config);
}
