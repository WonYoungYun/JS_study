function header() {
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
})