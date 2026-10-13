export const content = {
  kr: {
    hero: {
      greeting: "Hello, I'm",
      title: "Ko Donghyeon.",
      subtitle: "DevOps Engineer.",
      description: "사람과의 연결을 중시하는 DevOps 엔지니어입니다. 인프라와 AX로 팀의 일을 잇고, 전공과 동아리가 다른 개발자들이 섞이는 커뮤니티를 만들고 이끌어 왔습니다.\nTerraform과 Atlantis로 인프라 변경을 PR 승인 절차로 옮기고, LLM과 Notion 에이전트로 사내 반복 업무를 자동화합니다.\n영업팀 리드 배정처럼 개발 밖의 업무도 담당자를 직접 인터뷰해 측정 기준부터 세웁니다.",
      cta: "프로젝트 보기",
      label: "DevOps Engineer · BUZZ & BEYOND 2026~",
      highlights: [
        { label: "DevOps", text: "Terraform과 Atlantis로 GitOps 구축, 개발자 Access Key 전량 회수" },
        { label: "AX", text: "Notion과 FLEX를 잇는 전사 업무량 모니터링 구축 및 운영, CS와 리드 응대 에이전트 구축" },
        { label: "Open Source", text: "CNCF Atlantis 버그 수정, 공식 릴리스 v0.41.0 반영" },
        { label: "Community", text: "AWS SBG at DGU Leader, Notion Campus Leader" }
      ],
      links: [
        { label: "GitHub", url: "https://github.com/Gosorasora" },
        { label: "LinkedIn", url: "https://www.linkedin.com/in/kosora/" },
        { label: "AWS Article", url: "https://builder.aws.com/content/3I2Mw8lAM0x9sODvAwmHN8RylXM/building-a-faas-on-ec2-without-lambda-and-splitting-cold-start-into-three-layers" },
        { label: "이력서 PDF", url: "/assets/resume_kr.pdf" }
      ],
      stack: ["AWS", "Terraform", "Atlantis", "Kubernetes", "Argo Workflows", "Python", "Notion"]
    },
    sections: {
      cases: "Cases",
      writing: "Writing",
      problem: "문제",
      decision: "판단",
      result: "결과",
      more: "상세",
      zoom: "다이어그램 확대"
    },
    cases: [
      {
        projectId: 1,
        diagram: null,
        summary: "로컬 Terraform 실행을 PR 승인 절차로 옮기고, 그 과정에서 막힌 안전장치는 끄지 않고 업스트림에서 고쳤습니다.",
        outcome: "로컬 장기 Access Key 0개, Terraform 작업 전건 PR 단위 감사 추적",
        problem: "엔지니어마다 로컬에서 Terraform을 실행해 상태 파일 충돌과 변경 이력 추적 불가가 겹쳐 있었습니다. 로컬 실행을 위해 개발자 각자가 장기 AWS Access Key를 들고 있었고 권한 범위도 제각각이었습니다.",
        decision: "Terraform Cloud는 비용과 외부 SaaS 상태 위탁 때문에, GitHub Actions 직접 구성은 결국 Atlantis를 다시 만드는 일이라 기각하고 Atlantis 자체 호스팅을 골랐습니다. 우회 경로가 남으면 절차는 권고가 되므로 Access Key를 전량 회수했고, 긴급 배포 속도를 포기하는 대신 승인자를 복수로 두었습니다.",
        result: "Terraform 작업 전건을 PR 단위로 감사 추적하고 로컬 장기 Access Key는 0개가 됐습니다. 운영 중 plan_requirements: mergeable이 PR을 항상 막던 버그는 옵션을 끄지 않고 직접 고쳐 PR #6186으로 v0.41.0에 머지됐습니다.",
        links: [
          { label: "PR #6186", url: "https://github.com/runatlantis/atlantis/pull/6186" }
        ]
      },
      {
        projectId: 7,
        diagram: null,
        summary: "관리형 FaaS의 실행 시간 상한과 데이터 반출 제약을 EC2 위에서 걷어내고, 대가로 떠안은 확장성은 콜드 스타트를 세 층으로 나눠 풀었습니다.",
        outcome: "실행 단위 콜드 스타트 3초에서 0.2초, 워커 IAM을 큐 하나의 3개 액션으로 축소",
        problem: "HTTP 요청 처리를 EC2 위에서 해야 한다는 제약 아래, Lambda가 대신 해주던 함수 업로드와 호출, 즉시 실행을 직접 만들고 확장성도 스스로 책임져야 했습니다.",
        decision: "6시간 만에 띄운 API Gateway와 Dispatcher Lambda 프로토타입은 요청 경로에 API Gateway가 남아 걷어내고 ALB와 EC2 Controller로 전환했습니다. 콜드 스타트를 실행 단위, 워커 인스턴스, 스케일링 판단의 세 층으로 나눴고, 스케일링 기준은 사후 지표인 CPU 대신 SQS 큐 깊이로 잡았습니다.",
        result: "실행 단위 3초에서 0.2초, ASG Warm Pool로 상시 2대 비용에 5대분 확장을 준비했습니다. 피보나치 1만 건 약 11초(동일 워크로드 Lambda 30~40초), 이틀간 AWS 비용은 약 3만 원입니다.",
        links: [
          { label: "AWS Article", url: "https://builder.aws.com/content/3I2Mw8lAM0x9sODvAwmHN8RylXM/building-a-faas-on-ec2-without-lambda-and-splitting-cold-start-into-three-layers" },
          { label: "GitHub", url: "https://github.com/Softbank-Final" }
        ]
      },
      {
        projectId: 4,
        diagram: null,
        summary: "배포 기준을 팀별로 합의해 고정하고, 릴리스 문서 자체를 DORA 지표의 원천으로 삼아 배포가 끝나면 측정도 끝나게 했습니다.",
        outcome: "DORA 4개 지표 매일 자동 산출, 크루와 리더가 같은 대시보드로 확인",
        problem: "업무는 Notion 태스크에, 배포는 릴리스 문서에, 장애는 또 다른 DB에 흩어져 있어 조직 차원에서 생산성을 점검할 하나의 기준이 없었습니다.",
        decision: "측정 전용 도구를 들이면 측정이 또 하나의 업무가 되므로 이미 모두가 쓰는 Notion에서 뽑았습니다. 커밋 수와 토큰 사용량은 생산성 근거로 부족해 기각하고 의미 있는 배포만 인정했으며, 검수는 개별 정확도보다 일관성을 택해 Notion 커스텀 에이전트에 맡겼습니다.",
        result: "팀별 배포 기준을 각 팀과 합의해 문서로 고정했고, DORA 4개 지표를 매일 자동 산출해 크루와 리더가 같은 화면으로 봅니다. 이 지표는 R&R 논의와 1on1 대화 소재로 쓰입니다.",
        links: []
      }
    ],
    writing: [
      { kind: "AWS Builder Center", title: "Building a FaaS on EC2 without Lambda and splitting cold start into three layers", url: "https://builder.aws.com/content/3I2Mw8lAM0x9sODvAwmHN8RylXM/building-a-faas-on-ec2-without-lambda-and-splitting-cold-start-into-three-layers" },
      { kind: "Open Source", title: "runatlantis/atlantis PR #6186: autoplan에서 plan_requirements: mergeable이 항상 차단되던 버그 수정 (v0.41.0)", url: "https://github.com/runatlantis/atlantis/pull/6186" },
      { kind: "Paper", title: "IoT 로그 파이프라인 계층별 런타임 할당 (WebAssembly vs 컨테이너)", url: "/assets/wasm-spinkube-iot-layer-allocation.pdf" }
    ],
    about: {
      title: "About Me",
      intro: [
        "안녕하세요! 저는 **DevOps Engineer** **고동현**입니다.",
        "Terraform·Kubernetes 기반 인프라와 GitOps 배포 환경을 구축하고 운영합니다. 최근에는 **LLM과 Notion 에이전트로 사내 반복 업무를 자동화하는 AX**에 집중하고 있으며, 문제가 있는 팀 옆에서 직접 듣고 고치는 방식을 택합니다.",
        "**AWS Student Builder Group at Dongguk University의 Leader**로 Hands-on Seminar 10회 이상과 Dongguk Dev Conference 2026을 열었습니다."
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
          title: 'DevOps Engineer / Infra·Platform·AX',
          company: 'BUZZ & BEYOND (버즈앤비)',
          period: '2026.01 ~ 재직중 (인턴 2026.01~06 · 정규직 2026.07~)',
          description: [
            'Terraform·Atlantis로 사내 GitOps 환경 구축',
            [
              'PR 단위 승인 강제로 Terraform 작업 전건 감사 추적 확보',
              'AWS AssumeRole 최소 권한 전환, 개발자 로컬 Access Key 전량 회수',
              'Atlantis 오픈소스 기여 [PR #6186](https://github.com/runatlantis/atlantis/pull/6186) 머지 (v0.41.0 반영)'
            ],
            '사내 AX 생산성 지표 체계 구축 (측정 지표로 DORA 채택)',
            [
              '일 200건 이상 업무 자동 분류 (정확도 91.7%)',
              '팀별 배포 기준을 합의·문서화해 산출 기준으로 고정, R&R 논의와 1on1 대화 소재로 사용'
            ],
            '인바운드 리드 SLA 체계 구축',
            [
              '리드 접수에서 담당자 배정까지 평균 33.6시간을 0.4시간으로 단축 (98.7% 단축), 1시간 내 담당자 배정 비율 9% → 86%',
              '영업시간 기준 SLA 자동 측정, 방치 리드 알림·에스컬레이션 체계 구축'
            ],
            'Notion 사내 에이전트 구축·운영',
            [
              '배포 품질 검수 자동화',
              '벤더별 LLM 비용 라벨링, 사용량 모니터링 환경과 Alert 시스템 구축'
            ]
          ],
          tags: ['Kubernetes', 'Terraform', 'Atlantis', 'AWS', 'Notion', 'Argo Workflows', 'Datadog', 'Gemini', 'Python']
        },

        {
          title: 'AWS Student Builder Group at Dongguk University',
          company: 'Amazon Web Services (AWS)',
          period: '2025.07 ~ 현재',
          description: [
            'Cloud Club Member 2025.07 ~ 2026.04, Leader 2026.05 ~ 현재',
            '전공 무관 학생 대상 Hands-on Seminar 10회 이상 운영 ([Meetup](https://www.meetup.com/aws-sbg-at-dongguk-university-seoul-campus/events/?type=past))',
            'AWS SBG 배지 7종 획득 (Leader, Spark, Ignite, Surge, Strato, Flare, Apex. 최상위 Apex는 행사 6회 개최 기준, [AWS SBG Apex Badge](https://www.credly.com/badges/796266ba-affe-4d6c-a811-5d0c33ce1bd4))',
            'Dongguk Dev Conference 2026 총괄 (2026.10.02, 7개 개발 동아리 약 100명 참여, 종합 만족도 4.80/5, [LinkedIn 후기](https://www.linkedin.com/feed/update/urn:li:activity:7512849701973471232/))',
            'LinkedIn [AWS Student Builder Group at Dongguk University](https://www.linkedin.com/company/aws-student-builder-group-at-dongguk-university/) 페이지 운영',
          ],
          tags: ['AWS', 'Leadership']
        },
        {
          title: 'Notion Campus Leader at Dongguk University',
          company: 'Notion',
          period: '2026.08 ~ 현재',
          description: [
            '교내 Notion 공식 캠퍼스 리더로 교내 구성원 대상 Notion 교육 세션 운영, Notion 마켓플레이스에 [대학생 개발 프로젝트 관리 허브](https://www.notion.com/ko/templates/student-dev-project-hub) 템플릿 게시, 사내 업무 자동화 사례 공유'
          ],
          tags: ['Notion', 'Community']
        },
        {
          title: '학부연구생 (CSDC Lab)',
          company: '동국대학교 Computer Security & Distributed Computing Lab',
          period: '2025.04 ~ 현재',
          description: [
            '네트워크 보안 및 부하 분산 관련 연구 수행',
            'NLP 기반 IaC 보안 분석 도구 개별연구. Terraform IAM 리소스 관계를 그래프로 만들어 규칙 기반 스캐너(TFSec, Checkov)가 놓치는 만료 계정, 미사용 계정, 서비스 목적과 권한 불일치를 탐지',
            'WebAssembly와 컨테이너의 실환경 비교 개별연구. AKS에서 IoT 로그 파이프라인을 계층별로 실측해 런타임 할당 기준 도출 (논문 [PDF](https://gosorasora.github.io/assets/wasm-spinkube-iot-layer-allocation.pdf))'
          ],
          tags: ['Network Security', 'Load Balancing', 'AWS', 'NLP', 'WebAssembly']
        }
      ],
      education: [
        {
          title: '동국대학교',
          degree: '공과대학 컴퓨터공학과 학사 (재학중)',
          period: '2021.03 ~ 2027.02 (예정)',
          description: ['학점 4.09 / 4.5', '공과대학 학기 우등생 4회 선정']
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
          role: '1st Member',
          period: '2022.03 ~ 2023.09',
          description: [
            '특정 벤더에 종속되지 않는(vendor-neutral) IT 연합 동아리 1기 멤버',
            'AWS·GCP 등 벤더를 가리지 않고 클라우드 인프라를 다루며 학습·프로젝트 진행'
          ]
        },
        {
          title: 'SoftBank Hackathon',
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
          title: 'AWS Certified Cloud Practitioner',
          issuer: 'Amazon Web Services',
          date: '2026.10',
          description: ['[AWS Certified Cloud Practitioner](https://www.credly.com/badges/364200c3-4fce-450b-b925-171f149f8742)']
        },
        {
          title: 'AWS Student Builder Group Badges (7)',
          issuer: 'AWS Community',
          date: '2026.09',
          description: ['Credly 배지: [AWS SBG Leader Badge](https://www.credly.com/badges/ca013a7a-bc99-46ff-bc2f-86a68164c29f), [AWS SBG Spark Badge](https://www.credly.com/badges/bdb73658-bfcb-4db4-b80e-d9954463efab), [AWS SBG Ignite Badge](https://www.credly.com/badges/87b30bf8-698c-45e4-be0e-6df7ab4f0c43), [AWS SBG Surge Badge](https://www.credly.com/badges/bac12f82-26a2-4568-975f-31ac7c1801f0), [AWS SBG Strato Badge](https://www.credly.com/badges/2e7e222a-e5de-4017-a2f9-4f631718c6df), [AWS SBG Flare Badge](https://www.credly.com/badges/75b7e9a1-751b-4e28-a92e-9ea85d0c2932), [AWS SBG Apex Badge](https://www.credly.com/badges/796266ba-affe-4d6c-a811-5d0c33ce1bd4)']
        },
        {
          title: 'AWS Cloud Club Captain: Bronze, Silver',
          issuer: 'AWS Community',
          date: '2026.06',
          description: ['Credly 배지: [Cloud Club Captain Bronze](https://www.credly.com/badges/26a9d4fb-de53-4d57-b24a-1d98025765b0), [Cloud Club Captain Silver](https://www.credly.com/badges/1fe9561a-cf64-4896-afba-65d24dbe2bd1)']
        },
        {
          title: 'Google Cloud Fundamentals: Core Infrastructure',
          issuer: 'Google Cloud Skills Boost',
          date: '2025.10'
        },
        {
          title: 'Notion Badge: Essentials · Workflows · Advanced',
          issuer: 'Notion',
          date: '2026.06',
          description: ['배지 인증: [Notion Essentials Badge](https://verify.skilljar.com/c/u3fmkfvpnv26) · [Notion Workflows Badge](https://verify.skilljar.com/c/uqe3e88dh56v) · [Notion Advanced Badge](https://verify.skilljar.com/c/nvh6hj8dxfrx)']
        },
        {
          title: 'SQLD (SQL Developer)',
          issuer: '한국데이터산업진흥원',
          date: '2024.09'
        },
        {
          title: '정보처리기능사',
          issuer: '한국산업인력공단',
          date: '2022.12'
        }
      ],
      awards: [
        {
          title: '동국대학교 공과대학 학기 우등생 (4회)',
          issuer: '동국대학교 공과대학',
          date: '2021.07 ~ 2025.07',
          description: ['2021-1학기, 2021-2학기, 2022-1학기, 2025-1학기 선정']
        },
        {
          title: 'U-LINC 협력사업 어드벤처디자인 경진대회 장려상',
          issuer: '동국대학교 LINC3.0 사업단장',
          date: '2022.12',
          description: ['Team Leader로 참가하여 장려상 수상']
        },
        {
          title: '교내 학습시설 혼잡도 분석 시스템 장려상',
          issuer: '동국대학교 LINC3.0 사업단장',
          date: '2022.12',
          description: ['센서 기반 인프라 구축으로 도서관 외 라운지·카페 등 비지정 좌석의 점유 여부 확인', '출입 자동 감지 시스템을 통한 구역별 실시간 인원 판단 시스템 개발']
        },
        {
          title: '횃불상',
          issuer: '육군정보통신학교장 (준장)',
          date: '2023.08',
          description: ['군생활 후반기 교육 수료생 200명 중 1등 성적으로 수상']
        }
      ]
    },
    portfolio: {
      title: "Other Projects",
      metrics: { 2: "PR #6186 머지, v0.41.0 포함", 3: "일 200건+ 업무 자동 분류", 15: "담당자 배정 33.6시간 → 0.4시간", 6: "AKS 1.34 실측", 5: "PR #124 머지", 8: "비시즌 유휴 리소스 비용 0원", 11: "2022년 자발적 이전", 12: "벤더와 용도별 지출 추적, 임계치 알림", 13: "팀별 배포 기준 문서화", 14: "전사 배포" },
      order: [3, 2, 15, 13, 14, 12, 6, 5, 10, 9, 8, 11],
      filters: {
        all: "전체",
        web: "DevOps & Infra",
        ai: "AX 업무자동화",
        research: "오픈소스",
        security: "Security",
        platform: "Platform Engineering"
      },
      modal: {
        detail: "자세히 보기",
        overview: "개요",
        role: "역할",
        techStack: "기술 스택",
        keyFeatures: "주요 기능",
        links: {
          github: "GitHub",
          demo: "Live",
          paper: "Paper",
          article: "Article"
        }
      },
      projects: [
        {
          id: 1,
          title: 'Atlantis 기반 GitOps Terraform CI/CD 구축',
          category: 'DevOps & Infra',
          image: null,
          description: '인프라 변경을 승인받은 뒤에만 반영되게 바꿔 누가 언제 무엇을 바꿨는지 모두 기록으로 남겼습니다. 서비스별로 권한을 나눠 개인 PC의 접근 키를 전부 회수했습니다.',
          how: "상태 파일을 외부 SaaS에 위탁하는 Terraform Cloud와, plan 가독성과 Lock 관리가 약한 범용 CI를 비교한 뒤 Atlantis 자체 호스팅을 채택했습니다.",
          details: {
            problem: '인턴으로 합류해 처음 맡은 과제였습니다. 엔지니어들이 각자 로컬에서 Terraform을 실행하는 구조였고 여기서 상태 파일 충돌, 변경 이력 추적 불가, 환경 간 정합성 어긋남이 동시에 일어나고 있었습니다. 더 큰 문제는 보안 쪽이었습니다. 로컬 실행을 위해 개발자 각자가 장기 AWS Access Key를 들고 있었고 권한 범위도 제각각이었습니다.',
            solution: '선택지는 세 가지였습니다. Terraform Cloud는 관리 부담이 없지만 비용과 외부 SaaS에 상태를 위탁하는 문제가 있었고, GitHub Actions로 직접 구성하면 plan 결과를 PR에 붙이고 apply를 승인과 연동하는 로직을 전부 직접 짜야 해서 결국 Atlantis를 다시 만드는 일이 됩니다. 그래서 Atlantis 자체 호스팅을 골랐고, 문제가 나면 우리가 고쳐야 한다는 비용을 지불하기로 했습니다. 실제로 한 달 뒤 그 청구서가 왔고 그것이 PR #6186입니다.\n\n배포 위치는 이미 운영 중이던 Kubernetes 클러스터로 정했습니다. Atlantis만을 위해 별도 EC2를 세우면 그 인스턴스의 패치와 모니터링을 따로 관리해야 하는데, 기존 클러스터에 얹으면 관측과 롤아웃, 시크릿 관리를 이미 있는 체계로 그대로 씁니다. 대신 클러스터 장애가 인프라 배포 능력까지 함께 멈추는 단일 실패 지점이 생기는데, 인프라 배포가 상시 필요한 작업이 아니고 최악의 경우 로컬 실행으로 임시 복구가 가능하다고 보고 감수했습니다.\n\n가장 오래 고민한 것은 Access Key였습니다. GitOps로 옮기면 로컬에서 apply할 일이 없어지지만 키가 남아 있으면 급할 때 누군가는 반드시 그 경로를 씁니다. 우회할 길을 열어둔 채로 만든 절차는 절차가 아니라 권고가 됩니다. 그래서 키를 전량 회수하고 AssumeRole로 배포 시점에만 최소 권한 임시 자격증명을 발급하는 구조로 옮겼습니다. 포기한 것은 긴급 상황의 속도입니다. 급한 장애 대응에서 PR을 올리고 승인을 기다리는 시간은 그대로 비용이 되는데, 검증 없이 인프라가 바뀌는 쪽의 손실이 더 크다고 판단해 이 교환을 받아들이고 대신 승인자를 복수로 두어 대기 시간을 줄였습니다.\n\n요구사항 정리부터 Helm 배포와 IAM 설계, 팀 온보딩까지 진행했습니다. 다만 인프라 자체는 DevOps 팀의 일이고 제가 혼자 맡은 영역이 아니라, 이 과제에서 제 범위가 여기까지라는 점은 밝혀둡니다.',
            role: 'Platform Engineer (DevOps 팀)',
            tech: ['Terraform', 'Atlantis', 'Kubernetes', 'Helm', 'AWS IAM (AssumeRole)', 'Bitbucket'],
            features: [
              'Atlantis를 Helm Chart로 Kubernetes에 배포, 인프라 변경을 전부 PR 기반 GitOps로 전환',
              'plan_requirements: [mergeable]로 병합 불가 PR이 인프라에 적용되는 경로 차단',
              'AWS AssumeRole 전환, 개발자 로컬 장기 Access Key 전량 회수 (잔여 0개)',
              '로컬 우회 실행 차단: 삭제 권한 제거는 잘못 만든 리소스도 못 지우고 태그 기반 제어는 태그 변경으로 우회 가능해 기각. 상태 파일 버킷 정책에 허용 목록 외 전부 거부를 걸어 명시적 거부가 명시적 허용보다 우선한다는 평가 순서를 이용했습니다. 허용 목록에 없으면 관리자 권한으로도 상태 파일을 읽을 수 없어 로컬 실행이 성립하지 않으며, 정책 오류로 파이프라인이 마비될 경우를 대비해 비상용 관리자 계정은 허용 목록에 남겼습니다',
              'Terraform 작업 전건에 대한 PR 단위 감사 추적 확보',
              '트레이드오프: 긴급 배포 속도를 포기하는 대신 승인자를 복수로 두어 대기 시간 완화'
            ]
          },
          links: {
            demo: null,
            github: 'https://github.com/runatlantis/atlantis/pull/6186'
          }
        },
        {
          id: 2,
          title: 'Atlantis 오픈소스 버그 수정 기여',
          category: '오픈소스',
          image: null,
          description: 'Atlantis autoplan에서 plan_requirements: mergeable 설정 시 PR이 항상 차단되는 버그를 발견하고 직접 수정하여 v0.41.0에 Merge',
          how: "옵션 비활성화라는 우회는 운영 기준을 낮춘다고 판단해 배제하고, Go 코드를 추적해 autoplan 경로에 누락된 PR 병합 상태 조회를 추가했습니다.",
          details: {
            problem: 'plan_requirements: [mergeable] 설정 시, 충돌 없는 깨끗한 PR에서도 autoplan이 항상 "Pull request must be mergeable before running plan" 에러를 발생시킴',
            solution: '팀장님의 판단은 우회였습니다. 옵션을 끄거나 조건을 완화하면 당장 배포는 돌아갑니다. 우리 서비스 코드도 아닌 외부 오픈소스를 파고드는 데 시간을 쓰는 것보다 일정에 맞춰 비켜 가는 편이 합리적이라는 의견이었고, 회사 입장에서 타당한 판단이었습니다. 다만 저는 그 옵션이 왜 거기 있는지를 알고 있었습니다. 병합할 수 없는 PR이 인프라에 적용되는 것을 막으려고 제가 직접 건 안전장치였고, 그것을 끄는 순간 GitOps로 전환한 이유 자체가 사라집니다. 우회는 문제를 해결한 것이 아니라 우리가 세운 기준을 낮춘 셈이라고 봤습니다. 그래서 일정에 영향을 주지 않는 선에서 원인을 찾아보기로 했습니다. 문제가 하나 더 있었는데 Atlantis는 Go로 작성돼 있었고 저는 그때 Go를 처음 봤습니다.\n\n1주 동안 약 10시간을 썼습니다. 문법과 관용구를 익히는 데 3시간, 실행 경로를 따라가며 로직을 파악하는 데 2시간, 그 과정에서 CNCF 슬랙에 초대받아 같은 증상으로 보이는 이슈가 정말 같은 원인인지 논의하는 데 3시간, 나머지 2시간이 수정과 테스트 작성, 업스트림 리뷰 대응이었습니다.\n\n원인은 두 실행 경로의 차이였습니다. 댓글 기반 run() 경로에는 FetchPullStatus() 호출이 있어 PR의 병합 가능 상태를 갱신하는데 runAutoplan() 경로에는 그 호출이 없었습니다. 그래서 autoplan에서는 IsMergeable이 한 번도 세팅되지 않은 채 Go의 zero value인 false로 남았고, mergeable 조건은 PR의 실제 상태와 무관하게 항상 실패했습니다. 값이 없는 상태와 병합 불가능한 상태가 구분되지 않으니 컴파일러도 잡아주지 않고 런타임에서는 조용히 차단으로만 동작합니다.\n\n수정 자체는 다른 실행 경로에 있던 조회를 autoplan 경로에 추가하는 일이라 프로덕션 코드는 10줄입니다. 시간이 든 쪽은 증상에서 원인을 좁히는 과정과 처음 보는 코드베이스의 컨벤션에 맞춰 승인되는 테스트를 쓰는 일이었고, 테스트는 91줄이 됐습니다. 호출 한 줄을 더하면 지금은 맞지만 다음에 누군가 실행 경로를 하나 더 만들면 같은 일이 반복되기 때문에, autoplan 경로가 병합 상태를 조회한다는 사실 자체를 테스트로 고정해두는 편이 낫다고 판단했습니다.\n\n돌아보면 처음 보는 언어였던 것이 오히려 도움이 됐습니다. 안다고 생각했다면 건너뛰었을 코드를 한 줄씩 읽어야 했고, IsMergeable이 어디서도 세팅되지 않는다는 사실은 그 과정에서 발견했습니다.',
            role: 'Open Source Contributor',
            tech: ['Golang', 'Atlantis', 'Terraform', 'Git'],
            features: [
              'Go를 처음 다루는 상태에서 1주 10시간 투입 (문법 3h · 경로 추적 2h · CNCF 슬랙 논의 3h · 수정과 테스트 2h)',
              '원인: runAutoplan() 경로에 FetchPullStatus() 호출 누락, IsMergeable이 Go zero value인 false로 고정',
              '프로덕션 10줄 · 테스트 91줄. 두 실행 경로가 다시 어긋나는 것을 막는 회귀 테스트를 우선',
              '2026.03.26 머지, Atlantis v0.41.0 포함. 리뷰어 lukemassa · jamengual',
              '3년 가까이 열려 있던 이슈 #3486 종료. 사내에서는 안전장치를 끄지 않은 채 GitOps 유지'
            ]
          },
          links: {
            demo: null,
            github: 'https://github.com/runatlantis/atlantis/pull/6186'
          }
        },
        {
          id: 7,
          title: 'NanoGrid: 관리형 FaaS의 제약을 걷어낸 함수 실행 플랫폼',
          category: 'DevOps & Infra',
          image: null,
          description: '관리형 FaaS가 정해둔 실행 시간 상한과 런타임 제약, 추론 데이터의 외부 반출을 EC2 위에서 걷어낸 함수 실행 플랫폼. 대가로 직접 떠안은 확장성은 콜드 스타트를 세 층으로 나눠 해결했습니다. 실행 단위 3초에서 0.2초, 서버는 평소 2대 비용만 내면서 5대까지 바로 늘릴 수 있게 준비해 두었습니다 (SoftBank Hackathon 본선)',
          how: "후행 지표인 CPU 대신 SQS 큐 깊이를 스케일링 기준으로 삼고, 요청마다 생성하던 컨테이너를 런타임별 풀에서 재사용하도록 전환했습니다.",
          details: {
            problem: 'HTTP 요청 처리를 EC2 위에서 해야 한다는 제약 아래 Lambda가 대신 해주던 일을 직접 만들어야 했습니다. 함수 업로드, HTTP 호출, 즉시 실행을 관리형 FaaS 없이 구현하면서 확장성을 스스로 책임져야 했습니다.',
            solution: '먼저 기존 FaaS의 한계가 EC2 위에서 풀리는지 따졌습니다. API Gateway 29초 타임아웃, 런타임 제약, 벤더 락인, 추론 데이터 외부 유출은 풀리고 확장성만 나빠지는 구조였습니다. 익숙한 API Gateway와 Dispatcher Lambda로 6시간 만에 프로토타입을 띄웠지만 요청 경로에 API Gateway가 남는 구성이라 걷어내고 ALB와 EC2 Controller로 전환해 실행 시간 상한을 없애고 컴퓨트가 앉을 서브넷을 직접 정할 수 있게 만들었습니다. 남은 확장성 문제를 파고들며 콜드 스타트가 실행 단위, 워커 인스턴스, 스케일링 판단이라는 서로 다른 시간 규모의 세 층이라는 것을 확인하고 각각에 다른 도구를 적용했습니다. 임의의 사용자 코드를 실행하는 플랫폼이라 Zip Slip 차단, 컨테이너 리소스 쿼터, 작업별 타임아웃, IAM 최소 권한, WAF 룰 5종을 함께 붙였습니다.',
            role: 'Infrastructure & Security',
            tech: ['AWS EC2', 'ALB', 'Auto Scaling Warm Pool', 'AWS SQS', 'AWS S3', 'DynamoDB', 'ElastiCache Redis', 'AWS WAF', 'Terraform', 'Docker', 'Prometheus', 'Ollama', 'GCP Cloud Storage'],
            features: [
              '① 실행 단위: 런타임별(Python, Node.js, C++, Go) 컨테이너 풀을 미리 띄워 요청마다 만들지 않고 빌려 쓰고 반납. 3초 → 0.2초. Prometheus worker_job_duration_seconds 히스토그램으로 전후 분포 이동을 측정',
              '② 워커 인스턴스: EC2 Auto Scaling Warm Pool로 인스턴스를 정지 상태로 대기. InService 2대 + Warm Pool 3대로 상시 2대 비용에 ASG 최대 5대분 확장 준비. 정지 상태는 컴퓨트 미과금, EBS만 청구',
              '③ 스케일링 판단: CPU 대신 SQS 큐 깊이 기준. CPU는 사후 지표라 임계값에 닿을 땐 이미 사용자가 지연을 겪은 뒤. Backlog per Instance와 Step Scaling으로 과잉 프로비저닝 방지',
              '부하 테스트: 피보나치 1만 건 약 11초 (동일 워크로드 Lambda 30~40초). 개별 실행이 밀리초인 워크로드에서 실행 환경 할당 오버헤드가 전체 시간을 지배',
              '보안: 워커 IAM을 관리형 SQS FullAccess에서 큐 하나의 3개 액션으로 축소해 폭발 반경을 계정 전체에서 단일 큐로 제한. WAF 룰 5종(SQLi, XSS, Log4j, 레이트 리밋, 바디 상한)',
              '네트워크: Multi-AZ 구성, Controller는 퍼블릭 서브넷 2 AZ, Worker는 프라이빗 서브넷. 둘을 잇는 건 SQS 하나뿐. S3와 DynamoDB에 Gateway VPC Endpoint를 붙여 NAT 우회',
              'Private AI Node: 프라이빗 서브넷에 Ollama 배치, 인터넷 경로와 퍼블릭 주소 없이 워커 SG에서만 접근 허용해 추론 데이터가 VPC 밖으로 나가지 않도록 구성',
              '멀티 클라우드 이중화: 진행 기간 중 AWS 한 리전의 화재로 실제 장애를 겪고, 한 벤더에 묶이면 대응 수단이 없다는 것을 확인해 GCP Cloud Storage로 데이터를 복제했습니다',
              '이틀간 AWS 비용 약 3만 원'
            ]
          },
          links: {
            demo: null,
            github: 'https://github.com/Softbank-Final',
            article: 'https://builder.aws.com/content/3I2Mw8lAM0x9sODvAwmHN8RylXM/building-a-faas-on-ec2-without-lambda-and-splitting-cold-start-into-three-layers'
          }
        },
        {
          id: 9,
          title: 'Deploy Land: 배포 과정을 게임 화면으로 보여주는 CI/CD 플랫폼',
          category: 'DevOps & Infra',
          image: null,
          description: '배포라는 행위 자체를 즐겁게 만든 서버리스 CI/CD 플랫폼. 로그만 흐르던 화면을 캐릭터가 파이프라인을 뛰어가는 게임 화면으로 바꿔 배포 상태를 실시간 공유',
          how: "파이프라인 성공 응답만으로 배포 성공을 판정하지 않고, 배포 후 헬스 상태와 HTTP 200 응답을 재검증해 미통과 시 실패로 처리했습니다.",
          details: {
            problem: '배포 상태가 로그로만 흘러 개발자 외에는 지금 어디까지 왔는지 알 수 없었고, 실패해도 즉각 인지가 어려웠습니다. 파이프라인의 성공 응답만으로는 배포된 서비스가 실제로 응답하는지 알 수 없었습니다.',
            solution: '배포를 지켜보는 일을 게임으로 만들었습니다. GitHub Push부터 Build, Deploy, Health Check까지의 상태를 캐릭터가 파이프라인 단계를 뛰어가는 화면으로 실시간 공유합니다. CodePipeline과 CodeBuild, Elastic Beanstalk의 상태 변화를 EventBridge가 잡아 Lambda로 DynamoDB에 기록하고, Amplify 모니터링 앱이 이를 읽어 그립니다. 파이프라인이 성공을 반환해도 그것을 최종 성공으로 보지 않고, 배포 후 Elastic Beanstalk 환경 헬스와 실제 HTTP 200 응답을 다시 확인해 통과하지 못하면 실패로 뒤집습니다. 실패 로그는 Bedrock으로 원인을 요약하되 호출 제한(ThrottlingException)에는 지수 백오프로 최대 3회 재시도하고, Discord·Slack으로 즉시 알립니다. Infra와 Backend를 맡아 Terraform 인프라와 Lambda API를 구현했습니다.',
            role: 'Infra & Backend',
            tech: ['AWS CodePipeline', 'AWS CodeBuild', 'Elastic Beanstalk', 'AWS Lambda', 'Amazon EventBridge', 'DynamoDB', 'Amazon Bedrock', 'AWS Amplify', 'Terraform'],
            features: [
              '캐릭터가 파이프라인 단계를 뛰어가는 게임형 실시간 배포 모니터링',
              'GitHub Push → Build → Deploy → Health Check 전 과정 자동화',
              'EventBridge → Lambda → DynamoDB로 상태를 기록하고 DynamoDB Streams가 Health Check Lambda를 다시 호출하는 2단 구조',
              '파이프라인 성공 후 EB 환경 헬스와 HTTP 200을 재확인해 미통과 시 실패로 판정, Bedrock 실패 로그 요약 (Throttling 시 지수 백오프 재시도)',
              'Discord·Slack Webhook 즉시 알림, Terraform IaC 인프라 관리'
            ]
          },
          links: {
            demo: null,
            github: 'https://github.com/Deploy-Land'
          }
        },
        {
          id: 3,
          title: 'Notion + FLEX: 업무량 모니터링 체계 구축 및 운영',
          category: 'AX 업무자동화',
          image: null,
          description: 'Notion 업무 기록과 FLEX 근태 데이터를 이어, 팀별로 휴가와 실제 업무 기록, 생산성에 영향을 주는 정도를 판단하는 지표 체계와 모니터링을 구축하고 운영. 일 200건 이상 업무를 LLM으로 13개 업무유형, 14개 미팅유형으로 자동 분류',
          how: "같은 업무명도 로드맵에 따라 성격이 달라지는 점을 고려해, 로드맵 판정 후 유형을 나누는 2단계 LLM 분류로 팀별 업무량을 집계했습니다.",
          details: {
            problem: '업무가 여러 Notion DB에 흩어져 있어 조직 구성원의 시간이 실제로 어디에 들어가는지 집계할 수 없었습니다. 수동 분류는 사람마다 기준이 달라 같은 성격의 일이 다른 유형으로 쌓였고, 그 위에 어떤 지표를 올려도 신뢰하기 어려운 상태였습니다.',
            solution: '분산된 Notion 태스크 데이터를 통합하고 Gemini 2.5 Flash 기반 계층적 분류를 적용해 13개 업무유형과 14개 미팅유형으로 자동 배정했습니다.\n\n계층적 분류를 택한 이유는 정확도입니다. 단일 프롬프트에 제목만 주고 13개 중 하나를 고르라고 하면 정확도가 떨어집니다. 같은 제목이라도 어떤 로드맵에 속한 일이냐에 따라 유형이 달라지기 때문입니다. 그래서 로드맵 성격을 먼저 판정하고 그 결과를 컨텍스트로 넣어 태스크를 분류하는 2단 구조로 갔습니다. LLM 호출이 늘어나는 비용을 지불하고 정확도를 산 셈인데, 하루 한 번 도는 배치라 지연은 문제가 되지 않았습니다.\n\nFlash를 택한 이유는 운영비입니다. 하루 200건 이상을 매일 도는 배치에서는 모델 단가가 그대로 운영비가 됩니다. 분류는 추론 난이도가 높은 작업이 아니라 판단 기준의 일관성이 중요한 작업이라, 상위 모델을 쓰는 것보다 프롬프트와 계층 구조에 투자하는 편이 비용 대비 효과가 낫다고 판단했습니다.\n\n결과를 Apollo Federation Subgraph로 분리한 이유는 재사용입니다. 분류 결과를 이 파이프라인 안에만 두면 다른 기능에서 같은 계산을 다시 하게 되어, GraphQL Subgraph로 노출해 사내 다른 서비스가 조회하도록 했습니다.',
            role: 'AX Engineer',
            tech: ['Gemini 2.5 Flash', 'Python', 'Argo Workflows', 'Apollo Federation', 'GraphQL', 'Notion API'],
            features: [
              '로드맵 성격 판정 후 태스크를 분류하는 2단 계층 구조로 단일 프롬프트 대비 정확도 확보',
              '하루 200건 이상을 Argo CronWorkflow로 매일 정기 처리',
              '사내 검수 기준 분류 정확도 91.7%. 다만 표본 구성과 다수 클래스 베이스라인이 정리되지 않은 내부 측정치라 수동 분류 대비 개선이라는 방향까지만 주장합니다',
              '배치 운영비를 이유로 상위 모델 대신 Flash를 선택하고 프롬프트와 계층 구조에 투자',
              '분류 결과를 Apollo Federation Subgraph로 분리해 사내 다른 서비스가 재계산 없이 조회'
            ]
          },
          links: {
            demo: null,
            github: null
          }
        },
        {
          id: 4,
          title: '생산성 지표 체계 구축',
          category: 'AX 업무자동화',
          image: null,
          description: '「무엇을 배포로 셀지」를 팀마다 합의해 문서로 고정하고, 배포 빈도와 실패율 같은 지표를 매일 자동으로 냅니다. 정성으로만 말하던 생산성을 숫자로 증명하게 되어 사내 AX 전환의 주요 지표로 씁니다.',
          how: "변경량에 불과한 커밋 수와 조작이 쉬운 토큰 사용량을 배제하고, 팀별로 합의한 유효 배포만 생산성 지표로 인정했습니다.",
          details: {
            problem: '지금 모두가 에이전틱 AI로 생산성이 올랐다고 말합니다. 그런데 "그래서 얼마나 올랐나요"라는 질문에 답할 수 있는 곳은 거의 없습니다. 개인의 생산성은 실제로 달라지고 있는데 조직 차원에서 그것을 점검할 방법이 없었고, 원인은 도구가 아니라 데이터가 놓인 위치였습니다. 업무는 Notion 태스크에, 배포는 릴리스 문서에, 장애는 또 다른 DB에 남아서 하나의 기준으로 이어붙는 곳이 없었습니다.',
            solution: '측정의 출발점으로 Notion을 골랐습니다. 측정을 시작할 때 가장 흔한 실수는 측정 전용 도구부터 들이는 일이라고 봅니다. 새 도구를 넣으면 사람들이 거기에 데이터를 넣어줘야 하고 그 순간 측정이 또 하나의 업무가 됩니다. 이미 모두가 매일 쓰고 있는 곳에서 뽑아내는 편이 정착 확률이 훨씬 높다고 판단했습니다.\n\n다음은 무엇을 생산성으로 볼 것인가였습니다. CTO께서 DevOps 지표인 DORA를 생산성 지표로 삼자는 방향을 제시해주었고, 저는 그 방향을 실제로 측정 가능한 구조로 만드는 일을 맡았습니다. 레퍼런스를 찾아보니 깃 커밋과 배포 이력을 세는 방식과 토큰 사용량을 세는 방식이 있었는데, 코드 변경량이 많은 것을 생산성이라 부를 수 없고 토큰 사용량은 개개인이 조작하기 쉬워 둘 다 부족하다고 봤습니다. 의미 있는 배포로 이어져야 생산성으로 인정한다는 기준을 세웠습니다.\n\n그 기준을 제가 혼자 정하지는 않았습니다. 기준을 혼자 정하면 각 팀은 자기 일과 맞지 않는다고 느끼고, 그렇게 되면 지표 자체를 신뢰하지 않습니다. 팀마다 따로 이야기해 배포 기준을 합의하고 문서로 고정하는 데 시간을 더 썼습니다.\n\n기준 충족 여부 검수는 사람이 눈으로 보는 대신 Notion 커스텀 에이전트가 판단하게 했습니다. 사람이 하는 검수는 초기에는 정확하지만 반복되면 형식화됩니다. 에이전트 검수는 개별 판단의 정확도가 사람보다 낮을 수 있어도 기준이 흔들리지 않고, 지표에서는 일관성이 개별 정확도보다 중요하다고 봤습니다. 릴리스에 연결되지 않은 TASK를 찾아 매핑하는 일도 에이전트에 맡겨 릴리스 문서 자체가 지표의 원천이 되게 했습니다. 배포가 끝나면 측정도 함께 끝납니다. 측정이 별도 작업으로 남아 있으면 바쁠 때 가장 먼저 밀리고, 밀린 데이터로 만든 지표는 신뢰를 잃습니다.\n\n측정 전용 SaaS를 붙이는 선택지도 있었지만 우리 조직의 배포 정의는 이미 Notion 릴리스 문서 안에 있었습니다. 외부 도구를 붙이면 그 도구의 배포 정의에 우리를 맞춰야 하고, 그러면 팀과 합의한 기준이 무의미해집니다.',
            role: 'AX Engineer. DORA 채택 방향은 CTO 제시, 측정 구조 설계와 구현이 담당 범위',
            tech: ['Python', 'Notion API', 'Notion Custom Agent', 'Argo Workflows', 'SQLite', 'Grafana'],
            features: [
              '팀별 배포 기준을 각 팀과 합의해 문서로 고정, 산출 기준으로 사용',
              'Deploy Frequency · Lead Time to Changes · Change Fail Rate · MTTR 매일 자동 산출, 크루·리더 대시보드에서 같은 화면으로 공유',
              '릴리스 문서 자체를 지표 원천으로 삼아 배포가 끝나면 측정도 함께 끝나는 구조',
              '이 지표가 R&R 논의와 1on1 대화 소재로 사용됨. 리포트로만 남는 지표와 갈리는 지점',
              '릴리스 문서 기준 배포 건수는 구축 이전 한 달 대비 16% 증가. 다만 계측 시스템이 측정 기간 중에 들어왔고 이전 값은 수동 집계라 완전히 같은 기준은 아닙니다'
            ]
          },
          links: {
            demo: null,
            github: null
          }
        },
        {
          id: 5,
          title: 'Spin Framework 오픈소스 예제 수정 기여',
          category: '오픈소스',
          image: null,
          description: 'Spin Framework Python SDK의 Postgres 예제가 쿼리 결과를 반환하지 않던 문제를 다른 사용자의 이슈(#115)를 받아 수정, 머지 (PR #124). 예제 문서 오류 2건 추가 수정 (#126, #128)',
          how: "Python 예제만 결과를 로그로 출력하고 고정 문자열을 반환하던 문제를, 다른 언어 SDK와 같이 쿼리 결과를 표 형태로 응답하도록 수정했습니다.",
          details: {
            problem: 'spin-postgres 예제가 쿼리 결과를 서버 로그로만 출력하고 HTTP 응답에는 고정 문자열을 반환해, 예제를 따라 해도 Postgres 결과를 확인할 수 없었음',
            solution: 'Spin의 Postgres 바인딩이 값을 래퍼 객체로 돌려주는 점에 맞춰 format_value, format_rowset 헬퍼를 추가해 컬럼명과 행을 표 형태로 응답 본문에 반환하도록 고쳤습니다. 예제가 전제하는 test 테이블의 생성 SQL을 README에 추가해 그대로 따라 하면 실행되게 했습니다.',
            role: 'Open Source Contributor',
            tech: ['Python', 'WebAssembly', 'Spin Framework', 'Git'],
            features: [
              'PR #124: 다른 사용자가 올린 이슈 #115 해결, 2025.12.15 머지',
              'format_value, format_rowset 헬퍼로 쿼리 결과를 HTTP 응답에 표 형태로 반환',
              'README에 예제용 test 테이블 생성 SQL 추가',
              'PR #126, #128: 예제 README 제목 오류와 오타 수정 (본인 제기 Issue #125, #127)'
            ]
          },
          links: {
            demo: null,
            github: 'https://github.com/spinframework/spin-python-sdk/pull/128'
          }
        },
        {
          id: 6,
          title: 'IoT 로그 파이프라인 계층별 런타임 할당 (WebAssembly vs 컨테이너)',
          category: 'DevOps & Infra',
          image: null,
          description: 'AKS 1.34 실환경에서 동일 Go 워크로드를 SpinKube Wasm과 컨테이너로 구현해 계층별 실측한 학술 논문. Wasm 벤더가 주장한 콜드스타트 이점이 운영 스택을 지나며 어디까지 희석되는지 검증',
          how: "벤더 마이크로벤치마크에 의존하지 않고 동일한 Go 워크로드를 Wasm과 컨테이너로 실측해, 단일 런타임 대신 계층별 할당 기준을 제안했습니다.",
          details: {
            problem: 'Wasm 런타임 벤더는 컨테이너 대비 콜드스타트 약 400배, Pod 밀도 43배 우위를 주장하지만 이 수치는 격리된 마이크로벤치마크에서 나온 값이다. 쿠버네티스 운영 스택(shim·SDK·HTTP 계층)을 통과한 종단 경로에서도 같은 이점이 남는지는 검증되지 않았다.',
            solution: 'IoT 로그 파이프라인을 Edge·Transform·Ingestion·Storage 네 계층으로 모델링하고, 그중 세 계층을 동일한 Go 워크로드의 SpinKube Wasm 모듈과 scratch 컨테이너로 각각 구현해 Azure Kubernetes Service(AKS 1.34) 위에서 실측 비교했습니다. 언어와 비즈니스 로직, 부하 조건을 통제해 런타임 차이만 격리 측정했고, Shapiro-Wilk 정규성 검정 후 Welch t 검정 또는 Mann-Whitney U 검정을 자동 선택해 확정적 10개 지표군에 Bonferroni 보정을 적용했습니다. 그 결과 벤더가 제시한 런타임 수준의 정량 이점은 실제 운영 스택을 지나며 크게 희석되고, 계층마다 유리한 런타임이 상반된다는 점을 확인해 단일 런타임 선택이 아닌 계층별 할당을 제안했습니다. 이에 앞선 선행 실험에서는 Python Wasm의 연산 한계를 Rust 네이티브 Wasm 마이그레이션으로 해결해 바이너리 91배 감소(35.86MB→0.39MB)와 처리량 7.8배 향상을 확보했습니다.',
            role: '학부연구생 (CSDC Lab 개별연구, 단독 수행)',
            tech: ['SpinKube', 'WebAssembly', 'WASI', 'Rust', 'Go', 'Azure AKS', 'KEDA', 'Kubernetes', 'containerd-shim-spin', '통계 검정'],
            features: [
              '런타임 실측 0.436ms로 벤더 주장(0.5ms)과 통계적으로 구별되지 않음(p=0.71). 다만 전체 요청 경로 1.55ms 중 런타임 비중은 28%, 나머지 72%는 쿠버네티스·shim·SDK·HTTP 계층',
              'Ingestion 계층은 컨테이너 우세: 24~28K rps 유지 vs Wasm 약 1,264 rps 한계 (19~22배)',
              'Transform 계층은 Wasm 우세: 컨테이너는 테넌트당 격리 강제 시 약 41 Pod에서 한계, Wasm 공유 풀은 8,000 테넌트 무손실. 테넌트당 비용 최대 64배 저렴 ($4.69 → $0.07)',
              'Edge 계층은 Wasm 우세: scale-from-zero 콜드스타트 11배 빠름, arm64 빌드 컨테이너가 amd64 노드에서 실패한 반면 동일 Wasm 모듈은 cross-arch 이식 성공',
              '선행 실험: Python Wasm → Rust 네이티브 Wasm 마이그레이션으로 바이너리 35.86MB → 0.39MB(91배), 처리량 1,713 → 13,389 req/s(7.8배)',
              'Threats to Validity 6건 명시 (6 vCPU free-tier 클러스터 한계, 단일 Go 워크로드, 측정 도구 기준 차이 등)'
            ]
          },
          links: {
            demo: null,
            github: null,
            papers: [
              { label: '논문 · 계층별 런타임 할당 (AKS 실측)', url: '/assets/wasm-spinkube-iot-layer-allocation.pdf' },
              { label: '선행 실험 자료 · 런타임 비교와 Rust 최적화', url: '/assets/wasm-spinkube-runtime-comparison.pdf' }
            ]
          }
        },
        {
          id: 8,
          title: 'Roomeya: 서버리스 기숙사 매칭 서비스',
          category: 'DevOps & Infra',
          image: null,
          description: '시즌별 기숙사 매칭 서비스. AWS 풀 서버리스 아키텍처 + Terraform IaC (Lambda 9개, Step Functions, DynamoDB)',
          how: "시즌성 트래픽에 맞춰 Lambda와 DynamoDB 온디맨드로 구성하고, 사용량 계획이 불필요해 REST API 대신 HTTP API v2를 선택했습니다.",
          details: {
            problem: '시즌별 운영 특성에 따른 유휴 비용 발생과 매칭 워크플로우 복잡성',
            solution: 'Lambda 9개 함수, Step Functions 매칭 워크플로우, DynamoDB 4개 테이블, API Gateway(HTTP API v2), Cognito OAuth 2.0 인증, SES 이메일 발송까지 전체 인프라를 Terraform으로 코드화했습니다. Lambda와 DynamoDB 온디맨드(PAY_PER_REQUEST)만 써서 쓰지 않는 기간의 리소스 비용은 0원입니다. 설문 수집, 매칭 연산, 결과 통보로 이어지는 흐름이 어디서 끊겼는지 보이도록 매칭 워크플로를 Step Functions에 두어 실행 이력을 콘솔에서 확인하게 했고, 사용량 계획과 요청 검증이 필요 없어 REST API 대신 비용과 지연이 낮은 HTTP API v2를 골랐습니다. 비시즌에 리소스를 내리고 시즌에 다시 세울 수 있도록 전부 Terraform으로 남겼습니다.',
            role: 'Cloud Architect',
            tech: ['Terraform', 'AWS Lambda', 'AWS Step Functions', 'DynamoDB', 'API Gateway', 'Cognito'],
            features: [
              'Lambda 9개 함수 + Step Functions 매칭 워크플로우',
              'DynamoDB 4개 테이블 (Forms, FormResponses, Results, Students)',
              'Cognito OAuth 2.0 인증 + API Gateway HTTP API',
              'Lambda와 DynamoDB 온디맨드 구성으로 쓰지 않는 기간의 리소스 비용 0원',
              'Terraform으로 전체 인프라 코드화'
            ]
          },
          links: {
            demo: null,
            github: 'https://github.com/Roomeya'
          }
        },
        {
          id: 10,
          title: 'Terraform 권한 설정 보안 분석기 (개별연구)',
          category: 'Security',
          image: null,
          description: 'Terraform IAM 리소스 관계를 그래프로 만들고 시간과 서비스 목적 컨텍스트를 함께 보는 보안 분석기. 규칙 기반 스캐너가 놓치는 만료 계정, 미사용 계정, 목적 불일치를 탐지',
          how: "기존 스캐너를 대체하기보다 보완하는 방향으로, IAM 관계를 그래프로 모델링하고 만료일과 서비스 목적은 규칙 기반으로 분석해 Checkov 결과와 병합했습니다.",
          details: {
            problem: '규칙 기반 정적 분석 도구(TFSec, Checkov)는 패턴에 걸리는 것만 잡아, 개별 리소스는 정상이지만 연결하면 위험해지는 구성과 만료 계정 같은 시간 기반 위험을 놓침',
            solution: 'python-hcl2로 Terraform을 파싱해 IAM 리소스 관계(assume_role, pass_role 등 7종)를 NetworkX 그래프로 만들고, 위험 IAM 액션 17종 사전과 액션 조합 매칭으로 권한 상승 경로를 판정했습니다. 계정의 만료일과 마지막 사용일, 서비스 목적과 부여된 권한을 함께 비교해 규칙 기반 스캐너가 구조적으로 못 보는 위험을 잡습니다. 기존 도구를 대체하지 않고 보완하도록 Checkov 결과를 병합하는 모듈을 두었고, BERT(bert-base-uncased) 임베딩 유사도 모듈도 구현했습니다.',
            role: 'Security Researcher & Developer',
            tech: ['Python', 'BERT', 'Terraform', 'NetworkX', 'AWS IAM', 'Hugging Face', 'NLP'],
            features: [
              '만료 계정, 미사용 계정, 목적 불일치, 시간 기반 위험처럼 TFSec과 Checkov가 탐지하지 않는 유형을 탐지',
              'IAM 관계 그래프 위에서 위험 액션 17종 사전과 액션 조합 매칭으로 권한 상승 경로 판정',
              'Checkov 결과 병합으로 기존 스캐너와 상호 보완',
              '탐지 기능 동작을 유닛 테스트 11건으로 고정'
            ]
          },
          links: {
            demo: null,
            github: 'https://github.com/Gosorasora/NLP-Enhanced-IaC-Security-Analyzer'
          }
        },
        {
          id: 11,
          title: 'AWS 클라우드 마이그레이션 (CAPS 동아리)',
          category: 'DevOps & Infra',
          image: null,
          description: '2022년, 누가 시키지 않았지만 동아리 서버를 물리 PC에서 AWS로 직접 이전. 정전과 재부팅에 멈추던 서비스를 상시 운영하고 학교 밖에서도 관리',
          how: "정전과 재부팅에 취약하고 현장 관리가 필요했던 동아리 서버를 2022년 자발적으로 AWS로 이전해, 원격 운영이 가능한 구조로 바꿨습니다.",
          details: {
            problem: '물리 PC로 돌리던 동아리 서버가 정전과 재부팅에 그대로 노출되고, 관리자가 학교에 있어야만 손을 댈 수 있던 문제',
            solution: '동아리 서버를 AWS로 옮겨 정전과 재부팅의 영향을 없애고 학교 밖에서도 관리할 수 있게 해 24/7 서비스 가용성을 확보했습니다.',
            role: 'Cloud Architect',
            tech: ['AWS EC2', 'AWS EBS', 'AWS S3', 'AWS RDS', 'Docker'],
            features: [
              'AWS 클라우드 전체 마이그레이션',
              '24/7 서비스 가용성 확보',
              '정전, 재부팅 영향과 현장 관리 필요성 제거',
              'Docker 기반 컨테이너화'
            ]
          },
          links: {
            demo: null,
            github: null
          }
        },
        {
          id: 12,
          title: 'LLM 비용 라벨링 체계 구축',
          category: 'DevOps & Infra',
          image: null,
          description: 'LLM 호출마다 어느 회사 모델을 어떤 용도로 썼는지 표시를 붙여, 용도별 지출을 추적하고 한도를 넘으면 알림이 가게 했습니다.',
          how: "AI 사용 확대에 앞서 비용 가시성을 확보하고자, 사내 LLM 서버 코드에 벤더와 용도 라벨을 적용해 지출을 분리 추적했습니다.",
          details: {
            problem: '사내 LLM 사용이 늘면서 어떤 벤더·기능에 비용이 발생하는지 추적할 수 없어 비용 관리가 어려운 상황',
            solution: '사내 LLM 서버 코드에 벤더·용도 기반 라벨링 방식을 추가하여 Vertex AI, AI Studio, OpenAI 등 벤더별 LLM 지출을 모니터링할 수 있는 기반을 마련했습니다. AI 사용을 늘리기 전에 용도별 지출이 먼저 보여야 한다고 판단해 진행한 작업입니다. 입사 초기 과제로 진행하며 사내 코드 규칙과 GQL 컨벤션을 빠르게 익히는 계기가 되었습니다.',
            role: 'AX / Platform Engineer',
            tech: ['GraphQL', 'Cost Monitoring', 'FinOps'],
            features: [
              '벤더별(Vertex AI·AI Studio·OpenAI) LLM 비용 라벨링',
              '사용량 모니터링 환경과 임계치 기반 Alert 시스템 구축',
              'LLM 비용 추적 라벨링 작성 가이드 문서화'
            ]
          },
          links: {
            demo: null,
            github: null
          }
        },
        {
          id: 15,
          title: '인바운드 리드 SLA 체계 구축',
          category: 'Platform Engineering',
          image: null,
          description: '접수 → 담당자 배정 평균 33.6시간을 0.4시간으로 단축 (98.7% 단축). 「응답」의 기준을 정하는 일부터 영업시간 기준 측정, 알림, 오래 방치된 문의를 윗선에 넘기는 절차까지 만들었습니다.',
          how: "고객이 체감하는 응답은 첫 컨택이라는 점에서 배정 시각과 첫 컨택을 함께 측정하고, 개선 전후를 동일한 영업시간 기준으로 비교했습니다.",
          details: {
            problem: '상반기 사내 리드 응답은 1시간 내 응답 45.5%, 평균 응답 4.3시간, 9시간 초과 방치 4건이었습니다. 초기 대응이 늦을수록 상담 전환이 떨어져 그대로 영업 기회 손실로 이어지는 상태였습니다.',
            solution: '그전까지 제가 다룬 문제는 대부분 코드와 인프라 안에 있었는데 이번은 문제가 영업 조직의 업무 흐름 안에 있었고 저는 그 도메인을 전혀 몰랐습니다. 코드를 더 잘 짜서 풀 수 있는 문제가 아니라고 보고, 설계를 먼저 하지 않고 영업 담당자들의 실제 업무를 따라가며 물었습니다. 왜 이 리드는 연락이 늦었는지, 알림을 보고도 못 움직인 이유가 무엇인지, 주말에 온 문의는 어떻게 처리하는지를 하나씩 들었고 그 대화에서 지금의 설계가 나왔습니다.\n\n가장 어려웠던 것은 응답을 무엇으로 정의할 것인가였습니다. 시스템 관점에서는 담당자가 배정된 시각이 자연스럽고 영업 관점에서는 실제로 고객과 통화가 닿은 시각입니다. 이 정의 하나로 지표가 완전히 달라지고 팀이 무엇을 개선할지도 달라집니다. 담당자 배정만 세면 숫자는 훨씬 좋아 보이지만, 두 지표를 모두 남기고 더 불리한 첫 고객 컨택 기준을 버리지 않기로 했습니다. 고객 입장에서 응답은 전화를 받은 순간이기 때문입니다. 유리한 기준으로 갈아타는 순간 지표는 개선 도구가 아니라 보고용 숫자가 됩니다.\n\nSLA는 영업시간 기준으로만 재도록 했습니다. 금요일 저녁에 온 문의를 월요일 아침에 받은 것까지 지연으로 세면 지표가 현실과 어긋나고, 어긋난 지표는 결국 아무도 보지 않습니다. 알림도 담당자가 실제로 대응할 수 있는 시간대에만 가도록 바꿨습니다. 알림을 늘리면 대응이 빨라질 것 같지만 대응할 수 없는 시간에 오는 알림은 알림 자체를 무시하게 만듭니다. 대신 방치된 리드에는 에스컬레이션이 걸리게 했고, 실시간 모니터링 화면을 만들어 담당자들이 같은 화면을 보게 했습니다.\n\n측정을 왜곡시키는 경로도 함께 걷어냈습니다. 도입 문의 폼 이메일 리드가 백오피스로 이중 인입되던 것을 제거했고, 리드를 수정하면 접수 시간이 초기화되던 문제를 고쳤으며, 변경 이력을 상세화하고 과거 데이터를 백필했습니다. 이 작업을 하지 않으면 개선 전후를 같은 기준으로 비교할 수 없습니다.\n\n2주 동안 업무시간 기준 약 55시간을 썼고 필요성 검토와 기획, 영업팀 인터뷰, SLA 정의 문서 작성, 실시간 모니터링 화면과 알림·에스컬레이션 구현, QA까지 직접 끝냈습니다. 그중 순수 개발보다 무엇을 어떻게 셀 것인가를 합의하고 문서로 못 박는 데 더 많은 시간이 들어갔습니다.',
            role: 'DevOps Engineer',
            tech: ['Notion', '사내 백오피스', 'SLA 지표 설계', '알림·에스컬레이션', '과거 데이터 백필'],
            features: [
              '배정 지표: 리드 접수에서 담당자 배정까지 평균 33.6시간 → 0.4시간(약 26분), 1시간 내 담당자 배정 비율 9% → 86%',
              '응답 지표(첫 고객 컨택)는 아직 목표 미달. 유리한 기준으로 갈아타지 않기 위해 불리한 쪽을 함께 유지 중',
              '영업시간 기준 SLA 자동 측정 (주말·공휴일·업무시간 외 제외), 개선 전후 동일 기준으로 계산',
              '대응 가능 시간대 알림 + 방치 리드 에스컬레이션 + 실시간 모니터링 화면',
              '이중 인입 제거, 접수 시간 초기화 버그 수정, 변경 이력 상세화와 백필로 측정 왜곡 제거'
            ]
          },
          links: {
            demo: null,
            github: null
          }
        },
        {
          id: 13,
          title: 'Notion: 배포 검수 에이전트와 릴리스 데이터 정합성',
          category: 'AX 업무자동화',
          image: null,
          description: '팀별 배포 기준을 정립하고 에이전트로 배포 품질을 자동 검수, 배포와 연결되지 않은 작업을 찾아 이어 붙여, 배포 기록과 업무 기록이 어긋나지 않게 했습니다.',
          how: "반복되는 수작업 검수는 형식화되기 쉽다고 판단해, 개별 판단의 정확도보다 기준의 일관성을 우선하는 커스텀 에이전트에 검수를 위임했습니다.",
          details: {
            problem: '배포 품질 점검과 릴리스 기준이 사람에 의존해 누락·편차가 발생하고, 릴리스와 TASK 연결이 수작업으로 관리되던 문제',
            solution: 'Notion 커스텀 에이전트와 팀별 배포 기준 문서·프롬프트를 정립하여 배포 품질을 자동 점검하는 체계를 구축했습니다. 릴리스에 연결되지 않은 TASK를 자동 매핑하는 봇도 함께 만들고, 앞서 구축한 DORA 점수 리포트 또한 커스텀 에이전트로 완전 자동화했습니다. 사람이 하는 검수는 초기에는 정확하지만 반복되면 형식화되어 기준이 흔들리기 때문에, 개별 판단의 정확도보다 같은 기준을 계속 적용하는 쪽을 택해 에이전트에 맡겼습니다.',
            role: 'AX Engineer',
            tech: ['Notion Custom Agent', '프롬프트 엔지니어링', 'Notion API'],
            features: [
              '에이전트 기반 배포 품질 자동 점검',
              '릴리스 연관 태스크 자동 추적·연결',
              '팀별 배포 기준 문서·프롬프트 정립',
              'DORA 점수 리포트 완전 자동 발행'
            ]
          },
          links: {
            demo: null,
            github: null
          }
        },
        {
          id: 14,
          title: 'Notion: 캘린더 기반 회의록 자동 생성 에이전트',
          category: 'AX 업무자동화',
          image: null,
          description: '캘린더 일정이 끝나면 정해진 양식의 회의록이 자동으로 만들어지게 했고, 지금은 전사에서 씁니다.',
          how: "전용 서버는 규모 대비 과하다고 판단해 서버리스인 Notion Workers를 채택하고, 배포 이후 실사용을 위해 팀별 도입을 지원했습니다.",
          details: {
            problem: '주최자가 회의록을 직접 만들어 생성 시점이 회의마다 달랐고, 미리 만들어지지 않으면 논의할 내용을 주최자가 만들 때까지 다른 곳에 두어야 했던 문제. 애자일 회고에서도 반복 수작업으로 지적됨',
            solution: 'Notion Workers(서버리스)를 활용해 캘린더 일정에서 구조화된 회의록을 자동 생성하는 파이프라인을 구축하고 전사에 배포했습니다. 회의록 자동화 규모에 전용 인프라는 과하다고 보고 AWS Lambda와 유사한 서버리스 모델인 Notion Workers를 택했습니다. 기능 배포만으로는 쓰는 사람이 늘지 않아 사용 문서를 따로 쓰고 팀별로 도입 방법을 안내했습니다.',
            role: 'AX Engineer',
            tech: ['Notion Workers (서버리스)', 'Notion API', 'Calendar API'],
            features: [
              '캘린더 일정에서 구조화된 회의록 자동 생성',
              'AWS Lambda 유사 서버리스 구성',
              '전사 단위 배포·운영'
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
      download: "이력서 다운로드 (한국어)",
      pdfFile: "resume_kr.pdf"
    }
  },
  en: {
    hero: {
      greeting: "Hi, I'm",
      title: "Ko Donghyeon.",
      subtitle: "DevOps Engineer.",
      description: "I'm a DevOps engineer who cares about connecting people. I tie teams' work together through infrastructure and AI transformation (AX), and I've built and led communities that bring together developers across majors and student clubs.\nI moved infrastructure changes onto PR approval with Terraform and Atlantis, and automate repetitive internal work with LLMs and Notion agents.\nEven outside engineering, such as sales lead assignment, I interview the people doing the work and set the measurement criteria first.",
      cta: "Check out my work",
      label: "DevOps Engineer · BUZZ & BEYOND 2026~",
      highlights: [
        { label: "DevOps", text: "Built a GitOps workflow with Terraform and Atlantis; revoked all developer AWS access keys" },
        { label: "AI Automation", text: "Built and ran company-wide workload monitoring linking Notion with FLEX (HR system), plus customer-support and lead-response agents" },
        { label: "Open Source", text: "Fixed a CNCF Atlantis bug, shipped in official release v0.41.0" },
        { label: "Community", text: "Leader, AWS Student Builder Group at Dongguk University; Notion Campus Leader" }
      ],
      links: [
        { label: "GitHub", url: "https://github.com/Gosorasora" },
        { label: "LinkedIn", url: "https://www.linkedin.com/in/kosora/" },
        { label: "AWS Article", url: "https://builder.aws.com/content/3I2Mw8lAM0x9sODvAwmHN8RylXM/building-a-faas-on-ec2-without-lambda-and-splitting-cold-start-into-three-layers" },
        { label: "Resume PDF", url: "/assets/resume_en.pdf" }
      ],
      stack: ["AWS", "Terraform", "Atlantis", "Kubernetes", "Argo Workflows", "Python", "Notion"]
    },
    sections: {
      cases: "Cases",
      writing: "Writing",
      problem: "Problem",
      decision: "Decision",
      result: "Result",
      more: "Details",
      zoom: "Enlarge diagram"
    },
    cases: [
      {
        projectId: 3,
        diagram: null,
        summary: "Moved local Terraform runs onto PR approval, and when a safeguard got in the way, fixed it upstream instead of turning it off.",
        outcome: "Zero long-lived local access keys, every Terraform change audited per PR",
        problem: "Every engineer ran Terraform locally, so state file conflicts and untraceable changes piled up. Local runs also meant each developer held a long-lived AWS Access Key with inconsistent permissions.",
        decision: "Rejected Terraform Cloud (cost, state held by an external SaaS) and a hand-built GitHub Actions flow (effectively rebuilding Atlantis), and self-hosted Atlantis. A bypass left open turns a process into a suggestion, so every Access Key was revoked; emergency deploy speed was traded away, softened by multiple approvers.",
        result: "Every Terraform change is now audited per PR and no long-lived local Access Keys remain. When plan_requirements: mergeable kept blocking PRs, I fixed the bug instead of disabling it, and PR #6186 shipped in v0.41.0.",
        links: [
          { label: "PR #6186", url: "https://github.com/runatlantis/atlantis/pull/6186" }
        ]
      },
      {
        projectId: 7,
        diagram: null,
        summary: "Shed managed FaaS limits on execution time and data egress by running on EC2, then paid back the lost scalability by splitting cold start into three layers.",
        outcome: "Execution-unit cold start from 3s to 0.2s; worker IAM narrowed to three actions on a single queue",
        problem: "HTTP request handling had to run on EC2, so function upload, invocation and immediate execution that Lambda normally provides had to be built by hand, along with scalability.",
        decision: "A six-hour API Gateway plus Dispatcher Lambda prototype left API Gateway on the request path, so it was replaced with ALB and an EC2 Controller. Cold start was split into execution unit, worker instance and scaling decision, and scaling keys off SQS queue depth instead of CPU, a lagging indicator.",
        result: "Execution unit from 3s to 0.2s, and an ASG Warm Pool keeps five workers ready at the cost of two. 10,000 Fibonacci requests in about 11s (30 to 40s on Lambda), about 30,000 KRW of AWS spend over two days.",
        links: [
          { label: "AWS Article", url: "https://builder.aws.com/content/3I2Mw8lAM0x9sODvAwmHN8RylXM/building-a-faas-on-ec2-without-lambda-and-splitting-cold-start-into-three-layers" },
          { label: "GitHub", url: "https://github.com/Softbank-Final" }
        ]
      },
      {
        projectId: 1,
        diagram: null,
        summary: "Agreed deploy criteria with each team, then made release documents the source of DORA metrics so measurement ends when the deploy does.",
        outcome: "Four DORA metrics computed daily, checked by crew and leads on the same dashboard",
        problem: "Tasks lived in Notion, deploys in release documents and incidents in yet another DB, so there was no single basis for checking productivity across the organization.",
        decision: "A dedicated measurement tool would turn measuring into another chore, so data comes from Notion where everyone already works. Commit counts and token usage were rejected as evidence of productivity; only meaningful deploys count, and review goes to a Notion custom agent because consistency matters more than per-item accuracy.",
        result: "Per-team deploy criteria are agreed and documented, and the four DORA metrics are computed daily on one dashboard shared by crew and leads. They also feed R&R discussions and 1on1 conversations.",
        links: []
      }
    ],
    writing: [
      { kind: "AWS Builder Center", title: "Building a FaaS on EC2 without Lambda and splitting cold start into three layers", url: "https://builder.aws.com/content/3I2Mw8lAM0x9sODvAwmHN8RylXM/building-a-faas-on-ec2-without-lambda-and-splitting-cold-start-into-three-layers" },
      { kind: "Open Source", title: "runatlantis/atlantis PR #6186: fix autoplan always failing under plan_requirements: mergeable (v0.41.0)", url: "https://github.com/runatlantis/atlantis/pull/6186" },
      { kind: "Paper", title: "Layer-Specific Runtime Allocation in IoT Log Pipelines (WebAssembly vs Containers)", url: "/assets/wasm-spinkube-iot-layer-allocation.pdf" }
    ],
    about: {
      title: "About Me",
      intro: [
        "Hello! I'm **Ko Donghyeon**, a **DevOps Engineer**.",
        "I build and run Terraform- and Kubernetes-based infrastructure with GitOps deployment. My focus now is **AX: automating repetitive internal work with LLMs and Notion agents**, and I prefer to sit next to the team that has the problem, hear it firsthand, and fix it there.",
        "As **Leader of AWS Student Builder Group at Dongguk University**, I have run 10+ hands-on seminars and Dongguk Dev Conference 2026."
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
          title: 'DevOps Engineer / Infra·Platform·AX',
          company: 'BUZZ & BEYOND',
          period: '2026.01 ~ Present (Intern 2026.01–06 · Full-time 2026.07~)',
          description: [
            'Built the company GitOps environment with Terraform and Atlantis',
            [
              'PR-level approval required, giving every Terraform operation an audit trail',
              'Moved AWS access to least-privilege AssumeRole, removing all local developer keys',
              'Atlantis OSS contribution, [PR #6186](https://github.com/runatlantis/atlantis/pull/6186) merged (shipped in v0.41.0)'
            ],
            'Built the internal AX productivity metric system (DORA adopted as the measure)',
            [
              'Auto-classifies 200+ tasks per day at 91.7% accuracy',
              'Agreed and documented per-team deploy criteria as the fixed basis; used in R&R discussions and 1on1 conversations'
            ],
            'Built an SLA system for inbound leads',
            [
              'Cut lead intake-to-owner assignment from 33.6h to 0.4h on average (98.7% faster); leads assigned to an owner within 1h rose from 9% to 86%',
              'Measures SLA on business hours only, with alerts and escalation for leads left untouched'
            ],
            'Built and ran internal Notion agents',
            [
              'Automated deployment-quality review',
              'Per-vendor LLM cost labeling; built the usage monitoring and alerting system'
            ]
          ],
          tags: ['Kubernetes', 'Terraform', 'Atlantis', 'AWS', 'Notion', 'Argo Workflows', 'Datadog', 'Gemini', 'Python']
        },

        {
          title: 'AWS Student Builder Group at Dongguk University',
          company: 'Amazon Web Services (AWS)',
          period: '2025.07 ~ Present',
          description: [
            'Cloud Club Member 2025.07 ~ 2026.04, Leader since 2026.05',
            'Ran 10+ hands-on seminars for students of all majors ([Meetup](https://www.meetup.com/aws-sbg-at-dongguk-university-seoul-campus/events/?type=past))',
            'Earned all 7 AWS SBG badges (Leader, Spark, Ignite, Surge, Strato, Flare, Apex; the top-tier Apex requires 6 hosted events, [AWS SBG Apex Badge](https://www.credly.com/badges/796266ba-affe-4d6c-a811-5d0c33ce1bd4))',
            'Led Dongguk Dev Conference 2026 (2026.10.02, about 100 people from 7 developer clubs, overall satisfaction 4.80/5, [LinkedIn recap](https://www.linkedin.com/feed/update/urn:li:activity:7512849701973471232/))',
            'Run the [AWS Student Builder Group at Dongguk University](https://www.linkedin.com/company/aws-student-builder-group-at-dongguk-university/) LinkedIn page',
          ],
          tags: ['AWS', 'Cloud']
        },
        {
          title: 'Notion Campus Leader at Dongguk University',
          company: 'Notion',
          period: '2026.08 ~ Present',
          description: [
            'Official Notion Campus Leader on campus: runs Notion training sessions, published the [Student Dev Project Hub](https://www.notion.com/ko/templates/student-dev-project-hub) template on the Notion Marketplace, and shares workplace automation cases'
          ],
          tags: ['Notion', 'Community']
        },
        {
          title: 'Undergraduate Researcher (CSDC Lab)',
          company: 'Dongguk Univ. Computer Security & Distributed Computing Lab',
          period: '2025.04 ~ Present',
          description: [
            'Conducting research on Network Security and Load Balancing',
            'NLP-based IaC Security Analyzer: modeled Terraform IAM resource relationships as a graph to catch expired accounts, unused accounts, and permissions that do not match a service purpose, which rule-based scanners (TFSec, Checkov) miss',
            'Empirical WebAssembly vs container study: measured an IoT log pipeline layer by layer on AKS to derive runtime allocation criteria ([paper](https://gosorasora.github.io/assets/wasm-spinkube-iot-layer-allocation.pdf))'
          ],
          tags: ['Network Security', 'Load Balancing', 'AWS', 'NLP', 'WebAssembly']
        }
      ],
      education: [
        {
          title: 'Dongguk University',
          degree: 'B.S. in Computer Science Engineering (In Progress)',
          period: '2021.03 ~ 2027.02 (Expected)',
          description: ['GPA 4.09 / 4.5', 'Dean\'s List (Semester Honors) - 4 times']
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
          role: '1st Member',
          period: '2022.03 ~ 2023.09',
          description: ['1st-generation member of a vendor-neutral inter-university cloud community', 'Studied and built across AWS, GCP and other providers without locking into a single vendor']
        },
        {
          title: 'SoftBank Hackathon',
          role: 'Finalist',
          period: '2024.11 ~ 2024.12',
          description: ['Preliminary round (2024.11.08 ~ 2024.11.09)', 'Advanced to Final round (2024.12.06 ~ 2024.12.07)']
        }
      ],
      certs: [
        {
          title: 'AWS Certified Cloud Practitioner',
          issuer: 'Amazon Web Services',
          date: '2026.10',
          description: ['[AWS Certified Cloud Practitioner](https://www.credly.com/badges/364200c3-4fce-450b-b925-171f149f8742)']
        },
        {
          title: 'AWS Student Builder Group Badges (7)',
          issuer: 'AWS Community',
          date: '2026.09',
          description: ['Credly badges: [AWS SBG Leader Badge](https://www.credly.com/badges/ca013a7a-bc99-46ff-bc2f-86a68164c29f), [AWS SBG Spark Badge](https://www.credly.com/badges/bdb73658-bfcb-4db4-b80e-d9954463efab), [AWS SBG Ignite Badge](https://www.credly.com/badges/87b30bf8-698c-45e4-be0e-6df7ab4f0c43), [AWS SBG Surge Badge](https://www.credly.com/badges/bac12f82-26a2-4568-975f-31ac7c1801f0), [AWS SBG Strato Badge](https://www.credly.com/badges/2e7e222a-e5de-4017-a2f9-4f631718c6df), [AWS SBG Flare Badge](https://www.credly.com/badges/75b7e9a1-751b-4e28-a92e-9ea85d0c2932), [AWS SBG Apex Badge](https://www.credly.com/badges/796266ba-affe-4d6c-a811-5d0c33ce1bd4)']
        },
        {
          title: 'AWS Cloud Club Captain: Bronze, Silver',
          issuer: 'AWS Community',
          date: '2026.06',
          description: ['Credly badges: [Cloud Club Captain Bronze](https://www.credly.com/badges/26a9d4fb-de53-4d57-b24a-1d98025765b0), [Cloud Club Captain Silver](https://www.credly.com/badges/1fe9561a-cf64-4896-afba-65d24dbe2bd1)']
        },
        {
          title: 'Google Cloud Fundamentals: Core Infrastructure',
          issuer: 'Google Cloud Skills Boost',
          date: '2025.10'
        },
        {
          title: 'Notion Badge: Essentials · Workflows · Advanced',
          issuer: 'Notion',
          date: '2026.06',
          description: ['Verify: [Notion Essentials Badge](https://verify.skilljar.com/c/u3fmkfvpnv26) · [Notion Workflows Badge](https://verify.skilljar.com/c/uqe3e88dh56v) · [Notion Advanced Badge](https://verify.skilljar.com/c/nvh6hj8dxfrx)']
        },
        {
          title: 'SQLD (SQL Developer)',
          issuer: 'Korea Data Agency',
          date: '2024.09'
        },
        {
          title: 'Craftsman Information Processing',
          issuer: 'HRD Korea',
          date: '2022.12'
        }
      ],
      awards: [
        {
          title: 'Dongguk Univ. Semester Honors (4 times)',
          issuer: 'Dongguk University College of Engineering',
          date: '2021.07 ~ 2025.07',
          description: ['Dean\'s List - 2021 Spring, 2021 Fall, 2022 Spring, 2025 Spring']
        },
        {
          title: 'U-LINC Adventure Design Competition - Encouragement Prize',
          issuer: 'Dongguk University LINC3.0 Project Director',
          date: '2022.12',
          description: ['Participated as Team Leader and won Encouragement Prize']
        },
        {
          title: 'Campus Study Facility Occupancy Analysis System - Encouragement Prize',
          issuer: 'Dongguk University LINC3.0 Project Director',
          date: '2022.12',
          description: ['Built sensor-based infrastructure to detect seat occupancy in non-designated areas such as lounges and cafés beyond the library', 'Developed an automatic entry-detection system for real-time headcount estimation per zone']
        },
        {
          title: 'Torch Award (Hwaetbul-sang)',
          issuer: 'Commandant of the ROK Army Signal School (Brigadier General)',
          date: '2023.08',
          description: ['Awarded for ranking 1st out of 200 trainees during the latter half of military service training']
        }
      ]
    },
    portfolio: {
      title: "Other Projects",
      metrics: { 4: "PR #6186 merged, in v0.41.0", 2: "200+ tasks auto-classified/day", 15: "Owner assignment 33.6h → 0.4h", 6: "Measured on AKS 1.34", 5: "PR #124 merged", 8: "Zero idle resource cost off-season", 11: "Moved to AWS on my own in 2022", 12: "Spend tracked by vendor and use, threshold alerts", 13: "Team deploy criteria documented", 14: "Rolled out company-wide" },
      order: [2, 4, 15, 13, 14, 12, 6, 5, 10, 9, 8, 11],
      filters: {
        all: "All",
        web: "DevOps & Infra",
        ai: "AX Automation",
        research: "Open Source",
        security: "Security",
        platform: "Platform Engineering"
      },
      modal: {
        detail: "View details",
        overview: "Overview",
        role: "Role",
        techStack: "Tech Stack",
        keyFeatures: "Key Features",
        links: {
          github: "GitHub",
          demo: "Live",
          paper: "Paper",
          article: "Article"
        }
      },
      projects: [
        {
          id: 1,
          title: 'Productivity Metrics System',
          category: 'AX Automation',
          image: null,
          description: 'Agreed with each team on what counts as a deployment and fixed it in writing, then automated daily metrics such as deploy frequency and failure rate. Productivity that had only been described in words can now be shown in numbers, and the metrics serve as a key indicator of our internal AX transition.',
          how: "Counted only meaningful deploys agreed with each team as productivity, setting aside commit counts, which only show volume, and token usage, which is easy to game.",
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
          title: 'Notion + FLEX: Workload Monitoring System',
          category: 'AX Automation',
          image: null,
          description: 'Connected Notion work records with FLEX attendance data to build and run a metric system and monitoring that show, per team, leave taken, actual work logged, and how much it affects productivity. An LLM auto-classifies 200+ tasks a day into 13 task types and 14 meeting types.',
          how: "Linked Notion work logs with FLEX attendance to show workload per team; because the same title means different work under different roadmaps, classified the roadmap first and the task second instead of using one prompt.",
          details: {
            problem: 'Inconsistent manual task classification causing human errors, making it impossible to track where team members actual Workload is being spent.',
            solution: 'Consolidated scattered Notion task data and applied Gemini 2.5 Flash hierarchical classification (roadmap context + task context) into 13 task types and 14 meeting types. This made it possible to track quantitatively where Workload goes for each member.',
            role: 'DevOps & AX Engineer',
            tech: ['Gemini', 'Argo Workflows', 'Python', 'Apollo Federation', 'GraphQL'],
            features: [
              'Consolidated scattered Notion data + Gemini 2.5 Flash hierarchical classification',
              '200+ daily auto-classification, 91.7% accuracy',
              'Per-member Workload allocation quantitative tracking',
              'Argo CronWorkflow daily scheduled execution',
              'Apollo Federation Subgraph separation for reusability'
            ]
          },
          links: { demo: null, github: null }
        },
        {
          id: 7,
          title: 'NanoGrid: A Function Platform Beyond Managed FaaS Limits',
          category: 'DevOps & Infra',
          image: null,
          description: 'A function execution platform that sheds what managed FaaS fixes for you: the execution time ceiling, runtime constraints, and inference data leaving your network. The scalability you inherit in exchange was solved by splitting cold start into three layers. Execution unit from 3s to 0.2s, and servers that cost only two in normal operation but can grow to five right away (SoftBank Hackathon Finalist)',
          how: "Rejected CPU as a lagging indicator and scaled on SQS queue-depth alarms, and replaced per-request container creation with borrowing from a per-runtime pool.",
          details: {
            problem: 'Under a constraint that HTTP request handling had to run on EC2, we had to build what Lambda normally does for you. Function upload, HTTP invocation, and immediate execution had to work without a managed FaaS, which meant owning scalability ourselves.',
            solution: 'We first checked whether the limits we hit with managed FaaS actually dissolve on EC2. The API Gateway 29-second timeout, runtime constraints, vendor lock-in, and inference data leaving our network all dissolve; only scalability gets worse. A familiar API Gateway plus Dispatcher Lambda prototype ran within six hours, but it left API Gateway sitting on the request path, so we removed it and moved to ALB with an EC2 Controller. That eliminated the execution time ceiling and gave us control over which subnet compute sits in. Digging into the remaining scalability problem revealed that cold start is really three layers on different time scales, and each needed a different tool. Because the platform executes arbitrary user code, we also added Zip Slip blocking, container resource quotas, per-job timeouts, least-privilege IAM, and five WAF rule groups.',
            role: 'Infrastructure & Security',
            tech: ['AWS EC2', 'ALB', 'Auto Scaling Warm Pool', 'AWS SQS', 'AWS S3', 'DynamoDB', 'ElastiCache Redis', 'AWS WAF', 'Terraform', 'Docker', 'Prometheus', 'Ollama', 'GCP Cloud Storage'],
            features: [
              'Layer 1, execution unit: pre-started container pools per runtime (Python, Node.js, C++, Go), borrowed and returned instead of created per request. 3s to 0.2s, measured as a distribution shift in the Prometheus worker_job_duration_seconds histogram',
              'Layer 2, worker instance: EC2 Auto Scaling Warm Pool holding instances stopped. 2 InService plus 3 warm keeps ASG max of 5 ready at the cost of 2, since stopped instances bill EBS only with no compute charge',
              'Layer 3, scaling decision: SQS queue depth instead of CPU. CPU is a lagging indicator, so by the time it crosses the threshold users have already absorbed the delay. Backlog per Instance and Step Scaling prevent over-provisioning',
              'Load test: 10,000 Fibonacci requests in roughly 11 seconds versus 30 to 40 seconds on Lambda for the same workload, where execution environment allocation overhead dominates millisecond-scale invocations',
              'Security: narrowed the worker IAM role from managed SQS FullAccess to three actions on a single queue, shrinking the blast radius from every queue in the account to one. Five WAF rule groups (SQLi, XSS, Log4j, rate limit, body size cap)',
              'Network: Multi-AZ with Controllers in public subnets across two AZs and Workers in private subnets, joined only by SQS. Gateway VPC Endpoints for S3 and DynamoDB keep worker traffic off the NAT',
              'Private AI Node: Ollama placed in a private subnet with no internet route and no public address, reachable only from the worker security group, so inference data never leaves the VPC',
              'Multi-cloud redundancy: a fire in one AWS region caused a real outage during the event, which made it clear that being tied to a single vendor leaves no options, so data was replicated to GCP Cloud Storage.',
              'Total AWS spend for two days: about 30,000 KRW'
            ]
          },
          links: {
            demo: null,
            github: 'https://github.com/Softbank-Final',
            article: 'https://builder.aws.com/content/3I2Mw8lAM0x9sODvAwmHN8RylXM/building-a-faas-on-ec2-without-lambda-and-splitting-cold-start-into-three-layers'
          }
        },
        {
          id: 9,
          title: 'Deploy Land: Gamified CI/CD Platform',
          category: 'DevOps & Infra',
          image: null,
          description: 'A serverless CI/CD platform that makes deploying fun: a log-only screen became a game view where a character runs through the pipeline stages, sharing deploy status in real time',
          how: "Treated pipeline success as provisional: after each deploy, rechecked Elastic Beanstalk health and a real HTTP 200, and flipped the run to failed if either check failed.",
          details: {
            problem: 'Deploy status only existed as logs, so nobody but the developer knew how far a deploy had gone, failures were noticed late, and a pipeline success alone did not show whether the deployed service actually responded.',
            solution: 'Made watching a deploy feel like a game. Status from GitHub push through build, deploy and health check is shared in real time as a character running through pipeline stages. EventBridge catches state changes from CodePipeline, CodeBuild and Elastic Beanstalk, Lambda writes them to DynamoDB, and an Amplify monitoring app renders it. A pipeline success is not treated as final: after deploy, the Elastic Beanstalk environment health and a real HTTP 200 response are checked again, and the run is flipped to failed if either check fails. Bedrock summarizes failure logs, retrying with exponential backoff up to 3 times on ThrottlingException, and Discord/Slack get instant alerts. I owned Infra and Backend: Terraform infrastructure and the Lambda APIs.',
            role: 'Infra & Backend',
            tech: ['AWS CodePipeline', 'AWS CodeBuild', 'Elastic Beanstalk', 'AWS Lambda', 'Amazon EventBridge', 'DynamoDB', 'Amazon Bedrock', 'AWS Amplify', 'Terraform'],
            features: [
              'Game-style live deploy monitoring: a character runs through the pipeline stages',
              'GitHub Push → Build → Deploy → Health Check full automation',
              'EventBridge → Lambda → DynamoDB records state, then DynamoDB Streams invokes the health-check Lambda as a second stage',
              'After pipeline success, EB environment health and HTTP 200 are rechecked and the deploy is marked failed if either fails; Bedrock failure-log summaries with exponential backoff on throttling',
              'Discord/Slack instant alerts, Terraform-managed infrastructure'
            ]
          },
          links: {
            demo: null,
            github: 'https://github.com/Deploy-Land'
          }
        },
        {
          id: 3,
          title: 'GitOps Terraform CI/CD with Atlantis',
          category: 'DevOps & Infra',
          image: null,
          description: 'Changed infrastructure so that changes apply only after approval, leaving a record of who changed what and when. Split permissions per service and withdrew every access key from personal machines.',
          how: "Self-hosted Atlantis over Terraform Cloud, which keeps state in an external SaaS, and over general-purpose CI, which lacks Terraform-specific plan readability and locking.",
          details: {
            problem: 'Local-dependent Terraform deployments with no audit trail and Access Key security risks.',
            solution: 'Transformed local Terraform workflows to Atlantis PR-based GitOps, built AWS AssumeRole least privilege security, and contributed a bug fix to Atlantis v0.41.0 (PR Merged).',
            role: 'Platform Engineer',
            tech: ['Terraform', 'Atlantis', 'Kubernetes', 'Helm', 'AWS IAM', 'Golang'],
            features: [
              'PR-based GitOps workflow transformation',
              'AWS AssumeRole least privilege security',
              'Blocked local bypass: stripping delete permissions would also block cleanup of mistaken resources, and tag-based control could be evaded by editing tags, so the state bucket policy denies everything outside an allowlist. Explicit deny outranks explicit allow, so anyone off the list cannot read state even with admin rights, while an emergency admin account stays listed in case a misconfigured policy stalls the pipeline.',
              'Full developer Access Key revocation',
              'Atlantis v0.41.0 open source contribution (PR Merged)'
            ]
          },
          links: { demo: null, github: 'https://github.com/runatlantis/atlantis' }
        },
        {
          id: 4,
          title: 'Atlantis Open Source Bug Fix',
          category: 'Open Source',
          image: null,
          description: 'Discovered and fixed an autoplan bug in Atlantis where plan_requirements: mergeable always blocked clean PRs. Merged into v0.41.0.',
          how: "Kept the option on, since disabling it would lower our own standard; traced unfamiliar Go code and added the PR merge-status fetch missing only from the autoplan path.",
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
          category: 'Open Source',
          image: null,
          description: 'Fixed the Spin Framework Python SDK Postgres example, which never returned query results, in response to an issue filed by another user (#115); merged as PR #124. Also fixed 2 example documentation errors (#126, #128).',
          how: "Fixed the Python example, the only one that logged results and returned a fixed string, to return column names and rows as a table in the response body like the other language SDK examples.",
          details: {
            problem: 'The spin-postgres example printed query results only to the server log and returned a fixed string in the HTTP response, so following the example never showed Postgres results.',
            solution: 'Because the Spin Postgres binding returns values as wrapper objects, added format_value and format_rowset helpers so the handler returns column names and rows as a table in the response body. Added the CREATE TABLE and INSERT SQL the example assumes to the README so it runs as written.',
            role: 'Open Source Contributor',
            tech: ['Python', 'WebAssembly', 'Spin Framework', 'Git'],
            features: [
              'PR #124: resolved issue #115 filed by another user, merged 2025.12.15',
              'format_value and format_rowset helpers return query results as a table in the HTTP response',
              'Added test-table setup SQL for the example to the README',
              'PR #126, #128: fixed example README titles and a typo (Issues #125, #127, filed by me)'
            ]
          },
          links: {
            demo: null,
            github: 'https://github.com/spinframework/spin-python-sdk/pull/128'
          }
        },
        {
          id: 6,
          title: 'Per-Layer Runtime Allocation for IoT Log Pipelines: Wasm vs Containers',
          category: 'DevOps & Infra',
          image: null,
          description: 'Empirical comparison on AKS 1.34: the same Go workload built as SpinKube Wasm modules and as containers, measured layer by layer, to see how much of the vendor-claimed cold-start advantage survives a real operational stack.',
          how: "Instead of trusting vendor microbenchmarks, measured the same Go workload as Wasm and as containers, and proposed per-layer runtime allocation over a single runtime.",
          details: {
            problem: 'Wasm runtime vendors claim roughly 400x faster cold starts and 43x Pod density over containers, but those figures come from isolated microbenchmarks. Whether the advantage survives the Kubernetes operational stack (shim, SDK, HTTP layers) on an end-to-end path was untested.',
            solution: 'Modeled an IoT log pipeline as four layers (Edge, Transform, Ingestion, Storage) and implemented three of them twice, as SpinKube Wasm modules and as scratch containers running the identical Go workload, then measured both on Azure Kubernetes Service (AKS 1.34). Language, business logic and load conditions were held constant so that only the runtime varied. After Shapiro-Wilk normality testing, Welch t-tests or Mann-Whitney U tests were selected automatically, with Bonferroni correction across ten confirmatory metric families. The result: the vendor-level runtime advantage is heavily diluted once the operational stack is included, and the favorable runtime flips per layer, which motivates layer-specific allocation rather than a single runtime choice. A preceding experiment resolved the compute ceiling of Python Wasm by migrating to native Rust Wasm, cutting binary size 91x (35.86MB to 0.39MB) and raising throughput 7.8x.',
            role: 'Undergraduate Researcher (CSDC Lab, sole author)',
            tech: ['SpinKube', 'WebAssembly', 'WASI', 'Rust', 'Go', 'Azure AKS', 'KEDA', 'Kubernetes', 'containerd-shim-spin', 'Statistical testing'],
            features: [
              'Measured instantiation at 0.436ms, statistically indistinguishable from the vendor claim of 0.5ms (p=0.71). But the runtime accounts for only 28% of the 1.55ms request path; the other 72% is Kubernetes, shim, SDK and HTTP.',
              'Ingestion layer favors containers: 24-28K rps sustained vs a Wasm ceiling around 1,264 rps (19-22x)',
              'Transform layer favors Wasm: containers hit a wall near 41 Pods under per-tenant isolation, while a shared Wasm pool absorbed 8,000 tenants loss-free at up to 64x lower cost per tenant ($4.69 to $0.07)',
              'Edge layer favors Wasm: 11x faster scale-from-zero cold start, and an arm64-built container failed on amd64 nodes while the same Wasm module ran cross-arch',
              'Preceding experiment: migrating Python Wasm to native Rust Wasm cut binary size 35.86MB to 0.39MB (91x) and raised throughput 1,713 to 13,389 req/s (7.8x)',
              'Six threats to validity stated (6 vCPU free-tier cluster, single Go workload, measurement-tooling differences, and more)'
            ]
          },
          links: {
            demo: null,
            github: null,
            papers: [
              { label: 'Paper - Layer-specific runtime allocation (AKS)', url: '/assets/wasm-spinkube-iot-layer-allocation.pdf' },
              { label: 'Preceding experiment - Runtime comparison and Rust optimization', url: '/assets/wasm-spinkube-runtime-comparison.pdf' }
            ]
          }
        },
        {
          id: 8,
          title: 'Roomeya: Serverless Dormitory Matching',
          category: 'DevOps & Infra',
          image: null,
          description: 'Full serverless AWS architecture + Terraform IaC for seasonal dormitory matching (9 Lambdas, Step Functions, DynamoDB)',
          how: "Built the seasonal service on Lambda and on-demand DynamoDB, and chose HTTP API v2 over REST API because usage plans were not needed.",
          details: {
            problem: 'Idle cost during off-season and matching workflow complexity.',
            solution: 'Designed full serverless architecture: 9 Lambda functions, Step Functions matching workflow, 4 DynamoDB tables, API Gateway HTTP API v2, Cognito OAuth 2.0 auth, SES email. all codified with Terraform. Using only Lambda and on-demand DynamoDB (PAY_PER_REQUEST) keeps off-season idle cost at zero. The matching workflow lives in Step Functions so that execution history shows where the survey, matching and notification chain stopped, and HTTP API v2 was chosen over REST API for lower cost and latency because usage plans and request validation were not needed. Everything stays in Terraform so resources can be torn down off-season and rebuilt for the next season.',
            role: 'Cloud Architect',
            tech: ['Terraform', 'AWS Lambda', 'AWS Step Functions', 'DynamoDB', 'API Gateway', 'Cognito'],
            features: [
              '9 Lambda functions + Step Functions matching workflow',
              '4 DynamoDB tables (Forms, FormResponses, Results, Students)',
              'Cognito OAuth 2.0 auth + API Gateway HTTP API',
              'Lambda plus on-demand DynamoDB: zero off-season idle cost',
              'Full infrastructure codified with Terraform'
            ]
          },
          links: {
            demo: null,
            github: 'https://github.com/Roomeya'
          }
        },
        {
          id: 10,
          title: 'NLP-based IaC Security Analyzer',
          category: 'Security',
          image: null,
          description: 'A security analyzer that models Terraform IAM resource relationships as a graph and reads them with time and service-purpose context, catching expired accounts, unused accounts and purpose mismatches that rule-based scanners miss.',
          how: "Complements rather than replaces existing scanners: models IAM relationships as a graph, checks expiry and service purpose with rules, and merges in Checkov results.",
          details: {
            problem: 'Rule-based static analyzers (TFSec, Checkov) only catch what matches a pattern, so they miss configurations that are fine per resource but risky once connected, and time-based risks such as expired accounts.',
            solution: 'Parsed Terraform with python-hcl2 into a NetworkX graph of IAM relationships (7 kinds, including assume_role and pass_role), then judged privilege escalation paths by matching a dictionary of 17 risky IAM actions and action combinations. Comparing account expiry and last-used dates, and a service purpose against its granted permissions, catches risks that rule-based scanners structurally cannot see. A module merges Checkov results so the tool complements existing scanners rather than replacing them, and a BERT (bert-base-uncased) embedding-similarity module is also implemented.',
            role: 'Security Researcher & Developer',
            tech: ['Python', 'BERT', 'Terraform', 'NetworkX', 'AWS IAM', 'Hugging Face', 'NLP'],
            features: [
              'Detects risk types TFSec and Checkov do not: expired accounts, unused accounts, purpose mismatches, time-based risks',
              'Privilege escalation paths judged on the IAM graph with a 17-action risk dictionary and action-combination matching',
              'Merges Checkov results to complement existing scanners',
              'Detection behavior pinned by 11 unit tests'
            ]
          },
          links: {
            demo: null,
            github: 'https://github.com/Gosorasora/NLP-Enhanced-IaC-Security-Analyzer'
          }
        },
        {
          id: 11,
          title: 'AWS Cloud Migration (CAPS Club)',
          category: 'DevOps & Infra',
          image: null,
          description: 'In 2022, without being asked, I moved the club server from a physical PC to AWS myself, so the service no longer stopped on power cuts or reboots and could be managed from off campus.',
          how: "Unasked, moved the club server, which stopped on every outage and reboot and could only be fixed on campus, to AWS in 2022.",
          details: {
            problem: 'The club server ran on a physical PC, exposed to every power outage and reboot, and could only be fixed by someone on campus.',
            solution: 'Moved the club server to AWS, removing exposure to outages and reboots and allowing management from off campus, for 24/7 service availability.',
            role: 'Cloud Architect',
            tech: ['AWS EC2', 'AWS EBS', 'AWS S3', 'AWS RDS', 'Docker'],
            features: [
              'Full AWS Cloud Migration',
              '24/7 Service Availability',
              'No exposure to power outages or on-site management',
              'Docker-based Containerization'
            ]
          },
          links: {
            demo: null,
            github: null
          }
        },
        {
          id: 12,
          title: 'LLM Cost Labeling System',
          category: 'DevOps & Infra',
          image: null,
          description: 'Tagged every LLM call with which vendor model was used and for what purpose, so spend can be tracked by purpose and an alert fires when a limit is exceeded.',
          how: "Added vendor and purpose labels to the internal LLM server code first, so spend by purpose would be visible before AI use grew.",
          details: {
            problem: 'As internal LLM usage grew, there was no way to track which vendor or feature was driving cost, making spend management impossible.',
            solution: 'Added a vendor/purpose-based labeling scheme to the internal LLM server code, establishing a foundation to monitor LLM spend per vendor (Vertex AI, AI Studio, OpenAI). The reasoning was that spend by purpose has to be visible before AI usage grows. As an early onboarding task, it was also a fast way to learn the internal code conventions and GraphQL standards.',
            role: 'AX / Platform Engineer',
            tech: ['GraphQL', 'Cost Monitoring', 'FinOps'],
            features: [
              'Per-vendor (Vertex AI, AI Studio, OpenAI) LLM cost labeling',
              'Usage monitoring environment and threshold-based alerting',
              'Authored an LLM cost-labeling guide'
            ]
          },
          links: {
            demo: null,
            github: null
          }
        },
        {
          id: 15,
          title: 'Inbound Lead SLA System',
          category: 'Platform Engineering',
          image: null,
          description: 'Cut intake-to-owner assignment from 33.6h to 0.4h on average (98.7% faster), from defining what counts as a response to business-hours measurement, alerts, and a procedure that hands long-neglected inquiries up the chain.',
          how: "Kept first customer contact alongside owner assignment, since assignment time can look good while customers feel the first contact, and measured before and after in business hours so weekend inquiries do not count as delays.",
          details: {
            problem: 'In the first half of the year, 45.5% of leads were answered within an hour, average response was 4.3 hours, and 4 leads sat untouched past 9 hours. Slow first responses cut straight into conversion.',
            solution: 'Recorded intake, owner assignment and first customer contact on the same basis, and defined SLA measurement on business hours. Changed alert delivery so it only fires when an owner can act, and added escalation for untouched leads. Intake-to-assignment then fell from 33.6 hours to 0.4 hours on average, and assignment within an hour rose from 9% to 86%.',
            role: 'DevOps / FDE',
            tech: ['Notion', 'Backoffice', 'SLA Metrics', 'Alerting', 'Data Backfill'],
            features: [
              'Intake to owner assignment: 33.6h → 0.4h (98.7% faster)',
              'Assignment within 1 hour: 9% → 86%',
              'SLA measured on business hours only (weekends, holidays, after-hours excluded)',
              'Alerting and escalation for leads left untouched'
            ]
          },
          links: {
            demo: null,
            github: null
          }
        },
        {
          id: 13,
          title: 'Notion: Deploy Review Agent and Release Data Integrity',
          category: 'AX Automation',
          image: null,
          description: 'Set team deploy criteria, auto-audited deployment quality with an agent, and found work not linked to any release and connected it, so release records and work records no longer drift apart.',
          how: "Handed review to a custom agent that applies the same criteria every time, trading some per-decision accuracy, because human review turns into a formality with repetition.",
          details: {
            problem: 'Deployment-quality checks and deploy criteria relied on people, causing omissions and inconsistency, while release-to-task links were managed by hand.',
            solution: 'Established Notion custom agents plus team-specific deploy-criteria docs and prompts to auto-audit deployment quality. Built a companion bot that auto-maps release-unlinked tasks, and fully automated the previously built DORA score report through a custom agent. Human review is accurate at first but turns into a formality with repetition and the criteria drift, so I traded per-decision accuracy for consistent criteria and handed review to an agent.',
            role: 'AX Engineer',
            tech: ['Notion Custom Agent', 'Prompt Engineering', 'Notion API'],
            features: [
              'Agent-based automatic deployment-quality checks',
              'Automatic tracking and linking of release-related tasks',
              'Team-specific deploy-criteria docs and prompts',
              'Fully automated DORA score report publishing'
            ]
          },
          links: {
            demo: null,
            github: null
          }
        },
        {
          id: 14,
          title: 'Notion: Calendar-Based Meeting Notes Agent',
          category: 'AX Automation',
          image: null,
          description: 'When a calendar event ends, meeting notes in a fixed format are created automatically. It is now used across the company.',
          how: "Chose Notion Workers because a separate server was overkill for meeting notes, and walked each team through adoption because shipping alone did not grow usage.",
          details: {
            problem: 'Organizers created meeting notes by hand, so notes appeared at different times for each meeting, and until the organizer made one, agenda items had to sit somewhere else. Agile retros also flagged it as repetitive manual work.',
            solution: 'Used Notion Workers (serverless) to build a pipeline that auto-generates structured meeting notes from calendar events, rolled out company-wide. Dedicated infrastructure was too much for this scale, so I chose Notion Workers, a serverless model similar to AWS Lambda. Shipping the feature alone did not grow usage, so I wrote separate usage docs and walked each team through adoption.',
            role: 'AX Engineer',
            tech: ['Notion Workers (serverless)', 'Notion API', 'Calendar API'],
            features: [
              'Auto-generates structured meeting notes from calendar events',
              'Serverless model similar to AWS Lambda',
              'Company-wide rollout and operation'
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
      download: "Download PDF (English)",
      pdfFile: "resume_en.pdf"
    }
  },
  jp: {
    hero: {
      greeting: "Hello, I'm",
      title: "Ko Donghyeon.",
      subtitle: "DevOps Engineer.",
      description: "人とのつながりを大切にする DevOps エンジニアです。インフラと AX でチームの仕事をつなぎ、専攻やサークルの異なる開発者が交わるコミュニティをつくり、率いてきました。\nTerraform と Atlantis でインフラ変更を PR 承認の手順に移し、LLM と Notion エージェントで社内の反復業務を自動化します。\n営業チームのリード割り当てのような開発外の業務も、担当者に直接ヒアリングして測定基準から定めます。",
      cta: "プロジェクトを見る",
      label: "DevOps Engineer · BUZZ & BEYOND 2026~",
      highlights: [
        { label: "DevOps", text: "Terraform と Atlantis で GitOps 基盤を構築、開発者の AWS アクセスキーを全廃" },
        { label: "AX", text: "Notion と FLEX（人事労務 SaaS）を連携した全社業務量モニタリングを構築・運用。CS とリード対応エージェントも開発" },
        { label: "Open Source", text: "CNCF Atlantis のバグを修正、公式リリース v0.41.0 に反映" },
        { label: "Community", text: "AWS Student Builder Group（東国大学）リーダー、Notion Campus Leader" }
      ],
      links: [
        { label: "GitHub", url: "https://github.com/Gosorasora" },
        { label: "LinkedIn", url: "https://www.linkedin.com/in/kosora/" },
        { label: "AWS Article", url: "https://builder.aws.com/content/3I2Mw8lAM0x9sODvAwmHN8RylXM/building-a-faas-on-ec2-without-lambda-and-splitting-cold-start-into-three-layers" },
        { label: "履歴書 PDF", url: "/assets/resume_jp.pdf" }
      ],
      stack: ["AWS", "Terraform", "Atlantis", "Kubernetes", "Argo Workflows", "Python", "Notion"]
    },
    sections: {
      cases: "Cases",
      writing: "Writing",
      problem: "課題",
      decision: "判断",
      result: "結果",
      more: "詳細",
      zoom: "図を拡大"
    },
    cases: [
      {
        projectId: 1,
        diagram: null,
        summary: "ローカルでの Terraform 実行を PR 承認の手順に移し、途中で詰まった安全装置は無効化せずアップストリームで直しました。",
        outcome: "ローカルの長期アクセスキー 0個、Terraform 作業の全件を PR 単位で監査可能に",
        problem: "エンジニアごとにローカルで Terraform を実行しており、ステートファイルの衝突と変更履歴の追跡不能が重なっていました。ローカル実行のため開発者それぞれが長期 AWS Access Key を持ち、権限範囲もばらばらでした。",
        decision: "Terraform Cloud は費用と外部 SaaS へのステート委託、GitHub Actions での自作は結局 Atlantis を作り直すことになるため却下し、Atlantis のセルフホストを選びました。迂回路が残れば手順は推奨に過ぎなくなるため Access Key を全量回収し、緊急デプロイの速度を諦める代わりに承認者を複数置きました。",
        result: "Terraform 作業の全件を PR 単位で監査できるようになり、ローカルの長期 Access Key は 0 個になりました。運用中に plan_requirements: mergeable が PR を常にブロックしたバグは、オプションを切らずに自ら修正し PR #6186 として v0.41.0 にマージされました。",
        links: [
          { label: "PR #6186", url: "https://github.com/runatlantis/atlantis/pull/6186" }
        ]
      },
      {
        projectId: 7,
        diagram: null,
        summary: "マネージド FaaS の実行時間上限とデータ流出の制約を EC2 上で取り払い、代わりに背負った拡張性はコールドスタートを三つの層に分けて解きました。",
        outcome: "実行単位のコールドスタートを 3秒から 0.2秒へ、ワーカーの IAM を単一キューの 3アクションに縮小",
        problem: "HTTP リクエスト処理を EC2 上で行う制約のもと、Lambda が担っていた関数のアップロード、呼び出し、即時実行を自作し、スケーラビリティも自分で担保する必要がありました。",
        decision: "6 時間で動かした API Gateway と Dispatcher Lambda のプロトタイプはリクエスト経路に API Gateway が残るため取り外し、ALB と EC2 Controller へ移行しました。コールドスタートを実行単位、ワーカーインスタンス、スケーリング判断の三層に分け、スケーリング基準は事後指標の CPU ではなく SQS キュー長にしました。",
        result: "実行単位は 3 秒から 0.2 秒へ、ASG Warm Pool で常時 2 台分の費用のまま 5 台分の拡張を準備しました。フィボナッチ 1 万件で約 11 秒（同一ワークロードの Lambda は 30〜40 秒）、2 日間の AWS 費用は約 3 万ウォンです。",
        links: [
          { label: "AWS Article", url: "https://builder.aws.com/content/3I2Mw8lAM0x9sODvAwmHN8RylXM/building-a-faas-on-ec2-without-lambda-and-splitting-cold-start-into-three-layers" },
          { label: "GitHub", url: "https://github.com/Softbank-Final" }
        ]
      },
      {
        projectId: 4,
        diagram: null,
        summary: "デプロイ基準をチームごとに合意して固定し、リリース文書そのものを DORA 指標の源泉にして、デプロイが終われば測定も終わるようにしました。",
        outcome: "DORA 4指標を毎日自動算出、クルーとリーダーが同じダッシュボードで確認",
        problem: "業務は Notion のタスクに、デプロイはリリース文書に、障害はさらに別の DB に散らばっており、組織として生産性を点検する一つの基準がありませんでした。",
        decision: "測定専用ツールを入れると測定がもう一つの業務になるため、全員が既に使っている Notion から抽出しました。コミット数やトークン使用量は生産性の根拠として不十分と判断して却下し、意味のあるデプロイだけを認め、レビューは個々の精度より一貫性を取って Notion カスタムエージェントに任せました。",
        result: "チーム別のデプロイ基準を各チームと合意して文書で固定し、DORA 4 指標を毎日自動算出してクルーとリーダーが同じ画面で見ています。この指標は R&R の議論と 1on1 の話題に使われています。",
        links: []
      }
    ],
    writing: [
      { kind: "AWS Builder Center", title: "Building a FaaS on EC2 without Lambda and splitting cold start into three layers", url: "https://builder.aws.com/content/3I2Mw8lAM0x9sODvAwmHN8RylXM/building-a-faas-on-ec2-without-lambda-and-splitting-cold-start-into-three-layers" },
      { kind: "Open Source", title: "runatlantis/atlantis PR #6186: plan_requirements: mergeable で autoplan が常にブロックされるバグの修正 (v0.41.0)", url: "https://github.com/runatlantis/atlantis/pull/6186" },
      { kind: "Paper", title: "IoTログパイプラインの階層別ランタイム割当（WebAssembly vs コンテナ）", url: "/assets/wasm-spinkube-iot-layer-allocation.pdf" }
    ],
    about: {
      title: "About Me",
      intro: [
        "こんにちは！**DevOps Engineer**の**高東見**（コ・ドンヒョン）です。",
        "Terraform・Kubernetesベースのインフラと GitOps デプロイ環境を構築・運用しています。最近は**LLM と Notion エージェントで社内の反復業務を自動化する AX**に注力しており、問題を抱えたチームのそばで直接聞いて直すやり方を取っています。",
        "**AWS Student Builder Group at Dongguk University の Leader**として、Hands-on Seminar を10回以上、Dongguk Dev Conference 2026 を開催しました。"
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
          title: 'DevOps Engineer / Infra・Platform・AX',
          company: 'BUZZ & BEYOND',
          period: '2026.01 ~ 在職中 (インターン 2026.01~06 · 正社員 2026.07~)',
          description: [
            'Terraform・Atlantisで社内GitOps環境を構築',
            [
              'PR単位の承認を強制し、Terraform作業の監査証跡を全件確保',
              'AWS AssumeRoleの最小権限に移行、開発者ローカルのAccess Keyを全量回収',
              'Atlantis OSS貢献 [PR #6186](https://github.com/runatlantis/atlantis/pull/6186) マージ（v0.41.0に反映）'
            ],
            '社内 AX 生産性指標の体系を構築（測定指標として DORA を採用）',
            [
              '1日200件以上の業務を自動分類（精度91.7%）',
              'チーム別のデプロイ基準を合意・文書化し算出基準として固定、役割分担の議論と 1on1 の話題として活用'
            ],
            'インバウンドリードの SLA 体系を構築',
            [
              'リード受付から担当者割り当てまでの平均を 33.6 時間から 0.4 時間へ短縮（98.7% 短縮）、1 時間以内の担当者割り当て率 9% → 86%',
              '営業時間基準で SLA を自動計測し、放置リードの通知・エスカレーション体系を構築'
            ],
            'Notionの社内エージェントを構築・運用',
            [
              'デプロイ品質のレビューを自動化',
              'ベンダー別LLMコストラベリング、使用量モニタリング環境とアラートシステムを構築'
            ]
          ],
          tags: ['Kubernetes', 'Terraform', 'Atlantis', 'AWS', 'Notion', 'Argo Workflows', 'Datadog', 'Gemini', 'Python']
        },

        {
          title: 'AWS Student Builder Group at Dongguk University',
          company: 'Amazon Web Services (AWS)',
          period: '2025.07 ~ 現在',
          description: [
            'Cloud Club Member 2025.07 ~ 2026.04、Leader 2026.05 ~ 現在',
            '専攻を問わない学生向けに Hands-on Seminar を10回以上運営（[Meetup](https://www.meetup.com/aws-sbg-at-dongguk-university-seoul-campus/events/?type=past)）',
            'AWS SBG バッジ7種を取得（Leader、Spark、Ignite、Surge、Strato、Flare、Apex。最上位の Apex は6回開催基準、[AWS SBG Apex Badge](https://www.credly.com/badges/796266ba-affe-4d6c-a811-5d0c33ce1bd4)）',
            'Dongguk Dev Conference 2026 を統括（2026.10.02、7つの開発サークルから約100名が参加、総合満足度 4.80/5、[LinkedIn レポート](https://www.linkedin.com/feed/update/urn:li:activity:7512849701973471232/)）',
            'LinkedIn [AWS Student Builder Group at Dongguk University](https://www.linkedin.com/company/aws-student-builder-group-at-dongguk-university/) ページ運営',
          ],
          tags: ['AWS', 'Leadership']
        },
        {
          title: 'Notion Campus Leader at Dongguk University',
          company: 'Notion',
          period: '2026.08 ~ 現在',
          description: [
            '学内の Notion 公式キャンパスリーダーとして、学内向け Notion 教育セッションの運営、Notion マーケットプレイスに[大学生開発プロジェクト管理ハブ](https://www.notion.com/ko/templates/student-dev-project-hub)テンプレートを公開、社内業務自動化事例の共有を担当'
          ],
          tags: ['Notion', 'Community']
        },
        {
          title: '学部研究生 (CSDC Lab)',
          company: '東国大学校 Computer Security & Distributed Computing Lab',
          period: '2025.04 ~ 現在',
          description: [
            'ネットワークセキュリティおよび負荷分散関連研究遂行',
            'NLP基盤IaCセキュリティ分析ツール個別研究。TerraformのIAMリソース関係をグラフ化し、ルールベースのスキャナー（TFSec、Checkov）が見逃す期限切れアカウント、未使用アカウント、サービス目的と権限の不一致を検知',
            'WebAssembly とコンテナの実環境比較の個別研究。AKS で IoT ログパイプラインを階層別に実測しランタイム割当基準を導出（論文 [PDF](https://gosorasora.github.io/assets/wasm-spinkube-iot-layer-allocation.pdf)）'
          ],
          tags: ['Network Security', 'Load Balancing', 'AWS', 'NLP', 'WebAssembly']
        }
      ],
      education: [
        {
          title: '東国大学校',
          degree: '工科大学 コンピュータ工学科 学士（在学中）',
          period: '2021.03 ~ 2027.02（予定）',
          description: ['GPA 4.09 / 4.5', '工科大学 学期優等生 4回選定']
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
          role: '1st Member',
          period: '2022.03 ~ 2023.09',
          description: ['特定ベンダーに依存しない (vendor-neutral) IT連合サークルの1期メンバー', 'AWS・GCPなどベンダーを問わずクラウドインフラを扱い、学習とプロジェクトを実施']
        },
        {
          title: 'SoftBank Hackathon',
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
          title: 'AWS Certified Cloud Practitioner',
          issuer: 'Amazon Web Services',
          date: '2026.10',
          description: ['[AWS Certified Cloud Practitioner](https://www.credly.com/badges/364200c3-4fce-450b-b925-171f149f8742)']
        },
        {
          title: 'AWS Student Builder Group Badges (7)',
          issuer: 'AWS Community',
          date: '2026.09',
          description: ['Credlyバッジ: [AWS SBG Leader Badge](https://www.credly.com/badges/ca013a7a-bc99-46ff-bc2f-86a68164c29f), [AWS SBG Spark Badge](https://www.credly.com/badges/bdb73658-bfcb-4db4-b80e-d9954463efab), [AWS SBG Ignite Badge](https://www.credly.com/badges/87b30bf8-698c-45e4-be0e-6df7ab4f0c43), [AWS SBG Surge Badge](https://www.credly.com/badges/bac12f82-26a2-4568-975f-31ac7c1801f0), [AWS SBG Strato Badge](https://www.credly.com/badges/2e7e222a-e5de-4017-a2f9-4f631718c6df), [AWS SBG Flare Badge](https://www.credly.com/badges/75b7e9a1-751b-4e28-a92e-9ea85d0c2932), [AWS SBG Apex Badge](https://www.credly.com/badges/796266ba-affe-4d6c-a811-5d0c33ce1bd4)']
        },
        {
          title: 'AWS Cloud Club Captain: Bronze, Silver',
          issuer: 'AWS Community',
          date: '2026.06',
          description: ['Credlyバッジ: [Cloud Club Captain Bronze](https://www.credly.com/badges/26a9d4fb-de53-4d57-b24a-1d98025765b0), [Cloud Club Captain Silver](https://www.credly.com/badges/1fe9561a-cf64-4896-afba-65d24dbe2bd1)']
        },
        {
          title: 'Google Cloud Fundamentals: Core Infrastructure',
          issuer: 'Google Cloud Skills Boost',
          date: '2025.10'
        },
        {
          title: 'Notion Badge: Essentials · Workflows · Advanced',
          issuer: 'Notion',
          date: '2026.06',
          description: ['バッジ認証: [Notion Essentials Badge](https://verify.skilljar.com/c/u3fmkfvpnv26) · [Notion Workflows Badge](https://verify.skilljar.com/c/uqe3e88dh56v) · [Notion Advanced Badge](https://verify.skilljar.com/c/nvh6hj8dxfrx)']
        },
        {
          title: 'SQLD (SQL Developer)',
          issuer: '韓国データ産業振興院',
          date: '2024.09'
        },
        {
          title: '情報処理技能士',
          issuer: '韓国産業人力公団',
          date: '2022.12'
        }
      ],
      awards: [
        {
          title: '東国大学校 工科大学 学期優等生（4回）',
          issuer: '東国大学校 工科大学',
          date: '2021.07 ~ 2025.07',
          description: ['2021年度1学期・2学期、2022年度1学期、2025年度1学期に選定']
        },
        {
          title: 'U-LINC アドベンチャーデザインコンペティション 奨励賞',
          issuer: '東国大学校 LINC3.0事業団長',
          date: '2022.12',
          description: ['Team Leaderとして参加し奨励賞受賞']
        },
        {
          title: '学内学習施設 混雑度分析システム 奨励賞',
          issuer: '東国大学校 LINC3.0事業団長',
          date: '2022.12',
          description: ['センサーベースのインフラを構築し、図書館以外のラウンジ・カフェ等の非指定席の占有状況を確認', '出入自動検知システムによりエリアごとの在席人数をリアルタイムに判定するシステムを開発']
        },
        {
          title: '松明賞 (トーチ賞)',
          issuer: '陸軍情報通信学校長 (准将)',
          date: '2023.08',
          description: ['軍生活後半期教育 受講生200名中 1位の成績により受賞']
        }
      ]
    },
    portfolio: {
      title: "Other Projects",
      metrics: { 2: "PR #6186 マージ、v0.41.0 に収録", 3: "日次 200件+ 自動分類", 15: "担当者割り当て 33.6時間 → 0.4時間", 6: "AKS 1.34 実測", 5: "PR #124 マージ", 8: "オフシーズンの遊休リソースコスト 0円", 11: "2022年に自主的に移行", 12: "ベンダーと用途別の支出追跡、しきい値アラート", 13: "チーム別デプロイ基準を文書化", 14: "全社展開" },
      order: [3, 2, 15, 13, 14, 12, 6, 5, 10, 9, 8, 11],
      filters: {
        all: "全て",
        web: "DevOps & Infra",
        ai: "AX 業務自動化",
        research: "OSS貢献",
        security: "Security",
        platform: "Platform Engineering"
      },
      modal: {
        detail: "詳細を見る",
        overview: "概要",
        role: "役割",
        techStack: "技術スタック",
        keyFeatures: "主要機能",
        links: {
          github: "GitHub",
          demo: "Live",
          paper: "Paper",
          article: "Article"
        }
      },
      projects: [
        {
          id: 1,
          title: 'Atlantis による GitOps Terraform CI/CD 構築',
          category: 'DevOps & Infra',
          image: null,
          description: 'インフラの変更が承認を経てからのみ反映されるように変え、誰がいつ何を変えたかをすべて記録に残しました。サービスごとに権限を分け、個人PCのアクセスキーをすべて回収しました。',
          how: "外部 SaaS にステートを預ける Terraform Cloud と、plan の可読性やロック管理が弱い汎用 CI を比較し、Atlantis のセルフホストを採用しました。",
          details: {
            problem: 'エンジニアがローカルでTerraformを直接実行し、状態ファイル衝突・変更履歴追跡不可・環境間整合性問題が頻発',
            solution: 'AtlantisをKubernetesクラスタにHelm Chart基盤でデプロイし、PR基盤GitOpsワークフローに転換しました。全てのインフラ変更がコードレビューを経て承認後にのみ適用されるようにし、運用透明性を確保しました。AWS AssumeRoleアーキテクチャを設計し、開発者ローカルのAccess Keyを全面回収して最小権限原則基盤のセキュリティ体系を構築しました。',
            role: 'Platform Engineer',
            tech: ['Terraform', 'Atlantis', 'Kubernetes', 'Helm', 'AWS IAM', 'Golang'],
            features: [
              'Helm Chart基盤 Atlantis K8sデプロイ',
              'PR基盤コードレビュー後インフラ変更適用',
              'AWS AssumeRole最小権限セキュリティ体系構築',
              'ローカル実行による迂回を遮断：削除権限の一括除去は誤作成リソースも消せなくなり、タグベース制御はタグ変更で回避されるため却下。ステートファイルのバケットポリシーで許可リスト外をすべて拒否しました。明示的拒否が明示的許可に優先するため、リストにない者は管理者権限でもステートを読めません。ポリシー誤設定でパイプラインが停止する場合に備え、緊急用の管理者アカウントは許可リストに残しています',
              'Atlantis v0.41.0 OSSバグ修正貢献 (PR Merged)'
            ]
          },
          links: { demo: null, github: 'https://github.com/runatlantis/atlantis/pull/6186' }
        },
        {
          id: 2,
          title: 'Atlantis OSS バグ修正貢献',
          category: 'OSS貢献',
          image: null,
          description: 'Atlantis autoplanでplan_requirements: mergeable設定時にPRが常にブロックされるバグを発見し直接修正、v0.41.0にMerge',
          how: "オプションを切る迂回は自ら定めた基準を下げることになるため選ばず、初めて読む Go のコードを追って、autoplan の経路にだけ欠けていた PR のマージ状態の取得を追加しました。",
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
          id: 7,
          title: 'NanoGrid: マネージド FaaS の制約を取り払った関数実行プラットフォーム',
          category: 'DevOps & Infra',
          image: null,
          description: 'マネージドFaaSが定めていた実行時間の上限、ランタイム制約、推論データの外部流出をEC2上で取り払った関数実行プラットフォーム。代わりに自ら背負うことになった拡張性は、コールドスタートを三つの層に分けて解決しました。実行単位は3秒から0.2秒へ、サーバーは普段2台分の費用だけで、5台まですぐに増やせるよう準備しました（SoftBank Hackathon本選）',
          how: "CPU は事後指標のため却下して SQS キュー長のアラームでスケーリングし、リクエストごとに作っていたコンテナはランタイム別のプールから借りる方式に変えました。",
          details: {
            problem: 'HTTPリクエスト処理をEC2上で行うという制約のもと、Lambdaが代わりにやってくれていたことを自分で作る必要がありました。関数のアップロード、HTTP呼び出し、即時実行をマネージドFaaSなしで実装し、スケーラビリティを自分で担保しなければなりませんでした。',
            solution: 'まず既存FaaSの限界がEC2上で解けるかを検討しました。API Gatewayの29秒タイムアウト、ランタイム制約、ベンダーロックイン、推論データの外部流出は解けますが、スケーラビリティだけが悪化する構造でした。慣れているAPI GatewayとDispatcher Lambdaで6時間でプロトタイプを動かしましたが、リクエスト経路にAPI Gatewayが残る構成だったため取り外し、ALBとEC2 Controllerへ移行して実行時間の上限をなくし、コンピュートを置くサブネットを自分で決められるようにしました。残ったスケーラビリティの問題を掘り下げる中で、コールドスタートが実行単位、ワーカーインスタンス、スケーリング判断という時間規模の異なる三層であることを確認し、それぞれに別の道具を当てました。任意のユーザーコードを実行するプラットフォームのため、Zip Slip遮断、コンテナリソースクォータ、ジョブ単位のタイムアウト、IAM最小権限、WAFルール5種も併せて適用しました。',
            role: 'Infrastructure & Security',
            tech: ['AWS EC2', 'ALB', 'Auto Scaling Warm Pool', 'AWS SQS', 'AWS S3', 'DynamoDB', 'ElastiCache Redis', 'AWS WAF', 'Terraform', 'Docker', 'Prometheus', 'Ollama', 'GCP Cloud Storage'],
            features: [
              '① 実行単位: ランタイム別（Python、Node.js、C++、Go）にコンテナプールを事前起動し、リクエストごとに作らず借りて返す方式へ。3秒から0.2秒。Prometheusのworker_job_duration_secondsヒストグラムで前後の分布シフトを測定',
              '② ワーカーインスタンス: EC2 Auto Scaling Warm Poolでインスタンスを停止状態で待機。InService 2台 + Warm Pool 3台で、常時2台分の費用のままASG最大5台分の拡張を準備。停止状態はコンピュート課金なし、EBSのみ',
              '③ スケーリング判断: CPUではなくSQSキュー長を基準に。CPUは事後指標のため閾値に達した時点でユーザーは既に遅延を体験済み。Backlog per InstanceとStep Scalingで過剰プロビジョニングを防止',
              '負荷テスト: フィボナッチ1万件で約11秒（同一ワークロードのLambdaは30〜40秒）。個別実行がミリ秒単位のワークロードでは実行環境の割当オーバーヘッドが全体時間を支配',
              'セキュリティ: ワーカーのIAMをマネージドSQS FullAccessから単一キューの3アクションへ縮小し、影響範囲をアカウント全体から一つのキューに限定。WAFルール5種（SQLi、XSS、Log4j、レート制限、ボディサイズ上限）',
              'ネットワーク: Multi-AZ構成。Controllerはパブリックサブネット2 AZ、Workerはプライベートサブネット。両者を繋ぐのはSQS一つのみ。S3とDynamoDBにGateway VPC Endpointを付けてNATを迂回',
              'Private AI Node: プライベートサブネットにOllamaを配置し、インターネット経路とパブリックアドレスなしでワーカーのSGからのみアクセス許可。推論データがVPC外へ出ない構成',
              'マルチクラウド冗長化：期間中にAWSの一リージョンで火災による実際の障害を経験し、単一ベンダーに依存すると打つ手がないことを確認してGCP Cloud Storageへデータを複製しました',
              '2日間のAWS費用は約3万ウォン'
            ]
          },
          links: { demo: null, github: 'https://github.com/Softbank-Final', article: 'https://builder.aws.com/content/3I2Mw8lAM0x9sODvAwmHN8RylXM/building-a-faas-on-ec2-without-lambda-and-splitting-cold-start-into-three-layers' }
        },
        {
          id: 9,
          title: 'Deploy Land: Gamified CI/CD Platform',
          category: 'DevOps & Infra',
          image: null,
          description: 'デプロイという行為自体を楽しくしたサーバーレス CI/CD プラットフォーム。ログだけが流れる画面を、キャラクターがパイプラインを走り抜けるゲーム画面に変えてデプロイ状態をリアルタイム共有',
          how: "パイプラインの成功応答を最終判定とせず、デプロイ後に Elastic Beanstalk のヘルスと実際の HTTP 200 を再確認し、通らなければ失敗に切り替えました。",
          details: {
            problem: 'デプロイ状態がログとしてしか存在せず、開発者以外は進行状況が分からず、失敗の認知も遅れていた。パイプラインの成功応答だけでは、デプロイしたサービスが実際に応答するかは分からなかった。',
            solution: 'デプロイを見守る行為をゲームにしました。GitHub Push から Build、Deploy、Health Check までの状態を、キャラクターがパイプラインの各ステージを走り抜ける画面としてリアルタイム共有します。CodePipeline・CodeBuild・Elastic Beanstalk の状態変化を EventBridge が捕捉し、Lambda が DynamoDB に記録、Amplify のモニタリングアプリが描画します。パイプラインが成功を返しても最終成功とはみなさず、デプロイ後に Elastic Beanstalk 環境のヘルスと実際の HTTP 200 応答を再確認し、通らなければ失敗に切り替えます。失敗ログは Bedrock で原因を要約し、呼び出し制限（ThrottlingException）には指数バックオフで最大3回再試行、Discord・Slack に即時通知します。Infra と Backend を担当し、Terraform インフラと Lambda API を実装しました。',
            role: 'Infra & Backend',
            tech: ['AWS CodePipeline', 'AWS CodeBuild', 'Elastic Beanstalk', 'AWS Lambda', 'Amazon EventBridge', 'DynamoDB', 'Amazon Bedrock', 'AWS Amplify', 'Terraform'],
            features: [
              'キャラクターがパイプラインを走り抜けるゲーム型リアルタイムデプロイモニタリング',
              'GitHub Push → Build → Deploy → Health Check 全過程自動化',
              'EventBridge → Lambda → DynamoDB で状態を記録し、DynamoDB Streams が Health Check Lambda を再度呼び出す2段構成',
              'パイプライン成功後に EB 環境ヘルスと HTTP 200 を再確認し未通過なら失敗判定、Bedrock 失敗ログ要約（Throttling 時は指数バックオフで再試行）',
              'Discord・Slack 即時通知、Terraform IaC インフラ管理'
            ]
          },
          links: { demo: null, github: 'https://github.com/Deploy-Land' }
        },
        {
          id: 3,
          title: 'Notion + FLEX: 業務量モニタリングの仕組みの構築・運用',
          category: 'AX 業務自動化',
          image: null,
          description: 'Notion の業務記録と FLEX の勤怠データをつなぎ、チームごとの休暇、実際の業務記録、生産性への影響度を判断できる指標体系とモニタリングを構築・運用。1日200件以上の業務を LLM で13の業務タイプと14のミーティングタイプに自動分類',
          how: "Notion の業務記録と FLEX の勤怠をつないでチーム別の業務量を見られるようにし、同じタイトルでもどのロードマップの仕事かで種類が変わるため、単一プロンプトではなくロードマップの性格を先に判定する二段の分類にしました。",
          details: {
            problem: '手動分類で発生するヒューマンエラーによりタスク分類が一貫せず、組織構成員の実際のWorkloadがどこに使われているか追跡不可能な状態',
            solution: '既存の分散されたNotionタスクデータを統合し、Gemini 2.5 Flash基盤の階層的分類ロジック（ロードマップ性格＋タスクコンテキスト）を適用して13個の業務タイプ・14個のミーティングタイプに自動分類しました。構成員別Workloadが実際にどこに投入されているか定量的に追跡できる基盤を確保しました。',
            role: 'DevOps & AX Engineer',
            tech: ['Gemini', 'Argo Workflows', 'Python', 'Apollo Federation', 'GraphQL'],
            features: [
              '分散Notionデータ統合及びGemini 2.5 Flash階層的分類',
              '日次200件+自動分類、精度91.7%',
              '構成員別Workload投入現況の定量的追跡体系構築',
              'Argo CronWorkflow毎日定期実行',
              'Apollo Federation Subgraph分離で再利用性確保'
            ]
          },
          links: { demo: null, github: null }
        },
        {
          id: 4,
          title: '生産性指標の仕組みづくり',
          category: 'AX 業務自動化',
          image: null,
          description: '「何をデプロイと数えるか」をチームごとに合意して文書で固定し、デプロイ頻度や失敗率などの指標を毎日自動で算出しています。言葉でしか語れなかった生産性を数字で示せるようになり、社内AX転換の主要指標として使っています。',
          how: "コミット数は変更量にすぎず、トークン使用量は操作しやすいため却下し、各チームと合意した意味のあるデプロイだけを生産性と認めました。",
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
          description: 'Spin Framework Python SDKのPostgresサンプルがクエリ結果を返さなかった問題を、他ユーザーのIssue（#115）を受けて修正しマージ（PR #124）。サンプル文書の誤り2件も修正（#126、#128）',
          how: "Python のサンプルだけが結果をログに流して固定文字列を返していたため、他言語 SDK のサンプルと同様にカラム名と行を表形式でレスポンス本文に返すよう直しました。",
          details: {
            problem: 'spin-postgresサンプルがクエリ結果をサーバーログにのみ出力し、HTTPレスポンスには固定文字列を返していたため、サンプル通りに動かしてもPostgresの結果を確認できなかった',
            solution: 'SpinのPostgresバインディングが値をラッパーオブジェクトで返す点に合わせてformat_value、format_rowsetヘルパーを追加し、カラム名と行を表形式でレスポンス本文に返すよう修正しました。サンプルが前提とするtestテーブルの作成SQLをREADMEに追加し、手順通りに実行できるようにしました。',
            role: 'Open Source Contributor',
            tech: ['Python', 'WebAssembly', 'Spin Framework', 'Git'],
            features: [
              'PR #124: 他ユーザーが起票したIssue #115を解決、2025.12.15マージ',
              'format_value、format_rowsetヘルパーでクエリ結果をHTTPレスポンスに表形式で返却',
              'READMEにサンプル用testテーブルの作成SQLを追加',
              'PR #126、#128: サンプルREADMEのタイトル誤りとタイプミスを修正（自ら起票したIssue #125、#127）'
            ]
          },
          links: { demo: null, github: 'https://github.com/spinframework/spin-python-sdk/pull/128' }
        },
        {
          id: 6,
          title: 'IoT ログパイプラインの階層別ランタイム割当（WebAssembly vs コンテナ）',
          category: 'DevOps & Infra',
          image: null,
          description: 'AKS 1.34 の実環境で同一の Go ワークロードを SpinKube Wasm モジュールとコンテナで実装し、階層ごとに実測比較。ベンダーが主張するコールドスタートの優位が運用スタックを通過した後にどこまで残るかを検証',
          how: "ベンダーのマイクロベンチマークを鵜呑みにせず、同一の Go ワークロードを Wasm とコンテナで実測し、階層別の割当を提案しました。",
          details: {
            problem: 'Wasm ランタイムのベンダーはコンテナ比でコールドスタート約400倍、Pod 密度43倍の優位を主張するが、これらは隔離されたマイクロベンチマークの数値である。Kubernetes の運用スタック（shim・SDK・HTTP 階層）を通過した end-to-end 経路でも同じ優位が残るかは検証されていなかった。',
            solution: 'IoT ログパイプラインを Edge・Transform・Ingestion・Storage の四階層としてモデル化し、そのうち三階層を同一の Go ワークロードによる SpinKube Wasm モジュールと scratch コンテナの二通りで実装し、Azure Kubernetes Service（AKS 1.34）上で実測比較しました。言語・ビジネスロジック・負荷条件を統制してランタイム差のみを隔離測定し、Shapiro-Wilk の正規性検定の後に Welch の t 検定または Mann-Whitney U 検定を自動選択、確証的10指標群に Bonferroni 補正を適用しました。その結果、ベンダーが示したランタイム水準の定量的優位は実際の運用スタックを通過する過程で大きく希釈され、階層ごとに有利なランタイムが逆転することを確認し、単一ランタイムの選択ではなく階層別割当を提案しました。これに先立つ先行実験では Python Wasm の演算限界を Rust ネイティブ Wasm への移行で解決し、バイナリ91倍削減（35.86MB→0.39MB）とスループット7.8倍向上を得ました。',
            role: '学部研究生（CSDC Lab 個別研究・単独）',
            tech: ['SpinKube', 'WebAssembly', 'WASI', 'Rust', 'Go', 'Azure AKS', 'KEDA', 'Kubernetes', 'containerd-shim-spin', '統計検定'],
            features: [
              'インスタンス化の実測は0.436ms でベンダー主張（0.5ms）と統計的に区別されず（p=0.71）。ただし全体の要求経路1.55ms のうちランタイムの比重は28%、残り72%は Kubernetes・shim・SDK・HTTP 階層',
              'Ingestion 階層はコンテナ優位: 24〜28K rps を維持 vs Wasm 約1,264 rps の限界（19〜22倍）',
              'Transform 階層は Wasm 優位: テナント別隔離を強制するとコンテナは約41 Pod で限界、Wasm 共有プールは8,000テナントを無損失で収容。テナント当たり費用は最大64倍安価（$4.69→$0.07）',
              'Edge 階層は Wasm 優位: scale-from-zero のコールドスタートが11倍高速、arm64 ビルドのコンテナが amd64 ノードで失敗した一方、同一 Wasm モジュールは cross-arch で動作',
              '先行実験: Python Wasm から Rust ネイティブ Wasm への移行でバイナリ35.86MB→0.39MB（91倍）、スループット1,713→13,389 req/s（7.8倍）',
              'Threats to Validity を6件明示（6 vCPU の free-tier クラスタ、単一 Go ワークロード、測定ツールの基準差など）'
            ]
          },
          links: {
            demo: null,
            github: null,
            papers: [
              { label: '論文・階層別ランタイム割当（AKS 実測）', url: '/assets/wasm-spinkube-iot-layer-allocation.pdf' },
              { label: '先行実験資料・ランタイム比較と Rust 最適化', url: '/assets/wasm-spinkube-runtime-comparison.pdf' }
            ]
          }
        },
        {
          id: 8,
          title: 'Roomeya: Serverless Dormitory Matching',
          category: 'DevOps & Infra',
          image: null,
          description: 'シーズン別寮マッチングサービス。AWSフルサーバーレスアーキテクチャ + Terraform IaC（Lambda 9個、Step Functions、DynamoDB）',
          how: "シーズン制のサービスのため Lambda と DynamoDB オンデマンドで組み、使用量プランが不要なので REST API ではなく HTTP API v2 を選びました。",
          details: {
            problem: 'シーズン別運用特性による遊休コスト発生とマッチングワークフローの複雑性',
            solution: 'Lambda 9個関数、Step Functionsマッチングワークフロー、DynamoDB 4テーブル、API Gateway（HTTP API v2）、Cognito OAuth 2.0認証、SESメール送信まで全インフラをTerraformでコード化しました。LambdaとDynamoDBオンデマンド（PAY_PER_REQUEST）のみで構成し、オフシーズンの遊休コストは0円です。アンケート収集、マッチング演算、結果通知の流れがどこで止まったか見えるようマッチングワークフローをStep Functionsに置いて実行履歴をコンソールで確認できるようにし、使用量プランやリクエスト検証が不要だったためREST APIではなくコストと遅延の低いHTTP API v2を選びました。オフシーズンにリソースを落とし、シーズンに再構築できるよう全てTerraformで残しました。',
            role: 'Cloud Architect',
            tech: ['Terraform', 'AWS Lambda', 'AWS Step Functions', 'DynamoDB', 'API Gateway', 'Cognito'],
            features: [
              'Lambda 9個関数 + Step Functionsマッチングワークフロー',
              'DynamoDB 4テーブル（Forms, FormResponses, Results, Students）',
              'Cognito OAuth 2.0認証 + API Gateway HTTP API',
              'LambdaとDynamoDBオンデマンド構成でオフシーズン遊休コスト0円',
              'Terraformで全インフラコード化'
            ]
          },
          links: { demo: null, github: 'https://github.com/Roomeya' }
        },
        {
          id: 10,
          title: 'NLP-based IaC Security Analyzer',
          category: 'Security',
          image: null,
          description: 'TerraformのIAMリソース関係をグラフ化し、時間とサービス目的のコンテキストを併せて見るセキュリティ分析ツール。ルールベースのスキャナーが見逃す期限切れアカウント、未使用アカウント、目的の不一致を検知',
          how: "既存スキャナーを置き換えず補完する方針で、IAM の関係をグラフ化し、有効期限とサービス目的はルールベースで分析して Checkov の結果と統合しました。",
          details: {
            problem: 'ルールベースの静的分析ツール（TFSec、Checkov）はパターンに合うものしか検知できず、個々のリソースは正常でも繋ぐと危険になる構成や、期限切れアカウントのような時間に基づくリスクを見逃す',
            solution: 'python-hcl2でTerraformをパースしてIAMリソース関係（assume_role、pass_roleなど7種）をNetworkXのグラフにし、危険なIAMアクション17種の辞書とアクションの組み合わせ照合で権限昇格経路を判定しました。アカウントの有効期限と最終使用日、サービス目的と付与権限を併せて比較し、ルールベースのスキャナーが構造的に見られないリスクを検知します。既存ツールを置き換えず補完するようCheckovの結果を統合するモジュールを設け、BERT（bert-base-uncased）の埋め込み類似度モジュールも実装しました。',
            role: 'Security Researcher & Developer',
            tech: ['Python', 'BERT', 'Terraform', 'NetworkX', 'AWS IAM', 'Hugging Face', 'NLP'],
            features: [
              '期限切れアカウント、未使用アカウント、目的の不一致、時間に基づくリスクなどTFSecとCheckovが検知しない類型を検知',
              'IAM関係グラフ上で危険アクション17種の辞書とアクション組み合わせ照合により権限昇格経路を判定',
              'Checkovの結果を統合し既存スキャナーと相互補完',
              '検知機能の動作をユニットテスト11件で固定'
            ]
          },
          links: { demo: null, github: 'https://github.com/Gosorasora/NLP-Enhanced-IaC-Security-Analyzer' }
        },
        {
          id: 11,
          title: 'AWS クラウド移行（CAPS サークル）',
          category: 'DevOps & Infra',
          image: null,
          description: '2022年、頼まれたわけではなくサークルのサーバーを物理PCからAWSへ自ら移行。停電や再起動で止まっていたサービスを常時稼働にし、学外からも管理可能に',
          how: "停電や再起動のたびに止まり、学内に行かなければ触れなかったサークルのサーバーを、誰に言われるでもなく 2022年に自ら AWS へ移しました。",
          details: {
            problem: '物理PCで動かしていたサークルサーバーが停電や再起動の影響をそのまま受け、管理者が学内にいなければ対応できなかった問題',
            solution: 'サークルサーバーをAWSへ移行し、停電や再起動の影響をなくして学外からも管理できるようにし、24/7サービス可用性を確保しました。',
            role: 'Cloud Architect',
            tech: ['AWS EC2', 'AWS EBS', 'AWS S3', 'AWS RDS', 'Docker'],
            features: [
              'AWSクラウド全面マイグレーション',
              '24/7サービス可用性確保',
              '停電や再起動の影響と現地管理の必要性を排除',
              'Docker基盤コンテナ化'
            ]
          },
          links: { demo: null, github: null }
        },
        {
          id: 12,
          title: 'LLM コストのラベリング基盤構築',
          category: 'DevOps & Infra',
          image: null,
          description: 'LLMの呼び出しごとに、どのベンダーのモデルをどの用途で使ったかの印を付け、用途別の支出を追跡し、上限を超えると通知が届くようにしました。',
          how: "AI 活用を広げる前に用途別の支出が見えるべきだと考え、社内 LLM サーバーのコードにベンダーと用途のラベルを先に付けました。",
          details: {
            problem: '社内のLLM利用が増える中、どのベンダー・機能でコストが発生しているか追跡できず、コスト管理が困難な状況。',
            solution: '社内LLMサーバーのコードにベンダー・用途ベースのラベリング方式を追加し、Vertex AI、AI Studio、OpenAIなどベンダー別のLLM支出をモニタリングできる基盤を整備しました。AI活用を広げる前に、用途別の支出がまず見えている必要があると判断して進めた作業です。入社初期の課題として進め、社内コード規約やGraphQLコンベンションを素早く習得する機会にもなりました。',
            role: 'AX / Platform Engineer',
            tech: ['GraphQL', 'Cost Monitoring', 'FinOps'],
            features: [
              'ベンダー別（Vertex AI・AI Studio・OpenAI）LLMコストラベリング',
              '使用量モニタリング環境と閾値ベースのアラートシステムを構築',
              'LLMコストラベリング作成ガイドを文書化'
            ]
          },
          links: { demo: null, github: null }
        },
        {
          id: 15,
          title: 'インバウンドリードの SLA の仕組み構築',
          category: 'Platform Engineering',
          image: null,
          description: '受付 → 担当者割り当ての平均を 33.6 時間から 0.4 時間へ短縮（98.7% 短縮）。「応答」の基準を決めるところから、営業時間基準の計測、通知、長く放置された問い合わせを上位者に引き継ぐ手順まで作りました。',
          how: "担当者の割り当て時刻だけでは数値が良く見えても、顧客が感じる応答は初回コンタクトなのでその基準も併せて残しました。週末の問い合わせを遅延と数えないよう、改善前後とも営業時間基準で計測しました。",
          details: {
            problem: '上半期のリード応答は 1 時間以内 45.5%、平均応答 4.3 時間、9 時間超の放置が 4 件でした。初期対応が遅れるほど商談転換が下がり、そのまま機会損失につながる状態でした。',
            solution: '受付・担当者割り当て・初回顧客コンタクトの時刻を同一基準で自動記録し、営業時間基準で SLA を計測する定義を整えました。担当者が対応できる時間帯にのみ通知が届くよう配信条件を変更し、放置リードのエスカレーションを追加しました。結果として受付から担当者割り当てまでの平均は 33.6 時間から 0.4 時間に短縮され、1 時間以内の割り当て率は 9% から 86% に上がりました。',
            role: 'DevOps / FDE',
            tech: ['Notion', 'Backoffice', 'SLA Metrics', 'アラートing', 'Data Backfill'],
            features: [
              '受付 → 担当者割り当て 平均 33.6 時間 → 0.4 時間（98.7% 短縮）',
              '1 時間以内の担当者割り当て率 9% → 86%',
              '営業時間基準の SLA 自動計測（週末・祝日・時間外を除外）',
              '放置リードの通知・エスカレーション体系を構築'
            ]
          },
          links: {
            demo: null,
            github: null
          }
        },
        {
          id: 13,
          title: 'Notion: デプロイレビューエージェントとリリースデータの整合性',
          category: 'AX 業務自動化',
          image: null,
          description: 'チーム別のデプロイ基準を整備し、エージェントでデプロイ品質を自動レビュー。リリースに紐付いていない作業を見つけてつなぎ、リリース記録と業務記録がずれないようにしました。',
          how: "人のレビューは繰り返すと形骸化するため、個々の判断精度を多少譲っても、同じ基準を適用し続けるカスタムエージェントに任せました。",
          details: {
            problem: 'デプロイ品質の点検やデプロイ基準が人に依存し、漏れやばらつきが発生。リリースとTASKの連携も手作業で管理されていた。',
            solution: 'Notion カスタムエージェントとチーム別のデプロイ基準ドキュメント・プロンプトを整備し、デプロイ品質を自動点検する体系を構築しました。リリースに未連携のTASKを自動マッピングするボットも併せて作成し、先に構築したDORAスコアレポートもカスタムエージェントで完全自動化しました。人によるレビューは初めは正確でも繰り返すうちに形骸化し基準が揺らぐため、個々の判断精度より同じ基準を適用し続けることを選び、エージェントに任せました。',
            role: 'AX Engineer',
            tech: ['Notion Custom Agent', 'プロンプトエンジニアリング', 'Notion API'],
            features: [
              'エージェントによるデプロイ品質の自動点検',
              'リリース関連タスクの自動追跡・紐付け',
              'チーム別デプロイ基準ドキュメント・プロンプトの整備',
              'DORAスコアレポートの完全自動発行'
            ]
          },
          links: { demo: null, github: null }
        },
        {
          id: 14,
          title: 'Notion: カレンダー連動の議事録自動生成エージェント',
          category: 'AX 業務自動化',
          image: null,
          description: 'カレンダーの予定が終わると、決まった形式の議事録が自動で作られるようにし、現在は全社で使われています。',
          how: "議事録の自動化に専用サーバーは過剰と考えて Notion Workers を選び、配布だけでは利用者が増えないためチームごとに導入を案内しました。",
          details: {
            problem: '主催者が議事録を手作業で作成していたため作成タイミングが会議ごとに異なり、事前に作られていないと議題を主催者が作るまで別の場所に置いておく必要があった。アジャイル振り返りでも反復的な手作業として指摘されていた。',
            solution: 'Notion Workers（サーバーレス）を活用し、カレンダー予定から構造化された議事録を自動生成するパイプラインを構築して全社に展開しました。議事録自動化の規模に専用インフラは過剰と判断し、AWS Lambdaに類似したサーバーレスモデルのNotion Workersを選びました。機能を配布するだけでは利用者が増えなかったため、利用ドキュメントを別途作成しチームごとに導入方法を案内しました。',
            role: 'AX Engineer',
            tech: ['Notion Workers (サーバーレス)', 'Notion API', 'Calendar API'],
            features: [
              'カレンダー予定から構造化された議事録を自動生成',
              'AWS Lambda に類似したサーバーレス構成',
              '全社単位での展開・運用'
            ]
          },
          links: { demo: null, github: null }
        }
      ]
    },
    resume: {
      title: "Resume & Skills",
      skillsTitle: "Technical Skills",
      download: "PDFダウンロード (日本語)",
      pdfFile: "resume_jp.pdf"
    }
  }
};
