# Ko Donghyeon · 고동현

**DevOps Engineer & Cloud Infra Architect**
Building reliable infrastructure and automated delivery pipelines on AWS · GCP · Kubernetes.

> Computer Engineering @ Dongguk University · GPA 4.12 / 4.5 · Dean's List × 4
> AWS Student Builder Group Leader at Dongguk University (2026.05~)

[**🔗 Portfolio**](https://gosorasora.github.io/) · [LinkedIn](https://www.linkedin.com/in/kosora) · [GitHub](https://github.com/Gosorasora) · kodh0204@gmail.com

---

## What I do

I design and operate cloud infrastructure for production microservices, with a focus on:

- **GitOps-based IaC** — Terraform deploys gated through Atlantis on Kubernetes (Helm), with PR review enforced and 100% audit-trail coverage
- **Least-privilege security** — AWS AssumeRole architectures that retire developer-local Access Keys at the org level
- **Developer experience** — DORA Metrics dashboards, LLM-based task auto-classification (91.7% accuracy on 500+ daily items), and Argo Workflows pipelines
- **Open-source** — contributor to Atlantis (PR #6186 merged into v0.41.0) and Spin Framework Python SDK

## Currently

| | |
|---|---|
| **DevOps Engineer (Intern)** · Infra · Platform · AX | BUZZ & BEYOND (vling) · 2026.01 ~ |
| **Group Leader** · AWS Student Builder Group at Dongguk University | AWS · 2026.05 ~ |
| **Undergraduate Researcher** · CSDC Lab | Dongguk University · 2025.04 ~ |

## Featured projects

- **NanoGrid Plus** — Hybrid FaaS platform on AWS EC2. 30× cold-start improvement (3s → 0.2s) via Docker Warm Pool, up to 96% cost reduction via real-time auto-tuning. *SoftBank Hackathon 2025 Finalist.* &nbsp;[`github.com/Softbank-Final`](https://github.com/Softbank-Final)
- **Roomeya** — Fully serverless dormitory matching platform. 9 Lambdas, Step Functions, 4× DynamoDB, API Gateway HTTP v2, Cognito OAuth, SES — scale-to-zero off-season. &nbsp;[`github.com/Roomeya`](https://github.com/Roomeya)
- **Deploy Land** — Gamified serverless CI/CD platform automating Push → Build → Deploy → Health Check, with real-time monitoring and Discord/Slack notifications. &nbsp;[`github.com/Deploy-Land`](https://github.com/Deploy-Land)
- **Atlantis** — Fixed an autoplan bug where `FetchPullStatus()` was never called, blocking all clean PRs when `plan_requirements: [mergeable]` was set. PR [#6186](https://github.com/runatlantis/atlantis/pull/6186) merged into v0.41.0.

## Tech stack

**Cloud & Infra** &nbsp;AWS · GCP · Azure · Terraform · Kubernetes · Docker · Helm
**DevOps & Automation** &nbsp;Atlantis · Argo Workflows · Datadog · Grafana · GitOps · CI/CD · Notion
**Languages** &nbsp;Go · Python · Java · SQL
**AI/ML & Security** &nbsp;BERT · Hugging Face · NetworkX · NLP · Gemini · WebAssembly · SpinKube
**Frameworks** &nbsp;Spring Boot · Apollo Federation · GraphQL · Django · FastAPI · Node.js

## Resume & contact

| | |
|---|---|
| 🇰🇷 Korean resume | [`resume_kr.pdf`](public/assets/resume_kr.pdf) |
| 🇺🇸 English resume | [`resume_en.pdf`](public/assets/resume_en.pdf) |
| 🇯🇵 Japanese resume | [`resume_jp.pdf`](public/assets/resume_jp.pdf) |
| Digital card | [`card.pdf`](public/assets/card.pdf) |

The live portfolio at **[gosorasora.github.io](https://gosorasora.github.io/)** has the full project gallery, an interactive about-me, and language switching (KR / EN / JP).

---

<sub>This repo also serves the portfolio site (React 19 + Vite, deployed on GitHub Pages). For local development: `npm install && npm run dev`.</sub>
