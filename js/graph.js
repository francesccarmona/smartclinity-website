/* ============================================================
   SmartClinity — Fluid Quality Graph (Drainage Application)
   ============================================================ */

(function () {
  'use strict';

  function initFluidGraph(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    // HiDPI
    function resize() {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      draw(1); // draw static immediately
    }

    // Generate curve data: starts high (~80), oscillates, converges toward ~12
    function generateCurveData(points) {
      const data = [];
      for (let i = 0; i < points; i++) {
        const t = i / (points - 1);
        const base = 78 * Math.exp(-4.5 * t) + 10;
        const noise = (Math.random() - 0.5) * (20 * Math.exp(-3 * t));
        data.push(Math.max(5, Math.min(95, base + noise)));
      }
      return data;
    }

    const points = 80;
    const data = generateCurveData(points);

    let animProgress = 0;
    let animFrame = null;

    function draw(progress) {
      const W = canvas.getBoundingClientRect().width;
      const H = canvas.getBoundingClientRect().height;
      ctx.clearRect(0, 0, W, H);

      const padL = 52, padR = 24, padT = 20, padB = 44;
      const plotW = W - padL - padR;
      const plotH = H - padT - padB;

      // ── Grid lines ──
      ctx.strokeStyle = 'rgba(0,0,0,0.05)';
      ctx.lineWidth = 1;
      const gridLines = 5;
      for (let i = 0; i <= gridLines; i++) {
        const y = padT + (plotH / gridLines) * i;
        ctx.beginPath();
        ctx.moveTo(padL, y);
        ctx.lineTo(padL + plotW, y);
        ctx.stroke();
      }

      // ── Y-axis labels ──
      ctx.fillStyle = '#a0a0a0';
      ctx.font = '500 11px Manrope, sans-serif';
      ctx.textAlign = 'right';
      for (let i = 0; i <= gridLines; i++) {
        const val = 100 - (100 / gridLines) * i;
        const y = padT + (plotH / gridLines) * i;
        ctx.fillText(Math.round(val), padL - 8, y + 4);
      }

      // ── X-axis labels ──
      ctx.textAlign = 'center';
      ctx.fillStyle = '#a0a0a0';
      const xLabels = ['0h', '6h', '12h', '18h', '24h', '30h', '36h'];
      xLabels.forEach((label, i) => {
        const x = padL + (plotW / (xLabels.length - 1)) * i;
        ctx.fillText(label, x, H - padB + 18);
      });

      // ── Axis label ──
      ctx.save();
      ctx.translate(14, H / 2);
      ctx.rotate(-Math.PI / 2);
      ctx.fillStyle = '#c0c0c0';
      ctx.font = '500 10px Manrope, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('FLUID LOAD INDEX', 0, 0);
      ctx.restore();

      ctx.fillStyle = '#c0c0c0';
      ctx.font = '500 10px Manrope, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('TIME SINCE DRAINAGE ONSET', padL + plotW / 2, H - 4);

      // ── Stabilization zone ──
      const stableY = padT + plotH * (1 - 0.15);
      const stableH = plotH * 0.12;
      const stableGrad = ctx.createLinearGradient(0, stableY - stableH, 0, stableY + 4);
      stableGrad.addColorStop(0, 'rgba(137,217,87,0)');
      stableGrad.addColorStop(1, 'rgba(137,217,87,0.08)');
      ctx.fillStyle = stableGrad;
      ctx.fillRect(padL, stableY - stableH, plotW, stableH + 4);

      // Stabilization label
      ctx.fillStyle = 'rgba(137,217,87,0.6)';
      ctx.font = '500 10px Manrope, sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText('STABILIZATION ZONE', padL + plotW - 6, stableY - stableH + 14);

      // ── Area fill ──
      const visibleCount = Math.floor(data.length * progress);
      if (visibleCount < 2) return;

      ctx.beginPath();
      for (let i = 0; i < visibleCount; i++) {
        const x = padL + (plotW / (data.length - 1)) * i;
        const y = padT + plotH * (1 - (data[i] / 100));
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      // Close area
      const lastX = padL + (plotW / (data.length - 1)) * (visibleCount - 1);
      ctx.lineTo(lastX, padT + plotH);
      ctx.lineTo(padL, padT + plotH);
      ctx.closePath();

      const areaGrad = ctx.createLinearGradient(0, padT, 0, padT + plotH);
      areaGrad.addColorStop(0, 'rgba(81,112,255,0.08)');
      areaGrad.addColorStop(1, 'rgba(81,112,255,0)');
      ctx.fillStyle = areaGrad;
      ctx.fill();

      // ── Main line ──
      ctx.beginPath();
      for (let i = 0; i < visibleCount; i++) {
        const x = padL + (plotW / (data.length - 1)) * i;
        const y = padT + plotH * (1 - (data[i] / 100));
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = '#5170ff';
      ctx.lineWidth = 2;
      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';
      ctx.stroke();

      // ── Current point dot ──
      if (visibleCount > 1) {
        const lastIdx = visibleCount - 1;
        const dotX = padL + (plotW / (data.length - 1)) * lastIdx;
        const dotY = padT + plotH * (1 - (data[lastIdx] / 100));
        ctx.beginPath();
        ctx.arc(dotX, dotY, 4, 0, Math.PI * 2);
        ctx.fillStyle = '#5170ff';
        ctx.fill();
        ctx.beginPath();
        ctx.arc(dotX, dotY, 7, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(81,112,255,0.25)';
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    }

    function animate() {
      animProgress += 0.012;
      if (animProgress > 1) animProgress = 1;
      draw(animProgress);
      if (animProgress < 1) {
        animFrame = requestAnimationFrame(animate);
      }
    }

    // Start animation when visible
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && animProgress === 0) {
          setTimeout(animate, 300);
        }
      });
    }, { threshold: 0.3 });

    observer.observe(canvas);

    window.addEventListener('resize', resize);
    resize();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => initFluidGraph('fluid-quality-graph'));
  } else {
    initFluidGraph('fluid-quality-graph');
  }

})();
