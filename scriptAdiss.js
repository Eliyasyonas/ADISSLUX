         const PRODUCTS = [
            { id: 1, name: "vibrant, limited edition Shirt ", price: 450, category: "Apparel", image: "8c46b7c5-e43d-42c0-b7f2-afd5c9e14a78.png" },
            { id: 2, name: "Minimalist Wool Overcoat", price: 1200, category: "Outerwear", image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&q=80&w=800" },
            { id: 3, name: "Crafted in Italy: A masterpiece of tailoring.", price: 890, category: "Accessories", image: "processed-image.png" },
            { id: 4, name: "Bespoke tailoring meets intelligent thermal precision.", price: 650, category: "Apparel", image: "Gemini_Generated_Image_jf661njf661njf66.png" },
            { id: 5, name: "Architectural Heeled Boots", price: 720, category: "Footwear", image: "https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?auto=format&fit=crop&q=80&w=800" },
            { id: 6, name: "Linen Wide-Leg Trousers", price: 380, category: "Apparel", image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&q=80&w=800" },
            { id: 9, name: "Cashmer blaze", price: 10010, image: "Gemini_Generated_Image_xhqplzxhqplzxhqp.png" },
            { id: 10, name: "Structured Blazer", price: 780, image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=800" },
            { id: 11, name: "Suede Chelsea Boots", price: 540, image: "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?auto=format&fit=crop&q=80&w=800" },
            { id: 12, name: "Raw Denim Jacket", price: 420, image: "https://images.unsplash.com/photo-1551537482-f2075a1d41f2?auto=format&fit=crop&q=80&w=800" },
            { id: 13, name: "Handcrafted Belt", price: 180, image: "Gemini_Generated_Image_hdkm14hdkm14hdkm.png" },
            { id: 14, name: "Silk Evening Gown", price: 2400, image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&q=80&w=800" },
            { id: 15, name: "Acetate Frame Glasses", price: 320, image: "Gemini_Generated_Image_hnxubwhnxubwhnxu.png" },
            { id: 16, name: "Silk Jacquard Tie", price: 140, image: "https://images.unsplash.com/photo-1598032895397-b9472444bf93?auto=format&fit=crop&q=80&w=800" },
            { id: 17, name: "Monolith Leather Boot", price: 890, image: "https://images.unsplash.com/photo-1605812860427-4024433a70fd?auto=format&fit=crop&q=80&w=800" },
            { id: 18, name: "Tapered Chino Pant", price: 290, image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&q=80&w=800" },
            { id: 19, name: "Technical Overcoat", price: 1100, image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=800" },
            { id: 20, name: "Velvet Evening Loafer", price: 620, image: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&q=80&w=800" }
        ];

        let cart = [];

        function init() {
            renderProducts();
            window.addEventListener('scroll', handleScroll);
            if (localStorage.getItem('theme') === 'dark') {
                document.documentElement.classList.add('dark');
            }
            handleScroll();
        }

        function handleScroll() {
            const nav = document.getElementById('mainNav');
            const scrolled = window.scrollY > 80;
            
            if (scrolled) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }

            const sections = document.querySelectorAll('section');
            const navLinks = document.querySelectorAll('.nav-link');
            
            let current = "";
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                if (pageYOffset >= sectionTop - 150) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').includes(current)) {
                    link.classList.add('active');
                }
            });
        }

        function toggleTheme() {
            const isDark = document.documentElement.classList.toggle('dark');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        }

        function toggleCart() {
            document.body.classList.toggle('drawer-open');
        }

        function renderProducts() {
            const grid = document.getElementById('productGrid');
            grid.innerHTML = PRODUCTS.map((prod) => `
                <div class="product-card" onclick="addToCart(${prod.id})">
                    <div class="product-image-wrapper">
                        <img src="${prod.image}" class="product-img" alt="${prod.name}">
                        <div class="add-to-cart-overlay">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14m-7-7v14"/></svg>
                        </div>
                    </div>
                    <div style="display:flex; justify-content:space-between; font-size:10px; text-transform:uppercase; letter-spacing:0.05em;">
                        <span>${prod.name}</span>
                        <span style="opacity:0.5;">$${prod.price}</span>
                    </div>
                </div>
            `).join('');
        }

        function addToCart(id) {
            const prod = PRODUCTS.find(p => p.id === id);
            cart.push({ ...prod, cartId: Date.now() });
            updateCartUI();
            if (!document.body.classList.contains('drawer-open')) toggleCart();
        }

        function removeFromCart(cartId) {
            cart = cart.filter(item => item.cartId !== cartId);
            updateCartUI();
        }

        function updateCartUI() {
            const list = document.getElementById('cartItems');
            const count = document.getElementById('cartCount');
            const total = document.getElementById('cartTotal');

            if (cart.length === 0) {
                list.innerHTML = `<p style="text-align:center; opacity:0.3; font-size:9px; margin-top:100px; text-transform:uppercase;">Bag is empty</p>`;
                count.style.display = 'none';
            } else {
                count.style.display = 'flex';
                count.innerText = cart.length;
                list.innerHTML = cart.map(item => `
                    <div style="display:flex; gap:20px; margin-bottom:20px;">
                        <img src="${item.image}" style="width:60px; height:80px; object-fit:cover;">
                        <div style="flex:1">
                            <h4 style="font-size:10px; text-transform:uppercase;">${item.name}</h4>
                            <p style="font-size:10px; opacity:0.6;">$${item.price}</p>
                            <button onclick="removeFromCart(${item.cartId})" style="font-size:8px; text-decoration:underline; opacity:0.4; margin-top:10px;">Remove</button>
                        </div>
                    </div>
                `).join('');
            }
            total.innerText = `$${cart.reduce((acc, item) => acc + item.price, 0)}`;
        }

        window.onload = init;
