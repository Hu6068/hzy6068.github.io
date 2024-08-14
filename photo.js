// script.js
document.addEventListener('DOMContentLoaded', function() {
  var currentIndex = 0;
  var slides = document.querySelectorAll('.slide');
  var carouselInner = document.querySelector('.carousel-inner');
  var slideWidth = carouselInner.clientWidth;

  function showSlide(index) {
    // 隐藏所有图片
    slides.forEach(function(slide) {
      slide.classList.remove('active');
    });

    // 显示当前图片
    slides[index].classList.add('active');

    // 计算并设置轮播容器的偏移量
    carouselInner.style.transform = 'translateX(-' + index * slideWidth + 'px)';
    currentIndex = index;
  }

  function moveToNext() {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
  }

  // 自动播放
  setInterval(moveToNext, 3000); // 每隔3秒切换图片
});

