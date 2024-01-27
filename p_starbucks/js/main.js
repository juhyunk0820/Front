const searchEl = document.querySelector('.search');
const searchInputEl = document.querySelector('.search input');
// searchInputEl = searchEl.querySelector('input')
searchEl.addEventListener('click', function () {
  //Logic
  searchInputEl.focus();
}); //search요소에 이벤트를 추가

searchInputEl.addEventListener('focus', function () {
  searchEl.classList.add('focused');
  searchInputEl.setAttribute('placeholder', '통합검색'); //Attribute = Html 속성 -> 속성 지정
});
searchInputEl.addEventListener('blur', function () {
  searchEl.classList.remove('focused');
  searchInputEl.setAttribute('placeholder', ''); //Attribute = Html 속성 -> 속성 지정
});

const badgeEl = document.querySelector('header .badges');
const toTopEl = document.querySelector('#to-top');
//window = 창 -> 객체
window.addEventListener('scroll', _.throttle(function() {
  console.log(window.scrollY);
  //scroll 시 많은 양의 코드가 실행될 수 있음 -> throttle 이라는 함수를 통해 
  //많은 양의 코드에 부하를 주어서 조금씩만 나올 수 있게 만듦. => 일정 시간에 한 번씩만 실행되도록 제한(0.3초)
  //throttle 은 scroll 같은 것을 사용할 때 많이 사용 -> 부하 방지
  if (window.scrollY > 500) {
    //배지 숨기기
    // badgeEl.style.display = 'none';
    // gsap.to(요소, 지속시간, 옵션);
    gsap.to(badgeEl, .6, {
      opacity: 0,
      display: 'none',
    });
    gsap.to(toTopEl,.2, {
      x: 0,
    });
  }
  else {
    //배지 보이기
    // badgeEl.style.display = 'block';
    gsap.to(badgeEl, .6, {
      opacity: 1,
      display: 'block',
    });
    //버튼 숨기기
    gsap.to(toTopEl,.2, {
      x: 100,

    });
  }
}, 300));
// _.throttle(함수, 시간)


toTopEl.addEventListener('click', function() {
  gsap.to(window, 0.7, {
    scrollTo: 0
  });
});

const fadeEls = document.querySelectorAll('.visual .fade-in');
fadeEls.forEach(function(fadeEl, index) {
  // gsap.to(요소, 지속시간, 옵션)
  gsap.to(fadeEl, 1, {
    delay: (index + 1) * 0.7, //순차적으로 0.7초씩 애니메이션 실행
    opacity: 1,
  });
});


//Swiper //슬라이드 애니메이션
const swiper = new Swiper('.notice-line .swiper', {
  direction: 'vertical', //방향
  loop: true,
  autoplay: true,

}); //생성자
new Swiper('.promotion .swiper', {
  direction: 'horizontal',
  slidesPerView: 3, //한번에 보여줄 슬라이드 개수
  spaceBetween: 10,
  centeredSlides: true, //1번 슬라이드가 가운데 보이기
  loop: true,
  autoplay: {
    delay: 3500, //시간 설정 => 3.5초
  },
  pagination: {
    el: '.promotion .swiper-pagination', //페이지 번호 요소 선택자
    clickable: true,
  },
  navigation: {
    prevEl: '.promotion .swiper-prev',
    nextEl: '.promotion .swiper-next',
  }
});

//다중슬라이드
new Swiper('.awards .swiper', {
  //direction: 'horizontal', => 기본값
  loop: true,
  autoplay: true,
  spaceBetween: 30,
  slidesPerView: 5,
  navigation: {
    prevEl: '.awards .swiper-prev',
    nextEl: '.awards .swiper-next',
  }
});


const promotionEl = document.querySelector('.promotion');
const promotionToggleBtn = document.querySelector('.toggle-promotion');
let isHidePromotion = false; //처음 상태는 숨김처리 -> 클릭 시부터 바뀜
promotionToggleBtn.addEventListener('click', function() {
  isHidePromotion = !isHidePromotion;
  if (isHidePromotion) {
    // 숨김처리

    promotionEl.classList.add('hide');
  }
  else {
    // 보임처리

    promotionEl.classList.remove('hide');
  }
});
function random(min, max) {
  // `.toFixed()`를 통해 반환된 '문자 데이터'를,
  // `parseFloat()`을 통해 소수점을 가지는 '숫자 데이터'로 변환
  return parseFloat((Math.random() * (max - min) + min).toFixed(2))
}
// 부유하는(떠 다니는) 요소를 만드는 함수
function floatingObject(selector, delay, size) {
  gsap.to(
    selector, // 선택자
    random(1.5, 2.5), // 애니메이션 동작 시간
    {
      delay: random(0, delay), // 얼마나 늦게 애니메이션을 시작할 것인지 지연 시간을 설정.
      x: size,
      y: size, // `transform: translateY(수치);`와 같음. 수직으로 얼마나 움직일지 설정.
      repeat: -1, // 몇 번 반복하는지를 설정, `-1`은 무한 반복.
      yoyo: true, // 한번 재생된 애니메이션을 다시 뒤로 재생.
      ease: Power1.easeInOut // Easing 함수 적용.
    }
  )
}
floatingObject('.floating1', 1, 15)
floatingObject('.floating2', .5, 15)
floatingObject('.floating3', 1.5, 20)

const spyEls = document.querySelectorAll('section.scroll-spy');
spyEls.forEach(function (spyEl) {
  new ScrollMagic.Scene({
    triggerElement: spyEl, //보여짐 여부를 감시할 요소를 지정
    triggerHook: .8, // 어떤 지점에서 감시되었다는 것을 판단 == 해당 부분이 보이면 trigger

  }).setClassToggle(spyEl, 'show').addTo(new ScrollMagic.Controller()); /*사용자 화면에 보여질 때 구현할 기능들을 위해
  사용자에게 보여지는 지 확인할 수 있는 메서드
  => 화면에 보여질 때 애니메이션을 실행할 수 있음*/
//ScrollMagic.Controller -> ScrollMagic에서 기본적으로 추가한 옵션들을
//내부의 컨트롤러의 내용을 할당해서 실제로 동작할 수 있는 구조를 만들어 주는 용도
});


//페이지 상단 이동