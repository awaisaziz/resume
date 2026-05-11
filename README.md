<div align="center">

# Hi there, I'm Awais Aziz 👋

[![Portfolio Live](https://img.shields.io/badge/🌐%20Portfolio-Live-6d28d9?style=for-the-badge)](https://awaisaziz.github.io/resume/)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/awais-aziz-4bb7a318a)
[![GitHub](https://img.shields.io/badge/GitHub-Follow-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/awaisaziz)
[![Deploy Status](https://img.shields.io/github/actions/workflow/status/awaisaziz/awaisaziz/deploy.yml?branch=main&label=Deploy&style=for-the-badge&logo=githubactions&logoColor=white)](https://github.com/awaisaziz/awaisaziz/actions/workflows/deploy.yml)

</div>

---

I'm a **Software Engineer** and **AI/ML Enthusiast** passionate about building intelligent systems that bridge the gap between natural language and structured data.

- 🎓 **M.Sc. Computer Science** — York University *(Machine Learning & NLP)*
- 🏛️ **Honours B.Sc. Computer Science** — University of Toronto
- 🔬 Researching **Text-to-SQL / Text-to-SPARQL** engines and knowledge-graph query generation
- 🚀 Building AI-powered products — from retail recommendation engines to full-stack web apps
- 🌱 Always learning — currently exploring **LLM fine-tuning** and **RAG architectures**

---

## 🗂️ About This Repository

> **awaisaziz/awaisaziz** is a [special GitHub repository](https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-github-profile/customizing-your-profile/managing-your-profile-readme) — its `README.md` appears on my public GitHub profile.

It also hosts the source code for my **personal portfolio website**, live at 👉 **[awaisaziz.github.io](https://awaisaziz.github.io)**

Built with a modern **React + Vite** stack and deployed automatically to **GitHub Pages** via **GitHub Actions** on every push to `main`.

### ✨ Features

| Feature | Details |
|---|---|
| **Premium UI** | Dark-mode first, glassmorphism, smooth staggered animations |
| **Dynamic Tagline** | Rotating hero headlines cycling through skills with fade transitions |
| **Data-Driven** | All content lives in `public/` YAML & Markdown — zero code changes needed |
| **Contact Form** | Powered by [Web3Forms](https://web3forms.com/) with localStorage draft saving |
| **AI Project Images** | Auto-generates project thumbnails via Pollinations AI when none are provided |
| **Google Translate** | Built-in one-click language translation widget |
| **Dark / Light Mode** | System-aware theme toggle |
| **Fully Responsive** | Mobile-first layout with hamburger navigation |

---

## 🏗️ Tech Stack

![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=flat-square&logo=vite&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES2024-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![CSS3](https://img.shields.io/badge/CSS3-Vanilla-1572B6?style=flat-square&logo=css3&logoColor=white)
![gh-pages](https://img.shields.io/badge/Deploy-gh--pages-222222?style=flat-square&logo=github&logoColor=white)

---

## 📁 Project Structure

```
awaisaziz/
├── .github/
│   └── workflows/
│       └── deploy.yml          # CI/CD → auto-deploys on push to main
├── public/
│   ├── about.md                # Hero bio (YAML frontmatter + Markdown body)
│   ├── profile.jpg             # Avatar image
│   ├── resume.pdf              # Downloadable résumé
│   └── data/
│       ├── experience.yaml     # Work history
│       ├── education.yaml      # Academic background
│       ├── research.yaml       # Papers & posters
│       ├── certifications.yaml # Licenses & certs
│       └── projects.yaml       # Portfolio projects
├── src/
│   ├── App.jsx                 # All React components & main app
│   ├── index.css               # Design system, animations, themes
│   └── main.jsx                # React entry point
├── index.html                  # HTML shell + Google Translate init
├── vite.config.js              # Vite build config
└── package.json                # Scripts & dependencies
```

---

## 🚀 Running Locally

```bash
# 1. Clone
git clone https://github.com/awaisaziz/awaisaziz.git
cd awaisaziz

# 2. Install dependencies
npm install

# 3. Create a local .env file with your Web3Forms key
echo "VITE_WEB3FORMS_ACCESS_KEY=your_key_here" > .env

# 4. Start the dev server
npm run dev
# → Open http://localhost:5173
```

---

## ☁️ Deploying to GitHub Pages

This repo ships with **two** deployment methods. Pick the one that suits you.

### Method 1 — Automatic (GitHub Actions) ✅ Recommended

Every push to `main` triggers the [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) pipeline, which builds the app and pushes the output to the `gh-pages` branch automatically.

**One-time setup:**

1. Go to your repo → **Settings → Secrets and variables → Actions → New repository secret**
2. Add a secret named **`VITE_WEB3FORMS_ACCESS_KEY`** with your [Web3Forms](https://web3forms.com/) access key
3. Go to **Settings → Pages** and set:
   - **Source**: `Deploy from a branch`
   - **Branch**: `gh-pages` / `/ (root)`
4. Push any change to `main` — the Actions tab will show the deploy running 🎉

> **Why a secret?** Your `VITE_WEB3FORMS_ACCESS_KEY` is embedded in the built JavaScript bundle. Storing it as a GitHub Secret means it never appears in the repository history and is injected only at build time in the CI environment.

---

### Method 2 — Manual (`npm run deploy`)

If you prefer to deploy directly from your machine:

```bash
npm run deploy
```

This runs `predeploy` (→ `npm run build`) then uses `gh-pages` to push `dist/` to the `gh-pages` branch.

> ⚠️ **Before running:** make sure your `.env` file exists with `VITE_WEB3FORMS_ACCESS_KEY` so the contact form works in production.

---

## ✏️ Customising the Content

All portfolio data lives in `public/` — **no React code changes needed**.

| File | What to edit |
|---|---|
| `public/about.md` | Name, title, email, LinkedIn, GitHub links (YAML frontmatter) + bio (Markdown) |
| `public/data/experience.yaml` | Jobs, roles, dates, bullet highlights |
| `public/data/education.yaml` | Degrees, institutions, years |
| `public/data/research.yaml` | Papers, posters, venues, author lists, URLs |
| `public/data/certifications.yaml` | Certs, issuers, badge images, credential links |
| `public/data/projects.yaml` | Projects, tech stacks, repo & live URLs |
| `public/profile.jpg` | Replace with your own photo |
| `public/resume.pdf` | Drop in your latest résumé |

---

## 🤝 Using This as a Template

Feel free to fork and adapt this portfolio for your own use! The data-driven design makes it trivial to swap in your own content.

**Small request:** If this template saves you time, please ⭐ **star the repository** and credit me with a link back. It genuinely helps and is always appreciated!

---

## 📫 Let's Connect

<div align="center">

| | |
|---|---|
| 📧 Email | [awaisaziz2810@gmail.com](mailto:awaisaziz2810@gmail.com) |
| 💼 LinkedIn | [linkedin.com/in/awais-aziz-4bb7a318a](https://linkedin.com/in/awais-aziz-4bb7a318a) |
| 🐙 GitHub | [github.com/awaisaziz](https://github.com/awaisaziz) |
| 🌐 Portfolio | [awaisaziz.github.io](https://awaisaziz.github.io) |

</div>

---

<div align="center">

*Thanks for stopping by — I hope you find something interesting here!* 😊

</div>
