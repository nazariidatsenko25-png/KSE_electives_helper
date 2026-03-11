# KSE Student Portal — Project Overview

## 1. Overall Idea of the Project

The **Kyiv School of Economics (KSE) Student Portal** is a unified, modern, "single pane of glass" platform for students. It consolidates scattered academic systems (Moodle, grading systems, course catalogs) into one dashboard with seamless Google SSO authentication.

**Core Features:**
- **Diploma Progress Dashboard** — visual ECTS credit tracking, GPA, and graduation requirements
- **Course Evaluations** — anonymized reviews for completed courses, with LLM-powered content moderation
- **SmartCourse AI Advisor** — LLM-powered academic counselor (Meta Llama 3) with real-time database tool access (transcript lookup, prerequisite checking, wishlist management)
- **Interactive Course Catalog** — searchable/filterable course directory with wishlist support
- **Premium Aesthetics** — glassmorphism dark theme, fluid animations, fully responsive (mobile/tablet/desktop)

**Tech Stack:** React + Vite (frontend), Django + DRF (backend), SQLite (dev), Google OAuth2, Groq SDK (Llama 3)

---

## 2. What Was Done (Completed Work)

### Frontend (React / Vite)
- Responsive design system with mobile bottom-nav, tablet breakpoints
- Mock authentication flow (mock student "Олена Коваленко" for dev without Django)
- Course catalog with search, category/department filters, expandable cards
- SmartCourse AI chat UI with syllabus modals, auto-scroll, typing animation
- Tool-use badges (📋 transcript, 🔍 prereqs, ⭐ wishlist) and session compaction indicator
- Course evaluations form → `POST /api/reviews/` with course selector dropdown
- Catalog wishlist toggle → `POST/DELETE /api/wishlist/` with heart icon state
- Dashboard action cards wired to evaluations and AI advisor views
- Notification dropdown menu with unread styling
- Custom glassmorphism-themed login/signup templates (replaced Django defaults)
- `fetchWithAuth` interceptor for 401/403 session expiry handling

### Backend (Django / Python)
- Models: `User`, `Course` (with `prerequisites`), `Enrollment`, `Review`, `Wishlist`
- Google OAuth2 via `django-allauth` with KSE-domain restriction
- Review API with enrollment verification + LLM content moderation before save
- Wishlist API with duplicate checking
- **AI Chat API** (`POST /api/ai/chat/`) with:
  - Server-side Groq API key (never in frontend bundle)
  - Proper message history format (`{role, content}` arrays)
  - Tool-use loop: `get_transcript`, `check_prerequisites`, `add_to_wishlist`
  - Session memory compaction for long conversations (>20k chars → auto-summarize)
- **Code Polish & Bug Fixes:** Fixed `e.grade` crash in AI tools, added optional chaining to dashboard username, removed hardcoded API key from source, and eliminated redundant DB queries.
- 8 unit tests (reviews + wishlist CRUD), all passing
- `pyrightconfig.json` and `.vscode/settings.json` configured for Pyre2 false positives

---

## 3. What Has To Be Done (Future Roadmap)

1. **Real Moodle Integration** — replace `mockData.js` with REST/XML-RPC calls to KSE Moodle for live enrollments, grades, and syllabi
2. **PostgreSQL Migration** — switch from SQLite to PostgreSQL for production deployment (Docker/AWS/Heroku)
3. **Schedule/Calendar Sync** — `GET /api/user/schedule/` endpoint pulling from Moodle Calendar or Google Calendar
4. **Rate Limiting & RAG** — throttle `/api/ai/chat/`, add vector DB of syllabi for retrieval-augmented recommendations

---

## 4. What Has To Be Fixed (Known Issues)

1. **Loading Race Condition** — `App.jsx` may flash "undefined" briefly when switching from mock to real backend fetches. Fix: add a global `<Loading />` wrapper.
2. **Pyre2 IDE False Positives** — Import-resolution errors for Django/DRF/Groq are expected if the IDE doesn't use the virtual environment. **Fix:** A `.vscode/settings.json` file is now provided to automatically point VS Code to `backend/venv/bin/python`. If using another IDE, manually select the interpreter.

---

## 5. Development Workflow — Claude Cookbooks Reference

> **IMPORTANT:** Before implementing any new AI-related feature or modifying existing LLM interactions, you **must** consult the reference cookbook located at: draft/claude-cookbooks-main

### When to consult the cookbook

| Before doing this... | Check this cookbook section |
|---|---|
| Adding/modifying LLM API calls | `CLAUDE.md` (API key rules, message format) |
| Building a chatbot or conversational agent | `tool_use/customer_service_agent.ipynb` (tool-use loop pattern) |
| Parsing structured JSON from LLM | `tool_use/extracting_structured_json.ipynb`, `misc/how_to_enable_json_mode.ipynb` |
| Adding user-generated content | `misc/building_moderation_filter.ipynb` (ALLOW/BLOCK classification) |
| Handling long conversations | `misc/session_memory_compaction.ipynb` (summarize & compact) |
| Implementing multi-step AI workflows | `patterns/agents/` (prompt chaining, routing, orchestrator-subagents) |
| Optimizing repeated API calls | `misc/prompt_caching.ipynb` (cache system prompts) |
| Adding document Q&A or search | `capabilities/retrieval_augmented_generation/` (RAG pattern) |
| Classifying or categorizing content | `capabilities/classification/` (few-shot classification) |
| Summarizing long text | `capabilities/summarization/` (chunked summarization) |
| Working with images or PDFs | `multimodal/` (vision, chart reading, PDF processing) |

### Workflow

1. **Read the relevant cookbook notebook** — understand the recommended pattern
2. **Compare** with the current website code — identify deviations
3. **Implement** following the cookbook pattern (server-side API keys, proper message format, tool definitions, error handling)
4. **Verify** — run `python manage.py test`, `npx vite build`, and browser-test the feature

### Key rules from the cookbook (always apply)
- **Never** hardcode API keys in frontend code — use `os.environ` / Django settings
- **Always** use `{role, content}` message arrays, never flatten conversation to a string
- **Always** handle LLM errors gracefully with fallback responses
- **Use tools** when the LLM needs to access real data — don't embed all data in the prompt
- **Moderate** user-generated content before persisting to the database
