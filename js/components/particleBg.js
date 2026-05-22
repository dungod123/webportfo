/**
 * Abstract Wave Background - Microsoft 365 Light Style
 * Enhanced dynamic waves with strong multi-directional self-animation 
 * and highly noticeable scroll-driven horizontal + vertical morphing.
 */

export default class ParticleBackground {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;

    this.ctx = this.canvas.getContext('2d');
    this.time = 0;
    
    // Scroll tracking with lerp for smooth parallax motion
    this.scrollY = 0;
    this.targetScrollY = 0;
    
    this.isRunning = false;
    this.animationId = null;

    this.init();
  }

  init() {
    this.resize();
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
      z-index: -1;
      opacity: 1;
    `;
  }

  setupEvents() {
    window.addEventListener('resize', () => this.resize());
    
    // Track scroll position
    window.addEventListener('scroll', () => {
      this.targetScrollY = window.scrollY;
    }, { passive: true });
  }

  update() {
    // Increased update speed for more noticeable organic motion
    this.time += 0.007; 
    
    // Lerp scroll position for silky smooth movement on scroll
    this.scrollY += (this.targetScrollY - this.scrollY) * 0.08;
  }

  draw() {
    const width = this.canvas.width;
    const height = this.canvas.height;
    
    // 1. Draw solid background color
    this.ctx.fillStyle = '#faf8f6'; // M365 light soft sand/white bg
    this.ctx.fillRect(0, 0, width, height);

    // Helper to draw a smooth wavy area with horizontal translation + vertical parallax
    const drawWaveLayer = (yBase, amp, freq, speed, phase, dir, colorStart, colorEnd, shadowAlpha) => {
      this.ctx.save();
      
      // Setup subtle edge shadow to make it look like silk folds
      this.ctx.shadowColor = `rgba(0, 0, 0, ${shadowAlpha})`;
      this.ctx.shadowBlur = 32;
      this.ctx.shadowOffsetY = 6;

      this.ctx.beginPath();
      this.ctx.moveTo(0, height);
      
      // Calculate vertical parallax shift on scroll
      const verticalScrollShift = this.scrollY * 0.45 * freq;
      
      // Calculate horizontal translation on scroll (creates diagonal scrolling effect)
      const horizontalScrollShift = this.scrollY * 0.35 * freq * dir;

      // Start path at left boundary
      const startTimeFactor = this.time * speed + phase;
      const startXVal = (0 + horizontalScrollShift) * 0.003;
      const startY = yBase + Math.sin(startTimeFactor + startXVal) * amp - verticalScrollShift;
      this.ctx.lineTo(0, startY);

      // Draw curve across width
      const segments = 4;
      const step = width / segments;
      
      for (let i = 1; i <= segments; i++) {
        const x = i * step;
        const prevX = (i - 1) * step;

        const timeFactor = this.time * speed + phase;
        
        // Target points
        const xVal = (x + horizontalScrollShift) * 0.003;
        const y = yBase + Math.sin(timeFactor + xVal * freq) * amp - verticalScrollShift;

        // Previous points
        const prevXVal = (prevX + horizontalScrollShift) * 0.003;
        const prevY = yBase + Math.sin(timeFactor + prevXVal * freq) * amp - verticalScrollShift;

        // Control points for smooth bezier interpolation
        const cp1x = prevX + step / 2;
        const cp1y = prevY;
        const cp2x = prevX + step / 2;
        const cp2y = y;

        this.ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);
      }

      this.ctx.lineTo(width, height);
      this.ctx.closePath();

      // Create gradient fill matching M365 abstract art
      const gradient = this.ctx.createLinearGradient(0, yBase - amp * 2, width, height);
      gradient.addColorStop(0, colorStart);
      gradient.addColorStop(1, colorEnd);
      
      this.ctx.fillStyle = gradient;
      this.ctx.fill();
      this.ctx.restore();
    };

    // 2. Render 4 overlapping white/gray waves (back to front)
    // Wave 1 (Deep back layer - light lavender/gray tint, slow drift, sweeps right)
    drawWaveLayer(
      height * 0.30, 
      75,   // Higher amplitude (was 45)
      0.8,  // Frequency
      0.5,  // Speed
      0,    // Phase
      1,    // Direction of horizontal scroll reaction (right)
      'rgba(238, 238, 245, 0.94)', 
      'rgba(255, 255, 255, 0.1)', 
      0.03
    );

    // Wave 2 (Middle back layer - soft warm tint, sweeps left)
    drawWaveLayer(
      height * 0.48, 
      90,   // Higher amplitude (was 60)
      0.6,  // Frequency
      0.4,  // Speed
      Math.PI * 0.4, 
      -1,   // Direction of horizontal scroll reaction (left)
      'rgba(246, 240, 246, 0.95)', 
      'rgba(255, 255, 255, 0.1)', 
      0.04
    );

    // Wave 3 (Middle front layer - soft cyan/teal tint, sweeps right)
    drawWaveLayer(
      height * 0.62, 
      85,   // Higher amplitude (was 50)
      0.7,  // Frequency
      0.6,  // Speed
      Math.PI * 0.9, 
      1.2,  // Faster horizontal scroll reaction
      'rgba(240, 246, 245, 0.95)', 
      'rgba(255, 255, 255, 0.1)', 
      0.04
    );

    // Wave 4 (Front layer - pure clean white, sweeps left)
    drawWaveLayer(
      height * 0.78, 
      65,   // Higher amplitude (was 35)
      0.9,  // Frequency
      0.7,  // Speed
      Math.PI * 1.3, 
      -1.2, // Faster horizontal scroll reaction
      'rgba(255, 255, 255, 0.98)', 
      'rgba(255, 255, 255, 0.2)', 
      0.05
    );
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
