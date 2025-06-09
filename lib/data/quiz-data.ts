import type { Quiz } from "@/lib/types"

// 퀴즈 데이터
export const quizzes: Quiz[] = [
  // 노아의 방주 퀴즈 (ID: 1)
  {
    id: "1",
    storyId: "genesis-6",
    title: "노아의 방주 퀴즈",
    description: "노아의 방주 이야기에 대한 퀴즈입니다",
    difficulty: "easy",
    questions: [
      {
        question: "하나님께서 노아에게 방주를 만들라고 한 이유는 무엇인가요?",
        options: [
          "큰 홍수가 올 것이기 때문에",
          "바다 여행을 하기 위해서",
          "물고기를 잡기 위해서",
          "다른 나라로 이동하기 위해서",
        ],
        correctAnswer: 0,
        explanation:
          "하나님께서는 사람들의 죄악이 많아져서 큰 홍수로 세상을 심판하시려고 했어요. 그래서 노아에게 방주를 만들라고 하셨어요.",
      },
      {
        question: "노아의 방주에 비가 내린 기간은 얼마나 되나요?",
        options: ["10일", "20일", "30일", "40일"],
        correctAnswer: 3,
        explanation: "성경에 따르면 비가 40일 동안 내렸어요. 이 기간 동안 세상은 물로 가득 찼어요.",
      },
      {
        question: "하나님께서 홍수 후에 보여주신 약속의 증표는 무엇인가요?",
        options: ["별", "무지개", "달", "구름"],
        correctAnswer: 1,
        explanation: "하나님께서는 다시는 홍수로 세상을 멸망시키지 않겠다는 약속의 증표로 무지개를 보여주셨어요.",
      },
      {
        question: "노아가 방주에서 내보낸 첫 번째 새는 무엇인가요?",
        options: ["비둘기", "독수리", "까마귀", "참새"],
        correctAnswer: 2,
        explanation: "노아는 물이 빠졌는지 확인하기 위해 먼저 까마귀를 내보냈어요. 그 후에 비둘기를 내보냈어요.",
      },
      {
        question: "노아의 방주는 어떤 나무로 만들어졌나요?",
        options: ["잣나무", "백향목", "떡갈나무", "고페르 나무"],
        correctAnswer: 3,
        explanation:
          "성경에 따르면 노아의 방주는 고페르 나무로 만들어졌어요. 이 나무는 방수 기능이 있었을 것으로 추측됩니다.",
      },
    ],
    coverImage: "/placeholder.svg?height=300&width=500",
  },

  // 다윗과 골리앗 퀴즈 (ID: 2)
  {
    id: "2",
    storyId: "samuel1-17",
    title: "다윗과 골리앗 퀴즈",
    description: "다윗과 골리앗 이야기에 대한 퀴즈입니다",
    difficulty: "medium",
    questions: [
      {
        question: "골리앗은 어느 나라 사람이었나요?",
        options: ["이집트", "블레셋", "바벨론", "앗수르"],
        correctAnswer: 1,
        explanation: "골리앗은 블레셋 사람이었어요. 블레셋은 이스라엘의 오랜 적이었습니다.",
      },
      {
        question: "다윗이 골리앗을 물리치기 위해 사용한 무기는 무엇인가요?",
        options: ["칼", "창", "물매와 돌", "활과 화살"],
        correctAnswer: 2,
        explanation:
          "다윗은 물매와 돌 다섯 개를 가지고 골리앗과 싸웠어요. 그 중 한 개의 돌로 골리앗의 이마를 맞췄습니다.",
      },
      {
        question: "다윗은 원래 어떤 일을 하던 사람이었나요?",
        options: ["군인", "농부", "양치기", "목수"],
        correctAnswer: 2,
        explanation: "다윗은 원래 양을 치는 양치기였어요. 그의 형들이 군인이었습니다.",
      },
      {
        question: "골리앗의 키는 얼마나 되었나요?",
        options: ["약 2미터", "약 3미터", "약 4미터", "약 5미터"],
        correctAnswer: 1,
        explanation: "성경에 따르면 골리앗의 키는 여섯 규빗 한 뼘으로, 약 3미터 정도였다고 합니다.",
      },
      {
        question: "다윗이 골리앗을 물리친 후 무엇을 가지고 왔나요?",
        options: ["골리앗의 갑옷", "골리앗의 창", "골리앗의 머리", "골리앗의 방패"],
        correctAnswer: 2,
        explanation: "다윗은 골리앗을 물리친 후 그의 머리를 베어 예루살렘으로 가져왔습니다.",
      },
    ],
    coverImage: "/placeholder.svg?height=300&width=500",
  },

  // 예수님의 탄생 퀴즈 (ID: 3)
  {
    id: "3",
    storyId: "matthew-1",
    title: "예수님의 탄생 퀴즈",
    description: "예수님의 탄생 이야기에 대한 퀴즈입니다",
    difficulty: "medium",
    questions: [
      {
        question: "예수님은 어디에서 태어나셨나요?",
        options: ["예루살렘", "나사렛", "베들레헴", "갈릴리"],
        correctAnswer: 2,
        explanation: "예수님은 베들레헴에서 태어나셨어요. 이것은 구약의 예언이 성취된 것입니다.",
      },
      {
        question: "동방박사들이 예수님께 가져온 선물은 무엇인가요?",
        options: ["금, 은, 동", "황금, 유향, 몰약", "보석, 향수, 옷", "빵, 포도주, 기름"],
        correctAnswer: 1,
        explanation:
          "동방박사들은 황금과 유향과 몰약을 선물로 가져왔어요. 이 선물들은 예수님의 왕되심과 신성, 그리고 고난을 상징합니다.",
      },
      {
        question: "예수님이 태어나셨을 때 천사가 소식을 전한 사람들은 누구인가요?",
        options: ["제사장들", "왕과 귀족들", "목자들", "어부들"],
        correctAnswer: 2,
        explanation: "천사들은 밤에 양을 지키던 목자들에게 예수님의 탄생 소식을 전했어요.",
      },
      {
        question: "예수님의 어머니 이름은 무엇인가요?",
        options: ["마리아", "엘리사벳", "한나", "사라"],
        correctAnswer: 0,
        explanation: "예수님의 어머니는 마리아입니다. 그녀는 성령으로 잉태하여 예수님을 낳았습니다.",
      },
      {
        question: "예수님이 태어나셨을 때 누가 그를 죽이려고 했나요?",
        options: ["빌라도", "헤롯 왕", "가이사", "대제사장"],
        correctAnswer: 1,
        explanation:
          "헤롯 왕은 새로운 왕이 태어났다는 소식을 듣고 두려워하여 베들레헴의 모든 남자 아기를 죽이라고 명령했어요.",
      },
    ],
    coverImage: "/placeholder.svg?height=300&width=500",
  },

  // 아브라함과 이삭 퀴즈 (ID: 4)
  {
    id: "4",
    storyId: "genesis-22",
    title: "아브라함과 이삭 퀴즈",
    description: "아브라함이 이삭을 제물로 바치려 했던 이야기에 대한 퀴즈입니다",
    difficulty: "medium",
    questions: [
      {
        question: "하나님께서 아브라함에게 무엇을 하라고 명령하셨나요?",
        options: [
          "이삭을 제물로 바치라",
          "새 땅으로 이주하라",
          "이삭에게 재산을 물려주라",
          "이삭을 위해 아내를 구하라",
        ],
        correctAnswer: 0,
        explanation:
          "하나님께서는 아브라함에게 그의 사랑하는 아들 이삭을 모리아 산에서 번제로 바치라고 명령하셨습니다.",
      },
      {
        question: "아브라함이 이삭을 제물로 바치려 할 때 하나님은 어떻게 개입하셨나요?",
        options: ["천둥과 번개로", "천사를 보내어 멈추게 하셨다", "이삭을 데려가셨다", "아무 일도 일어나지 않았다"],
        correctAnswer: 1,
        explanation: "하나님께서는 천사를 보내어 아브라함이 이삭에게 손을 대지 못하게 하셨습니다.",
      },
      {
        question: "아브라함이 이삭 대신 제물로 바친 것은 무엇인가요?",
        options: ["양", "소", "수양", "비둘기"],
        correctAnswer: 2,
        explanation: "아브라함은 덤불에 걸린 수양을 발견하고 그것을 이삭 대신 번제로 바쳤습니다.",
      },
      {
        question: "이 이야기에서 아브라함이 그 장소를 무엇이라고 불렀나요?",
        options: ["벧엘", "여호와 이레", "브엘세바", "모리아"],
        correctAnswer: 1,
        explanation: "아브라함은 그 장소를 '여호와 이레'라고 불렀는데, 이는 '여호와께서 준비하신다'는 의미입니다.",
      },
      {
        question: "이 사건 후 하나님께서 아브라함에게 어떤 약속을 하셨나요?",
        options: [
          "더 많은 재산을 주시겠다",
          "하늘의 별과 같이 그의 자손을 번성케 하시겠다",
          "이삭에게 특별한 능력을 주시겠다",
          "아브라함을 왕으로 삼으시겠다",
        ],
        correctAnswer: 1,
        explanation:
          "하나님께서는 아브라함의 순종으로 인해 그의 자손을 하늘의 별과 바닷가의 모래같이 번성케 하시겠다고 약속하셨습니다.",
      },
    ],
    coverImage: "/placeholder.svg?height=300&width=500",
  },

  // 모세와 십계명 퀴즈 (ID: 5)
  {
    id: "5",
    storyId: "exodus-20",
    title: "모세와 십계명 퀴즈",
    description: "하나님께서 모세에게 십계명을 주신 이야기에 대한 퀴즈입니다",
    difficulty: "hard",
    questions: [
      {
        question: "하나님께서 십계명을 주신 산의 이름은 무엇인가요?",
        options: ["시내 산", "감람 산", "갈멜 산", "모리아 산"],
        correctAnswer: 0,
        explanation: "하나님께서는 시내 산에서 모세에게 십계명을 주셨습니다.",
      },
      {
        question: "십계명은 무엇에 기록되었나요?",
        options: ["양피지", "두 돌판", "나무판", "금판"],
        correctAnswer: 1,
        explanation: "십계명은 하나님께서 손가락으로 친히 기록하신 두 돌판에 새겨졌습니다.",
      },
      {
        question: "모세가 산에서 내려왔을 때 이스라엘 백성들이 만들어 숭배하고 있던 것은 무엇인가요?",
        options: ["금송아지", "금뱀", "금독수리", "금양"],
        correctAnswer: 0,
        explanation:
          "모세가 산에서 내려왔을 때, 이스라엘 백성들은 아론의 지도 아래 금송아지를 만들어 숭배하고 있었습니다.",
      },
      {
        question: "모세는 금송아지를 보고 어떤 행동을 했나요?",
        options: ["백성들에게 설교했다", "하나님께 기도했다", "돌판을 깨뜨렸다", "아무 반응도 보이지 않았다"],
        correctAnswer: 2,
        explanation: "모세는 분노하여 손에 들고 있던 두 돌판을 산 아래에서 깨뜨렸습니다.",
      },
      {
        question: "십계명 중 첫 번째 계명은 무엇인가요?",
        options: ["안식일을 기억하여 거룩히 지키라", "살인하지 말라", "나 외에 다른 신을 두지 말라", "부모를 공경하라"],
        correctAnswer: 2,
        explanation: "십계명의 첫 번째 계명은 '나 외에 다른 신을 두지 말라'입니다.",
      },
    ],
    coverImage: "/placeholder.svg?height=300&width=500",
  },

  // 나머지 퀴즈들도 ID를 명확하게 부여하고 필요한 퀴즈만 남깁니다
  // 천지창조 퀴즈 (ID: 6)
  {
    id: "6",
    storyId: "genesis-1",
    title: "천지창조 퀴즈",
    description: "하나님의 창조 이야기에 대한 퀴즈입니다",
    difficulty: "easy",
    questions: [
      {
        question: "하나님께서 첫째 날에 창조하신 것은 무엇인가요?",
        options: ["땅과 바다", "해와 달", "빛", "동물들"],
        correctAnswer: 2,
        explanation: "하나님께서는 첫째 날에 '빛이 있으라'고 말씀하시며 빛을 창조하셨습니다.",
      },
      {
        question: "하나님께서 셋째 날에 창조하신 것은 무엇인가요?",
        options: ["물고기와 새", "해와 달과 별", "땅과 식물", "사람"],
        correctAnswer: 2,
        explanation: "하나님께서는 셋째 날에 땅과 바다를 나누시고, 땅에서 식물이 자라게 하셨습니다.",
      },
      {
        question: "하나님께서 여섯째 날에 창조하신 것은 무엇인가요?",
        options: ["빛", "하늘", "물고기와 새", "땅의 동물들과 사람"],
        correctAnswer: 3,
        explanation: "하나님께서는 여섯째 날에 땅의 동물들과 사람을 창조하셨습니다.",
      },
      {
        question: "하나님께서 사람을 창조하실 때 무엇을 따라 만드셨나요?",
        options: ["천사의 모습", "하나님의 형상", "동물의 모습", "자연의 모습"],
        correctAnswer: 1,
        explanation: "하나님께서는 자신의 형상을 따라 사람을 창조하셨습니다.",
      },
      {
        question: "하나님께서 일곱째 날에 하신 일은 무엇인가요?",
        options: ["더 많은 동물 창조", "사람에게 명령하심", "쉬심", "바다 창조"],
        correctAnswer: 2,
        explanation: "하나님께서는 모든 창조 사역을 마치시고 일곱째 날에 쉬셨습니다.",
      },
    ],
    coverImage: "/placeholder.svg?height=300&width=500",
  },

  // 탕자의 비유 퀴즈 (ID: 7)
  {
    id: "7",
    storyId: "luke-15",
    title: "탕자의 비유 퀴즈",
    description: "탕자의 비유에 대한 퀴즈입니다",
    difficulty: "medium",
    questions: [
      {
        question: "탕자는 아버지에게 무엇을 달라고 했나요?",
        options: ["축복", "재산", "허락", "용서"],
        correctAnswer: 1,
        explanation: "탕자는 아버지에게 자신의 몫의 재산을 미리 달라고 요청했습니다.",
      },
      {
        question: "탕자가 재산을 받은 후 어디로 갔나요?",
        options: ["이웃 마을", "먼 나라", "예루살렘", "이집트"],
        correctAnswer: 1,
        explanation: "탕자는 재산을 받은 후 먼 나라로 가서 그곳에서 방탕한 생활을 했습니다.",
      },
      {
        question: "탕자가 모든 재산을 잃은 후 어떤 일을 하게 되었나요?",
        options: ["양치기", "농부", "돼지 치기", "어부"],
        correctAnswer: 2,
        explanation: "탕자는 모든 재산을 잃고 돼지를 치는 일을 하게 되었습니다.",
      },
      {
        question: "탕자가 아버지께 돌아왔을 때 아버지는 어떻게 반응했나요?",
        options: ["화를 내셨다", "무시하셨다", "달려가 안아주셨다", "종으로 삼으셨다"],
        correctAnswer: 2,
        explanation: "아버지는 멀리서 아들을 보고 달려가 안아주고 입을 맞추었습니다.",
      },
      {
        question: "아버지는 돌아온 아들을 위해 무엇을 베풀었나요?",
        options: ["작은 선물", "새 옷", "큰 잔치", "여행"],
        correctAnswer: 2,
        explanation: "아버지는 살진 송아지를 잡아 큰 잔치를 베풀었습니다.",
      },
    ],
    coverImage: "/placeholder.svg?height=300&width=500",
  },
]

// 퀴즈 ID로 퀴즈 찾기 함수
export function getQuizById(id: string): Quiz | undefined {
  return quizzes.find((quiz) => quiz.id === id)
}

