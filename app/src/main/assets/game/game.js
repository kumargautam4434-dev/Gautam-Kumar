// --- COIN COLLECTOR ARCADE GAME ENGINE ---

// Web Audio API Synthesizer (Encapsulated to resolve Autoplay policies gracefully)
class SoundSynth {
    constructor() {
        this.ctx = null;
        this.muted = false;
    }

    init() {
        if (!this.ctx) {
            this.ctx = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    playCoin() {
        if (this.muted) return;
        this.init();
        const ctx = this.ctx;
        const now = ctx.currentTime;

        // Arpeggio / Double Beep retro effect
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(587.33, now); // D5
        osc.frequency.setValueAtTime(880.00, now + 0.08); // A5

        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.15, now + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 0.32);
    }

    playRuby() {
        if (this.muted) return;
        this.init();
        const ctx = this.ctx;
        const now = ctx.currentTime;

        // Rising laser-sweep synth sound
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(300, now);
        osc.frequency.exponentialRampToValueAtTime(1400, now + 0.25);

        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.12, now + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 0.32);
    }

    playTimeBonus() {
        if (this.muted) return;
        this.init();
        const ctx = this.ctx;
        const now = ctx.currentTime;

        // Chime/Tinkle effect
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gain = ctx.createGain();

        osc1.type = 'triangle';
        osc2.type = 'sine';
        osc1.frequency.setValueAtTime(987.77, now); // B5
        osc2.frequency.setValueAtTime(1318.51, now + 0.06); // E6

        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.15, now + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(ctx.destination);

        osc1.start(now);
        osc2.start(now + 0.06);
        osc1.stop(now + 0.5);
        osc2.stop(now + 0.5);
    }

    playClockTick() {
        if (this.muted) return;
        this.init();
        const ctx = this.ctx;
        const now = ctx.currentTime;

        // Fast high-pass click sound
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(2000, now);
        osc.frequency.setValueAtTime(100, now + 0.02);

        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.1, now + 0.005);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 0.06);
    }

    playLevelUp() {
        if (this.muted) return;
        this.init();
        const ctx = this.ctx;
        const now = ctx.currentTime;

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'square';
        osc.frequency.setValueAtTime(261.63, now); // C4
        osc.frequency.setValueAtTime(329.63, now + 0.1); // E4
        osc.frequency.setValueAtTime(392.00, now + 0.2); // G4
        osc.frequency.setValueAtTime(523.25, now + 0.3); // C5

        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.1, now + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.65);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 0.7);
    }

    playGameOver() {
        if (this.muted) return;
        this.init();
        const ctx = this.ctx;
        const now = ctx.currentTime;

        // Big, long descending retro sad noise
        const osc = ctx.createOscillator();
        const noiseGen = ctx.createOscillator(); // Extra synth thickening
        const gain = ctx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(380, now);
        osc.frequency.linearRampToValueAtTime(80, now + 0.85);

        noiseGen.type = 'triangle';
        noiseGen.frequency.setValueAtTime(370, now);
        noiseGen.frequency.linearRampToValueAtTime(75, now + 0.85);

        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.22, now + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);

        osc.connect(gain);
        noiseGen.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        noiseGen.start(now);
        osc.stop(now + 1.2);
        noiseGen.stop(now + 1.2);
    }

    playUiClick() {
        if (this.muted) return;
        this.init();
        const ctx = this.ctx;
        const now = ctx.currentTime;

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(650, now);

        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.08, now + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 0.12);
    }
}

const sfx = new SoundSynth();

// --- GAME CONSTANTS & STATE VARIABLES ---
const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

const startScreen = document.getElementById('start-screen');
const pauseScreen = document.getElementById('pause-screen');
const gameOverScreen = document.getElementById('game-over-screen');
const hud = document.getElementById('hud');

const scoreDisplay = document.getElementById('score-display');
const timerDisplay = document.getElementById('timer-display');
const timerProgressBar = document.getElementById('timer-progress-bar');

const startHighScore = document.getElementById('start-high-score');
const finalScore = document.getElementById('final-score');
const finalDifficulty = document.getElementById('final-difficulty');
const finalHighScore = document.getElementById('final-high-score');
const newRecordBanner = document.getElementById('new-record-banner');

// Buttons
const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const fullscreenBtn = document.getElementById('fullscreen-btn');
const resumeBtn = document.getElementById('resume-btn');
const quitBtn = document.getElementById('quit-btn');
const restartBtn = document.getElementById('restart-btn');

let gameState = 'START'; // START, PLAYING, PAUSED, GAME_OVER
let score = 0;
let timeRemaining = 60; // 60-seconds rule
let difficultyLevel = 1;
let highScorers = 0;
let timeAccumulator = 0; // track level times
let lastTime = 0;
let lastTickSecond = 0; // track ticking sound for last 5 secs

// Particle arrays
let particles = [];
let backdropStars = [];

// Screen dimension bounds
let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

// --- MOVEMENT CONTROLS CODES ---
const keys = {
    w: false, a: false, s: false, d: false,
    ArrowUp: false, ArrowDown: false, ArrowLeft: false, ArrowRight: false
};

// Joystick state variables for mobile touch interaction
let touchActive = false;
let joystickStart = { x: 0, y: 0 };
let joystickCurrent = { x: 0, y: 0 };
let joystickRadius = 60;
let joystickVector = { x: 0, y: 0 }; // Direction vector normalized (magnitude up to 1)

// --- CHARACTER AND GAME ENTITIES ---
class CyberPlayer {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.radius = 20;
        this.color = '#00f0ff';
        this.speed = 4.2;
        this.velX = 0;
        this.velY = 0;
        this.trail = [];
        this.spinAngle = 0;
    }

    draw() {
        // Draw cyber motion trail
        for (let i = 0; i < this.trail.length; i++) {
            const p = this.trail[i];
            const ratio = (i + 1) / this.trail.length;
            ctx.beginPath();
            ctx.arc(p.x, p.y, this.radius * 0.7 * ratio, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0, 240, 255, ${0.15 * ratio})`;
            ctx.fill();
        }

        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.spinAngle);

        // Draw outer glowing neon hexagon ring
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
            const angle = (i * Math.PI) / 3;
            const x = Math.cos(angle) * (this.radius + 3);
            const y = Math.sin(angle) * (this.radius + 3);
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.strokeStyle = '#00f0ff';
        ctx.lineWidth = 2.5;
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#00f0ff';
        ctx.stroke();

        // Draw solid core
        ctx.beginPath();
        ctx.arc(0, 0, this.radius * 0.65, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(7, 9, 19, 0.95)';
        ctx.fill();
        ctx.strokeStyle = '#ff007f';
        ctx.lineWidth = 2;
        ctx.shadowColor = '#ff007f';
        ctx.stroke();

        // Draw steering indicator core dot
        ctx.beginPath();
        ctx.arc(this.radius * 0.35, 0, 4, 0, Math.PI * 2);
        ctx.fillStyle = '#00f0ff';
        ctx.fill();

        ctx.restore();
    }

    update(difficultyMultiplier) {
        // Process keyboard controls
        let moveX = 0;
        let moveY = 0;

        if (keys.w || keys.ArrowUp) moveY = -1;
        if (keys.s || keys.ArrowDown) moveY = 1;
        if (keys.a || keys.ArrowLeft) moveX = -1;
        if (keys.d || keys.ArrowRight) moveX = 1;

        // Normalize keyboard vector to avoid double speed diagonally
        if (moveX !== 0 && moveY !== 0) {
            const mag = Math.sqrt(moveX * moveX + moveY * moveY);
            moveX /= mag;
            moveY /= mag;
        }

        // Standard movement formula
        const SpeedMultiplier = 1 + (difficultyMultiplier - 1) * 0.08;
        const finalSpeed = this.speed * SpeedMultiplier;

        if (touchActive) {
            // Apply Joystick values
            this.velX = joystickVector.x * finalSpeed;
            this.velY = joystickVector.y * finalSpeed;
        } else {
            // Apply keyboard drift with friction
            this.velX = moveX * finalSpeed;
            this.velY = moveY * finalSpeed;
        }

        // Apply new position coordinates
        this.x += this.velX;
        this.y += this.velY;

        // Screen collision bounding wrap check
        if (this.x - this.radius < 0) this.x = this.radius;
        if (this.x + this.radius > width) this.x = width - this.radius;
        if (this.y - this.radius < 0) this.y = this.radius;
        if (this.y + this.radius > height) this.y = height - this.radius;

        // Record history trails
        this.trail.push({ x: this.x, y: this.y });
        if (this.trail.length > 8) {
            this.trail.shift();
        }

        // Spin animation
        const actualVelocity = Math.sqrt(this.velX * this.velX + this.velY * this.velY);
        if (actualVelocity > 0.1) {
            this.spinAngle = Math.atan2(this.velY, this.velX);
        } else {
            this.spinAngle += 0.015;
        }
    }
}

// Global actor
const player = new CyberPlayer(width / 2, height / 2);

// --- COIN TYPES CLASS REPRESENTATION ---
class ArcadeCoin {
    constructor(x, y, type) {
        this.x = x;
        this.y = y;
        this.type = type || 'GOLD'; // GOLD, RUBY, TIME_BONUS
        this.radius = type === 'RUBY' ? 14 : (type === 'TIME_BONUS' ? 15 : 12);
        this.pulseSeed = Math.random() * 100;
        this.collected = false;
        this.glowPower = 12;
    }

    draw() {
        const pulse = 1 + Math.sin(Date.now() * 0.006 + this.pulseSeed) * 0.12;
        const currentRadius = this.radius * pulse;

        ctx.save();
        ctx.translate(this.x, this.y);

        if (this.type === 'GOLD') {
            // Shiny rotating virtual gold slot coins
            ctx.beginPath();
            ctx.arc(0, 0, currentRadius, 0, Math.PI * 2);
            ctx.fillStyle = '#ffd700'; // Gold yellow metallic representation
            ctx.shadowBlur = this.glowPower;
            ctx.shadowColor = 'rgba(255, 215, 0, 0.7)';
            ctx.fill();

            // Inner styling ring
            ctx.beginPath();
            ctx.arc(0, 0, currentRadius * 0.6, 0, Math.PI * 2);
            ctx.strokeStyle = '#fffb00';
            ctx.lineWidth = 1.5;
            ctx.stroke();

            // Inner text character
            ctx.fillStyle = '#665200';
            ctx.font = `bold ${Math.round(currentRadius * 0.9)}px var(--font-display)`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('$', 0, 0);

        } else if (this.type === 'RUBY') {
            // Pulse diamond shape 3-points rare gems
            ctx.beginPath();
            ctx.moveTo(0, -currentRadius);
            ctx.lineTo(currentRadius * 0.9, 0);
            ctx.lineTo(0, currentRadius);
            ctx.lineTo(-currentRadius * 0.9, 0);
            ctx.closePath();
            ctx.fillStyle = '#ff3c3c'; // Neon rich ruby red style
            ctx.shadowBlur = this.glowPower + 4;
            ctx.shadowColor = 'rgba(255, 60, 60, 0.8)';
            ctx.fill();

            ctx.beginPath();
            ctx.moveTo(0, -currentRadius * 0.5);
            ctx.lineTo(currentRadius * 0.45, 0);
            ctx.lineTo(0, currentRadius * 0.5);
            ctx.lineTo(-currentRadius * 0.45, 0);
            ctx.closePath();
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 1;
            ctx.stroke();

            ctx.fillStyle = '#ffffff';
            ctx.font = `bold ${Math.round(currentRadius * 0.65)}px var(--font-sans)`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('3x', 0, 0);

        } else if (this.type === 'TIME_BONUS') {
            // Clock/Emerald green boost items giving extra seconds
            ctx.beginPath();
            ctx.arc(0, 0, currentRadius, 0, Math.PI * 2);
            ctx.fillStyle = '#00ff66'; // Glowing Emerald Green
            ctx.shadowBlur = this.glowPower + 2;
            ctx.shadowColor = 'rgba(0, 255, 102, 0.7)';
            ctx.fill();

            // Render stopwatch visual indices
            ctx.strokeStyle = '#024d20';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(0, 0, currentRadius * 0.75, 0, Math.PI * 2);
            ctx.stroke();

            // Draw micro needle
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(0, -currentRadius * 0.55);
            ctx.stroke();
            
            // Draw top watch button
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(-2, -currentRadius - 3, 4, 3);
        }

        ctx.restore();
    }
}

// Global active coins collector
let coins = [];

// --- POPUP INDICATORS (Floating numeric text effects on collection points) ---
class TextFloatingPopup {
    constructor(x, y, text, color) {
        this.x = x;
        this.y = y;
        this.text = text;
        this.color = color;
        this.alpha = 1;
        this.vy = -1.2;
        this.life = 45; // loop durations
    }

    update() {
        this.y += this.vy;
        this.alpha -= 0.022;
        this.life--;
    }

    draw() {
        ctx.save();
        ctx.globalAlpha = Math.max(0, this.alpha);
        ctx.fillStyle = this.color;
        ctx.font = 'bold 16px var(--font-display)';
        ctx.textAlign = 'center';
        ctx.fillText(this.text, this.x, this.y);
        ctx.restore();
    }
}

let floatingPopups = [];

// --- RETRO PARTICLE SMASH SYSTEM ---
class RetroSpark {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        const speed = Math.random() * 4 + 1.5;
        const angle = Math.random() * Math.PI * 2;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        this.size = Math.random() * 4 + 2;
        this.color = color;
        this.opacity = 1;
        this.decay = Math.random() * 0.02 + 0.015;
        this.gravity = 0.035; // fall gently
    }

    update() {
        this.x += this.vx;
        this.vy += this.gravity;
        this.y += this.vy;
        this.opacity -= this.decay;
        this.size = Math.max(0.1, this.size - 0.05);
    }

    draw() {
        ctx.save();
        ctx.globalAlpha = Math.max(0, this.opacity);
        ctx.shadowBlur = this.size * 2;
        ctx.shadowColor = this.color;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}

// --- BACKDROP STAR FIELD BACKGROUND ANIM ---
class AmbientStar {
    constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 1.5 + 0.5;
        this.brightness = Math.random();
        this.speed = Math.random() * 0.15 + 0.05;
    }

    update() {
        this.y += this.speed * difficultyLevel;
        if (this.y > height) {
            this.y = 0;
            this.x = Math.random() * width;
        }
        this.brightness += (Math.random() - 0.5) * 0.1;
        this.brightness = Math.max(0.1, Math.min(1, this.brightness));
    }

    draw() {
        ctx.fillStyle = `rgba(255, 255, 255, ${this.brightness})`;
        ctx.fillRect(this.x, this.y, this.size, this.size);
    }
}

// Generate stars once at launch
function populateStarfield() {
    backdropStars = [];
    const starDensity = Math.round((width * height) / 12000);
    for (let i = 0; i < starDensity; i++) {
        backdropStars.push(new AmbientStar());
    }
}

// --- COORDINATES HELPER: GET SAFE RANDOM COORDINATES ---
function getRandomSpawningPoints() {
    // Prevent spawning super close to edge margins to ensure clean visual clickability
    const padding = 45;
    const rx = Math.random() * (width - padding * 2) + padding;
    const ry = Math.random() * (height - padding * 2) + padding;
    return { x: rx, y: ry };
}

// --- COIN POPULATION CONTROLLERS ---
function spawnSpontaneousCoin() {
    const coords = getRandomSpawningPoints();
    const picker = Math.random() * 100;
    let type = 'GOLD';

    if (picker < 12) {
        // 12% probability of green emerald clocks
        type = 'TIME_BONUS';
    } else if (picker < 25) {
        // 13% probability of ruby gems
        type = 'RUBY';
    }

    coins.push(new ArcadeCoin(coords.x, coords.y, type));
}

// Ensure the screen has a healthy count of coin objectives
function maintainObjectivesPool() {
    const activeGoldTarget = 5 + Math.floor(difficultyLevel * 1);
    while (coins.length < activeGoldTarget) {
        spawnSpontaneousCoin();
    }
}

// Custom localized explosion
function triggerCoinExplosion(x, y, coinType) {
    let particleColor = '#ffd700'; // GOLD default
    if (coinType === 'RUBY') particleColor = '#ff3c3c';
    if (coinType === 'TIME_BONUS') particleColor = '#00ff66';

    const burstAmount = coinType === 'RUBY' ? 18 : (coinType === 'TIME_BONUS' ? 15 : 12);
    for (let i = 0; i < burstAmount; i++) {
        particles.push(new RetroSpark(x, y, particleColor));
    }
}

// --- HIGH SCORE MANAGER SYSTEM ---
function loadCachedHighScore() {
    try {
        const stored = localStorage.getItem('cc_arcade_highscore');
        highScorers = stored ? parseInt(stored, 10) : 0;
    } catch (e) {
        highScorers = 0;
        console.warn('LocalStorage blocked or missing', e);
    }
    // Update labels formatting
    const formattedScore = String(highScorers).padStart(3, '0');
    startHighScore.textContent = formattedScore;
    finalHighScore.textContent = String(highScorers);
}

function updateHighScoreIfBeaten() {
    if (score > highScorers) {
        highScorers = score;
        try {
            localStorage.setItem('cc_arcade_highscore', highScorers);
        } catch (e) {
            console.error('Failed saving score', e);
        }
        newRecordBanner.classList.remove('hidden');
        document.getElementById('trophy-pulse').classList.add('pulse');
    } else {
        newRecordBanner.classList.add('hidden');
        document.getElementById('trophy-pulse').classList.remove('pulse');
    }
    loadCachedHighScore();
}

// --- INITIALIZE NEW GAME ROUND ---
function initializeNewGameRound() {
    score = 0;
    timeRemaining = 60;
    difficultyLevel = 1;
    timeAccumulator = 0;
    lastTickSecond = 60;
    coins = [];
    particles = [];
    floatingPopups = [];
    lastTime = performance.now();

    // Reset character location
    player.x = width / 2;
    player.y = height / 2;
    player.velX = 0;
    player.velY = 0;
    player.trail = [];

    // Format scoreboard displays
    scoreDisplay.textContent = score;
    timerDisplay.textContent = timeRemaining;
    timerProgressBar.style.width = '100%';
    timerProgressBar.style.backgroundColor = '';

    // Populate objectives
    maintainObjectivesPool();
    sfx.playLevelUp();
}

// Change Game Overlays States
function switchGameScreen(targetState) {
    gameState = targetState;

    startScreen.classList.add('hidden');
    pauseScreen.classList.add('hidden');
    gameOverScreen.classList.add('hidden');
    hud.classList.add('hidden');

    if (targetState === 'START') {
        startScreen.classList.remove('hidden');
        loadCachedHighScore();
    } else if (targetState === 'PLAYING') {
        hud.classList.remove('hidden');
    } else if (targetState === 'PAUSED') {
        hud.classList.remove('hidden');
        pauseScreen.classList.remove('hidden');
    } else if (targetState === 'GAME_OVER') {
        gameOverScreen.classList.remove('hidden');
        finalScore.textContent = score;
        finalDifficulty.textContent = `Lv ${difficultyLevel}`;
        updateHighScoreIfBeaten();
    }
}

// --- GAME RESIZING EVENTS ---
function handleWindowResize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    
    // Repopulate star density matching area sizes
    populateStarfield();

    // Display landscape rotator screen notice only on small horizontal heights
    const rotatorNotice = document.getElementById('landscape-notice');
    if (window.innerHeight < 480 && window.innerWidth > window.innerHeight) {
        rotatorNotice.style.display = 'block';
    } else {
        rotatorNotice.style.display = 'none';
    }
}

// --- TOUCH-SCREEN INTERACTIVE JOSTICK PROCESSORS ---
function handleTouchStart(e) {
    if (gameState !== 'PLAYING') return;
    
    // Check if the input resides on screen side structures (Pause, buttons) to avoid stealing focus
    const touch = e.changedTouches[0];
    const targetElement = document.elementFromPoint(touch.clientX, touch.clientY);
    if (targetElement && (targetElement.closest('#pause-btn') || targetElement.closest('#fullscreen-btn'))) {
        return; // Avoid trigger joystick mechanics on controls clicks
    }

    touchActive = true;
    joystickStart = { x: touch.clientX, y: touch.clientY };
    joystickCurrent = { x: touch.clientX, y: touch.clientY };
    joystickVector = { x: 0, y: 0 };
}

function handleTouchMove(e) {
    if (!touchActive || gameState !== 'PLAYING') return;

    // Support single touches tracking
    const targetTouch = Array.from(e.touches).find(t => joystickStart !== null);
    if (!targetTouch) return;

    joystickCurrent = { x: targetTouch.clientX, y: targetTouch.clientY };

    // Distance metrics
    const dx = joystickCurrent.x - joystickStart.x;
    const dy = joystickCurrent.y - joystickStart.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance === 0) {
        joystickVector = { x: 0, y: 0 };
    } else {
        const limiter = Math.min(distance, joystickRadius);
        joystickVector.x = (dx / distance) * (limiter / joystickRadius);
        joystickVector.y = (dy / distance) * (limiter / joystickRadius);
    }
}

function handleTouchEnd(e) {
    touchActive = false;
    joystickVector = { x: 0, y: 0 };
}

// --- RENDERING INTERNAL CANVAS OVERLAYS AND VIRTUAL JOSTICK CONTROLLER GIZMOS ---
function drawVirtualJoystick() {
    if (!touchActive) return;

    // Draw background boundary ring with transparency
    ctx.save();
    ctx.beginPath();
    ctx.arc(joystickStart.x, joystickStart.y, joystickRadius, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(0, 240, 255, 0.05)';
    ctx.fill();
    ctx.strokeStyle = 'rgba(0, 240, 255, 0.35)';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Draw active handle node
    const handleX = joystickStart.x + joystickVector.x * joystickRadius;
    const handleY = joystickStart.y + joystickVector.y * joystickRadius;

    ctx.beginPath();
    ctx.arc(handleX, handleY, 20, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 0, 127, 0.7)';
    ctx.shadowBlur = 10;
    ctx.shadowColor = '#ff007f';
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.restore();
}

// --- GAME LOGIC CYCLE & LOOP ---
function runGameLoop(now) {
    if (gameState === 'PLAYING') {
        const delta = (now - lastTime) / 1000;
        lastTime = now;

        // Progress internal timer
        timeRemaining = Math.max(0, timeRemaining - delta);
        timeAccumulator += delta;

        // Tick sounds for final countdown intensity (from 5 seconds remaining)
        const roundedSec = Math.ceil(timeRemaining);
        if (roundedSec <= 5 && roundedSec !== lastTickSecond && roundedSec > 0) {
            sfx.playClockTick();
            lastTickSecond = roundedSec;
            timerProgressBar.style.backgroundColor = '#ff3c3c';
        }

        // Increase Difficulty Level periodically over time (every 15 seconds)
        if (timeAccumulator >= 15 * difficultyLevel && difficultyLevel < 5) {
            difficultyLevel++;
            sfx.playLevelUp();
            // Launch small localized level banner popups!
            floatingPopups.push(new TextFloatingPopup(player.x, player.y - 30, `LEVEL UP: Lv ${difficultyLevel}!`, '#00ff66'));
        }

        // Timer termination handler
        if (timeRemaining <= 0) {
            timerDisplay.textContent = '0';
            timerProgressBar.style.width = '0%';
            sfx.playGameOver();
            switchGameScreen('GAME_OVER');
        } else {
            timerDisplay.textContent = roundedSec;
            const percentage = (timeRemaining / 60) * 100;
            timerProgressBar.style.width = `${Math.min(100, percentage)}%`;
        }

        // Check objectives
        maintainObjectivesPool();

        // 1. Clear background drawing container
        ctx.fillStyle = '#070913';
        ctx.fillRect(0, 0, width, height);

        // 2. Draw stars
        backdropStars.forEach(star => {
            star.update();
            star.draw();
        });

        // 3. Update character elements
        player.update(difficultyLevel);
        player.draw();

        // 4. Update coins and checking overlapping collision points
        for (let i = coins.length - 1; i >= 0; i--) {
            const coin = coins[i];
            coin.draw();

            // Circular overlap bounds check
            const dx = coin.x - player.x;
            const dy = coin.y - player.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const triggerDist = coin.radius + player.radius;

            if (distance < triggerDist) {
                // Register score bonuses according to types
                let increment = 1;
                let popMsg = '+1';
                let popColor = '#00f0ff'; // Gold cyan default

                if (coin.type === 'GOLD') {
                    increment = 1;
                    popMsg = '+1';
                    popColor = '#ffd700';
                    sfx.playCoin();
                } else if (coin.type === 'RUBY') {
                    increment = 3;
                    popMsg = 'BONUS +3!';
                    popColor = '#ff3c3c';
                    sfx.playRuby();
                } else if (coin.type === 'TIME_BONUS') {
                    increment = 0;
                    timeRemaining = Math.min(60, timeRemaining + 3); // add +3 seconds bonus to session
                    popMsg = 'TIME +3s!';
                    popColor = '#00ff66';
                    sfx.playTimeBonus();
                }

                // Update score state
                score += increment;
                scoreDisplay.textContent = score;

                // Explosion particle details
                triggerCoinExplosion(coin.x, coin.y, coin.type);

                // Setup floating text indicator
                floatingPopups.push(new TextFloatingPopup(coin.x, coin.y - 10, popMsg, popColor));

                // Evacuate coin from queue array
                coins.splice(i, 1);
            }
        }

        // 5. Update particles systems physics and elements rendering
        for (let i = particles.length - 1; i >= 0; i--) {
            const particle = particles[i];
            particle.update();
            particle.draw();
            if (particle.opacity <= 0 || particle.size <= 0.1) {
                particles.splice(i, 1);
            }
        }

        // 6. Update text floating alerts popups
        for (let i = floatingPopups.length - 1; i >= 0; i--) {
            const popup = floatingPopups[i];
            popup.update();
            popup.draw();
            if (popup.life <= 0) {
                floatingPopups.splice(i, 1);
            }
        }

        // 7. Render touch joystick controls if running on screens touch
        drawVirtualJoystick();

    } else {
        // Keeps backgrounds drifting elegantly when screens represent paused/other states
        ctx.fillStyle = '#05060d';
        ctx.fillRect(0, 0, width, height);
        
        backdropStars.forEach(star => {
            star.update();
            star.draw();
        });
        
        // Render simple static representations
        player.draw();
        coins.forEach(c => c.draw());
        particles.forEach(p => p.draw());

        // Update timestamps to avoid leaps in delta calculations on resuming
        lastTime = now;
    }

    requestAnimationFrame(runGameLoop);
}

// --- CONFIGURE KEYBOARD INPUT HOOKS ---
window.addEventListener('keydown', e => {
    if (e.key in keys) {
        keys[e.key] = true;
    }
});

window.addEventListener('keyup', e => {
    if (e.key in keys) {
        keys[e.key] = false;
    }
    
    // Toggle pause with Escape key
    if (e.key === 'Escape') {
        if (gameState === 'PLAYING') {
            sfx.playUiClick();
            switchGameScreen('PAUSED');
        } else if (gameState === 'PAUSED') {
            sfx.playUiClick();
            switchGameScreen('PLAYING');
        }
    }
});

// --- CORE INTERACTION CLICKS HOOKS ---

// Start Button clicks handler
startBtn.addEventListener('click', () => {
    sfx.playUiClick();
    sfx.init(); // Explicitly activate AudioContext on physical clicks
    initializeNewGameRound();
    switchGameScreen('PLAYING');
});

// Pause Button click
pauseBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    sfx.playUiClick();
    switchGameScreen('PAUSED');
});

// Resume Button click
resumeBtn.addEventListener('click', () => {
    sfx.playUiClick();
    switchGameScreen('PLAYING');
});

// Quit / restart game button
quitBtn.addEventListener('click', () => {
    sfx.playUiClick();
    switchGameScreen('START');
});

// Retry button click on GameOver Screen
restartBtn.addEventListener('click', () => {
    sfx.playUiClick();
    initializeNewGameRound();
    switchGameScreen('PLAYING');
});

// --- FULLSCREEN CONTROLS HANDLER ---
function toggleFullscreen() {
    sfx.playUiClick();
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(err => {
            console.warn(`Fullscreen activation failed: ${err.message}`);
        });
    } else {
        document.exitFullscreen();
    }
}

fullscreenBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleFullscreen();
});

// --- MULTI-TOUCH EVENTS REGISTERING FOR MOBILE SUPPORT ---
window.addEventListener('touchstart', handleTouchStart, { passive: true });
window.addEventListener('touchmove', handleTouchMove, { passive: true });
window.addEventListener('touchend', handleTouchEnd, { passive: true });

// Window resize registers
window.addEventListener('resize', handleWindowResize);

// --- LAUNCH APPLICATION RUNTIME ENGINE ---
handleWindowResize();
loadCachedHighScore();
requestAnimationFrame(runGameLoop);
console.log('--- Arcade Coin Collector Engine initialized smoothly. ---');
