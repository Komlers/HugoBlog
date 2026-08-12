const scroll = document.querySelector(".scroll-up");
if (scroll) {
    const rootElement = document.documentElement;
    function handleScroll() {
        rootElement.scrollTop > 200 ? scroll.classList.add("show") : scroll.classList.remove("show");
    }
    document.addEventListener("scroll", handleScroll);
}
