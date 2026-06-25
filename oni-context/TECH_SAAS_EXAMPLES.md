# Premium Tech & SaaS Layout Patterns

Design templates, interactive dashboard components, stats showcases, and pricing grids tailored for SaaS applications.

---

## 1. Glowing SaaS Dashboard Mockup
A high-end visual container simulating a real web dashboard app with analytics charts.

```html
<div class="dashboard-preview-wrapper reveal">
  <div class="glow-layer"></div>
  <div class="dashboard-mockup">
    <!-- Window controls -->
    <div class="mockup-header">
      <div class="window-dots">
        <span></span><span></span><span></span>
      </div>
      <div class="mockup-search">oni-analytics.app/dashboard</div>
    </div>
    
    <!-- Dashboard inner layout -->
    <div class="mockup-body">
      <!-- Sidebar -->
      <aside class="mockup-sidebar">
        <div class="sidebar-item active">📊 Overview</div>
        <div class="sidebar-item">📈 Analytics</div>
        <div class="sidebar-item">👥 Audience</div>
        <div class="sidebar-item">⚙️ Settings</div>
      </aside>
      
      <!-- Content grid -->
      <main class="mockup-content">
        <div class="stats-row">
          <div class="mock-stat-card">
            <span class="label">Monthly Active Users</span>
            <span class="value">142.8k</span>
            <span class="change positive">+12.4%</span>
          </div>
          <div class="mock-stat-card">
            <span class="label">Server Load</span>
            <span class="value">24%</span>
            <span class="change stable">Normal</span>
          </div>
        </div>
        <div class="mockup-chart-box">
          <div class="chart-header">Conversion Velocity</div>
          <div class="chart-bars">
            <div style="height: 40%"></div>
            <div style="height: 60%"></div>
            <div style="height: 85%"></div>
            <div style="height: 70%"></div>
            <div style="height: 95%"></div>
          </div>
        </div>
      </main>
    </div>
  </div>
</div>
```

```css
.dashboard-preview-wrapper {
  position: relative;
  max-width: 1000px;
  margin: 4rem auto;
  border-radius: var(--r);
}
.glow-layer {
  position: absolute;
  inset: -10px;
  background: linear-gradient(135deg, var(--p), var(--s));
  opacity: 0.15;
  filter: blur(40px);
  z-index: 0;
  border-radius: inherit;
}
.dashboard-mockup {
  position: relative;
  z-index: 1;
  background: rgba(10, 10, 15, 0.95);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: inherit;
  overflow: hidden;
  box-shadow: var(--shadow-lg);
}
.mockup-header {
  background: rgba(255, 255, 255, 0.03);
  padding: 0.75rem 1.5rem;
  display: flex;
  align-items: center;
  gap: 2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}
.window-dots span {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-right: 6px;
}
.window-dots span:nth-child(1) { background: #ff5f56; }
.window-dots span:nth-child(2) { background: #ffbd2e; }
.window-dots span:nth-child(3) { background: #27c93f; }
.mockup-search {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.06);
  padding: 0.3rem 2rem;
  border-radius: 6px;
  font-size: 0.75rem;
  color: var(--text-muted);
}
.mockup-body {
  display: flex;
  min-height: 400px;
}
.mockup-sidebar {
  width: 180px;
  border-right: 1px solid rgba(255, 255, 255, 0.05);
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.01);
}
.sidebar-item {
  padding: 0.6rem 1rem;
  font-size: 0.8rem;
  color: var(--text-muted);
  border-radius: 6px;
  margin-bottom: 0.5rem;
  cursor: pointer;
}
.sidebar-item.active {
  background: rgba(255, 255, 255, 0.05);
  color: white;
}
.mockup-content {
  flex: 1;
  padding: 2rem;
}
.stats-row {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 2rem;
}
.mock-stat-card {
  flex: 1;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
}
.mock-stat-card .label { font-size: 0.75rem; color: var(--text-muted); }
.mock-stat-card .value { font-size: 1.8rem; font-weight: 700; color: white; margin: 0.4rem 0; }
.mock-stat-card .change.positive { color: #10B981; font-size: 0.75rem; font-weight: 600; }
.mockup-chart-box {
  background: rgba(255, 255, 255, 0.01);
  border: 1px solid rgba(255, 255, 255, 0.04);
  padding: 1.5rem;
  border-radius: 12px;
}
.chart-bars {
  display: flex;
  align-items: flex-end;
  height: 120px;
  gap: 1.5rem;
  margin-top: 1.5rem;
}
.chart-bars div {
  flex: 1;
  background: var(--grad);
  border-radius: 4px 4px 0 0;
  transition: height 1s ease-in-out;
}
```
