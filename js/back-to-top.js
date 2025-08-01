document.addEventListener("DOMContentLoaded", function () {
    const backToTop = document.getElementById('back-to-top');
    window.addEventListener('scroll', function () {
        if (window.scrollY > 200) {
            backToTop.style.opacity = '1';
            backToTop.style.pointerEvents = 'auto';
        } else {
            backToTop.style.opacity = '0';
            backToTop.style.pointerEvents = 'none';
        }
    });
    backToTop.addEventListener('click', function (e) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});