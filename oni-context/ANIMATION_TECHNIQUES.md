# Animations and Motion Design

The difference between “cheap” and “premium” animations is mainly **quality and purpose**. Cheap animations are often abrupt or frivolous; premium motion is **smooth, subtle, and enhances usability**. Use animations to guide attention or provide feedback, not just for decoration. Key points:

- Animate only **transform** and **opacity** whenever possible: these properties can be GPU-accelerated and won’t trigger expensive reflows. For example:  
  ```css
  .box {
    transition: transform 0.3s ease-out, opacity 0.3s ease-out;
  }
  .box:hover {
    transform: scale(1.05);
    opacity: 1;
  }
  ``` 
  This is smooth because it only animates *transform* and *opacity*. Avoid animating layout properties like `width` or `top`, as they can cause jank.

- The 12 principles of animation (from Disney) can inform web motion: e.g. **ease-in** (slow start) and **ease-out** (slow end) simulate inertia, **stagger** and **delay** create anticipation, and **squash/stretch** ideas can appear as subtle scaling. Many sites use *ease-in-out* or custom *cubic-bezier* curves for a natural feel. For instance, Material Design’s standard cubic-bezier (`.4,0,.2,1`) yields fluid motion.

- **Smoothness:** Sites like Linear, Stripe, Framer achieve a premium feel with silky transitions. They often use micro-duration transitions (~0.2–0.4s for hovers) and slightly longer (0.6–0.8s) for content reveals. For example, a hover might use `transition: all 0.3s ease`, while a scroll-trigger reveal might animate over ~0.6s. As one guide notes, “requestAnimationFrame()... syncs with the browser’s rendering cycle, reducing jank” (though for CSS we primarily rely on transitions).

- **Scroll-triggered animations:** You can implement reveal-on-scroll without heavy libraries by using the **IntersectionObserver API**. E.g.:  
  ```js
  // JS: observe elements and add 'visible' class when in view
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach(el => {
    el.classList.add('not-visible');
    observer.observe(el);
  });
  ```
  ```css
  /* CSS: initial and visible states */
  .reveal.not-visible { opacity: 0; transform: translateY(20px); }
  .reveal.visible     { opacity: 1; transform: translateY(0); transition: opacity 0.6s ease-out, transform 0.6s ease-out; }
  ```
  This smoothly fades elements in as you scroll, with a *stagger* effect if you add delays (e.g. via `transition-delay` on each child).

- **Easing curves:** For a premium feel, use smooth easing (ease-in-out, ease-out) or gentle custom curves. For instance: 
  ```css
  transition: transform 0.3s cubic-bezier(0.4, 0.0, 0.2, 1), 
              opacity 0.3s cubic-bezier(0.4, 0.0, 0.2, 1);
  ```
  The dev-to guide recommends these curves for UI polish.

- **Staggering:** When animating lists or cards, apply increasing delays. E.g., using CSS:  
  ```css
  .cards > .card:nth-child(n) { transition-delay: calc(0.1s * var(--n)); }
  ```
  Or in JS by looping through elements and adding `.style.transitionDelay = '0.1s'`, '0.2s', etc.

- **Floating/levitating effect:** A subtle up-down animation adds dynamism. For example:  
  ```css
  @keyframes float { 
    0%,100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }
  .orb { animation: float 4s ease-in-out infinite; }
  ```
  This can be applied to decorative background orbs (semi-transparent divs) to create a floating background.

- **Parallax effect:** A simple parallax can be done by using `background-attachment: fixed;` on background images for a fixed-position effect. For more control, use JS on scroll to translate elements at different speeds:
  ```js
  window.addEventListener('scroll', () => {
    document.querySelectorAll('.parallax').forEach(el => {
      const offset = window.scrollY;
      el.style.transform = `translateY(${offset * 0.5}px)`;
    });
  });
  ```
  This moves `.parallax` elements slower than the scroll speed, creating depth.

- **Micro-interactions:** Tiny animations (button hovers, icon toggles, form feedback) improve UX by giving immediate visual feedback. For example, a button might briefly glow or a checkbox might animate when clicked. These should be very quick (100–200ms) so they feel responsive.

---

## 15 Code Examples of Premium Animations

### 1. Scroll-reveal with stagger (JS + CSS)
As shown above with `IntersectionObserver`, add class `.visible` when in view; use `transition-delay` on child elements to stagger.

### 2. Floating orbs background (HTML/CSS)
```html
<div class="orb" style="--x:10%; --y:20%; --size:150px; --delay:0s;"></div>
<div class="orb" style="--x:70%; --y:30%; --size:200px; --delay:2s;"></div>
```
```css
/* Orb CSS */
.orb {
  position:absolute; top:var(--y); left:var(--x);
  width:var(--size); height:var(--size);
  background: radial-gradient(circle, rgba(255,255,255,0.2), transparent);
  border-radius:50%; filter: blur(30px);
  animation: float 6s ease-in-out infinite;
  animation-delay: var(--delay);
}
@keyframes float { 0%,100% { transform: translateY(0);} 50% { transform: translateY(-20px);} }
```

### 3. Gradient text shimmer
```css
.shimmer-text {
  font-size: 3rem;
  background: linear-gradient(90deg, #eee 25%, #ddd 50%, #eee 75%);
  background-size: 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: shimmer 2s infinite;
}
@keyframes shimmer { 100% { background-position: 200% 0; } }
```

### 4. Button hover glow
```css
.btn {
  transition: box-shadow 0.3s ease;
}
.btn:hover {
  box-shadow: 0 0 10px 2px rgba(255,64,129, 0.7);
}
```

### 5. Card hover lift
```css
.card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(0,0,0,0.15);
}
```

### 6. Typewriter effect (CSS)
```css
.typewriter {
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  border-right: 2px solid #ff4081;
  animation: type 4s steps(40) 1s 1 normal both,
             blink .75s step-end infinite;
}
@keyframes type { to { width: 100%; } }
@keyframes blink { 50% { border-color: transparent; } }
```
*(Apply a fixed-width container for effect.)*

### 7. Counter animation (JS)
```js
function countUp(el, target) {
  let count = 0;
  const step = Math.ceil(target / 100);
  const interval = setInterval(() => {
    count += step;
    if (count >= target) {
      count = target; clearInterval(interval);
    }
    el.textContent = count;
  }, 20);
}
// Usage: countUp(document.getElementById('count1'), 2500);
```

### 8. Navbar color change on scroll
```js
window.addEventListener('scroll', () => {
  document.querySelector('nav').classList.toggle('scrolled', window.scrollY > 80);
});
```
```css
nav { background: transparent; transition: background 0.3s ease; }
nav.scrolled { background: rgba(0,0,0,0.8); }
```

### 9. Parallax hero (CSS)
```css
.hero {
  background-image: url('hero.jpg');
  background-attachment: fixed;
  background-size: cover;
  height: 80vh;
  position: relative;
}
```

### 10. Loading skeleton shimmer
```css
.skeleton {
  position: relative;
  background: #eee;
  overflow: hidden;
}
.skeleton::after {
  content: "";
  position: absolute; top:0; left: -100%;
  width: 200%; height: 100%;
  background: linear-gradient(to right,
    rgba(255,255,255,0) 0%, rgba(255,255,255,0.6) 50%, rgba(255,255,255,0) 100%);
  animation: loading 1.5s infinite;
}
@keyframes loading { 100% { left: 100%; } }
```

### 11. Smooth page fade-in
```css
body { opacity: 0; transition: opacity 0.5s ease; }
body.loaded { opacity: 1; }
```
*(Add `.loaded` via JS on DOMContentLoaded.)*

### 12. Image reveal on scroll (IntersectionObserver)
```css
.reveal-img { opacity: 0; transform: translateY(20px); transition: transform 0.6s ease-out, opacity 0.6s ease-out; }
.reveal-img.visible { opacity: 1; transform: translateY(0); }
```
*(Toggle `.visible` with IntersectionObserver.)*

### 13. Magnetic button effect (JS)
```js
const btn = document.querySelector('.magnetic-btn');
btn.addEventListener('mousemove', (e) => {
  const rect = btn.getBoundingClientRect();
  const x = (e.clientX - rect.left) - rect.width/2;
  const y = (e.clientY - rect.top) - rect.height/2;
  btn.style.transform = `translate(${x*0.1}px, ${y*0.1}px)`;
});
btn.addEventListener('mouseleave', () => {
  btn.style.transform = 'translate(0, 0)';
});
```
*(Add a subtle transform on hover to follow cursor position.)*

### 14. Cursor glow follower (JS)
```js
const cursor = document.createElement('div');
cursor.id = 'cursor';
document.body.append(cursor);
document.addEventListener('mousemove', e => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top  = e.clientY + 'px';
});
```
```css
#cursor {
  position: fixed; width: 20px; height: 20px;
  background: rgba(255, 64, 129, 0.6);
  border-radius: 50%; pointer-events: none;
  transform: translate(-50%, -50%);
  transition: width 0.2s, height 0.2s;
}
#cursor.expand { width: 40px; height: 40px; }
```

### 15. Text split reveal (CSS/JS)
Divide text into `<span>` per word or letter, then animate each.
```css
.split span {
  opacity: 0; display: inline-block; transform: translateY(20px);
  animation: wordIn 0.5s forwards;
}
.split span:nth-child(1) { animation-delay: 0.1s; }
.split span:nth-child(2) { animation-delay: 0.2s; }
/* etc. */
@keyframes wordIn {
  to { opacity: 1; transform: translateY(0); }
}
```
*(Or use JS to wrap words and apply these animations for a fancy reveal.)*
