document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById('stars-bg');
    if (!canvas) return;
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
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                r: Math.random() * 1.5 + 0.5,
                dx: (Math.random() - 0.5) * 0.25, // velocidade reduzida
                dy: (Math.random() - 0.5) * 0.25
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
            ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
            ctx.shadowColor = "#00f0ff"; // azul neon
            ctx.shadowBlur = 10;
            ctx.fillStyle = "rgba(0,240,255,0.7)";
            ctx.fill();
            ctx.restore();
        }

        for (let i = 0; i < stars.length; i++) {
            for (let j = i + 1; j < stars.length; j++) {
                let dist = Math.hypot(stars[i].x - stars[j].x, stars[i].y - stars[j].y);
                if (dist < 80) {
                    ctx.save();
                    ctx.strokeStyle = "rgba(0,240,255,0.18)";
                    ctx.shadowColor = "#00f0ff";
                    ctx.shadowBlur = 4;
                    ctx.beginPath();
                    ctx.moveTo(stars[i].x, stars[i].y);
                    ctx.lineTo(stars[j].x, stars[j].y);
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
            if (star.x > canvas.width + 2 * star.r) {
                star.x = -2 * star.r;
            } else if (star.x < -2 * star.r) {
                star.x = canvas.width + 2 * star.r;
            }
            if (star.y > canvas.height + 2 * star.r) {
                star.y = -2 * star.r;
            } else if (star.y < -2 * star.r) {
                star.y = canvas.height + 2 * star.r;
            }
        }
        drawStars();
        requestAnimationFrame(animateStars);
    }
    animateStars();
});