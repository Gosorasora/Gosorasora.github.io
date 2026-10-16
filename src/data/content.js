export const content = {
  kr: {
    hero: {
      greeting: "Hello, I'm",
      title: "Ko Donghyeon.",
      subtitle: "DevOps Engineer.",
      description: "Terraform과 Atlantis로 인프라 변경을 PR 승인 절차로 옮기고, LLM과 Notion 에이전트로 사내 반복 업무를 자동화합니다.\n사람과의 연결을 중시하는 DevOps 엔지니어입니다. 인프라와 AX로 팀의 일을 잇고, 전공과 동아리가 다른 개발자들이 섞이는 커뮤니티를 만들고 이끌어 왔습니다.\n영업팀 리드 배정처럼 개발 밖의 업무도 담당자를 직접 인터뷰해 측정 기준부터 세웁니다.",
      cta: "프로젝트 보기",
      label: "DevOps Engineer · BUZZ & BEYOND 2026~",
      highlights: [
        { label: "DevOps", text: "Terraform과 Atlantis로 GitOps 구축, 개발자 Access Key 전량 회수" },
        { label: "Open Source", text: "CNCF Atlantis 버그 수정, 공식 릴리스 v0.41.0 반영" },
        { label: "AX", text: "Notion과 FLEX를 잇는 전사 업무량 모니터링 구축 및 운영, CS와 리드 응대 에이전트 구축" },
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
      learned: "배운 점",
      constraints: "구성의 전제와 제약",
      more: "상세",
      zoom: "다이어그램 확대",
      diagram: "아키텍처 보기"
    },
    cases: [
      {
        projectId: 1,
        diagram: "/assets/diagrams/atlantis-gitops.svg",
        diagramAlt: "Atlantis GitOps 구성도. 개발자의 PR이 Bitbucket Webhook으로 Kubernetes 위 Atlantis에 전달되고, 파드의 base role이 서비스별 target role을 AssumeRole해 plan과 apply를 실행합니다. 상태 파일 버킷은 허용 목록 밖의 접근을 거부해 로컬 실행이 막힙니다.",
        summary: "로컬 Terraform 실행을 PR 승인 절차로 옮기고, 그 과정에서 막힌 안전장치는 끄지 않고 업스트림에서 고쳤습니다.",
        outcome: "개발자 PC의 장기 Access Key 0개, 비상 복구 외 Terraform 변경은 PR 단위로 기록",
        problem: "인프라를 만지는 사람이 한 명에서 여럿으로 늘었습니다. 한 명일 때는 로컬에서 terraform apply를 실행해도 문제가 드러나지 않았지만, 사람이 늘자 같은 구조가 그대로 문제가 됐습니다. 전 시스템이 관리자 권한으로 돌아가고 있어 누구에게나 전부를 열어 주는 구조였습니다. 누가 언제 무엇을 바꿨는지 추적할 수 없었습니다. 동시 작업으로 State Lock이 걸리면 누가 잡고 있는지 메신저로 물어봐야 했습니다. 로컬 실행을 위해 개발자 각자가 장기 AWS Access Key를 들고 있었습니다.",
        decision: "변경을 사람의 기억과 합의에 맡기지 않고 저장소의 기록과 승인 절차로 옮기기로 했습니다. Terraform Cloud는 유료이고 상태 파일을 외부 SaaS에 맡겨야 해서 제외했습니다. 범용 CI로 직접 구성하면 plan 결과를 PR에 붙이고 apply를 승인과 연동하는 로직을 전부 만들어야 해 결국 Atlantis를 다시 만드는 일이 됩니다. 그래서 Atlantis를 자체 호스팅했고, 문제가 나면 우리가 고쳐야 한다는 비용을 받아들였습니다. 배포 위치는 별도 EC2 대신 이미 운영 중이던 Kubernetes 클러스터로 정해 관측과 롤아웃, 시크릿 관리를 있던 체계 그대로 썼습니다. Access Key가 남아 있으면 급할 때 누군가는 그 길을 쓰므로 전량 회수하고, AssumeRole로 배포 시점에만 서비스별 최소 권한을 발급했습니다. 로컬 우회는 상태 파일 버킷 정책의 명시적 거부로 막았습니다. 삭제 권한 제거는 잘못 만든 리소스도 못 지우게 되고 태그 기반 제어는 태그를 바꿔 우회할 수 있어 기각했습니다. 긴급 배포 속도를 포기하는 대신 승인자를 복수로 두어 대기 시간을 줄였습니다.",
        result: "Terraform 변경은 Atlantis의 PR 단위로 기록되고, 승인 없이는 apply할 수 없습니다. 개발자 PC에 있던 장기 Access Key는 0개가 됐습니다. 권한은 서비스별 역할로 나뉘어, 정의되지 않은 서비스에 접근하면 거부됩니다. 운영 중 plan_requirements: mergeable이 정상 PR까지 막던 버그는 옵션을 끄지 않고 직접 고쳐 PR #6186으로 Atlantis v0.41.0에 반영됐습니다.",
        learned: "우회할 길을 열어 둔 채로 만든 절차는 절차가 아니라 권고가 됩니다. 구축 중 겪은 설정 문제 여럿은 서버 설정(values.yaml)과 저장소 설정(atlantis.yaml)이 각각 어디까지 적용되는지 몰라서 생겼습니다. 계층이 둘인 설정 체계에서는 각 계층의 범위부터 확인했어야 했습니다. 명시적 거부는 강력한 만큼 되돌리기 어렵습니다. 업스트림 수정에서는 고치는 시간보다 증상에서 원인을 좁히고 처음 보는 코드베이스의 관례에 맞춰 테스트를 쓰는 시간이 훨씬 길었습니다. Go에 미숙했던 것이 오히려 도움이 됐습니다. 안다고 생각했다면 건너뛰었을 코드를 한 줄씩 읽다가 IsMergeable이 어디서도 채워지지 않는다는 것을 찾았습니다.",
        constraints: [
          "Atlantis가 올라간 Kubernetes 클러스터에 장애가 나면 인프라 배포도 함께 멈춥니다. 인프라 배포는 상시 필요한 작업이 아니라고 보고 감수했습니다.",
          "상태 파일 버킷은 허용 목록 밖의 접근을 관리자 권한까지 거부합니다. 정책을 잘못 걸면 파이프라인 전체가 막히고 클러스터 장애 때는 복구할 길이 필요해, 비상 복구용 관리자 계정 하나만 허용 목록에 남겼습니다."
        ],
        incident: {
          title: "장애 대응 기록: 메모리 부족 종료 뒤 Lock DB 손상",
          steps: [
            { label: "증상", text: "Atlantis 파드가 메모리 부족(OOM)으로 강제 종료된 뒤 재시작하자 「must be mergeable」과 「invalid key」 두 에러가 함께 떴고, 병합할 수 있는 PR인데 plan이 막혔습니다. 두 에러는 원인이 서로 달랐습니다." },
            { label: "원인 좁히기", text: "키가 없을 때는 「Lock not found」라는 다른 문구가 나오므로 「invalid key」가 걸렸습니다. 소스를 확인하니 이 에러는 Atlantis가 Lock을 보관하는 내장 BoltDB 파일에서 키를 읽지 못할 때 나는 것이었습니다. 에러는 OOM 강제 종료 직후부터 났고, IAM plan 하나만으로도 메모리 정점이 한계에 가까웠습니다. 이를 근거로 병렬로 돌던 plan이 메모리 한계를 넘어 쓰기 도중 강제 종료되면서 DB 파일이 깨졌다고 판단했습니다." },
            { label: "조치", text: "plan과 apply를 병렬에서 순차로 바꿨습니다. Atlantis의 Lock은 PR 충돌을 막는 용도이고 State를 지키는 Terraform Lock은 DynamoDB에 따로 있어, 다시 만들 수 있는 데이터라고 판단해 DB 파일을 지우고 파드를 재시작했습니다." },
            { label: "재발 방지", text: "순차 실행을 유지하고 대시보드에서 메모리 패턴을 확인했습니다. Lock 저장소를 Redis로 옮기는 안은 관리 대상과 비용이 늘어 기각했습니다." },
            { label: "이후", text: "남은 「must be mergeable」은 Atlantis 자체 버그였습니다. 댓글로 실행하는 run() 경로에는 PR의 병합 가능 상태를 조회하는 FetchPullStatus() 호출이 있는데 runAutoplan() 경로에는 없어, IsMergeable이 Go의 기본값 false로 남아 조건이 항상 실패했습니다. 같은 증상의 이슈가 같은 원인인지 CNCF Slack에서 확인한 뒤, 빠진 조회를 더하는 10줄을 고치고 autoplan 경로가 병합 상태를 조회한다는 사실 자체를 테스트 91줄로 고정했습니다. 2026.03.26에 머지됐고, 3년 가까이 열려 있던 이슈 #3486이 닫혔습니다." }
          ]
        },
        links: [
          { label: "PR #6186", url: "https://github.com/runatlantis/atlantis/pull/6186" }
        ]
      },
      {
        projectId: 7,
        diagram: "/assets/diagrams/nanogrid.svg",
        diagramAlt: "NanoGrid 구성도. 요청은 AWS WAF와 ALB를 거쳐 퍼블릭 서브넷의 Controller EC2로 들어가고, SQS를 통해 프라이빗 서브넷의 Worker ASG로 전달됩니다. 결과는 ElastiCache Redis로 돌아오며, Worker는 Gateway VPC Endpoint로 S3와 DynamoDB에 접근하고 AI 노드를 호출합니다.",
        summary: "관리형 FaaS의 실행 시간 상한과 데이터 반출 제약을 EC2 위에서 걷어내고, 대가로 떠안은 확장성은 콜드 스타트를 시간 규모가 다른 세 층으로 나눠 보고, 실행 단위는 컨테이너 풀로, 스케일링 판단은 큐 깊이로 풀었습니다.",
        outcome: "실행 단위 콜드 스타트 3초에서 0.2초, 워커 IAM을 큐 하나의 3개 액션으로 축소",
        problem: "과제는 HTTP 요청 처리를 EC2 위에서 해야 한다는 제약이었습니다. Lambda가 대신 해 주던 함수 업로드와 HTTP 호출, 즉시 실행을 관리형 FaaS 없이 직접 만들어야 했습니다. 요청이 몰릴 때 워커를 늘리는 확장성도 스스로 책임져야 했습니다. 팀은 여기에 목표를 하나 더 얹어, 직접 호스팅한다면 관리형 FaaS의 제약(당시 구성한 API Gateway의 29초 통합 타임아웃, 런타임 제약, 추론 데이터의 외부 반출)도 함께 풀기로 했습니다.",
        decision: "익숙한 API Gateway와 Dispatcher Lambda로 6시간 만에 프로토타입을 띄웠지만 요청 경로에 API Gateway가 남아 실행 시간 상한이 그대로였습니다. 202를 먼저 돌려주고 결과를 나중에 알리는 우회는 제약을 옮길 뿐이라 택하지 않고, ALB와 EC2 Controller로 바꿨습니다. 콜드 스타트는 실행 단위, 워커 인스턴스, 스케일링 판단이라는 시간 규모가 다른 세 층으로 나눠 봤습니다. 실행 단위는 요청마다 컨테이너를 만들지 않고 런타임별(Python, Node.js, C++, Go) 풀에서 빌려 쓰고 반납하게 했습니다. 스케일링 판단은 CPU 대신 SQS 큐 깊이를 기준으로 삼았습니다. CPU는 임계값에 닿을 때면 이미 사용자가 지연을 겪은 뒤이고, 큐 길이는 부하가 워커에 닿기 전에 올라가기 때문입니다. 작업 투입은 유실되면 안 되므로 SQS에, 결과 전달은 호출자가 기다리고 있으므로 지연이 낮은 Redis Pub/Sub에 맡겼습니다. 임의의 사용자 코드를 실행하는 플랫폼이라 워커 IAM을 SQS FullAccess에서 큐 하나의 3개 액션으로 줄였습니다.",
        result: "실행 단위 콜드 스타트는 3초에서 0.2초로 줄었습니다. Prometheus의 worker_job_duration_seconds 히스토그램으로 적용 전후 분포가 옮겨 간 것을 확인한 값입니다. 워커 권한의 폭발 반경은 계정 전체에서 큐 하나로 줄었습니다. 추론 노드(Ollama)는 인터넷 경로와 퍼블릭 주소가 없는 프라이빗 서브넷에 두고, 워커 보안 그룹에서만 닿게 했습니다. SoftBank Hackathon 본선에 올랐습니다.",
        learned: "세 층 모두 「어떻게 더 빨리 준비할까」라는 같은 질문이었습니다. 끝나고 나서야 「애초에 켤 것을 얼마나 작게 만들 수 있을까」라는 다른 축의 질문이 있다는 것을 알았고, 이것이 WebAssembly 런타임 연구로 이어졌습니다.",
        constraints: [
          "해커톤 본선에서 만든 구성이고, 실사용자 트래픽을 받아 본 시스템은 아닙니다. 팀에서 저는 인프라와 보안을 맡았습니다.",
          "Controller와 Worker를 잇는 것은 SQS 하나뿐이고 서로를 알지 못합니다. Controller는 퍼블릭 서브넷 2개 AZ에, Worker는 프라이빗 서브넷에 둡니다.",
          "S3와 DynamoDB에는 Gateway VPC Endpoint를 붙여 워커 트래픽이 NAT을 거치지 않게 했습니다."
        ],
        links: [
          { label: "AWS Article", url: "https://builder.aws.com/content/3I2Mw8lAM0x9sODvAwmHN8RylXM/building-a-faas-on-ec2-without-lambda-and-splitting-cold-start-into-three-layers" },
          { label: "GitHub", url: "https://github.com/Softbank-Final" }
        ]
      },
      {
        projectId: 6,
        diagram: "/assets/diagrams/wasm-runtime.svg",
        diagramAlt: "Wasm과 컨테이너 비교 실험 구성도. 같은 Go 워크로드를 SpinKube Wasm 모듈과 scratch 컨테이너로 각각 빌드해 AKS 1.34 클러스터에 올리고, Edge, Transform, Ingestion 계층에서 콜드스타트와 Pod Ready, 테넌트 밀도와 비용, 처리량을 비교합니다. Storage 계층은 모델링만 하고 비교하지 않았습니다.",
        summary: "벤더가 런타임만 떼어 잰 Wasm의 이점이 쿠버네티스 운영 스택을 지나서도 남는지, 같은 Go 워크로드를 Wasm과 컨테이너로 만들어 AKS에서 직접 쟀습니다.",
        outcome: "실측 결과로 Ingestion은 컨테이너, Transform과 Edge는 Wasm이라는 계층별 배정 기준 제안",
        problem: "Wasm 런타임 벤더는 컨테이너보다 콜드스타트가 약 400배 빠르고 Pod 밀도가 43배 높다고 주장하지만, 이 수치는 런타임만 떼어 잰 마이크로벤치마크 값입니다. 쿠버네티스 운영 스택(shim, SDK, HTTP 계층)을 지난 전체 경로에서도 같은 이점이 남는지는 검증되지 않았습니다.",
        decision: "IoT 로그 파이프라인을 Edge, Transform, Ingestion, Storage 네 계층으로 모델링하고, 그중 세 계층을 같은 Go 워크로드의 SpinKube Wasm 모듈과 scratch 컨테이너로 각각 만들어 AKS 1.34 위에서 비교했습니다. 언어와 로직, 부하 조건을 같게 맞춰 런타임 차이만 남겼습니다. 결론을 「어느 런타임이 낫다」로 내지 않았습니다. 계층마다 유리한 쪽이 반대로 나왔기 때문에, 하나를 고르는 대신 계층별로 배정하는 기준을 제안했습니다. 차이가 우연인지는 통계 검정(정규성에 따라 Welch t 또는 Mann-Whitney U, 10개 지표군에 Bonferroni 보정)으로 가렸습니다.",
        result: "Ingestion은 컨테이너가 24~28K rps를 유지해 Wasm(약 1,264 rps)보다 처리량이 높았습니다. Transform은 테넌트마다 격리를 강제한 월 비용 모형에서 2,500 테넌트일 때 Wasm의 테넌트당 비용이 최대 64배 낮았습니다. Edge는 scale-from-zero 콜드스타트에서 Wasm이 11배 빨랐고, 대기 메모리는 컨테이너(2Mi)가 더 적었습니다. 런타임 인스턴스화만 재면 0.436ms로, 벤더 주장(0.5ms)과 통계적으로 유의한 차이가 없었습니다(p=0.71, n=10). 표본이 작아 둘이 같다는 근거로 쓰지는 않고, 인스턴스화는 shim 로그 타임스탬프로 재서 컨테이너와 측정 경로가 다릅니다. 전체 요청 경로 1.55ms 중 직접 잰 런타임 인스턴스화의 비중은 28%였습니다. 나머지 72%는 쿠버네티스, shim, SDK, HTTP 계층에서 더해진 몫이고, 계층마다 따로 재지 않아 어느 계층이 얼마를 더했는지는 나누지 못했습니다.",
        learned: "처음 외부 로드밸런서를 거쳐 부하를 걸었을 때 고부하 구간에서 반대 결과가 나왔습니다. 호스트와 외부 로드밸런서 사이의 네트워크 영향으로 밝혀져 클러스터 안에서 다시 쟀습니다. 같은 실험도 부하를 어디서 거느냐에 따라 결론이 뒤집힐 수 있다는 것을 배웠습니다.",
        constraints: [
          "6 vCPU free-tier 클러스터에서 잰 값이라 41 Pod 한계와 8,000 테넌트 상한 같은 절대 수치는 운영 규모와 다를 수 있습니다.",
          "단일 Go 워크로드로, SpinKube와 Wasmtime에 한정한 결과입니다. Storage 계층은 비교하지 않았습니다.",
          "컨테이너는 쿠버네티스 권장 최소 요청(128Mi) 기준이라 요청을 낮추면 밀도와 비용 결과가 달라집니다."
        ],
        links: [
          { label: "논문 PDF", url: "/assets/wasm-spinkube-iot-layer-allocation.pdf" }
        ]
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
              '일 200건 이상 업무 자동 분류',
              '팀별 배포 기준을 합의·문서화해 산출 기준으로 고정'
            ],
            '인바운드 리드 SLA 체계 구축',
            [
              '리드 접수에서 담당자 배정까지 평균 33.6시간을 약 26분으로 단축 (98.7% 단축), 1시간 내 담당자 배정 비율 9% → 86%',
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
          period: '2025.12',
          description: [
            '본선 진출 (2025.12.06 ~ 2025.12.07)'
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
      metrics: { 4: "DORA 4지표 매일 자동 산출, 검수 에이전트 전사 사용", 3: "일 200건+ 업무 자동 분류", 15: "담당자 배정 33.6시간 → 약 26분", 6: "AKS 1.34 실측", 5: "PR #124 머지", 8: "비시즌 실행 비용이 들지 않는 구성", 11: "2022년 자발적 이전", 12: "벤더와 용도별 지출 추적, 임계치 알림", 14: "전사 배포" },
      order: [15, 3, 4, 8, 12, 14, 5, 10, 9, 11],
      showMore: "더 보기",
      showLess: "접기",
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
        problem: "문제",
        decision: "판단",
        result: "결과",
        learned: "배운 점",
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
          description: "Terraform 변경을 로컬 실행에서 Atlantis의 PR 승인 절차(GitOps)로 옮겨, 누가 언제 무엇을 바꿨는지 PR 단위로 기록에 남겼습니다. 서비스별 AssumeRole로 권한을 나눠 개발자 PC의 장기 Access Key를 전부 회수했습니다.",
          how: "Terraform 변경을 PR 승인 뒤에만 적용하려고 Atlantis를 자체 호스팅했습니다. 상태 파일을 외부 SaaS에 맡기는 Terraform Cloud와, plan 게시와 Lock 관리를 직접 만들어야 하는 범용 CI는 제외했습니다.",
          details: {
            problem: "인프라를 만지는 사람이 한 명에서 여럿으로 늘었습니다. 전 시스템이 관리자 권한으로 돌아가고 있어 사람이 늘자 누구에게나 전부를 열어 주는 구조가 됐고, 누가 언제 무엇을 바꿨는지 추적할 수 없었으며, 동시 작업으로 잠금이 걸리면 누가 잡고 있는지 메신저로 물어봐야 했습니다.",
            decision: "변경을 사람의 기억에 맡기지 않고 저장소의 기록과 승인 절차로 옮기기로 했습니다. Terraform Cloud는 상태 파일을 외부에 맡겨야 했고 범용 CI는 승인 절차를 직접 만들어야 해서, Atlantis를 자체 운영하는 쪽을 골랐습니다. 접근 키가 남아 있으면 급할 때 누군가는 그 길을 쓴다고 보고 키도 함께 회수했습니다.",
            result: "권한을 서비스별로 나누고 개인 PC의 접근 키를 전부 회수했으며, 모든 변경이 승인을 거쳐 기록으로 남습니다.",
            role: 'Platform Engineer (DevOps 팀)',
            tech: ['Terraform', 'Atlantis', 'Kubernetes', 'Helm', 'AWS IAM (AssumeRole)', 'Bitbucket'],
            features: [
              "Atlantis를 Helm으로 Kubernetes에 배포, 인프라 변경을 PR 승인 절차로 전환",
              "병합할 수 없는 PR은 plan 단계에서 차단 (plan_requirements: mergeable)",
              "AssumeRole로 배포 시점에만 임시 권한 발급, 개인 PC 접근 키 전부 회수",
              "상태 파일 버킷에 허용 목록 외 전부 거부를 걸어 로컬 우회 실행 차단"
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
          description: "관리형 FaaS(AWS Lambda)의 실행 시간 상한과 런타임 제약, 추론 데이터의 외부 반출을 EC2 위에서 걷어낸 함수 실행 플랫폼입니다. 대가로 직접 떠안은 확장성은 콜드 스타트를 실행 단위, 워커 인스턴스, 스케일링 판단의 세 층으로 나눠 풀었고, 실행 단위 콜드 스타트는 컨테이너 풀 재사용으로 3초에서 0.2초가 됐습니다(Prometheus 히스토그램으로 전후 측정). SoftBank Hackathon 본선 진출작입니다.",
          how: "CPU 사용률은 오를 때면 이미 사용자가 지연을 겪은 뒤라 SQS 큐 깊이로 워커를 늘리고, 요청마다 만들던 Docker 컨테이너는 런타임별 풀에서 빌려 쓰게 바꿨습니다.",
          details: {
            problem: "HTTP 요청 처리를 EC2 위에서 해야 한다는 제약 아래, Lambda가 대신 해 주던 함수 업로드와 호출, 실행을 직접 만들어야 했습니다. 요청이 몰릴 때 서버를 늘리는 일도 스스로 책임져야 했습니다.",
            decision: "익숙한 API Gateway와 Lambda로 먼저 프로토타입을 띄웠지만 실행 시간 상한이 그대로 남아, 걷어내고 ALB와 EC2 Controller로 바꿨습니다. 요청마다 컨테이너를 새로 만들지 않고 런타임별로 미리 띄워 둔 것을 빌려 쓰게 했고, 서버를 늘릴지는 CPU가 아니라 SQS에 쌓인 요청 수로 판단했습니다. CPU는 수치가 오를 때면 이미 사용자가 지연을 겪은 뒤이기 때문입니다.",
            result: "실행을 시작하기까지 걸리는 시간이 3초에서 0.2초로 줄었고, SoftBank Hackathon 본선에 올랐습니다.",
            role: "Infrastructure & Security. 팀에서 인프라와 보안을 맡았습니다.",
            tech: ['AWS EC2', 'ALB', 'Auto Scaling Warm Pool', 'AWS SQS', 'AWS S3', 'DynamoDB', 'ElastiCache Redis', 'AWS WAF', 'Terraform', 'Docker', 'Prometheus', 'Ollama', 'GCP Cloud Storage'],
            features: [
              "워커 권한을 큐 하나의 3개 액션으로 축소, WAF 룰 5종 적용",
              "인터넷 경로가 없는 프라이빗 서브넷에 Ollama를 두고 워커에서만 접근"
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
          description: "배포 상태를 캐릭터가 파이프라인을 뛰어가는 게임 화면으로 실시간 공유하는 서버리스 CI/CD 플랫폼입니다.",
          how: "배포 뒤에 환경 상태와 실제 HTTP 200 응답을 다시 확인해, 통과하지 못하면 파이프라인이 성공을 돌려줘도 실패로 뒤집었습니다.",
          details: {
            problem: "배포 상태가 로그로만 흘러 개발자가 아니면 지금 어디까지 왔는지 알 수 없었습니다. 파이프라인이 성공을 돌려줘도 배포된 서비스가 실제로 응답하는지는 알 수 없었습니다.",
            decision: "배포 과정을 캐릭터가 단계를 뛰어가는 게임 화면으로 바꿔 누구나 실시간으로 보게 했습니다. 파이프라인의 성공 응답을 최종 성공으로 보지 않고, 배포 뒤에 환경 상태와 실제 HTTP 200 응답을 다시 확인해 통과하지 못하면 실패로 뒤집었습니다. 실패하면 Bedrock이 로그에서 원인을 요약해 Discord와 Slack으로 바로 알립니다.",
            result: "GitHub Push부터 Build, Deploy, Health Check까지 전 과정이 자동으로 이어지고, 상태는 모니터링 화면에 실시간으로 그려집니다.",
            role: "Infra & Backend. Terraform 인프라와 Lambda API 구현을 맡았습니다.",
            tech: ['AWS CodePipeline', 'AWS CodeBuild', 'Elastic Beanstalk', 'AWS Lambda', 'Amazon EventBridge', 'DynamoDB', 'Amazon Bedrock', 'AWS Amplify', 'Terraform'],
            features: [
              "EventBridge → Lambda → DynamoDB로 배포 상태 기록",
              "Bedrock 호출 제한에는 지수 백오프로 최대 3회 재시도"
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
          description: "Notion 업무 기록과 FLEX 근태 데이터를 이어 팀별 휴가와 실제 업무 기록을 함께 보는 모니터링을 구축하고 운영합니다. 분류 결과는 사내 다른 서비스가 GraphQL로 조회할 수 있습니다.",
          how: "같은 업무명도 속한 로드맵에 따라 성격이 달라져, 로드맵을 먼저 판정한 뒤 업무 유형을 나누는 2단계 LLM 분류(Gemini 2.5 Flash)로 팀별 업무량을 집계했습니다.",
          details: {
            problem: "업무가 여러 Notion DB에 흩어져 있어 구성원의 시간이 실제로 어디에 들어가는지 집계할 수 없었습니다. 손으로 분류하면 사람마다 기준이 달라 같은 성격의 일이 다른 유형으로 쌓였고, 그 위에 어떤 지표를 올려도 믿기 어려웠습니다.",
            decision: "단일 프롬프트에 제목만 주고 13개 유형 중 하나를 고르게 하면 정확도가 떨어졌습니다. 같은 제목이라도 어느 로드맵에 속한 일이냐에 따라 유형이 달라지기 때문입니다. 그래서 로드맵의 성격을 먼저 판정하고 그 결과를 컨텍스트로 넣어 업무를 분류하는 2단계로 나눴습니다. LLM 호출이 늘어나는 비용은 감수했습니다. 하루 한 번 도는 배치라 지연은 문제가 되지 않았습니다.\n\n모델은 상위 모델 대신 Gemini 2.5 Flash를 골랐습니다. 하루 200건 이상을 매일 도는 배치에서는 모델 단가가 그대로 운영비가 됩니다. 분류는 추론 난이도보다 판단 기준의 일관성이 중요한 작업이라, 모델을 올리기보다 프롬프트와 계층 구조에 투자하는 편이 낫다고 판단했습니다.\n\n분류 결과는 Apollo Federation Subgraph로 분리했습니다. 파이프라인 안에만 두면 다른 기능에서 같은 계산을 다시 하게 되어, 사내 다른 서비스가 GraphQL로 조회하게 했습니다.",
            result: "하루 200건 이상의 업무를 13개 업무유형과 14개 미팅유형으로 Argo CronWorkflow에서 매일 자동 분류하고, 이 결과를 FLEX 근태 데이터와 이어 팀별 업무량을 봅니다.",
            role: 'AX Engineer',
            tech: ['Gemini 2.5 Flash', 'Python', 'Argo Workflows', 'Apollo Federation', 'GraphQL', 'Notion API'],
            features: []
          },
          links: {
            demo: null,
            github: null
          }
        },
        {
          id: 4,
          title: '생산성 지표 체계와 배포 검수 에이전트',
          category: 'AX 업무자동화',
          image: "/assets/diagrams/ax-metrics.svg",
          description: "「무엇을 배포로 셀지」를 팀마다 합의해 문서로 고정하고, DORA 4지표(배포 빈도, 변경 리드 타임, 변경 실패율, 복구 시간)를 Notion 릴리스 문서에서 매일 자동으로 산출합니다. 기준을 채웠는지는 Notion Custom Agent가 릴리스 문서를 받아 판정합니다.",
          how: "커밋 수는 변경량일 뿐이고 토큰 사용량은 부풀리기 쉬워 제외하고, 팀마다 합의해 문서로 정한 기준을 채운 배포만 세어 DORA 4지표를 냅니다.",
          details: {
            problem: "모두가 AI로 생산성이 올랐다고 말하지만 얼마나 올랐는지 답할 방법이 없었습니다. 업무는 Notion 태스크에, 배포는 릴리스 문서에, 장애는 또 다른 DB에 남아 하나의 기준으로 이어지지 않았습니다. 배포 품질 검수는 담당자가 릴리스 문서를 직접 확인하는 방식이라 기준이 사람에 따라 달랐고, 릴리스와 태스크를 잇는 일도 손으로 하고 있었습니다.",
            decision: "커밋 수는 코드를 많이 바꿨다는 뜻일 뿐이고 토큰 사용량은 개인이 부풀리기 쉬워, 의미 있는 배포로 이어진 것만 생산성으로 인정했습니다. 무엇을 배포로 셀지는 팀마다 따로 이야기해 합의하고 문서로 고정했는데, 기준을 한쪽에서 정하면 팀이 지표를 믿지 않기 때문입니다. 지표는 모두가 매일 쓰는 Notion 릴리스 문서에서 뽑아 배포가 끝나면 측정도 함께 끝나게 했습니다.\n\n사람이 하는 검수는 처음에는 정확하지만 반복되면 형식만 남고 기준이 흔들린다고 봤습니다. 그래서 판정을 Notion Custom Agent에 옮겨, 릴리스 문서를 입력으로 받아 팀별 배포 기준 문서를 옮긴 프롬프트에 비춰 판정하게 했습니다. 판단 하나하나의 정확도가 사람보다 낮을 수 있다는 점은 감수했습니다. 릴리스에 연결되지 않은 태스크를 찾아 잇는 일도 에이전트에 맡겨, 배포 기록과 업무 기록이 어긋나지 않게 했습니다.",
            result: "배포 품질 검수, 릴리스에 연결되지 않은 태스크 찾아 잇기, DORA 점수 리포트 발행이 모두 자동으로 돌고, 배포 검수 에이전트는 전사에서 씁니다. 정성으로만 말하던 생산성을 숫자로 증명하게 되어 사내 AX 전환의 주요 지표로 씁니다.",
            learned: "측정이 별도 작업으로 남아 있으면 바쁠 때 가장 먼저 밀리고, 밀린 데이터로 만든 지표는 신뢰를 잃습니다. 그래서 구현보다 팀마다 배포 기준을 합의하고 문서로 고정하는 데 시간을 더 썼습니다.",
            role: "AX Engineer. 측정 구조 설계와 구현 담당",
            tech: ['Python', 'Notion API', 'Notion Custom Agent', '프롬프트 엔지니어링', 'Argo Workflows', 'SQLite', 'Grafana'],
            features: []
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
          description: "Spin Framework Python SDK의 Postgres 예제 수정 기여입니다.",
          how: "Spin Python SDK의 Postgres 예제만 쿼리 결과를 로그에 찍고 고정 문자열을 돌려줘 결과를 볼 수 없었기에, 다른 언어 SDK처럼 표 형태로 HTTP 응답에 담도록 고쳤습니다.",
          details: {
            problem: "Spin Python SDK의 Postgres 예제가 쿼리 결과를 서버 로그에만 찍고 응답으로는 고정 문자열을 돌려줘, 예제를 따라 해도 결과를 확인할 수 없었습니다.",
            decision: "다른 사용자가 올린 이슈(#115)를 받아, 다른 언어 SDK처럼 쿼리 결과를 표 형태로 응답에 담도록 고쳤습니다.",
            result: "PR #124가 2025.12.15에 머지됐고, 예제 문서 오류 2건(#126, #128)도 함께 고쳤습니다.",
            role: 'Open Source Contributor',
            tech: ['Python', 'WebAssembly', 'Spin Framework', 'Git'],
            features: [
              "README에 예제용 test 테이블 생성 SQL 추가"
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
          how: "벤더 수치는 런타임만 떼어 잰 값이라, 같은 Go 워크로드를 SpinKube Wasm과 컨테이너로 만들어 AKS에서 직접 재고 계층별로 런타임을 나눠 배정하는 기준을 제안했습니다.",
          details: {
            problem: "Wasm 런타임 벤더는 컨테이너보다 콜드스타트가 약 400배 빠르고 Pod 밀도가 43배 높다고 주장하지만, 이 수치는 런타임만 떼어 잰 마이크로벤치마크 값입니다. 쿠버네티스 운영 스택(shim, SDK, HTTP 계층)을 지난 전체 경로에서도 같은 이점이 남는지는 검증되지 않았습니다.",
            decision: "벤더 수치를 그대로 믿지 않고 직접 재기로 했습니다. IoT 로그 파이프라인을 Edge, Transform, Ingestion, Storage 네 계층으로 모델링하고, 그중 세 계층을 같은 Go 워크로드의 SpinKube Wasm 모듈과 scratch 컨테이너로 각각 만들어 AKS 1.34 위에서 비교했습니다. 언어와 로직, 부하 조건을 같게 맞춰 런타임 차이만 남겼습니다.\n\n차이가 우연인지 가리기 위해 Shapiro-Wilk 정규성 검정 뒤 Welch t 검정 또는 Mann-Whitney U 검정을 자동으로 고르게 하고, 10개 지표군에 Bonferroni 보정을 적용했습니다.\n\n결론을 「어느 런타임이 낫다」로 내지 않았습니다. 계층마다 유리한 쪽이 반대로 나왔기 때문에, 하나를 고르는 대신 계층별로 배정하는 기준을 제안했습니다.",
            result: "런타임 인스턴스화만 재면 0.436ms로, 벤더 주장(0.5ms)과 통계적으로 유의한 차이가 없었습니다(p=0.71). 전체 요청 경로 1.55ms 중 직접 잰 런타임 인스턴스화의 비중은 28%였습니다. 나머지 72%는 쿠버네티스, shim, SDK, HTTP 계층에서 더해진 몫이고, 계층마다 따로 재지 않아 어느 계층이 얼마를 더했는지는 나누지 못했습니다. Ingestion은 컨테이너가, Transform과 Edge는 Wasm이 유리했습니다.",
            role: "학부연구생 (CSDC Lab 개별연구로 수행)",
            tech: ['SpinKube', 'WebAssembly', 'WASI', 'Rust', 'Go', 'Azure AKS', 'KEDA', 'Kubernetes', 'containerd-shim-spin', '통계 검정'],
            features: [
              "수신(Ingestion) 계층은 컨테이너 우세: 24~28K rps vs Wasm 약 1,264 rps",
              "변환(Transform) 계층은 Wasm 우세: 8,000 테넌트 무손실. 테넌트마다 격리를 강제한 월 비용 모형에서 2,500 테넌트일 때 테넌트당 비용 최대 64배 낮음(6 vCPU 클러스터 기준)",
              "Edge 계층은 Wasm 우세: scale-from-zero 콜드스타트 11배 빠름",
              "선행 실험: Python Wasm을 Rust 네이티브 Wasm으로 옮겨 바이너리 35.86MB → 0.39MB, 처리량 7.8배",
              "한계 6건 명시 (6 vCPU 클러스터, 단일 Go 워크로드, SpinKube/Wasmtime 한정 등)"
            ]
          },
          links: {
            demo: null,
            github: null,
            papers: [
              { label: '논문 · 계층별 런타임 할당 (AKS 실측)', url: '/assets/wasm-spinkube-iot-layer-allocation.pdf' }
            ]
          }
        },
        {
          id: 8,
          title: 'Roomeya: 서버리스 기숙사 매칭 서비스',
          category: 'DevOps & Infra',
          image: null,
          description: '시즌별 기숙사 매칭 서비스. AWS 풀 서버리스 아키텍처 + Terraform IaC (Lambda 9개, Step Functions, DynamoDB)',
          how: "전체 인프라를 Terraform으로 남겨 시즌마다 다시 세울 수 있습니다.",
          details: {
            problem: "기숙사 매칭은 시즌에만 쓰여, 서버를 계속 켜 두면 쓰지 않는 기간에도 비용이 나갑니다. 설문 수집, 매칭 연산, 결과 통보로 이어지는 흐름도 길어 어디서 끊겼는지 보여야 했습니다.",
            decision: "쓴 만큼만 내는 Lambda와 DynamoDB 온디맨드로만 구성했습니다. 매칭 흐름은 Step Functions에 두어 실행 이력을 콘솔에서 확인하게 했고, 사용량 계획과 요청 검증이 필요 없어 REST API 대신 비용과 지연이 낮은 HTTP API v2를 골랐습니다.",
            result: "쓰지 않는 기간에는 실행 비용이 들지 않는 구조이고, 전체 인프라를 Terraform으로 남겨 시즌마다 다시 세울 수 있습니다.",
            role: "Cloud Architect. 아키텍처 설계와 Terraform IaC 전체를 맡았습니다.",
            tech: ['Terraform', 'AWS Lambda', 'AWS Step Functions', 'DynamoDB', 'API Gateway', 'Cognito'],
            features: [
              "Lambda 9개 함수, DynamoDB 4개 테이블 (Forms, FormResponses, Results, Students)",
              "Cognito OAuth 2.0 인증, SES 이메일 발송"
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
          how: "같은 테스트 파일로 비교한 TFSec과 Checkov가 잡지 않은 유형을 탐지하며, 동작을 유닛 테스트 11건으로 고정했습니다.",
          details: {
            problem: "TFSec, Checkov 같은 규칙 기반 도구는 정해진 패턴에 걸리는 것만 잡습니다. 리소스 하나하나는 정상인데 이어 놓으면 위험해지는 구성이나, 만료된 계정처럼 시간이 지나 생기는 위험은 놓칩니다.",
            decision: "Terraform의 IAM 리소스 관계를 그래프로 만들어 권한이 올라가는 경로를 찾고, 계정의 만료일과 마지막 사용일, 서비스 목적과 부여된 권한을 함께 비교했습니다. 기존 도구를 대체하기보다 보완하는 쪽이 맞다고 보고 Checkov 결과를 합치는 모듈을 두었습니다.",
            result: "만료 계정, 미사용 계정, 목적 불일치처럼 같은 테스트 파일로 비교한 TFSec과 Checkov가 잡지 않은 유형을 탐지하며, 동작을 유닛 테스트 11건으로 고정했습니다.",
            role: 'Security Researcher & Developer',
            tech: ['Python', 'BERT', 'Terraform', 'NetworkX', 'AWS IAM', 'Hugging Face', 'NLP'],
            features: [
              "python-hcl2로 파싱한 IAM 관계 7종을 NetworkX 그래프로 구성",
              "위험 액션 17종 사전과 액션 조합으로 권한 상승 경로 판정"
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
          description: "동아리 서버를 물리 PC에서 AWS로 옮긴 작업입니다.",
          how: "물리 PC로 돌리던 동아리 서버가 정전과 재부팅 때마다 멈추고 학교에서만 손댈 수 있어, 2022년에 자발적으로 AWS로 옮기고 Docker 컨테이너로 구성했습니다.",
          details: {
            problem: "물리 PC로 돌리던 동아리 서버가 정전과 재부팅 때마다 멈췄고, 관리자가 학교에 있어야만 손을 댈 수 있었습니다.",
            decision: "2022년에 누가 시키지 않았지만 서버를 AWS로 옮기고, 서비스는 Docker 컨테이너로 구성했습니다.",
            result: "교내 PC의 정전과 재부팅에 서비스가 멈추던 의존을 없앴고, 학교 밖에서도 관리할 수 있게 됐습니다.",
            role: 'Cloud Architect',
            tech: ['AWS EC2', 'AWS EBS', 'AWS S3', 'AWS RDS', 'Docker'],
            features: [

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
          description: "LLM 호출마다 벤더(Vertex AI, AI Studio, OpenAI)와 용도 라벨을 붙여 지출을 용도별로 나눠 추적하고, 임계치를 넘으면 알림이 가게 했습니다.",
          how: "Vertex AI, AI Studio, OpenAI 지출을 벤더와 용도별로 나눠 보고, 임계치를 넘으면 알림이 갑니다.",
          details: {
            problem: "사내 LLM 사용이 늘었지만 어느 회사 모델에, 어떤 기능에 돈이 나가는지 알 수 없었습니다.",
            decision: "AI 사용을 늘리기 전에 용도별 지출부터 보여야 한다고 보고, 사내 LLM 서버 코드에서 호출마다 벤더와 용도 라벨을 붙였습니다.",
            result: "Vertex AI, AI Studio, OpenAI 지출을 벤더와 용도별로 나눠 보고, 임계치를 넘으면 알림이 갑니다.",
            learned: "입사 초기 과제로 진행하면서 사내 코드 규칙과 GraphQL 컨벤션을 익혔습니다.",
            role: 'AX / Platform Engineer',
            tech: ['GraphQL', 'Cost Monitoring', 'FinOps'],
            features: [
              "라벨 작성 가이드 문서화"
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
          description: "「응답」을 무엇으로 볼지 SLA 정의부터 세우고, 영업시간 기준 자동 측정과 알림, 방치된 리드를 상위 직급자에게 넘기는 에스컬레이션까지 만들었습니다.",
          how: "담당자 배정만 세면 숫자는 좋아 보여도 고객이 느끼는 응답은 첫 연락이라, SLA를 배정 시각과 첫 고객 연락 두 가지로 재고 전후를 같은 영업시간 기준으로 비교했습니다.",
          details: {
            problem: "리드가 접수된 뒤 담당자가 배정되기까지 평균 33.6시간이 걸렸고, 1시간 안에 배정되는 비율은 9%였습니다(영업시간 기준). 고객에게 첫 연락이 언제 닿았는지는 지표로 남지 않아 늦은 대응은 사후에 우연히 발견됐습니다.",
            decision: "문제가 코드가 아니라 영업 조직의 업무 흐름 안에 있어, 설계에 앞서 영업 담당자의 업무를 따라가며 물었습니다. 왜 연락이 늦었는지, 알림을 보고도 움직이지 못한 이유가 무엇인지를 들었고 지금의 설계는 그 대화에서 나왔습니다.\n\n가장 어려웠던 것은 「응답」의 정의였습니다. 시스템 관점에서는 담당자가 배정된 시각이고, 영업 관점에서는 고객과 실제로 연락이 닿은 시각입니다. 배정만 세면 숫자는 훨씬 좋아 보이지만 두 지표를 모두 남기고, 더 불리한 첫 고객 연락 기준을 버리지 않았습니다. 대가는 성과를 보고할 때 미달 지표를 함께 들고 가야 한다는 점입니다.\n\nSLA는 영업시간 기준으로만 쟀습니다. 금요일 저녁 문의를 월요일 아침에 받은 것까지 지연으로 세면 지표가 현실과 어긋나기 때문입니다. 알림은 담당자가 대응할 수 있는 시간대로 좁히고, 방치된 리드는 상위 직급자에게 넘어가게 했습니다.",
            result: "접수에서 담당자 배정까지 평균 33.6시간이 약 26분으로 줄었고, 1시간 안에 배정되는 비율은 9%에서 86%로 올랐습니다(98.7% 단축, 개선 전후 모두 영업시간 기준). 첫 고객 연락 기준 지표는 아직 목표에 미치지 못합니다. 접수와 배정 시각은 이전에도 기록되던 필드라 전후를 같은 필드, 같은 기준으로 계산했습니다.",
            learned: "유리한 기준으로 갈아타는 순간 지표는 개선 도구가 아니라 보고용 숫자가 됩니다.",
            role: 'DevOps Engineer',
            tech: ['Notion', '사내 백오피스', 'SLA 지표 설계', '알림·에스컬레이션', '과거 데이터 백필'],
            features: [
              "접수, 담당자 배정, 첫 고객 연락 3구간 시각을 자동 기록하고 실시간 모니터링 화면으로 표시",
              "이중 접수 제거, 접수 시간이 초기화되던 버그 수정, 변경 이력 상세화와 과거 데이터 백필"
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
          description: "캘린더 일정에서 정해진 양식의 회의록이 자동으로 만들어지게 했습니다.",
          how: "배포만으로는 쓰는 사람이 늘지 않아, 캘린더 기반 회의록 자동 생성과 함께 사용 문서를 쓰고 팀별 도입을 안내했습니다.",
          details: {
            problem: "회의록을 주최자가 직접 만들다 보니 만들어지는 시점이 회의마다 달랐고, 미리 만들어지지 않으면 논의할 내용을 다른 곳에 적어 둬야 했습니다.",
            decision: "캘린더 일정에서 정해진 양식의 회의록이 자동으로 만들어지게 했습니다. 배포만으로는 쓰는 사람이 늘지 않아 사용 문서를 쓰고 팀별로 도입 방법을 안내했습니다.",
            result: "Notion Workers로 구성했고, 지금은 전사에서 씁니다.",
            role: 'AX Engineer',
            tech: ['Notion Workers (서버리스)', 'Notion API', 'Calendar API'],
            features: [
              "AWS Lambda와 비슷한 서버리스(Notion Workers) 구성"
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
      description: "I moved infrastructure changes onto PR approval with Terraform and Atlantis, and automate repetitive internal work with LLMs and Notion agents.\nI'm a DevOps engineer who cares about connecting people. I tie teams' work together through infrastructure and AI transformation (AX), and I've built and led communities that bring together developers across majors and student clubs.\nEven outside engineering, such as sales lead assignment, I interview the people doing the work and set the measurement criteria first.",
      cta: "Check out my work",
      label: "DevOps Engineer · BUZZ & BEYOND 2026~",
      highlights: [
        { label: "DevOps", text: "Built a GitOps workflow with Terraform and Atlantis; revoked all developer AWS access keys" },
        { label: "Open Source", text: "Fixed a CNCF Atlantis bug, shipped in official release v0.41.0" },
        { label: "AI Automation", text: "Built and ran company-wide workload monitoring linking Notion with FLEX (HR system), plus customer-support and lead-response agents" },
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
      learned: "What I learned",
      constraints: "Assumptions and limits of this setup",
      more: "Details",
      zoom: "Enlarge diagram",
      diagram: "View architecture"
    },
    cases: [
      {
        projectId: 3,
        diagram: "/assets/diagrams/atlantis-gitops.svg",
        diagramAlt: "Atlantis GitOps diagram. A developer's PR reaches Atlantis on Kubernetes through a Bitbucket webhook, and the pod's base role assumes a per-service target role to run plan and apply. The state bucket denies access from outside the allowlist, so local runs are blocked.",
        summary: "Moved local Terraform runs onto PR approval, and when a safeguard got in the way, fixed it upstream instead of turning it off.",
        outcome: "Zero long-lived access keys on developer machines; Terraform changes outside emergency recovery recorded per PR",
        problem: "The number of people touching infrastructure grew from one to several. With one person, running terraform apply locally caused no visible problem; with several, the same setup became the problem. Every system ran on admin permissions, so access meant opening everything to everyone. There was no way to trace who changed what and when. When concurrent work hit a state lock, finding out who held it meant asking around on chat. Each developer also held a long-lived AWS Access Key for local runs.",
        decision: "We moved changes out of people's memory and agreement and into repository history and an approval step. Terraform Cloud was ruled out because it is paid and keeps state files in an external SaaS. Building it on general-purpose CI would mean writing the logic to post plan output on the PR and tie apply to approval, which amounts to rebuilding Atlantis. So we self-hosted Atlantis and accepted the cost that when it breaks, we fix it. It runs on the Kubernetes cluster we already operated rather than a separate EC2 instance, reusing the existing observability, rollout and secret management. A leftover Access Key gets used the moment someone is in a hurry, so every key was withdrawn and AssumeRole issues per-service least-privilege credentials only at deploy time. Local bypass is blocked by an explicit deny in the state bucket policy. Removing delete permissions was rejected because mistakes could no longer be cleaned up, and tag-based control because tags can be edited to get around it. Emergency deploy speed was traded away, softened by having multiple approvers.",
        result: "Terraform changes are recorded per PR in Atlantis, and nothing applies without approval. The only exception with direct access to the state bucket is an admin account kept for emergency recovery. Long-lived Access Keys on developer machines went to zero. Permissions are split into per-service roles, and access to a service that is not defined is denied. When plan_requirements: mergeable started blocking clean PRs in operation, I fixed the bug instead of turning the option off, and PR #6186 shipped in Atlantis v0.41.0.",
        learned: "A process built with a bypass left open is a suggestion, not a process. Several configuration problems during the build came from not knowing how far the server config (values.yaml) and the repo config (atlantis.yaml) each reach. With two layers of configuration, the scope of each layer should be checked first. An explicit deny is as hard to undo as it is strong.",
        constraints: [
          "If the Kubernetes cluster hosting Atlantis goes down, infrastructure deploys stop with it. We accepted this because infrastructure deploys are not needed constantly. Normally a local run is denied at the state bucket; only in an emergency like this is recovery done locally with the admin account kept on the allowlist.",
          "The state bucket denies everything outside an allowlist, admin permissions included. A wrong policy would lock the whole pipeline out, so one break-glass admin account stays on the allowlist.",
          "Because of the memory limit, plan and apply run sequentially, not in parallel."
        ],
        incident: {
          title: "Incident record: lock DB corrupted after an out-of-memory kill",
          steps: [
            { label: "Symptom", text: "After the Atlantis pod was OOM-killed and restarted, two errors appeared together: \"must be mergeable\" and \"invalid key\". Plan was blocked on a PR that could be merged." },
            { label: "Narrowing down", text: "The wording \"invalid key\" did not fit, because a missing key produces a different message (\"Lock not found\"). Reading the source showed the error is raised when a key cannot be read from the embedded BoltDB file where Atlantis keeps locks. The errors started right after the OOM kill, and a single IAM plan alone already peaked close to the memory limit. From this I concluded that parallel plans pushed memory over the limit and the process was killed mid-write, corrupting the file. The two errors had different causes." },
            { label: "Action", text: "Plan and apply were switched from parallel to sequential. Atlantis locks only guard against PR conflicts, while the Terraform state lock lives separately in DynamoDB, so I judged the lock data could be regenerated, deleted the DB file and restarted the pod." },
            { label: "Prevention", text: "Sequential execution stays on, and the dashboard confirmed the normal pattern of memory dropping after each plan and rising again. Moving the lock store to Redis was rejected because it added a component to manage and cost." },
            { label: "Afterwards", text: "The remaining \"must be mergeable\" error was a bug in Atlantis itself, which led to the upstream fix (PR #6186)." }
          ]
        },
        links: [
          { label: "PR #6186", url: "https://github.com/runatlantis/atlantis/pull/6186" }
        ]
      },
      {
        projectId: 7,
        diagram: "/assets/diagrams/nanogrid.svg",
        diagramAlt: "NanoGrid diagram. Requests pass AWS WAF and the ALB to Controller EC2 instances in public subnets, then go through SQS to the Worker ASG in private subnets. Results return through ElastiCache Redis, and workers reach S3 and DynamoDB through Gateway VPC Endpoints and call the AI node.",
        summary: "Shed managed FaaS limits on execution time and data egress by running on EC2, then paid back the lost scalability by splitting cold start into three layers.",
        outcome: "Execution-unit cold start from 3s to 0.2s; worker IAM narrowed to three actions on a single queue",
        problem: "The brief required HTTP request handling to run on EC2. Function upload, HTTP invocation and immediate execution, which Lambda normally provides, had to be built without a managed FaaS. Scaling workers when requests pile up was ours to handle too. The team added one more goal: if we host it ourselves, also remove the limits of managed FaaS (the 29-second integration timeout of the API Gateway setup we used then, runtime constraints, inference data leaving the network). On the team, I owned infrastructure and security.",
        decision: "A prototype on the familiar API Gateway plus a Dispatcher Lambda was up in six hours, but API Gateway stayed on the request path and so did the execution time ceiling. Returning 202 and reporting the result later would only have moved the constraint, so we replaced it with an ALB and an EC2 Controller. We treated cold start as three layers with different time scales: execution unit, worker instance and scaling decision. For the execution unit, containers are no longer created per request but borrowed from and returned to per-runtime pools (Python, Node.js, C++, Go). For the scaling decision we used SQS queue depth instead of CPU. By the time CPU reaches its threshold users have already felt the delay, while queue length rises before the load reaches the workers. Job intake must not be lost, so it goes through SQS; result delivery has a caller waiting, so it goes through low-latency Redis Pub/Sub. Because the platform runs arbitrary user code, worker IAM was cut from SQS FullAccess to three actions on a single queue.",
        result: "Execution-unit cold start fell from 3s to 0.2s. That figure comes from the shift in the Prometheus worker_job_duration_seconds histogram before and after the change. The blast radius of worker credentials shrank from the whole account to one queue. The inference node (Ollama) sits in a private subnet with no internet route or public address, reachable only from the worker security group. The project reached the SoftBank Hackathon finals.",
        learned: "All three layers asked the same question: how do we get ready faster. Only afterwards did I see there was a question on another axis: how small can we make the thing we start in the first place. That led to my WebAssembly runtime research.",
        constraints: [
          "SQS is the only link between Controller and Worker; neither knows the other. The Controller sits in public subnets across two AZs, Workers in private subnets.",
          "S3 and DynamoDB are reached through Gateway VPC Endpoints, so worker traffic does not go through NAT.",
          "This was built for a hackathon final and has not served real user traffic."
        ],
        links: [
          { label: "AWS Article", url: "https://builder.aws.com/content/3I2Mw8lAM0x9sODvAwmHN8RylXM/building-a-faas-on-ec2-without-lambda-and-splitting-cold-start-into-three-layers" },
          { label: "GitHub", url: "https://github.com/Softbank-Final" }
        ]
      },
      {
        projectId: 6,
        diagram: "/assets/diagrams/wasm-runtime.svg",
        diagramAlt: "Wasm versus container experiment diagram. The same Go workload is built as a SpinKube Wasm module and as a scratch container, deployed on an AKS 1.34 cluster, and compared on the Edge, Transform and Ingestion layers for cold start and pod readiness, tenant density and cost, and throughput. The Storage layer was modeled but not compared.",
        summary: "Measured on AKS whether the Wasm advantage vendors report for the runtime alone survives a Kubernetes operational stack, by building the same Go workload as Wasm and as a container.",
        outcome: "Measured per layer and proposed allocation criteria: containers for Ingestion, Wasm for Transform and Edge",
        problem: "Wasm runtime vendors claim cold starts roughly 400x faster and 43x higher pod density than containers, but those figures come from microbenchmarks that measure the runtime in isolation. Whether the advantage survives the full path through a Kubernetes operational stack (shim, SDK, HTTP layer) had not been tested.",
        decision: "Rather than take the vendor figures as given, I measured. I modeled an IoT log pipeline as four layers (Edge, Transform, Ingestion, Storage) and built three of them twice from the same Go workload, as SpinKube Wasm modules and as scratch containers, then compared them on AKS 1.34. Language, logic and load were held equal so that only the runtime differed. To tell real differences from noise, each comparison runs a Shapiro-Wilk normality test and then picks Welch's t-test or the Mann-Whitney U test automatically, with Bonferroni correction across 10 metric groups. I did not conclude that one runtime is better. The better runtime flipped from layer to layer, so instead of picking one, I proposed criteria for assigning a runtime per layer.",
        result: "Runtime instantiation alone measured 0.436ms, with no statistically significant difference from the vendor's 0.5ms claim (p=0.71, n=10). The sample is small, so I do not read this as the two being equal. Of the 1.55ms full request path, the directly measured instantiation accounted for 28%. The remaining 72% was added by Kubernetes, the shim, the SDK and the HTTP layer; the layers were not probed separately, so how much each one added could not be split out. In Ingestion, containers held 24-28K rps against about 1,264 rps for Wasm. In Transform, a monthly cost model with per-tenant isolation enforced put Wasm up to 64x cheaper per tenant at 2,500 tenants. In Edge, Wasm's scale-from-zero cold start was 11x faster.",
        learned: "The first runs, with load sent through an external load balancer, showed the opposite result at high load. That turned out to be a network effect between the host and the external load balancer, so I re-measured from inside the cluster. Where the load comes from can flip the conclusion of the same experiment.",
        constraints: [
          "Measured on a 6 vCPU free-tier cluster, so absolute figures such as the 41-pod plateau and the 8,000-tenant ceiling may differ at production scale.",
          "Results cover a single Go workload on SpinKube and Wasmtime only. The Storage layer was not compared.",
          "Containers were set at the Kubernetes recommended minimum request (128Mi), so a lower request would change the density and cost results. Instantiation was read from shim journal timestamps, a different measurement path from the container baseline."
        ],
        links: [
          { label: "Paper PDF", url: "/assets/wasm-spinkube-iot-layer-allocation.pdf" }
        ]
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
              'Auto-classifies 200+ tasks per day',
              'Agreed and documented per-team deploy criteria as the fixed basis for the metrics'
            ],
            'Built an SLA system for inbound leads',
            [
              'Cut lead intake-to-owner assignment from 33.6h to about 26 minutes on average (98.7% faster); leads assigned to an owner within 1h rose from 9% to 86%',
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
          period: '2025.12',
          description: ['Advanced to Final round (2025.12.06 ~ 2025.12.07)']
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
      metrics: { 1: "Four DORA metrics computed daily", 4: "PR #6186 merged, in v0.41.0", 2: "200+ tasks auto-classified/day", 15: "Owner assignment 33.6h → about 26 min", 6: "Measured on AKS 1.34", 5: "PR #124 merged", 8: "Designed for no execution cost off-season", 11: "Self-initiated move to AWS, 2022", 12: "Spend tracked by vendor and use, threshold alerts", 13: "Release review and task linking automated", 14: "Rolled out company-wide" },
      order: [15, 2, 4, 1, 13, 8, 12, 14, 5, 10, 9, 11],
      showMore: "Show more",
      showLess: "Show less",
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
        problem: "Problem",
        decision: "Decision",
        result: "Result",
        learned: "What I learned",
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
          image: "/assets/diagrams/ax-metrics.svg",
          description: "Agreed with each team on what counts as a deployment and fixed it in writing, then computed the four DORA metrics (deployment frequency, lead time for changes, change failure rate, time to restore) daily from Notion release documents. Productivity that had only been described in words can now be shown in numbers, and the metrics serve as a key indicator of our internal AX transition.",
          how: "Commit counts only show volume and token usage is easy to inflate, so the four DORA metrics count only deployments that meet criteria agreed and documented with each team.",
          details: {
            problem: "Everyone says AI has raised productivity, but there was no way to answer by how much. Work lived in Notion tasks, deployments in release documents and incidents in yet another database, with nothing tying them to one standard.",
            decision: "Commit counts only show that a lot of code changed, and token usage is easy for an individual to inflate, so only work that led to a meaningful deployment counts as productivity. What counts as a deployment was agreed team by team and fixed in writing, because teams do not trust a metric whose rules were set for them. The metrics are drawn from the Notion release documents everyone already uses daily, so measurement finishes when the deployment does.",
            result: "Productivity that had only been described in words can now be shown in numbers, and the metrics serve as a key indicator of our internal AX transition.",
            learned: "When measurement is left as a separate job it is the first thing dropped in a busy week, and metrics built on late data lose trust. So more time went into agreeing deploy criteria with each team and fixing them in writing than into the implementation.",
            role: 'DevOps Engineer',
            tech: ['Python', 'SQLite', 'REST API', 'Grafana'],
            features: [
              "Deployment criteria agreed with each team and fixed in writing",
              "Four DORA metrics (deploy frequency, lead time, change fail rate, MTTR) calculated daily",
              "A Notion custom agent checks whether each release meets the criteria"
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
          how: "The same task title means different work under different roadmaps, so a two-step LLM classification (Gemini 2.5 Flash) judges the roadmap first and the task type second to total workload per team.",
          details: {
            problem: "Work was spread across several Notion databases, so there was no way to total where people's time actually went. Classifying by hand meant each person used a different standard, the same kind of work piled up under different types, and no metric built on top could be trusted.",
            decision: "Asking a single prompt to pick one of 13 types from a title alone was not accurate enough, because the same title can be a different type depending on which roadmap it belongs to. So I split it into two steps: judge the nature of the roadmap first, then classify the task with that result as context. That costs more LLM calls, which I accepted; it is a once-a-day batch, so latency did not matter.\n\nFor the model I chose Gemini 2.5 Flash over a higher-tier model. In a batch that runs 200+ items every day, the model's unit price is the running cost. Classification depends on consistent criteria more than hard reasoning, so investing in the prompts and the two-step structure paid off better than a bigger model.\n\nThe results are split out as an Apollo Federation Subgraph. Kept inside this pipeline, other features would have to redo the same computation, so other internal services query them over GraphQL instead.",
            result: "More than 200 tasks a day are sorted automatically into 13 task types and 14 meeting types by an Argo CronWorkflow, and the results are joined with FLEX attendance data to show workload per team.",
            role: 'DevOps & AX Engineer',
            tech: ['Gemini', 'Argo Workflows', 'Python', 'Apollo Federation', 'GraphQL'],
            features: [
              "Two-step LLM classification (Gemini 2.5 Flash): roadmap nature first, then the task",
              "200+ tasks a day processed daily with Argo CronWorkflow",
              "Automatic assignment to 13 task types and 14 meeting types",
              "Results exposed as an Apollo Federation Subgraph for other services to query over GraphQL"
            ]
          },
          links: { demo: null, github: null }
        },
        {
          id: 7,
          title: 'NanoGrid: A Function Platform Beyond Managed FaaS Limits',
          category: 'DevOps & Infra',
          image: null,
          description: "A function execution platform on EC2 that sheds what managed FaaS (AWS Lambda) fixes for you: the execution time ceiling, runtime constraints, and inference data leaving your network. The scalability inherited in exchange was handled by splitting cold start into three layers (execution unit, worker instance, scaling decision); reusing pooled containers cut execution-unit cold start from 3s to 0.2s, measured before and after with a Prometheus histogram. SoftBank Hackathon finalist.",
          how: "By the time CPU climbs users have already felt the delay, so workers scale on SQS queue depth, and Docker containers once created per request are borrowed from a per-runtime pool.",
          details: {
            problem: "HTTP request handling had to run on EC2, so we had to build what Lambda normally does for you: function upload, invocation and execution. Adding servers when requests piled up was ours to handle too.",
            decision: "We first got a prototype running on the familiar API Gateway and Lambda, but the execution time ceiling stayed, so we dropped it for an ALB and an EC2 Controller. Instead of creating a container per request, we keep containers started per runtime and reuse them, and we decide whether to add servers from the number of requests waiting in SQS rather than CPU. By the time CPU climbs, users have already felt the delay.",
            result: "Time to start an execution dropped from 3 seconds to 0.2 seconds, and the project reached the SoftBank Hackathon finals.",
            role: "Infrastructure & Security. On the team, I owned infrastructure and security.",
            tech: ['AWS EC2', 'ALB', 'Auto Scaling Warm Pool', 'AWS SQS', 'AWS S3', 'DynamoDB', 'ElastiCache Redis', 'AWS WAF', 'Terraform', 'Docker', 'Prometheus', 'Ollama', 'GCP Cloud Storage'],
            features: [
              "Pre-started container pools per runtime (Python, Node.js, C++, Go), reused across requests",
              "Worker count adjusted by the number of requests waiting in SQS",
              "Worker permissions cut to three actions on one queue; five WAF rules applied",
              "Ollama in a private subnet with no internet route, reachable only from workers"
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
          how: "A CodePipeline success says nothing about whether the service responds, so after each deploy we recheck Elastic Beanstalk health and a real HTTP 200, and mark the run failed if either does not pass.",
          details: {
            problem: "Deploy status only existed as logs, so nobody but the developer could tell how far a deploy had gone. And a pipeline reporting success said nothing about whether the deployed service actually responded.",
            decision: "We turned the deploy into a game screen where a character runs through the stages, so anyone can follow it live. A pipeline success is not treated as final: after deploy, the environment health and a real HTTP 200 response are checked again, and the run is flipped to failed if they do not pass. On failure, Bedrock summarizes the cause from the logs and the alert goes straight to Discord and Slack.",
            result: "Everything from GitHub push through build, deploy and health check runs automatically, and the status is drawn on the monitoring screen in real time.",
            role: "Infra & Backend. I built the Terraform infrastructure and the Lambda API.",
            tech: ['AWS CodePipeline', 'AWS CodeBuild', 'Elastic Beanstalk', 'AWS Lambda', 'Amazon EventBridge', 'DynamoDB', 'Amazon Bedrock', 'AWS Amplify', 'Terraform'],
            features: [
              "Game-style live deploy view: a character runs through the pipeline stages",
              "EventBridge → Lambda → DynamoDB records deploy state",
              "EB environment health and HTTP 200 rechecked after deploy; marked failed if they do not pass",
              "Bedrock summarizes failure logs; throttling retried up to 3 times with exponential backoff"
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
          description: "Moved Terraform changes from local runs to Atlantis PR approval (GitOps), so every change is recorded per PR with who changed what and when. Split permissions with per-service AssumeRole and withdrew every long-lived access key from developer machines.",
          how: "Self-hosted Atlantis so Terraform changes apply only after PR approval, over Terraform Cloud, which keeps state in an external SaaS, and general-purpose CI, where plan posting and locking would have to be built by hand.",
          details: {
            problem: "The number of people touching infrastructure grew from one to several. Every system ran on admin permissions, so more people meant opening everything to everyone, with no way to trace who changed what and when, and a state lock meant asking around on chat to find out who was holding it.",
            decision: "We moved changes out of people's memory and into repository history and an approval step. Terraform Cloud would have meant handing our state files to an outside service, and a general-purpose CI would have meant building the approval flow ourselves, so we self-hosted Atlantis. A leftover access key gets used the moment someone is in a hurry, so the keys were withdrawn as well.",
            result: "Permissions are split per service, every access key on personal machines has been withdrawn, and each change goes through approval and stays on record.",
            role: 'Platform Engineer',
            tech: ['Terraform', 'Atlantis', 'Kubernetes', 'Helm', 'AWS IAM', 'Golang'],
            features: [
              "Atlantis deployed to Kubernetes with Helm; infrastructure changes go through PR approval",
              "PRs that cannot be merged are blocked at plan (plan_requirements: mergeable)",
              "AssumeRole issues temporary permissions only at deploy time; personal access keys withdrawn",
              "State bucket denies everything outside an allowlist, blocking local runs that skip review"
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
          how: "Traced Atlantis's Go code to find that only the autoplan path, unlike the comment-triggered one, skipped fetching the PR's merge status; added the fetch and pinned it with regression tests.",
          details: {
            problem: "I had set plan_requirements: mergeable to stop unmergeable PRs from reaching infrastructure, but autoplan failed on clean, conflict-free PRs too, every time, with \"Pull request must be mergeable before running plan\", and infrastructure changes stopped.",
            decision: "The cause was a difference between two execution paths. The comment-triggered run() path calls FetchPullStatus() to fetch the PR's mergeable status; runAutoplan() did not. IsMergeable therefore stayed at Go's zero value, false, and the check always failed.\n\nThe fix adds the missing fetch to the autoplan path, 10 lines. Adding only the call would be right today, but the same thing would happen again when another execution path appears, so I pinned the fact that autoplan fetches merge status with 91 lines of tests.",
            result: "Merged on 2026.03.26 and included in Atlantis v0.41.0, closing issue #3486, which had been open for nearly three years. Internally, the approval flow runs with the safeguard still on.",
            learned: "Narrowing the symptom down to the cause, and writing tests that fit the conventions of an unfamiliar codebase, took far longer than the fix itself. Being inexperienced with Go helped: I had to read line by line code I would have skipped had I thought I knew it, and that is where I found that IsMergeable was never set anywhere.",
            role: 'Open Source Contributor',
            tech: ['Golang', 'Atlantis', 'Terraform', 'Git'],
            features: [
              "Cause: runAutoplan() was missing the FetchPullStatus() call, leaving IsMergeable at Go's zero value, false",
              "10 lines of production code (server/events/plan_command_runner.go), 91 lines of regression tests (2 cases)",
              "Confirmed on CNCF Slack that an open issue with the same symptom had the same cause before fixing",
              "Merged 2026.03.26, included in Atlantis v0.41.0; closed issue #3486"
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
          how: "Only the Python SDK's Postgres example logged query results and returned a fixed string, so following it showed nothing; I changed it to return results as a table in the HTTP response, like the other language SDKs.",
          details: {
            problem: "The Postgres example in the Spin Python SDK printed query results only to the server log and returned a fixed string as the response, so following the example never showed any results.",
            decision: "I picked up an issue another user had filed (#115) and changed the example to return query results as a table in the response, as the other language SDKs do.",
            result: "PR #124 was merged on 2025.12.15, and I fixed two more errors in the example docs (#126, #128).",
            role: 'Open Source Contributor',
            tech: ['Python', 'WebAssembly', 'Spin Framework', 'Git'],
            features: [
              "format_value and format_rowset helpers return query results as a table",
              "Added the example's test-table setup SQL to the README",
              "PR #126, #128: fixed example README titles and a typo"
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
          how: "Vendor figures measure the runtime in isolation, so I built the same Go workload as SpinKube Wasm and as containers, measured both on AKS, and proposed criteria for assigning a runtime per layer.",
          details: {
            problem: "Wasm runtime vendors claim cold starts roughly 400x faster and 43x higher pod density than containers, but those figures come from microbenchmarks that measure the runtime in isolation. Whether the advantage survives the full path through a Kubernetes operational stack (shim, SDK, HTTP layer) had not been tested.",
            decision: "Rather than take the vendor figures as given, I measured. I modeled an IoT log pipeline as four layers (Edge, Transform, Ingestion, Storage) and built three of them twice from the same Go workload, as SpinKube Wasm modules and as scratch containers, then compared them on AKS 1.34. Language, logic and load were held equal so that only the runtime differed.\n\nTo tell real differences from noise, each comparison runs a Shapiro-Wilk normality test and then picks Welch's t-test or the Mann-Whitney U test automatically, with Bonferroni correction across 10 metric groups.\n\nI did not conclude that one runtime is better. The better runtime flipped from layer to layer, so instead of picking one, the paper proposes criteria for assigning a runtime per layer.",
            result: "Runtime instantiation alone measured 0.436ms, with no statistically significant difference from the vendor's 0.5ms claim (p=0.71). Of the 1.55ms full request path, the directly measured instantiation accounted for 28%. The remaining 72% was added by Kubernetes, the shim, the SDK and the HTTP layer; the layers were not probed separately, so how much each one added could not be split out. Containers were better for Ingestion, Wasm for Transform and Edge.",
            role: "Undergraduate Researcher (CSDC Lab, individual research project)",
            tech: ['SpinKube', 'WebAssembly', 'WASI', 'Rust', 'Go', 'Azure AKS', 'KEDA', 'Kubernetes', 'containerd-shim-spin', 'Statistical testing'],
            features: [
              "Ingestion layer favors containers: 24-28K rps vs about 1,264 rps for Wasm",
              "Transform layer favors Wasm: 8,000 tenants with no loss; in a monthly cost model with per-tenant isolation enforced, up to 64x cheaper per tenant at 2,500 tenants (6 vCPU cluster)",
              "Edge layer favors Wasm: 11x faster scale-from-zero cold start",
              "Preceding experiment: moving Python Wasm to native Rust Wasm cut the binary from 35.86MB to 0.39MB and raised throughput 7.8x",
              "Six limitations stated (6 vCPU cluster, single Go workload, SpinKube/Wasmtime only, and others)"
            ]
          },
          links: {
            demo: null,
            github: null,
            papers: [
              { label: 'Paper - Layer-specific runtime allocation (AKS)', url: '/assets/wasm-spinkube-iot-layer-allocation.pdf' }
            ]
          }
        },
        {
          id: 8,
          title: 'Roomeya: Serverless Dormitory Matching',
          category: 'DevOps & Infra',
          image: null,
          description: 'Full serverless AWS architecture + Terraform IaC for seasonal dormitory matching (9 Lambdas, Step Functions, DynamoDB)',
          how: "The service is used only in season, so it runs on pay-per-use Lambda and on-demand DynamoDB, with HTTP API v2 over REST API because usage plans and request validation were not needed.",
          details: {
            problem: "Dormitory matching is only used in season, so servers left running cost money in the months nobody uses them. The flow from survey collection through matching to result notification is also long, so we needed to see where it stopped.",
            decision: "We built it only from Lambda and on-demand DynamoDB, which charge for what is used. The matching flow lives in Step Functions so its execution history can be checked in the console, and since we needed neither usage plans nor request validation, we chose HTTP API v2 over REST API for its lower cost and latency.",
            result: "Built only on Lambda and on-demand DynamoDB, which bill per request, the design incurs no execution cost in the months it is not used, and the whole infrastructure is kept in Terraform so it can be stood up again each season.",
            role: "Cloud Architect. I owned the architecture design and all of the Terraform IaC.",
            tech: ['Terraform', 'AWS Lambda', 'AWS Step Functions', 'DynamoDB', 'API Gateway', 'Cognito'],
            features: [
              "9 Lambda functions + Step Functions matching workflow",
              "4 DynamoDB tables (Forms, FormResponses, Results, Students)",
              "Cognito OAuth 2.0 auth + API Gateway HTTP API v2",
              "Entire infrastructure, through SES email, codified in Terraform"
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
          how: "Rule-based scanners such as Checkov miss expired accounts and permissions that do not match a service's purpose, so I modeled Terraform IAM relationships as a graph, analyzed expiry and purpose alongside, and merged in Checkov results.",
          details: {
            problem: "Rule-based tools such as TFSec and Checkov only catch what matches a known pattern. They miss setups where each resource is fine on its own but risky once connected, and risks that appear over time, such as expired accounts.",
            decision: "I turned the relationships between Terraform IAM resources into a graph to find paths where permissions escalate, and compared each account's expiry and last-used dates, and each service's purpose against the permissions it was granted. Complementing the existing tools made more sense than replacing them, so a module merges in Checkov's results.",
            result: "It detects types that TFSec and Checkov did not flag when compared on the same test file, such as expired accounts, unused accounts and purpose mismatches, with the behavior pinned by 11 unit tests.",
            role: 'Security Researcher & Developer',
            tech: ['Python', 'BERT', 'Terraform', 'NetworkX', 'AWS IAM', 'Hugging Face', 'NLP'],
            features: [
              "Seven kinds of IAM relationships parsed with python-hcl2 into a NetworkX graph",
              "Escalation paths judged with a 17-action risk dictionary and action combinations",
              "Checkov results merged in to complement existing scanners"
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
          description: 'In 2022, without being asked, I moved the club server from a physical PC to AWS myself, removing the service\'s dependence on a campus PC that went down on power cuts and reboots, and making it manageable from off campus.',
          how: "The club server ran on a physical PC that stopped on every power cut and reboot and could only be fixed on campus, so in 2022 I moved it to AWS on my own initiative and set it up as Docker containers.",
          details: {
            problem: "The club server ran on a physical PC that went down with every power cut and reboot, and it could only be touched by someone on campus.",
            decision: "In 2022, without being asked, I moved the server to AWS and set the services up as Docker containers.",
            result: "The service no longer depends on a campus PC that stopped on power cuts and reboots, and it can be managed from off campus.",
            role: 'Cloud Architect',
            tech: ['AWS EC2', 'AWS EBS', 'AWS S3', 'AWS RDS', 'Docker'],
            features: [
              "Entire club server moved to AWS",
              "Docker-based containerization",
              "No longer dependent on a campus PC's power and reboots; managed from off campus"
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
          description: "Labeled every LLM call with its vendor (Vertex AI, AI Studio, OpenAI) and purpose, so spend can be tracked by purpose and an alert fires when a threshold is exceeded.",
          how: "Spend had to be visible before AI use grew, so the internal LLM server code labels each call with its vendor (Vertex AI, OpenAI and others) and purpose.",
          details: {
            problem: "Internal LLM usage was growing, but there was no way to tell which vendor's models or which features the money was going to.",
            decision: "I judged that spend by purpose had to be visible before AI use grew, so the internal LLM server code labels each call with its vendor and purpose.",
            result: "Spend on Vertex AI, AI Studio and OpenAI is broken down by vendor and purpose, and an alert fires when a threshold is exceeded.",
            learned: "This was an early task after joining, and it is where I learned the internal code rules and GraphQL conventions.",
            role: 'AX / Platform Engineer',
            tech: ['GraphQL', 'Cost Monitoring', 'FinOps'],
            features: [
              "Per-vendor (Vertex AI, AI Studio, OpenAI) LLM cost labeling",
              "Usage monitoring and alerts when a limit is exceeded",
              "Wrote a guide for adding labels"
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
          description: "Cut lead intake-to-owner assignment from 33.6h to about 26 minutes on average (98.7% faster, both measured in business hours). Started by defining what counts as a \"response\" in the SLA, then built business-hours measurement, alerts, and escalation that hands neglected leads to someone more senior.",
          how: "Assignment time alone can look good while what the customer feels is the first contact, so the SLA measures both, and before and after are compared in the same business hours.",
          details: {
            problem: "It took 33.6 hours on average from lead intake to owner assignment, and only 9% of leads had an owner within an hour (in business hours). Nothing recorded when the customer was first contacted, so slow responses were found only afterwards, by chance.",
            decision: "The problem sat inside the sales team's workflow, not in code, so before designing anything I followed the sales reps through their work and asked why contact was late and why an alert could not be acted on. The current design came out of those conversations.\n\nThe hardest part was defining \"response\". From the system's view it is when an owner is assigned; from sales' view it is when the customer is actually reached. Counting assignment alone makes the numbers look far better, but I kept both metrics and did not drop the less flattering first-contact one. The price is carrying a below-target metric into every report.\n\nThe SLA is measured in business hours only. Counting a Friday-evening inquiry picked up on Monday morning as a delay puts the metric out of step with reality. I narrowed alerts to hours when the owner can act instead of adding more, and neglected leads are handed to someone more senior instead.",
            result: "Average time from intake to owner assignment fell from 33.6 hours to about 26 minutes, and leads assigned to an owner within an hour rose from 9% to 86%. Intake and assignment times were already being recorded, so before and after use the same fields and the same basis. The first-customer-contact metric is still short of target.",
            learned: "The moment you switch to the flattering definition, a metric stops being a tool for improvement and becomes a number for reporting.",
            role: 'DevOps / FDE',
            tech: ['Notion', 'Backoffice', 'SLA Metrics', 'Alerting', 'Data Backfill'],
            features: [
              "Intake, owner assignment and first customer contact timestamps recorded automatically on one basis",
              "SLA measured automatically in business hours (weekends, holidays, after-hours excluded)",
              "Alerts only in hours the owner can act, escalation for neglected leads, live monitoring screen",
              "Removed duplicate intake, fixed a bug that reset intake time, detailed change history and backfilled past data"
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
          description: "A Notion Custom Agent takes each release document and judges whether it meets the team's deploy criteria, using prompts built from the criteria documents. It also finds tasks not linked to any release and connects them, so release records and work records do not drift apart, and publishes the DORA score report.",
          how: "Review that a person did by opening each release document moved to a Notion Custom Agent that takes the release document as input, judges it against each team's criteria documents and prompts, and links missing tasks to releases.",
          details: {
            problem: "Deployment quality review meant a person opening each release document and checking it. Criteria varied by person, so things were missed or inconsistent, and linking releases to tasks was done by hand as well.",
            decision: "Human review is accurate at first, but with repetition it becomes a formality and the criteria drift. So I moved the judgment to a Notion Custom Agent working from the same criteria documents and prompts, accepting that any single judgment may be less accurate than a person's.\n\nThe agent takes a release document as input and judges whether it meets the criteria, using prompts built from each team's deploy criteria documents. Finding tasks not linked to a release and connecting them also went to the agent, so release records and work records do not drift apart.",
            result: "Deployment quality review, finding and linking tasks not tied to a release, and publishing the DORA score report all run automatically, and the review agent is used across the company.",
            role: 'AX Engineer',
            tech: ['Notion Custom Agent', 'Prompt Engineering', 'Notion API'],
            features: [
              "Automatic deployment quality review by a Notion Custom Agent",
              "Tasks not tied to a release found and linked automatically",
              "Judged through prompts built from each team's criteria documents",
              "DORA score report published automatically"
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
          description: "Meeting notes in a fixed format are created automatically from calendar events. Built on Notion Workers and now used across the company.",
          how: "Shipping alone did not grow usage, so alongside auto-generating notes from calendar events I wrote usage docs and walked each team through adoption.",
          details: {
            problem: "Organizers created meeting notes by hand, so the notes appeared at a different point for each meeting, and until they existed, discussion items had to be kept somewhere else.",
            decision: "Meeting notes in a fixed format are now created automatically from calendar events. Shipping it did not grow usage by itself, so I wrote usage docs and walked each team through adoption.",
            result: "It is now used across the company.",
            role: 'AX Engineer',
            tech: ['Notion Workers (serverless)', 'Notion API', 'Calendar API'],
            features: [
              "Meeting notes in a fixed format generated from calendar events",
              "Serverless setup (Notion Workers), similar to AWS Lambda",
              "Usage docs, team-by-team onboarding, company-wide rollout"
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
      description: "Terraform と Atlantis でインフラ変更を PR 承認の手順に移し、LLM と Notion エージェントで社内の反復業務を自動化します。\n人とのつながりを大切にする DevOps エンジニアです。インフラと AX でチームの仕事をつなぎ、専攻やサークルの異なる開発者が交わるコミュニティをつくり、率いてきました。\n営業チームのリード割り当てのような開発外の業務も、担当者に直接ヒアリングして測定基準から定めます。",
      cta: "プロジェクトを見る",
      label: "DevOps Engineer · BUZZ & BEYOND 2026~",
      highlights: [
        { label: "DevOps", text: "Terraform と Atlantis で GitOps 基盤を構築、開発者の AWS アクセスキーを全廃" },
        { label: "Open Source", text: "CNCF Atlantis のバグを修正、公式リリース v0.41.0 に反映" },
        { label: "AX", text: "Notion と FLEX（人事労務 SaaS）を連携した全社業務量モニタリングを構築・運用。CS とリード対応エージェントも開発" },
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
      learned: "学び",
      constraints: "この構成の前提と制約",
      more: "詳細",
      zoom: "図を拡大",
      diagram: "構成図を見る"
    },
    cases: [
      {
        projectId: 1,
        diagram: "/assets/diagrams/atlantis-gitops.svg",
        diagramAlt: "Atlantis GitOps構成図。開発者のPRがBitbucketのWebhookでKubernetes上のAtlantisに届き、Podのbase roleがサービス別のtarget roleをAssumeRoleしてplanとapplyを実行します。状態ファイルのバケットは許可リスト外のアクセスを拒否するため、ローカル実行はできません。",
        summary: "ローカルでの Terraform 実行を PR 承認の手順に移し、途中で詰まった安全装置は無効化せずアップストリームで直しました。",
        outcome: "開発者 PC の長期アクセスキー 0個、非常時の復旧以外の Terraform 変更を PR 単位で記録",
        problem: "インフラを触る人が一人から複数人に増えました。一人のときはローカルで terraform apply を実行しても問題は表に出ませんでしたが、人が増えると同じ構造がそのまま問題になりました。全システムが管理者権限で動いており、誰にでもすべてを開く構造でした。誰がいつ何を変えたかを追えませんでした。同時作業で State Lock がかかると、誰が握っているのかをチャットで聞いて回る必要がありました。ローカル実行のため、開発者それぞれが長期の AWS Access Key を持っていました。",
        decision: "変更を人の記憶と合意に任せるのをやめ、リポジトリの記録と承認手続きに移すことにしました。Terraform Cloud は有料で、ステートファイルを外部 SaaS に預ける必要があるため外しました。汎用 CI で自作すると、plan の結果を PR に貼り apply を承認と連動させるロジックをすべて作ることになり、結局 Atlantis を作り直すことになります。そこで Atlantis をセルフホストし、問題が起きれば自分たちで直すというコストを受け入れました。配置先は別の EC2 ではなく既に運用していた Kubernetes クラスタにし、監視、ロールアウト、シークレット管理を既存の仕組みのまま使いました。Access Key が残っていれば急ぐときに誰かがその道を使うため全量回収し、AssumeRole でデプロイ時にのみサービス別の最小権限を発行しました。ローカルからの迂回は、ステートファイルのバケットポリシーの明示的な拒否で止めました。削除権限の除去は誤って作ったリソースも消せなくなり、タグによる制御はタグを書き換えれば迂回できるため却下しました。緊急デプロイの速度を諦める代わりに、承認者を複数置いて待ち時間を減らしました。",
        result: "Terraform の変更は Atlantis の PR 単位で記録され、承認なしには apply できません。ステートファイルのバケットに直接触れられる例外は、非常時の復旧用の管理者アカウントに限りました。開発者 PC にあった長期 Access Key は 0 個になりました。権限はサービス別のロールに分かれ、定義されていないサービスへのアクセスは拒否されます。運用中に plan_requirements: mergeable が正常な PR まで止めたバグは、オプションを切らずに自ら修正し、PR #6186 として Atlantis v0.41.0 に反映されました。",
        learned: "迂回路を残したまま作った手続きは、手続きではなく推奨に過ぎません。構築中に起きた設定の問題のいくつかは、サーバー側の設定（values.yaml）とリポジトリ側の設定（atlantis.yaml）がそれぞれどこまで効くのかを知らなかったことが原因でした。設定が二層ある仕組みでは、各層の範囲を先に確認すべきでした。明示的な拒否は強力なぶん、元に戻しにくいものです。",
        constraints: [
          "Atlantis を載せた Kubernetes クラスタに障害が起きると、インフラのデプロイも一緒に止まります。インフラのデプロイは常時必要な作業ではないと考えて受け入れました。普段はローカル実行がステートファイルのバケットで拒否され、こうした非常時に限り、許可リストに残した管理者アカウントでローカルから復旧します。",
          "ステートファイルのバケットは、許可リスト外のアクセスを管理者権限も含めて拒否します。ポリシーを誤るとパイプライン全体が止まるため、非常用の管理者アカウントを一つ許可リストに残しています。",
          "メモリの上限のため、plan と apply は並列ではなく順次実行しています。"
        ],
        incident: {
          title: "障害対応の記録: メモリ不足による強制終了後の Lock DB 破損",
          steps: [
            { label: "症状", text: "Atlantis の Pod がメモリ不足（OOM）で強制終了され、再起動すると「must be mergeable」と「invalid key」の二つのエラーが同時に出ました。マージできる PR なのに plan が止まりました。" },
            { label: "原因の絞り込み", text: "「invalid key」という文言が引っかかりました。キーがないときは別の文言（Lock not found）が出るからです。ソースを確認すると、このエラーは Atlantis が Lock を保管する内蔵 BoltDB のファイルからキーを読めないときに出るものでした。エラーは OOM による強制終了の直後から出ており、IAM の plan 一つだけでもメモリのピークが上限に近づいていました。これを根拠に、並列の plan がメモリの上限を超え、書き込みの途中で強制終了されてファイルが壊れたと判断しました。二つのエラーは原因が別でした。" },
            { label: "対応", text: "plan と apply を並列から順次に変えました。Atlantis の Lock は PR の衝突を防ぐためのもので、State を守る Terraform の Lock は DynamoDB に別にあるため、作り直せるデータだと判断して DB ファイルを削除し、Pod を再起動しました。" },
            { label: "再発防止", text: "順次実行を維持し、ダッシュボードで plan が終わるたびにメモリが下がってから上がる正常なパターンを確認しました。Lock の保存先を Redis に移す案は、管理する構成要素と費用が増えるため却下しました。" },
            { label: "その後", text: "残った「must be mergeable」は Atlantis 自体のバグで、アップストリームでの修正（PR #6186）につながりました。" }
          ]
        },
        links: [
          { label: "PR #6186", url: "https://github.com/runatlantis/atlantis/pull/6186" }
        ]
      },
      {
        projectId: 7,
        diagram: "/assets/diagrams/nanogrid.svg",
        diagramAlt: "NanoGrid構成図。リクエストはAWS WAFとALBを通ってパブリックサブネットのController EC2に入り、SQSを介してプライベートサブネットのWorker ASGに渡されます。結果はElastiCache Redisで戻り、WorkerはGateway VPC EndpointでS3とDynamoDBにアクセスし、AIノードを呼び出します。",
        summary: "マネージド FaaS の実行時間上限とデータ流出の制約を EC2 上で取り払い、代わりに背負った拡張性はコールドスタートを三つの層に分けて解きました。",
        outcome: "実行単位のコールドスタートを 3秒から 0.2秒へ、ワーカーの IAM を単一キューの 3アクションに縮小",
        problem: "課題は、HTTP リクエストの処理を EC2 上で行うという制約でした。Lambda が代わりにやってくれていた関数のアップロード、HTTP 呼び出し、即時実行を、マネージド FaaS なしで自作する必要がありました。リクエストが集中したときにワーカーを増やす拡張性も、自分たちで担うことになりました。チームはここに目標をもう一つ足し、自前でホストするならマネージド FaaS の制約（当時の API Gateway 構成の 29 秒の統合タイムアウト、ランタイム制約、推論データの外部流出）も一緒に解くことにしました。チームでは私がインフラとセキュリティを担当しました。",
        decision: "慣れている API Gateway と Dispatcher Lambda で 6 時間でプロトタイプを動かしましたが、リクエスト経路に API Gateway が残り、実行時間の上限もそのままでした。202 を先に返して結果を後で知らせる迂回は制約を移すだけなので選ばず、ALB と EC2 Controller に切り替えました。コールドスタートは、実行単位、ワーカーインスタンス、スケーリング判断という時間の規模が違う三つの層に分けて考えました。実行単位は、リクエストごとにコンテナを作らず、ランタイム別（Python、Node.js、C++、Go）のプールから借りて返す方式にしました。スケーリング判断は CPU ではなく SQS のキュー長を基準にしました。CPU はしきい値に達する頃にはすでに利用者が遅延を体験しており、キュー長は負荷がワーカーに届く前に上がるからです。ジョブの投入は失われてはならないので SQS に、結果の受け渡しは呼び出し側が待っているので遅延の小さい Redis Pub/Sub に任せました。任意のユーザーコードを実行するプラットフォームなので、ワーカーの IAM を SQS FullAccess から単一キューの 3 アクションに減らしました。",
        result: "実行単位のコールドスタートは 3 秒から 0.2 秒に縮まりました。Prometheus の worker_job_duration_seconds ヒストグラムで、適用前後の分布が移ったことを確認した値です。ワーカー権限の影響範囲は、アカウント全体から単一のキューに縮まりました。推論ノード（Ollama）はインターネット経路もパブリックアドレスもないプライベートサブネットに置き、ワーカーのセキュリティグループからのみ届くようにしました。SoftBank Hackathon の本選に進みました。",
        learned: "三つの層はどれも「どうすればもっと早く準備できるか」という同じ問いでした。終わってから、「そもそも起動するものをどこまで小さくできるか」という別の軸の問いがあることに気づき、これが WebAssembly ランタイムの研究につながりました。",
        constraints: [
          "Controller と Worker をつなぐのは SQS 一つだけで、互いを知りません。Controller はパブリックサブネットの 2 AZ に、Worker はプライベートサブネットに置いています。",
          "S3 と DynamoDB には Gateway VPC Endpoint を付け、ワーカーの通信が NAT を通らないようにしています。",
          "ハッカソン本選で作った構成で、実ユーザーのトラフィックを受けたシステムではありません。"
        ],
        links: [
          { label: "AWS Article", url: "https://builder.aws.com/content/3I2Mw8lAM0x9sODvAwmHN8RylXM/building-a-faas-on-ec2-without-lambda-and-splitting-cold-start-into-three-layers" },
          { label: "GitHub", url: "https://github.com/Softbank-Final" }
        ]
      },
      {
        projectId: 6,
        diagram: "/assets/diagrams/wasm-runtime.svg",
        diagramAlt: "Wasm とコンテナの比較実験の構成図。同じ Go ワークロードを SpinKube Wasm モジュールと scratch コンテナでそれぞれビルドして AKS 1.34 クラスタに載せ、Edge、Transform、Ingestion の各層でコールドスタートと Pod Ready、テナント密度と費用、処理量を比較します。Storage 層はモデル化のみで比較していません。",
        summary: "ベンダーがランタイムだけを切り離して測った Wasm の優位が Kubernetes の運用スタックを通っても残るかを、同じ Go ワークロードを Wasm とコンテナで作り、AKS で直接測りました。",
        outcome: "実測にもとづき、Ingestion はコンテナ、Transform と Edge は Wasm という階層別の割当基準を提案",
        problem: "Wasm ランタイムのベンダーは、コンテナよりコールドスタートが約 400 倍速く Pod 密度が 43 倍高いと主張していますが、これはランタイムだけを切り離して測ったマイクロベンチマークの値です。Kubernetes の運用スタック（shim、SDK、HTTP 層）を通った経路全体でも同じ優位が残るかは、検証されていませんでした。",
        decision: "ベンダーの数値をそのまま信じず、自分で測ることにしました。IoT ログパイプラインを Edge、Transform、Ingestion、Storage の四階層にモデル化し、そのうち三階層を同じ Go ワークロードの SpinKube Wasm モジュールと scratch コンテナでそれぞれ作り、AKS 1.34 上で比較しました。言語、ロジック、負荷条件をそろえ、ランタイムの違いだけが残るようにしました。差が偶然かどうかを見分けるため、Shapiro-Wilk の正規性検定のあと Welch の t 検定か Mann-Whitney の U 検定を自動で選ぶようにし、10 の指標群に Bonferroni 補正を適用しました。結論は「どちらのランタイムが優れているか」にはしませんでした。階層ごとに有利な方が逆になったため、一つを選ぶのではなく階層別に割り当てる基準を提案しました。",
        result: "ランタイムのインスタンス化だけを測ると 0.436ms で、ベンダーの主張（0.5ms）との間に統計的に有意な差はありませんでした（p=0.71、n=10）。標本が小さいため、両者が同じだという根拠にはしていません。リクエスト経路全体 1.55ms のうち、直接測ったインスタンス化の割合は 28% でした。残りの 72% は Kubernetes、shim、SDK、HTTP 層で加わった分で、層ごとに個別には測っていないため、どの層がどれだけ加えたかは分けられていません。Ingestion ではコンテナが 24〜28K rps を保ち、Wasm（約 1,264 rps）より処理量が高くなりました。Transform では、テナントごとの隔離を強制した月額費用モデルで、2,500 テナント時に Wasm のテナント当たり費用が最大 64 倍安くなりました。Edge では scale-from-zero のコールドスタートで Wasm が 11 倍速くなりました。",
        learned: "最初は外部のロードバランサー経由で負荷をかけたところ、高負荷の区間で逆の結果が出ました。ホストと外部ロードバランサーの間のネットワークの影響と分かり、クラスタ内部から測り直しました。同じ実験でも、負荷をどこからかけるかで結論が逆転しうると学びました。",
        constraints: [
          "6 vCPU の free-tier クラスタで測った値のため、41 Pod の上限や 8,000 テナントの上限といった絶対値は本番規模とは異なる可能性があります。",
          "単一の Go ワークロードで、SpinKube と Wasmtime に限った結果です。Storage 層は比較していません。",
          "コンテナは Kubernetes の推奨最小リクエスト（128Mi）を基準にしており、リクエストを下げると密度と費用の結果が変わります。インスタンス化は shim のジャーナルのタイムスタンプで測っており、コンテナの基準値とは測定経路が異なります。"
        ],
        links: [
          { label: "論文 PDF", url: "/assets/wasm-spinkube-iot-layer-allocation.pdf" }
        ]
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
              '1日200件以上の業務を自動分類',
              'チーム別のデプロイ基準を合意・文書化し算出基準として固定'
            ],
            'インバウンドリードの SLA 体系を構築',
            [
              'リード受付から担当者割り当てまでの平均を 33.6 時間から約 26 分へ短縮（98.7% 短縮）、1 時間以内の担当者割り当て率 9% → 86%',
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
          period: '2025.12',
          description: [
            '本選進出 (2025.12.06 ~ 2025.12.07)'
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
      metrics: { 4: "DORA 4指標を毎日自動算出", 2: "PR #6186 マージ、v0.41.0 に収録", 3: "日次 200件+ 自動分類", 15: "担当者割り当て 33.6時間 → 約26分", 6: "AKS 1.34 実測", 5: "PR #124 マージ", 8: "オフシーズンは実行費用がかからない構成", 11: "2022年に自主的に移行", 12: "ベンダーと用途別の支出追跡、しきい値アラート", 13: "リリースレビューとタスク紐付けを自動化", 14: "全社展開" },
      order: [15, 3, 2, 4, 13, 8, 12, 14, 5, 10, 9, 11],
      showMore: "もっと見る",
      showLess: "閉じる",
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
        problem: "課題",
        decision: "判断",
        result: "結果",
        learned: "学び",
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
          description: "Terraform の変更をローカル実行から Atlantis の PR 承認手続き（GitOps）へ移し、誰がいつ何を変えたかを PR 単位で記録に残しました。サービス別の AssumeRole で権限を分け、開発者 PC の長期 Access Key をすべて回収しました。",
          how: "Terraform の変更を PR 承認後にのみ適用するため Atlantis をセルフホストしました。ステートを外部 SaaS に預ける Terraform Cloud と、plan の掲示やロック管理を自作する必要がある汎用 CI は比較のうえ外しました。",
          details: {
            problem: "インフラを触る人が一人から複数人に増えました。全システムが管理者権限で動いていたため、人が増えると誰にでもすべてを開く構造になり、誰がいつ何を変えたかを追えず、同時作業でロックがかかると誰が握っているのかをチャットで聞いて回る必要がありました。",
            decision: "変更を人の記憶に任せるのをやめ、リポジトリの記録と承認手続きに移すことにしました。Terraform Cloudは状態ファイルを外部に預ける必要があり、汎用CIは承認手続きを自分たちで作る必要があったため、Atlantisを自前で運用する方を選びました。アクセスキーが残っていれば急ぐときに誰かがその道を使うと考え、キーも併せて回収しました。",
            result: "権限をサービスごとに分け、個人PCのアクセスキーをすべて回収し、すべての変更が承認を経て記録に残るようになりました。",
            role: 'Platform Engineer',
            tech: ['Terraform', 'Atlantis', 'Kubernetes', 'Helm', 'AWS IAM', 'Golang'],
            features: [
              "AtlantisをHelmでKubernetesにデプロイし、インフラ変更をPR承認の手続きへ移行",
              "マージできないPRはplanの段階で遮断（plan_requirements: mergeable）",
              "AssumeRoleでデプロイ時にのみ一時権限を発行、個人PCのアクセスキーをすべて回収",
              "状態ファイルのバケットで許可リスト外をすべて拒否し、ローカルからの迂回実行を遮断"
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
          how: "コメント実行の経路と違い autoplan の経路にだけ PR のマージ状態の取得が欠けていたことを Go のコードから突き止めて追加し、その取得自体を回帰テストで固定しました。",
          details: {
            problem: "マージできない PR がインフラに適用されるのを止めるために plan_requirements: mergeable を設定していましたが、コンフリクトのない正常な PR でも autoplan が毎回「Pull request must be mergeable before running plan」で止まり、インフラの変更が進まなくなりました。",
            decision: "原因は二つの実行経路の違いでした。コメントで実行する run() の経路には PR のマージ可否を取得する FetchPullStatus() の呼び出しがありますが、runAutoplan() の経路にはありませんでした。そのため IsMergeable は Go の既定値 false のまま残り、条件が常に失敗していました。\n\n修正は、欠けていた取得を autoplan の経路に足す 10 行です。呼び出しを一行足すだけでは、実行経路がもう一つ増えたときに同じことが起きるため、autoplan の経路がマージ状態を取得するという事実そのものをテスト 91 行で固定しました。",
            result: "2026.03.26 にマージされて Atlantis v0.41.0 に収録され、3年近く開いたままだった Issue #3486 がクローズされました。社内では安全装置を切らないまま承認手続きを運用しています。",
            learned: "直す時間よりも、症状から原因を絞り込み、初めて見るコードベースの慣習に合わせてテストを書く時間の方がはるかに長くかかりました。Go に不慣れだったことはむしろ助けになりました。分かっていると思えば読み飛ばしたはずのコードを一行ずつ読むことになり、IsMergeable がどこでも設定されていないことはその過程で見つけました。",
            role: 'Open Source Contributor',
            tech: ['Golang', 'Atlantis', 'Terraform', 'Git'],
            features: [
              "原因: runAutoplan() の経路で FetchPullStatus() の呼び出しが欠落し、IsMergeable が Go の既定値 false のまま",
              "本体コード 10 行（server/events/plan_command_runner.go）、回帰テスト 91 行（2 ケース）",
              "同じ症状の Issue が同じ原因かを CNCF Slack で確認したうえで修正",
              "2026.03.26 マージ、Atlantis v0.41.0 に収録。Issue #3486 をクローズ"
            ]
          },
          links: { demo: null, github: 'https://github.com/runatlantis/atlantis/pull/6186' }
        },
        {
          id: 7,
          title: 'NanoGrid: マネージド FaaS の制約を取り払った関数実行プラットフォーム',
          category: 'DevOps & Infra',
          image: null,
          description: "マネージド FaaS（AWS Lambda）が定めていた実行時間の上限、ランタイム制約、推論データの外部流出を EC2 上で取り払った関数実行プラットフォームです。代わりに自ら背負うことになった拡張性は、コールドスタートを実行単位、ワーカーインスタンス、スケーリング判断の三つの層に分けて解きました。実行単位のコールドスタートはコンテナプールの再利用で 3 秒から 0.2 秒になりました（Prometheus のヒストグラムで前後を測定）。SoftBank Hackathon 本選進出。",
          how: "CPU 使用率は上がる頃にはすでに利用者が遅延を体験しているため SQS のキュー長でワーカーを増やし、リクエストごとに作っていた Docker コンテナはランタイム別のプールから借りる方式に変えました。",
          details: {
            problem: "HTTPリクエストの処理をEC2上で行うという制約のもと、Lambdaが代わりにやってくれていた関数のアップロード、呼び出し、実行を自分たちで作る必要がありました。リクエストが集中したときにサーバーを増やす仕事も、自分たちで担うことになりました。",
            decision: "まず慣れているAPI GatewayとLambdaでプロトタイプを動かしましたが、実行時間の上限がそのまま残るため取り外し、ALBとEC2 Controllerに切り替えました。リクエストごとにコンテナを作らず、ランタイム別にあらかじめ起動しておいたものを借りて使うようにし、サーバーを増やすかどうかはCPUではなくSQSに溜まったリクエスト数で判断しました。CPUは数値が上がる頃には、すでに利用者が遅延を体験した後だからです。",
            result: "実行を始めるまでの時間が3秒から0.2秒に縮まり、SoftBank Hackathonの本選に進みました。",
            role: "Infrastructure & Security。チームではインフラとセキュリティを担当しました。",
            tech: ['AWS EC2', 'ALB', 'Auto Scaling Warm Pool', 'AWS SQS', 'AWS S3', 'DynamoDB', 'ElastiCache Redis', 'AWS WAF', 'Terraform', 'Docker', 'Prometheus', 'Ollama', 'GCP Cloud Storage'],
            features: [
              "ランタイム別（Python、Node.js、C++、Go）のコンテナプールを事前起動して再利用",
              "SQSに溜まったリクエスト数を基準にワーカー数を調整",
              "ワーカーの権限を単一キューの3アクションに縮小、WAFルール5種を適用",
              "インターネット経路のないプライベートサブネットにOllamaを置き、ワーカーからのみ接続"
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
          how: "CodePipeline の成功応答だけではサービスが実際に応答するか分からないため、デプロイ後に Elastic Beanstalk のヘルスと HTTP 200 を再確認し、通らなければ失敗として扱いました。",
          details: {
            problem: "デプロイの状態がログとしてしか流れず、開発者でなければ今どこまで進んだのか分かりませんでした。パイプラインが成功を返しても、デプロイしたサービスが実際に応答するかは分かりませんでした。",
            decision: "デプロイの過程を、キャラクターが各ステージを走り抜けるゲーム画面に変え、誰でもリアルタイムで見られるようにしました。パイプラインの成功応答を最終的な成功とはみなさず、デプロイ後に環境の状態と実際のHTTP 200応答をもう一度確認し、通らなければ失敗に切り替えます。失敗したときはBedrockがログから原因を要約し、DiscordとSlackにすぐ通知します。",
            result: "GitHub PushからBuild、Deploy、Health Checkまでの全過程が自動でつながり、状態はモニタリング画面にリアルタイムで描かれます。",
            role: "Infra & Backend。Terraform のインフラと Lambda API の実装を担当しました。",
            tech: ['AWS CodePipeline', 'AWS CodeBuild', 'Elastic Beanstalk', 'AWS Lambda', 'Amazon EventBridge', 'DynamoDB', 'Amazon Bedrock', 'AWS Amplify', 'Terraform'],
            features: [
              "キャラクターがパイプラインを走り抜けるゲーム型のリアルタイムデプロイ画面",
              "EventBridge → Lambda → DynamoDBでデプロイ状態を記録",
              "デプロイ後にEB環境の状態とHTTP 200を再確認し、通らなければ失敗と判定",
              "Bedrockで失敗ログを要約、呼び出し制限には指数バックオフで最大3回再試行"
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
          how: "同じ業務名でも属するロードマップによって性格が変わるため、先にロードマップを判定してから業務タイプを分ける二段階の LLM 分類（Gemini 2.5 Flash）でチーム別の業務量を集計しました。",
          details: {
            problem: "業務が複数の Notion DB に散らばっていて、メンバーの時間が実際にどこへ使われているのかを集計できませんでした。手作業で分類すると人によって基準が違い、同じ性質の仕事が別のタイプとして積み上がり、その上にどんな指標を載せても信頼できない状態でした。",
            decision: "単一のプロンプトにタイトルだけを渡して 13 タイプから一つを選ばせると、精度が落ちました。同じタイトルでも、どのロードマップに属する仕事かでタイプが変わるからです。そこで先にロードマップの性格を判定し、その結果をコンテキストに入れて業務を分類する二段階に分けました。LLM の呼び出しが増えるコストは受け入れました。1 日 1 回のバッチなので、遅延は問題になりませんでした。\n\nモデルは上位モデルではなく Gemini 2.5 Flash を選びました。1 日 200 件以上を毎日回すバッチでは、モデルの単価がそのまま運用費になります。分類は推論の難しさよりも判断基準の一貫性が大事な作業なので、モデルを上げるよりプロンプトと階層構造に投資する方がよいと判断しました。\n\n分類結果は Apollo Federation の Subgraph として切り出しました。このパイプラインの中だけに置くと他の機能で同じ計算をやり直すことになるため、社内の他サービスが GraphQL で参照できるようにしました。",
            result: "1 日 200 件以上の業務を、13 の業務タイプと 14 のミーティングタイプに Argo CronWorkflow で毎日自動分類し、その結果を FLEX の勤怠データとつないでチーム別の業務量を見ています。",
            role: 'DevOps & AX Engineer',
            tech: ['Gemini', 'Argo Workflows', 'Python', 'Apollo Federation', 'GraphQL'],
            features: [
              "ロードマップの性格を判定してから業務を分類する二段階の LLM 分類（Gemini 2.5 Flash）",
              "1 日 200 件以上を Argo CronWorkflow で毎日処理",
              "13 の業務タイプ、14 のミーティングタイプに自動で割り当て",
              "分類結果を Apollo Federation Subgraph として公開し、他サービスが GraphQL で参照"
            ]
          },
          links: { demo: null, github: null }
        },
        {
          id: 4,
          title: '生産性指標の仕組みづくり',
          category: 'AX 業務自動化',
          image: "/assets/diagrams/ax-metrics.svg",
          description: "「何をデプロイと数えるか」をチームごとに合意して文書で固定し、DORA の 4 指標（デプロイ頻度、変更のリードタイム、変更失敗率、復旧時間）を Notion のリリース文書から毎日自動で算出しています。言葉でしか語れなかった生産性を数字で示せるようになり、社内 AX 転換の主要指標として使っています。",
          how: "コミット数は変更量にすぎず、トークン使用量は水増ししやすいため外し、チームごとに合意して文書で定めた基準を満たすデプロイだけを数えて DORA の 4 指標を算出しています。",
          details: {
            problem: "誰もがAIで生産性が上がったと言いますが、どれだけ上がったのかに答える方法がありませんでした。業務はNotionのタスクに、デプロイはリリース文書に、障害はまた別のDBに残り、一つの基準でつながっていませんでした。",
            decision: "コミット数はコードを多く変えたというだけで、トークン使用量は個人が水増ししやすいため、意味のあるデプロイにつながったものだけを生産性と認めました。何をデプロイと数えるかはチームごとに話し合って合意し、文書で固定しました。基準を一方的に決めると、チームが指標を信じなくなるからです。指標は全員が毎日使っているNotionのリリース文書から取り出し、デプロイが終われば計測も一緒に終わるようにしました。",
            result: "言葉でしか語れなかった生産性を数字で示せるようになり、社内AX転換の主要指標として使っています。",
            learned: "計測が別の作業として残っていると、忙しいときに真っ先に後回しにされ、遅れたデータで作った指標は信頼を失います。そのため、実装よりもチームごとにデプロイ基準を合意して文書で固定することに時間をかけました。",
            role: 'DevOps Engineer',
            tech: ['Python', 'SQLite', 'REST API', 'Grafana'],
            features: [
              "チームごとのデプロイ基準を各チームと合意し、文書で固定",
              "DORAの4指標（デプロイ頻度、リードタイム、失敗率、復旧時間）を毎日自動算出",
              "基準を満たしているかはNotionカスタムエージェントがレビュー"
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
          how: "Spin Python SDK の Postgres サンプルだけがクエリ結果をログに出して固定文字列を返し、結果を確認できなかったため、他言語 SDK と同じく表形式で HTTP レスポンスに載せるよう直しました。",
          details: {
            problem: "Spin Python SDKのPostgresサンプルは、クエリ結果をサーバーログにだけ出力し、レスポンスには固定文字列を返していたため、サンプル通りに動かしても結果を確認できませんでした。",
            decision: "他のユーザーが起票したIssue（#115）を引き受け、他言語のSDKと同じようにクエリ結果を表形式でレスポンスに載せるよう直しました。",
            result: "PR #124が2025.12.15にマージされ、サンプル文書の誤り2件（#126、#128）も併せて直しました。",
            role: 'Open Source Contributor',
            tech: ['Python', 'WebAssembly', 'Spin Framework', 'Git'],
            features: [
              "format_value、format_rowsetヘルパーでクエリ結果を表形式で返却",
              "READMEにサンプル用testテーブルの作成SQLを追加",
              "PR #126、#128: サンプルREADMEのタイトル誤りとタイプミスを修正"
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
          how: "ベンダーの数値はランタイムだけを切り離して測った値のため、同じ Go ワークロードを SpinKube Wasm とコンテナで作って AKS 上で実測し、階層ごとにランタイムを割り当てる基準を提案しました。",
          details: {
            problem: "Wasm ランタイムのベンダーは、コンテナよりコールドスタートが約 400 倍速く Pod 密度が 43 倍高いと主張していますが、これはランタイムだけを切り離して測ったマイクロベンチマークの値です。Kubernetes の運用スタック（shim、SDK、HTTP 層）を通った経路全体でも同じ優位が残るかは、検証されていませんでした。",
            decision: "ベンダーの数値をそのまま信じず、自分で測ることにしました。IoT ログパイプラインを Edge、Transform、Ingestion、Storage の四階層にモデル化し、そのうち三階層を同じ Go ワークロードの SpinKube Wasm モジュールと scratch コンテナでそれぞれ作り、AKS 1.34 上で比較しました。言語、ロジック、負荷条件をそろえ、ランタイムの違いだけが残るようにしました。\n\n差が偶然かどうかを見分けるため、Shapiro-Wilk の正規性検定のあと Welch の t 検定か Mann-Whitney の U 検定を自動で選ぶようにし、10 の指標群に Bonferroni 補正を適用しました。\n\n結論は「どちらのランタイムが優れているか」にはしませんでした。階層ごとに有利な方が逆になったため、一つを選ぶのではなく階層別に割り当てる基準を提案しました。",
            result: "ランタイムのインスタンス化だけを測ると 0.436ms で、ベンダーの主張（0.5ms）との間に統計的に有意な差はありませんでした（p=0.71）。リクエスト経路全体 1.55ms のうち、直接測ったインスタンス化の割合は 28% でした。残りの 72% は Kubernetes、shim、SDK、HTTP 層で加わった分で、層ごとに個別には測っていないため、どの層がどれだけ加えたかは分けられていません。Ingestion はコンテナ、Transform と Edge は Wasm が有利でした。",
            role: "学部研究生（CSDC Lab 個別研究として実施）",
            tech: ['SpinKube', 'WebAssembly', 'WASI', 'Rust', 'Go', 'Azure AKS', 'KEDA', 'Kubernetes', 'containerd-shim-spin', '統計検定'],
            features: [
              "受信（Ingestion）階層はコンテナ優位: 24〜28K rps vs Wasm 約1,264 rps",
              "変換（Transform）階層は Wasm 優位: 8,000 テナントを無損失で収容。テナントごとの隔離を強制した月額費用モデルで、2,500 テナント時にテナント当たり費用が最大 64 倍安価（6 vCPU クラスタ基準）",
              "Edge 階層は Wasm 優位: scale-from-zero のコールドスタートが 11 倍高速",
              "先行実験: Python Wasm を Rust ネイティブ Wasm に移し、バイナリを 35.86MB から 0.39MB に、スループットを 7.8 倍に",
              "限界を 6 件明示（6 vCPU クラスタ、単一の Go ワークロード、SpinKube/Wasmtime 限定など）"
            ]
          },
          links: {
            demo: null,
            github: null,
            papers: [
              { label: '論文・階層別ランタイム割当（AKS 実測）', url: '/assets/wasm-spinkube-iot-layer-allocation.pdf' }
            ]
          }
        },
        {
          id: 8,
          title: 'Roomeya: Serverless Dormitory Matching',
          category: 'DevOps & Infra',
          image: null,
          description: 'シーズン別寮マッチングサービス。AWSフルサーバーレスアーキテクチャ + Terraform IaC（Lambda 9個、Step Functions、DynamoDB）',
          how: "シーズンにしか使われないサービスのため、使った分だけ支払う Lambda と DynamoDB オンデマンドで構成し、使用量プランとリクエスト検証が不要なので REST API ではなく HTTP API v2 を選びました。",
          details: {
            problem: "寮のマッチングはシーズンにしか使われないため、サーバーを動かし続けると使わない期間にも費用がかかります。アンケート収集、マッチング演算、結果通知と続く流れも長く、どこで止まったかが見える必要がありました。",
            decision: "使った分だけ支払うLambdaとDynamoDBオンデマンドだけで構成しました。マッチングの流れはStep Functionsに置いて実行履歴をコンソールで確認できるようにし、使用量プランやリクエスト検証が不要だったため、REST APIではなくコストと遅延の低いHTTP API v2を選びました。",
            result: "リクエストがなければ実行課金のないLambdaとDynamoDBオンデマンドだけで構成したため、使わない期間は実行費用がかからない設計で、インフラ全体をTerraformに残してあるためシーズンごとに立て直せます。",
            role: "Cloud Architect。アーキテクチャ設計と Terraform IaC の全体を担当しました。",
            tech: ['Terraform', 'AWS Lambda', 'AWS Step Functions', 'DynamoDB', 'API Gateway', 'Cognito'],
            features: [
              "Lambda関数9個 + Step Functionsのマッチングワークフロー",
              "DynamoDB 4テーブル（Forms、FormResponses、Results、Students）",
              "Cognito OAuth 2.0認証 + API Gateway HTTP API v2",
              "SESのメール送信まで、インフラ全体をTerraformでコード化"
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
          how: "Checkov のようなルールベースのスキャナーは期限切れアカウントや目的に合わない権限を見逃すため、Terraform の IAM 関係をグラフにし、有効期限とサービス目的を併せて分析して Checkov の結果と統合しました。",
          details: {
            problem: "TFSecやCheckovのようなルールベースのツールは、決まったパターンに当てはまるものしか検知しません。リソース一つひとつは正常でもつなぐと危険になる構成や、期限切れアカウントのように時間が経って生じるリスクは見逃します。",
            decision: "TerraformのIAMリソースの関係をグラフにして権限が上がっていく経路を探し、アカウントの有効期限と最終使用日、サービスの目的と付与された権限を併せて比較しました。既存ツールを置き換えるより補う方が適切だと考え、Checkovの結果を統合するモジュールを設けました。",
            result: "期限切れアカウント、未使用アカウント、目的の不一致など、同じテストファイルで比較した TFSec と Checkov が検知しなかった類型を検知し、動作をユニットテスト11件で固定しました。",
            role: 'Security Researcher & Developer',
            tech: ['Python', 'BERT', 'Terraform', 'NetworkX', 'AWS IAM', 'Hugging Face', 'NLP'],
            features: [
              "python-hcl2でパースしたIAM関係7種をNetworkXのグラフに構成",
              "危険アクション17種の辞書とアクションの組み合わせで権限昇格経路を判定",
              "Checkovの結果を統合し、既存スキャナーと相互補完"
            ]
          },
          links: { demo: null, github: 'https://github.com/Gosorasora/NLP-Enhanced-IaC-Security-Analyzer' }
        },
        {
          id: 11,
          title: 'AWS クラウド移行（CAPS サークル）',
          category: 'DevOps & Infra',
          image: null,
          description: '2022年、頼まれたわけではなくサークルのサーバーを物理PCからAWSへ自ら移行。停電や再起動で止まる学内PCへの依存をなくし、学外からも管理可能に',
          how: "物理 PC で動かしていたサークルのサーバーが停電や再起動のたびに止まり、学内でしか触れなかったため、2022年に自主的に AWS へ移し、Docker コンテナで構成しました。",
          details: {
            problem: "物理PCで動かしていたサークルのサーバーは停電や再起動のたびに止まり、管理者が学内にいなければ手を入れられませんでした。",
            decision: "2022年、頼まれたわけではありませんが、サーバーをAWSへ移し、サービスはDockerコンテナで構成しました。",
            result: "停電や再起動のたびにサービスが止まっていた学内PCへの依存をなくし、学外からも管理できるようになりました。",
            role: 'Cloud Architect',
            tech: ['AWS EC2', 'AWS EBS', 'AWS S3', 'AWS RDS', 'Docker'],
            features: [
              "サークルのサーバー全体をAWSへ移行",
              "Dockerによるコンテナ化",
              "学内PCの停電や再起動への依存を解消、学外から管理"
            ]
          },
          links: { demo: null, github: null }
        },
        {
          id: 12,
          title: 'LLM コストのラベリング基盤構築',
          category: 'DevOps & Infra',
          image: null,
          description: "LLM の呼び出しごとにベンダー（Vertex AI、AI Studio、OpenAI）と用途のラベルを付け、用途別に支出を追跡し、しきい値を超えると通知が届くようにしました。",
          how: "AI の利用を広げる前に、どこに費用がかかっているかが見える必要があると判断し、社内 LLM サーバーのコードで呼び出しごとにベンダー（Vertex AI、OpenAI など）と用途のラベルを付けました。",
          details: {
            problem: "社内のLLM利用が増えましたが、どのベンダーのモデルに、どの機能で費用がかかっているのか分かりませんでした。",
            decision: "AIの利用を広げる前に用途別の支出が見えている必要があると判断し、社内LLMサーバーのコードで呼び出しごとにベンダーと用途のラベルを付けました。",
            result: "Vertex AI、AI Studio、OpenAIの支出をベンダー別、用途別に分けて確認でき、しきい値を超えると通知が届きます。",
            learned: "入社初期の課題として進めながら、社内のコード規約と GraphQL のコンベンションを身につけました。",
            role: 'AX / Platform Engineer',
            tech: ['GraphQL', 'Cost Monitoring', 'FinOps'],
            features: [
              "ベンダー別（Vertex AI、AI Studio、OpenAI）のLLMコストラベリング",
              "使用量のモニタリングと上限超過時の通知",
              "ラベル作成ガイドを文書化"
            ]
          },
          links: { demo: null, github: null }
        },
        {
          id: 15,
          title: 'インバウンドリードの SLA の仕組み構築',
          category: 'Platform Engineering',
          image: null,
          description: "リード受付から担当者割り当てまでの平均を 33.6 時間から約 26 分へ短縮しました（98.7% 短縮、改善前後とも営業時間基準）。「応答」を何と見なすかという SLA の定義から始め、営業時間基準の自動計測、通知、放置されたリードを上位職の人に引き継ぐエスカレーションまで作りました。",
          how: "担当者の割り当てだけを数えれば数字は良く見えても、顧客が感じる応答は最初の連絡なので、SLA を割り当て時刻と顧客への初回連絡の二つで測り、改善前後を同じ営業時間基準で比べました。",
          details: {
            problem: "リードの受付から担当者の割り当てまで平均 33.6 時間かかり、1 時間以内に担当者が割り当てられる割合は 9% でした（営業時間基準）。顧客への最初の連絡がいつ行われたのかは指標として残らず、対応の遅れは後から偶然見つかるだけでした。",
            decision: "問題はコードではなく営業組織の業務の流れの中にあったため、設計の前に営業担当者の仕事に付いて回って聞きました。なぜ連絡が遅れたのか、通知を見ても動けなかった理由は何か。今の設計はその対話から出てきました。\n\n最も難しかったのは「応答」の定義でした。システムの視点では担当者が割り当てられた時刻が自然で、営業の視点では顧客に実際に連絡がついた時刻です。割り当てだけを数えれば数字はずっと良く見えますが、二つの指標を両方残し、より不利な「顧客への初回連絡」の基準を捨てないことにしました。その代わり、成果を報告するたびに未達の指標も一緒に持っていくことになります。\n\nSLA は営業時間基準でのみ測りました。金曜の夜の問い合わせを月曜の朝に受けたものまで遅延と数えると、指標が現実とずれるからです。通知は増やさず、担当者が対応できる時間帯に絞り、代わりに放置されたリードは上位職の人に引き継がれるようにしました。",
            result: "受付から担当者割り当てまでの平均は 33.6 時間から約 26 分に縮まり、1 時間以内に担当者が割り当てられる割合は 9% から 86% に上がりました。受付と割り当ての時刻は以前から記録されていた項目なので、前後を同じ項目、同じ基準で計算しています。顧客への初回連絡を基準にした指標は、まだ目標に届いていません。",
            learned: "有利な基準に乗り換えた瞬間、指標は改善の道具ではなく報告用の数字になります。",
            role: 'DevOps / FDE',
            tech: ['Notion', 'Backoffice', 'SLA Metrics', 'アラートing', 'Data Backfill'],
            features: [
              "受付、担当者割り当て、顧客への初回連絡の 3 区間の時刻を同じ基準で自動記録",
              "営業時間基準で SLA を自動計測（週末、祝日、時間外を除外）",
              "対応できる時間帯のみの通知、放置リードのエスカレーション、リアルタイムのモニタリング画面",
              "二重受付の解消、受付時刻がリセットされる不具合の修正、変更履歴の詳細化と過去データのバックフィル"
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
          description: "Notion Custom Agent がリリース文書を受け取り、チーム別のデプロイ基準文書を落としたプロンプトに照らして基準を満たしているかを判定します。リリースに紐付いていないタスクを見つけてつなぎ、リリース記録と業務記録がずれないようにし、DORA スコアレポートもエージェントが発行します。",
          how: "担当者がリリース文書を直接見ていたレビューを、リリース文書を入力に受けてチーム別の基準文書とプロンプトで判定する Notion Custom Agent に移し、リリースに漏れたタスクの紐付けまで任せました。",
          details: {
            problem: "デプロイ品質のレビューは、担当者がリリース文書を直接確認する方式でした。基準が人によって異なるため漏れやずれが生じ、リリースとタスクをつなぐ仕事も手作業でした。",
            decision: "人によるレビューは初めは正確でも、繰り返すうちに形だけになり基準がぶれると考えました。そこで判定を Notion Custom Agent に移し、同じ基準文書とプロンプトで判定させました。一つひとつの判断の正確さが人に劣りうる点は受け入れました。\n\nエージェントはリリース文書を入力として受け取り、チーム別のデプロイ基準文書を落としたプロンプトに照らして基準を満たしているかを判定します。リリースに紐付いていないタスクを見つけてつなぐ仕事もエージェントに任せ、リリース記録と業務記録がずれないようにしました。",
            result: "デプロイ品質のレビュー、リリースに紐付いていないタスクの発見と紐付け、DORA スコアレポートの発行がすべて自動で動いており、レビューエージェントは全社で使われています。",
            role: 'AX Engineer',
            tech: ['Notion Custom Agent', 'プロンプトエンジニアリング', 'Notion API'],
            features: [
              "Notion Custom Agent によるデプロイ品質の自動レビュー",
              "リリースに紐付いていないタスクの自動追跡、紐付け",
              "チーム別の基準文書を落としたプロンプトで判定",
              "DORA スコアレポートの自動発行"
            ]
          },
          links: { demo: null, github: null }
        },
        {
          id: 14,
          title: 'Notion: カレンダー連動の議事録自動生成エージェント',
          category: 'AX 業務自動化',
          image: null,
          description: "カレンダーの予定から、決まった形式の議事録が自動で作られるようにしました。Notion Workers で構成し、現在は全社で使われています。",
          how: "配布だけでは利用者が増えなかったため、カレンダー連動の議事録自動生成とあわせて利用ドキュメントを書き、チームごとに導入を案内しました。",
          details: {
            problem: "議事録を主催者が手作業で作っていたため、作られるタイミングが会議ごとに違い、事前に作られていなければ議論する内容を別の場所に書いておく必要がありました。",
            decision: "カレンダーの予定から、決まった形式の議事録が自動で作られるようにしました。配布するだけでは使う人が増えなかったため、利用ドキュメントを書き、チームごとに導入方法を案内しました。",
            result: "現在は全社で使われています。",
            role: 'AX Engineer',
            tech: ['Notion Workers (サーバーレス)', 'Notion API', 'Calendar API'],
            features: [
              "カレンダーの予定から決まった形式の議事録を自動生成",
              "AWS Lambdaに近いサーバーレス（Notion Workers）構成",
              "利用ドキュメントの作成とチームごとの導入案内、全社展開"
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
