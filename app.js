"use strict";

///////////////////////////////////////

// Tabbed Variables
const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");

// Modal Variables
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");

// Nav Variables
const nav = document.querySelector(".nav");
const navLinksContainer = document.querySelector(".nav__links");
const navLinks = document.querySelectorAll(".nav__link");

// Section Variables
const section1 = document.querySelector(".hero__section");
const sections = document.querySelectorAll(".section");

///////////////////////////////////////

// Opening Modal
const openModal = function (e) {
	e.preventDefault();
	modal.classList.remove("hidden");
	overlay.classList.remove("hidden");
};

const closeModal = function () {
	modal.classList.add("hidden");
	overlay.classList.add("hidden");
};

for (let i = 0; i < btnsOpenModal.length; i++)
	btnsOpenModal[i].addEventListener("click", openModal);

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

// Closing Modal
document.addEventListener("keydown", function (e) {
	if (e.key === "Escape" && !modal.classList.contains("hidden")) {
		closeModal();
	}
});

// Page Navigation - event delegation
document.querySelector(".nav__links").addEventListener("click", function (e) {
	e.preventDefault();

	if (e.target.classList.contains("nav__link")) {
		const id = e.target.getAttribute("href");
		document.querySelector(id).scrollIntoView({
			behavior: "smooth",
		});
	}
});

// Tabbed Components - event delegation

tabsContainer.addEventListener("click", function (e) {
	const clicked = e.target.closest(".operations__tab");

	// nothing returns if the click is not on the tab buttons
	if (!clicked) return;
	else {
		// removing the active styles from the tab buttons
		tabs.forEach((t) => t.classList.remove("operations__tab--active"));

		// removing the active styles from the operation contents
		tabsContent.forEach((tc) =>
			tc.classList.remove("operations__content--active")
		);

		// activated the specific tab button
		clicked.classList.add("operations__tab--active");

		// activating styles for specific tabs
		document
			.querySelector(`.operations__content--${clicked.dataset.tab}`)
			.classList.add("operations__content--active");
	}
});

// Navigation Faded Links on hover - event delegation
const navigationFaded = function (e) {
	const hover = e.target.closest(".nav__link");
	const siblings = e.target.closest(".nav").querySelectorAll(".nav__link");

	if (e.target === nav || e.target === navLinksContainer) return;
	else {
		siblings.forEach((el) => {
			if (hover !== el) {
				el.style.opacity = this;
			}
		});
	}
};

nav.addEventListener("mouseover", navigationFaded.bind(0.5));
nav.addEventListener("mouseout", navigationFaded.bind(1.0));

// Smooth Sticky Navigation Bar
const initCoords = section1.getBoundingClientRect();
window.addEventListener("scroll", function () {
	if (this.scrollY >= initCoords.top) {
		nav.classList.add("sticky");
	} else {
		nav.classList.remove("sticky");
	}
});

// Reveal Sections while Scrolling
const sectionObserver = new IntersectionObserver(
	function (entries, observer) {
		const [entry] = entries;
		if (!entry.isIntersecting) return;
		else entry.target.classList.remove("section--hidden");
		observer.unobserve(entry.target);
	},
	{
		root: null, // the root element with which the target is intersecting with
		threshold: 0.15, // the visibility ratio of the target element
	}
);

sections.forEach((section) => {
	// section.classList.add("section--hidden");
	// sectionObserver.observe(section);
});

// Lazy Loading Images
const targetImg = document.querySelectorAll(".lazy-img");

const imageObserver = new IntersectionObserver(
	function (entries, observer) {
		const [entry] = entries;
		if (!entry.isIntersecting) entry.target.classList.add("lazy-img");
		else entry.target.classList.remove("lazy-img");
		entry.target.src = entry.target.getAttribute("data-src");
	},
	{
		root: null,
		threshold: 0,
	}
);

targetImg.forEach((target) => imageObserver.observe(target));

// Slider Integration
///////////////////////////////////////
// Slider
const slider = function () {
	const slides = document.querySelectorAll(".slide");
	const btnLeft = document.querySelector(".slider__btn--left");
	const btnRight = document.querySelector(".slider__btn--right");
	const dotContainer = document.querySelector(".dots");

	let curSlide = 0;
	const maxSlide = slides.length;

	// creating the dots
	const createDots = function () {
		slides.forEach(function (_, i) {
			dotContainer.insertAdjacentHTML(
				"beforeend",
				`<button class="dots__dot" data-slide="${i}"></button>`
			);
		});
	};

	// activating the dots
	const activateDot = function (slide) {
		// removing the active styles from the dots
		document
			.querySelectorAll(".dots__dot")
			.forEach((dot) => dot.classList.remove("dots__dot--active"));

		document
			.querySelector(`.dots__dot[data-slide="${slide}"]`)
			.classList.add("dots__dot--active");
	};

	// Transitioning to the slide
	const goToSlide = function (slide) {
		slides.forEach(
			(s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
		);
	};

	// Next slide
	const nextSlide = function () {
		if (curSlide === maxSlide - 1) {
			curSlide = 0;
		} else {
			curSlide++;
		}

		goToSlide(curSlide);
		activateDot(curSlide);
	};

	const prevSlide = function () {
		if (curSlide === 0) {
			curSlide = maxSlide - 1;
		} else {
			curSlide--;
		}
		goToSlide(curSlide);
		activateDot(curSlide);
	};

	const init = function () {
		goToSlide(0);
		createDots();
		activateDot(0);
	};
	init();

	// Event handlers
	btnRight.addEventListener("click", nextSlide);
	btnLeft.addEventListener("click", prevSlide);

	document.addEventListener("keydown", function (e) {
		if (e.key === "ArrowLeft") prevSlide();
		e.key === "ArrowRight" && nextSlide();
	});

	dotContainer.addEventListener("click", function (e) {
		if (e.target.classList.contains("dots__dot")) {
			const { slide } = e.target.dataset;
			goToSlide(slide);
			activateDot(slide);
		}
	});
};
slider();

document.addEventListener("DOMContentLoaded", (e) => {
	console.log("DOMContentLoaded");
	console.log(e);
	console.log(document.documentElement);
});
