# Premium Animation Techniques

A reference for implementing smooth animations and micro-interactions on Oni sites without external JavaScript frameworks.

---

## 1. Keyframe Animation Standards
Every generated site should include these four core keyframe rules in its global `<style>`:

```css
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-22px) rotate(4deg);
  }
}

@keyframes pulse {
  0%, 100% {
    opacity: 0.5;
  }
  50% {
    opacity: 0.95;
  }
}

@keyframes shimmer {
  from {
    background-position: -200% center;
  }
  to {
    background-position: 200% center;
  }
}
```

## 2. Text Gradient Shimmer
Apply an active gradient animation overlay to primary callout headings or logos.

```css
.shimmer-text {
  background: linear-gradient(
    to right,
    var(--p) 20%,
    var(--s) 40%,
    #ffffff 60%,
    var(--p) 80%
  );
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: shimmer 6s linear infinite;
}
```

## 3. Floating Backdrop Orbs
Translucent glowing vector background shapes that drift organically to create visual depth behind cards.

```css
.orb {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  filter: blur(80px);
}
.orb-1 {
  width: 500px;
  height: 500px;
  top: -100px;
  right: -100px;
  background: radial-gradient(circle, var(--p) 0%, transparent 70%);
  opacity: 0.18;
  animation: float 8s ease-in-out infinite;
}
.orb-2 {
  width: 350px;
  height: 350px;
  bottom: -50px;
  left: -80px;
  background: radial-gradient(circle, var(--s) 0%, transparent 70%);
  opacity: 0.14;
  animation: float 6s ease-in-out infinite reverse;
}
```

## 4. Scroll-Reveal Behavior (Intersection Observer)
To implement scroll-triggered entrance animations, Oni websites can include this simple intersection observer script at the bottom of the body.

```html
<script>
  document.addEventListener("DOMContentLoaded", () => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
  });
</script>
```

Corresponding CSS styling:
```css
.reveal {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}
.reveal.active {
  opacity: 1;
  transform: translateY(0);
}
```
