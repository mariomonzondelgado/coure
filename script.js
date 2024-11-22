const heartButton = document.getElementById('heartButton');
const message = document.getElementById('message');
const canvas = document.getElementById('confetti');
const ctx = canvas.getContext('2d');

let confetti = [];
const confettiColors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function createConfetti() {
    for (let i = 0; i < 300; i++) {
        confetti.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            size: Math.random() * 10 + 5,
            color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
            dx: Math.random() * 2 - 1,
            dy: Math.random() * 3 + 2,
        });
    }
}

function drawConfetti() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    confetti.forEach((particle, index) => {
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        particle.x += particle.dx;
        particle.y += particle.dy;

        if (particle.y > canvas.height) {
            confetti.splice(index, 1);
        }
    });

    if (confetti.length > 0) {
        requestAnimationFrame(drawConfetti);
    }
}

heartButton.addEventListener('click', () => {
    heartButton.style.display = 'none';
    message.classList.add('show');
    createConfetti();
    drawConfetti();
});

resizeCanvas();
window.addEventListener('resize', resizeCanvas);
