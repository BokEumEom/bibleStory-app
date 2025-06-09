import type { StoryRepository } from "./core/repositories/StoryRepository"
import type { UserRepository } from "./core/repositories/UserRepository"
import { MockStoryRepository } from "./adapters/repositories/MockStoryRepository"
import { MockUserRepository } from "./adapters/repositories/MockUserRepository" // 이 파일은 이전에 만들지 않았습니다
import { ReadStoryUseCase } from "./core/usecases/ReadStoryUseCase"

// 간단한 DI 컨테이너
class Container {
  private instances: Record<string, any> = {}

  // 싱글톤 스토리 리포지토리
  getStoryRepository(): StoryRepository {
    if (!this.instances.storyRepository) {
      this.instances.storyRepository = new MockStoryRepository()
    }
    return this.instances.storyRepository
  }

  // 싱글톤 유저 리포지토리
  getUserRepository(): UserRepository {
    if (!this.instances.userRepository) {
      this.instances.userRepository = new MockUserRepository()
    }
    return this.instances.userRepository
  }

  // 스토리 읽기 유스케이스
  getReadStoryUseCase(): ReadStoryUseCase {
    return new ReadStoryUseCase(this.getStoryRepository(), this.getUserRepository())
  }
}

// 싱글톤 컨테이너 인스턴스 내보내기
export const container = new Container()

