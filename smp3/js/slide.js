const SHOWING_CLASS = "showing"
const firstSlide = document.querySelector(".slide .slide_list .slide_item:first-child")
const lastSlide = document.querySelector(".slide .slide_list .slide_item:last-child")
const prevButton = document.querySelector(".prev")
const nextButton = document.querySelector(".next")

function slideButton() {
    prevButton.addEventListener("click", prevslide)
    nextButton.addEventListener("click", flowslide)
}

function prevslide() {
    const currentSlide = document.querySelector(`.slide .${SHOWING_CLASS}`)
    if (currentSlide) {
        currentSlide.classList.remove(SHOWING_CLASS)
        const prevSlide = currentSlide.previousElementSibling;
        if (prevSlide) {
            prevSlide.classList.add(SHOWING_CLASS)
        } else {
            lastSlide.classList.add(SHOWING_CLASS)
        }
    } else {
        lastSlide.classList.add(SHOWING_CLASS)
    }
}

function flowslide() {
    const currentSlide = document.querySelector(`.slide .${SHOWING_CLASS}`)
    if (currentSlide) {
        currentSlide.classList.remove(SHOWING_CLASS)
        const nextSlide = currentSlide.nextElementSibling;
        if (nextSlide) {
            nextSlide.classList.add(SHOWING_CLASS)
        } else {
            firstSlide.classList.add(SHOWING_CLASS)
        }
    } else {
        firstSlide.classList.add(SHOWING_CLASS)
    }
}




document.addEventListener("DOMContentLoaded", () => {
    flowslide()
    setInterval(flowslide, 7000)
    slideButton()
})