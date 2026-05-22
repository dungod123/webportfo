/**
 * Particle Background - Subtle light theme particles
 * Barely visible soft dots for professional feel
 */

export default class ParticleBackground {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.mouse = { x: null, y: null, radius: 120 };
    this.animationId = null;
    this.isRunning = false;
    
    this.config = {
      particleCount: 35,
      particleSize: { min: 1, max: 2 },
      speed: 0.2,
      connectionDistance: 140,
      colors: ['#0067b8', '#5c2d91', '#008272'],
      opacity: 0.15
    };

    this.init();
  }

  init() {
    this.resize();
    this.createParticles();
    this.setupEvents();
    this.start();
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.canvas.style.cssText = `
      position: fixed;
      top: 0; left: 0;
      width: 100%; height: 100%;
      pointer-events: none;
      z-index: 0;
      opacity: 0.3;
    `;
  }

  createParticles() {
    this.particles = [];
    const count = Math.min(this.config.particleCount, Math.floor(window.innerWidth / 35));
    
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        size: Math.random() * (this.config.particleSize.max - this.config.particleSize.min) + this.config.particleSize.min,
        vx: (Math.random() - 0.5) * this.config.speed,
        vy: (Math.random() - 0.5) * this.config.speed,
        color: this.config.colors[Math.floor(Math.random() * this.config.colors.length)],
        opacity: Math.random() * 0.3 + 0.1
      });
    }
  }

  setupEvents() {
    window.addEventListener('resize', () => {
      this.resize();
      this.createParticles();
    });

    window.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    });

    window.addEventListener('mouseout', () => {
      this.mouse.x = null;
      this.mouse.y = null;
    });
  }

  update() {
    this.particles.forEach(p => {
      if (this.mouse.x !== null) {
        const dx = this.mouse.x - p.x;
        const dy = this.mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < this.mouse.radius) {
          const force = (this.mouse.radius - dist) / this.mouse.radius;
          p.vx -= (dx / dist) * force * 0.01;
          p.vy -= (dy / dist) * force * 0.01;
        }
      }

      p.x += p.vx;
      p.y += p.vy;
      p.vx *= 0.999;
      p.vy *= 0.999;

      const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
      if (speed < 0.05) {
        p.vx += (Math.random() - 0.5) * 0.03;
        p.vy += (Math.random() - 0.5) * 0.03;
      }

      if (p.x < -10) p.x = this.canvas.width + 10;
      if (p.x > this.canvas.width + 10) p.x = -10;
      if (p.y < -10) p.y = this.canvas.height + 10;
      if (p.y > this.canvas.height + 10) p.y = -10;
    });
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw connections (very subtle on light bg)
    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const dx = this.particles[i].x - this.particles[j].x;
        const dy = this.particles[i].y - this.particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < this.config.connectionDistance) {
          const opacity = (1 - dist / this.config.connectionDistance) * 0.06;
          this.ctx.beginPath();
          this.ctx.strokeStyle = `rgba(0, 103, 184, ${opacity})`;
          this.ctx.lineWidth = 0.5;
          this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
          this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
          this.ctx.stroke();
        }
      }
    }

    // Draw particles
    this.particles.forEach(p => {
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fillStyle = p.color;
      this.ctx.globalAlpha = p.opacity;
      this.ctx.fill();
      this.ctx.globalAlpha = 1;
    });
  }

  animate() {
    if (!this.isRunning) return;
    this.update();
    this.draw();
    this.animationId = requestAnimationFrame(() => this.animate());
  }

  start() {
    this.isRunning = true;
    this.animate();
  }

  stop() {
    this.isRunning = false;
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }
}
