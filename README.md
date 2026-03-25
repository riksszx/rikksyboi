# rikksyboi — Responsive Portfolio Website

This is the portfolio website built for **Rikksy** — a modern, responsive, single-page portfolio showcasing projects, skills, and contact details.

---

## 🚀 How to View the Website

Since this is a **static website** (HTML + CSS + JavaScript only), there is no build step required.

### Option 1 — Open directly in your browser (simplest)

1. Clone or download this repository
2. Navigate to the project folder
3. Open `index.html` in any browser (double-click it, or right-click → *Open with* → your browser)

```
rikksyboi/
├── index.html   ← open this file
├── css/
│   └── style.css
└── js/
    └── main.js
```

### Option 2 — Serve with Python (recommended, avoids browser restrictions)

```bash
# Python 3
python3 -m http.server 8080

# Then open your browser and go to:
# http://localhost:8080
```

### Option 3 — Serve with Node.js (`npx`)

```bash
npx serve .

# Then follow the URL printed in the terminal (usually http://localhost:3000)
```

### Option 4 — VS Code Live Server extension

1. Open the project folder in **VS Code**
2. Install the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension
3. Right-click `index.html` → **Open with Live Server**
4. The site will open automatically at `http://127.0.0.1:5500`

---

## ✨ What Was Built

| Feature | Details |
|---------|---------|
| **Navbar** | Sticky header with scroll shadow, active-link highlighting, dark/light mode toggle, and a responsive hamburger menu for mobile |
| **Hero Section** | Animated typed-text effect cycling through developer roles, code card visual, and CTA buttons |
| **Tech Stack** | Animated skill bars for HTML/CSS, JavaScript, React, Node.js, Python, and Git |
| **About Section** | Animated counters (years, projects, technologies), personal bio, and interest tags |
| **Projects Section** | Three project cards (Task Manager App, Weather Dashboard, Dev Chat App) with tech-stack badges |
| **Contact Section** | Client-side validated contact form with live error feedback and success message |
| **Dark / Light Mode** | Persisted in `localStorage`; respects OS preference on first visit |
| **Scroll Animations** | Intersection Observer–based reveal animations with stagger for grids |
| **Footer** | Auto-updated copyright year |
| **Responsive Design** | Mobile-first layout that works on all screen sizes |

---

## 📁 Project Structure

```
rikksyboi/
├── index.html        # Full single-page HTML
├── css/
│   └── style.css     # All styles (variables, layout, components, animations)
└── js/
    └── main.js       # Theme toggle, navbar, typed text, reveal, skill bars, counters, form
```

---

## 🔗 Repository

[github.com/riksszx/rikksyboi](https://github.com/riksszx/rikksyboi)