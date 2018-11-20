const SHOWING_CLASS = "showing"
const firstSlide = document.querySelector(".slide .slide_list .slide_item:nth-child(1)")

function slide() {
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
    slide()
    setInterval(slide, 5000)
})