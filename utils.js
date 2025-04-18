// 数据存储相关
function getStoredData() {
    return JSON.parse(localStorage.getItem('examData') || '[]');
}

function saveData(e) {
    e.preventDefault();
    const form = e.target;
    const exam = {
        examName: form.examName.value,
        totalScore: parseInt(form.totalScore.value),
        chinese: parseInt(form.chinese.value),
        math: parseInt(form.math.value),
        english: parseInt(form.english.value),
        physics: parseInt(form.physics.value),
        chemistry: parseInt(form.chemistry.value),
        biology: parseInt(form.biology.value),
        // 排名数据需补充逻辑生成（示例）
        totalClassRank: 25,
        totalGradeRank: 120
    };
    const data = getStoredData();
    data.push(exam);
    localStorage.setItem('examData', JSON.stringify(data));
    form.reset();
    loadDataTable(); // 刷新列表
}

// 数据表格渲染
function loadDataTable() {
    const table = document.getElementById('dataTable').querySelector('tbody');
    table.innerHTML = '';
    const data = getStoredData();
    data.forEach(item => {
        const row = table.insertRow();
        row.innerHTML = `
            <td>${item.examName}</td>
            <td>${item.totalScore}</td>
            <td>
                <button onclick="removeData('${item.examName}')" class="gov-btn-red">删除</button>
            </td>
        `;
    });
}

function removeData(examName) {
    const data = getStoredData().filter(item => item.examName !== examName);
    localStorage.setItem('examData', JSON.stringify(data));
    loadDataTable();
}
