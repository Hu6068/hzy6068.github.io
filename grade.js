// script.js
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('scoreForm');
    let allScores = JSON.parse(localStorage.getItem('scores')) || [];

    // 初始化图表
    initializeCharts(allScores);

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(form);
        const newEntry = Object.fromEntries(formData.entries());
        
        allScores.push(newEntry);
        localStorage.setItem('scores', JSON.stringify(allScores));
        
        initializeCharts(allScores);
        form.reset();
    });

    function initializeCharts(data) {
        const labels = data.map(item => item.examDate);
        
        // 总分走势图
        const totalChart = new Chart(document.getElementById('totalScoreChart'), {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: '总分',
                    data: data.map(item => item.totalScore),
                    borderColor: '#28a745',
                    fill: false
                }]
            },
            options: {
                responsive: true
            }
        });

        // 总分班级排名
        const classRankChart = new Chart(document.getElementById('classRankChart'), {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: '班级排名',
                    data: data.map(item => item.classRank),
                    borderColor: '#007bff',
                    fill: false
                }]
            },
            options: {
                responsive: true
            }
        });

        // 科目平均分
        const subjectNames = ['语文', '数学', '英语', '物理', '化学', '生物'];
        const subjectScores = subjectNames.map(subject => {
            const scores = data.map(item => item[subject.toLowerCase()]);
            return {
                label: subject,
                data: scores,
                borderColor: getRandomColor()
            };
        });

        new Chart(document.getElementById('subjectScoreChart'), {
            type: 'line',
            data: {
                labels: labels,
                datasets: subjectScores
            },
            options: {
                responsive: true
            }
        });

        // 科目排名
        const subjectRanks = subjectNames.map(subject => {
            const key = `${subject.toLowerCase()}Rank`;
            const ranks = data.map(item => item[key]);
            return {
                label: subject,
                data: ranks,
                borderColor: getRandomColor()
            };
        });

        new Chart(document.getElementById('subjectRankChart'), {
            type: 'line',
            data: {
                labels: labels,
                datasets: subjectRanks
            },
            options: {
                responsive: true
            }
        });
    }

    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
});
