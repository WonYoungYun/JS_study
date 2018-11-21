const scrollPos = 0;

function header() {
    const wrap_header = document.querySelector(".wrap_header")

    window.addEventListener("scroll", () => {
        let windowY = window.scrollY
        if (windowY !== scrollPos) {
            wrap_header.classList.add("fixed")
        } else {
            wrap_header.classList.remove("fixed")
        }
    })

}



function menu() {
    const menuList = document.querySelectorAll(".wrap_header #menu .menu_nav>li")
    menuList.forEach(element => {
        element.addEventListener("mouseover", () => {
            element.classList.add("show_list")
        })
        element.addEventListener("mouseout", () => {
            element.classList.remove("show_list")
        })
    });
}


document.addEventListener("DOMContentLoaded", () => {
    header()
    menu()
})