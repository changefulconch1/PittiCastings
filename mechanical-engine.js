/**
 * PITTI ENGINEERING LIMITED - ADVANCED MECHANICAL ANIMATION & CAD ENGINE v5.0
 * Comprehensive Interactive Precision Engineering Web Architecture
 * - Procedural Web Audio API Synthesizer (Mechanical Relays, Servos, Pneumatics, Lasers)
 * - 3D Interactive Stator & Rotor Core Visualizer (Exploded Views, Magnetic Flux, CAD Wireframe, Thermal)
 * - 8-Stage Interactive Precision Assembly Line Conveyor
 * - Interactive CAD Blueprint Modal Inspector for All Product Lines
 * - GIS Radar Command Map for 6 Strategic Production Facilities
 * - Live Engineering Math Configurator with SVG Vector CAD Blueprint
 * - Kinematic Involute Gear Train Divider & Custom Crosshair Reticle
 */

(function () {
  'use strict';

  // ==========================================================================
  // 1. PROCEDURAL WEB AUDIO API - MECHANICAL SOUND SYNTHESIZER
  // 100% Procedural synthesis. Zero external audio files required.
  // ==========================================================================
  class MechAudioEngine {
    constructor() {
      this.ctx = null;
      this.muted = true; // starts muted for user courtesy
      this.motorOsc = null;
      this.motorGain = null;
    }

    init() {
      if (!this.ctx) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) {
          this.ctx = new AudioCtx();
        }
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
    }

    toggle() {
      this.init();
      this.muted = !this.muted;
      if (this.muted && this.motorGain && this.ctx) {
        this.motorGain.gain.setValueAtTime(0, this.ctx.currentTime);
      }
      return !this.muted;
    }

    // Metallic micro-relay click (buttons, links, hover)
    playClick(freq = 1400) {
      if (this.muted || !this.ctx) return;
      try {
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now);
        osc.frequency.exponentialRampToValueAtTime(140, now + 0.035);

        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.035);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.04);
      } catch (e) {}
    }

    // Heavy hydraulic / latch release (mode change, explode, drawer)
    playHydraulic() {
      if (this.muted || !this.ctx) return;
      try {
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(160, now);
        osc.frequency.exponentialRampToValueAtTime(32, now + 0.12);

        gain.gain.setValueAtTime(0.22, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.13);
        this.playClick(2200);
      } catch (e) {}
    }

    // Pneumatic air exhaust hiss (modal open/close, station shift)
    playPneumatic() {
      if (this.muted || !this.ctx) return;
      try {
        const now = this.ctx.currentTime;
        const bufferSize = Math.floor(this.ctx.sampleRate * 0.14);
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = Math.random() * 2 - 1;
        }

        const noise = this.ctx.createBufferSource();
        noise.buffer = buffer;

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(2400, now);
        filter.frequency.exponentialRampToValueAtTime(600, now + 0.14);

        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0.14, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);

        noise.start(now);
      } catch (e) {}
    }

    // Laser beam / EDM spark pulse
    playLaser() {
      if (this.muted || !this.ctx) return;
      try {
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(3200, now);
        osc.frequency.exponentialRampToValueAtTime(300, now + 0.08);

        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.085);
      } catch (e) {}
    }

    // Continuous Motor Rotation RPM Hum
    updateMotorHum(rpm) {
      if (this.muted || !this.ctx) return;
      if (rpm <= 10) {
        if (this.motorGain) {
          this.motorGain.gain.setTargetAtTime(0, this.ctx.currentTime, 0.05);
        }
        return;
      }

      if (!this.motorOsc) {
        this.motorOsc = this.ctx.createOscillator();
        this.motorGain = this.ctx.createGain();
        this.motorOsc.type = 'sawtooth';
        this.motorGain.gain.setValueAtTime(0, this.ctx.currentTime);
        this.motorOsc.connect(this.motorGain);
        this.motorGain.connect(this.ctx.destination);
        this.motorOsc.start();
      }

      const fundamentalHz = Math.max(25, (rpm / 60) * 4); // 4-pole motor frequency
      this.motorOsc.frequency.setTargetAtTime(fundamentalHz, this.ctx.currentTime, 0.05);
      this.motorGain.gain.setTargetAtTime(0.035, this.ctx.currentTime, 0.05);
    }
  }

  const sound = new MechAudioEngine();

  // ==========================================================================
  // 2. INTERACTIVE 3D CAD STATOR & ROTOR CORE VISUALIZER (Canvas 3D Engine)
  // ==========================================================================
  class MotorCoreVisualizer {
    constructor(canvasId) {
      this.canvas = document.getElementById(canvasId);
      if (!this.canvas) return;
      this.ctx = this.canvas.getContext('2d');

      this.rpm = 1440;
      this.angle = 0;
      this.exploded = 0; // 0 = assembled, 1 = fully exploded
      this.targetExploded = 0;
      this.mode = 'solid'; // 'solid', 'exploded', 'flux', 'wireframe', 'thermal'

      this.rotX = 0.45;
      this.rotY = -0.55;
      this.zoom = 1.0;
      this.isDragging = false;
      this.lastMouseX = 0;
      this.lastMouseY = 0;

      this.initEvents();
      this.resize();
      window.addEventListener('resize', () => this.resize());
      this.animate = this.animate.bind(this);
      requestAnimationFrame(this.animate);
    }

    resize() {
      const rect = this.canvas.getBoundingClientRect();
      this.width = rect.width * (window.devicePixelRatio || 1);
      this.height = rect.height * (window.devicePixelRatio || 1);
      this.canvas.width = this.width;
      this.canvas.height = this.height;
    }

    initEvents() {
      this.canvas.addEventListener('mousedown', (e) => {
        this.isDragging = true;
        this.lastMouseX = e.clientX;
        this.lastMouseY = e.clientY;
        sound.playClick(1800);
      });

      window.addEventListener('mousemove', (e) => {
        if (!this.isDragging) return;
        const dx = e.clientX - this.lastMouseX;
        const dy = e.clientY - this.lastMouseY;
        this.rotY += dx * 0.008;
        this.rotX += dy * 0.008;
        this.lastMouseX = e.clientX;
        this.lastMouseY = e.clientY;
      });

      window.addEventListener('mouseup', () => {
        this.isDragging = false;
      });

      this.canvas.addEventListener('wheel', (e) => {
        e.preventDefault();
        this.zoom += e.deltaY * -0.001;
        this.zoom = Math.max(0.6, Math.min(2.4, this.zoom));
      }, { passive: false });

      // Touch events
      this.canvas.addEventListener('touchstart', (e) => {
        if (e.touches.length === 1) {
          this.isDragging = true;
          this.lastMouseX = e.touches[0].clientX;
          this.lastMouseY = e.touches[0].clientY;
        }
      }, { passive: true });

      window.addEventListener('touchmove', (e) => {
        if (!this.isDragging || e.touches.length !== 1) return;
        const dx = e.touches[0].clientX - this.lastMouseX;
        const dy = e.touches[0].clientY - this.lastMouseY;
        this.rotY += dx * 0.008;
        this.rotX += dy * 0.008;
        this.lastMouseX = e.touches[0].clientX;
        this.lastMouseY = e.touches[0].clientY;
      }, { passive: true });

      window.addEventListener('touchend', () => {
        this.isDragging = false;
      });

      // Part Inspector Hover Tooltip
      this.canvas.addEventListener('mousemove', (e) => {
        const rect = this.canvas.getBoundingClientRect();
        const mx = (e.clientX - rect.left) / rect.width;
        const my = (e.clientY - rect.top) / rect.height;
        const tag = document.getElementById('cadPartTag');
        if (!tag) return;

        const distFromCenter = Math.hypot(mx - 0.5, my - 0.5);
        if (distFromCenter < 0.12) {
          tag.innerText = 'COMPONENT: ALLOY FORGED SHAFT (EN8/EN9) • GROUND TO ±0.005mm';
        } else if (distFromCenter < 0.24) {
          tag.innerText = 'COMPONENT: DIE-CAST SKEWED ROTOR (AL A380) • ZERO COGGING TORQUE';
        } else if (distFromCenter < 0.38) {
          tag.innerText = 'COMPONENT: STATOR CORE PACK (CRNGO M270-50A) • HYDRAULIC CLEATED';
        } else if (distFromCenter < 0.48) {
          tag.innerText = 'COMPONENT: CAST IRON MOTOR FRAME HOUSING • DAKSHIN FOUNDRY';
        } else {
          tag.innerText = 'CAD STATOR-ROTOR EXPLODED ENGINE • DRAG TO ORBIT';
        }
      });
    }

    setExploded(val) {
      this.targetExploded = Math.max(0, Math.min(1, val));
      const expSlider = document.getElementById('explodeSlider');
      if (expSlider) expSlider.value = Math.round(this.targetExploded * 100);
      sound.playHydraulic();
    }

    setMode(mode) {
      this.mode = mode;
      sound.playPneumatic();
    }

    setRPM(val) {
      this.rpm = parseInt(val, 10);
      sound.updateMotorHum(this.rpm);

      const rpmDisplay = document.getElementById('rpmDisplayVal');
      const freqDisplay = document.getElementById('freqDisplayVal');
      const torqueDisplay = document.getElementById('torqueDisplayVal');

      if (rpmDisplay) rpmDisplay.innerText = this.rpm;
      if (freqDisplay) freqDisplay.innerText = ((this.rpm / 60) * 2).toFixed(1); // 4-pole standard
      if (torqueDisplay) {
        const torque = this.rpm > 0 ? ((45 * 9550) / this.rpm).toFixed(1) : '0.0';
        torqueDisplay.innerText = torque;
      }
    }

    project(x, y, z) {
      // Rotation around Y
      const cosY = Math.cos(this.rotY);
      const sinY = Math.sin(this.rotY);
      const x1 = x * cosY + z * sinY;
      const z1 = -x * sinY + z * cosY;

      // Rotation around X
      const cosX = Math.cos(this.rotX);
      const sinX = Math.sin(this.rotX);
      const y2 = y * cosX - z1 * sinX;
      const z2 = y * sinX + z1 * cosX;

      // Perspective projection
      const fov = 640;
      const scale = (fov / (fov + z2 + 320)) * this.zoom;
      const cx = this.width / 2;
      const cy = this.height / 2;

      return {
        x: cx + x1 * scale,
        y: cy + y2 * scale,
        z: z2,
        scale: scale
      };
    }

    drawCylinder(radius, length, zOffset, color, strokeColor, teeth = 0, isRotor = false) {
      const slices = teeth > 0 ? teeth * 2 : 28;
      const halfL = length / 2;
      const pointsTop = [];
      const pointsBot = [];
      const currentAngle = isRotor ? this.angle : 0;

      for (let i = 0; i < slices; i++) {
        let r = radius;
        if (teeth > 0 && i % 2 === 1) {
          r = radius * 0.88;
        }
        const a = (i / slices) * Math.PI * 2 + currentAngle;
        const px = Math.cos(a) * r;
        const py = Math.sin(a) * r;

        pointsTop.push(this.project(px, py, zOffset - halfL));
        pointsBot.push(this.project(px, py, zOffset + halfL));
      }

      // Draw lateral faces
      for (let i = 0; i < slices; i++) {
        const next = (i + 1) % slices;
        const p1 = pointsTop[i];
        const p2 = pointsTop[next];
        const p3 = pointsBot[next];
        const p4 = pointsBot[i];

        this.ctx.beginPath();
        this.ctx.moveTo(p1.x, p1.y);
        this.ctx.lineTo(p2.x, p2.y);
        this.ctx.lineTo(p3.x, p3.y);
        this.ctx.lineTo(p4.x, p4.y);
        this.ctx.closePath();

        if (this.mode === 'wireframe') {
          this.ctx.strokeStyle = strokeColor || '#00f0ff';
          this.ctx.lineWidth = 1;
          this.ctx.stroke();
        } else if (this.mode === 'thermal') {
          // Heat dissipation simulation
          const heatFactor = (i / slices);
          this.ctx.fillStyle = isRotor ? '#ff3a00' : (heatFactor > 0.5 ? '#ff9f00' : '#00a8ff');
          this.ctx.fill();
          this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
          this.ctx.stroke();
        } else {
          const normalZ = Math.cos((i / slices) * Math.PI * 2 + this.rotY);
          const shade = Math.max(0.2, 0.55 + normalZ * 0.4);
          this.ctx.fillStyle = this.colorShade(color, shade);
          this.ctx.fill();
          this.ctx.strokeStyle = strokeColor || 'rgba(0, 240, 255, 0.15)';
          this.ctx.lineWidth = 0.5;
          this.ctx.stroke();
        }
      }

      // Draw end caps
      this.drawCap(pointsTop, color, strokeColor);
      this.drawCap(pointsBot, color, strokeColor);
    }

    drawCap(points, color, strokeColor) {
      if (points.length < 3) return;
      this.ctx.beginPath();
      this.ctx.moveTo(points[0].x, points[0].y);
      for (let i = 1; i < points.length; i++) {
        this.ctx.lineTo(points[i].x, points[i].y);
      }
      this.ctx.closePath();

      if (this.mode === 'wireframe') {
        this.ctx.strokeStyle = strokeColor || '#00f0ff';
        this.ctx.stroke();
      } else {
        this.ctx.fillStyle = this.colorShade(color, 0.75);
        this.ctx.fill();
        this.ctx.strokeStyle = strokeColor || 'rgba(0, 240, 255, 0.2)';
        this.ctx.stroke();
      }
    }

    colorShade(hex, factor) {
      if (hex.startsWith('rgba')) return hex;
      if (!hex.startsWith('#')) return hex;
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return `rgb(${Math.floor(r * factor)}, ${Math.floor(g * factor)}, ${Math.floor(b * factor)})`;
    }

    drawFluxLines() {
      const poles = 4;
      const count = 16;
      const time = Date.now() * 0.003;

      for (let p = 0; p < poles; p++) {
        const poleAngle = (p / poles) * Math.PI * 2;
        for (let i = 0; i < count; i++) {
          const t = ((i / count) + time) % 1;
          const r = 40 + t * 55;
          const a = poleAngle + (Math.sin(time * 2 + i) * 0.25);

          const px = Math.cos(a) * r;
          const py = Math.sin(a) * r;
          const pz = (Math.cos(i) * 20);

          const proj = this.project(px, py, pz);

          this.ctx.beginPath();
          this.ctx.arc(proj.x, proj.y, 2.8 * proj.scale, 0, Math.PI * 2);
          this.ctx.fillStyle = p % 2 === 0 ? '#00f0ff' : '#ffb800';
          this.ctx.shadowColor = p % 2 === 0 ? '#00f0ff' : '#ffb800';
          this.ctx.shadowBlur = 10;
          this.ctx.fill();
          this.ctx.shadowBlur = 0;
        }
      }
    }

    animate() {
      requestAnimationFrame(this.animate);

      // Smooth interpolation for exploded state
      this.exploded += (this.targetExploded - this.exploded) * 0.08;

      // Rotor rotation based on RPM
      const radPerFrame = (this.rpm / 60) * (Math.PI * 2) * (1 / 60);
      this.angle += radPerFrame;

      this.ctx.clearRect(0, 0, this.width, this.height);

      // Draw CAD crosshair center lines
      this.ctx.strokeStyle = 'rgba(0, 240, 255, 0.06)';
      this.ctx.lineWidth = 1;
      this.ctx.beginPath();
      this.ctx.moveTo(this.width / 2, 0);
      this.ctx.lineTo(this.width / 2, this.height);
      this.ctx.moveTo(0, this.height / 2);
      this.ctx.lineTo(this.width, this.height / 2);
      this.ctx.stroke();

      const exp = this.exploded * 180; // axial separation distance in pixels

      // 1. Hardened Steel Shaft
      this.drawCylinder(16, 260 + exp * 0.4, 0, '#8c9ba5', '#00f0ff', 0, true);

      // 2. Die-Cast Skewed Rotor Core
      this.drawCylinder(52, 90, 0, '#3a4b56', '#d93b20', 18, true);

      // 3. Stator Laminated Core Pack (splits outward)
      this.drawCylinder(98, 110, exp, '#243040', '#00f0ff', 24, false);

      // 4. Stator Frame & Cast Iron Casing (moves further outward)
      this.drawCylinder(118, 130, exp * 1.5, '#17202c', '#ffb800', 0, false);

      // 5. Copper Windings End-Turns
      this.drawCylinder(88, 20, exp + 60, '#d97b20', '#ff9f1c', 24, false);
      this.drawCylinder(88, 20, exp - 60, '#d97b20', '#ff9f1c', 24, false);

      // Render Flux Lines in Flux Mode
      if (this.mode === 'flux') {
        this.drawFluxLines();
      }

      // Dimension callout HUD in exploded view
      if (this.exploded > 0.25) {
        this.drawDimensionCallout('Ø 1300 mm MAX STATOR LAMINATION', 98, exp);
        this.drawDimensionCallout('PRECISION AIR GAP: 0.35 mm ± 0.005', 52, 0);
      }
    }

    drawDimensionCallout(text, r, z) {
      const p = this.project(r, 0, z);
      this.ctx.font = '10px "JetBrains Mono", monospace';
      this.ctx.fillStyle = '#00f0ff';
      this.ctx.fillText(text, p.x + 12, p.y - 10);
      this.ctx.strokeStyle = '#00f0ff';
      this.ctx.beginPath();
      this.ctx.moveTo(p.x, p.y);
      this.ctx.lineTo(p.x + 10, p.y - 10);
      this.ctx.lineTo(p.x + 150, p.y - 10);
      this.ctx.stroke();
    }
  }

  // ==========================================================================
  // 3. INTERACTIVE 2D KINEMATIC GEAR TRAIN ENGINE
  // ==========================================================================
  class GearTrainDivider {
    constructor(canvasId) {
      this.canvas = document.getElementById(canvasId);
      if (!this.canvas) return;
      this.ctx = this.canvas.getContext('2d');
      this.angle = 0;
      this.speed = 0.015;
      this.scrollVelocity = 0;
      this.lastScrollY = window.scrollY;

      this.resize();
      window.addEventListener('resize', () => this.resize());
      window.addEventListener('scroll', () => {
        const delta = Math.abs(window.scrollY - this.lastScrollY);
        this.scrollVelocity = delta * 0.002;
        this.lastScrollY = window.scrollY;
      }, { passive: true });

      this.animate = this.animate.bind(this);
      requestAnimationFrame(this.animate);
    }

    resize() {
      const rect = this.canvas.getBoundingClientRect();
      this.width = rect.width * (window.devicePixelRatio || 1);
      this.height = rect.height * (window.devicePixelRatio || 1);
      this.canvas.width = this.width;
      this.canvas.height = this.height;
    }

    drawGear(cx, cy, radius, teeth, angle, color, direction = 1) {
      this.ctx.save();
      this.ctx.translate(cx, cy);
      this.ctx.rotate(angle * direction);

      const rootR = radius * 0.78;
      const pitchR = radius * 0.9;
      const outerR = radius * 1.05;

      this.ctx.beginPath();
      const totalSteps = teeth * 4;
      for (let i = 0; i <= totalSteps; i++) {
        const theta = (i / totalSteps) * Math.PI * 2;
        const toothPhase = (i % 4);
        let r = rootR;
        if (toothPhase === 1 || toothPhase === 2) {
          r = outerR;
        }

        const x = Math.cos(theta) * r;
        const y = Math.sin(theta) * r;
        if (i === 0) this.ctx.moveTo(x, y);
        else this.ctx.lineTo(x, y);
      }
      this.ctx.closePath();

      this.ctx.fillStyle = color;
      this.ctx.fill();
      this.ctx.strokeStyle = 'rgba(0, 240, 255, 0.25)';
      this.ctx.lineWidth = 1;
      this.ctx.stroke();

      // Pitch circle
      this.ctx.beginPath();
      this.ctx.arc(0, 0, pitchR, 0, Math.PI * 2);
      this.ctx.setLineDash([3, 4]);
      this.ctx.strokeStyle = 'rgba(217, 59, 32, 0.4)';
      this.ctx.stroke();
      this.ctx.setLineDash([]);

      // Center bore hole
      this.ctx.beginPath();
      this.ctx.arc(0, 0, radius * 0.25, 0, Math.PI * 2);
      this.ctx.fillStyle = '#080b10';
      this.ctx.fill();
      this.ctx.stroke();

      this.ctx.restore();
    }

    animate() {
      requestAnimationFrame(this.animate);
      this.ctx.clearRect(0, 0, this.width, this.height);

      this.speed += (0.015 + this.scrollVelocity - this.speed) * 0.05;
      this.scrollVelocity *= 0.92;
      this.angle += this.speed;

      const cy = this.height / 2;
      const dpr = window.devicePixelRatio || 1;
      const g1R = 60 * dpr;
      const g2R = 40 * dpr;
      const g3R = 80 * dpr;
      const g4R = 50 * dpr;

      const spacing = g1R * 0.9 + g2R * 0.9;
      const startX = this.width * 0.12;

      this.drawGear(startX, cy, g1R, 20, this.angle, 'rgba(20, 28, 42, 0.7)', 1);
      this.drawGear(startX + spacing, cy, g2R, 14, this.angle * (20 / 14), 'rgba(28, 38, 56, 0.8)', -1);
      this.drawGear(startX + spacing + (g2R * 0.9 + g3R * 0.9), cy, g3R, 28, this.angle * (14 / 28) * (20 / 14), 'rgba(217, 59, 32, 0.15)', 1);
      this.drawGear(startX + spacing + (g2R * 0.9 + g3R * 0.9) + (g3R * 0.9 + g4R * 0.9), cy, g4R, 18, this.angle, 'rgba(0, 240, 255, 0.12)', -1);
    }
  }

  // ==========================================================================
  // 4. INTERACTIVE 8-STAGE PRECISION ASSEMBLY LINE CONVEYOR
  // ==========================================================================
  class AssemblyLineSimulator {
    constructor(canvasId) {
      this.canvas = document.getElementById(canvasId);
      if (!this.canvas) return;
      this.ctx = this.canvas.getContext('2d');

      this.currentStation = 0;
      this.autoCycling = false;
      this.autoTimer = null;
      this.time = 0;

      this.stations = [
        {
          num: '01',
          code: 'STATION 01 // EDM SPARK EROSION',
          speed: 'WIRE FEED: 0.18 mm/s',
          tool: 'TOOL: TUNGSTEN CARBIDE DIE',
          title: 'In-House Tool Design & Wire EDM',
          desc: 'Pitti operates an ultra-modern in-house toolroom equipped with high-precision sub-micron CNC Wire Cut EDM and optical profile grinders. We design and manufacture progressive carbide stamping dies, compound tooling, and specialized jigs ensuring micro-tolerance accuracy across millions of cycles.',
          m1Val: '± 0.002 mm', m1Lbl: 'Tool Die Precision',
          m2Val: 'Sub-Micron', m2Lbl: 'Wire Cut Accuracy',
          m3Val: '40+ Years', m3Lbl: 'Tooling Expertise'
        },
        {
          num: '02',
          code: 'STATION 02 // HIGH-SPEED PRESS STAMPING',
          speed: 'LINE SPEED: 400 STROKES/MIN',
          tool: 'PRESS: 400T / 630T AUTOMATED',
          title: 'High-Speed Automated Pressing',
          desc: 'High-capacity automated stamping press lines running at up to 400 strokes per minute. Feeds continuous coils of CRNGO/CRGO electrical steel with automated decoilers, straighteners, and sensor-monitored progressive dies for perfect burr-free lamination stampings.',
          m1Val: '400 SPM', m1Lbl: 'Max Punching Speed',
          m2Val: '< 0.02 mm', m2Lbl: 'Max Burr Height',
          m3Val: '90,000 MT', m3Lbl: 'Annual Capacity'
        },
        {
          num: '03',
          code: 'STATION 03 // CNC MULTI-AXIS LASER CUTTING',
          speed: 'CUTTING BEAM: 10 kW FIBER LASER',
          tool: 'SYSTEM: TRUMPF / BYSTRONIC CNC',
          title: 'Precision Laser Cutting Prototyping',
          desc: 'Equipped with multi-axis CNC laser cutting systems capable of processing specialized laminations up to 1300 mm diameter. Ideal for rapid prototyping, pre-series qualification, and complex segment geometries without upfront hard tooling costs.',
          m1Val: '1,300 mm', m1Lbl: 'Max Diameter',
          m2Val: 'Zero Burr', m2Lbl: 'Edge Quality',
          m3Val: 'Rapid Cad', m3Lbl: 'Tool-Free Turnaround'
        },
        {
          num: '04',
          code: 'STATION 04 // CORE STACKING & CLEATING',
          speed: 'HYDRAULIC CLAMP: 120 TONS',
          tool: 'METHOD: AUTOMATED CLEAT WELDING',
          title: 'Core Building & Hydraulic Cleating',
          desc: 'Precision stacking of stator laminations using specialized alignment mandrels. Packs are hydraulically clamped to exact stack height and locked using cleat forming, laser welding, and automated TIG/MIG beads ensuring extreme magnetic rigidity.',
          m1Val: '1,800 mm', m1Lbl: 'Max Stack Height',
          m2Val: '10 Tons', m2Lbl: 'Max Core Assembly',
          m3Val: '100% Solid', m3Lbl: 'Rigidity Score'
        },
        {
          num: '05',
          code: 'STATION 05 // DIE-CASTING ALUMINUM ROTORS',
          speed: 'POUR TEMP: 710°C ALUMINUM',
          tool: 'CHAMBER: HIGH PRESSURE DIE CAST',
          title: 'Aluminum Rotor Pressure Die-Casting',
          desc: 'Rotors are assembled with precise conductor skewing and transferred to high-pressure die-casting machines. Molten commercial or high-purity aluminum is injected into rotor slots, forming integral end rings and cooling fan blades with zero internal porosity.',
          m1Val: '180 kg', m1Lbl: 'Max Rotor Weight',
          m2Val: '1,500 mm', m2Lbl: 'Max Rotor Height',
          m3Val: 'Zero Void', m3Lbl: 'Cast Integrity'
        },
        {
          num: '06',
          code: 'STATION 06 // 5-AXIS CNC PRECISION MACHINING',
          speed: 'SPINDLE: 12,000 RPM CNC BORING',
          tool: 'MACHINES: VMC / HMC / AIR GAP TURNING',
          title: 'Multi-Axis Precision Machining',
          desc: 'Supported by 691,200 annual machining hours across high-end Horizontal and Vertical Machining Centers. Features specialized air gap turning where the rotor and stator bore are turned to sub-micron concentricity, eliminating cogging torque and mechanical imbalance.',
          m1Val: '691k Hrs', m1Lbl: 'Machining Capacity',
          m2Val: '±0.005 mm', m2Lbl: 'Machining Tolerance',
          m3Val: 'Turnkey', m3Lbl: 'Finish Quality'
        },
        {
          num: '07',
          code: 'STATION 07 // DECARB ANNEALING FURNACES',
          speed: 'ATMOSPHERE: N2 + H2 CONTROLLED',
          tool: 'FURNACE: CONTINUOUS ROLLER HEARTH',
          title: 'Controlled Atmosphere Decarb Annealing',
          desc: 'Continuous roller-hearth decarburizing and stress-relief annealing furnaces. Restores optimal magnetic permeability and eliminates mechanical stamping stress, ensuring industry-benchmark low watt-loss figures across all frequency bands.',
          m1Val: 'Low Loss', m1Lbl: 'Specific Watt Loss',
          m2Val: 'Stress Free', m2Lbl: 'Crystal Grain Growth',
          m3Val: 'Class A', m3Lbl: 'Magnetic Quality'
        },
        {
          num: '08',
          code: 'STATION 08 // ZEISS CMM & METROLOGY',
          speed: 'PROBE: 3D LASER CONTINUOUS SCAN',
          tool: 'METROLOGY: ZEISS CMM & EPSTEIN FRAME',
          title: 'Zeiss 3D CMM & Metrology Testing',
          desc: 'Every production lot undergoes rigorous quality checks using Zeiss coordinate measuring machines (CMM), optical profile projectors, Epstein test frames for specific core loss, and dynamic balancing rigs certified under ISO 9001, IATF 16949, and IRIS standards.',
          m1Val: 'Zeiss CMM', m1Lbl: '3D Laser Coordinate',
          m2Val: 'Epstein Frame', m2Lbl: 'Core Loss Verification',
          m3Val: 'ISO / IATF', m3Lbl: 'Quality Certified'
        }
      ];

      this.resize();
      window.addEventListener('resize', () => this.resize());
      this.initEvents();
      this.animate = this.animate.bind(this);
      requestAnimationFrame(this.animate);
    }

    resize() {
      const rect = this.canvas.getBoundingClientRect();
      this.width = rect.width * (window.devicePixelRatio || 1);
      this.height = rect.height * (window.devicePixelRatio || 1);
      this.canvas.width = this.width;
      this.canvas.height = this.height;
    }

    setStation(index) {
      this.currentStation = (index + this.stations.length) % this.stations.length;
      const st = this.stations[this.currentStation];
      sound.playPneumatic();

      // Update Tabs
      document.querySelectorAll('.station-tab').forEach((tab, i) => {
        tab.classList.toggle('active', i === this.currentStation);
      });

      // Update Dossier
      document.getElementById('stageCodeDisplay').innerText = st.code;
      document.getElementById('stageCycleDisplay').innerText = st.speed;
      document.getElementById('stageToolDisplay').innerText = st.tool;
      document.getElementById('stationDossierNum').innerText = `STATION SPECIFICATION // ${st.num}`;
      document.getElementById('stationTitle').innerText = st.title;
      document.getElementById('stationDesc').innerText = st.desc;
      document.getElementById('metric1Val').innerText = st.m1Val;
      document.getElementById('metric1Lbl').innerText = st.m1Lbl;
      document.getElementById('metric2Val').innerText = st.m2Val;
      document.getElementById('metric2Lbl').innerText = st.m2Lbl;
      document.getElementById('metric3Val').innerText = st.m3Val;
      document.getElementById('metric3Lbl').innerText = st.m3Lbl;
    }

    toggleAutoCycle() {
      this.autoCycling = !this.autoCycling;
      const btn = document.getElementById('autoRunConveyorBtn');
      if (this.autoCycling) {
        if (btn) btn.innerHTML = '<span>STOP AUTO-CYCLE ⏹</span>';
        this.autoTimer = setInterval(() => {
          this.setStation(this.currentStation + 1);
        }, 3800);
      } else {
        if (btn) btn.innerHTML = '<span>AUTO-CYCLE LINE ▶</span>';
        clearInterval(this.autoTimer);
      }
      sound.playHydraulic();
    }

    initEvents() {
      document.querySelectorAll('.station-tab').forEach((tab, i) => {
        tab.addEventListener('click', () => {
          this.setStation(i);
        });
      });

      const nextBtn = document.getElementById('nextStationBtn');
      const prevBtn = document.getElementById('prevStationBtn');
      const autoBtn = document.getElementById('autoRunConveyorBtn');

      if (nextBtn) nextBtn.addEventListener('click', () => this.setStation(this.currentStation + 1));
      if (prevBtn) prevBtn.addEventListener('click', () => this.setStation(this.currentStation - 1));
      if (autoBtn) autoBtn.addEventListener('click', () => this.toggleAutoCycle());
    }

    animate() {
      requestAnimationFrame(this.animate);
      this.time += 0.03;
      this.ctx.clearRect(0, 0, this.width, this.height);

      const cx = this.width / 2;
      const cy = this.height / 2;

      // Draw technical grid background in machine viewport
      this.ctx.strokeStyle = 'rgba(0, 240, 255, 0.05)';
      this.ctx.lineWidth = 1;
      const gridStep = 40 * (window.devicePixelRatio || 1);
      for (let x = 0; x < this.width; x += gridStep) {
        this.ctx.beginPath();
        this.ctx.moveTo(x, 0);
        this.ctx.lineTo(x, this.height);
        this.ctx.stroke();
      }
      for (let y = 0; y < this.height; y += gridStep) {
        this.ctx.beginPath();
        this.ctx.moveTo(0, y);
        this.ctx.lineTo(this.width, y);
        this.ctx.stroke();
      }

      // Draw active machine animation based on station index
      switch (this.currentStation) {
        case 0:
          this.drawEDMStation(cx, cy);
          break;
        case 1:
          this.drawPressStation(cx, cy);
          break;
        case 2:
          this.drawLaserStation(cx, cy);
          break;
        case 3:
          this.drawCleatStation(cx, cy);
          break;
        case 4:
          this.drawDieCastStation(cx, cy);
          break;
        case 5:
          this.drawCNCStation(cx, cy);
          break;
        case 6:
          this.drawAnnealingStation(cx, cy);
          break;
        case 7:
          this.drawMetrologyStation(cx, cy);
          break;
      }
    }

    // 0: EDM Wire Cut Spark Animation
    drawEDMStation(cx, cy) {
      // Carbide Plate
      this.ctx.fillStyle = '#1c2636';
      this.ctx.fillRect(cx - 140, cy - 60, 280, 120);
      this.ctx.strokeStyle = '#00f0ff';
      this.ctx.strokeRect(cx - 140, cy - 60, 280, 120);

      // Wire Guides (Top & Bottom)
      this.ctx.fillStyle = '#64748b';
      this.ctx.fillRect(cx - 10, cy - 120, 20, 40);
      this.ctx.fillRect(cx - 10, cy + 80, 20, 40);

      // EDM Wire
      const wireX = cx + Math.sin(this.time * 2) * 50;
      this.ctx.strokeStyle = '#ffb800';
      this.ctx.lineWidth = 2;
      this.ctx.beginPath();
      this.ctx.moveTo(wireX, cy - 120);
      this.ctx.lineTo(wireX, cy + 120);
      this.ctx.stroke();

      // Electrical Sparks
      for (let i = 0; i < 8; i++) {
        const sparkY = cy - 40 + Math.random() * 80;
        const sparkX = wireX + (Math.random() - 0.5) * 20;
        this.ctx.beginPath();
        this.ctx.arc(sparkX, sparkY, 2 + Math.random() * 3, 0, Math.PI * 2);
        this.ctx.fillStyle = '#00f0ff';
        this.ctx.shadowColor = '#00f0ff';
        this.ctx.shadowBlur = 8;
        this.ctx.fill();
        this.ctx.shadowBlur = 0;
      }
    }

    // 1: Automated Stamping Press Piston
    drawPressStation(cx, cy) {
      // Bottom Anvil / Bolster
      this.ctx.fillStyle = '#1c2636';
      this.ctx.fillRect(cx - 160, cy + 50, 320, 70);
      this.ctx.strokeStyle = '#00f0ff';
      this.ctx.strokeRect(cx - 160, cy + 50, 320, 70);

      // Sheet Metal Strip advancing
      this.ctx.fillStyle = '#94a3b8';
      this.ctx.fillRect(cx - 200, cy + 38, 400, 12);

      // Moving Hydraulic Ram Piston
      const pistonY = cy - 90 + Math.abs(Math.sin(this.time * 4)) * 95;
      this.ctx.fillStyle = '#d93b20';
      this.ctx.fillRect(cx - 110, pistonY - 80, 220, 80);
      this.ctx.strokeStyle = '#ff9f1c';
      this.ctx.strokeRect(cx - 110, pistonY - 80, 220, 80);

      // Impact Shockwave
      if (Math.abs(Math.sin(this.time * 4)) > 0.94) {
        this.ctx.strokeStyle = '#ffb800';
        this.ctx.lineWidth = 3;
        this.ctx.beginPath();
        this.ctx.arc(cx, cy + 45, 50 + Math.random() * 30, 0, Math.PI * 2);
        this.ctx.stroke();
      }
    }

    // 2: Laser Cutting Red Beam
    drawLaserStation(cx, cy) {
      // Stator Lamination Disc
      this.ctx.beginPath();
      this.ctx.arc(cx, cy + 20, 90, 0, Math.PI * 2);
      this.ctx.fillStyle = '#17202c';
      this.ctx.fill();
      this.ctx.strokeStyle = '#00f0ff';
      this.ctx.stroke();

      // Moving Laser Head
      const headX = cx + Math.cos(this.time * 3) * 70;
      const headY = cy + 20 + Math.sin(this.time * 3) * 70;

      // Laser Nozzle
      this.ctx.fillStyle = '#475569';
      this.ctx.fillRect(headX - 14, headY - 80, 28, 40);

      // Laser Beam (Piercing Red)
      this.ctx.strokeStyle = '#ff2b00';
      this.ctx.lineWidth = 3;
      this.ctx.beginPath();
      this.ctx.moveTo(headX, headY - 40);
      this.ctx.lineTo(headX, headY);
      this.ctx.stroke();

      // Molten Sparks
      for (let i = 0; i < 10; i++) {
        const sx = headX + (Math.random() - 0.5) * 35;
        const sy = headY + (Math.random() - 0.5) * 35;
        this.ctx.beginPath();
        this.ctx.arc(sx, sy, 2, 0, Math.PI * 2);
        this.ctx.fillStyle = '#ffb800';
        this.ctx.shadowColor = '#ff3b00';
        this.ctx.shadowBlur = 10;
        this.ctx.fill();
        this.ctx.shadowBlur = 0;
      }
    }

    // 3: Core Building & Hydraulic Cleat
    drawCleatStation(cx, cy) {
      // Core Stack Pack (Multiple Laminations)
      const layers = 14;
      const stackW = 180;
      for (let i = 0; i < layers; i++) {
        const ly = cy - 60 + i * 9;
        this.ctx.fillStyle = i % 2 === 0 ? '#334155' : '#1e293b';
        this.ctx.fillRect(cx - stackW / 2, ly, stackW, 8);
      }
      this.ctx.strokeStyle = '#00f0ff';
      this.ctx.strokeRect(cx - stackW / 2, cy - 60, stackW, layers * 9);

      // Left & Right Hydraulic Cleat Clamps
      const clampOffset = Math.sin(this.time * 2) * 12;
      this.ctx.fillStyle = '#d93b20';
      this.ctx.fillRect(cx - stackW / 2 - 35 + clampOffset, cy - 40, 35, 80);
      this.ctx.fillRect(cx + stackW / 2 - clampOffset, cy - 40, 35, 80);

      // Weld Arc Flash
      if (Math.sin(this.time * 3) > 0.6) {
        this.ctx.fillStyle = '#ffffff';
        this.ctx.shadowColor = '#00f0ff';
        this.ctx.shadowBlur = 16;
        this.ctx.fillRect(cx - stackW / 2 - 4, cy - 10, 8, 20);
        this.ctx.fillRect(cx + stackW / 2 - 4, cy - 10, 8, 20);
        this.ctx.shadowBlur = 0;
      }
    }

    // 4: Rotor Die Casting Molten Flow
    drawDieCastStation(cx, cy) {
      // Rotor Core Die Outline
      this.ctx.fillStyle = '#0f172a';
      this.ctx.fillRect(cx - 90, cy - 70, 180, 140);
      this.ctx.strokeStyle = '#00f0ff';
      this.ctx.strokeRect(cx - 90, cy - 70, 180, 140);

      // Molten Aluminum Injection Channels (Glowing Orange)
      const pulse = 0.5 + Math.sin(this.time * 3) * 0.5;
      this.ctx.fillStyle = `rgba(255, ${Math.floor(120 + pulse * 60)}, 0, 0.85)`;
      for (let i = -60; i <= 60; i += 20) {
        this.ctx.fillRect(cx + i - 4, cy - 60, 8, 120);
      }

      // Mold Clamp Pressure Indicator
      this.ctx.font = '10px "JetBrains Mono", monospace';
      this.ctx.fillStyle = '#ffb800';
      this.ctx.fillText('INJECTION PRESSURE: 850 BAR', cx - 80, cy + 95);
    }

    // 5: Multi-Axis CNC Machining Lathe
    drawCNCStation(cx, cy) {
      // Rotating Shaft in Chuck
      this.ctx.fillStyle = '#64748b';
      this.ctx.fillRect(cx - 160, cy - 25, 260, 50);
      this.ctx.strokeStyle = '#00f0ff';
      this.ctx.strokeRect(cx - 160, cy - 25, 260, 50);

      // Lathe Chuck
      this.ctx.fillStyle = '#1e293b';
      this.ctx.fillRect(cx - 200, cy - 50, 45, 100);

      // CNC Cutting Tool Moving along journal
      const toolX = cx - 80 + Math.sin(this.time * 1.5) * 70;
      this.ctx.fillStyle = '#ff9f1c';
      this.ctx.beginPath();
      this.ctx.moveTo(toolX, cy - 25);
      this.ctx.lineTo(toolX - 15, cy - 65);
      this.ctx.lineTo(toolX + 15, cy - 65);
      this.ctx.closePath();
      this.ctx.fill();

      // Metal Shavings Sparks
      for (let i = 0; i < 6; i++) {
        const sx = toolX + (Math.random() - 0.5) * 20;
        const sy = cy - 25 - Math.random() * 25;
        this.ctx.fillStyle = '#ffffff';
        this.ctx.fillRect(sx, sy, 2, 2);
      }
    }

    // 6: Decarb Annealing Heated Furnace
    drawAnnealingStation(cx, cy) {
      // Furnace Chamber
      this.ctx.fillStyle = '#0b0f17';
      this.ctx.fillRect(cx - 150, cy - 80, 300, 160);
      this.ctx.strokeStyle = '#d93b20';
      this.ctx.strokeRect(cx - 150, cy - 80, 300, 160);

      // Heating Elements Glowing
      const heat = 0.5 + Math.sin(this.time * 2) * 0.4;
      this.ctx.fillStyle = `rgba(255, 60, 0, ${heat})`;
      this.ctx.shadowColor = '#ff3b00';
      this.ctx.shadowBlur = 24;
      this.ctx.fillRect(cx - 110, cy - 50, 220, 100);
      this.ctx.shadowBlur = 0;

      this.ctx.font = '11px "JetBrains Mono", monospace';
      this.ctx.fillStyle = '#fff';
      this.ctx.fillText('TEMP: 840°C • N2/H2 ATMOSPHERE', cx - 90, cy + 5);
    }

    // 7: Zeiss CMM 3D Coordinate Probe
    drawMetrologyStation(cx, cy) {
      // Stator Ring on Granite Bed
      this.ctx.fillStyle = '#1c2636';
      this.ctx.fillRect(cx - 140, cy + 40, 280, 30);
      this.ctx.beginPath();
      this.ctx.arc(cx, cy, 60, 0, Math.PI * 2);
      this.ctx.strokeStyle = '#00f0ff';
      this.ctx.stroke();

      // CMM Bridge & Probe Stylus
      const probeX = cx + Math.cos(this.time * 2) * 45;
      const probeY = cy + Math.sin(this.time * 2) * 45;

      this.ctx.strokeStyle = '#94a3b8';
      this.ctx.lineWidth = 3;
      this.ctx.beginPath();
      this.ctx.moveTo(probeX, cy - 90);
      this.ctx.lineTo(probeX, probeY);
      this.ctx.stroke();

      // Ruby Ball Stylus Tip
      this.ctx.beginPath();
      this.ctx.arc(probeX, probeY, 5, 0, Math.PI * 2);
      this.ctx.fillStyle = '#ff2b00';
      this.ctx.shadowColor = '#ff2b00';
      this.ctx.shadowBlur = 8;
      this.ctx.fill();
      this.ctx.shadowBlur = 0;

      // Coordinate Readout HUD
      this.ctx.font = '10px "JetBrains Mono", monospace';
      this.ctx.fillStyle = '#00f0ff';
      this.ctx.fillText(`X: ${(probeX).toFixed(2)} Y: ${(probeY).toFixed(2)} Z: 0.000 ±0.002`, cx - 110, cy + 95);
    }
  }

  // ==========================================================================
  // 5. TECHNICAL BLUEPRINT INSPECTOR MODAL
  // ==========================================================================
  function initBlueprintModal() {
    const modal = document.getElementById('blueprintModal');
    const backdrop = document.getElementById('modalBackdrop');
    const closeBtn = document.getElementById('closeModalBtn');
    const svgEl = document.getElementById('modalCadSvg');
    const titleEl = document.getElementById('modalProductTitle');
    const tagEl = document.getElementById('modalProductTagline');
    const descEl = document.getElementById('modalProductDescription');
    const codeEl = document.getElementById('modalHeaderCode');
    const tableBody = document.getElementById('modalSpecsTableBody');

    if (!modal) return;

    const productSpecs = {
      laminations: {
        code: 'CAD SPECIFICATION SHEET // DWG-8301',
        title: 'Electrical Steel Laminations',
        tagline: 'High-Precision Stator & Rotor Core Laminations up to 1300 mm',
        desc: 'Manufactured from premium non-grain oriented (CRNGO) and grain-oriented (CRGO) electrical steel. Engineered for energy-efficient motors, generators, and alternators with exceptional slot fidelity, sub-0.02mm burr height, and optimal stacking efficiency.',
        specs: [
          ['Maximum Outer Diameter', 'Ø 1300 mm'],
          ['Material Grades', 'CRNGO M270-50A, M330-50A, M400-50A, CRGO M080-23N'],
          ['Steel Thickness', '0.20 mm to 0.65 mm'],
          ['Max Burr Height', '< 0.02 mm (sub-micron tooling)'],
          ['Slot Geometry Tolerance', '± 0.005 mm'],
          ['Applications', 'Traction Motors, EV Motors, Wind Generators, Industrial Drives']
        ],
        svg: () => `
          <circle cx="160" cy="140" r="100" fill="rgba(0, 240, 255, 0.05)" stroke="#00f0ff" stroke-width="2" />
          <circle cx="160" cy="140" r="60" fill="#090e18" stroke="#d93b20" stroke-width="1.5" stroke-dasharray="4,4" />
          <circle cx="160" cy="140" r="25" fill="#090e18" stroke="#00f0ff" stroke-width="1" />
          <!-- Slots -->
          ${Array.from({length: 24}).map((_, i) => {
            const a = (i / 24) * Math.PI * 2;
            const x1 = 160 + Math.cos(a) * 60;
            const y1 = 140 + Math.sin(a) * 60;
            const x2 = 160 + Math.cos(a) * 82;
            const y2 = 140 + Math.sin(a) * 82;
            return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#00f0ff" stroke-width="2" />`;
          }).join('')}
          <line x1="60" y1="25" x2="260" y2="25" stroke="#ffb800" stroke-width="1.5" />
          <line x1="60" y1="18" x2="60" y2="32" stroke="#ffb800" stroke-width="1.5" />
          <line x1="260" y1="18" x2="260" y2="32" stroke="#ffb800" stroke-width="1.5" />
          <text x="160" y="20" fill="#ffb800" font-size="10" font-family="'JetBrains Mono'" text-anchor="middle">Ø 1300 mm MAX</text>
        `
      },
      subassemblies: {
        code: 'CAD SPECIFICATION SHEET // DWG-8302',
        title: 'Value-Added Subassemblies',
        tagline: 'Ready-to-Wind Stator Assemblies with Fully Machined Shafts',
        desc: 'Fully finished ready-to-wind stator subassemblies integrating cleat forming, shaft manufacturing, dynamic balancing, and air gap precision turning to eliminate customer supply chain complexity.',
        specs: [
          ['Maximum Assembly Height', 'Up to 1800 mm'],
          ['Maximum Assembly Weight', 'Up to 10 Metric Tons'],
          ['Shaft Material', 'Forged EN8, EN9, 42CrMo4 Alloy Steel'],
          ['Dynamic Balance Grade', 'ISO 1940 Grade G1.0 / G2.5'],
          ['Insulation Class', 'Class H (180°C) / Class C Ready'],
          ['Turnkey Advantage', 'Reduces OEM inventory & lead times by 40%']
        ],
        svg: () => `
          <rect x="70" y="60" width="180" height="150" fill="rgba(0, 240, 255, 0.08)" stroke="#00f0ff" stroke-width="2" />
          <rect x="145" y="20" width="30" height="230" fill="#334155" stroke="#d93b20" stroke-width="1.5" />
          <!-- Coil End turns -->
          <path d="M 70 60 Q 160 30 250 60" fill="none" stroke="#ffb800" stroke-width="8" />
          <path d="M 70 210 Q 160 240 250 210" fill="none" stroke="#ffb800" stroke-width="8" />
          <text x="160" y="270" fill="#00f0ff" font-size="10" font-family="'JetBrains Mono'" text-anchor="middle">READY-TO-WIND SUBASSEMBLY</text>
        `
      },
      motorcores: {
        code: 'CAD SPECIFICATION SHEET // DWG-8303',
        title: 'High-Precision Motor Cores',
        tagline: 'Stator & Rotor Cores up to 10 Metric Tons',
        desc: 'Built using hydraulic stacking presses and specialized automated cleating/welding. Ensures high packing factor, zero lamination vibration, and low acoustic noise under high-torque loading.',
        specs: [
          ['Stack Height Range', '100 mm to 1800 mm'],
          ['Stack Weight Capacity', 'Up to 10,000 kg (10 MT)'],
          ['Stacking Factor', '> 0.96 (Controlled hydraulic pressure)'],
          ['Joining Techniques', 'Cleating, Automated Laser Welding, Riveting, Backlack'],
          ['Vibration Proofing', 'Tested up to 50G mechanical shock'],
          ['Key Applications', 'Locomotive Propulsion, Hydro Turbines, Heavy Mining Drives']
        ],
        svg: () => `
          <rect x="90" y="50" width="140" height="160" fill="rgba(217, 59, 32, 0.15)" stroke="#d93b20" stroke-width="2" />
          ${Array.from({length: 12}).map((_, i) => `<line x1="90" y1="${55 + i * 13}" x2="230" y2="${55 + i * 13}" stroke="#00f0ff" stroke-width="1" />`).join('')}
          <line x1="160" y1="20" x2="160" y2="240" stroke="#ffb800" stroke-width="2" stroke-dasharray="6,4" />
          <text x="160" y="260" fill="#ffb800" font-size="10" font-family="'JetBrains Mono'" text-anchor="middle">STACK HEIGHT: UP TO 1800 mm</text>
        `
      },
      rotors: {
        code: 'CAD SPECIFICATION SHEET // DWG-8304',
        title: 'Die-Cast Rotors',
        tagline: 'High-Integrity Aluminum Die-Cast Rotors up to 180 kg',
        desc: 'Manufactured with high-purity aluminum and alloy die-casting. Precision skewed slots reduce high-order harmonic losses and eliminate magnetic cogging, optimizing starting torque in EV and pump motors.',
        specs: [
          ['Maximum Weight', 'Up to 180 kg'],
          ['Maximum Height', 'Up to 1500 mm'],
          ['Conductor Material', '99.7% Pure Aluminum or High-Strength Alloy'],
          ['Slot Skew Angle', 'Precision indexed (5° to 18°)'],
          ['Balancing', 'Dynamic balancing with integral cooling blades'],
          ['Target Industries', 'Electric Vehicles, Submersible Pumps, Compressors']
        ],
        svg: () => `
          <rect x="100" y="60" width="120" height="140" rx="6" fill="#1e293b" stroke="#00f0ff" stroke-width="2" />
          ${Array.from({length: 8}).map((_, i) => {
            const x = 110 + i * 14;
            return `<line x1="${x}" y1="60" x2="${x + 12}" y2="200" stroke="#ffb800" stroke-width="3" />`;
          }).join('')}
          <line x1="160" y1="30" x2="160" y2="230" stroke="#d93b20" stroke-width="1.5" />
          <text x="160" y="260" fill="#00f0ff" font-size="10" font-family="'JetBrains Mono'" text-anchor="middle">SKEWED DIE-CAST BARS</text>
        `
      },
      castings: {
        code: 'CAD SPECIFICATION SHEET // DWG-8305',
        title: 'Machined Castings',
        tagline: 'High-Grade Ductile (SG) & Grey Iron Castings from Dakshin Foundry',
        desc: 'Produced at Dakshin Foundry and Macharam foundry units. Fully machined with CNC horizontal and vertical machining centers for high-strength, dimensionally flawless end shields and motor frames.',
        specs: [
          ['Annual Foundry Output', '18,600 MT / Annum'],
          ['Cast Iron Grades', 'SG Iron (EN-GJS-400 to 700), Grey Iron (EN-GJL-200 to 300)'],
          ['Machining Readiness', 'Fully CNC finished with VMC / HMC'],
          ['Testing Protocols', 'Spectrometric chemical analysis, Ultrasonic, Magnetic particle'],
          ['Components Produced', 'Motor Frames, End Shields, Bearing Covers, Gearboxes']
        ],
        svg: () => `
          <rect x="80" y="70" width="160" height="120" rx="14" fill="rgba(0, 240, 255, 0.05)" stroke="#00f0ff" stroke-width="2" />
          <circle cx="160" cy="130" r="40" fill="#090e18" stroke="#d93b20" stroke-width="1.5" />
          <circle cx="160" cy="130" r="20" fill="#090e18" stroke="#00f0ff" stroke-width="1" />
          <text x="160" y="250" fill="#ffb800" font-size="10" font-family="'JetBrains Mono'" text-anchor="middle">MACHINED END SHIELD / FRAME</text>
        `
      },
      tools: {
        code: 'CAD SPECIFICATION SHEET // DWG-8306',
        title: 'High-Precision Press Tools',
        tagline: 'In-House Toolroom & Tungsten Carbide Progressive Dies',
        desc: 'In-house custom die and tooling design utilizing sub-micron wire EDM and optical profile grinding. We build high-speed progressive dies, compound stamping dies, and gang punching tooling ensuring millions of high-precision strokes.',
        specs: [
          ['Die Materials', 'Tungsten Carbide (Micrograin), Hardened Tool Steels (D2, M2)'],
          ['Tool Accuracy', 'Sub-micron (± 0.002 mm)'],
          ['Press Compatibility', 'Automated High-Speed Presses (100T to 630T)'],
          ['Strokes Capacity', 'Guaranteed multi-million strokes between regrinds'],
          ['CAD/CAM Integration', 'Full 3D CAD modeling & simulation in-house']
        ],
        svg: () => `
          <rect x="70" y="60" width="180" height="130" fill="#0f172a" stroke="#00f0ff" stroke-width="2" />
          <rect x="95" y="80" width="40" height="40" fill="#334155" stroke="#ffb800" stroke-width="1.5" />
          <rect x="185" y="80" width="40" height="40" fill="#334155" stroke="#ffb800" stroke-width="1.5" />
          <circle cx="85" cy="75" r="5" fill="#d93b20" />
          <circle cx="235" cy="75" r="5" fill="#d93b20" />
          <circle cx="85" cy="175" r="5" fill="#d93b20" />
          <circle cx="235" cy="175" r="5" fill="#d93b20" />
          <text x="160" y="250" fill="#00f0ff" font-size="10" font-family="'JetBrains Mono'" text-anchor="middle">PROGRESSIVE CARBIDE DIE</text>
        `
      },
      shafts: {
        code: 'CAD SPECIFICATION SHEET // DWG-8307',
        title: 'Machined Components & Forged Shafts',
        tagline: 'Forged Alloy Steel Shafts & Specialized Air Gap Turning',
        desc: 'Heavy-duty forged shafts, precision ground journals, and fabricated motor frames supported by multi-axis CNC lathes, VMCs, HMCs, and specialized air gap turning. Delivers superior mechanical strength and structural integrity.',
        specs: [
          ['Annual Machining Capacity', '691,200 Hours / Annum'],
          ['Shaft Diameters', 'Up to 600 mm diameter journals'],
          ['Shaft Lengths', 'Up to 3500 mm overall length'],
          ['Grinding Tolerance', '± 0.005 mm concentricity and runout'],
          ['Surface Roughness', 'Ra < 0.4 µm on bearing seatings']
        ],
        svg: () => `
          <rect x="40" y="115" width="240" height="30" fill="#334155" stroke="#00f0ff" stroke-width="1.5" />
          <rect x="80" y="105" width="80" height="50" fill="#475569" stroke="#d93b20" stroke-width="1.5" />
          <rect x="200" y="110" width="40" height="40" fill="#475569" stroke="#d93b20" stroke-width="1.5" />
          <line x1="30" y1="130" x2="290" y2="130" stroke="#ffb800" stroke-width="1" stroke-dasharray="4,4" />
          <text x="160" y="220" fill="#00f0ff" font-size="10" font-family="'JetBrains Mono'" text-anchor="middle">PRECISION GROUND FORGED SHAFT</text>
        `
      }
    };

    function openModal(prodKey) {
      const data = productSpecs[prodKey];
      if (!data) return;

      codeEl.innerText = data.code;
      titleEl.innerText = data.title;
      tagEl.innerText = data.tagline;
      descEl.innerText = data.desc;
      svgEl.innerHTML = data.svg();

      tableBody.innerHTML = data.specs.map(([param, val]) => `
        <tr>
          <td>${param}</td>
          <td><strong>${val}</strong></td>
        </tr>
      `).join('');

      modal.classList.add('active');
      sound.playPneumatic();
    }

    function closeModal() {
      modal.classList.remove('active');
      sound.playClick(1000);
    }

    document.querySelectorAll('.inspect-spec-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        openModal(btn.dataset.prod);
      });
    });

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (backdrop) backdrop.addEventListener('click', closeModal);

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
      }
    });

    const modalRfqJump = document.getElementById('modalRfqJumpBtn');
    if (modalRfqJump) {
      modalRfqJump.addEventListener('click', () => {
        closeModal();
      });
    }
  }

  // ==========================================================================
  // 6. INTERACTIVE GIS RADAR MAP FOR THE 6 PITTI MANUFACTURING PLANTS
  // ==========================================================================
  class PlantRadarMap {
    constructor(canvasId) {
      this.canvas = document.getElementById(canvasId);
      if (!this.canvas) return;
      this.ctx = this.canvas.getContext('2d');

      this.plants = [
        { id: 'kothur', name: 'Kothur, Telangana', x: 0.52, y: 0.62, active: true },
        { id: 'nandigaon', name: 'Nandigaon, Telangana', x: 0.51, y: 0.60, active: false },
        { id: 'macharam', name: 'Macharam, Telangana', x: 0.53, y: 0.64, active: false },
        { id: 'aurangabad', name: 'Chhatrapati Sambhajinagar, MH', x: 0.38, y: 0.56, active: false },
        { id: 'tumakuru', name: 'Tumakuru, Karnataka (Pitti Ind.)', x: 0.44, y: 0.78, active: false },
        { id: 'hoskote', name: 'Hoskote, Karnataka (Dakshin Fdry.)', x: 0.46, y: 0.81, active: false }
      ];

      this.radarSweep = 0;
      this.resize();
      window.addEventListener('resize', () => this.resize());
      this.initInteractions();
      this.animate = this.animate.bind(this);
      requestAnimationFrame(this.animate);
    }

    resize() {
      const rect = this.canvas.getBoundingClientRect();
      this.width = rect.width * (window.devicePixelRatio || 1);
      this.height = rect.height * (window.devicePixelRatio || 1);
      this.canvas.width = this.width;
      this.canvas.height = this.height;
    }

    selectPlant(plantId) {
      this.plants.forEach(p => p.active = (p.id === plantId));
      sound.playClick(1500);

      document.querySelectorAll('.facility-card-item').forEach(card => {
        if (card.dataset.plant === plantId) {
          card.classList.add('active');
          card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        } else {
          card.classList.remove('active');
        }
      });
    }

    initInteractions() {
      this.canvas.addEventListener('click', (e) => {
        const rect = this.canvas.getBoundingClientRect();
        const clickX = (e.clientX - rect.left) / rect.width;
        const clickY = (e.clientY - rect.top) / rect.height;

        let closest = null;
        let minD = 0.08;

        this.plants.forEach(p => {
          const d = Math.hypot(p.x - clickX, p.y - clickY);
          if (d < minD) {
            minD = d;
            closest = p;
          }
        });

        if (closest) {
          this.selectPlant(closest.id);
        }
      });
    }

    animate() {
      requestAnimationFrame(this.animate);
      this.ctx.clearRect(0, 0, this.width, this.height);

      this.radarSweep = (this.radarSweep + 0.02) % (Math.PI * 2);

      // Schematic India outline
      this.drawIndiaOutline();

      // Radar scanline sweep from center
      const radarCx = this.width * 0.48;
      const radarCy = this.height * 0.65;
      const radarR = Math.min(this.width, this.height) * 0.45;

      this.ctx.save();
      this.ctx.translate(radarCx, radarCy);

      // Concentric circles
      this.ctx.strokeStyle = 'rgba(0, 240, 255, 0.08)';
      this.ctx.lineWidth = 1;
      for (let r = 50; r <= radarR; r += 60) {
        this.ctx.beginPath();
        this.ctx.arc(0, 0, r, 0, Math.PI * 2);
        this.ctx.stroke();
      }

      // Sweep gradient
      const sweepGrad = this.ctx.createRadialGradient(0, 0, 0, 0, 0, radarR);
      sweepGrad.addColorStop(0, 'rgba(0, 240, 255, 0.15)');
      sweepGrad.addColorStop(1, 'rgba(0, 240, 255, 0.0)');

      this.ctx.beginPath();
      this.ctx.moveTo(0, 0);
      this.ctx.arc(0, 0, radarR, this.radarSweep - 0.4, this.radarSweep);
      this.ctx.closePath();
      this.ctx.fillStyle = sweepGrad;
      this.ctx.fill();
      this.ctx.restore();

      // Plot plants
      this.plants.forEach(p => {
        const px = p.x * this.width;
        const py = p.y * this.height;

        this.ctx.beginPath();
        this.ctx.arc(px, py, p.active ? 8 : 5, 0, Math.PI * 2);
        this.ctx.fillStyle = p.active ? '#d93b20' : '#00f0ff';
        this.ctx.fill();

        if (p.active) {
          const pulse = (Date.now() % 1500) / 1500;
          this.ctx.beginPath();
          this.ctx.arc(px, py, 8 + pulse * 24, 0, Math.PI * 2);
          this.ctx.strokeStyle = `rgba(217, 59, 32, ${1 - pulse})`;
          this.ctx.lineWidth = 1.5;
          this.ctx.stroke();
        }

        this.ctx.font = `${p.active ? 'bold 11px' : '9px'} "JetBrains Mono", monospace`;
        this.ctx.fillStyle = p.active ? '#ffffff' : '#94a3b8';
        this.ctx.fillText(p.name.split(',')[0], px + 12, py + 4);
      });
    }

    drawIndiaOutline() {
      const points = [
        [0.35, 0.15], [0.45, 0.10], [0.55, 0.18], [0.70, 0.28], [0.85, 0.35],
        [0.78, 0.45], [0.65, 0.52], [0.58, 0.70], [0.50, 0.90], [0.42, 0.88],
        [0.35, 0.75], [0.30, 0.60], [0.22, 0.48], [0.28, 0.35], [0.35, 0.15]
      ];

      this.ctx.beginPath();
      points.forEach((pt, i) => {
        const x = pt[0] * this.width;
        const y = pt[1] * this.height;
        if (i === 0) this.ctx.moveTo(x, y);
        else this.ctx.lineTo(x, y);
      });
      this.ctx.closePath();
      this.ctx.strokeStyle = 'rgba(0, 240, 255, 0.15)';
      this.ctx.lineWidth = 1.5;
      this.ctx.setLineDash([4, 4]);
      this.ctx.stroke();
      this.ctx.setLineDash([]);
      this.ctx.fillStyle = 'rgba(0, 240, 255, 0.02)';
      this.ctx.fill();
    }
  }

  // ==========================================================================
  // 7. TECHNICAL RFQ & REAL-TIME CAD BLUEPRINT CONFIGURATOR
  // ==========================================================================
  function initRFQConfigurator() {
    const coreTypeSelect = document.getElementById('configCoreType');
    const odSlider = document.getElementById('configOD');
    const odDisplay = document.getElementById('configODVal');
    const stackSlider = document.getElementById('configStack');
    const stackDisplay = document.getElementById('configStackVal');
    const steelSelect = document.getElementById('configSteel');
    const assemblySelect = document.getElementById('configAssembly');
    const cadSvg = document.getElementById('blueprintSvg');

    const calcMassEl = document.getElementById('calcMassVal');
    const calcLossEl = document.getElementById('calcLossVal');

    if (!odSlider || !cadSvg) return;

    function updateBlueprint() {
      const od = parseInt(odSlider.value, 10);
      const stack = parseInt(stackSlider.value, 10);
      const coreType = coreTypeSelect ? coreTypeSelect.value : 'Stator Core Pack';
      const steel = steelSelect ? steelSelect.value : 'CRNGO M270-50A';
      const assembly = assemblySelect ? assemblySelect.value : 'Laser Welded';

      if (odDisplay) odDisplay.innerText = od + ' mm';
      if (stackDisplay) stackDisplay.innerText = stack + ' mm';

      // Update stamp specs
      const stampType = document.getElementById('stampCoreType');
      const stampDims = document.getElementById('stampDims');
      const stampSteel = document.getElementById('stampSteel');
      const stampAssembly = document.getElementById('stampAssembly');
      if (stampType) stampType.innerText = coreType;
      if (stampDims) stampDims.innerText = `Ø${od}mm × H${stack}mm`;
      if (stampSteel) stampSteel.innerText = steel;
      if (stampAssembly) stampAssembly.innerText = assembly;

      // Real Mathematical Calculations
      // Core volume approximated as hollow cylinder: Outer R, Inner R = 0.58 * R
      const rOuterCm = (od / 10) / 2;
      const rInnerCm = rOuterCm * 0.58;
      const stackCm = stack / 10;
      const volumeCm3 = Math.PI * (Math.pow(rOuterCm, 2) - Math.pow(rInnerCm, 2)) * stackCm * 0.96; // 0.96 stacking factor
      const density = 7.65; // g/cm^3 for electrical steel
      const massKg = Math.round((volumeCm3 * density) / 1000);

      // Core Loss calculation based on steel grade
      let lossWkg = '2.70 W/kg';
      if (steel.includes('M270')) lossWkg = '2.70 W/kg';
      else if (steel.includes('M330')) lossWkg = '3.30 W/kg';
      else if (steel.includes('M400')) lossWkg = '4.00 W/kg';
      else if (steel.includes('M080')) lossWkg = '0.80 W/kg';
      else if (steel.includes('0.27mm')) lossWkg = '1.95 W/kg';

      if (calcMassEl) calcMassEl.innerText = massKg.toLocaleString() + ' kg';
      if (calcLossEl) calcLossEl.innerText = lossWkg;

      // Draw SVG CAD Drawing
      const rOuter = Math.min(100, Math.max(40, (od / 1300) * 100));
      const rInner = rOuter * 0.58;
      const teeth = 18;

      let teethPaths = '';
      for (let i = 0; i < teeth; i++) {
        const a1 = (i / teeth) * Math.PI * 2;
        const a2 = a1 + (Math.PI / teeth) * 0.5;
        const x1 = 120 + Math.cos(a1) * rInner;
        const y1 = 120 + Math.sin(a1) * rInner;
        const x2 = 120 + Math.cos(a2) * (rInner * 1.25);
        const y2 = 120 + Math.sin(a2) * (rInner * 1.25);
        teethPaths += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#00f0ff" stroke-width="1.2" />`;
      }

      cadSvg.innerHTML = `
        <circle cx="120" cy="120" r="${rOuter}" fill="rgba(0, 240, 255, 0.05)" stroke="#00f0ff" stroke-width="2" />
        <circle cx="120" cy="120" r="${rInner}" fill="#060a12" stroke="#d93b20" stroke-width="1.5" stroke-dasharray="4,3" />
        <circle cx="120" cy="120" r="${rInner * 0.35}" fill="#060a12" stroke="#00f0ff" stroke-width="1" />
        ${teethPaths}
        <line x1="${120 - rOuter}" y1="20" x2="${120 + rOuter}" y2="20" stroke="#ffb800" stroke-width="1.5" />
        <line x1="${120 - rOuter}" y1="14" x2="${120 - rOuter}" y2="26" stroke="#ffb800" stroke-width="1.5" />
        <line x1="${120 + rOuter}" y1="14" x2="${120 + rOuter}" y2="26" stroke="#ffb800" stroke-width="1.5" />
        <text x="120" y="16" fill="#ffb800" font-size="9" font-family="'JetBrains Mono', monospace" text-anchor="middle">Ø ${od} mm</text>
        <rect x="235" y="${120 - stack * 0.05}" width="20" height="${Math.max(10, stack * 0.1)}" fill="rgba(217, 59, 32, 0.3)" stroke="#d93b20" stroke-width="1.5" />
        <text x="245" y="105" fill="#d93b20" font-size="9" font-family="'JetBrains Mono', monospace" text-anchor="middle">H: ${stack}mm</text>
      `;
    }

    [odSlider, stackSlider, coreTypeSelect, steelSelect, assemblySelect].forEach(el => {
      if (el) {
        el.addEventListener('input', () => {
          updateBlueprint();
          sound.playClick(2000);
        });
      }
    });

    updateBlueprint();

    // Form Submit
    const rfqForm = document.getElementById('rfqForm');
    if (rfqForm) {
      rfqForm.addEventListener('submit', (e) => {
        e.preventDefault();
        sound.playHydraulic();

        const submitBtn = document.getElementById('submitRfqBtn');
        if (submitBtn) {
          submitBtn.innerText = 'TRANSMITTING G-CODE SPECIFICATION...';
          submitBtn.disabled = true;
        }

        setTimeout(() => {
          const refId = 'PITTI-CAD-' + Math.floor(100000 + Math.random() * 900000);
          alert(`G-CODE SPECIFICATION TRANSMITTED SUCCESSFULLY!\n\nReference Ticket: #${refId}\nComponent: ${coreTypeSelect.value} (Ø${odSlider.value}mm × H${stackSlider.value}mm)\nSteel Grade: ${steelSelect.value}\n\nLogged to Pitti Technical Engineering Sourcing Portal.`);
          if (submitBtn) {
            submitBtn.innerText = 'SPECIFICATION TRANSMITTED ✓';
            submitBtn.disabled = false;
          }
        }, 800);
      });
    }
  }

  // ==========================================================================
  // 8. MECHANICAL CROSSHAIR CURSOR & RETICLE
  // ==========================================================================
  function initCustomCursor() {
    const cursor = document.getElementById('customCursor');
    const trail = document.getElementById('cursorTrail');
    const hudCoords = document.getElementById('hudCoords');

    if (!cursor) return;

    window.addEventListener('mousemove', (e) => {
      cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
      if (trail) {
        setTimeout(() => {
          trail.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
        }, 35);
      }
      if (hudCoords) {
        hudCoords.innerText = `X:${e.clientX.toString().padStart(4, '0')} Y:${e.clientY.toString().padStart(4, '0')}`;
      }
    });

    document.querySelectorAll('a, button, input, select, .facility-card-item, .app-tab-btn, .inspect-spec-btn, .station-tab').forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.classList.add('hovering');
        sound.playClick(1500);
      });
      el.addEventListener('mouseleave', () => {
        cursor.classList.remove('hovering');
      });
    });
  }

  // ==========================================================================
  // 9. LIVE INDIAN STANDARD TIME (IST) CLOCK
  // ==========================================================================
  function initLiveClock() {
    const clockEl = document.getElementById('hudClock');
    if (!clockEl) return;

    function updateClock() {
      const now = new Date();
      // Formatted in IST
      const options = { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
      const timeStr = now.toLocaleTimeString('en-GB', options);
      clockEl.innerText = `IST: ${timeStr}`;
    }

    setInterval(updateClock, 1000);
    updateClock();
  }

  // ==========================================================================
  // 10. GLOBAL INITIALIZATION
  // ==========================================================================
  window.addEventListener('DOMContentLoaded', () => {
    initCustomCursor();
    initLiveClock();

    // 3D Visualizer
    const visualizer = new MotorCoreVisualizer('cadCanvas3d');

    // CAD Tool Buttons
    document.querySelectorAll('.cad-tool-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.cad-tool-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const mode = btn.dataset.mode;
        if (mode === 'exploded') {
          visualizer.setExploded(visualizer.targetExploded > 0 ? 0 : 1);
          btn.innerText = visualizer.targetExploded > 0 ? 'ASSEMBLE' : 'EXPLODE VIEW';
        } else {
          visualizer.setMode(mode);
        }
      });
    });

    // RPM & Explode Sliders
    const rpmSlider = document.getElementById('rpmSlider');
    if (rpmSlider) {
      rpmSlider.addEventListener('input', (e) => {
        visualizer.setRPM(e.target.value);
      });
    }

    const explodeSlider = document.getElementById('explodeSlider');
    if (explodeSlider) {
      explodeSlider.addEventListener('input', (e) => {
        visualizer.setExploded(e.target.value / 100);
      });
    }

    // Audio Engine Toggle
    const audioBtn = document.getElementById('audioToggleBtn');
    const audioText = document.getElementById('audioStatusText');
    if (audioBtn) {
      audioBtn.addEventListener('click', () => {
        const active = sound.toggle();
        audioBtn.classList.toggle('active', active);
        if (audioText) {
          audioText.innerText = active ? 'AUDIO: ONLINE' : 'AUDIO: MUTED';
        }
      });
    }

    // Kinematic Gear Train Divider
    new GearTrainDivider('gearDividerCanvas');

    // 8-Stage Conveyor Line
    new AssemblyLineSimulator('assemblyLineCanvas');

    // Blueprint Inspector Modal
    initBlueprintModal();

    // Plant Radar Map
    const radar = new PlantRadarMap('indiaRadarCanvas');
    document.querySelectorAll('.facility-card-item').forEach(card => {
      card.addEventListener('click', () => {
        const plantId = card.dataset.plant;
        radar.selectPlant(plantId);
      });
    });

    // Application Selector
    const appData = {
      railway: {
        title: 'Railways & Mass Urban Transport',
        desc: 'Specialized motor core assemblies and precision components for Indian Railways freight & passenger locomotives, Vande Bharat trainsets, and urban mass rapid transit (Metro) propulsion motors.',
        img: 'assets/Mass-Urban-Transport-min.png',
        specs: ['100% Stator Rigidity', 'Class H Insulation Ready', 'Vibration Resistance up to 50G']
      },
      ev: {
        title: 'Electric Vehicle (EV) Motors',
        desc: 'Ultra-thin gauge electrical steel laminations (0.20mm - 0.35mm) designed for high-RPM automotive traction motors with segmented stator geometries and lightweight die-cast rotors.',
        img: 'assets/vehicle.png',
        specs: ['Low Core-Loss High Flux', 'Up to 20,000 RPM Testing', 'Segmented Tooling Support']
      },
      wind: {
        title: 'Wind Turbines & Renewable Power',
        desc: 'Segmented stator and rotor core packs for multi-megawatt direct-drive and geared wind turbine generators engineered to withstand harsh offshore and onshore environmental conditions.',
        img: 'assets/4.png',
        specs: ['Segment Ring Stacking', 'Diameter up to 1300 mm', 'High Torque Density']
      },
      thermal: {
        title: 'Thermal & Hydro Power Generation',
        desc: 'Heavy-duty lamination packs and subassemblies for large turbogenerators and hydro power alternators with specialized cleat forming, air gap turning, and precision clamping.',
        img: 'assets/3.png',
        specs: ['Stator Heights to 1800mm', 'Assemblies up to 10 MT', 'Precision Slot Geometry']
      },
      datacenters: {
        title: 'Data Center Power & DG Sets',
        desc: 'Mission-critical diesel generator alternator cores and high-efficiency ventilation blower motors ensuring uninterrupted standby power for Tier IV hyperscale data centers.',
        img: 'assets/2.png',
        specs: ['High Frequency Stability', 'Sub-Zero Harmonic Loss', '100% Core Testing']
      },
      medical: {
        title: 'Medical Equipment & Imaging',
        desc: 'Ultra-low acoustic noise motor cores for MRI imaging gantries, CT scanners, and surgical robotics requiring zero electromagnetic distortion and micro-tolerance balance.',
        img: 'assets/1.png',
        specs: ['Acoustic Decibel < 35 dBA', 'Dynamic Balance G1.0', 'Tungsten Tool Quality']
      },
      mining: {
        title: 'Heavy Industry & Mining Equipment',
        desc: 'Ruggedized motor cores and large machined castings for slurry pumps, cement kilns, draglines, rock crushers, and underground mining equipment.',
        img: 'assets/Mining_img.png',
        specs: ['Extreme Shock Resistance', 'Heavy Cast Iron Housings', 'Severe Duty Cycles']
      }
    };

    document.querySelectorAll('.app-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.app-tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const key = btn.dataset.app;
        const data = appData[key];
        if (data) {
          sound.playPneumatic();
          document.getElementById('appTitle').innerText = data.title;
          document.getElementById('appDesc').innerText = data.desc;
          document.getElementById('appImg').src = data.img;
          const specsWrap = document.getElementById('appSpecsPills');
          if (specsWrap) {
            specsWrap.innerHTML = data.specs.map(s => `<span class="spec-badge highlight">${s}</span>`).join('');
          }
        }
      });
    });

    // Technical RFQ Configurator
    initRFQConfigurator();
  });
})();
