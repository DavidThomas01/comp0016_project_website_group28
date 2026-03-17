# Prompt Injection Protection — Website Plan

## Overview

Static report website for UCL COMP0016 2025–26 Team 28, documenting a security-focused project on prompt injection attacks, mitigations, and testing — built in collaboration with Avanade. The site serves as the project's primary deliverable showcase and technical report.

---

## Site Map

```
index.html .................. Home / Project Overview
requirements.html ........... Requirements (MoSCoW)
research.html ............... Research & Literature
algorithms.html ............. Algorithms & Detection Logic
ui-design.html .............. UI Design & Wireframes
system-design.html .......... System Design & Architecture
implementation.html ......... Implementation Details
evaluation-testing.html ..... Evaluation & Testing
conclusion.html ............. Conclusion & Future Work
appendices.html ............. Appendices (manual, GDPR, blog, video)
```

---

## Section Breakdown

### 1. Home (`index.html`)
- Hero with project title, tagline, and one-paragraph abstract
- Project overview explaining prompt injection and why it matters
- Objectives as a scannable bullet list
- Context section: prompt injection attacks + MCP servers
- Planned deliverables
- Team and contacts (Team 28, Avanade, Dr Yun Fu, industry contacts)
- Embedded project video (placeholder for now)

### 2. Requirements (`requirements.html`)
- Overview paragraph on requirements methodology
- **Functional requirements** organised by MoSCoW priority:
  - Must Have: Home page, vulnerability view, knowledge base, testing view
  - Should Have: sandbox input, pseudocode mitigations, PDF export, chatbot
  - Could Have: multi-language examples, AI prompt enhancer, automated pipelines
  - Won't Have: auth system, auto-fix, custom model modification
- **Non-functional requirements** by MoSCoW:
  - Must Have: web app, clear UI, dark mode, responsive
  - Should Have: Avanade branding, red/green indicators
  - Could Have: OWASP/MITRE mapping
  - Won't Have: persistent backend, universal LLM support
- Personas and use cases

### 3. Research (`research.html`)
- Introduction to LLM security landscape
- Vulnerability taxonomy:
  - Direct injection, indirect injection, instruction-data confusion
  - Obfuscation/encoding attacks, tool-use/action injection
  - Memory/long-horizon vulnerabilities, multimodal injection, multi-agent contamination
- Mitigation strategies:
  - Input validation, prompt design, output filtering
  - Multi-agent defence, context sanitisation, sandboxing, model alignment
- Testing methodologies and frameworks (garak, PromptBench, PyRIT, PromptMe, OpenAI Evals)
- Key findings summary

### 4. Algorithms (`algorithms.html`)
- Algorithmic overview
- Threat modelling approach
- Detection and evaluation logic
- Limitations of chosen approaches

### 5. UI Design (`ui-design.html`)
- Design philosophy and guiding principles
- Wireframes and mockups (images)
- Component library / pattern overview
- User flow diagrams
- Accessibility design decisions

### 6. System Design (`system-design.html`)
- High-level architecture diagram
- Component responsibilities and boundaries
- Data flow and interaction patterns
- Technology stack rationale
- Security architecture considerations

### 7. Implementation (`implementation.html`)
- Development methodology
- Key technical implementation details
- Code architecture and patterns used
- External integrations (APIs, MCP, tools)
- Notable decisions and trade-offs

### 8. Evaluation & Testing (`evaluation-testing.html`)
- Testing strategy overview
- Test types: unit, integration, system, acceptance
- Results and coverage metrics
- Performance and security evaluation
- Requirements traceability matrix

### 9. Conclusion (`conclusion.html`)
- Summary of project achievements
- Objectives vs outcomes comparison
- Lessons learned (technical and process)
- Recommendations for future work

### 10. Appendices (`appendices.html`)
- **User manual & deployment guide** (`#user-manual`)
- **GDPR & data privacy** (`#gdpr`)
- **Development blog** (`#dev-blog`) — external link
- **Monthly progress video** (`#monthly-video`) — embed or link

---

## Design Direction

| Aspect | Approach |
|---|---|
| Tech | Static HTML + CSS + minimal vanilla JS |
| Colour | Warm orange brand (`#FF6B35`) on clean white with soft warm backgrounds |
| Typography | System font stack, heavy headings, comfortable body text |
| Motion | Subtle hover transitions (0.2s), scroll fade-ins, gentle lifts — never overwhelming |
| Layout | 1050px max-width, generous whitespace, rounded corners throughout |
| Nav | Sticky header, pill-style active link, CSS-only mobile toggle |
| Signature | Orange left-accent bar on all `h2` headings, radial gradient hero decorations |

---

## TO-DO

### Infrastructure & Setup
- [ ] Clean up `:contentReference[oaicite:...]` artefacts from all HTML files
- [ ] Add proper UCL and Avanade logo SVGs to `assets/img/`
- [ ] Add a favicon
- [ ] Add `<meta>` description tags to all pages for SEO / sharing

### Design & Polish
- [ ] Enhance the hero section with scroll-triggered animations (fade-in-up on load)
- [ ] Add smooth scroll-triggered fade-in animations to content sections (`IntersectionObserver`)
- [ ] Improve cards / content blocks with hover shadows and lift effects
- [ ] Add a "back to top" floating button
- [ ] Style tables with alternating row colours and rounded containers
- [ ] Add visual section dividers or decorative elements between major sections
- [ ] Ensure full mobile responsiveness is polished (test all pages at 375px, 768px, 1024px+)
- [ ] Add dark mode toggle (CSS-only or minimal JS)

### Content — Pages Needing Real Content
- [ ] **Home** — finalise overview text, embed project video when available
- [ ] **Requirements** — content is mostly complete; review for accuracy and add personas section
- [ ] **Research** — content is mostly complete; review for accuracy, add citations
- [ ] **Algorithms** — currently placeholder; write full content
- [ ] **UI Design** — currently placeholder; add wireframes, mockups, design rationale
- [ ] **System Design** — currently placeholder; add architecture diagrams and component descriptions
- [ ] **Implementation** — currently placeholder; write technical details
- [ ] **Evaluation & Testing** — currently placeholder; add test results and analysis
- [ ] **Conclusion** — currently placeholder; write summary and reflections
- [ ] **Appendices** — currently placeholder; add user manual, GDPR section, blog link, video

### Accessibility
- [ ] Audit all pages for keyboard navigability
- [ ] Verify colour contrast meets WCAG AA on all text/background combinations
- [ ] Ensure all interactive elements have visible focus indicators
- [ ] Test with a screen reader

### Final
- [ ] Cross-browser test (Chrome, Firefox, Safari, Edge)
- [ ] Validate HTML with W3C validator
- [ ] Validate CSS
- [ ] Final review of all pages for consistency and completeness
