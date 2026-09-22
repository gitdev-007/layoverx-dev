---
description: 
---

---
description: 8-Phase LayoverX Architecture, Audit, Refactoring, and Strategy Pipeline
---

# Operational Protocols
- **Human-in-the-Loop Authentication:** If any external service, portal, or browser test requires account login, 2FA, or CAPTCHA, open the browser window, pause execution, and explicitly prompt: "Please log in on the browser window and type 'Resume'". Resume only when confirmed.
- **Output Storage:** Save all generated reports, audit findings, and strategy blueprints into a local `docs/` folder.
- **Code Changes:** When refactoring, maintain clean layer separation (routes -> services -> repositories) and validate inputs using Zod.

---

# Execution Steps

## Phase 1: End-to-End User Experience & Journey Audit
- Inspect `app/` and frontend views for a transit passenger booking:
  1. 6-hour daytime hotel micro-stay.
  2. Temporary luggage storage.
- Check mobile responsiveness, search filters (landing vs. departure dwell time), and checkout microcopy.
- Save findings to `docs/01_ux_journey_audit.md`.

## Phase 2: Security & Concurrency Audit
- Execute and inspect `auth_idor_security_check.js` and `sqli_ddos_security_check.js`.
- Audit JWT lifecycle, HttpOnly cookies, BOLA/IDOR on booking routes, and PostgreSQL inventory race conditions (`SELECT ... FOR UPDATE`).
- Save findings to `docs/02_security_audit.md`.

## Phase 3: Architectural Code Refactoring & Hardening
- Refactor booking and auth routes in `backend/src/routes/`:
  - Implement Zod schema validation on payloads.
  - Enforce Controller -> Service -> Repository layer separation.
  - Wrap room slot and luggage reservation in transactional row-level locks.
  - Implement centralized error handling without leaking stack traces.

## Phase 4: Master Architecture Documentation
- Generate a technical specification in `docs/04_architecture_spec.md` including:
  - Mermaid architecture diagram.
  - API endpoint catalog with request/response schemas.
  - Operational maintenance and deployment checklist.

## Phase 5: Technical & Programmatic SEO Strategy
- Create Schema.org JSON-LD scripts for `TravelAgency`, `LodgingBusiness`, and `FAQPage`.
- Define the programmatic URL hierarchy for transit hours (`/layover/[airport]/[duration]-hours`) and dynamic metadata in `docs/05_seo_strategy.md`.

## Phase 6: Customer Acquisition & Go-To-Market (GTM)
- Detail zero-to-one acquisition for Mumbai CSMIA T2:
  - Forum engagement (FlyerTalk, Reddit).
  - B2B partnerships with Sahar/Andheri day-use hotels (ITC Maratha, Niranta).
  - Save to `docs/06_gtm_acquisition.md`.

## Phase 7: Founder Advisory: Valuation & Legal Compliance
- Document pre-seed i-SAFE modeling, dilution boundaries, and 12–18 month capital allocation.
- Outline legal protections: DPDP Act 2023, Indian Contract Act bailment for luggage storage, and IT Act Section 79 intermediary safe-harbor.
- Save to `docs/07_legal_valuation.md`.

## Phase 8: Investor Pitch Deck Blueprint
- Compile the complete 10-slide Seed Pitch Deck proposal into `docs/08_pitch_blueprint.md`.

---
description: LayoverX Agent Harness Pipeline with Loop Engineering, Multi-Agent Telemetry, and Synthesis Gate
---

# Agent Harness & Communication Protocol
All agents operating within this pipeline must communicate through a standardized **Inter-Agent Harness**:
- **Shared Event Bus (`.agents/harness/event_bus.json`):** Agents emit structured telemetry events:
  ```json
  {
    "sender": "UX_Simulator_Agent",
    "recipient": "Backend_Telemetry_Agent",
    "event_type": "USER_ACTION_SIMULATED",
    "payload": { "route": "/api/v1/bookings", "method": "POST", "body": "{...}" },
    "iteration": 1
  }