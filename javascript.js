/* ============================================================
   shared.js — Nico's World
   Injects FontAwesome + starfield on every page.
   One line to add to any page, before </body>:
   <script src="shared.js" defer></script>
   ============================================================ */

(function () {

    /* ── FontAwesome ── */
    const fa = document.createElement('script');
    fa.src = 'https://kit.fontawesome.com/19865aac25.js';
    fa.crossOrigin = 'anonymous';
    fa.defer = true;
    document.head.appendChild(fa);


    /* ── Starfield ── */
    const canvas = document.createElement('canvas');
    canvas.id = 'starfield';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    let stars = [];
    const STAR_COUNT = 160;

    function resize() {
        canvas.width  = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    function createStars() {
        stars = [];
        for (let i = 0; i < STAR_COUNT; i++) {
            stars.push({
                x:      Math.random() * canvas.width,
                y:      Math.random() * canvas.height,
                r:      Math.random() * 1.2 + 0.2,
                alpha:  Math.random(),
                speed:  Math.random() * 0.008 + 0.002,
                offset: Math.random() * Math.PI * 2
            });
        }
    }

    function draw(t) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (const s of stars) {
            const pulse = 0.4 + 0.6 * Math.abs(Math.sin(t * s.speed + s.offset));
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${pulse * 0.85})`;
            ctx.fill();
        }
        requestAnimationFrame(draw);
    }

    window.addEventListener('resize', () => { resize(); createStars(); });
    resize();
    createStars();
    requestAnimationFrame(draw);

})();
