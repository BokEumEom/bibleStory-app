import type { BibleBook, BibleStory, UserProfile, Badge, ReadingPlan, UserNote, Activity } from "@/lib/types"
import { quizzes } from "./quiz-data"

// 성경책 목록 데이터
export const bibleBooks: BibleBook[] = [
  {
    id: "genesis",
    name: "창세기",
    testament: "old",
    description: "세상의 시작과 인류의 첫 이야기",
    totalChapters: 50,
    coverImage: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "exodus",
    name: "출애굽기",
    testament: "old",
    description: "모세와 이스라엘 백성의 이집트 탈출",
    totalChapters: 40,
    coverImage: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "samuel1",
    name: "사무엘상",
    testament: "old",
    description: "다윗과 골리앗의 이야기",
    totalChapters: 31,
    coverImage: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "matthew",
    name: "마태복음",
    testament: "new",
    description: "예수님의 탄생과 생애",
    totalChapters: 28,
    coverImage: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "luke",
    name: "누가복음",
    testament: "new",
    description: "예수님의 비유와 가르침",
    totalChapters: 24,
    coverImage: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "acts",
    name: "사도행전",
    testament: "new",
    description: "초대교회와 바울의 선교 여행",
    totalChapters: 28,
    coverImage: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "psalms",
    name: "시편",
    testament: "old",
    description: "찬양과 기도의 시",
    totalChapters: 150,
    coverImage: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "proverbs",
    name: "잠언",
    testament: "old",
    description: "지혜의 말씀",
    totalChapters: 31,
    coverImage: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "daniel",
    name: "다니엘",
    testament: "old",
    description: "바벨론 포로 시대의 예언자",
    totalChapters: 12,
    coverImage: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "jonah",
    name: "요나",
    testament: "old",
    description: "니느웨로 가기를 거부한 선지자",
    totalChapters: 4,
    coverImage: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "john",
    name: "요한복음",
    testament: "new",
    description: "예수님의 신성과 사랑",
    totalChapters: 21,
    coverImage: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "revelation",
    name: "요한계시록",
    testament: "new",
    description: "종말과 새 하늘과 새 땅",
    totalChapters: 22,
    coverImage: "/placeholder.svg?height=300&width=300",
  },
]

// 성경 이야기 데이터
export const bibleStories: BibleStory[] = [
  {
    id: "genesis-1",
    bookId: "genesis",
    chapter: 1,
    title: "천지창조",
    summary: "하나님께서 6일 동안 세상을 창조하신 이야기",
    coverImage: "/placeholder.svg?height=400&width=600",
    content: [
      {
        image: "/placeholder.svg?height=400&width=600",
        text: "태초에 하나님이 천지를 창조하셨습니다. 땅이 혼돈하고 어둠이 깊음 위에 있었지만, 하나님께서 '빛이 있으라'고 말씀하시자 빛이 생겼어요.",
      },
      {
        image: "/placeholder.svg?height=400&width=600",
        text: "하나님은 첫째 날에 빛을, 둘째 날에 하늘을, 셋째 날에 땅과 식물을 만드셨어요.",
      },
      {
        image: "/placeholder.svg?height=400&width=600",
        text: "넷째 날에는 해와 달과 별을, 다섯째 날에는 물고기와 새를 만드셨어요.",
      },
      {
        image: "/placeholder.svg?height=400&width=600",
        text: "여섯째 날에는 동물들과 사람을 만드셨어요. 하나님은 모든 것을 보시고 '참 좋다'고 말씀하셨어요.",
      },
    ],
    readingTime: 5,
    tags: ["창조", "시작", "하나님"],
    audioUrl: "/audio/genesis-1.mp3",
    difficulty: "easy",
  },
  {
    id: "genesis-6",
    bookId: "genesis",
    chapter: 6,
    title: "노아의 방주",
    summary: "하나님께서 노아에게 방주를 지으라고 명령하신 이야기",
    coverImage: "/placeholder.svg?height=400&width=600",
    content: [
      {
        image: "/placeholder.svg?height=400&width=600",
        text: "하나님께서 노아에게 말씀하셨어요. '노아야, 사람들이 너무 나쁜 일을 많이 해서 세상에 큰 홍수를 보낼 거야. 너는 큰 배를 만들어서 가족과 동물들을 구해야 해.'",
      },
      {
        image: "/placeholder.svg?height=400&width=600",
        text: "노아는 하나님의 말씀대로 큰 배를 만들었어요. 사람들은 노아를 비웃었지만, 노아는 하나님을 믿고 방주를 완성했어요.",
      },
      {
        image: "/placeholder.svg?height=400&width=600",
        text: "드디어 비가 내리기 시작했어요. 40일 동안 비가 내려 세상은 물로 가득 찼어요. 노아의 가족과 방주에 탄 동물들만 안전했어요.",
      },
      {
        image: "/placeholder.svg?height=400&width=600",
        text: "오랜 시간이 지나고 물이 빠지자, 노아는 방주에서 나왔어요. 하나님은 다시는 홍수로 세상을 멸망시키지 않겠다고 약속하셨고, 그 증거로 무지개를 보여주셨어요.",
      },
    ],
    readingTime: 6,
    tags: ["노아", "방주", "홍수", "무지개"],
    audioUrl: "/audio/genesis-6.mp3",
    difficulty: "easy",
  },
  {
    id: "samuel1-17",
    bookId: "samuel1",
    chapter: 17,
    title: "다윗과 골리앗",
    summary: "어린 다윗이 거인 골리앗을 물리친 이야기",
    coverImage: "/placeholder.svg?height=400&width=600",
    content: [
      {
        image: "/placeholder.svg?height=400&width=600",
        text: "블레셋 사람들과 이스라엘 사람들이 전쟁을 하게 되었어요. 블레셋에는 골리앗이라는 아주 큰 거인이 있었어요.",
      },
      {
        image: "/placeholder.svg?height=400&width=600",
        text: "골리앗은 매일 이스라엘 군대를 향해 '너희 중에 나와 싸울 사람을 보내라'고 외쳤어요. 하지만 모두 골리앗을 두려워했어요.",
      },
      {
        image: "/placeholder.svg?height=400&width=600",
        text: "어린 양치기 소년 다윗은 하나님을 믿고 골리앗과 싸우기로 했어요. 다윗은 갑옷 대신 물매와 돌 다섯 개만 가지고 나갔어요.",
      },
      {
        image: "/placeholder.svg?height=400&width=600",
        text: "다윗은 물매로 돌을 날려 골리앗의 이마를 맞췄어요. 거인 골리앗은 쓰러졌고, 다윗은 승리했어요. 다윗은 하나님의 도움으로 불가능해 보이는 일을 해냈어요.",
      },
    ],
    readingTime: 5,
    tags: ["다윗", "골리앗", "용기", "믿음"],
    audioUrl: "/audio/samuel1-17.mp3",
    difficulty: "medium",
  },
  {
    id: "matthew-1",
    bookId: "matthew",
    chapter: 1,
    title: "예수님의 탄생",
    summary: "예수님이 베들레헴에서 태어나신 이야기",
    coverImage: "/placeholder.svg?height=400&width=600",
    content: [
      {
        image: "/placeholder.svg?height=400&width=600",
        text: "마리아는 천사 가브리엘로부터 하나님의 아들을 낳게 될 것이라는 소식을 들었어요.",
      },
      {
        image: "/placeholder.svg?height=400&width=600",
        text: "마리아와 요셉은 베들레헴으로 가야 했어요. 그곳에서 예수님이 태어나셨어요. 여관에 방이 없어서 예수님은 구유에 누이셨어요.",
      },
      {
        image: "/placeholder.svg?height=400&width=600",
        text: "밤에 양을 지키던 목자들에게 천사가 나타나 구주가 태어났다고 알려주었어요. 목자들은 서둘러 아기 예수님을 찾아갔어요.",
      },
      {
        image: "/placeholder.svg?height=400&width=600",
        text: "동방에서 온 박사들도 별을 따라 예수님을 찾아와 황금과 유향과 몰약을 선물로 드렸어요.",
      },
    ],
    readingTime: 5,
    tags: ["예수", "탄생", "베들레헴", "크리스마스"],
    audioUrl: "/audio/matthew-1.mp3",
    difficulty: "easy",
  },
  {
    id: "luke-15",
    bookId: "luke",
    chapter: 15,
    title: "탕자의 비유",
    summary: "아버지를 떠났다가 돌아온 아들의 이야기",
    coverImage: "/placeholder.svg?height=400&width=600",
    content: [
      {
        image: "/placeholder.svg?height=400&width=600",
        text: "어떤 아버지에게 두 아들이 있었어요. 작은 아들이 아버지에게 재산을 미리 달라고 했어요. 그리고 먼 나라로 떠났어요.",
      },
      {
        image: "/placeholder.svg?height=400&width=600",
        text: "작은 아들은 모든 재산을 허비하고 가난하게 되었어요. 돼지 먹이를 먹고 싶을 정도로 배가 고팠어요.",
      },
      {
        image: "/placeholder.svg?height=400&width=600",
        text: "그는 아버지께 돌아가기로 결심했어요. '아버지, 제가 하늘과 아버지께 죄를 지었습니다'라고 말하려고 했어요.",
      },
      {
        image: "/placeholder.svg?height=400&width=600",
        text: "아버지는 멀리서 아들을 보고 달려가 안아주셨어요. 아들이 돌아온 것을 기뻐하며 큰 잔치를 열어주셨어요. 하나님도 우리가 돌아오기를 기다리고 계세요.",
      },
    ],
    readingTime: 5,
    tags: ["비유", "용서", "회개", "사랑"],
    audioUrl: "/audio/luke-15.mp3",
    difficulty: "medium",
  },
  {
    id: "daniel-3",
    bookId: "daniel",
    chapter: 3,
    title: "불 속의 세 친구",
    summary: "사드락, 메삭, 아벳느고가 풀무불에서 구원받은 이야기",
    coverImage: "/placeholder.svg?height=400&width=600",
    content: [
      {
        image: "/placeholder.svg?height=400&width=600",
        text: "바벨론 왕 느부갓네살은 금으로 된 큰 신상을 만들고 모든 사람이 절하도록 명령했어요. 절하지 않는 사람은 불타는 풀무불에 던져질 거라고 했어요.",
      },
      {
        image: "/placeholder.svg?height=400&width=600",
        text: "다니엘의 세 친구 사드락, 메삭, 아벳느고는 하나님만 섬기기로 결심했어요. 그들은 왕의 명령에 따르지 않고 신상에 절하지 않았어요.",
      },
      {
        image: "/placeholder.svg?height=400&width=600",
        text: "화가 난 왕은 풀무불을 평소보다 일곱 배나 뜨겁게 하고 세 친구를 던지라고 명령했어요. 불이 너무 뜨거워서 세 친구를 던진 병사들이 죽었어요.",
      },
      {
        image: "/placeholder.svg?height=400&width=600",
        text: "그런데 놀랍게도 왕은 불 속에서 네 사람이 걸어다니는 것을 보았어요. 하나님이 천사를 보내 세 친구를 보호하셨어요. 그들은 불에 데지 않고 살아 나왔어요.",
      },
    ],
    readingTime: 6,
    tags: ["믿음", "용기", "구원", "기적"],
    audioUrl: "/audio/daniel-3.mp3",
    difficulty: "medium",
  },
  {
    id: "jonah-1",
    bookId: "jonah",
    chapter: 1,
    title: "요나와 큰 물고기",
    summary: "하나님의 명령을 피해 도망가다 물고기 뱃속에 들어간 요나",
    coverImage: "/placeholder.svg?height=400&width=600",
    content: [
      {
        image: "/placeholder.svg?height=400&width=600",
        text: "하나님께서 요나에게 니느웨 성으로 가서 회개하라고 전하라고 말씀하셨어요. 하지만 요나는 니느웨 사람들을 싫어해서 반대 방향인 다시스로 가는 배를 탔어요.",
      },
      {
        image: "/placeholder.svg?height=400&width=600",
        text: "바다에 큰 폭풍이 일어났어요. 선원들은 누구 때문에 이런 일이 생겼는지 제비를 뽑았고, 요나가 뽑혔어요. 요나는 자신이 하나님을 피해 도망치고 있다고 고백했어요.",
      },
      {
        image: "/placeholder.svg?height=400&width=600",
        text: "요나는 자신을 바다에 던지라고 말했어요. 선원들이 요나를 바다에 던지자 폭풍이 멈췄어요. 하나님은 큰 물고기를 보내 요나를 삼키게 하셨어요.",
      },
      {
        image: "/placeholder.svg?height=400&width=600",
        text: "요나는 물고기 뱃속에서 3일 동안 기도했어요. 하나님은 물고기에게 명령하여 요나를 육지에 토해내게 하셨어요. 이제 요나는 하나님의 말씀에 순종할 준비가 되었어요.",
      },
    ],
    readingTime: 5,
    tags: ["요나", "순종", "회개", "물고기"],
    audioUrl: "/audio/jonah-1.mp3",
    difficulty: "easy",
  },
  {
    id: "john-11",
    bookId: "john",
    chapter: 11,
    title: "나사로의 부활",
    summary: "예수님이 죽은 나사로를 살리신 이야기",
    coverImage: "/placeholder.svg?height=400&width=600",
    content: [
      {
        image: "/placeholder.svg?height=400&width=600",
        text: "마리아와 마르다는 그들의 오빠 나사로가 병들었다고 예수님께 소식을 전했어요. 예수님은 나사로를 사랑하셨지만, 이틀을 더 머무르셨어요.",
      },
      {
        image: "/placeholder.svg?height=400&width=600",
        text: "예수님이 도착했을 때 나사로는 이미 죽어 무덤에 있은 지 나흘이 되었어요. 마르다는 '주님, 여기 계셨더라면 제 오빠가 죽지 않았을 것입니다'라고 말했어요.",
      },
      {
        image: "/placeholder.svg?height=400&width=600",
        text: "예수님은 '나는 부활이요 생명이니 나를 믿는 자는 죽어도 살겠고 살아서 나를 믿는 자는 영원히 죽지 아니하리라'고 말씀하셨어요. 그리고 나사로의 무덤으로 가셨어요.",
      },
      {
        image: "/placeholder.svg?height=400&width=600",
        text: "예수님은 무덤 앞에서 큰 소리로 '나사로야, 나오너라!'고 외치셨어요. 놀랍게도 죽은 나사로가 수의를 입은 채로 무덤에서 걸어 나왔어요. 많은 사람들이 이 기적을 보고 예수님을 믿게 되었어요.",
      },
    ],
    readingTime: 7,
    tags: ["예수", "기적", "부활", "믿음"],
    audioUrl: "/audio/john-11.mp3",
    difficulty: "medium",
  },
  {
    id: "revelation-21",
    bookId: "revelation",
    chapter: 21,
    title: "새 하늘과 새 땅",
    summary: "하나님께서 준비하신 새 예루살렘의 모습",
    coverImage: "/placeholder.svg?height=400&width=600",
    content: [
      {
        image: "/placeholder.svg?height=400&width=600",
        text: "요한은 환상 중에 새 하늘과 새 땅을 보았어요. 첫 하늘과 첫 땅은 사라지고, 바다도 없어졌어요.",
      },
      {
        image: "/placeholder.svg?height=400&width=600",
        text: "하나님께서 사람들과 함께 계시며, 모든 눈물을 닦아주실 거예요. 더 이상 죽음이나 슬픔이나 아픔이 없을 거예요.",
      },
      {
        image: "/placeholder.svg?height=400&width=600",
        text: "새 예루살렘 성은 하나님께로부터 하늘에서 내려왔어요. 그 성은 맑은 수정 같은 벽옥으로 빛나고, 열두 문에는 열두 진주가 있었어요.",
      },
      {
        image: "/placeholder.svg?height=400&width=600",
        text: "그 성에는 성전이 없었어요. 주 하나님과 어린 양이 그 성전이기 때문이에요. 그 성은 하나님의 영광으로 빛나고, 어린 양이 그 등불이에요. 하나님과 함께하는 영원한 삶이 시작될 거예요.",
      },
    ],
    readingTime: 6,
    tags: ["종말", "천국", "새 예루살렘", "영원"],
    audioUrl: "/audio/revelation-21.mp3",
    difficulty: "hard",
  },
  {
    id: "exodus-14",
    bookId: "exodus",
    chapter: 14,
    title: "홍해의 기적",
    summary: "하나님께서 홍해를 가르고 이스라엘 백성을 구원하신 이야기",
    coverImage: "/placeholder.svg?height=400&width=600",
    content: [
      {
        image: "/placeholder.svg?height=400&width=600",
        text: "이스라엘 백성이 이집트를 떠나 광야로 가고 있을 때, 바로 왕은 마음이 변해 군대를 보내 그들을 쫓았어요.",
      },
      {
        image: "/placeholder.svg?height=400&width=600",
        text: "이스라엘 백성은 앞에는 홍해, 뒤에는 이집트 군대가 있어 두려워했어요. 모세는 '두려워하지 말고 가만히 서서 하나님의 구원을 보라'고 말했어요.",
      },
      {
        image: "/placeholder.svg?height=400&width=600",
        text: "하나님은 모세에게 지팡이를 들고 손을 바다 위로 내밀라고 하셨어요. 모세가 그렇게 하자 강한 동풍이 불어 바다가 갈라졌어요. 이스라엘 백성은 마른 땅을 밟고 바다를 건넜어요.",
      },
      {
        image: "/placeholder.svg?height=400&width=600",
        text: "이집트 군대도 뒤따라 바다로 들어왔어요. 하지만 하나님께서 모세에게 다시 손을 내밀라고 하셨고, 바다가 원래대로 돌아와 이집트 군대를 덮쳤어요. 이스라엘 백성은 하나님의 놀라운 능력을 보고 찬양했어요.",
      },
    ],
    readingTime: 6,
    tags: ["모세", "출애굽", "기적", "구원"],
    audioUrl: "/audio/exodus-14.mp3",
    difficulty: "medium",
  },
]

// 사용자 프로필 데이터
export const userProfile: UserProfile = {
  id: "user1",
  name: "김민지",
  avatar: "/placeholder.svg?height=100&width=100",
  joinDate: "2023-05-10",
  readStories: ["genesis-1", "genesis-6", "samuel1-17", "matthew-1", "luke-15", "daniel-3"],
  readingStreak: 7,
  lastReadDate: "2024-03-24",
  badges: [
    {
      id: "badge1",
      name: "첫 이야기",
      description: "첫 번째 성경 이야기를 읽었어요",
      icon: "BookOpen",
      earnedDate: "2023-05-10",
    },
    {
      id: "badge2",
      name: "퀴즈 마스터",
      description: "5개의 퀴즈에서 모두 정답을 맞혔어요",
      icon: "CheckCircle",
      earnedDate: "2023-06-15",
    },
    {
      id: "badge3",
      name: "7일 연속",
      description: "7일 연속으로 성경을 읽었어요",
      icon: "Award",
      earnedDate: "2023-07-01",
    },
    {
      id: "badge4",
      name: "구약 탐험가",
      description: "10개의 구약 이야기를 읽었어요",
      icon: "Map",
      earnedDate: "2023-08-20",
    },
    {
      id: "badge5",
      name: "신약 탐험가",
      description: "10개의 신약 이야기를 읽었어요",
      icon: "Compass",
      earnedDate: "2023-09-15",
    },
    {
      id: "badge6",
      name: "노트 작성자",
      description: "10개의 노트를 작성했어요",
      icon: "Edit",
      earnedDate: "2023-10-05",
    },
    {
      id: "badge7",
      name: "성경 학자",
      description: "모든 퀴즈에서 90% 이상 정답률을 기록했어요",
      icon: "GraduationCap",
      earnedDate: "2023-11-20",
    },
    {
      id: "badge8",
      name: "30일 연속",
      description: "30일 연속으로 성경을 읽었어요",
      icon: "Calendar",
      earnedDate: "2023-12-15",
    },
  ],
  readingPlan: {
    id: "plan1",
    name: "30일 성경 여행",
    description: "30일 동안 주요 성경 이야기를 읽어보세요",
    duration: 30,
    startDate: "2024-03-01",
    endDate: "2024-03-31",
    stories: ["genesis-1", "genesis-6", "samuel1-17", "matthew-1", "luke-15", "daniel-3", "jonah-1", "john-11"],
    progress: 80,
  },
  quizScores: [
    {
      quizId: "quiz1",
      score: 5,
      totalQuestions: 5,
      completedDate: "2023-06-15",
    },
    {
      quizId: "quiz2",
      score: 4,
      totalQuestions: 5,
      completedDate: "2023-07-20",
    },
    {
      quizId: "quiz3",
      score: 5,
      totalQuestions: 5,
      completedDate: "2023-08-10",
    },
    {
      quizId: "quiz4",
      score: 4,
      totalQuestions: 5,
      completedDate: "2023-09-05",
    },
    {
      quizId: "quiz5",
      score: 5,
      totalQuestions: 5,
      completedDate: "2023-10-15",
    },
  ],
  favoriteStories: ["genesis-6", "samuel1-17", "daniel-3", "john-11"],
  readingHistory: [
    {
      storyId: "genesis-1",
      date: "2024-03-18",
      completionPercentage: 100,
    },
    {
      storyId: "genesis-6",
      date: "2024-03-19",
      completionPercentage: 100,
    },
    {
      storyId: "samuel1-17",
      date: "2024-03-20",
      completionPercentage: 100,
    },
    {
      storyId: "matthew-1",
      date: "2024-03-21",
      completionPercentage: 100,
    },
    {
      storyId: "luke-15",
      date: "2024-03-22",
      completionPercentage: 100,
    },
    {
      storyId: "daniel-3",
      date: "2024-03-24",
      completionPercentage: 100,
    },
  ],
  settings: {
    notifications: true,
    darkMode: false,
    fontSize: "medium",
    autoPlayAudio: false,
    pageTransition: "slide",
    readingBackground: "amber-50",
  },
  highlights: [
    {
      id: "highlight1",
      storyId: "genesis-6",
      text: "노아는 하나님의 말씀대로 큰 배를 만들었어요",
      color: "yellow",
      createdAt: "2024-03-19",
    },
    {
      id: "highlight2",
      storyId: "samuel1-17",
      text: "다윗은 하나님의 도움으로 불가능해 보이는 일을 해냈어요",
      color: "green",
      createdAt: "2024-03-20",
    },
    {
      id: "highlight3",
      storyId: "daniel-3",
      text: "하나님이 천사를 보내 세 친구를 보호하셨어요",
      color: "blue",
      createdAt: "2024-03-24",
    },
  ],
}

// 배지 데이터
export const badges: Badge[] = [
  {
    id: "badge1",
    name: "첫 이야기",
    description: "첫 번째 성경 이야기를 읽었어요",
    icon: "BookOpen",
    earnedDate: "2023-05-10",
  },
  {
    id: "badge2",
    name: "퀴즈 마스터",
    description: "5개의 퀴즈에서 모두 정답을 맞혔어요",
    icon: "CheckCircle",
    earnedDate: "2023-06-15",
  },
  {
    id: "badge3",
    name: "7일 연속",
    description: "7일 연속으로 성경을 읽었어요",
    icon: "Award",
    earnedDate: "2023-07-01",
  },
  {
    id: "badge4",
    name: "구약 탐험가",
    description: "10개의 구약 이야기를 읽었어요",
    icon: "Map",
    earnedDate: "2023-08-20",
  },
  {
    id: "badge5",
    name: "신약 탐험가",
    description: "10개의 신약 이야기를 읽었어요",
    icon: "Compass",
    earnedDate: "2023-09-15",
  },
  {
    id: "badge6",
    name: "노트 작성자",
    description: "10개의 노트를 작성했어요",
    icon: "Edit",
    earnedDate: "2023-10-05",
  },
  {
    id: "badge7",
    name: "성경 학자",
    description: "모든 퀴즈에서 90% 이상 정답률을 기록했어요",
    icon: "GraduationCap",
    earnedDate: "2023-11-20",
  },
  {
    id: "badge8",
    name: "30일 연속",
    description: "30일 연속으로 성경을 읽었어요",
    icon: "Calendar",
    earnedDate: "2023-12-15",
  },
]

// 읽기 계획 데이터
export const readingPlans: ReadingPlan[] = [
  {
    id: "plan1",
    name: "30일 성경 여행",
    description: "30일 동안 주요 성경 이야기를 읽어보세요",
    duration: 30,
    startDate: "2024-03-01",
    endDate: "2024-03-31",
    stories: ["genesis-1", "genesis-6", "samuel1-17", "matthew-1", "luke-15", "daniel-3", "jonah-1", "john-11"],
    progress: 80,
  },
  {
    id: "plan2",
    name: "구약 하이라이트",
    description: "구약의 주요 이야기를 15일 동안 읽어보세요",
    duration: 15,
    startDate: "2024-04-01",
    endDate: "2024-04-15",
    stories: ["genesis-1", "genesis-6", "samuel1-17", "daniel-3", "jonah-1", "exodus-14"],
    progress: 0,
  },
  {
    id: "plan3",
    name: "신약 하이라이트",
    description: "신약의 주요 이야기를 15일 동안 읽어보세요",
    duration: 15,
    startDate: "2024-04-16",
    endDate: "2024-04-30",
    stories: ["matthew-1", "luke-15", "john-11", "revelation-21"],
    progress: 0,
  },
  {
    id: "plan4",
    name: "믿음의 영웅들",
    description: "성경에 나오는 믿음의 영웅들의 이야기를 읽어보세요",
    duration: 10,
    startDate: "2024-05-01",
    endDate: "2024-05-10",
    stories: ["genesis-6", "samuel1-17", "daniel-3", "jonah-1"],
    progress: 0,
  },
  {
    id: "plan5",
    name: "예수님의 생애",
    description: "예수님의 탄생부터 부활까지의 이야기를 읽어보세요",
    duration: 7,
    startDate: "2024-05-15",
    endDate: "2024-05-22",
    stories: ["matthew-1", "john-11"],
    progress: 0,
  },
]

// 사용자 노트 데이터
export const userNotes: UserNote[] = [
  {
    id: "note1",
    userId: "user1",
    storyId: "genesis-1",
    content:
      "천지창조 이야기는 하나님의 능력과 질서를 보여줍니다. 모든 것이 하나님의 말씀으로 창조되었다는 것이 놀랍습니다.",
    createdAt: "2024-03-18",
    updatedAt: "2024-03-18",
  },
  {
    id: "note2",
    userId: "user1",
    storyId: "genesis-6",
    content: "노아의 방주 이야기는 하나님의 심판과 구원을 동시에 보여줍니다. 노아의 믿음이 인상적입니다.",
    createdAt: "2024-03-19",
    updatedAt: "2024-03-19",
  },
  {
    id: "note3",
    userId: "user1",
    storyId: "samuel1-17",
    content:
      "다윗과 골리앗 이야기는 하나님을 의지하면 불가능해 보이는 일도 가능하다는 것을 보여줍니다. 다윗의 용기와 믿음이 인상적입니다.",
    createdAt: "2024-03-20",
    updatedAt: "2024-03-20",
  },
  {
    id: "note4",
    userId: "user1",
    storyId: "daniel-3",
    content:
      "불 속의 세 친구 이야기는 어떤 상황에서도 하나님께 신실하게 남아야 한다는 것을 가르쳐줍니다. 그들의 믿음과 용기가 정말 대단합니다.",
    createdAt: "2024-03-24",
    updatedAt: "2024-03-24",
  },
]

// 활동 데이터
export const activities: Activity[] = [
  {
    id: "activity1",
    userId: "user1",
    type: "read",
    date: "2024-03-18",
    details: {
      storyId: "genesis-1",
    },
  },
  {
    id: "activity2",
    userId: "user1",
    type: "read",
    date: "2024-03-19",
    details: {
      storyId: "genesis-6",
    },
  },
  {
    id: "activity3",
    userId: "user1",
    type: "quiz",
    date: "2024-03-19",
    details: {
      quizId: "quiz1",
      score: 5,
    },
  },
  {
    id: "activity4",
    userId: "user1",
    type: "read",
    date: "2024-03-20",
    details: {
      storyId: "samuel1-17",
    },
  },
  {
    id: "activity5",
    userId: "user1",
    type: "badge",
    date: "2024-03-20",
    details: {
      badgeId: "badge3",
    },
  },
  {
    id: "activity6",
    userId: "user1",
    type: "streak",
    date: "2024-03-24",
    details: {
      streakDays: 7,
    },
  },
  {
    id: "activity7",
    userId: "user1",
    type: "read",
    date: "2024-03-21",
    details: {
      storyId: "matthew-1",
    },
  },
  {
    id: "activity8",
    userId: "user1",
    type: "read",
    date: "2024-03-22",
    details: {
      storyId: "luke-15",
    },
  },
  {
    id: "activity9",
    userId: "user1",
    type: "read",
    date: "2024-03-24",
    details: {
      storyId: "daniel-3",
    },
  },
]

// 퀴즈 데이터는 quiz-data.ts에서 export 하므로 여기서는 재export
export { quizzes }

