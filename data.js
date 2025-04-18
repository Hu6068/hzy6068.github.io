let examData = localStorage.getItem('examData')
  ? JSON.parse(localStorage.getItem('examData'))
  : [];

function saveData() {
  localStorage.setItem('examData', JSON.stringify(examData));
}

function getAllData() {
  return examData;
}
