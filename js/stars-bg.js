(() => {
    // Evita múltiplas inicializações
    let __starsInitialized = false;

    function initStarsBackground() {
        if (__starsInitialized) return;
        const canvas = document.getElementById('stars-bg');
        if (!canvas) return;

        __starsInitialized = true;
        const ctx = canvas.getContext('2d');
        let stars = [];

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        function createStars() {
            stars = [];
            for (let i = 0; i < 120; i++) {
                stars.push({
                    x: Math.random() * (canvas.width - 10) + 5,
                    y: Math.random() * (canvas.height - 10) + 5,
                    r: Math.random() * 1.5 + 0.5,
                    dx: (Math.random() - 0.5) * 0.55,
                    dy: (Math.random() - 0.5) * 0.55
                });
            }
        }
        createStars();

        function drawStars() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = "#101010";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            for (let star of stars) {
                ctx.save();
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.r * 1.5, 0, Math.PI * 2);
                ctx.shadowColor = "#d4af37";
                ctx.shadowBlur = 16;
                ctx.fillStyle = "rgba(212,175,55,0.55)";
                ctx.fill();
                ctx.restore();
            }

            for (let i = 0; i < stars.length; i++) {
                for (let j = i + 1; j < stars.length; j++) {
                    const dist = Math.hypot(stars[i].x - stars[j].x, stars[i].y - stars[j].y);
                    if (dist < 100) {
                        ctx.save();
                        ctx.strokeStyle = "rgba(212,175,55,0.22)";
                        ctx.shadowColor = "#d4af37";
                        ctx.shadowBlur = 8;
                        ctx.beginPath();
                        ctx.moveTo(stars[i].x, stars[i].y);
                        ctx.lineTo(stars[j].x, stars[j].y);
                        ctx.lineWidth = 2;
                        ctx.stroke();
                        ctx.restore();
                    }
                }
            }
        }

        function animateStars() {
            for (let star of stars) {
                star.x += star.dx;
                star.y += star.dy;
                if (star.x > canvas.width + 2 * star.r) star.x = -2 * star.r;
                else if (star.x < -2 * star.r) star.x = canvas.width + 2 * star.r;
                if (star.y > canvas.height + 2 * star.r) star.y = -2 * star.r;
                else if (star.y < -2 * star.r) star.y = canvas.height + 2 * star.r;
            }
            drawStars();
            requestAnimationFrame(animateStars);
        }
        animateStars();
    }

    // Exponha globalmente e auto-inicialize conforme o estado do DOM
    window.initStarsBackground = initStarsBackground;
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        initStarsBackground();
    } else {
        document.addEventListener('DOMContentLoaded', initStarsBackground);
    }
})();