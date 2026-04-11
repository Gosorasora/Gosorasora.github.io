export const content = {
  kr: {
    hero: {
      greeting: "Hello, I'm",
      title: "Ko Donghyeon.",
      subtitle: "DevOps Engineer & Cloud Infra Architect.",
      description: "안정적인 인프라와 자동화된 배포 파이프라인으로 가치를 만듭니다.\n클라우드 환경에서 확장 가능한 시스템을 설계하고 운영하는 엔지니어입니다.",
      cta: "프로젝트 보기"
    },
    about: {
      title: "About Me",
      intro: [
        "안녕하세요! 저는 DevOps Engineer이자 Cloud Infra Architect인 고동현입니다.",
        "컴퓨터 공학에 대한 깊이 있는 이해를 바탕으로, 클라우드 인프라 설계와 자동화된 배포 파이프라인 구축에 집중하고 있습니다. Cloud Club, Amazon Cloud Club 등 클라우드 커뮤니티 활동과 보안 연구를 병행하며 폭넓은 경험을 쌓아왔습니다.",
        "현재는 AWS, GCP 등 클라우드 환경에서 안정적이고 확장 가능한 시스템을 설계하고 운영하는 데 집중하고 있습니다."
      ],
      tabs: {
        experience: "Experience",
        education: "Education",
        activities: "Activities",
        certs: "Certifications",
        awards: "Awards"
      },
      experience: [
        {
          title: 'DevOps Engineer (Intern) / Infra·Platform·AX',
          company: 'BUZZ & BEYOND (버즈앤비)',
          period: '2026.01 ~ 재직중',
          description: [
            'Kubernetes 기반 마이크로서비스 환경에서 인프라 운영/자동화 및 AX(업무 자동화) 과제 수행',
            'Terraform 배포를 Atlantis 기반 PR/GitOps로 전환, AWS AssumeRole 중심 보안 아키텍처 설계·정착',
            '분산된 Notion DB 데이터를 통합하여 DORA 지표 자동 산출 및 리포팅 파이프라인 구축'
          ],
          tags: ['Kubernetes', 'Terraform', 'Atlantis', 'AWS', 'Argo Workflows', 'Datadog', 'Gemini', 'Python']
        },
        {
          title: 'AWS Cloud Club at Dongguk Captain',
          company: 'Amazon Web Services (AWS)',
          period: '2025.07 ~ 재직중',
          description: [
            'AWS Cloud Club Member (2025.07 ~ 2026.04)',
            'AWS Cloud Club at Dongguk Captain (2026.05 ~ )'
          ],
          tags: ['AWS', 'Leadership']
        },
        {
          title: '학부연구생 (CSDC Lab)',
          company: '동국대학교 Computer Security & Distributed Computing Lab',
          period: '2025.04 ~ 재직중',
          description: [
            '네트워크 보안 및 부하 분산 관련 연구 수행',
            'NLP 기반 IaC 보안 분석 도구 개별연구 — BERT 모델로 Terraform 시맨틱 이상 탐지 및 IAM 권한 상승 경로 시각화',
            'SpinKube & WASM IoT 로그 처리 시뮬레이션 개별연구 — WebAssembly 기반 대규모 IoT 환경 인프라 검증'
          ],
          tags: ['Network Security', 'Load Balancing', 'AWS', 'NLP', 'WebAssembly']
        }
      ],
      education: [
        {
          title: '동국대학교',
          degree: '공과대학 컴퓨터공학과 학사 (재학중)',
          period: '2021.03 ~ 2027.02 (예정)',
          description: ['학점 4.12', '공과대학 학기 우등생 4회 선정']
        },
        {
          title: 'Google Cloud Fundamentals: Core Infrastructure',
          degree: 'Google Cloud',
          period: '2025.10.18 수료',
          description: ['GCP 핵심 인프라 과정 수료']
        }
      ],
      activities: [
        {
          title: '동국대학교 프로그래밍 중앙동아리 CAPS',
          role: '부회장, 홈페이지관리부 부장',
          period: '2022.03 ~ 2023.09',
          description: [
            '동아리 부회장 역임 (2022.03 ~ 2023.03)',
            '홈페이지관리부 부장 (2022.03 ~ 2023.09)'
          ]
        },
        {
          title: 'Cloud Club 1기',
          role: 'Member',
          period: '2022.03 ~ 2023.09',
          description: [
            '클라우드 기술 학습 및 프로젝트 참여'
          ]
        },
        {
          title: 'Amazon Cloud Club at Dongguk',
          role: 'Member → Captain (2026.05~)',
          period: '2025.07 ~ ',
          description: [
            'AWS Cloud Club Member (2025.07 ~ 2026.04)',
            'AWS Cloud Club at Dongguk Captain (2026.05 ~ )'
          ]
        },
        {
          title: 'SoftBank Hackathon 2025',
          role: 'Participant',
          period: '2024.11 ~ 2024.12',
          description: [
            '예선 참가 (2024.11.08 ~ 2024.11.09)',
            '본선 진출 (2024.12.06 ~ 2024.12.07)'
          ]
        }
      ],
      certs: [
        {
          title: 'Google Cloud Fundamentals: Core Infrastructure',
          issuer: 'Google Cloud Skills Boost',
          date: '2025.10'
        },
        {
          title: 'SQLD (SQL Developer)',
          issuer: '한국데이터산업진흥원',
          date: '2024.09 ~ 2026.09'
        },
        {
          title: '정보처리기능사',
          issuer: '한국산업인력공단',
          date: '2022.12'
        }
      ],
      awards: [
        {
          title: '동국대학교 공과대학 학기 우등생',
          issuer: '동국대학교 공과대학',
          date: '2021.07',
          description: ['2021학년도 1학기 학기 우등생 선정']
        },
        {
          title: '동국대학교 공과대학 학기 우등생',
          issuer: '동국대학교 공과대학',
          date: '2022.01',
          description: ['2021학년도 2학기 학기 우등생 선정']
        },
        {
          title: '동국대학교 공과대학 학기 우등생',
          issuer: '동국대학교 공과대학',
          date: '2022.01',
          description: ['학기 우등생 선정']
        },
        {
          title: 'U-LINC 협력사업 어드벤처디자인 경진대회 장려상',
          issuer: 'U-LINC',
          date: '2022.12',
          description: ['Team Leader로 참가하여 장려상 수상']
        },
        {
          title: '동국대학교 공과대학 학기 우등생',
          issuer: '동국대학교 공과대학',
          date: '2025.07',
          description: ['학기 우등생 선정']
        }
      ]
    },
    portfolio: {
      title: "Projects",
      filters: {
        all: "전체",
        web: "DevOps & Infra",
        ai: "AX 업무자동화",
        research: "오픈소스",
        security: "Security"
      },
      modal: {
        overview: "개요",
        role: "역할",
        techStack: "기술 스택",
        keyFeatures: "주요 기능",
        links: {
          github: "GitHub",
          demo: "Live",
          paper: "Paper"
        }
      },
      projects: [
        {
          id: 1,
          title: 'Atlantis 기반 GitOps Terraform CI/CD 구축',
          category: 'DevOps & Infra',
          image: null,
          description: 'PR 기반 GitOps 전환으로 인프라 변경 추적성 100% 달성 — Helm 기반 Atlantis 배포 및 AWS AssumeRole 보안 체계 구축',
          details: {
            problem: '엔지니어가 로컬에서 Terraform을 직접 실행하여 상태 파일 충돌, 변경 이력 추적 불가, 환경 간 정합성 문제가 빈번하게 발생',
            solution: 'Atlantis를 Kubernetes 클러스터에 Helm Chart 기반으로 배포하고, PR 기반 GitOps 워크플로우로 전환했습니다. 모든 인프라 변경이 코드 리뷰를 거쳐 승인된 후에만 적용되도록 하여 운영 투명성을 확보했습니다. AWS AssumeRole 아키텍처를 설계하고 개발자 로컬 Access Key를 전면 회수하여 최소 권한 원칙 기반 보안 체계를 구축했습니다.',
            role: 'Platform Engineer',
            tech: ['Terraform', 'Atlantis', 'Kubernetes', 'Helm', 'AWS IAM', 'Golang'],
            features: [
              'Helm Chart 기반 Atlantis K8s 배포',
              'PR 기반 코드 리뷰 후 인프라 변경 적용',
              'AWS AssumeRole 최소 권한 보안 체계 구축',
              'Atlantis v0.41.0 오픈소스 버그 수정 기여 (PR Merged)'
            ]
          },
          links: {
            demo: null,
            github: 'https://github.com/runatlantis/atlantis/pull/6186'
          }
        },
        {
          id: 2,
          title: 'Atlantis 오픈소스 버그 수정 기여 (v0.41.0)',
          category: '오픈소스',
          image: null,
          description: 'Atlantis autoplan에서 plan_requirements: mergeable 설정 시 PR이 항상 차단되는 버그를 발견하고 직접 수정하여 v0.41.0에 Merge',
          details: {
            problem: 'plan_requirements: [mergeable] 설정 시, 충돌 없는 깨끗한 PR에서도 autoplan이 항상 "Pull request must be mergeable before running plan" 에러를 발생시킴',
            solution: '원인은 runAutoplan()이 FetchPullStatus()를 한 번도 호출하지 않아 IsMergeable이 항상 false(Go zero value)로 남았던 것이었습니다. 댓글 기반 run()에는 이미 해당 API 호출이 있었지만 autoplan 경로에만 누락된 상태였습니다. 누락된 FetchPullStatus() 호출을 추가하고 유닛 테스트 2개를 작성하여 해결했습니다. 2026년 3월 Merge, Atlantis v0.41.0에 포함되었습니다.',
            role: 'Open Source Contributor',
            tech: ['Golang', 'Atlantis', 'Terraform', 'Git'],
            features: [
              'runAutoplan() 내 FetchPullStatus() 누락 버그 발견',
              'Go zero value로 인한 IsMergeable 항상 false 문제 분석',
              '유닛 테스트 2개 작성 및 PR 제출',
              '2026년 3월 Merge, Atlantis v0.41.0 릴리즈에 포함'
            ]
          },
          links: {
            demo: null,
            github: 'https://github.com/runatlantis/atlantis/pull/6186'
          }
        },
        {
          id: 3,
          title: 'LLM 기반 업무 분류 자동화 — Workload 추적 체계 구축',
          category: 'AX 업무자동화',
          image: null,
          description: '일 500건+ 태스크 자동 분류, 정확도 91.7% 달성 — 휴먼에러 제거 및 조직 Workload 가시화',
          details: {
            problem: '수동 분류에서 발생하는 휴먼에러로 인해 태스크 분류가 일관되지 않아, 조직 구성원의 실제 Workload가 어디에 사용되는지 추적이 불가능한 상태',
            solution: '기존 분산된 Notion 태스크 데이터를 통합하고, Gemini 2.5 Flash 기반 계층적 분류 로직(로드맵 성격 + 태스크 컨텍스트)을 적용하여 13개 업무유형·14개 미팅유형으로 자동 분류했습니다. 분류 정확도 91.7%를 달성하여 휴먼에러를 원천 차단하고, 구성원별 Workload가 실제로 어디에 투입되는지 정량적으로 추적할 수 있는 기반을 확보했습니다.',
            role: 'DevOps & AX Engineer',
            tech: ['Gemini', 'Argo Workflows', 'Python', 'Apollo Federation', 'GraphQL'],
            features: [
              '분산된 Notion 데이터 통합 및 Gemini 2.5 Flash 계층적 분류',
              '일 500건+ 자동 분류, 정확도 91.7% — 휴먼에러 원천 차단',
              '구성원별 Workload 투입 현황 정량적 추적 체계 구축',
              'Argo CronWorkflow 매일 정기 실행',
              'Apollo Federation Subgraph 분리로 재사용성 확보'
            ]
          },
          links: {
            demo: null,
            github: null
          }
        },
        {
          id: 4,
          title: 'DORA Metrics 자동화 대시보드 구축',
          category: 'AX 업무자동화',
          image: null,
          description: '분산된 Notion DB 통합 → DORA 4대 지표 자동 산출 (7/30/90일 윈도우) — FLEX API 연동 실질 영업일 보정',
          details: {
            problem: 'DORA 지표 수동 산출의 비효율성, 분산된 Notion DB 데이터로 인한 집계 어려움, 비가동 시간 미반영으로 인한 공정성 이슈',
            solution: '여러 Notion DB에 분산된 배포·장애 데이터를 통합하여 별도 도구 도입 없이 7일·30일·90일 슬라이딩 윈도우로 DORA 4대 지표(Deploy Frequency, Lead Time to Changes, Change Fail Rate, MTTR)를 매일 자동 산출했습니다. 팀별·개인별 가중치 기반 DORA Score 체계를 설계하고, FLEX API를 연동하여 휴가·공휴일 등 비가동 시간을 반영한 실질 영업일 기준으로 Deploy Frequency를 보정했습니다. 크루·리더 대시보드에 DORA Metric 뷰를 추가하여 스프린트 회고와 1on1에서 데이터 기반 의사결정이 가능한 환경을 구축했습니다.',
            role: 'DevOps Engineer',
            tech: ['Python', 'SQLite', 'REST API', 'Grafana'],
            features: [
              '분산된 Notion DB 배포·장애 데이터 통합 수집',
              '7/30/90일 슬라이딩 윈도우 DORA 4대 지표 자동 산출',
              '팀별·개인별 가중치 기반 DORA Score 체계',
              'FLEX API 연동 실질 영업일 기준 Deploy Frequency 보정',
              '크루·리더 대시보드 DORA Metric 뷰 구축'
            ]
          },
          links: {
            demo: null,
            github: null
          }
        },
        {
          id: 5,
          title: 'Spin Framework Python SDK Contribution',
          category: '오픈소스',
          image: null,
          description: 'Spin Framework 오픈소스 Python SDK 기여 (PR 3건, Issue 3건)',
          details: {
            problem: 'Python 개발자를 위한 서버리스 WebAssembly 앱 빌드 SDK 개선 필요',
            solution: 'Spin Framework의 Python SDK에 다수의 PR과 Issue를 제출하여 Python 개발자 경험을 개선했습니다.',
            role: 'Open Source Contributor',
            tech: ['Python', 'WebAssembly', 'Spin Framework', 'Git'],
            features: [
              'PR #124, #126, #128 기여',
              'Issue #115, #125, #127 제출',
              'Python SDK 통합 개선',
              '서버리스 WASM 애플리케이션 지원'
            ]
          },
          links: {
            demo: null,
            github: 'https://github.com/spinframework/spin-python-sdk/pull/128'
          }
        },
        {
          id: 6,
          title: 'SpinKube & WASM IoT Log Processing Simulation',
          category: 'DevOps & Infra',
          image: null,
          description: 'SpinKube(WebAssembly) 기반 대규모 IoT 로그 처리 시뮬레이션',
          details: {
            problem: '대규모 IoT 환경에서의 빠른 스타트업과 경량 격리 인프라 검증 필요',
            solution: 'SpinKube를 활용한 대규모 시뮬레이션으로 고처리량 환경에서의 빠른 시작과 경량 격리 역량을 검증했습니다.',
            role: 'Infrastructure Engineer',
            tech: ['SpinKube', 'WebAssembly', 'WASI', 'Kubernetes'],
            features: [
              'SpinKube 기반 IoT 로그 처리',
              '대규모 시뮬레이션 설계 및 실행',
              '빠른 스타트업 시간 검증',
              '경량 격리 인프라 검증'
            ]
          },
          links: {
            demo: null,
            github: null
          }
        },
        {
          id: 7,
          title: 'NanoGrid Plus — Hybrid FaaS Platform',
          category: 'DevOps & Infra',
          image: null,
          description: 'Cold Start 30배 개선(3초→0.2초), 비용 96% 절감 — EC2 기반 자체 호스팅 FaaS 플랫폼 (SoftBank Hackathon 본선)',
          details: {
            problem: 'Lambda 실행 제한(시간/메모리)으로 인한 FaaS 확장성 한계와 Cold Start 지연',
            solution: 'AWS EC2 기반의 자체 호스팅 FaaS 플랫폼을 설계했습니다. Docker Warm Pool(Pause/Unpause) 기술로 Cold Start를 30배 개선(3초→0.2초)하고, Auto-Tuner가 실시간 메모리 사용량을 분석하여 최대 96% 비용 절감을 제안합니다. SQS 기반 작업 큐, S3 코드 저장소, CloudWatch 메트릭 자동 전송, Redis Pub/Sub 결과 반환까지 전체 Data Plane을 구현했습니다.',
            role: 'Infrastructure Lead',
            tech: ['AWS EC2', 'AWS SQS', 'AWS S3', 'Docker', 'Redis', 'Terraform', 'Java', 'Spring Boot'],
            features: [
              'Docker Warm Pool로 Cold Start 30배 개선 (3초→0.2초)',
              'Auto-Tuner 실시간 메모리 분석 및 비용 96% 절감 제안',
              'SQS Long Polling + Redis Pub/Sub 결과 반환',
              'CloudWatch Custom Metrics 자동 전송',
              'MDC 기반 requestId 로깅으로 완벽한 추적성'
            ]
          },
          links: {
            demo: null,
            github: 'https://github.com/Softbank-Final'
          }
        },
        {
          id: 8,
          title: 'Roomeya — Serverless Dormitory Matching',
          category: 'DevOps & Infra',
          image: null,
          description: '시즌별 기숙사 매칭 서비스 — AWS 풀 서버리스 아키텍처 + Terraform IaC (Lambda 9개, Step Functions, DynamoDB)',
          details: {
            problem: '시즌별 운영 특성에 따른 유휴 비용 발생과 매칭 워크플로우 복잡성',
            solution: 'Lambda 9개 함수, Step Functions 매칭 워크플로우, DynamoDB 4개 테이블, API Gateway(HTTP API v2), Cognito OAuth 2.0 인증, SES 이메일 발송까지 전체 인프라를 Terraform으로 코드화했습니다. Scale-to-zero로 비시즌 유휴 비용을 완전 제거했습니다.',
            role: 'Cloud Architect',
            tech: ['Terraform', 'AWS Lambda', 'AWS Step Functions', 'DynamoDB', 'API Gateway', 'Cognito'],
            features: [
              'Lambda 9개 함수 + Step Functions 매칭 워크플로우',
              'DynamoDB 4개 테이블 (Forms, Responses, Results, Students)',
              'Cognito OAuth 2.0 인증 + API Gateway HTTP API',
              'Scale-to-zero로 비시즌 유휴 비용 완전 제거',
              'Terraform으로 전체 인프라 코드화'
            ]
          },
          links: {
            demo: null,
            github: 'https://github.com/Roomeya'
          }
        },
        {
          id: 9,
          title: 'Deploy Land — Gamified CI/CD Platform',
          category: 'DevOps & Infra',
          image: null,
          description: 'GitHub Push→Build→Deploy→검증 전 과정 자동화 — 게이미피케이션 실시간 모니터링 서버리스 CI/CD 플랫폼',
          details: {
            problem: '표준 배포 로그의 가독성 부족, 배포 실패 시 즉각 인지 어려움, Phantom 배포 위험',
            solution: 'GitHub Push부터 Build, Deploy, Health Check까지 전 과정을 자동화하는 서버리스 CI/CD 플랫폼을 설계했습니다. AWS Amplify 기반 게이미피케이션 모니터링으로 배포 상태를 실시간 시각화하고, 성공/실패 시 Discord·Slack 즉시 알림을 구현했습니다. 배포 후 자동 Health Check와 설정 검증으로 Phantom 배포를 방지합니다.',
            role: 'AWS Architect & Developer',
            tech: ['AWS CodePipeline', 'AWS CodeBuild', 'AWS Lambda', 'Amazon EventBridge', 'DynamoDB', 'Terraform'],
            features: [
              'GitHub Push → Build → Deploy → Health Check 전 과정 자동화',
              'AWS Amplify 기반 게이미피케이션 실시간 모니터링',
              'Discord·Slack Webhook 즉시 알림',
              'Phantom 배포 방지 (설정 검증 + 자동 Health Check)',
              'Terraform IaC로 전체 인프라 관리'
            ]
          },
          links: {
            demo: null,
            github: 'https://github.com/Deploy-Land'
          }
        },
        {
          id: 10,
          title: 'NLP-based IaC Security Analyzer',
          category: 'Security',
          image: null,
          description: 'BERT 모델 기반 Terraform 시맨틱 보안 분석 도구',
          details: {
            problem: '규칙 기반 정적 분석 도구(TFSec 등)로는 탐지하기 어려운 시맨틱 이상 징후',
            solution: 'BERT 모델을 활용해 시맨틱 이상 징후를 식별하고, NetworkX를 연동해 IAM 권한 상승 경로를 그래프 알고리즘으로 시각화하여 시스템 감사 역량을 향상시켰습니다.',
            role: 'Security Researcher & Developer',
            tech: ['Python', 'BERT', 'Terraform', 'NetworkX', 'AWS IAM', 'Hugging Face', 'NLP'],
            features: [
              'BERT 기반 시맨틱 보안 분석',
              'IAM 권한 상승 경로 시각화',
              'CIEM 기반 감사 역량 강화',
              '정적 분석 도구 한계 극복'
            ]
          },
          links: {
            demo: null,
            github: 'https://github.com/Gosorasora/NLP-Enhanced-IaC-Security-Analyzer'
          }
        },
        {
          id: 11,
          title: 'Cloud Infrastructure Modernization',
          category: 'DevOps & Infra',
          image: null,
          description: 'CAPS 동아리 온프레미스 인프라의 AWS 클라우드 마이그레이션',
          details: {
            problem: '물리 PC 기반 온프레미스 서버의 만성적 다운타임과 유지보수 비효율',
            solution: '전체 인프라를 AWS 클라우드로 마이그레이션하여 24/7 서비스 가용성을 확보하고 물리적 의존성을 제거했습니다.',
            role: 'Cloud Architect',
            tech: ['AWS EC2', 'AWS EBS', 'AWS S3', 'AWS RDS', 'Docker'],
            features: [
              'AWS 클라우드 전체 마이그레이션',
              '24/7 서비스 가용성 확보',
              '물리적 의존성 완전 제거',
              'Docker 기반 컨테이너화'
            ]
          },
          links: {
            demo: null,
            github: null
          }
        }
      ]
    },
    resume: {
      title: "Resume & Skills",
      skillsTitle: "Technical Skills",
      download: "이력서 다운로드"
    }
  },
  en: {
    hero: {
      greeting: "Hi, I am",
      title: "Ko Donghyeon.",
      subtitle: "DevOps Engineer & Cloud Infra Architect.",
      description: "I build reliable infrastructure and automated deployment pipelines.\nSpecializing in designing and operating scalable systems in cloud environments.",
      cta: "Check out my work"
    },
    about: {
      title: "About Me",
      intro: [
        "Hello! I'm Ko Donghyeon, a passionate DevOps Engineer and Cloud Infra Architect. I specialize in building scalable infrastructure and automated deployment pipelines.",
        "With a strong foundation in Computer Science, I've been actively involved in cloud communities like Cloud Club and Amazon Cloud Club, while conducting security research at Dongguk University's Computer Security & Distributed Computing Lab.",
        "I am currently focused on designing and operating reliable, scalable systems in AWS and GCP cloud environments."
      ],
      tabs: {
        experience: "Experience",
        education: "Education",
        activities: "Activities",
        certs: "Certifications",
        awards: "Awards"
      },
      experience: [
        {
          title: 'DevOps Engineer (Intern) / Infra·Platform·AX',
          company: 'BUZZ & BEYOND',
          period: '2026.01 ~ Present',
          description: [
            'Kubernetes-based microservice infra operations/automation and AX tasks',
            'Transformed Terraform deployments to Atlantis PR-based GitOps with AWS AssumeRole security architecture',
            'Consolidated distributed Notion DB data to build automated DORA metrics calculation and reporting pipeline'
          ],
          tags: ['Kubernetes', 'Terraform', 'Atlantis', 'AWS', 'Argo Workflows', 'Datadog', 'Gemini', 'Python']
        },
        {
          title: 'AWS Cloud Club at Dongguk Captain',
          company: 'Amazon Web Services (AWS)',
          period: '2025.07 ~ Present',
          description: [
            'AWS Cloud Club Member (2025.07 ~ 2026.04)',
            'AWS Cloud Club at Dongguk Captain (2026.05 ~ )'
          ],
          tags: ['AWS', 'Cloud']
        },
        {
          title: 'Undergraduate Researcher (CSDC Lab)',
          company: 'Dongguk Univ. Computer Security & Distributed Computing Lab',
          period: '2025.04 ~ Present',
          description: [
            'Conducting research on Network Security and Load Balancing',
            'NLP-based IaC Security Analyzer — BERT model for Terraform semantic anomaly detection & IAM privilege escalation path visualization',
            'SpinKube & WASM IoT Log Processing Simulation — Validating WebAssembly infra for high-throughput IoT environments'
          ],
          tags: ['Network Security', 'Load Balancing', 'AWS', 'NLP', 'WebAssembly']
        }
      ],
      education: [
        {
          title: 'Dongguk University',
          degree: 'B.S. in Computer Science Engineering (In Progress)',
          period: '2021.03 ~ 2027.02 (Expected)',
          description: ['GPA 4.12', 'Dean\'s List (Semester Honors) - 4 times']
        },
        {
          title: 'Google Cloud Fundamentals: Core Infrastructure',
          degree: 'Google Cloud',
          period: '2025.10.18',
          description: ['Completed GCP Core Infrastructure course']
        }
      ],
      activities: [
        {
          title: 'CAPS@Dongguk',
          role: 'Vice President, Web Admin Lead',
          period: '2022.03 ~ 2023.09',
          description: ['Vice President of programming club (2022.03 ~ 2023.03)', 'Website management lead (2022.03 ~ 2023.09)']
        },
        {
          title: 'Cloud Club 1st Gen',
          role: 'Member',
          period: '2022.03 ~ 2023.09',
          description: ['Cloud technology study and project participation']
        },
        {
          title: 'Amazon Cloud Club at Dongguk',
          role: 'Member → Captain (2026.05~)',
          period: '2025.07 ~ ',
          description: ['AWS Cloud Club Member (2025.07 ~ 2026.04)', 'AWS Cloud Club at Dongguk Captain (2026.05 ~ )']
        },
        {
          title: 'SoftBank Hackathon 2025',
          role: 'Finalist',
          period: '2024.11 ~ 2024.12',
          description: ['Preliminary round (2024.11.08 ~ 2024.11.09)', 'Advanced to Final round (2024.12.06 ~ 2024.12.07)']
        }
      ],
      certs: [
        {
          title: 'Google Cloud Fundamentals: Core Infrastructure',
          issuer: 'Google Cloud Skills Boost',
          date: '2025.10'
        },
        {
          title: 'SQLD (SQL Developer)',
          issuer: 'Korea Data Agency',
          date: '2024.09 ~ 2026.09'
        },
        {
          title: 'Craftsman Information Processing',
          issuer: 'HRD Korea',
          date: '2022.12'
        }
      ],
      awards: [
        {
          title: 'Dongguk Univ. Semester Honors',
          issuer: 'Dongguk University College of Engineering',
          date: '2021.07',
          description: ['Dean\'s List - 1st Semester 2021']
        },
        {
          title: 'Dongguk Univ. Semester Honors',
          issuer: 'Dongguk University College of Engineering',
          date: '2022.01',
          description: ['Dean\'s List - 2nd Semester 2021']
        },
        {
          title: 'Dongguk Univ. Semester Honors',
          issuer: 'Dongguk University College of Engineering',
          date: '2022.01',
          description: ['Dean\'s List']
        },
        {
          title: 'U-LINC Adventure Design Competition - Encouragement Prize',
          issuer: 'U-LINC',
          date: '2022.12',
          description: ['Participated as Team Leader and won Encouragement Prize']
        },
        {
          title: 'Dongguk Univ. Semester Honors',
          issuer: 'Dongguk University College of Engineering',
          date: '2025.07',
          description: ['Dean\'s List']
        }
      ]
    },
    portfolio: {
      title: "Projects",
      filters: {
        all: "All",
        web: "DevOps & Infra",
        ai: "AX Automation",
        research: "Open Source",
        security: "Security"
      },
      modal: {
        overview: "Overview",
        role: "Role",
        techStack: "Tech Stack",
        keyFeatures: "Key Features",
        links: {
          github: "GitHub",
          demo: "Live",
          paper: "Paper"
        }
      },
      projects: [
        {
          id: 1,
          title: 'DORA Metrics Auto Dashboard',
          category: 'AX Automation',
          image: null,
          description: 'Consolidated distributed Notion DB → DORA 4 metrics auto-calculation (7/30/90-day windows) — FLEX API business-day correction',
          details: {
            problem: 'Manual DORA metric calculation inefficiency, scattered data across multiple Notion DBs, unfair metrics due to unaccounted non-working days.',
            solution: 'Consolidated deployment and incident data scattered across multiple Notion DBs into a unified pipeline, auto-calculating DORA 4 metrics (Deploy Frequency, Lead Time, Change Fail Rate, MTTR) daily with 7/30/90-day sliding windows. Designed weighted team/individual DORA Score system and integrated FLEX API to correct Deploy Frequency based on actual business days (excluding holidays/PTO).',
            role: 'DevOps Engineer',
            tech: ['Python', 'SQLite', 'REST API', 'Grafana'],
            features: [
              'Consolidated scattered Notion DB deployment/incident data',
              '7/30/90-day sliding window DORA 4 metrics auto-calculation',
              'Weighted team/individual DORA Score system',
              'FLEX API business-day correction for Deploy Frequency',
              'Crew/leader dashboard DORA Metric view'
            ]
          },
          links: { demo: null, github: null }
        },
        {
          id: 2,
          title: 'LLM Task Auto-Classification — Workload Tracking',
          category: 'AX Automation',
          image: null,
          description: '500+ daily tasks auto-classified with 91.7% accuracy — Eliminated human error and enabled quantitative Workload tracking',
          details: {
            problem: 'Inconsistent manual task classification causing human errors, making it impossible to track where team members actual Workload is being spent.',
            solution: 'Consolidated scattered Notion task data and applied Gemini 2.5 Flash hierarchical classification (roadmap context + task context) into 13 task types and 14 meeting types. Achieved 91.7% accuracy, eliminating human error and enabling quantitative tracking of per-member Workload allocation.',
            role: 'DevOps & AX Engineer',
            tech: ['Gemini', 'Argo Workflows', 'Python', 'Apollo Federation', 'GraphQL'],
            features: [
              'Consolidated scattered Notion data + Gemini 2.5 Flash hierarchical classification',
              '500+ daily auto-classification, 91.7% accuracy — human error eliminated',
              'Per-member Workload allocation quantitative tracking',
              'Argo CronWorkflow daily scheduled execution',
              'Apollo Federation Subgraph separation for reusability'
            ]
          },
          links: { demo: null, github: null }
        },
        {
          id: 3,
          title: 'Atlantis GitOps Transformation',
          category: 'DevOps & Infra',
          image: null,
          description: '100% infrastructure audit trail via Atlantis PR-based GitOps + AWS AssumeRole security.',
          details: {
            problem: 'Local-dependent Terraform deployments with no audit trail and Access Key security risks.',
            solution: 'Transformed local Terraform workflows to Atlantis PR-based GitOps, built AWS AssumeRole least privilege security, and contributed a bug fix to Atlantis v0.41.0 (PR Merged).',
            role: 'Platform Engineer',
            tech: ['Terraform', 'Atlantis', 'Kubernetes', 'Helm', 'AWS IAM', 'Golang'],
            features: [
              'PR-based GitOps workflow transformation',
              'AWS AssumeRole least privilege security',
              'Full developer Access Key revocation',
              'Atlantis v0.41.0 open source contribution (PR Merged)'
            ]
          },
          links: { demo: null, github: 'https://github.com/runatlantis/atlantis' }
        },
        {
          id: 4,
          title: 'Atlantis Open Source Bug Fix (v0.41.0)',
          category: '오픈소스',
          image: null,
          description: 'Discovered and fixed an autoplan bug in Atlantis where plan_requirements: mergeable always blocked clean PRs. Merged into v0.41.0.',
          details: {
            problem: 'With plan_requirements: [mergeable], autoplan always returned "Pull request must be mergeable before running plan" even on conflict-free PRs.',
            solution: 'Root cause: runAutoplan() never called FetchPullStatus(), leaving IsMergeable at false (Go zero value). The comment-based run() already had this call, but it was missing from the autoplan path. Added the missing FetchPullStatus() call and wrote 2 unit tests. Merged March 2026, included in Atlantis v0.41.0.',
            role: 'Open Source Contributor',
            tech: ['Golang', 'Atlantis', 'Terraform', 'Git'],
            features: [
              'Discovered FetchPullStatus() omission in runAutoplan()',
              'Analyzed Go zero value causing IsMergeable always false',
              'Wrote 2 unit tests and submitted PR #6186',
              'Merged March 2026, shipped in Atlantis v0.41.0'
            ]
          },
          links: {
            demo: null,
            github: 'https://github.com/runatlantis/atlantis/pull/6186'
          }
        },
        {
          id: 5,
          title: 'Spin Framework Python SDK Contribution',
          category: '오픈소스',
          image: null,
          description: 'Contributed to the Spin Framework open source Python SDK (3 PRs, 3 Issues).',
          details: {
            problem: 'Python SDK needed improvements for seamless developer integration with serverless WebAssembly apps.',
            solution: 'Submitted multiple PRs and Issues to improve the Python SDK for Spin Framework, enabling better Python developer experience.',
            role: 'Open Source Contributor',
            tech: ['Python', 'WebAssembly', 'Spin Framework', 'Git'],
            features: [
              'PR #124, #126, #128 contributions',
              'Issue #115, #125, #127 submissions',
              'Python SDK integration improvements',
              'Serverless WASM application support'
            ]
          },
          links: {
            demo: null,
            github: 'https://github.com/spinframework/spin-python-sdk/pull/128'
          }
        },
        {
          id: 6,
          title: 'SpinKube & WASM IoT Simulation',
          category: 'DevOps & Infra',
          image: null,
          description: 'Large-scale IoT log processing simulation using SpinKube (WebAssembly).',
          details: {
            problem: 'Need to validate rapid startup and lightweight isolation in high-throughput IoT environments.',
            solution: 'Designed and executed large-scale simulations using SpinKube to process high-volume IoT logs, validating infrastructure capabilities.',
            role: 'Infrastructure Engineer',
            tech: ['SpinKube', 'WebAssembly', 'WASI', 'Kubernetes'],
            features: [
              'SpinKube-based IoT log processing',
              'Large-scale simulation design & execution',
              'Rapid startup time validation',
              'Lightweight isolation verification'
            ]
          },
          links: {
            demo: null,
            github: null
          }
        },
        {
          id: 7,
          title: 'NanoGrid Plus — Hybrid FaaS Platform',
          category: 'DevOps & Infra',
          image: null,
          description: '30x Cold Start improvement (3s→0.2s), 96% cost reduction — Self-hosted FaaS on EC2 (SoftBank Hackathon Final)',
          details: {
            problem: 'Lambda execution limits (time/memory) hindering FaaS scalability and Cold Start latency.',
            solution: 'Architected a self-hosted FaaS platform on AWS EC2. Achieved 30x Cold Start improvement (3s→0.2s) via Docker Warm Pool (Pause/Unpause), with Auto-Tuner analyzing real-time memory usage for up to 96% cost reduction. Implemented full Data Plane: SQS task queue, S3 code storage, CloudWatch custom metrics, and Redis Pub/Sub result delivery.',
            role: 'Infrastructure Lead',
            tech: ['AWS EC2', 'AWS SQS', 'AWS S3', 'Docker', 'Redis', 'Terraform', 'Java', 'Spring Boot'],
            features: [
              'Docker Warm Pool: 30x Cold Start improvement (3s→0.2s)',
              'Auto-Tuner: real-time memory analysis, 96% cost reduction',
              'SQS Long Polling + Redis Pub/Sub result delivery',
              'CloudWatch Custom Metrics auto-reporting',
              'MDC-based requestId logging for full traceability'
            ]
          },
          links: {
            demo: null,
            github: 'https://github.com/Softbank-Final'
          }
        },
        {
          id: 8,
          title: 'Roomeya — Serverless Dormitory Matching',
          category: 'DevOps & Infra',
          image: null,
          description: 'Full serverless AWS architecture + Terraform IaC for seasonal dormitory matching (9 Lambdas, Step Functions, DynamoDB)',
          details: {
            problem: 'Idle cost during off-season and matching workflow complexity.',
            solution: 'Designed full serverless architecture: 9 Lambda functions, Step Functions matching workflow, 4 DynamoDB tables, API Gateway HTTP API v2, Cognito OAuth 2.0 auth, SES email — all codified with Terraform. Scale-to-zero eliminates off-season costs entirely.',
            role: 'Cloud Architect',
            tech: ['Terraform', 'AWS Lambda', 'AWS Step Functions', 'DynamoDB', 'API Gateway', 'Cognito'],
            features: [
              '9 Lambda functions + Step Functions matching workflow',
              '4 DynamoDB tables (Forms, Responses, Results, Students)',
              'Cognito OAuth 2.0 auth + API Gateway HTTP API',
              'Scale-to-zero: zero off-season idle cost',
              'Full infrastructure codified with Terraform'
            ]
          },
          links: {
            demo: null,
            github: 'https://github.com/Roomeya'
          }
        },
        {
          id: 9,
          title: 'Deploy Land — Gamified CI/CD Platform',
          category: 'DevOps & Infra',
          image: null,
          description: 'GitHub Push→Build→Deploy→Validation fully automated — Gamified real-time monitoring serverless CI/CD platform',
          details: {
            problem: 'Poor deployment log readability, delayed failure detection, and phantom deployment risks.',
            solution: 'Designed a serverless CI/CD platform automating the full cycle from GitHub Push to Build, Deploy, and Health Check. Built gamified real-time monitoring via AWS Amplify, instant Discord/Slack notifications on success/failure, and automatic Health Check + config validation to prevent phantom deployments.',
            role: 'AWS Architect & Developer',
            tech: ['AWS CodePipeline', 'AWS CodeBuild', 'AWS Lambda', 'Amazon EventBridge', 'DynamoDB', 'Terraform'],
            features: [
              'GitHub Push → Build → Deploy → Health Check full automation',
              'AWS Amplify gamified real-time monitoring',
              'Discord/Slack Webhook instant notifications',
              'Phantom deploy prevention (config validation + auto Health Check)',
              'Terraform IaC for full infrastructure'
            ]
          },
          links: {
            demo: null,
            github: 'https://github.com/Deploy-Land'
          }
        },
        {
          id: 10,
          title: 'NLP-based IaC Security Analyzer',
          category: 'Security',
          image: null,
          description: 'Semantic security analysis tool using BERT models for Terraform infrastructure.',
          details: {
            problem: 'Rule-based static analyzers (TFSec) cannot detect semantic anomalies in IaC.',
            solution: 'Developed a semantic security analysis tool using BERT models. Integrated NetworkX for graph-based IAM privilege escalation path visualization, significantly enhancing system audit capabilities.',
            role: 'Security Researcher & Developer',
            tech: ['Python', 'BERT', 'Terraform', 'NetworkX', 'AWS IAM', 'Hugging Face', 'NLP'],
            features: [
              'BERT-based Semantic Security Analysis',
              'IAM Privilege Escalation Path Visualization',
              'CIEM-based Audit Enhancement',
              'Beyond Static Analysis Limitations'
            ]
          },
          links: {
            demo: null,
            github: 'https://github.com/Gosorasora/NLP-Enhanced-IaC-Security-Analyzer'
          }
        },
        {
          id: 11,
          title: 'Cloud Infrastructure Modernization',
          category: 'DevOps & Infra',
          image: null,
          description: 'Full AWS cloud migration for CAPS programming club on-premise infrastructure.',
          details: {
            problem: 'Chronic downtime and maintenance inefficiencies from relying on physical on-premise PCs.',
            solution: 'Architected and executed a full migration to AWS Cloud, ensuring 24/7 service availability and eliminating physical dependency.',
            role: 'Cloud Architect',
            tech: ['AWS EC2', 'AWS EBS', 'AWS S3', 'AWS RDS', 'Docker'],
            features: [
              'Full AWS Cloud Migration',
              '24/7 Service Availability',
              'Physical Dependency Elimination',
              'Docker-based Containerization'
            ]
          },
          links: {
            demo: null,
            github: null
          }
        }
      ]
    },
    resume: {
      title: "Resume & Skills",
      skillsTitle: "Technical Skills",
      download: "Download PDF"
    }
  },
  jp: {
    hero: {
      greeting: "Hello, I'm",
      title: "Ko Donghyeon.",
      subtitle: "DevOps Engineer & Cloud Architect.",
      description: "安定したインフラと自動化されたデプロイパイプラインで価値を創出します。\nクラウド環境でスケーラブルなシステムを設計・運用するエンジニアです。",
      cta: "プロジェクトを見る"
    },
    about: {
      title: "About Me",
      intro: [
        "こんにちは！DevOps EngineerかつCloud Architectの高東賢（コ・ドンヒョン）です。",
        "コンピュータ工学の深い理解をもとに、クラウドインフラ設計と自動化デプロイパイプラインの構築に注力しています。Cloud Club、Amazon Cloud Clubなどのクラウドコミュニティ活動とセキュリティ研究を並行し、幅広い経験を積んできました。",
        "現在はAWS、GCPなどのクラウド環境で、安定的かつスケーラブルなシステムの設計・運用に集中しています。"
      ],
      tabs: {
        experience: "経歴",
        education: "学歴",
        activities: "活動",
        certs: "資格",
        awards: "受賞"
      },
      experience: [
        {
          title: 'DevOps Engineer (Intern) / Infra・Platform・AX',
          company: 'BUZZ & BEYOND',
          period: '2026.01 ~ 現在',
          description: [
            'Kubernetes基盤マイクロサービス環境でのインフラ運用/自動化およびAX（業務自動化）課題遂行',
            'Terraform デプロイをAtlantis基盤PR/GitOpsに転換、AWS AssumeRole中心のセキュリティアーキテクチャ設計・定着',
            '分散されたNotion DBデータを統合しDORA指標自動算出およびレポーティングパイプライン構築'
          ],
          tags: ['Kubernetes', 'Terraform', 'Atlantis', 'AWS', 'Argo Workflows', 'Datadog', 'Gemini', 'Python']
        },
        {
          title: 'AWS Cloud Club at Dongguk Captain',
          company: 'Amazon Web Services (AWS)',
          period: '2025.07 ~ 現在',
          description: [
            'AWS Cloud Club Member (2025.07 ~ 2026.04)',
            'AWS Cloud Club at Dongguk Captain (2026.05 ~ )'
          ],
          tags: ['AWS', 'Leadership']
        },
        {
          title: '学部研究生 (CSDC Lab)',
          company: '東国大学校 Computer Security & Distributed Computing Lab',
          period: '2025.04 ~ 現在',
          description: [
            'ネットワークセキュリティおよび負荷分散関連研究遂行',
            'NLP基盤IaCセキュリティ分析ツール個別研究 — BERTモデルでTerraformセマンティック異常検知およびIAM権限昇格経路可視化',
            'SpinKube & WASM IoTログ処理シミュレーション個別研究 — WebAssembly基盤大規模IoT環境インフラ検証'
          ],
          tags: ['Network Security', 'Load Balancing', 'AWS', 'NLP', 'WebAssembly']
        }
      ],
      education: [
        {
          title: '東国大学校',
          degree: '工科大学 コンピュータ工学科 学士（在学中）',
          period: '2021.03 ~ 2027.02（予定）',
          description: ['GPA 4.12', '工科大学 学期優等生 4回選定']
        },
        {
          title: 'Google Cloud Fundamentals: Core Infrastructure',
          degree: 'Google Cloud',
          period: '2025.10.18 修了',
          description: ['GCPコアインフラ課程修了']
        }
      ],
      activities: [
        {
          title: '東国大学校 プログラミング中央サークル CAPS',
          role: '副会長、ホームページ管理部 部長',
          period: '2022.03 ~ 2023.09',
          description: [
            'サークル副会長歴任 (2022.03 ~ 2023.03)',
            'ホームページ管理部 部長 (2022.03 ~ 2023.09)'
          ]
        },
        {
          title: 'Cloud Club 1期',
          role: 'Member',
          period: '2022.03 ~ 2023.09',
          description: ['クラウド技術学習およびプロジェクト参加']
        },
        {
          title: 'Amazon Cloud Club at Dongguk',
          role: 'Member → Captain (2026.05~)',
          period: '2025.07 ~ ',
          description: [
            'AWS Cloud Club Member (2025.07 ~ 2026.04)',
            'AWS Cloud Club at Dongguk Captain (2026.05 ~ )'
          ]
        },
        {
          title: 'SoftBank Hackathon 2025',
          role: 'Finalist',
          period: '2024.11 ~ 2024.12',
          description: [
            '予選参加 (2024.11.08 ~ 2024.11.09)',
            '本選進出 (2024.12.06 ~ 2024.12.07)'
          ]
        }
      ],
      certs: [
        {
          title: 'Google Cloud Fundamentals: Core Infrastructure',
          issuer: 'Google Cloud Skills Boost',
          date: '2025.10'
        },
        {
          title: 'SQLD (SQL Developer)',
          issuer: '韓国データ産業振興院',
          date: '2024.09 ~ 2026.09'
        },
        {
          title: '情報処理技能士',
          issuer: '韓国産業人力公団',
          date: '2022.12'
        }
      ],
      awards: [
        {
          title: '東国大学校 工科大学 学期優等生',
          issuer: '東国大学校 工科大学',
          date: '2021.07',
          description: ['2021年度1学期 学期優等生選定']
        },
        {
          title: '東国大学校 工科大学 学期優等生',
          issuer: '東国大学校 工科大学',
          date: '2022.01',
          description: ['2021年度2学期 学期優等生選定']
        },
        {
          title: '東国大学校 工科大学 学期優等生',
          issuer: '東国大学校 工科大学',
          date: '2022.01',
          description: ['学期優等生選定']
        },
        {
          title: 'U-LINC アドベンチャーデザインコンペティション 奨励賞',
          issuer: 'U-LINC',
          date: '2022.12',
          description: ['Team Leaderとして参加し奨励賞受賞']
        },
        {
          title: '東国大学校 工科大学 学期優等生',
          issuer: '東国大学校 工科大学',
          date: '2025.07',
          description: ['学期優等生選定']
        }
      ]
    },
    portfolio: {
      title: "Projects",
      filters: {
        all: "全て",
        web: "DevOps & Infra",
        ai: "AX 業務自動化",
        research: "OSS貢献",
        security: "Security"
      },
      modal: {
        overview: "概要",
        role: "役割",
        techStack: "技術スタック",
        keyFeatures: "主要機能",
        links: {
          github: "GitHub",
          demo: "Live",
          paper: "Paper"
        }
      },
      projects: [
        {
          id: 1,
          title: 'Atlantis基盤 GitOps Terraform CI/CD構築',
          category: 'DevOps & Infra',
          image: null,
          description: 'PR基盤GitOps転換でインフラ変更追跡性100%達成 — Helm基盤Atlantisデプロイ及びAWS AssumeRoleセキュリティ体系構築',
          details: {
            problem: 'エンジニアがローカルでTerraformを直接実行し、状態ファイル衝突・変更履歴追跡不可・環境間整合性問題が頻発',
            solution: 'AtlantisをKubernetesクラスタにHelm Chart基盤でデプロイし、PR基盤GitOpsワークフローに転換しました。全てのインフラ変更がコードレビューを経て承認後にのみ適用されるようにし、運用透明性を確保しました。AWS AssumeRoleアーキテクチャを設計し、開発者ローカルのAccess Keyを全面回収して最小権限原則基盤のセキュリティ体系を構築しました。',
            role: 'Platform Engineer',
            tech: ['Terraform', 'Atlantis', 'Kubernetes', 'Helm', 'AWS IAM', 'Golang'],
            features: [
              'Helm Chart基盤 Atlantis K8sデプロイ',
              'PR基盤コードレビュー後インフラ変更適用',
              'AWS AssumeRole最小権限セキュリティ体系構築',
              'Atlantis v0.41.0 OSSバグ修正貢献 (PR Merged)'
            ]
          },
          links: { demo: null, github: 'https://github.com/runatlantis/atlantis/pull/6186' }
        },
        {
          id: 2,
          title: 'Atlantis OSS バグ修正貢献 (v0.41.0)',
          category: 'OSS貢献',
          image: null,
          description: 'Atlantis autoplanでplan_requirements: mergeable設定時にPRが常にブロックされるバグを発見し直接修正、v0.41.0にMerge',
          details: {
            problem: 'plan_requirements: [mergeable]設定時、コンフリクトのないクリーンなPRでもautoplanが常に"Pull request must be mergeable before running plan"エラーを発生',
            solution: '原因はrunAutoplan()がFetchPullStatus()を一度も呼び出さず、IsMergeableが常にfalse（Go zero value）のままだったことでした。コメント基盤のrun()には既に該当API呼び出しがありましたが、autoplanパスにのみ欠落していました。欠落したFetchPullStatus()呼び出しを追加しユニットテスト2個を作成して解決しました。2026年3月Merge、Atlantis v0.41.0に含まれました。',
            role: 'Open Source Contributor',
            tech: ['Golang', 'Atlantis', 'Terraform', 'Git'],
            features: [
              'runAutoplan()内FetchPullStatus()欠落バグ発見',
              'Go zero valueによるIsMergeable常時false問題分析',
              'ユニットテスト2個作成及びPR提出',
              '2026年3月Merge、Atlantis v0.41.0リリースに含まれる'
            ]
          },
          links: { demo: null, github: 'https://github.com/runatlantis/atlantis/pull/6186' }
        },
        {
          id: 3,
          title: 'LLM基盤業務分類自動化 — Workload追跡体系構築',
          category: 'AX 業務自動化',
          image: null,
          description: '日次500件+タスク自動分類、精度91.7%達成 — ヒューマンエラー排除及び組織Workload可視化',
          details: {
            problem: '手動分類で発生するヒューマンエラーによりタスク分類が一貫せず、組織構成員の実際のWorkloadがどこに使われているか追跡不可能な状態',
            solution: '既存の分散されたNotionタスクデータを統合し、Gemini 2.5 Flash基盤の階層的分類ロジック（ロードマップ性格＋タスクコンテキスト）を適用して13個の業務タイプ・14個のミーティングタイプに自動分類しました。分類精度91.7%を達成しヒューマンエラーを根本的に遮断、構成員別Workloadが実際にどこに投入されているか定量的に追跡できる基盤を確保しました。',
            role: 'DevOps & AX Engineer',
            tech: ['Gemini', 'Argo Workflows', 'Python', 'Apollo Federation', 'GraphQL'],
            features: [
              '分散Notionデータ統合及びGemini 2.5 Flash階層的分類',
              '日次500件+自動分類、精度91.7% — ヒューマンエラー根本遮断',
              '構成員別Workload投入現況の定量的追跡体系構築',
              'Argo CronWorkflow毎日定期実行',
              'Apollo Federation Subgraph分離で再利用性確保'
            ]
          },
          links: { demo: null, github: null }
        },
        {
          id: 4,
          title: 'DORA Metrics自動化ダッシュボード構築',
          category: 'AX 業務自動化',
          image: null,
          description: '分散Notion DB統合 → DORA 4大指標自動算出（7/30/90日ウィンドウ）— FLEX API連動 実質営業日補正',
          details: {
            problem: 'DORA指標手動算出の非効率性、分散されたNotion DBデータによる集計困難、非稼働時間未反映による公平性問題',
            solution: '複数のNotion DBに分散されたデプロイ・障害データを統合し、別途ツール導入なしで7日・30日・90日スライディングウィンドウでDORA 4大指標（Deploy Frequency, Lead Time to Changes, Change Fail Rate, MTTR）を毎日自動算出しました。チーム別・個人別加重値基盤DORA Score体系を設計し、FLEX APIを連動して休暇・祝日等の非稼働時間を反映した実質営業日基準でDeploy Frequencyを補正しました。',
            role: 'DevOps Engineer',
            tech: ['Python', 'SQLite', 'REST API', 'Grafana'],
            features: [
              '分散Notion DBデプロイ・障害データ統合収集',
              '7/30/90日スライディングウィンドウDORA 4大指標自動算出',
              'チーム別・個人別加重値基盤DORA Score体系',
              'FLEX API連動 実質営業日基準Deploy Frequency補正',
              'クルー・リーダーダッシュボードDORA Metricビュー構築'
            ]
          },
          links: { demo: null, github: null }
        },
        {
          id: 5,
          title: 'Spin Framework Python SDK Contribution',
          category: 'OSS貢献',
          image: null,
          description: 'Spin Framework OSS Python SDK貢献（PR 3件、Issue 3件）',
          details: {
            problem: 'Python開発者向けサーバーレスWebAssemblyアプリビルドSDKの改善必要',
            solution: 'Spin FrameworkのPython SDKに複数のPRとIssueを提出し、Python開発者体験を改善しました。',
            role: 'Open Source Contributor',
            tech: ['Python', 'WebAssembly', 'Spin Framework', 'Git'],
            features: [
              'PR #124, #126, #128 貢献',
              'Issue #115, #125, #127 提出',
              'Python SDK統合改善',
              'サーバーレスWASMアプリケーションサポート'
            ]
          },
          links: { demo: null, github: 'https://github.com/spinframework/spin-python-sdk/pull/128' }
        },
        {
          id: 6,
          title: 'SpinKube & WASM IoT Log Processing Simulation',
          category: 'DevOps & Infra',
          image: null,
          description: 'SpinKube（WebAssembly）基盤大規模IoTログ処理シミュレーション',
          details: {
            problem: '大規模IoT環境での高速スタートアップと軽量アイソレーションインフラ検証の必要性',
            solution: 'SpinKubeを活用した大規模シミュレーションで高スループット環境での高速起動と軽量アイソレーション能力を検証しました。',
            role: 'Infrastructure Engineer',
            tech: ['SpinKube', 'WebAssembly', 'WASI', 'Kubernetes'],
            features: [
              'SpinKube基盤IoTログ処理',
              '大規模シミュレーション設計及び実行',
              '高速スタートアップ時間検証',
              '軽量アイソレーションインフラ検証'
            ]
          },
          links: { demo: null, github: null }
        },
        {
          id: 7,
          title: 'NanoGrid Plus — Hybrid FaaS Platform',
          category: 'DevOps & Infra',
          image: null,
          description: 'Cold Start 30倍改善（3秒→0.2秒）、コスト96%削減 — EC2基盤セルフホスティングFaaSプラットフォーム（SoftBank Hackathon本選）',
          details: {
            problem: 'Lambda実行制限（時間/メモリ）によるFaaSスケーラビリティ限界とCold Start遅延',
            solution: 'AWS EC2基盤のセルフホスティングFaaSプラットフォームを設計しました。Docker Warm Pool（Pause/Unpause）技術でCold Startを30倍改善（3秒→0.2秒）し、Auto-Tunerがリアルタイムメモリ使用量を分析して最大96%コスト削減を提案します。',
            role: 'Infrastructure Lead',
            tech: ['AWS EC2', 'AWS SQS', 'AWS S3', 'Docker', 'Redis', 'Terraform', 'Java', 'Spring Boot'],
            features: [
              'Docker Warm PoolでCold Start 30倍改善（3秒→0.2秒）',
              'Auto-Tunerリアルタイムメモリ分析及びコスト96%削減提案',
              'SQS Long Polling + Redis Pub/Sub結果返却',
              'CloudWatch Custom Metrics自動送信',
              'MDC基盤requestIdロギングで完全なトレーサビリティ'
            ]
          },
          links: { demo: null, github: 'https://github.com/Softbank-Final' }
        },
        {
          id: 8,
          title: 'Roomeya — Serverless Dormitory Matching',
          category: 'DevOps & Infra',
          image: null,
          description: 'シーズン別寮マッチングサービス — AWSフルサーバーレスアーキテクチャ + Terraform IaC（Lambda 9個、Step Functions、DynamoDB）',
          details: {
            problem: 'シーズン別運用特性による遊休コスト発生とマッチングワークフローの複雑性',
            solution: 'Lambda 9個関数、Step Functionsマッチングワークフロー、DynamoDB 4テーブル、API Gateway（HTTP API v2）、Cognito OAuth 2.0認証、SESメール送信まで全インフラをTerraformでコード化しました。Scale-to-zeroでオフシーズン遊休コストを完全排除しました。',
            role: 'Cloud Architect',
            tech: ['Terraform', 'AWS Lambda', 'AWS Step Functions', 'DynamoDB', 'API Gateway', 'Cognito'],
            features: [
              'Lambda 9個関数 + Step Functionsマッチングワークフロー',
              'DynamoDB 4テーブル（Forms, Responses, Results, Students）',
              'Cognito OAuth 2.0認証 + API Gateway HTTP API',
              'Scale-to-zeroでオフシーズン遊休コスト完全排除',
              'Terraformで全インフラコード化'
            ]
          },
          links: { demo: null, github: 'https://github.com/Roomeya' }
        },
        {
          id: 9,
          title: 'Deploy Land — Gamified CI/CD Platform',
          category: 'DevOps & Infra',
          image: null,
          description: 'GitHub Push→Build→Deploy→検証 全過程自動化 — ゲーミフィケーションリアルタイムモニタリング サーバーレスCI/CDプラットフォーム',
          details: {
            problem: '標準デプロイログの可読性不足、デプロイ失敗時の即時認知困難、Phantomデプロイリスク',
            solution: 'GitHub PushからBuild、Deploy、Health Checkまで全過程を自動化するサーバーレスCI/CDプラットフォームを設計しました。AWS Amplify基盤ゲーミフィケーションモニタリングでデプロイ状態をリアルタイム可視化し、成功/失敗時Discord・Slack即時通知を実装しました。',
            role: 'AWS Architect & Developer',
            tech: ['AWS CodePipeline', 'AWS CodeBuild', 'AWS Lambda', 'Amazon EventBridge', 'DynamoDB', 'Terraform'],
            features: [
              'GitHub Push → Build → Deploy → Health Check 全過程自動化',
              'AWS Amplify基盤ゲーミフィケーションリアルタイムモニタリング',
              'Discord・Slack Webhook即時通知',
              'Phantomデプロイ防止（設定検証 + 自動Health Check）',
              'Terraform IaCで全インフラ管理'
            ]
          },
          links: { demo: null, github: 'https://github.com/Deploy-Land' }
        },
        {
          id: 10,
          title: 'NLP-based IaC Security Analyzer',
          category: 'Security',
          image: null,
          description: 'BERTモデル基盤Terraformセマンティックセキュリティ分析ツール',
          details: {
            problem: 'ルール基盤静的分析ツール（TFSec等）では検知困難なセマンティック異常兆候',
            solution: 'BERTモデルを活用してセマンティック異常兆候を識別し、NetworkXを連動してIAM権限昇格経路をグラフアルゴリズムで可視化してシステム監査能力を向上させました。',
            role: 'Security Researcher & Developer',
            tech: ['Python', 'BERT', 'Terraform', 'NetworkX', 'AWS IAM', 'Hugging Face', 'NLP'],
            features: [
              'BERT基盤セマンティックセキュリティ分析',
              'IAM権限昇格経路可視化',
              'CIEM基盤監査能力強化',
              '静的分析ツール限界克服'
            ]
          },
          links: { demo: null, github: 'https://github.com/Gosorasora/NLP-Enhanced-IaC-Security-Analyzer' }
        },
        {
          id: 11,
          title: 'Cloud Infrastructure Modernization',
          category: 'DevOps & Infra',
          image: null,
          description: 'CAPSサークル オンプレミスインフラのAWSクラウドマイグレーション',
          details: {
            problem: '物理PC基盤オンプレミスサーバーの慢性的ダウンタイムとメンテナンス非効率',
            solution: '全インフラをAWSクラウドにマイグレーションし、24/7サービス可用性を確保して物理的依存を排除しました。',
            role: 'Cloud Architect',
            tech: ['AWS EC2', 'AWS EBS', 'AWS S3', 'AWS RDS', 'Docker'],
            features: [
              'AWSクラウド全面マイグレーション',
              '24/7サービス可用性確保',
              '物理的依存完全排除',
              'Docker基盤コンテナ化'
            ]
          },
          links: { demo: null, github: null }
        }
      ]
    },
    resume: {
      title: "Resume & Skills",
      skillsTitle: "Technical Skills",
      download: "PDFダウンロード"
    }
  }
};
