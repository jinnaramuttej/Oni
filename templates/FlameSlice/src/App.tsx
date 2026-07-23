import { useEffect, useRef, useState } from "react";

/* ───────── image URLs ───────── */
const IMG = {
  heroPizza: "https://images.pexels.com/photos/365459/pexels-photo-365459.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=1920",
  pizza1: "https://images.pexels.com/photos/365459/pexels-photo-365459.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=600",
  pizza2: "https://images.pexels.com/photos/1552635/pexels-photo-1552635.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=600",
  pizza3: "https://images.pexels.com/photos/6493571/pexels-photo-6493571.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=600",
  pizza4: "https://images.pexels.com/photos/6493111/pexels-photo-6493111.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=600",
  burger1: "https://images.pexels.com/photos/33858065/pexels-photo-33858065.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=600",
  burger2: "https://images.pexels.com/photos/8365312/pexels-photo-8365312.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=600",
  burger3: "https://images.pexels.com/photos/36691306/pexels-photo-36691306.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=600",
  wrap1: "https://images.pexels.com/photos/15913640/pexels-photo-15913640.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=600",
  wrap2: "https://images.pexels.com/photos/16222105/pexels-photo-16222105.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=600",
  pasta1: "https://images.pexels.com/photos/26207761/pexels-photo-26207761.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=600",
  pasta2: "https://images.pexels.com/photos/1527603/pexels-photo-1527603.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=600",
  drink1: "https://images.pexels.com/photos/4113653/pexels-photo-4113653.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=600",
  drink2: "https://images.pexels.com/photos/12987271/pexels-photo-12987271.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=600",
  dessert1: "https://images.pexels.com/photos/33312981/pexels-photo-33312981.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=600",
  dessert2: "https://images.pexels.com/photos/7021888/pexels-photo-7021888.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=600",
  fries: "https://images.pexels.com/photos/2235832/pexels-photo-2235832.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=600",
  combo1: "https://images.pexels.com/photos/14773000/pexels-photo-14773000.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=700",
  combo2: "https://images.pexels.com/photos/6488940/pexels-photo-6488940.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=700",
  combo3: "https://images.pexels.com/photos/3228646/pexels-photo-3228646.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=700",
  fresh1: "https://images.pexels.com/photos/32570609/pexels-photo-32570609.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=350&w=350",
  fresh2: "https://images.pexels.com/photos/8272619/pexels-photo-8272619.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=280&w=350",
  fresh3: "https://images.pexels.com/photos/8365312/pexels-photo-8365312.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=280&w=350",
  fresh4: "https://images.pexels.com/photos/33592996/pexels-photo-33592996.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=350&w=350",
  buildPizza: "https://images.pexels.com/photos/6488940/pexels-photo-6488940.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=700&w=800",
};

/* ───────── data ───────── */
interface MenuItem { id:number; name:string; desc:string; price:number; img:string; cat:string; badge?:string; rating:number; reviews:number; cal:string; size?:string; }
const menu: MenuItem[] = [
  { id:1, name:"The Inferno", desc:"Spicy pepperoni, jalapenos, red chili flakes, mozzarella, and our signature fire sauce", price:16.99, img:IMG.pizza1, cat:"pizza", badge:"Best Seller", rating:4.9, reviews:342, cal:"285 cal/slice", size:'12" / 16"' },
  { id:2, name:"Truffle Mushroom", desc:"Wild mushrooms, truffle oil, caramelized onions, gouda, and fresh thyme", price:18.99, img:IMG.pizza2, cat:"pizza", badge:"New", rating:4.8, reviews:128, cal:"260 cal/slice", size:'12" / 16"' },
  { id:3, name:"Classic Margherita", desc:"San Marzano tomatoes, fresh mozzarella, basil, and extra virgin olive oil", price:14.99, img:IMG.pizza3, cat:"pizza", rating:4.7, reviews:567, cal:"220 cal/slice", size:'12" / 16"' },
  { id:4, name:"BBQ Ranch Loaded", desc:"Grilled chicken, bacon, red onion, cheddar, BBQ drizzle, and ranch", price:17.99, img:IMG.pizza4, cat:"pizza", badge:"Limited", rating:4.8, reviews:215, cal:"310 cal/slice", size:'12" / 16"' },
  { id:5, name:"Smash Burger Deluxe", desc:"Double smashed patties, American cheese, pickles, special sauce, toasted brioche", price:13.99, img:IMG.burger1, cat:"burgers", badge:"Best Seller", rating:4.9, reviews:489, cal:"720 cal" },
  { id:6, name:"Flame-Grilled Classic", desc:"Chargrilled beef patty, lettuce, tomato, onion rings, cheddar, house mayo", price:11.99, img:IMG.burger2, cat:"burgers", rating:4.6, reviews:312, cal:"640 cal" },
  { id:7, name:"Smoky BBQ Stack", desc:"Triple-stack patties, smoked bacon, crispy onions, BBQ glaze, pepper jack", price:15.99, img:IMG.burger3, cat:"burgers", badge:"New", rating:4.8, reviews:176, cal:"890 cal" },
  { id:8, name:"Chicken Caesar Wrap", desc:"Grilled chicken, romaine, parmesan, caesar dressing, wrapped in warm tortilla", price:10.99, img:IMG.wrap1, cat:"wraps", badge:"Best Seller", rating:4.7, reviews:298, cal:"480 cal" },
  { id:9, name:"Spicy Shawarma Wrap", desc:"Seasoned shawarma chicken, garlic sauce, pickled turnips, fresh herbs", price:11.99, img:IMG.wrap2, cat:"wraps", badge:"Limited", rating:4.8, reviews:156, cal:"510 cal" },
  { id:10, name:"Spicy Arrabbiata", desc:"Penne in fiery tomato sauce with garlic, red chili, fresh basil, parmesan", price:12.99, img:IMG.pasta1, cat:"pasta", rating:4.6, reviews:198, cal:"520 cal" },
  { id:11, name:"Creamy Alfredo", desc:"Fettuccine in rich cream sauce with grilled chicken, mushrooms, and garlic", price:14.99, img:IMG.pasta2, cat:"pasta", badge:"New", rating:4.7, reviews:112, cal:"680 cal" },
  { id:12, name:"Ice Cold Cola", desc:"Classic cola served ice cold with a splash of lime", price:2.99, img:IMG.drink1, cat:"drinks", rating:4.5, reviews:890, cal:"140 cal" },
  { id:13, name:"Fresh Citrus Fizz", desc:"Sparkling lemonade with fresh citrus and mint", price:3.99, img:IMG.drink2, cat:"drinks", badge:"New", rating:4.6, reviews:245, cal:"90 cal" },
  { id:14, name:"Molten Choco Brownie", desc:"Warm chocolate brownie with molten center, served with vanilla ice cream", price:6.99, img:IMG.dessert1, cat:"desserts", badge:"Best Seller", rating:4.9, reviews:423, cal:"450 cal" },
  { id:15, name:"Classic Brownie Stack", desc:"Triple-layer brownie with powdered sugar and chocolate sauce", price:5.99, img:IMG.dessert2, cat:"desserts", rating:4.7, reviews:187, cal:"380 cal" },
  { id:16, name:"Loaded Fries", desc:"Crispy golden fries with melted cheese, bacon bits, jalapenos, and sour cream", price:7.99, img:IMG.fries, cat:"burgers", badge:"Limited", rating:4.8, reviews:367, cal:"520 cal" },
];

const combos = [
  { id:1, name:"The Ultimate Feast", desc:"Everything you need for the perfect meal", price:24.99, orig:34.96, img:IMG.combo1, items:["Smash Burger Deluxe","Loaded Fries","Cola","Brownie"], save:"Save 28%" },
  { id:2, name:"Pizza Party Box", desc:"Perfect for sharing with friends and family", price:29.99, orig:42.97, img:IMG.combo2, items:["2x Large Pizzas","Garlic Bread","Dipping Sauces"], save:"Save 30%" },
  { id:3, name:"Burger Duo Deal", desc:"Two burgers, two sides, two drinks", price:22.99, orig:31.96, img:IMG.combo3, items:["2x Classic Burgers","2x Fries","2x Drinks"], save:"Save 28%" },
];

const reviews = [
  { id:1, name:"Marcus J.", avatar:"MJ", rating:5, text:"Best pizza in town hands down. The Inferno lives up to its name. Crust is perfectly crispy and the cheese pull is insane. Delivery was also lightning fast.", date:"2 days ago", order:"The Inferno Pizza" },
  { id:2, name:"Sarah K.", avatar:"SK", rating:5, text:"The Smash Burger Deluxe is next level. Juicy, flavorful, and those loaded fries are addictive. Already planning my next order.", date:"5 days ago", order:"Smash Burger Deluxe" },
  { id:3, name:"David R.", avatar:"DR", rating:4, text:"Great food quality and super fast delivery. The combo deals are excellent value. Only wish they had more pasta options.", date:"1 week ago", order:"The Ultimate Feast" },
  { id:4, name:"Emily T.", avatar:"ET", rating:5, text:"Ordered for our game night and everyone was blown away. Fresh ingredients, generous portions, and the molten brownie is out of this world.", date:"1 week ago", order:"Pizza Party Box" },
  { id:5, name:"Alex M.", avatar:"AM", rating:5, text:"From ordering to delivery, the entire experience is seamless. The app is easy to use and the food arrives hot every single time.", date:"2 weeks ago", order:"Chicken Caesar Wrap" },
];

const locations = [
  { id:1, name:"Downtown", address:"142 Main Street, Downtown", hours:"10 AM - 12 AM", phone:"(555) 234-5678" },
  { id:2, name:"Midtown", address:"890 Central Ave, Midtown", hours:"10 AM - 11 PM", phone:"(555) 345-6789" },
  { id:3, name:"Eastside", address:"456 Oak Boulevard, East", hours:"11 AM - 11 PM", phone:"(555) 456-7890" },
  { id:4, name:"University District", address:"78 Campus Drive, University", hours:"10 AM - 2 AM", phone:"(555) 567-8901" },
];

const faqs = [
  { q:"What are your delivery hours?", a:"We deliver from 10 AM to midnight on weekdays, and until 2 AM on weekends. Some locations may have extended hours." },
  { q:"Is there a minimum order for delivery?", a:"The minimum order for free delivery is $15. Orders under $15 incur a $3.99 delivery fee." },
  { q:"Can I customize my pizza toppings?", a:"Absolutely. Use our Build Your Own Pizza feature to choose your crust, sauce, cheese, and toppings. Over 30 fresh toppings available." },
  { q:"Do you offer gluten-free or vegan options?", a:"Yes. We offer gluten-free crusts, plant-based patties, vegan cheese, and dairy-free desserts. Look for the dietary icons on menu items." },
  { q:"How long does delivery take?", a:"Average delivery time is 25-35 minutes depending on your location and order volume. You can track your order in real-time." },
  { q:"What is your refund policy?", a:"If your order arrives incorrect or unsatisfactory, contact us within 30 minutes of delivery and we will either replace it or issue a full refund." },
];

const cats = [
  { id:"all", label:"All Items" },
  { id:"pizza", label:"Pizza" },
  { id:"burgers", label:"Burgers" },
  { id:"wraps", label:"Wraps" },
  { id:"pasta", label:"Pasta" },
  { id:"drinks", label:"Drinks" },
  { id:"desserts", label:"Desserts" },
];

const crusts = ["Classic Hand-Tossed","Thin & Crispy","Deep Dish","Gluten-Free"];
const sauces = ["Tomato","BBQ","White Garlic","Pesto","Hot Buffalo"];
const cheeses = ["Mozzarella","Cheddar","Gouda","Parmesan","Vegan"];
const toppings = ["Pepperoni","Italian Sausage","Grilled Chicken","Bacon","Mushrooms","Red Onion","Bell Peppers","Black Olives","Jalapenos","Fresh Basil","Cherry Tomatoes","Pineapple","Artichokes","Sun-Dried Tomatoes","Arugula","Caramelized Onion"];

/* ───────── css string ───────── */
const css = `
:root {
  --red: #D62828;
  --tomato: #E63946;
  --yellow: #F4B400;
  --charcoal: #1C1C1C;
  --cream: #FFF8F0;
  --orange: #F77F00;
  --red-light: #FFF0F0;
  --yellow-light: #FFF9E6;
}

* { margin:0; padding:0; box-sizing:border-box; }

html { scroll-behavior:smooth; }

body {
  font-family:'Inter',system-ui,sans-serif;
  background:var(--cream);
  color:var(--charcoal);
  overflow-x:hidden;
  -webkit-font-smoothing:antialiased;
}

h1,h2,h3,h4,h5,h6 { font-family:'Space Grotesk',sans-serif; }

::selection { background:var(--red); color:#fff; }

::-webkit-scrollbar { width:7px; }
::-webkit-scrollbar-track { background:var(--cream); }
::-webkit-scrollbar-thumb { background:var(--red); border-radius:4px; }

img { display:block; max-width:100%; }

a { text-decoration:none; color:inherit; }

button { font-family:inherit; cursor:pointer; border:none; outline:none; }

/* ── animations ── */
@keyframes fadeUp { from{opacity:0;transform:translateY(48px)} to{opacity:1;transform:translateY(0)} }
@keyframes fadeLeft { from{opacity:0;transform:translateX(-48px)} to{opacity:1;transform:translateX(0)} }
@keyframes fadeRight { from{opacity:0;transform:translateX(48px)} to{opacity:1;transform:translateX(0)} }
@keyframes float { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-14px) rotate(4deg)} }
@keyframes floatSlow { 0%,100%{transform:translateY(0) rotate(0)} 50%{transform:translateY(-9px) rotate(-3deg)} }
@keyframes bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(7px)} }
@keyframes pulseGlow { 0%,100%{box-shadow:0 0 0 0 rgba(214,40,40,.35)} 50%{box-shadow:0 0 0 12px rgba(214,40,40,0)} }
@keyframes wiggle { 0%,100%{transform:rotate(-2deg)} 50%{transform:rotate(2deg)} }
@keyframes shimmer { 0%{background-position:-200% 0} 100%{background-position:200% 0} }

.float { animation:float 4s ease-in-out infinite; }
.float-slow { animation:floatSlow 5s ease-in-out infinite; }

/* reveal classes */
.reveal { opacity:0; transform:translateY(48px); transition:opacity .8s cubic-bezier(.16,1,.3,1), transform .8s cubic-bezier(.16,1,.3,1); }
.reveal-left { opacity:0; transform:translateX(-56px); transition:opacity .8s cubic-bezier(.16,1,.3,1), transform .8s cubic-bezier(.16,1,.3,1); }
.reveal-right { opacity:0; transform:translateX(56px); transition:opacity .8s cubic-bezier(.16,1,.3,1), transform .8s cubic-bezier(.16,1,.3,1); }
.visible { opacity:1!important; transform:translate(0)!important; }

/* ── nav ── */
.nav {
  position:fixed; top:0; left:0; right:0; z-index:100;
  transition:background .5s, padding .4s, box-shadow .4s;
  padding:20px 0;
}
.nav.scrolled {
  background:rgba(28,28,28,.96);
  backdrop-filter:blur(12px);
  padding:12px 0;
  box-shadow:0 4px 24px rgba(0,0,0,.12);
}
.nav-inner {
  max-width:1200px; margin:0 auto; padding:0 24px;
  display:flex; align-items:center; justify-content:space-between;
}
.logo { display:flex; align-items:center; gap:8px; }
.logo svg { color:var(--tomato); transition:color .3s; }
.logo:hover svg { color:var(--yellow); }
.logo-text { font-family:'Space Grotesk',sans-serif; font-size:1.5rem; font-weight:700; color:#fff; letter-spacing:-.02em; }
.logo-text span { color:var(--yellow); }

.nav-links { display:flex; gap:32px; list-style:none; }
.nav-links a {
  color:rgba(255,255,255,.75); font-size:.875rem; font-weight:500;
  transition:color .3s; position:relative; letter-spacing:.02em;
}
.nav-links a::after {
  content:''; position:absolute; bottom:-4px; left:0; width:0; height:2px;
  background:var(--yellow); transition:width .3s;
}
.nav-links a:hover { color:var(--yellow); }
.nav-links a:hover::after { width:100%; }

.nav-actions { display:flex; align-items:center; gap:16px; }
.cart-btn {
  position:relative; background:none; color:rgba(255,255,255,.8);
  padding:8px; transition:color .3s;
}
.cart-btn:hover { color:#fff; }
.cart-badge {
  position:absolute; top:-2px; right:-2px; width:18px; height:18px;
  background:var(--tomato); color:#fff; font-size:.65rem; font-weight:700;
  border-radius:50%; display:flex; align-items:center; justify-content:center;
}

.hamburger { display:none; background:none; color:#fff; padding:8px; }

.mobile-menu {
  position:fixed; inset:0; z-index:99; background:var(--charcoal);
  display:flex; flex-direction:column; align-items:center; justify-content:center; gap:24px;
  transform:translateX(100%); transition:transform .5s cubic-bezier(.16,1,.3,1);
}
.mobile-menu.open { transform:translateX(0); }
.mobile-menu a {
  color:#fff; font-family:'Space Grotesk',sans-serif; font-size:1.75rem;
  font-weight:700; transition:color .3s;
}
.mobile-menu a:hover { color:var(--yellow); }

/* ── buttons ── */
.btn-primary {
  display:inline-flex; align-items:center; gap:8px;
  background:var(--red); color:#fff; padding:14px 32px;
  border-radius:16px; font-weight:700; font-size:1rem;
  transition:all .3s; position:relative; overflow:hidden;
}
.btn-primary:hover {
  background:var(--tomato); transform:translateY(-2px);
  box-shadow:0 8px 24px rgba(214,40,40,.35);
}
.btn-secondary {
  display:inline-flex; align-items:center; gap:8px;
  background:transparent; color:#fff; padding:12px 28px;
  border:2px solid #fff; border-radius:16px; font-weight:700; font-size:1rem;
  transition:all .3s;
}
.btn-secondary:hover { background:#fff; color:var(--charcoal); transform:translateY(-2px); }
.btn-order {
  display:inline-flex; align-items:center; gap:6px;
  background:var(--yellow); color:var(--charcoal); padding:8px 16px;
  border-radius:14px; font-weight:700; font-size:.8rem; transition:all .3s;
}
.btn-order:hover { background:var(--orange); color:#fff; transform:translateY(-1px); box-shadow:0 4px 16px rgba(247,127,0,.3); }

/* ── hero ── */
.hero {
  position:relative; min-height:100vh; display:flex; align-items:center; overflow:hidden;
}
.hero-bg {
  position:absolute; inset:0;
}
.hero-bg img {
  width:100%; height:100%; object-fit:cover; object-position:center 40%;
}
.hero-overlay {
  position:absolute; inset:0;
  background:linear-gradient(135deg,rgba(28,28,28,.88) 0%,rgba(28,28,28,.5) 40%,transparent 70%);
}
.hero-overlay2 {
  position:absolute; inset:0;
  background:linear-gradient(to top,rgba(28,28,28,.8),transparent);
}
.hero-bottom-wedge {
  position:absolute; bottom:0; left:0; right:0; height:96px;
  background:var(--cream);
  clip-path:polygon(0 100%,100% 50%,100% 100%,0 100%);
}
.hero-content {
  position:relative; z-index:2; max-width:1200px; margin:0 auto;
  padding:128px 24px 160px; width:100%;
}
.hero-content > * { max-width:640px; }

.promo-badge {
  display:inline-flex; align-items:center; gap:8px;
  background:rgba(230,57,70,.9); backdrop-filter:blur(8px);
  color:#fff; padding:10px 20px; border-radius:50px;
  font-size:.85rem; font-weight:600; margin-bottom:24px;
  animation:fadeUp .8s ease-out both;
}
.promo-dot { width:8px; height:8px; background:var(--yellow); border-radius:50%; animation:pulseGlow 2s infinite; }

.hero h1 {
  font-size:clamp(3rem,7vw,6rem); font-weight:800; color:#fff;
  line-height:.95; letter-spacing:-.03em;
  animation:fadeUp .8s ease-out .15s both;
}
.hero h1 .accent { color:var(--yellow); }

.hero-desc {
  margin-top:24px; font-size:1.15rem; color:rgba(255,255,255,.75);
  line-height:1.7; animation:fadeUp .8s ease-out .3s both;
}

.hero-ctas {
  display:flex; flex-wrap:wrap; gap:16px; margin-top:32px;
  animation:fadeUp .8s ease-out .45s both;
}
.hero-ctas .btn-primary { animation:pulseGlow 2s infinite; }

.hero-badges {
  display:flex; flex-wrap:wrap; gap:24px; margin-top:40px;
  animation:fadeUp .8s ease-out .6s both;
}
.hero-badge {
  display:flex; align-items:center; gap:8px; color:rgba(255,255,255,.65);
}
.hero-badge svg { color:var(--yellow); flex-shrink:0; }
.hero-badge span { font-size:.85rem; font-weight:500; }

.scroll-indicator {
  position:absolute; bottom:128px; left:50%; transform:translateX(-50%);
  z-index:2; display:flex; flex-direction:column; align-items:center; gap:8px;
}
.scroll-indicator span {
  color:rgba(255,255,255,.4); font-size:.65rem; font-weight:500;
  letter-spacing:.15em; text-transform:uppercase;
}
.scroll-indicator svg { color:rgba(255,255,255,.4); animation:bounce 1.5s ease-in-out infinite; }

/* floating decos in hero */
.hero-deco {
  position:absolute; border-radius:50%; pointer-events:none; z-index:1;
}

/* ── section shared ── */
.section { padding:64px 0; }
.section-lg { padding:96px 0; }
.container { max-width:1200px; margin:0 auto; padding:0 24px; }
.section-label {
  font-size:.8rem; font-weight:600; letter-spacing:.12em; text-transform:uppercase;
}
.section-title {
  font-family:'Space Grotesk',sans-serif; font-size:clamp(2rem,4.5vw,3.2rem);
  font-weight:700; line-height:1.1; margin-top:8px;
}
.section-title .accent { color:var(--red); }
.section-desc {
  margin-top:12px; color:rgba(28,28,28,.55); font-size:1.05rem;
  line-height:1.7; max-width:560px;
}
.text-center { text-align:center; }
.mx-auto { margin-left:auto; margin-right:auto; }

/* ── categories bar ── */
.categories {
  position:relative; z-index:10; margin-top:-32px;
}
.cat-bar {
  background:#fff; border-radius:20px; padding:16px 24px;
  box-shadow:0 8px 40px rgba(0,0,0,.06);
  display:flex; gap:12px; overflow-x:auto;
  -ms-overflow-style:none; scrollbar-width:none;
}
.cat-bar::-webkit-scrollbar { display:none; }
.cat-pill {
  display:flex; flex-direction:column; align-items:center; gap:6px;
  min-width:88px; padding:12px 16px; border-radius:16px;
  font-size:.8rem; font-weight:600; transition:all .3s; background:var(--cream);
  color:rgba(28,28,28,.65); white-space:nowrap;
}
.cat-pill.active {
  background:var(--red); color:#fff;
  box-shadow:0 4px 16px rgba(214,40,40,.2);
}
.cat-pill:not(.active):hover { background:var(--red-light); color:var(--red); }

/* ── menu grid ── */
.menu-grid {
  display:grid; grid-template-columns:repeat(auto-fill,minmax(270px,1fr)); gap:24px;
}
.menu-card {
  background:#fff; border-radius:20px; overflow:hidden;
  transition:transform .35s ease, box-shadow .35s ease;
}
.menu-card:hover { transform:translateY(-6px) scale(1.02); box-shadow:0 20px 40px rgba(0,0,0,.1); }
.menu-card-img {
  position:relative; overflow:hidden; aspect-ratio:4/3;
}
.menu-card-img img {
  width:100%; height:100%; object-fit:cover;
  transition:transform .5s ease;
}
.menu-card:hover .menu-card-img img { transform:scale(1.1); }
.menu-card-img .badge {
  position:absolute; top:12px; left:12px; z-index:2;
  padding:4px 14px; border-radius:20px; font-size:.65rem; font-weight:700;
  text-transform:uppercase; letter-spacing:.04em;
}
.badge-best { background:var(--red); color:#fff; }
.badge-new { background:var(--yellow); color:var(--charcoal); }
.badge-limited { background:var(--orange); color:#fff; }
.menu-card-img .quick-add {
  position:absolute; bottom:12px; right:12px;
  width:36px; height:36px; border-radius:50%; background:#fff;
  display:flex; align-items:center; justify-content:center;
  box-shadow:0 4px 12px rgba(0,0,0,.15);
  opacity:0; transform:translateY(8px);
  transition:all .3s;
}
.menu-card:hover .quick-add { opacity:1; transform:translateY(0); }
.quick-add:hover { background:var(--red); color:#fff; }
.menu-card-body { padding:16px 20px 20px; }
.menu-meta {
  display:flex; align-items:center; gap:4px; margin-bottom:8px;
  font-size:.8rem;
}
.menu-meta .star { color:var(--yellow); }
.menu-meta .rating-num { font-weight:700; }
.menu-meta .subtle { color:rgba(28,28,28,.4); }
.menu-meta .sep { color:rgba(28,28,28,.15); margin:0 4px; }
.menu-card-name { font-family:'Space Grotesk',sans-serif; font-weight:700; font-size:1.1rem; line-height:1.25; margin-bottom:4px; }
.menu-card-desc { font-size:.82rem; color:rgba(28,28,28,.55); line-height:1.55; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden; margin-bottom:8px; }
.menu-card-size { font-size:.72rem; color:rgba(28,28,28,.35); font-weight:500; margin-bottom:12px; }
.menu-card-footer { display:flex; align-items:center; justify-content:space-between; }
.menu-price { display:flex; align-items:baseline; gap:2px; }
.menu-price .dollar { font-size:.82rem; color:rgba(28,28,28,.35); }
.menu-price .amount { font-size:1.25rem; font-weight:700; color:var(--red); }

/* ── promo banner ── */
.promo-section { padding:32px 0; }
.promo-banner {
  position:relative; background:var(--red); border-radius:24px; overflow:hidden;
}
.promo-deco { position:absolute; border-radius:50%; }
.promo-inner {
  position:relative; z-index:2;
  display:flex; align-items:center; justify-content:space-between;
  padding:48px 56px; gap:32px; flex-wrap:wrap;
}
.promo-tag {
  display:inline-flex; align-items:center; gap:6px;
  background:var(--yellow); color:var(--charcoal); padding:6px 16px;
  border-radius:50px; font-size:.8rem; font-weight:700; margin-bottom:16px;
}
.promo-banner h2 {
  font-size:clamp(1.8rem,4vw,3rem); font-weight:700; color:#fff; line-height:1.1;
}
.promo-banner p { color:rgba(255,255,255,.65); font-size:1.05rem; margin-top:12px; max-width:480px; line-height:1.6; }
.promo-right { text-align:center; }
.promo-big { font-family:'Space Grotesk',sans-serif; font-size:clamp(3.5rem,7vw,5rem); font-weight:700; color:var(--yellow); line-height:1; }
.promo-sub { color:rgba(255,255,255,.55); font-size:.85rem; margin-top:4px; }
.promo-right .btn-primary {
  margin-top:16px; background:var(--yellow); color:var(--charcoal);
}
.promo-right .btn-primary:hover { background:#fff; }

/* ── combos ── */
.combos-section { background:var(--charcoal); position:relative; overflow:hidden; }
.combos-section .section-title { color:#fff; }
.combos-section .section-title .accent { color:var(--yellow); }
.combos-section .section-label { color:var(--yellow); }
.combos-section .section-desc { color:rgba(255,255,255,.5); }
.combo-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(320px,1fr)); gap:32px; }
.combo-card {
  background:rgba(255,255,255,.04); border:1px solid rgba(255,255,255,.08);
  border-radius:22px; overflow:hidden;
  transition:transform .35s, box-shadow .35s;
}
.combo-card:hover { transform:translateY(-6px); box-shadow:0 20px 40px rgba(0,0,0,.2); }
.combo-img { position:relative; aspect-ratio:16/10; overflow:hidden; }
.combo-img img { width:100%; height:100%; object-fit:cover; transition:transform .5s; }
.combo-card:hover .combo-img img { transform:scale(1.05); }
.combo-img .save-badge {
  position:absolute; top:16px; right:16px;
  background:var(--yellow); color:var(--charcoal); padding:6px 16px;
  border-radius:50px; font-size:.8rem; font-weight:700;
  animation:wiggle 1s ease-in-out infinite;
}
.combo-body { padding:24px; }
.combo-name { font-family:'Space Grotesk',sans-serif; font-weight:700; font-size:1.2rem; color:#fff; margin-bottom:4px; }
.combo-desc { color:rgba(255,255,255,.45); font-size:.85rem; margin-bottom:16px; }
.combo-items { list-style:none; margin-bottom:20px; }
.combo-items li { display:flex; align-items:center; gap:8px; color:rgba(255,255,255,.65); font-size:.85rem; margin-bottom:8px; }
.combo-items li svg { color:var(--yellow); flex-shrink:0; }
.combo-footer { display:flex; align-items:center; justify-content:space-between; }
.combo-pricing .orig { color:rgba(255,255,255,.35); text-decoration:line-through; font-size:.85rem; margin-right:8px; }
.combo-pricing .now { font-size:1.5rem; font-weight:700; color:var(--yellow); }

/* ── fresh ingredients ── */
.fresh-section { background:#fff; position:relative; overflow:hidden; }
.fresh-grid { display:grid; grid-template-columns:1fr 1fr; gap:48px; align-items:center; }
.fresh-features { display:grid; grid-template-columns:1fr 1fr; gap:24px; margin-top:40px; }
.fresh-feat { display:flex; gap:16px; }
.fresh-feat-icon {
  width:48px; height:48px; border-radius:16px; background:var(--red-light);
  display:flex; align-items:center; justify-content:center; flex-shrink:0;
}
.fresh-feat-icon svg { color:var(--red); }
.fresh-feat h4 { font-family:'Space Grotesk',sans-serif; font-weight:700; font-size:.85rem; margin-bottom:4px; }
.fresh-feat p { color:rgba(28,28,28,.45); font-size:.75rem; line-height:1.55; }

.fresh-images { display:grid; grid-template-columns:1fr 1fr; gap:16px; }
.fresh-images .col { display:flex; flex-direction:column; gap:16px; }
.fresh-images .col:last-child { padding-top:32px; }
.fresh-img { border-radius:20px; overflow:hidden; box-shadow:0 8px 24px rgba(0,0,0,.06); }
.fresh-img img { width:100%; object-fit:cover; transition:transform .5s; }
.fresh-img:hover img { transform:scale(1.05); }
.fresh-img.tall img { height:224px; }
.fresh-img.short img { height:176px; }

/* ── stats ── */
.stats-section {
  background:linear-gradient(135deg,var(--red),var(--tomato));
  position:relative; overflow:hidden; padding:72px 0;
}
.stats-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:32px; text-align:center; }
.stat-num {
  font-family:'Space Grotesk',sans-serif; font-size:clamp(2.2rem,4vw,3.5rem);
  font-weight:700; color:var(--yellow);
}
.stat-label { color:rgba(255,255,255,.65); font-size:.9rem; font-weight:500; margin-top:8px; }

/* ── build your own ── */
.build-section { position:relative; overflow:hidden; }
.build-grid { display:grid; grid-template-columns:1fr 1fr; gap:48px; align-items:center; }
.build-img-wrap { position:relative; border-radius:24px; overflow:hidden; box-shadow:0 24px 48px rgba(0,0,0,.1); }
.build-img-wrap img { width:100%; height:480px; object-fit:cover; }
.build-img-overlay { position:absolute; inset:0; background:linear-gradient(to top,rgba(0,0,0,.4),transparent); }
.build-price-card {
  position:absolute; bottom:24px; left:24px; right:24px;
  background:rgba(255,255,255,.95); backdrop-filter:blur(8px);
  border-radius:16px; padding:20px;
  display:flex; align-items:center; justify-content:space-between;
}
.build-price-card .label { font-size:.82rem; color:rgba(28,28,28,.45); font-weight:500; }
.build-price-card .price { font-family:'Space Grotesk',sans-serif; font-size:1.6rem; font-weight:700; margin-top:2px; }
.build-price-card .info { text-align:right; font-size:.72rem; color:rgba(28,28,28,.35); }

.option-group { margin-bottom:24px; }
.option-group h4 { font-family:'Space Grotesk',sans-serif; font-weight:700; margin-bottom:12px; }
.option-group .note { font-size:.72rem; color:rgba(28,28,28,.35); margin-bottom:8px; }
.option-pills { display:flex; flex-wrap:wrap; gap:8px; }
.opt-pill {
  padding:8px 18px; border-radius:50px; font-size:.82rem; font-weight:500;
  transition:all .25s; background:#fff; color:rgba(28,28,28,.6);
  border:1.5px solid #e5e5e5;
}
.opt-pill.active-red { background:var(--red); color:#fff; border-color:var(--red); box-shadow:0 2px 8px rgba(214,40,40,.2); }
.opt-pill.active-orange { background:var(--orange); color:#fff; border-color:var(--orange); }
.opt-pill.active-yellow { background:var(--yellow); color:var(--charcoal); border-color:var(--yellow); }
.opt-pill:not([class*="active"]):hover { border-color:var(--red); color:var(--red); }
.topping-pills { display:flex; flex-wrap:wrap; gap:6px; }
.top-pill {
  padding:6px 14px; border-radius:50px; font-size:.72rem; font-weight:500;
  transition:all .25s; background:#fff; color:rgba(28,28,28,.55);
  border:1.5px solid #e5e5e5;
}
.top-pill.active { background:var(--red); color:#fff; border-color:var(--red); }
.top-pill:not(.active):hover { border-color:rgba(214,40,40,.4); }

/* ── delivery how it works ── */
.delivery-section { background:var(--cream); }
.steps-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:32px; }
.step { text-align:center; position:relative; }
.step-icon-wrap {
  position:relative; display:inline-flex; align-items:center; justify-content:center;
  width:96px; height:96px; margin-bottom:20px;
}
.step-icon-bg { position:absolute; inset:0; border-radius:50%; background:var(--red-light); }
.step-icon {
  position:relative; width:64px; height:64px; border-radius:50%; background:#fff;
  box-shadow:0 4px 16px rgba(0,0,0,.06);
  display:flex; align-items:center; justify-content:center;
}
.step-icon svg { color:var(--red); }
.step-num {
  position:absolute; top:-4px; right:-4px; width:24px; height:24px;
  background:var(--red); color:#fff; font-size:.65rem; font-weight:700;
  border-radius:50%; display:flex; align-items:center; justify-content:center;
}
.step h3 { font-family:'Space Grotesk',sans-serif; font-weight:700; font-size:1.05rem; margin-bottom:8px; }
.step p { color:rgba(28,28,28,.45); font-size:.82rem; line-height:1.55; max-width:240px; margin:0 auto; }
.step-connector {
  display:none; position:absolute; top:48px; left:60%; width:80%; height:0;
  border-top:2px dashed rgba(214,40,40,.15);
}

/* ── reviews ── */
.reviews-section { background:#fff; position:relative; overflow:hidden; }
.reviews-header { display:flex; align-items:flex-end; justify-content:space-between; margin-bottom:40px; gap:16px; flex-wrap:wrap; }
.review-nav { display:flex; gap:8px; }
.review-nav button {
  width:44px; height:44px; border-radius:50%; background:none;
  border:2px solid rgba(28,28,28,.1);
  display:flex; align-items:center; justify-content:center;
  transition:all .3s; color:var(--charcoal);
}
.review-nav button:hover { border-color:var(--red); color:var(--red); }

.reviews-track {
  display:flex; gap:24px; overflow-x:auto; padding-bottom:8px;
  -ms-overflow-style:none; scrollbar-width:none;
}
.reviews-track::-webkit-scrollbar { display:none; }

.review-card {
  flex-shrink:0; width:360px; background:var(--cream); border-radius:20px;
  padding:28px; transition:transform .35s, box-shadow .35s;
}
.review-card:hover { transform:translateY(-4px); box-shadow:0 12px 32px rgba(0,0,0,.06); }
.review-stars { display:flex; gap:4px; margin-bottom:16px; }
.review-stars svg { width:16px; height:16px; }
.star-filled { color:var(--yellow); fill:var(--yellow); }
.star-empty { color:#d4d4d4; fill:none; }
.review-text { color:rgba(28,28,28,.6); font-size:.88rem; line-height:1.65; margin-bottom:20px; font-style:italic; }
.review-footer { display:flex; align-items:center; justify-content:space-between; }
.reviewer { display:flex; align-items:center; gap:12px; }
.reviewer-avatar {
  width:40px; height:40px; border-radius:50%; background:var(--red); color:#fff;
  display:flex; align-items:center; justify-content:center; font-weight:700; font-size:.8rem;
}
.reviewer-name { font-family:'Space Grotesk',sans-serif; font-weight:700; font-size:.85rem; }
.reviewer-date { font-size:.7rem; color:rgba(28,28,28,.35); }
.review-order {
  font-size:.68rem; color:rgba(28,28,28,.3); background:rgba(28,28,28,.04);
  padding:4px 12px; border-radius:50px;
}

/* ── locations ── */
.locations-section { background:var(--cream); }
.loc-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(260px,1fr)); gap:24px; }
.loc-card {
  background:#fff; border-radius:20px; padding:24px;
  transition:transform .35s, box-shadow .35s;
}
.loc-card:hover { transform:translateY(-4px); box-shadow:0 12px 32px rgba(0,0,0,.06); }
.loc-icon-wrap {
  width:48px; height:48px; border-radius:16px; background:var(--red-light);
  display:flex; align-items:center; justify-content:center; margin-bottom:16px;
}
.loc-icon-wrap svg { color:var(--red); }
.loc-card h3 { font-family:'Space Grotesk',sans-serif; font-weight:700; font-size:1.1rem; margin-bottom:12px; }
.loc-info { margin-bottom:8px; display:flex; align-items:flex-start; gap:10px; }
.loc-info svg { color:rgba(28,28,28,.25); flex-shrink:0; margin-top:2px; }
.loc-info span { font-size:.85rem; color:rgba(28,28,28,.55); }
.loc-btn {
  margin-top:20px; width:100%; padding:10px; font-size:.85rem; font-weight:600;
  color:var(--red); border:2px solid rgba(214,40,40,.15); border-radius:14px;
  background:none; transition:all .3s;
}
.loc-btn:hover { background:var(--red); color:#fff; border-color:var(--red); }

/* ── app promo ── */
.app-section { background:var(--charcoal); position:relative; overflow:hidden; }
.app-grid { display:grid; grid-template-columns:1fr 1fr; gap:48px; align-items:center; }
.app-section .section-title { color:#fff; }
.app-section .section-title .accent { color:var(--yellow); }
.app-section .section-label { color:var(--yellow); }
.app-desc { color:rgba(255,255,255,.55); font-size:1.05rem; line-height:1.7; margin-bottom:32px; max-width:480px; }
.app-feats { display:flex; flex-direction:column; gap:16px; margin-bottom:32px; }
.app-feat { display:flex; align-items:center; gap:12px; }
.app-feat-icon {
  width:40px; height:40px; border-radius:12px; background:rgba(214,40,40,.2);
  display:flex; align-items:center; justify-content:center; flex-shrink:0;
}
.app-feat-icon svg { color:var(--yellow); }
.app-feat span { color:rgba(255,255,255,.75); font-weight:500; }
.store-btns { display:flex; flex-wrap:wrap; gap:12px; }
.store-btn {
  display:flex; align-items:center; gap:12px;
  background:#fff; color:var(--charcoal); padding:12px 24px;
  border-radius:14px; font-weight:600; transition:background .3s;
}
.store-btn:hover { background:var(--cream); }
.store-btn .small { font-size:.6rem; opacity:.55; line-height:1; }
.store-btn .big { font-size:.85rem; font-weight:700; line-height:1.1; }

.phone-mock { display:flex; justify-content:center; }
.phone-frame {
  width:280px; background:var(--charcoal); border:3px solid rgba(255,255,255,.08);
  border-radius:36px; overflow:hidden;
  box-shadow:0 24px 48px rgba(214,40,40,.15);
}
.phone-notch {
  background:var(--charcoal); height:28px; display:flex; align-items:center; justify-content:center;
}
.phone-notch div { width:64px; height:18px; background:var(--charcoal); border-bottom:2px solid rgba(255,255,255,.08); border-left:2px solid rgba(255,255,255,.08); border-right:2px solid rgba(255,255,255,.08); border-radius:0 0 12px 12px; }
.phone-screen { background:var(--red); padding:20px 20px 28px; }
.phone-screen .app-title { color:var(--yellow); font-family:'Space Grotesk',sans-serif; font-weight:700; font-size:1.15rem; text-align:center; }
.phone-screen .app-sub { color:rgba(255,255,255,.55); font-size:.7rem; text-align:center; margin-top:4px; }
.phone-search { background:rgba(255,255,255,.1); border-radius:12px; padding:10px 16px; margin-top:16px; }
.phone-search span { color:rgba(255,255,255,.35); font-size:.8rem; }
.phone-cats { display:flex; gap:8px; margin-top:16px; overflow:hidden; }
.phone-cat {
  padding:6px 14px; border-radius:50px; font-size:.68rem; font-weight:600; white-space:nowrap;
}
.phone-cat.active { background:var(--yellow); color:var(--charcoal); }
.phone-cat:not(.active) { background:rgba(255,255,255,.1); color:rgba(255,255,255,.65); }
.phone-card { background:#fff; border-radius:16px; overflow:hidden; margin-top:16px; }
.phone-card img { width:100%; height:112px; object-fit:cover; }
.phone-card-body { padding:12px; }
.phone-card-body .name { font-weight:700; font-size:.82rem; }
.phone-card-footer { display:flex; align-items:center; justify-content:space-between; margin-top:8px; }
.phone-card-footer .price { font-weight:700; color:var(--red); font-size:.85rem; }
.phone-card-footer .add-btn { background:var(--red); color:#fff; font-size:.65rem; padding:4px 14px; border-radius:50px; font-weight:700; }
.phone-bottom {
  background:var(--charcoal); border-top:1px solid rgba(255,255,255,.04);
  padding:12px 24px; display:flex; justify-content:space-between;
}
.phone-bottom-dot { width:20px; height:20px; border-radius:4px; background:rgba(255,255,255,.12); }
.phone-bottom-dot.active { border-radius:50%; background:var(--red); }

.phone-float {
  position:absolute; padding:6px 14px; border-radius:12px;
  font-size:.72rem; font-weight:700; box-shadow:0 8px 24px rgba(0,0,0,.15);
}

/* ── faq ── */
.faq-section { background:#fff; }
.faq-list { max-width:720px; margin:0 auto; display:flex; flex-direction:column; gap:12px; }
.faq-item { background:var(--cream); border-radius:16px; overflow:hidden; }
.faq-toggle {
  width:100%; display:flex; align-items:center; justify-content:space-between;
  padding:20px 24px; text-align:left; gap:16px; background:none;
}
.faq-toggle span {
  font-family:'Space Grotesk',sans-serif; font-weight:700;
  font-size:1rem; color:var(--charcoal);
}
.faq-icon {
  width:32px; height:32px; border-radius:50%; flex-shrink:0;
  display:flex; align-items:center; justify-content:center;
  transition:all .3s; background:#fff; box-shadow:0 2px 8px rgba(0,0,0,.06);
}
.faq-item.open .faq-icon { background:var(--red); color:#fff; }
.faq-answer {
  max-height:0; overflow:hidden; transition:max-height .4s ease, padding .4s;
  padding:0 24px;
}
.faq-item.open .faq-answer { max-height:200px; padding:0 24px 20px; }
.faq-answer p { color:rgba(28,28,28,.55); font-size:.9rem; line-height:1.65; }

/* ── contact ── */
.contact-section { background:var(--cream); }
.contact-grid { display:grid; grid-template-columns:1fr 1fr; gap:48px; }
.contact-info-list { display:flex; flex-direction:column; gap:20px; }
.contact-row { display:flex; align-items:center; gap:16px; }
.contact-icon {
  width:48px; height:48px; border-radius:16px; background:var(--red-light);
  display:flex; align-items:center; justify-content:center; flex-shrink:0;
}
.contact-icon svg { color:var(--red); }
.contact-row .label { font-size:.68rem; color:rgba(28,28,28,.35); font-weight:500; text-transform:uppercase; letter-spacing:.08em; }
.contact-row .value { font-family:'Space Grotesk',sans-serif; font-weight:700; font-size:.95rem; }

.contact-form {
  background:#fff; border-radius:24px; padding:32px;
  box-shadow:0 8px 32px rgba(0,0,0,.04);
}
.contact-form h3 { font-family:'Space Grotesk',sans-serif; font-weight:700; font-size:1.2rem; margin-bottom:24px; }
.form-row { display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-bottom:16px; }
.form-group { margin-bottom:16px; }
.form-label { font-size:.82rem; font-weight:500; color:rgba(28,28,28,.55); margin-bottom:6px; display:block; }
.form-input {
  width:100%; padding:12px 16px; border-radius:12px;
  border:1.5px solid #e5e5e5; background:rgba(255,248,240,.5);
  font-family:inherit; font-size:.88rem; color:var(--charcoal);
  transition:border-color .3s, box-shadow .3s; outline:none;
}
.form-input:focus { border-color:var(--red); box-shadow:0 0 0 3px rgba(214,40,40,.08); }
textarea.form-input { resize:none; min-height:100px; }

/* ── footer ── */
.footer { background:var(--charcoal); padding:64px 0 32px; position:relative; }
.footer-accent { position:absolute; top:0; left:0; right:0; height:3px; background:linear-gradient(90deg,var(--red),var(--orange),var(--yellow)); }
.footer-grid { display:grid; grid-template-columns:1.3fr 1fr 1fr 1.2fr; gap:40px; margin-bottom:48px; }
.footer-brand p { color:rgba(255,255,255,.35); font-size:.85rem; line-height:1.65; margin:16px 0 20px; }
.footer-socials { display:flex; gap:10px; }
.footer-social {
  width:40px; height:40px; border-radius:12px; background:rgba(255,255,255,.04);
  display:flex; align-items:center; justify-content:center;
  color:rgba(255,255,255,.4); transition:all .3s;
}
.footer-social:hover { background:var(--red); color:#fff; }
.footer h4 {
  font-family:'Space Grotesk',sans-serif; font-weight:700; font-size:.8rem;
  color:#fff; text-transform:uppercase; letter-spacing:.1em; margin-bottom:16px;
}
.footer ul { list-style:none; }
.footer ul li { margin-bottom:10px; }
.footer ul a { color:rgba(255,255,255,.35); font-size:.85rem; transition:color .2s; }
.footer ul a:hover { color:var(--yellow); }
.footer-newsletter p { color:rgba(255,255,255,.35); font-size:.85rem; margin-bottom:16px; }
.newsletter-form { display:flex; gap:8px; }
.newsletter-input {
  flex:1; padding:12px 16px; border-radius:12px;
  background:rgba(255,255,255,.04); border:1px solid rgba(255,255,255,.08);
  color:#fff; font-size:.85rem; outline:none; font-family:inherit;
  transition:border-color .3s;
}
.newsletter-input::placeholder { color:rgba(255,255,255,.25); }
.newsletter-input:focus { border-color:var(--red); }
.newsletter-btn {
  padding:12px 20px; background:var(--red); color:#fff; border-radius:12px;
  font-weight:600; font-size:.85rem; transition:background .3s;
}
.newsletter-btn:hover { background:var(--tomato); }
.footer-bottom {
  border-top:1px solid rgba(255,255,255,.04); padding-top:32px;
  display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:16px;
}
.footer-bottom p { color:rgba(255,255,255,.25); font-size:.82rem; }
.footer-bottom-links { display:flex; gap:24px; }
.footer-bottom-links a { color:rgba(255,255,255,.25); font-size:.82rem; transition:color .2s; }
.footer-bottom-links a:hover { color:rgba(255,255,255,.55); }

/* ── sticky order ── */
.sticky-order {
  position:fixed; bottom:24px; right:24px; z-index:50;
  display:flex; align-items:center; gap:8px;
  background:var(--red); color:#fff; padding:14px 24px;
  border-radius:18px; font-weight:700; font-size:.95rem;
  box-shadow:0 8px 32px rgba(214,40,40,.35);
  animation:pulseGlow 2s infinite;
  transition:all .3s; opacity:0; transform:translateY(20px); pointer-events:none;
}
.sticky-order.show { opacity:1; transform:translateY(0); pointer-events:all; }
.sticky-order:hover { background:var(--tomato); transform:translateY(-2px); }

/* ── view full menu button ── */
.view-menu-cta { text-align:center; margin-top:48px; }

/* ── responsiveness ── */
@media(max-width:1024px) {
  .nav-links { display:none; }
  .hamburger { display:flex; }
  .fresh-grid, .build-grid, .contact-grid, .app-grid { grid-template-columns:1fr; }
  .steps-grid { grid-template-columns:1fr 1fr; }
  .step-connector { display:none; }
  .stats-grid { grid-template-columns:repeat(2,1fr); }
  .footer-grid { grid-template-columns:1fr 1fr; }
  .build-img-wrap img { height:360px; }
  .phone-mock { margin-top:32px; }
}

@media(max-width:768px) {
  .section { padding:48px 0; }
  .section-lg { padding:64px 0; }
  .hero-content { padding:112px 20px 140px; }
  .combo-grid { grid-template-columns:1fr; }
  .menu-grid { grid-template-columns:1fr 1fr; }
  .fresh-features { grid-template-columns:1fr; }
  .promo-inner { padding:32px 28px; flex-direction:column; text-align:center; }
  .form-row { grid-template-columns:1fr; }
  .review-card { width:300px; }
  .footer-grid { grid-template-columns:1fr; }
  .sticky-order { bottom:16px; right:16px; padding:12px 20px; font-size:.85rem; }
  .hero-badges { gap:12px; }
}

@media(max-width:480px) {
  .menu-grid { grid-template-columns:1fr; }
  .steps-grid { grid-template-columns:1fr; }
  .stats-grid { grid-template-columns:1fr 1fr; gap:24px; }
  .hero h1 { font-size:2.8rem; }
  .loc-grid { grid-template-columns:1fr; }
  .store-btns { flex-direction:column; }
  .fresh-images { grid-template-columns:1fr; }
  .fresh-images .col:last-child { padding-top:0; }
}
`;

/* ───────── SVG icon helpers ───────── */
const svgFlame = `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>`;
const svgStar = `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`;
const svgStarEmpty = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#d4d4d4" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`;
const svgStarFilled16 = `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`;
const svgPlus = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>`;
const svgMinus = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M5 12h14"/></svg>`;
const svgClock = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`;
const svgTruck = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"/><circle cx="17" cy="18" r="2"/><circle cx="7" cy="18" r="2"/></svg>`;
const svgShield = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>`;
const svgChevDown = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="m6 9 6 6 6-6"/></svg>`;
const svgChevLeft = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="m15 18-6-6 6-6"/></svg>`;
const svgChevRight = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="m9 18 6-6-6-6"/></svg>`;
const svgArrowRight = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>`;
const svgCheck = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`;
const svgMapPin = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>`;
const svgMapPinSmall = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>`;
const svgClockSmall = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`;
const svgPhoneSmall = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.81.36 1.6.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c1.21.34 2 .57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`;
const svgPhone20 = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.81.36 1.6.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c1.21.34 2 .57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`;
const svgMail = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>`;
const svgBag = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>`;
const svgMenu = `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>`;
const svgX = `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>`;
const svgZap = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`;
const svgZap18 = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`;
const svgTarget = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>`;
const svgSparkles = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>`;
const svgLeaf = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M11 20A7 7 0 0 1 9.8 6.9C15.5 4.9 17 3.5 19 2c1 2 2 4.5 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>`;
const svgInstagram = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>`;
const svgFacebook = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>`;
const svgTwitter = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>`;


function Icon({ svg, className }: { svg: string; className?: string }) {
  return <span className={className} dangerouslySetInnerHTML={{ __html: svg }} />;
}

/* ───────── count-up ───────── */
function CountUp({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const done = useRef(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !done.current) {
        done.current = true;
        const start = performance.now();
        const dur = 2200;
        const step = (now: number) => {
          const t = Math.min((now - start) / dur, 1);
          const ease = 1 - Math.pow(1 - t, 3);
          el.textContent = Math.floor(target * ease).toLocaleString() + suffix;
          if (t < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      }
    }, { threshold: 0.4 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [target, suffix]);
  return <span ref={ref}>0{suffix}</span>;
}

/* ───────── App ───────── */
export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showSticky, setShowSticky] = useState(false);
  const [activeCat, setActiveCat] = useState("all");
  const [openFaq, setOpenFaq] = useState(0);

  // build your own state
  const [selCrust, setSelCrust] = useState(0);
  const [selSauce, setSelSauce] = useState(0);
  const [selCheese, setSelCheese] = useState(0);
  const [selToppings, setSelToppings] = useState([0, 4]);

  const reviewsRef = useRef<HTMLDivElement>(null);

  const toggleTopping = (i: number) => {
    setSelToppings(prev => prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i]);
  };
  const buildPrice = 12.99 + (selToppings.length > 3 ? (selToppings.length - 3) * 1.5 : 0);

  const filtered = activeCat === "all" ? menu : menu.filter(m => m.cat === activeCat);

  /* scroll effects */
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      setShowSticky(window.scrollY > 600);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* intersection observer for reveals */
  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); });
    }, { threshold: 0.08, rootMargin: "0px 0px -32px 0px" });
    document.querySelectorAll(".reveal,.reveal-left,.reveal-right").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  });

  /* lock body scroll on mobile menu */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
  }, [mobileOpen]);

  const badgeCls = (b?: string) => b === "Best Seller" ? "badge badge-best" : b === "New" ? "badge badge-new" : b === "Limited" ? "badge badge-limited" : "";

  const scrollReviews = (dir: number) => {
    reviewsRef.current?.scrollBy({ left: dir * 380, behavior: "smooth" });
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />

      {/* ══ NAV ══ */}
      <nav className={`nav${scrolled ? " scrolled" : ""}`}>
        <div className="nav-inner">
          <a href="#" className="logo">
            <Icon svg={svgFlame} />
            <span className="logo-text">Flame<span>Slice</span></span>
          </a>
          <ul className="nav-links">
            {["Menu","Combos","Build Your Own","Locations","Reviews","FAQ"].map(l => (
              <li key={l}><a href={`#${l.toLowerCase().replace(/ /g,"-")}`}>{l}</a></li>
            ))}
          </ul>
          <div className="nav-actions">
            <button className="cart-btn" aria-label="Cart">
              <Icon svg={svgBag} />
              <span className="cart-badge">3</span>
            </button>
            <a href="#menu" className="btn-primary" style={{ padding:"10px 24px", fontSize:".85rem" }}>Order Now</a>
            <button className="hamburger" aria-label="Menu" onClick={() => setMobileOpen(!mobileOpen)}>
              <Icon svg={mobileOpen ? svgX : svgMenu} />
            </button>
          </div>
        </div>
      </nav>

      {/* mobile menu */}
      <div className={`mobile-menu${mobileOpen ? " open" : ""}`}>
        {["Menu","Combos","Build Your Own","Locations","Reviews","FAQ"].map(l => (
          <a key={l} href={`#${l.toLowerCase().replace(/ /g,"-")}`} onClick={() => setMobileOpen(false)}>{l}</a>
        ))}
        <a href="#menu" className="btn-primary" style={{ marginTop:16, padding:"14px 40px", fontSize:"1.1rem" }} onClick={() => setMobileOpen(false)}>Order Now</a>
      </div>

      {/* ══ HERO ══ */}
      <section className="hero">
        <div className="hero-bg">
          <img src={IMG.heroPizza} alt="Delicious pizza with melted cheese" />
          <div className="hero-overlay" />
          <div className="hero-overlay2" />
        </div>
        <div className="hero-deco float" style={{ top:"15%", right:"8%", width:64, height:64, background:"rgba(244,180,0,.18)" }} />
        <div className="hero-deco float-slow" style={{ top:"30%", right:"16%", width:32, height:32, background:"rgba(230,57,70,.22)" }} />
        <div className="hero-deco float" style={{ bottom:"26%", right:"5%", width:48, height:48, background:"rgba(247,127,0,.12)", animationDelay:"1s" }} />
        <div className="hero-bottom-wedge" />
        <div className="hero-content">
          <div className="promo-badge">
            <span className="promo-dot" />
            Free delivery on orders over $25
          </div>
          <h1>Fresh.<br/><span className="accent">Fast.</span><br/>Fired Up.</h1>
          <p className="hero-desc">Hand-tossed pizzas and flame-grilled burgers made with fresh ingredients and delivered to your door in under 30 minutes.</p>
          <div className="hero-ctas">
            <a href="#menu" className="btn-primary" style={{ fontSize:"1.1rem", padding:"16px 40px" }}>Order Now</a>
            <a href="#menu" className="btn-secondary" style={{ fontSize:"1.1rem", padding:"14px 32px" }}>View Menu</a>
          </div>
          <div className="hero-badges">
            <div className="hero-badge"><Icon svg={svgClock} /><span>25-35 min delivery</span></div>
            <div className="hero-badge"><Icon svg={svgTruck} /><span>Free delivery $25+</span></div>
            <div className="hero-badge"><Icon svg={svgShield} /><span>Freshness guaranteed</span></div>
          </div>
        </div>
        <div className="scroll-indicator">
          <span>Scroll</span>
          <Icon svg={svgChevDown} />
        </div>
      </section>

      {/* ══ CATEGORIES ══ */}
      <section className="categories">
        <div className="container">
          <div className="cat-bar">
            {cats.map(c => (
              <button key={c.id} className={`cat-pill${activeCat===c.id?" active":""}`} onClick={() => setActiveCat(c.id)}>
                {c.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ══ MENU ══ */}
      <section id="menu" className="section-lg" style={{ background:"var(--cream)" }}>
        <div className="container">
          <div className="text-center reveal" style={{ marginBottom:48 }}>
            <div className="section-label" style={{ color:"var(--tomato)" }}>Our Menu</div>
            <h2 className="section-title">What Are You <span className="accent">Craving</span>?</h2>
            <p className="section-desc mx-auto">From hand-tossed pizzas to flame-grilled burgers, every item is made fresh to order with premium ingredients.</p>
          </div>
          <div className="menu-grid">
            {filtered.map((item, i) => (
              <div key={item.id} className="menu-card reveal" style={{ transitionDelay:`${i*.07}s` }}>
                <div className="menu-card-img">
                  <img src={item.img} alt={item.name} loading="lazy" />
                  {item.badge && <span className={badgeCls(item.badge)}>{item.badge}</span>}
                  <button className="quick-add" aria-label="Quick add"><Icon svg={svgPlus} /></button>
                </div>
                <div className="menu-card-body">
                  <div className="menu-meta">
                    <span className="star"><Icon svg={svgStar} /></span>
                    <span className="rating-num">{item.rating}</span>
                    <span className="subtle">({item.reviews})</span>
                    <span className="sep">|</span>
                    <span className="subtle">{item.cal}</span>
                  </div>
                  <div className="menu-card-name">{item.name}</div>
                  <div className="menu-card-desc">{item.desc}</div>
                  {item.size && <div className="menu-card-size">{item.size}</div>}
                  <div className="menu-card-footer">
                    <div className="menu-price">
                      <span className="dollar">$</span>
                      <span className="amount">{item.price.toFixed(2)}</span>
                    </div>
                    <button className="btn-order"><Icon svg={svgPlus} /> Add</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {filtered.length === 0 && <p className="text-center" style={{ padding:"64px 0", color:"rgba(28,28,28,.4)" }}>No items in this category yet.</p>}
          <div className="view-menu-cta reveal"><button className="btn-primary" style={{ padding:"14px 40px", fontSize:"1.05rem" }}>View Full Menu</button></div>
        </div>
      </section>

      {/* ══ PROMO BANNER ══ */}
      <section className="promo-section">
        <div className="container">
          <div className="promo-banner reveal">
            <div className="promo-deco" style={{ right:-80, top:-80, width:280, height:280, background:"rgba(230,57,70,.3)" }} />
            <div className="promo-deco" style={{ left:-40, bottom:-40, width:192, height:192, background:"rgba(247,127,0,.2)" }} />
            <div className="promo-deco" style={{ right:"25%", top:"25%", width:64, height:64, background:"rgba(244,180,0,.12)" }} />
            <div className="promo-inner">
              <div>
                <div className="promo-tag"><Icon svg={svgZap} /> Limited Time Only</div>
                <h2>Double Cheese Weekend</h2>
                <p>Get double the cheese on any pizza at no extra charge. Every Friday through Sunday. No code needed.</p>
              </div>
              <div className="promo-right">
                <div className="promo-big">FREE</div>
                <div className="promo-sub">Extra Cheese</div>
                <button className="btn-primary">Order Now <Icon svg={svgArrowRight} /></button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ COMBOS ══ */}
      <section id="combos" className="combos-section section-lg">
        <div className="container">
          <div className="text-center reveal" style={{ marginBottom:56 }}>
            <div className="section-label">Best Value</div>
            <h2 className="section-title">Combo <span className="accent">Deals</span></h2>
            <p className="section-desc mx-auto">More food, more flavor, less spend. Grab a deal and save big on your favorites.</p>
          </div>
          <div className="combo-grid">
            {combos.map((c, i) => (
              <div key={c.id} className="combo-card reveal" style={{ transitionDelay:`${i*.15}s` }}>
                <div className="combo-img">
                  <img src={c.img} alt={c.name} loading="lazy" />
                  <span className="save-badge">{c.save}</span>
                </div>
                <div className="combo-body">
                  <div className="combo-name">{c.name}</div>
                  <div className="combo-desc">{c.desc}</div>
                  <ul className="combo-items">
                    {c.items.map((it, j) => <li key={j}><Icon svg={svgCheck} />{it}</li>)}
                  </ul>
                  <div className="combo-footer">
                    <div className="combo-pricing">
                      <span className="orig">${c.orig.toFixed(2)}</span>
                      <span className="now">${c.price.toFixed(2)}</span>
                    </div>
                    <button className="btn-primary" style={{ padding:"10px 20px", fontSize:".85rem" }}>Grab Deal <Icon svg={svgArrowRight} /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FRESH INGREDIENTS ══ */}
      <section className="fresh-section section-lg">
        <div className="container">
          <div className="fresh-grid">
            <div className="reveal-left">
              <div className="section-label" style={{ color:"var(--tomato)" }}>Our Promise</div>
              <h2 className="section-title">Only the <span className="accent">Freshest</span> Ingredients</h2>
              <p className="section-desc">We believe great food starts with great ingredients. That is why we partner with local farmers and artisan suppliers to bring you the best quality in every bite.</p>
              <div className="fresh-features">
                {[
                  { icon:svgLeaf, t:"Farm Fresh Daily", d:"Vegetables and herbs sourced every morning from local farms within a 50-mile radius." },
                  { icon:svgFlame, t:"Stone-Oven Fired", d:"Pizzas baked at 800 degrees in traditional stone ovens for the perfect crispy crust." },
                  { icon:svgShield, t:"Quality Guaranteed", d:"Premium grade meats, imported Italian cheeses, and no artificial preservatives." },
                  { icon:svgClock, t:"Made to Order", d:"Every dish is prepared from scratch when you order. Never pre-made, always fresh." },
                ].map((f, i) => (
                  <div className="fresh-feat" key={i}>
                    <div className="fresh-feat-icon"><Icon svg={f.icon} /></div>
                    <div>
                      <h4>{f.t}</h4>
                      <p>{f.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="reveal-right">
              <div className="fresh-images">
                <div className="col">
                  <div className="fresh-img tall"><img src={IMG.fresh1} alt="Fresh tomatoes and mozzarella" loading="lazy" /></div>
                  <div className="fresh-img short"><img src={IMG.fresh2} alt="Crispy fries" loading="lazy" /></div>
                </div>
                <div className="col">
                  <div className="fresh-img short"><img src={IMG.fresh3} alt="Flame-grilled patty" loading="lazy" /></div>
                  <div className="fresh-img tall"><img src={IMG.fresh4} alt="Fresh pizza on board" loading="lazy" /></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ STATS ══ */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="reveal"><div className="stat-num"><CountUp target={250000} suffix="+" /></div><div className="stat-label">Orders Delivered</div></div>
            <div className="reveal" style={{ transitionDelay:".15s" }}><div className="stat-num"><CountUp target={85000} suffix="+" /></div><div className="stat-label">Happy Customers</div></div>
            <div className="reveal" style={{ transitionDelay:".3s" }}><div className="stat-num"><CountUp target={4} /></div><div className="stat-label">Locations Citywide</div></div>
            <div className="reveal" style={{ transitionDelay:".45s" }}><div className="stat-num">4.9<span style={{ fontSize:"60%", color:"rgba(255,255,255,.4)" }}>/5</span></div><div className="stat-label">Average Rating</div></div>
          </div>
        </div>
      </section>

      {/* ══ BUILD YOUR OWN ══ */}
      <section id="build-your-own" className="build-section section-lg" style={{ background:"var(--cream)" }}>
        <div className="container">
          <div className="build-grid">
            <div className="reveal-left">
              <div className="build-img-wrap">
                <img src={IMG.buildPizza} alt="Custom pizza" loading="lazy" />
                <div className="build-img-overlay" />
                <div className="build-price-card">
                  <div><div className="label">Your Custom Pizza</div><div className="price">${buildPrice.toFixed(2)}</div></div>
                  <div className="info"><div>{selToppings.length} toppings</div><div>First 3 included</div></div>
                </div>
              </div>
            </div>
            <div className="reveal-right">
              <div className="section-label" style={{ color:"var(--tomato)" }}>Customize</div>
              <h2 className="section-title" style={{ marginBottom:32 }}>Build Your <span className="accent">Own</span> Pizza</h2>

              <div className="option-group">
                <h4>Choose Your Crust</h4>
                <div className="option-pills">
                  {crusts.map((c, i) => <button key={c} className={`opt-pill${selCrust===i?" active-red":""}`} onClick={() => setSelCrust(i)}>{c}</button>)}
                </div>
              </div>
              <div className="option-group">
                <h4>Pick Your Sauce</h4>
                <div className="option-pills">
                  {sauces.map((s, i) => <button key={s} className={`opt-pill${selSauce===i?" active-orange":""}`} onClick={() => setSelSauce(i)}>{s}</button>)}
                </div>
              </div>
              <div className="option-group">
                <h4>Select Cheese</h4>
                <div className="option-pills">
                  {cheeses.map((c, i) => <button key={c} className={`opt-pill${selCheese===i?" active-yellow":""}`} onClick={() => setSelCheese(i)}>{c}</button>)}
                </div>
              </div>
              <div className="option-group">
                <h4>Add Toppings</h4>
                <div className="note">First 3 included, $1.50 each after</div>
                <div className="topping-pills">
                  {toppings.map((t, i) => <button key={t} className={`top-pill${selToppings.includes(i)?" active":""}`} onClick={() => toggleTopping(i)}>{t}</button>)}
                </div>
              </div>
              <button className="btn-primary" style={{ padding:"14px 40px", fontSize:"1.05rem" }}>Add to Cart - ${buildPrice.toFixed(2)} <Icon svg={svgArrowRight} /></button>
            </div>
          </div>
        </div>
      </section>

      {/* ══ DELIVERY / HOW IT WORKS ══ */}
      <section className="delivery-section section-lg">
        <div className="container">
          <div className="text-center reveal" style={{ marginBottom:56 }}>
            <div className="section-label" style={{ color:"var(--tomato)" }}>How It Works</div>
            <h2 className="section-title">From Kitchen to <span className="accent">Your Door</span></h2>
            <p className="section-desc mx-auto">Ordering is as easy as 1-2-3-4. Fast, simple, and delicious every time.</p>
          </div>
          <div className="steps-grid">
            {[
              { num:"01", icon:svgTarget, t:"Choose Your Food", d:"Browse our menu and pick your favorites. Customize any item to your liking." },
              { num:"02", icon:svgSparkles, t:"We Prepare Fresh", d:"Your order is made from scratch by our skilled chefs using premium ingredients." },
              { num:"03", icon:svgTruck, t:"Fast Delivery", d:"Track your order in real-time. Average delivery time is just 25-35 minutes." },
              { num:"04", icon:svgClock, t:"Enjoy Hot & Fresh", d:"Your food arrives hot, fresh, and ready to eat. Satisfaction guaranteed." },
            ].map((s, i) => (
              <div key={i} className="step reveal" style={{ transitionDelay:`${i*.12}s` }}>
                {i < 3 && <div className="step-connector" style={{ display: "block" }} />}
                <div className="step-icon-wrap">
                  <div className="step-icon-bg" />
                  <div className="step-icon"><Icon svg={s.icon} /></div>
                  <span className="step-num">{s.num}</span>
                </div>
                <h3>{s.t}</h3>
                <p>{s.d}</p>
              </div>
            ))}
          </div>
          <div className="text-center reveal" style={{ marginTop:56 }}>
            <button className="btn-primary" style={{ padding:"14px 40px", fontSize:"1.05rem" }}>Start Your Order <Icon svg={svgArrowRight} /></button>
            <p style={{ color:"rgba(28,28,28,.35)", fontSize:".85rem", marginTop:12 }}>Free delivery on orders over $25</p>
          </div>
        </div>
      </section>

      {/* ══ REVIEWS ══ */}
      <section id="reviews" className="reviews-section section-lg">
        <div className="container">
          <div className="reviews-header">
            <div className="reveal">
              <div className="section-label" style={{ color:"var(--tomato)" }}>Testimonials</div>
              <h2 className="section-title">What Our <span className="accent">Customers</span> Say</h2>
            </div>
            <div className="review-nav reveal">
              <button onClick={() => scrollReviews(-1)} aria-label="Previous"><Icon svg={svgChevLeft} /></button>
              <button onClick={() => scrollReviews(1)} aria-label="Next"><Icon svg={svgChevRight} /></button>
            </div>
          </div>
          <div className="reviews-track" ref={reviewsRef}>
            {reviews.map((r, i) => (
              <div key={r.id} className="review-card reveal" style={{ transitionDelay:`${i*.1}s` }}>
                <div className="review-stars">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <span key={j} className={j < r.rating ? "star-filled" : "star-empty"}>
                      <Icon svg={j < r.rating ? svgStarFilled16 : svgStarEmpty} />
                    </span>
                  ))}
                </div>
                <div className="review-text">"{r.text}"</div>
                <div className="review-footer">
                  <div className="reviewer">
                    <div className="reviewer-avatar">{r.avatar}</div>
                    <div>
                      <div className="reviewer-name">{r.name}</div>
                      <div className="reviewer-date">{r.date}</div>
                    </div>
                  </div>
                  <span className="review-order">{r.order}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ LOCATIONS ══ */}
      <section id="locations" className="locations-section section-lg">
        <div className="container">
          <div className="text-center reveal" style={{ marginBottom:56 }}>
            <div className="section-label" style={{ color:"var(--tomato)" }}>Find Us</div>
            <h2 className="section-title">Our <span className="accent">Locations</span></h2>
            <p className="section-desc mx-auto">Visit us at any of our four locations across the city for dine-in, takeout, or delivery.</p>
          </div>
          <div className="loc-grid">
            {locations.map((loc, i) => (
              <div key={loc.id} className="loc-card reveal" style={{ transitionDelay:`${i*.1}s` }}>
                <div className="loc-icon-wrap"><Icon svg={svgMapPin} /></div>
                <h3>{loc.name}</h3>
                <div className="loc-info"><Icon svg={svgMapPinSmall} /><span>{loc.address}</span></div>
                <div className="loc-info"><Icon svg={svgClockSmall} /><span>{loc.hours}</span></div>
                <div className="loc-info"><Icon svg={svgPhoneSmall} /><span>{loc.phone}</span></div>
                <button className="loc-btn">Get Directions</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ APP PROMO ══ */}
      <section className="app-section section-lg">
        <div className="container">
          <div className="app-grid">
            <div className="reveal-left">
              <div className="section-label">Get the App</div>
              <h2 className="section-title">Order Even <span className="accent">Faster</span> On Mobile</h2>
              <p className="app-desc" style={{ marginTop:16 }}>Download the FlameSlice app for exclusive deals, faster checkout, real-time order tracking, and loyalty rewards on every purchase.</p>
              <div className="app-feats">
                {[
                  { icon:svgZap18, t:"One-tap reordering from your favorites" },
                  { icon:svgStarFilled16, t:"Earn points with every order" },
                  { icon:svgTruck, t:"Live GPS tracking for deliveries" },
                ].map((f, i) => (
                  <div key={i} className="app-feat">
                    <div className="app-feat-icon"><Icon svg={f.icon} /></div>
                    <span>{f.t}</span>
                  </div>
                ))}
              </div>
              <div className="store-btns">
                <button className="store-btn">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/></svg>
                  <div><div className="small">Download on the</div><div className="big">App Store</div></div>
                </button>
                <button className="store-btn">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M3.61 1.814L13.793 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.61-.92zM14.5 12.707l2.55 2.55-8.26 4.7 5.71-7.25zm4.26-1.414L21.52 12l-2.76.707-2.18-2.18 2.18-1.234zM8.79 4.043l8.26 4.7-2.55 2.55-5.71-7.25z"/></svg>
                  <div><div className="small">Get it on</div><div className="big">Google Play</div></div>
                </button>
              </div>
            </div>
            <div className="reveal-right phone-mock">
              <div style={{ position:"relative" }}>
                <div className="phone-frame">
                  <div className="phone-notch"><div /></div>
                  <div className="phone-screen">
                    <div className="app-title">FlameSlice</div>
                    <div className="app-sub">What are you craving today?</div>
                    <div className="phone-search"><span>Search menu...</span></div>
                    <div className="phone-cats">
                      <span className="phone-cat active">Pizza</span>
                      <span className="phone-cat">Burgers</span>
                      <span className="phone-cat">Wraps</span>
                    </div>
                    <div className="phone-card">
                      <img src={IMG.pizza1} alt="Pizza" loading="lazy" />
                      <div className="phone-card-body">
                        <div className="name">The Inferno</div>
                        <div className="phone-card-footer">
                          <span className="price">$16.99</span>
                          <span className="add-btn">Add</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="phone-bottom">
                    <div className="phone-bottom-dot" />
                    <div className="phone-bottom-dot" />
                    <div className="phone-bottom-dot active" />
                    <div className="phone-bottom-dot" />
                  </div>
                </div>
                <div className="phone-float float" style={{ top:-16, left:-48, background:"var(--yellow)", color:"var(--charcoal)" }}>20% OFF</div>
                <div className="phone-float float-slow" style={{ top:"33%", right:-56, background:"#fff", color:"var(--charcoal)", animationDelay:".5s" }}>Free Delivery</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ FAQ ══ */}
      <section id="faq" className="faq-section section-lg">
        <div className="container">
          <div className="text-center reveal" style={{ marginBottom:48 }}>
            <div className="section-label" style={{ color:"var(--tomato)" }}>Got Questions?</div>
            <h2 className="section-title">Frequently <span className="accent">Asked</span></h2>
          </div>
          <div className="faq-list">
            {faqs.map((f, i) => (
              <div key={i} className={`faq-item reveal${openFaq===i?" open":""}`} style={{ transitionDelay:`${i*.07}s` }}>
                <button className="faq-toggle" onClick={() => setOpenFaq(openFaq===i?-1:i)}>
                  <span>{f.q}</span>
                  <div className="faq-icon"><Icon svg={openFaq===i?svgMinus:svgPlus} /></div>
                </button>
                <div className="faq-answer"><p>{f.a}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CONTACT ══ */}
      <section id="contact" className="contact-section section-lg">
        <div className="container">
          <div className="contact-grid">
            <div className="reveal-left">
              <div className="section-label" style={{ color:"var(--tomato)" }}>Contact Us</div>
              <h2 className="section-title">Get In <span className="accent">Touch</span></h2>
              <p className="section-desc" style={{ marginBottom:32 }}>Have a question, feedback, or catering inquiry? We would love to hear from you. Reach out and our team will get back to you within 24 hours.</p>
              <div className="contact-info-list">
                <div className="contact-row">
                  <div className="contact-icon"><Icon svg={svgPhone20} /></div>
                  <div><div className="label">Phone</div><div className="value">(555) 123-4567</div></div>
                </div>
                <div className="contact-row">
                  <div className="contact-icon"><Icon svg={svgMail} /></div>
                  <div><div className="label">Email</div><div className="value">hello@flameslice.com</div></div>
                </div>
                <div className="contact-row">
                  <div className="contact-icon"><Icon svg={svgMapPin} /></div>
                  <div><div className="label">Main Office</div><div className="value">142 Main Street, Downtown</div></div>
                </div>
              </div>
            </div>
            <div className="reveal-right">
              <div className="contact-form">
                <h3>Send us a message</h3>
                <form onSubmit={e => e.preventDefault()}>
                  <div className="form-row">
                    <div><label className="form-label">Name</label><input className="form-input" placeholder="Your name" /></div>
                    <div><label className="form-label">Email</label><input className="form-input" type="email" placeholder="your@email.com" /></div>
                  </div>
                  <div className="form-group"><label className="form-label">Subject</label><input className="form-input" placeholder="What's this about?" /></div>
                  <div className="form-group"><label className="form-label">Message</label><textarea className="form-input" placeholder="Tell us what's on your mind..." /></div>
                  <button type="submit" className="btn-primary" style={{ width:"100%", justifyContent:"center", padding:"14px" }}>Send Message <Icon svg={svgArrowRight} /></button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ FOOTER ══ */}
      <footer className="footer">
        <div className="footer-accent" />
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <a href="#" className="logo">
                <Icon svg={svgFlame} />
                <span className="logo-text">Flame<span>Slice</span></span>
              </a>
              <p>Hand-tossed pizzas and flame-grilled burgers made fresh with premium ingredients. Fast delivery, bold flavors, zero compromise.</p>
              <div className="footer-socials">
                <a href="#" className="footer-social" aria-label="Instagram"><Icon svg={svgInstagram} /></a>
                <a href="#" className="footer-social" aria-label="Facebook"><Icon svg={svgFacebook} /></a>
                <a href="#" className="footer-social" aria-label="Twitter"><Icon svg={svgTwitter} /></a>
              </div>
            </div>
            <div>
              <h4>Quick Links</h4>
              <ul>
                {["Menu","Combo Deals","Build Your Own","Locations","Reviews"].map(l => <li key={l}><a href="#">{l}</a></li>)}
              </ul>
            </div>
            <div>
              <h4>Support</h4>
              <ul>
                {["FAQ","Contact Us","Delivery Info","Refund Policy","Careers","Catering"].map(l => <li key={l}><a href="#">{l}</a></li>)}
              </ul>
            </div>
            <div className="footer-newsletter">
              <h4>Stay Updated</h4>
              <p>Get exclusive deals and new menu alerts delivered to your inbox.</p>
              <form className="newsletter-form" onSubmit={e => e.preventDefault()}>
                <input className="newsletter-input" type="email" placeholder="your@email.com" />
                <button className="newsletter-btn" type="submit">Join</button>
              </form>
            </div>
          </div>
          <div className="footer-bottom">
            <p>2025 FlameSlice. All rights reserved.</p>
            <div className="footer-bottom-links">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      {/* ══ STICKY ORDER BUTTON ══ */}
      <a href="#menu" className={`sticky-order${showSticky?" show":""}`}>
        <Icon svg={svgBag} />
        <span>Order Now</span>
      </a>
    </>
  );
}
