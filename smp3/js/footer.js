const info_title = document.querySelectorAll(".info_copyright .info_title")



function check_display() {
    info_title.forEach(el => {
        let target_detail = el.nextElementSibling
        let span = el.querySelector("i")
        if (span.classList.contains("fa-angle-up")) {
            target_detail.style.display = "none"
            span.classList.remove("fa-angle-up")
            span.classList.add("fa-angle-down")
        }
    })
}

function copyright_display() {
    info_title.forEach(el => {
        let info_detail = el.nextElementSibling
        let icon = el.querySelector("i")
        el.addEventListener("click", () => {
            if (info_detail.style.display === "block") {
                info_detail.style.display = "none"

                icon.classList.remove("fa-angle-up")
                icon.classList.add("fa-angle-down")

            } else {
                check_display()
                info_detail.style.display = "block"
                height = info_detail.clientHeight * -1
                info_detail.style.top = `${height-10}px`
                icon.classList.remove("fa-angle-down")
                icon.classList.add("fa-angle-up")
            }

        })
    })
}


document.addEventListener("DOMContentLoaded", () => {
    copyright_display()
})