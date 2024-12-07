// 设置目标日期
const targetDate = new Date("2024-12-31T16:00:00Z").getTime();

// 更新倒计时
function updateCountdown() {
    // 获取今天的日期和时间
    const now = new Date().getTime();
    
    // 计算距离目标日期的差值
    const distance = targetDate - now;

    // 计算天数、小时数、分钟数和秒数
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // 更新HTML元素
    document.getElementById("days").innerHTML = days;
    document.getElementById("hours").innerHTML = hours;
    document.getElementById("minutes").innerHTML = minutes;
    document.getElementById("seconds").innerHTML = seconds;

    // 如果倒计时结束
    if (distance < 0) {
        clearInterval(intervalId);
        document.getElementById("countdown").innerHTML = "已经结束!";
    }
}

// 每隔一秒更新一次倒计时
const intervalId = setInterval(updateCountdown, 1000);

// 首次加载页面时立即更新
updateCountdown();

