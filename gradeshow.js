const scores = JSON.parse(localStorage.getItem('scores')) || [];

// 初始化图表配置
let totalChart, subjectChart;

document.addEventListener('DOMContentLoaded', () => {
    initCharts();
    updateTable();
});

function initCharts() {
    // 总分趋势图
    totalChart = new Chart(document.getElementById('totalScoreChart'), {
        type: 'line',
        data: {
            labels: scores.map(s => s.examDate),
            datasets: [{
                label: '总分',
                data: scores.map(s => s.totalScore),
                borderColor: '#3e95cd',
                fill: false
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: { title: { display: true, text: '考试日期' } },
                y: { title: { display: true, text: '分数' } }
            }
        }
    });

    // 各科趋势图
    subjectChart = new Chart(document.getElementById('subjectScoreChart'), {
        type: 'line',
        data: {
            labels: scores.map(s => s.examDate),
            datasets: [
                { label: '语文', data: scores.map(s => s.chinese), borderColor: '#ff9f40' },
                { label: '数学', data: scores.map(s => s.math), borderColor: '#ff4136' },
                { label: '英语', data: scores.map(s => s.english), borderColor: '#8e5ea2' },
                { label: '物理', data: scores.map(s => s.physics), borderColor: '#3cba9f' },
                { label: '化学', data: scores.map(s => s.chemistry), borderColor: '#e8c3b9' },
                { label: '生物', data: scores.map(s => s.biology), borderColor: '#c45850' }
            ]
        },
        options: {
            responsive: true,
            scales: {
                y: { min: 0 }
            }
        }
    });
}

function updateCharts() {
    // 更新总分图表
    totalChart.data.labels = scores.map(s => s.examDate);
    totalChart.data.datasets[0].data = scores.map(s => s.totalScore);
    totalChart.update();

    // 更新科目图表
    subjectChart.data.labels = scores.map(s => s.examDate);
    subjectChart.data.datasets.forEach((dataset, i) => {
        const subjects = ['chinese', 'math', 'english', 'physics', 'chemistry', 'biology'];
        dataset.data = scores.map(s => s[subjects[i]]);
    });
    subjectChart.update();
}

// 表格更新
function updateTable() {
    const tableBody = document.querySelector('#scoreTable tbody');
    tableBody.innerHTML = '';
    scores.forEach(score => {
        const row = `
            <tr>
                <td>${score.examDate}</td>
                <td>${score.chinese}</td>
                <td>${score.math}</td>
                <td>${score.english}</td>
                <td>${score.physics}</td>
                <td>${score.chemistry}</td>
                <td>${score.biology}</td>
                <td>${score.totalScore}</td>
                <td>${score.classRank}</td>
                <td>${score.gradeRank}</td>
            </tr>
        `;
        tableBody.insertAdjacentHTML('beforeend', row);
    });
}

// 表单提交处理
document.getElementById('addScoreForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const newScore = {
        examDate: document.getElementById('examDate').value,
        chinese: parseFloat(document.getElementById('chineseScore').value),
        math: parseFloat(document.getElementById('mathScore').value),
        english: parseFloat(document.getElementById('englishScore').value),
        physics: parseFloat(document.getElementById('physicsScore').value),
        chemistry: parseFloat(document.getElementById('chemistryScore').value),
        biology: parseFloat(document.getElementById('biologyScore').value),
        totalScore: 
            document.getElementById('chineseScore').valueAsNumber +
            document.getElementById('mathScore').valueAsNumber +
            document.getElementById('englishScore').valueAsNumber +
            document.getElementById('physicsScore').valueAsNumber +
            document.getElementById('chemistryScore').valueAsNumber +
            document.getElementById('biologyScore').valueAsNumber,
        classRank: parseInt(document.getElementById('classRank').value),
        gradeRank: parseInt(document.getElementById('gradeRank').value)
    };

    scores.push(newScore);
    localStorage.setItem('scores', JSON.stringify(scores));

    // 重置表单
    document.getElementById('addScoreForm').reset();

    // 更新图表和表格
    updateCharts();
    updateTable();
});
