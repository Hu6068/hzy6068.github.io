function initCharts() {
  const data = getAllData();
  if (!data.length) return;

  // 分数图表初始化
  createScoreChart(data);
  // 排名图表初始化
  createRankChart(data, '总分班级排名');
}

function createScoreChart(data) {
  const ctx = document.getElementById('score-chart').getContext('2d');
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: data.map(d => d.examName),
      datasets: [{
        label: '分数',
        data: data.map(d => d.total),
        borderColor: '#007bff',
        tension: 0.4,
        pointRadius: 6
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

function createRankChart(data, selectedRank) {
  const ctx = document.getElementById('rank-chart').getContext('2d');
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: data.map(d => d.examName),
      datasets: [{
        label: selectedRank,
        data: data.map(d => d[selectedRank]),
        borderColor: '#28a745',
        tension: 0.4,
        pointRadius: 6
      }]
    },
    options: {
      scales: {
        y: {
          reverse: true,
          beginAtZero: true
        }
      }
    }
  });
}

function updateScoreChart(e) {
  const selected = e.target.value;
  const data = getAllData();
  const ctx = document.getElementById('score-chart').getContext('2d');
  ctx.canvas.parentNode.replaceChild(ctx.canvas, ctx.canvas);
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: data.map(d => d.examName),
      datasets: [{
        label: selected,
        data: data.map(d => d[selected]),
        borderColor: '#007bff',
        tension: 0.4,
        pointRadius: 6
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

function updateRankChart(e) {
  const selected = e.target.value;
  const data = getAllData();
  const ctx = document.getElementById('rank-chart').getContext('2d');
  ctx.canvas.parentNode.replaceChild(ctx.canvas, ctx.canvas);
  createRankChart(data, selected);
}
