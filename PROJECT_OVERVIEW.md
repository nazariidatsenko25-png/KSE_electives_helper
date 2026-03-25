# KSE Student Portal — Project Overview

## 1. Overall Idea

The **Kyiv School of Economics (KSE) Student Portal** is a unified, modern "single pane of glass" platform for students. It consolidates scattered academic systems (Moodle, grading systems, course catalogs) into one responsive dashboard with seamless Google SSO authentication.

**Core Features:**
- **Diploma Progress Dashboard** — visual ECTS credit tracking, GPA, graduation requirements, active courses
- **Course Evaluations** — anonymized multi-criteria reviews (quality, difficulty, workload) with LLM-powered content moderation
- **SmartCourse AI Advisor** — LLM academic counselor powered by Google Gemini 2.5 Flash with real-time DB tool access
- **Interactive Course Catalog** — searchable/filterable course directory with wishlist, expandable detail cards, advanced filter drawer
- **Student Profiles** — enriched profile cards with GPA, attendance, credits, active courses, review history
- **Instructor Profiles** — instructor pages with course overviews and student review summaries
- **Reviews System** — per-course star ratings in a full-screen modal with AI summarization, comment threads, helpful/unhelpful voting
- **Premium Aesthetics** — glassmorphism dark theme, fluid animations, fully responsive mobile-first design

**Tech Stack:**  
`React 18 + Vite` (frontend) · `Django 4 + DRF` (backend) · `SQLite` (dev DB) · `Google OAuth2 / django-allauth` · `Google Gemini 2.5 Flash API`

---

## 2. Architecture

```
frontend (React/Vite)          backend (Django/DRF)
───────────────────────        ─────────────────────────────────
src/
  App.jsx                      kse_portal/settings.py
  components/
    Sidebar.jsx                core/
    Topbar.jsx                   models.py       ← DB schema
  views/                         views.py        ← REST API
    Dashboard.jsx                ai_views.py     ← AI chat endpoint
    AiAdvisor.jsx                moderation.py   ← LLM content filter
    CourseCatalog.jsx            serializers.py
    CourseEvaluations.jsx        tests.py
    Profile.jsx                  adapters.py     ← Google OAuth domain check
    StudentProfile.jsx           signals.py
    InstructorProfile.jsx
  data/
    mockData.js                templates/
  utils/                         account/        ← Custom Google OAuth UI
    api.js
  index.css                    .env              ← GEMINI_API_KEY (secret)
```

---

## 3. Database Models

| Model | Key Fields | Notes |
|---|---|---|
| `User` | `email`, `major`, `current_year` | Custom user; no `username`; email is the login field |
| `Course` | `code`, `title`, `description`, `syllabus`, `ects_credits`, `trimester`, `instructor`, `prerequisites` | Prerequisites stored as comma-separated codes; `embedding` JSONField for future RAG |
| `Enrollment` | `user`, `course`, `is_completed`, `grade` | Unique per user+course; drives review access + transcript |
| `Review` | `course`, `user`, `comment`, `rating_difficulty`, `rating_quality`, `rating_workload`, `created_at` | User set to `SET_NULL` for anonymization; `embedding` JSONField for future RAG |
| `Wishlist` | `user`, `course`, `added_at` | Unique per user+course |

---

## 4. REST API Endpoints

| Method | URL | Description | Auth |
|---|---|---|---|
| `GET` | `/api/user/profile/` | Current user profile (name, major, year, total ECTS) | Required |
| `GET` | `/api/user/transcript/` | List of completed enrollments with course details | Required |
| `GET` | `/api/courses/catalog/` | All courses not yet completed by user | Required |
| `GET` | `/api/courses/<id>/permissions/` | Can user review this course? | Required |
| `POST` | `/api/reviews/` | Submit a new course review (enrollment check + moderation) | Required |
| `GET` | `/api/wishlist/` | List user's wishlisted courses | Required |
| `POST` | `/api/wishlist/` | Add course to wishlist `{ "course": <id> }` | Required |
| `DELETE` | `/api/wishlist/<course_id>/` | Remove course from wishlist | Required |
| `POST` | `/api/ai/chat/` | AI advisor chat `{ "messages": [...], "query": "..." }` | Dev: AllowAny |

### AI Chat Response Shape
```json
{
  "message": "...",
  "recommendations": [{"code": "CS401", "title": "...", "credits": 6, ...}],
  "tools_used": [{"tool": "get_transcript", "args": {}, "result_preview": "..."}],
  "compacted": false
}
```

---

## 5. Frontend Views

| View | File | Description |
|---|---|---|
| **Dashboard** | `Dashboard.jsx` | ECTS progress bar, GPA, active courses, quick-action cards |
| **AI Advisor** | `AiAdvisor.jsx` | Chat interface + context ribbon (mobile) / side panel (desktop) |
| **Course Catalog** | `CourseCatalog.jsx` | Searchable list with filter drawer, wishlist toggle, expandable cards, reviews modal |
| **Course Evaluations** | `CourseEvaluations.jsx` | Multi-step evaluation form (quality / difficulty / workload ratings + comment) |
| **My Profile** | `Profile.jsx` | Student's own profile: GPA, credits, attendance, course history, reviews |
| **Student Profile** | `StudentProfile.jsx` | Public view of another student's profile card |
| **Instructor Profile** | `InstructorProfile.jsx` | Instructor's courses and aggregate review data |

### Key Components
| Component | Description |
|---|---|
| `Sidebar.jsx` | Off-canvas drawer on mobile (hamburger trigger); static sidebar on desktop |
| `Topbar.jsx` | Top navigation bar; wraps to 2 rows on mobile (search drops to row 2) |

---

## 6. AI Advisor — How It Works

The AI endpoint (`POST /api/ai/chat/`) follows Claude Cookbook best practices:

1. **Server-side API key** — `GEMINI_API_KEY` from `django.conf.settings`, never in the frontend bundle
2. **System prompt** — Built dynamically from the live DB: includes student name/major/year + full course catalog
3. **Tool-use loop** (up to 3 rounds):
   - `get_transcript` — queries `Enrollment` table for completed courses
   - `check_prerequisites` — checks if a specific course's prereqs are satisfied
   - `add_to_wishlist` — writes to the `Wishlist` table
4. **Session memory compaction** — triggered when conversation chars exceed 50,000 (~12.5k tokens): summarizes the older 2/3 of the conversation into a single preamble block via an extra LLM call
5. **Recommendation extraction** — regex scan of the AI's final text for course codes (e.g. `CS401`), then resolved from the DB to populate rich recommendation cards in the UI

### Content Moderation (`moderation.py`)
- Uses Google Gemini 2.5 Flash as a classifier
- Chain-of-thought reasoning inside `<thinking>` tags
- Classifies as `ALLOW` or `BLOCK: reason` inside `<output>` tags
- Fail-open: if the Gemini API is unavailable, reviews are allowed through

---

## 7. Authentication

- **Google OAuth2** via `django-allauth`
- **Domain restriction**: `adapters.py` blocks non-`@kse.org.ua` accounts
- **Frontend fallback**: `fetchWithAuth` in `utils/api.js` handles `401`/`403` responses by triggering a session refresh or redirect
- **Dev mock**: A mock student "Олена Коваленко" can be used locally without a real Google account

---

## 8. Responsive Design System

The CSS in `src/index.css` is written **mobile-first**:

| Breakpoint | Layout |
|---|---|
| Default (< 768px) | 1-column, stacked cards, off-canvas sidebar, AI context ribbon horizontally scrolls |
| Tablet (≥ 768px) | Wider cards, some 2-column grids |
| Desktop (≥ 1024px) | Full sidebar visible, 2-column AI layout, catalog filter sticky sidebar, course grid `auto-fill` |

Key patterns:
- `.sidebar` — `position: fixed; left: -100%` by default; `.sidebar.open` slides to `left: 0`
- `.search-container` — `order: 3; min-width: 100%` on mobile; full natural flow on desktop
- `.modal-like-sidebar` — `position: fixed; width: 100vw; height: 100vh` on mobile; `position: sticky` on desktop
- `.context-panel` — `flex-direction: row; overflow-x: auto` on mobile; `flex-direction: column` on desktop

---

## 9. Testing

Run with: `python manage.py test`

**8 tests in `core/tests.py`**, all passing:

| Class | Tests |
|---|---|
| `ReviewAPITests` | `test_create_review_success`, `test_create_review_no_enrollment`, `test_create_review_unauthenticated` |
| `WishlistAPITests` | `test_wishlist_add_and_list`, `test_wishlist_duplicate`, `test_wishlist_remove`, `test_wishlist_remove_not_found`, `test_wishlist_unauthenticated` |

---

## 10. Development Setup

```bash
# Backend
cd backend
python -m venv venv && source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env          # add your GEMINI_API_KEY
python manage.py migrate
python manage.py runserver

# Frontend
cd ..
npm install
npm run dev
```

**Environment variables** (`backend/.env`):
```
SECRET_KEY=...
GEMINI_API_KEY=...
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
```

> **Note:** A `.vscode/settings.json` is included that points VS Code to `backend/venv/bin/python` to silence Pyre2/Pylance false positives.

---

## 11. Cookbook Reference

> Before implementing any new AI feature or modifying LLM logic, consult the relevant patterns in `draft/claude-cookbooks-main/`.

### Pattern Mapping Table

| Feature / Task | Recommended Cookbook Notebook |
|---|---|
| **API key security** | `CLAUDE.md` (Server-side environment variables) |
| **Tool-use loop** | `tool_use/customer_service_agent.ipynb` (The base agent pattern) |
| **Context Management** | `tool_use/automatic-context-compaction.ipynb` or `misc/session_memory_compaction.ipynb` |
| **Content Moderation** | `misc/building_moderation_filter.ipynb` (ALLOW/BLOCK classification) |
| **Agentic Workflows** | `patterns/agents/basic_workflows.ipynb` (Chains, routers, parallel processing) |
| **Structured Output** | `tool_use/extracting_structured_json.ipynb` or `misc/how_to_enable_json_mode.ipynb` |
| **RAG (Search)** | `capabilities/retrieval_augmented_generation/` (Vector-based retrieval) |
| **Performance** | `misc/prompt_caching.ipynb` (Prompt caching best practices) |
| **Vision / OCR** | `multimodal/best_practices_for_vision.ipynb` (Syllabus/transcript processing) |
| **Extended Reasoning** | `extended_thinking/extended_thinking_with_tool_use.ipynb` |

### Development Workflow

1. **Research**: Find the notebook that matches your desired feature. Understand the system prompt, message structure, and edge-case handling.
2. **Implementation**:
    - Keep API keys server-side in `backend/.env`.
    - Use `{role, content}` format for all message history.
    - Implement tool definitions using the `types.Tool` schema (see `ai_views.py`).
3. **Safety**: Always integrate `moderation.py` for any user-facing text generation.
4. **Validation**: Run `python manage.py test` to ensure new endpoints don't break existing logic.

**Key Technical Rules:**
- **Never** expose API keys in frontend code.
- **Always** handle tool execution errors gracefully (return an error message to the LLM, don't crash the view).
- **Use tools** rather than embedding massive datasets (like the full student list) directly into the prompt.
- **Moderate** user input *before* calling the main LLM and *before* saving to the database.

---

## 12. Roadmap & Known Issues

### Roadmap
1. **Real Moodle Integration** — replace `mockData.js` with REST/XML-RPC calls for live enrollments, grades, and syllabi
2. **PostgreSQL Migration** — switch from SQLite to PostgreSQL for production (Docker/Heroku/AWS)
3. **Schedule/Calendar Sync** — `GET /api/user/schedule/` from Moodle Calendar or Google Calendar
4. **RAG for AI** — add vector DB of syllabi (pgvector) for retrieval-augmented course recommendations
5. **Rate Limiting** — throttle `/api/ai/chat/` to prevent abuse

### Known Issues
1. **Mock Data** — student GPA, attendance, credits (shown in `Profile.jsx`), and per-course statistics are sourced from `mockData.js` and need real backend endpoints
2. **AI Route Auth** — `AiChatView` uses `AllowAny` in dev; switch to `IsAuthenticated` for production
3. **Loading Race** — `App.jsx` may briefly flash undefined state when switching from mock to real backend; fix with a global `<Loading />` wrapper
4. **Course Embeddings** — `Course.embedding` and `Review.embedding` fields exist as JSONField stubs; full vector search requires pgvector + PostgreSQL
