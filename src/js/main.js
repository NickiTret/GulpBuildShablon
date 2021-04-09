import Swiper from 'swiper';



let countDisplay = document.querySelector('.number__quantity');
let incrementButton = document.querySelector('.btn__quantity');
let dicrementButton = document.querySelector('.btn__quantity-plus');

function incrementCount() {
    let currentCount = parseInt(countDisplay.textContent);
    countDisplay.textContent = currentCount + 1;

};

function dicrementCount() {
    let currentCount = parseInt(countDisplay.textContent);
    countDisplay.textContent = currentCount - 1;

};

incrementButton.addEventListener('click', dicrementCount);
dicrementButton.addEventListener('click', incrementCount);




function getTimeRemaining(endtime) {
    var t = Date.parse(endtime) - Date.parse(new Date());
    var seconds = Math.floor((t / 1000) % 60);
    var minutes = Math.floor((t / 1000 / 60) % 60);
    var hours = Math.floor((t / (1000 * 60 * 60)) % 24);

    return {
        total: t,
        hours: hours,
        minutes: minutes,
        seconds: seconds
    };
}

function initializeClock(id, endtime) {
    var clock = document.getElementById(id);
    var hoursSpan = clock.querySelector(".hours");
    var minutesSpan = clock.querySelector(".minutes");
    var secondsSpan = clock.querySelector(".seconds");

    function updateClock() {
        var t = getTimeRemaining(endtime);

        if (t.total <= 0) {
            clearInterval(timeinterval);
            var deadline = new Date(Date.parse(new Date()) + 6 * 1000);
            initializeClock('countdown', deadline);
        }

        hoursSpan.innerHTML = ("0" + t.hours).slice(-2);
        minutesSpan.innerHTML = ("0" + t.minutes).slice(-2);
        secondsSpan.innerHTML = ("0" + t.seconds).slice(-2);
    }

    updateClock();
    var timeinterval = setInterval(updateClock, 1000);
}

var deadline = new Date(Date.parse(new Date()) + 1000 * 1000);
initializeClock("countdown", deadline);


let mySwiper = new Swiper('.slider-block', {
    slidesPerView: 1,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    observer: true,
    observeParents: true,
    parallax: true,
})

const maxItems = 5;
const sliderNavItems = document.querySelectorAll('.slider-nav__item');
const sliderNav = document.querySelector('.slider-nav');

sliderNavItems.forEach((el, index) => {
    el.setAttribute('data-index', index);

    el.addEventListener('click', (e) => {
        const index = parseInt(e.currentTarget.dataset.index);
        console.log(index)
        mySwiper.slideTo(index);
    });
});

const showMore = () => {
    let childenLength = sliderNav.children.length;
    console.log(childenLength)
    if (childenLength > maxItems) {
        sliderNav.insertAdjacentHTML('beforeend', `
			  <div class="btn-center">
				  <button class="modal-open">Еще ${childenLength - maxItems}</button>
			  </div>
		  `);
        document.querySelectorAll(`.slider-nav__item:nth-child(n+${maxItems + 1})`).forEach(el => { el.style.display = 'none'; });
    }

    const modalOpen = document.querySelector('.modal-open');
    modalOpen.addEventListener('click', () => { new GraphModal().open('one'); });
};

showMore();