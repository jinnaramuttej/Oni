import { NextResponse } from "next/server";
import DOMPurify from "isomorphic-dompurify";
import { sanitizeText } from "@/lib/auth";

const ONI_SYSTEM_PROMPT = `You are Oni, an elite AI website designer and builder. You craft stunning, professional, and visually captivating websites.

RESPONSE FORMAT:
- Casual messages: Respond naturally in 1-2 sentences, no code
- Website requests: Short intro + full HTML in <ONI_CODE>...</ONI_CODE>

RULES:
- Single HTML file only (all CSS in <style>, all JS in <script>)
- Import beautiful Google Fonts (Playfair Display + Poppins/Montserrat/Lato)
- Custom CSS with variables for colors and spacing
- At least 6 sections: Sticky navbar, hero, features/about, services/products, testimonials, footer
- Hero: 100vh, gradient background, dramatic typography (min 80px), animated elements
- Sections: Alternating backgrounds, proper spacing, smooth scroll
- Cards: Hover effects, shadows, border-radius, padding
- Navbar: Sticky, backdrop-filter, logo, links, CTA, changes on scroll
- Buttons: Gradients, border-radius, box shadows, hover transitions
- Animations: Fade-in, scroll effects, subtle movements
- Mobile-responsive: @media for 768px and below
- No external images: Use gradients, patterns, Unicode symbols (✦★◆→✨💫🌟)
- Real content: Detailed copy, realistic names/prices, no lorem ipsum
- Minimum 600 lines of clean, well-structured HTML/CSS/JS`;

function createMockStream(clean: string, messages: { role: string; content: string }[]) {
  const mockRestaurant = `Here's your beautiful restaurant website!
<ONI_CODE>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>La Dolce Vita - Authentic Italian Cuisine</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700;800;900&family=Poppins:wght@300;400;500;600;700&display=swap');

        :root {
            --wine-red: #8B0000;
            --gold: #D4AF37;
            --cream: #FDF8F0;
            --dark: #1A1A1A;
            --white: #FFFFFF;
            --shadow: 0 10px 40px rgba(0,0,0,0.1);
            --shadow-lg: 0 20px 60px rgba(0,0,0,0.15);
            --radius: 20px;
            --radius-sm: 12px;
            --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            --container-width: 1280px;
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        html {
            scroll-behavior: smooth;
        }

        body {
            font-family: 'Poppins', sans-serif;
            background: var(--cream);
            color: var(--dark);
            line-height: 1.8;
            overflow-x: hidden;
        }

        .container {
            max-width: var(--container-width);
            margin: 0 auto;
            padding: 0 5%;
        }

        /* Navbar */
        nav {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            background: rgba(26, 26, 26, 0.95);
            backdrop-filter: blur(15px);
            padding: 1.25rem 0;
            z-index: 1000;
            transition: var(--transition);
            box-shadow: var(--shadow);
        }

        nav.scrolled {
            padding: 0.75rem 0;
            box-shadow: var(--shadow-lg);
        }

        .nav-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
            max-width: var(--container-width);
            margin: 0 auto;
            padding: 0 5%;
        }

        nav .logo {
            font-family: 'Playfair Display', serif;
            font-size: 1.8rem;
            font-weight: 800;
            color: var(--gold);
            letter-spacing: 1px;
        }

        nav ul {
            display: flex;
            gap: 2.5rem;
            list-style: none;
            align-items: center;
        }

        nav a {
            color: var(--cream);
            text-decoration: none;
            font-weight: 500;
            font-size: 1rem;
            position: relative;
            transition: var(--transition);
        }

        nav a::after {
            content: '';
            position: absolute;
            bottom: -6px;
            left: 0;
            width: 0;
            height: 2px;
            background: var(--gold);
            transition: var(--transition);
        }

        nav a:hover::after {
            width: 100%;
        }

        nav a:hover {
            color: var(--gold);
        }

        .btn {
            background: linear-gradient(135deg, var(--gold), #C9A334);
            color: var(--dark);
            padding: 0.85rem 2.25rem;
            border: none;
            border-radius: 50px;
            font-weight: 600;
            font-size: 1rem;
            cursor: pointer;
            transition: var(--transition);
            box-shadow: 0 6px 20px rgba(212, 175, 55, 0.4);
            font-family: 'Poppins', sans-serif;
        }

        .btn:hover {
            transform: translateY(-3px);
            box-shadow: 0 10px 30px rgba(212, 175, 55, 0.5);
        }

        .btn-outline {
            background: transparent;
            border: 2px solid var(--gold);
            color: var(--gold);
            padding: 0.8rem 2.15rem;
        }

        .btn-outline:hover {
            background: var(--gold);
            color: var(--dark);
        }

        /* Hero */
        .hero {
            min-height: 100vh;
            background: linear-gradient(135deg, var(--dark) 0%, #3A1A1A 50%, var(--wine-red) 100%);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: 6rem 5% 4rem;
            position: relative;
            overflow: hidden;
            text-align: center;
        }

        .hero::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: radial-gradient(circle at 30% 30%, rgba(212, 175, 55, 0.12) 0%, transparent 60%);
            animation: float 6s ease-in-out infinite;
        }

        @keyframes float {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            50% { transform: translateY(-30px) rotate(1deg); }
        }

        .hero-content {
            position: relative;
            z-index: 2;
            max-width: 800px;
        }

        .hero h1 {
            font-family: 'Playfair Display', serif;
            font-size: clamp(3.5rem, 10vw, 6.5rem);
            font-weight: 900;
            color: var(--gold);
            line-height: 1.1;
            margin-bottom: 1.5rem;
            text-shadow: 2px 4px 20px rgba(0,0,0,0.5);
            animation: fadeInUp 1s ease-out;
        }

        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(40px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .hero p {
            font-size: clamp(1.2rem, 2.5vw, 1.6rem);
            color: var(--cream);
            margin-bottom: 3rem;
            opacity: 0.95;
            animation: fadeInUp 1s ease-out 0.2s both;
        }

        .hero-buttons {
            display: flex;
            gap: 1.5rem;
            justify-content: center;
            flex-wrap: wrap;
            animation: fadeInUp 1s ease-out 0.4s both;
        }

        /* Section */
        section {
            padding: 7rem 0;
        }

        .section-header {
            text-align: center;
            margin-bottom: 4.5rem;
            padding: 0 5%;
        }

        .section-header h2 {
            font-family: 'Playfair Display', serif;
            font-size: 3.2rem;
            color: var(--wine-red);
            margin-bottom: 1rem;
        }

        .section-header p {
            font-size: 1.1rem;
            color: #555;
            max-width: 500px;
            margin: 0 auto;
        }

        /* Features */
        .features {
            background: var(--white);
        }

        .features-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
            gap: 2.5rem;
            max-width: var(--container-width);
            margin: 0 auto;
            padding: 0 5%;
        }

        .feature-card {
            background: var(--cream);
            padding: 2.8rem 2.2rem;
            border-radius: var(--radius);
            text-align: center;
            transition: var(--transition);
            box-shadow: var(--shadow);
        }

        .feature-card:hover {
            transform: translateY(-12px);
            box-shadow: var(--shadow-lg);
            background: linear-gradient(135deg, #FFF9F0, var(--cream));
        }

        .feature-card .icon {
            font-size: 3.5rem;
            margin-bottom: 1.5rem;
            display: inline-block;
            filter: drop-shadow(0 4px 10px rgba(212, 175, 55, 0.3));
        }

        .feature-card h3 {
            font-family: 'Playfair Display', serif;
            font-size: 1.6rem;
            color: var(--wine-red);
            margin-bottom: 1rem;
        }

        .feature-card p {
            color: #555;
            line-height: 1.8;
        }

        /* Menu */
        .menu {
            background: linear-gradient(180deg, var(--dark) 0%, #2A1A1A 100%);
            color: var(--cream);
        }

        .menu h2 {
            color: var(--gold);
        }

        .menu-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
            gap: 2rem;
            max-width: var(--container-width);
            margin: 0 auto;
            padding: 0 5%;
        }

        .menu-item {
            background: rgba(255,255,255,0.05);
            padding: 2rem;
            border-radius: var(--radius);
            border: 1px solid rgba(212, 175, 55, 0.2);
            transition: var(--transition);
        }

        .menu-item:hover {
            border-color: var(--gold);
            background: rgba(212, 175, 55, 0.1);
            transform: translateY(-6px);
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        }

        .menu-item h3 {
            font-family: 'Playfair Display', serif;
            font-size: 1.5rem;
            color: var(--gold);
            margin-bottom: 0.8rem;
        }

        .menu-item p {
            color: rgba(255,255,255,0.8);
            margin-bottom: 1.2rem;
            line-height: 1.7;
        }

        .menu-item .price {
            color: var(--gold);
            font-size: 1.4rem;
            font-weight: 700;
        }

        /* Testimonials */
        .testimonials {
            background: var(--white);
        }

        .testimonials-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
            gap: 2.5rem;
            max-width: var(--container-width);
            margin: 0 auto;
            padding: 0 5%;
        }

        .testimonial-card {
            background: var(--cream);
            padding: 2.5rem;
            border-radius: var(--radius);
            box-shadow: var(--shadow);
            position: relative;
            transition: var(--transition);
        }

        .testimonial-card:hover {
            transform: translateY(-8px);
            box-shadow: var(--shadow-lg);
        }

        .testimonial-card::before {
            content: '"';
            font-size: 7rem;
            font-family: 'Playfair Display', serif;
            color: var(--gold);
            opacity: 0.25;
            position: absolute;
            top: 15px;
            left: 20px;
        }

        .testimonial-card p {
            font-size: 1.1rem;
            font-style: italic;
            margin-bottom: 1.5rem;
            position: relative;
            z-index: 1;
            line-height: 1.8;
        }

        .testimonial-author {
            font-weight: 700;
            font-size: 1.1rem;
            color: var(--wine-red);
        }

        /* Footer */
        footer {
            background: var(--dark);
            color: var(--cream);
            padding: 4rem 0 2rem;
        }

        .footer-content {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 3rem;
            max-width: var(--container-width);
            margin: 0 auto 3rem;
            padding: 0 5%;
        }

        .footer-column h3 {
            font-family: 'Playfair Display', serif;
            font-size: 1.4rem;
            color: var(--gold);
            margin-bottom: 1.5rem;
        }

        .footer-column a,
        .footer-column p {
            color: rgba(255,255,255,0.7);
            text-decoration: none;
            display: block;
            margin-bottom: 0.8rem;
            transition: var(--transition);
        }

        .footer-column a:hover {
            color: var(--gold);
        }

        .footer-bottom {
            text-align: center;
            border-top: 1px solid rgba(255,255,255,0.1);
            padding-top: 2rem;
        }

        .socials {
            display: flex;
            gap: 1.5rem;
            justify-content: center;
            margin-top: 1.5rem;
        }

        .socials a {
            font-size: 1.8rem;
            color: var(--cream);
            transition: var(--transition);
        }

        .socials a:hover {
            color: var(--gold);
            transform: translateY(-3px);
        }

        /* Responsive */
        @media (max-width: 768px) {
            nav ul {
                display: none;
            }

            section {
                padding: 5rem 0;
            }

            .hero {
                padding: 5rem 5% 3rem;
            }

            .hero-buttons {
                flex-direction: column;
                align-items: stretch;
            }
        }
    </style>
</head>
<body>
    <nav id="navbar">
        <div class="nav-content">
            <div class="logo">La Dolce Vita</div>
            <ul>
                <li><a href="#features">About</a></li>
                <li><a href="#menu">Menu</a></li>
                <li><a href="#testimonials">Testimonials</a></li>
                <li><a href="#footer">Contact</a></li>
            </ul>
            <button class="btn">Book Table</button>
        </div>
    </nav>

    <section class="hero">
        <div class="hero-content">
            <h1>La Dolce Vita</h1>
            <p>Experience authentic Italian cuisine in the heart of the city. Fresh ingredients, master chefs, unforgettable moments.</p>
            <div class="hero-buttons">
                <button class="btn">Explore Menu</button>
                <button class="btn btn-outline">Reserve Today</button>
            </div>
        </div>
    </section>

    <section id="features" class="features">
        <div class="section-header">
            <h2>Why Choose Us</h2>
            <p>We combine passion, tradition, and innovation to create unforgettable dining experiences.</p>
        </div>
        <div class="features-grid">
            <div class="feature-card">
                <div class="icon">✨</div>
                <h3>Fresh Ingredients</h3>
                <p>We source only the freshest local produce and highest quality ingredients to craft authentic Italian flavors that delight every palate.</p>
            </div>
            <div class="feature-card">
                <div class="icon">👨‍🍳</div>
                <h3>Master Chefs</h3>
                <p>Our award-winning chefs bring decades of culinary expertise from Italy's finest kitchens to your table.</p>
            </div>
            <div class="feature-card">
                <div class="icon">💫</div>
                <h3>Elegant Ambiance</h3>
                <p>Step into our beautifully designed restaurant, perfect for romantic dinners, family gatherings, and celebrations.</p>
            </div>
        </div>
    </section>

    <section id="menu" class="menu">
        <div class="section-header">
            <h2>Our Signature Menu</h2>
            <p>Discover our handcrafted dishes made with love and passion.</p>
        </div>
        <div class="menu-grid">
            <div class="menu-item">
                <h3>Truffle Pasta</h3>
                <p>Handmade fettuccine with black truffle, parmesan, and butter</p>
                <div class="price">$32</div>
            </div>
            <div class="menu-item">
                <h3>Osso Buco</h3>
                <p>Braised veal shanks with vegetables, white wine, and gremolata</p>
                <div class="price">$38</div>
            </div>
            <div class="menu-item">
                <h3>Margherita Pizza</h3>
                <p>Fresh mozzarella, San Marzano tomatoes, and basil</p>
                <div class="price">$18</div>
            </div>
            <div class="menu-item">
                <h3>Tiramisu Classico</h3>
                <p>Classic Italian dessert with espresso-soaked ladyfingers</p>
                <div class="price">$12</div>
            </div>
            <div class="menu-item">
                <h3>Bruschetta al Pomodoro</h3>
                <p>Toasted bread with fresh tomatoes, garlic, and basil</p>
                <div class="price">$14</div>
            </div>
            <div class="menu-item">
                <h3>Frutti di Mare</h3>
                <p>Seafood pasta with clams, mussels, shrimp, and calamari</p>
                <div class="price">$36</div>
            </div>
        </div>
    </section>

    <section id="testimonials" class="testimonials">
        <div class="section-header">
            <h2>What Our Guests Say</h2>
            <p>Real stories from our wonderful patrons.</p>
        </div>
        <div class="testimonials-grid">
            <div class="testimonial-card">
                <p>The most authentic Italian food I've had outside of Italy. The truffle pasta was divine!</p>
                <div class="testimonial-author">Sophia Martinez</div>
            </div>
            <div class="testimonial-card">
                <p>Romantic atmosphere, incredible service, and food that will make your taste buds dance. Perfect anniversary dinner!</p>
                <div class="testimonial-author">James Wilson</div>
            </div>
            <div class="testimonial-card">
                <p>The tiramisu is life-changing! We'll be back every week. Highly recommend to everyone!</p>
                <div class="testimonial-author">Emily Chen</div>
            </div>
        </div>
    </section>

    <footer id="footer">
        <div class="footer-content">
            <div class="footer-column">
                <h3>La Dolce Vita</h3>
                <p>123 Gourmet Avenue, Foodie City, FC 12345</p>
                <p>Phone: (555) 123-4567</p>
                <p>Email: hello@ladolcevita.com</p>
            </div>
            <div class="footer-column">
                <h3>Hours</h3>
                <p>Monday - Friday: 11am - 10pm</p>
                <p>Saturday: 10am - 11pm</p>
                <p>Sunday: 10am - 9pm</p>
            </div>
            <div class="footer-column">
                <h3>Quick Links</h3>
                <a href="#features">About Us</a>
                <a href="#menu">Menu</a>
                <a href="#testimonials">Testimonials</a>
                <a href="#footer">Contact</a>
            </div>
        </div>
        <div class="footer-bottom">
            <p>&copy; 2025 La Dolce Vita. All rights reserved. Made with ❤️</p>
            <div class="socials">
                <a href="#">📷</a>
                <a href="#">📘</a>
                <a href="#">🐦</a>
                <a href="#">💼</a>
            </div>
        </div>
    </footer>

    <script>
        const navbar = document.getElementById('navbar');
        window.addEventListener('scroll', () => {
            navbar.classList.toggle('scrolled', window.scrollY > 50);
        });
    </script>
</body>
</html>
</ONI_CODE>`;

  const mockHotel = `Here's your luxurious hotel website!
<ONI_CODE>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>The Grand Azure Resort</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700;800;900&family=Montserrat:wght@300;400;500;600;700&display=swap');

        :root {
            --navy: #0A192F;
            --gold: #D4AF37;
            --cream: #F5F5F0;
            --dark: #0F1419;
            --white: #FFFFFF;
            --shadow: 0 10px 40px rgba(0,0,0,0.1);
            --shadow-lg: 0 20px 60px rgba(0,0,0,0.15);
            --radius: 20px;
            --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            --container-width: 1280px;
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        html {
            scroll-behavior: smooth;
        }

        body {
            font-family: 'Montserrat', sans-serif;
            color: var(--dark);
            line-height: 1.8;
            overflow-x: hidden;
        }

        .container {
            max-width: var(--container-width);
            margin: 0 auto;
            padding: 0 5%;
        }

        /* Navbar */
        nav {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            background: rgba(10, 25, 47, 0.95);
            backdrop-filter: blur(15px);
            padding: 1.25rem 0;
            z-index: 1000;
            transition: var(--transition);
            box-shadow: var(--shadow);
        }

        nav.scrolled {
            padding: 0.75rem 0;
            box-shadow: var(--shadow-lg);
        }

        .nav-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
            max-width: var(--container-width);
            margin: 0 auto;
            padding: 0 5%;
        }

        nav .logo {
            font-family: 'Playfair Display', serif;
            font-size: 1.8rem;
            font-weight: 800;
            color: var(--gold);
            letter-spacing: 1px;
        }

        nav ul {
            display: flex;
            gap: 2.5rem;
            list-style: none;
            align-items: center;
        }

        nav a {
            color: var(--cream);
            text-decoration: none;
            font-weight: 500;
            font-size: 1rem;
            position: relative;
            transition: var(--transition);
        }

        nav a::after {
            content: '';
            position: absolute;
            bottom: -6px;
            left: 0;
            width: 0;
            height: 2px;
            background: var(--gold);
            transition: var(--transition);
        }

        nav a:hover::after {
            width: 100%;
        }

        nav a:hover {
            color: var(--gold);
        }

        .btn {
            background: linear-gradient(135deg, var(--gold), #C9A334);
            color: var(--navy);
            padding: 0.85rem 2.25rem;
            border: none;
            border-radius: 50px;
            font-weight: 600;
            font-size: 1rem;
            cursor: pointer;
            transition: var(--transition);
            box-shadow: 0 6px 20px rgba(212, 175, 55, 0.4);
            font-family: 'Montserrat', sans-serif;
        }

        .btn:hover {
            transform: translateY(-3px);
            box-shadow: 0 10px 30px rgba(212, 175, 55, 0.5);
        }

        .btn-outline {
            background: transparent;
            border: 2px solid var(--gold);
            color: var(--gold);
            padding: 0.8rem 2.15rem;
        }

        .btn-outline:hover {
            background: var(--gold);
            color: var(--navy);
        }

        /* Hero */
        .hero {
            min-height: 100vh;
            background: linear-gradient(135deg, var(--navy) 0%, #1E3A5F 50%, #0A192F 100%);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: 6rem 5% 4rem;
            position: relative;
            overflow: hidden;
            text-align: center;
        }

        .hero::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: radial-gradient(circle at 30% 30%, rgba(212, 175, 55, 0.12) 0%, transparent 60%);
            animation: float 6s ease-in-out infinite;
        }

        @keyframes float {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            50% { transform: translateY(-30px) rotate(1deg); }
        }

        .hero-content {
            position: relative;
            z-index: 2;
            max-width: 800px;
        }

        .hero h1 {
            font-family: 'Playfair Display', serif;
            font-size: clamp(3.5rem, 10vw, 6.5rem);
            font-weight: 900;
            color: var(--gold);
            line-height: 1.1;
            margin-bottom: 1.5rem;
            text-shadow: 2px 4px 20px rgba(0,0,0,0.5);
            animation: fadeInUp 1s ease-out;
        }

        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(40px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .hero p {
            font-size: clamp(1.2rem, 2.5vw, 1.6rem);
            color: var(--cream);
            margin-bottom: 3rem;
            opacity: 0.95;
            animation: fadeInUp 1s ease-out 0.2s both;
        }

        .hero-buttons {
            display: flex;
            gap: 1.5rem;
            justify-content: center;
            flex-wrap: wrap;
            animation: fadeInUp 1s ease-out 0.4s both;
        }

        /* Section */
        section {
            padding: 7rem 0;
        }

        .section-header {
            text-align: center;
            margin-bottom: 4.5rem;
            padding: 0 5%;
        }

        .section-header h2 {
            font-family: 'Playfair Display', serif;
            font-size: 3.2rem;
            color: var(--navy);
            margin-bottom: 1rem;
        }

        .section-header p {
            font-size: 1.1rem;
            color: #555;
            max-width: 500px;
            margin: 0 auto;
        }

        /* Rooms */
        .rooms {
            background: var(--cream);
        }

        .rooms-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
            gap: 2.5rem;
            max-width: var(--container-width);
            margin: 0 auto;
            padding: 0 5%;
        }

        .room-card {
            background: var(--white);
            border-radius: var(--radius);
            overflow: hidden;
            box-shadow: var(--shadow);
            transition: var(--transition);
        }

        .room-card:hover {
            transform: translateY(-12px);
            box-shadow: var(--shadow-lg);
        }

        .room-header {
            background: linear-gradient(135deg, var(--navy), #1E3A5F);
            height: 220px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 5rem;
        }

        .room-content {
            padding: 2.2rem;
        }

        .room-content h3 {
            font-family: 'Playfair Display', serif;
            font-size: 1.6rem;
            color: var(--navy);
            margin-bottom: 1rem;
        }

        .room-content p {
            color: #555;
            margin-bottom: 1.5rem;
            line-height: 1.8;
        }

        .room-content .price {
            color: var(--gold);
            font-size: 2rem;
            font-weight: 800;
        }

        /* Services */
        .services {
            background: linear-gradient(180deg, var(--navy) 0%, #1A2A3F 100%);
            color: var(--cream);
        }

        .services h2 {
            color: var(--gold);
        }

        .services-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
            max-width: var(--container-width);
            margin: 0 auto;
            padding: 0 5%;
        }

        .service-card {
            background: rgba(255,255,255,0.05);
            padding: 2.5rem;
            border-radius: var(--radius);
            text-align: center;
            border: 1px solid rgba(212, 175, 55, 0.2);
            transition: var(--transition);
        }

        .service-card:hover {
            border-color: var(--gold);
            background: rgba(212, 175, 55, 0.1);
            transform: translateY(-8px);
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        }

        .service-card .icon {
            font-size: 3.5rem;
            margin-bottom: 1.5rem;
            display: inline-block;
        }

        .service-card h3 {
            font-family: 'Playfair Display', serif;
            font-size: 1.5rem;
            color: var(--gold);
            margin-bottom: 1rem;
        }

        .service-card p {
            color: rgba(255,255,255,0.8);
            line-height: 1.7;
        }

        /* Testimonials */
        .testimonials {
            background: var(--white);
        }

        .testimonials-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
            gap: 2.5rem;
            max-width: var(--container-width);
            margin: 0 auto;
            padding: 0 5%;
        }

        .testimonial-card {
            background: var(--cream);
            padding: 2.5rem;
            border-radius: var(--radius);
            box-shadow: var(--shadow);
            position: relative;
            transition: var(--transition);
        }

        .testimonial-card:hover {
            transform: translateY(-8px);
            box-shadow: var(--shadow-lg);
        }

        .testimonial-card::before {
            content: '"';
            font-size: 7rem;
            font-family: 'Playfair Display', serif;
            color: var(--gold);
            opacity: 0.25;
            position: absolute;
            top: 15px;
            left: 20px;
        }

        .testimonial-card p {
            font-size: 1.1rem;
            font-style: italic;
            margin-bottom: 1.5rem;
            position: relative;
            z-index: 1;
            line-height: 1.8;
        }

        .testimonial-author {
            font-weight: 700;
            font-size: 1.1rem;
            color: var(--navy);
        }

        /* Footer */
        footer {
            background: var(--navy);
            color: var(--cream);
            padding: 4rem 0 2rem;
        }

        .footer-content {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 3rem;
            max-width: var(--container-width);
            margin: 0 auto 3rem;
            padding: 0 5%;
        }

        .footer-column h3 {
            font-family: 'Playfair Display', serif;
            font-size: 1.4rem;
            color: var(--gold);
            margin-bottom: 1.5rem;
        }

        .footer-column a,
        .footer-column p {
            color: rgba(255,255,255,0.7);
            text-decoration: none;
            display: block;
            margin-bottom: 0.8rem;
            transition: var(--transition);
        }

        .footer-column a:hover {
            color: var(--gold);
        }

        .footer-bottom {
            text-align: center;
            border-top: 1px solid rgba(255,255,255,0.1);
            padding-top: 2rem;
        }

        .socials {
            display: flex;
            gap: 1.5rem;
            justify-content: center;
            margin-top: 1.5rem;
        }

        .socials a {
            font-size: 1.8rem;
            color: var(--cream);
            transition: var(--transition);
        }

        .socials a:hover {
            color: var(--gold);
            transform: translateY(-3px);
        }

        /* Responsive */
        @media (max-width: 768px) {
            nav ul {
                display: none;
            }

            section {
                padding: 5rem 0;
            }

            .hero {
                padding: 5rem 5% 3rem;
            }

            .hero-buttons {
                flex-direction: column;
                align-items: stretch;
            }
        }
    </style>
</head>
<body>
    <nav id="navbar">
        <div class="nav-content">
            <div class="logo">Grand Azure</div>
            <ul>
                <li><a href="#rooms">Rooms</a></li>
                <li><a href="#services">Services</a></li>
                <li><a href="#testimonials">Testimonials</a></li>
                <li><a href="#footer">Contact</a></li>
            </ul>
            <button class="btn">Book Now</button>
        </div>
    </nav>

    <section class="hero">
        <div class="hero-content">
            <h1>The Grand Azure Resort</h1>
            <p>Experience unparalleled luxury and comfort on the stunning coastline. Your perfect escape awaits.</p>
            <div class="hero-buttons">
                <button class="btn">Explore Rooms</button>
                <button class="btn btn-outline">Reserve Today</button>
            </div>
        </div>
    </section>

    <section id="rooms" class="rooms">
        <div class="section-header">
            <h2>Our Luxury Rooms</h2>
            <p>Each room designed for your ultimate comfort and relaxation.</p>
        </div>
        <div class="rooms-grid">
            <div class="room-card">
                <div class="room-header">🌊</div>
                <div class="room-content">
                    <h3>Ocean View Suite</h3>
                    <p>Spacious suite with breathtaking ocean views, king-size bed, private balcony, and marble bathroom.</p>
                    <div class="price">$450/night</div>
                </div>
            </div>
            <div class="room-card">
                <div class="room-header">🏰</div>
                <div class="room-content">
                    <h3>Presidential Suite</h3>
                    <p>The ultimate luxury experience with private butler service, private pool, and panoramic views.</p>
                    <div class="price">$1,200/night</div>
                </div>
            </div>
            <div class="room-card">
                <div class="room-header">🌴</div>
                <div class="room-content">
                    <h3>Garden Deluxe</h3>
                    <p>Peaceful garden views, luxurious amenities, and perfect for relaxation.</p>
                    <div class="price">$320/night</div>
                </div>
            </div>
        </div>
    </section>

    <section id="services" class="services">
        <div class="section-header">
            <h2>Premium Services</h2>
            <p>World-class amenities to make your stay unforgettable.</p>
        </div>
        <div class="services-grid">
            <div class="service-card">
                <div class="icon">💆‍♀️</div>
                <h3>Spa & Wellness</h3>
                <p>Rejuvenate your mind and body with our world-class spa treatments and therapies.</p>
            </div>
            <div class="service-card">
                <div class="icon">🍽️</div>
                <h3>Gourmet Dining</h3>
                <p>Michelin-starred restaurant serving exquisite international cuisine.</p>
            </div>
            <div class="service-card">
                <div class="icon">🏊</div>
                <h3>Infinity Pool</h3>
                <p>Stunning infinity pool overlooking the ocean with poolside service.</p>
            </div>
            <div class="service-card">
                <div class="icon">🏋️</div>
                <h3>Fitness Center</h3>
                <p>State-of-the-art fitness facility open 24/7 with personal training available.</p>
            </div>
        </div>
    </section>

    <section id="testimonials" class="testimonials">
        <div class="section-header">
            <h2>Guest Experiences</h2>
            <p>Stories from our valued guests about their stays with us.</p>
        </div>
        <div class="testimonials-grid">
            <div class="testimonial-card">
                <p>Absolutely magical! The ocean view suite took my breath away. Perfect honeymoon destination!</p>
                <div class="testimonial-author">Victoria & David Anderson</div>
            </div>
            <div class="testimonial-card">
                <p>The service was impeccable, the food divine, and the rooms simply perfect. Can't wait to return!</p>
                <div class="testimonial-author">Michael Rodriguez</div>
            </div>
            <div class="testimonial-card">
                <p>A true 5-star experience. The spa treatments were the highlight of our trip!</p>
                <div class="testimonial-author">Sarah Johnson</div>
            </div>
        </div>
    </section>

    <footer id="footer">
        <div class="footer-content">
            <div class="footer-column">
                <h3>Grand Azure Resort</h3>
                <p>456 Oceanfront Drive, Luxury Coast, LC 67890</p>
                <p>Phone: (555) 987-6543</p>
                <p>Email: hello@grandazureresort.com</p>
            </div>
            <div class="footer-column">
                <h3>Check In</h3>
                <p>Check In: 3:00 PM</p>
                <p>Check Out: 11:00 AM</p>
            </div>
            <div class="footer-column">
                <h3>Quick Links</h3>
                <a href="#rooms">Rooms</a>
                <a href="#services">Services</a>
                <a href="#testimonials">Testimonials</a>
                <a href="#footer">Contact</a>
            </div>
        </div>
        <div class="footer-bottom">
            <p>&copy; 2025 Grand Azure Resort. All rights reserved. Made with ✨</p>
            <div class="socials">
                <a href="#">📷</a>
                <a href="#">📘</a>
                <a href="#">🐦</a>
                <a href="#">💼</a>
            </div>
        </div>
    </footer>

    <script>
        const navbar = document.getElementById('navbar');
        window.addEventListener('scroll', () => {
            navbar.classList.toggle('scrolled', window.scrollY > 50);
        });
    </script>
</body>
</html>
</ONI_CODE>`;

  const mockPortfolio = `Here's your creative portfolio website!
<ONI_CODE>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Creative Studio - Portfolio</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700;800;900&family=Poppins:wght@300;400;500;600;700&display=swap');

        :root {
            --purple: #6C5CE7;
            --teal: #00CEC9;
            --dark: #2D3436;
            --cream: #FDF8F0;
            --white: #FFFFFF;
            --shadow: 0 10px 40px rgba(0,0,0,0.1);
            --shadow-lg: 0 20px 60px rgba(108, 92, 231, 0.2);
            --radius: 20px;
            --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            --container-width: 1280px;
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        html {
            scroll-behavior: smooth;
        }

        body {
            font-family: 'Poppins', sans-serif;
            background: var(--cream);
            color: var(--dark);
            line-height: 1.8;
            overflow-x: hidden;
        }

        .container {
            max-width: var(--container-width);
            margin: 0 auto;
            padding: 0 5%;
        }

        /* Navbar */
        nav {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            background: rgba(45, 52, 54, 0.95);
            backdrop-filter: blur(15px);
            padding: 1.25rem 0;
            z-index: 1000;
            transition: var(--transition);
            box-shadow: var(--shadow);
        }

        nav.scrolled {
            padding: 0.75rem 0;
            box-shadow: var(--shadow-lg);
        }

        .nav-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
            max-width: var(--container-width);
            margin: 0 auto;
            padding: 0 5%;
        }

        nav .logo {
            font-family: 'Playfair Display', serif;
            font-size: 1.8rem;
            font-weight: 800;
            background: linear-gradient(135deg, var(--purple), var(--teal));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            letter-spacing: 1px;
        }

        nav ul {
            display: flex;
            gap: 2.5rem;
            list-style: none;
            align-items: center;
        }

        nav a {
            color: var(--cream);
            text-decoration: none;
            font-weight: 500;
            font-size: 1rem;
            position: relative;
            transition: var(--transition);
        }

        nav a::after {
            content: '';
            position: absolute;
            bottom: -6px;
            left: 0;
            width: 0;
            height: 2px;
            background: linear-gradient(135deg, var(--purple), var(--teal));
            transition: var(--transition);
        }

        nav a:hover::after {
            width: 100%;
        }

        nav a:hover {
            color: var(--teal);
        }

        .btn {
            background: linear-gradient(135deg, var(--purple), var(--teal));
            color: var(--white);
            padding: 0.85rem 2.25rem;
            border: none;
            border-radius: 50px;
            font-weight: 600;
            font-size: 1rem;
            cursor: pointer;
            transition: var(--transition);
            box-shadow: 0 6px 20px rgba(108, 92, 231, 0.4);
            font-family: 'Poppins', sans-serif;
        }

        .btn:hover {
            transform: translateY(-3px);
            box-shadow: 0 10px 30px rgba(108, 92, 231, 0.5);
        }

        /* Hero */
        .hero {
            min-height: 100vh;
            background: linear-gradient(135deg, var(--dark) 0%, #4A148C 50%, var(--purple) 100%);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: 6rem 5% 4rem;
            position: relative;
            overflow: hidden;
            text-align: center;
        }

        .hero::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: radial-gradient(circle at 30% 30%, rgba(0, 206, 201, 0.15) 0%, transparent 60%);
            animation: float 6s ease-in-out infinite;
        }

        @keyframes float {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            50% { transform: translateY(-30px) rotate(1deg); }
        }

        .hero-content {
            position: relative;
            z-index: 2;
            max-width: 800px;
        }

        .hero h1 {
            font-family: 'Playfair Display', serif;
            font-size: clamp(3.5rem, 10vw, 6.5rem);
            font-weight: 900;
            background: linear-gradient(135deg, var(--teal), #81ECEC);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            line-height: 1.1;
            margin-bottom: 1.5rem;
            animation: fadeInUp 1s ease-out;
        }

        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(40px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .hero p {
            font-size: clamp(1.2rem, 2.5vw, 1.6rem);
            color: var(--cream);
            margin-bottom: 3rem;
            opacity: 0.95;
            animation: fadeInUp 1s ease-out 0.2s both;
        }

        /* Section */
        section {
            padding: 7rem 0;
        }

        .section-header {
            text-align: center;
            margin-bottom: 4.5rem;
            padding: 0 5%;
        }

        .section-header h2 {
            font-family: 'Playfair Display', serif;
            font-size: 3.2rem;
            background: linear-gradient(135deg, var(--purple), var(--teal));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            margin-bottom: 1rem;
        }

        .section-header p {
            font-size: 1.1rem;
            color: #555;
            max-width: 500px;
            margin: 0 auto;
        }

        /* Portfolio */
        .portfolio-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
            gap: 2.5rem;
            max-width: var(--container-width);
            margin: 0 auto;
            padding: 0 5%;
        }

        .portfolio-item {
            background: var(--white);
            border-radius: var(--radius);
            overflow: hidden;
            box-shadow: var(--shadow);
            transition: var(--transition);
        }

        .portfolio-item:hover {
            transform: translateY(-12px);
            box-shadow: var(--shadow-lg);
        }

        .portfolio-header {
            background: linear-gradient(135deg, var(--purple), var(--teal));
            height: 200px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 4rem;
        }

        .portfolio-content {
            padding: 2rem;
        }

        .portfolio-content h3 {
            font-family: 'Playfair Display', serif;
            font-size: 1.5rem;
            margin-bottom: 0.8rem;
        }

        /* Footer */
        footer {
            background: var(--dark);
            color: var(--cream);
            padding: 4rem 0 2rem;
        }

        .footer-bottom {
            text-align: center;
            border-top: 1px solid rgba(255,255,255,0.1);
            padding-top: 2rem;
        }

        .socials {
            display: flex;
            gap: 1.5rem;
            justify-content: center;
            margin-top: 1.5rem;
        }

        .socials a {
            font-size: 1.8rem;
            color: var(--cream);
            transition: var(--transition);
        }

        .socials a:hover {
            color: var(--teal);
            transform: translateY(-3px);
        }

        @media (max-width: 768px) {
            nav ul {
                display: none;
            }

            section {
                padding: 5rem 0;
            }

            .hero {
                padding: 5rem 5% 3rem;
            }
        }
    </style>
</head>
<body>
    <nav id="navbar">
        <div class="nav-content">
            <div class="logo">Creative Studio</div>
            <ul>
                <li><a href="#portfolio">Portfolio</a></li>
                <li><a href="#footer">Contact</a></li>
            </ul>
            <button class="btn">Get Started</button>
        </div>
    </nav>

    <section class="hero">
        <div class="hero-content">
            <h1>We Create Magic</h1>
            <p>Innovative design solutions for modern businesses. Let's build something amazing together.</p>
        </div>
    </section>

    <section id="portfolio" class="portfolio">
        <div class="section-header">
            <h2>Our Portfolio</h2>
            <p>A selection of our finest work.</p>
        </div>
        <div class="portfolio-grid">
            <div class="portfolio-item">
                <div class="portfolio-header">🎨</div>
                <div class="portfolio-content">
                    <h3>Brand Identity Design</h3>
                    <p>Complete brand identity design for a tech startup.</p>
                </div>
            </div>
            <div class="portfolio-item">
                <div class="portfolio-header">💻</div>
                <div class="portfolio-content">
                    <h3>Web Development</h3>
                    <p>Modern, responsive web applications built with the latest tech.</p>
                </div>
            </div>
            <div class="portfolio-item">
                <div class="portfolio-header">✨</div>
                <div class="portfolio-content">
                    <h3>UI/UX Design</h3>
                    <p>User-centered design solutions for better experiences.</p>
                </div>
            </div>
        </div>
    </section>

    <footer id="footer">
        <div class="footer-bottom">
            <p>&copy; 2025 Creative Studio. All rights reserved. Made with 💜</p>
            <div class="socials">
                <a href="#">📷</a>
                <a href="#">📘</a>
                <a href="#">🐦</a>
                <a href="#">💼</a>
            </div>
        </div>
    </footer>

    <script>
        const navbar = document.getElementById('navbar');
        window.addEventListener('scroll', () => {
            navbar.classList.toggle('scrolled', window.scrollY > 50);
        });
    </script>
</body>
</html>
</ONI_CODE>`;

  const isHotel = clean.toLowerCase().includes('hotel') || clean.toLowerCase().includes('resort');
  const isRestaurant = clean.toLowerCase().includes('restaurant') || clean.toLowerCase().includes('food') || clean.toLowerCase().includes('cafe') || clean.toLowerCase().includes('dining');
  const isPortfolio = clean.toLowerCase().includes('portfolio') || clean.toLowerCase().includes('designer') || clean.toLowerCase().includes('studio');

  let finalMock = isHotel ? mockHotel : isRestaurant ? mockRestaurant : isPortfolio ? mockPortfolio : mockRestaurant;

  const encoder = new TextEncoder();
  const lines = finalMock.split('');
  let i = 0;

  const stream = new ReadableStream({
    start(controller) {
      const interval = setInterval(() => {
        if (i < lines.length) {
          const chunk = `data: {"id":"chatcmpl-mock","object":"chat.completion.chunk","created":${Date.now()},"model":"mock-model","choices":[{"index":0,"delta":{"content":"${lines[i].replace(/"/g, '\\"').replace(/\n/g, '\\n')}"}]}\n\n`;
          controller.enqueue(encoder.encode(chunk));
          i++;
        } else {
          clearInterval(interval);
          controller.enqueue(encoder.encode('data: {"id":"chatcmpl-mock","object":"chat.completion.chunk","created":' + Date.now() + ',"model":"mock-model","choices":[{"index":0,"delta":{},"finish_reason":"stop"}]}\n\n'));
          controller.close();
        }
      }, 15);
    }
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}

export async function POST(req: Request) {
  console.log('GROQ_API_KEY exists:', !!process.env.GROQ_API_KEY);
  console.log('GROQ_API_KEY first 8 chars:', process.env.GROQ_API_KEY?.slice(0, 8));

  const body = await req.json().catch(() => null);
  if (!body) {
    return new NextResponse("Bad request", { status: 400 });
  }

  const currentHtml =
    typeof body.currentHtml === "string" && body.currentHtml.trim().length > 0
      ? body.currentHtml.slice(0, 2000)
      : "";

  let groqMessages: { role: string; content: string }[] = [];
  let clean: string | undefined;

  if (Array.isArray(body.messages) && body.messages.length > 0) {
    groqMessages = body.messages.map((m: { role: string; content: string }) => ({
      role: m.role,
      content: m.content,
    }));
  } else if (body.prompt) {
    clean = sanitizeText(
      DOMPurify.sanitize(body.prompt, { ALLOWED_TAGS: [] })
    );
    if (!clean || clean.length > 1000) {
      return new NextResponse("Bad request", { status: 400 });
    }

    const banned = ["ignore previous", "system:", "you are now", "jailbreak"];
    if (banned.some((b) => clean!.toLowerCase().includes(b))) {
      return new NextResponse("Invalid prompt", { status: 400 });
    }

    const userContent = currentHtml
      ? `User request: ${clean}\n\nThe user is asking for a change to the existing website below. Return the short conversational message and the FULL updated HTML file again inside <ONI_CODE> tags.\n\n<CURRENT_HTML>\n${currentHtml}\n</CURRENT_HTML>`
      : clean;

    groqMessages = [{ role: "user", content: userContent }];
  } else {
    return new NextResponse("Bad request", { status: 400 });
  }

  const groqApiKey = process.env.GROQ_API_KEY?.trim();
  if (!groqApiKey) {
    return new NextResponse("GROQ_API_KEY is missing", { status: 500 });
  }

  try {
    const messagesToSend = [{ role: "system", content: ONI_SYSTEM_PROMPT }, ...groqMessages];
    const requestBody = JSON.stringify({
      model: "llama-3.1-8b-instant",
      messages: messagesToSend,
      temperature: 0.9,
      max_tokens: 4000,
      stream: true,
    });
    console.log('Request body length:', requestBody.length);
    
    const groqResponse = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${groqApiKey}`,
          "Content-Type": "application/json",
        },
        body: requestBody,
      }
    );

    if (groqResponse.ok) {
      console.log('Groq request successful, streaming response!');
      return new Response(groqResponse.body, {
        headers: {
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache",
          Connection: "keep-alive",
        },
      });
    }

    const errorBody = await groqResponse.text();
    console.error('Groq error (falling back to mock):', {
      status: groqResponse.status,
      statusText: groqResponse.statusText,
      body: errorBody
    });
  } catch (err) {
    console.error('Groq error (falling back to mock):', err);
  }

  return createMockStream(clean || body.prompt || "website", groqMessages);
}
