<div align="center">
  <img src="https://vitejs.dev/logo.svg" alt="Logo" width="80" height="80">

  <h3 align="center">KSE Student Portal</h3>

  <p align="center">
    A unified, modern "single pane of glass" platform for Kyiv School of Economics students.
    <br />
    <br />
    <a href="#">View Demo</a>
    ·
    <a href="https://github.com/nazariidatsenko25-png/KSE_electives_helper/issues">Report Bug</a>
  </p>
</div>

## 🌟 About The Project

The **Kyiv School of Economics (KSE) Student Portal** consolidates scattered academic systems (Moodle, grading systems, course catalogs) into one responsive, beautifully designed dashboard with seamless Google SSO authentication.

### 🚀 Key Features

* **SmartCourse AI Advisor** — LLM academic counselor powered by Google Gemini 2.5 Flash with real-time DB tool access.
* **Diploma Progress Dashboard** — Visual ECTS credit tracking, GPA, graduation requirements, and active courses.
* **Interactive Course Catalog** — Searchable/filterable course directory with wishlist and expandable detail cards.
* **Course Evaluations & Reviews** — Anonymized multi-criteria reviews with LLM-powered content moderation.
* **Community Hub** — Student clubs directory with real-time chat simulations, schedules, and announcements.
* **Internationalization (i18n)** — Full support for Ukrainian, English, and German.
* **Premium Aesthetics** — Glassmorphism dark theme, fluid animations, fully responsive mobile-first design.

### 💻 Built With

* **Frontend**: React 18, Vite, Vanilla CSS
* **Backend**: Django 4, Django REST Framework
* **Database**: PostgreSQL / SQLite
* **Authentication**: Google OAuth2 (`django-allauth`)
* **AI Integration**: Google Gemini 2.5 Flash API

<!-- GETTING STARTED -->
## 🛠 Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

* Python 3.10+
* Node.js v18+
* Google Gemini API Key

### Installation

1. **Clone the repo**
   ```sh
   git clone https://github.com/nazariidatsenko25-png/KSE_electives_helper.git
   cd KSE_electives_helper
   ```

2. **Setup Backend**
   ```sh
   cd backend
   python3 -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   python manage.py migrate
   python manage.py runserver
   ```

3. **Setup Frontend**
   ```sh
   # Open a new terminal from the root directory
   npm install
   npm run dev
   ```

4. **Environment Variables**
   Create a `.env` file in the `backend` directory with your API keys:
   ```env
   SECRET_KEY=your_django_secret_key
   GEMINI_API_KEY=your_gemini_api_key
   ```

## 🌐 Deployment (DigitalOcean)

This project is configured to be deployed on DigitalOcean App Platform as a 3-component setup:
1. **PostgreSQL Database**
2. **Web Service (Django Backend)** (Source: `backend/`, Command: `gunicorn kse_portal.wsgi:application`)
3. **Static Site (React Frontend)** (Source: `/`, Command: `npm run build`)

## 🎓 KSE Ecosystem

Designed specifically for the KSE community to replace fragmented legacy systems and deliver a world-class academic experience.
