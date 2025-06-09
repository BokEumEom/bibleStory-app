import { getFeaturedStory, getRecentlyReadStories, getStoryById } from "@/services/story-service"

// 모킹
jest.mock("@/data/mock-data", () => ({
  bibleStories: [
    {
      id: "test-story-1",
      bookId: "test-book",
      chapter: 1,
      title: "Test Story 1",
      summary: "Test summary 1",
      coverImage: "/test-image-1.jpg",
      content: [],
      readingTime: 5,
      tags: ["test"],
    },
    {
      id: "test-story-2",
      bookId: "test-book",
      chapter: 2,
      title: "Test Story 2",
      summary: "Test summary 2",
      coverImage: "/test-image-2.jpg",
      content: [],
      readingTime: 10,
      tags: ["test"],
    },
  ],
}))

describe("Story Service", () => {
  describe("getFeaturedStory", () => {
    it("returns a featured story", () => {
      const story = getFeaturedStory()
      expect(story).toBeDefined()
      expect(story.id).toBe("test-story-2")
    })
  })

  describe("getRecentlyReadStories", () => {
    it("returns the specified number of stories", () => {
      const stories = getRecentlyReadStories(1)
      expect(stories).toHaveLength(1)
      expect(stories[0].id).toBe("test-story-1")
    })

    it("returns all stories if limit is greater than available stories", () => {
      const stories = getRecentlyReadStories(5)
      expect(stories).toHaveLength(2)
    })
  })

  describe("getStoryById", () => {
    it("returns the story with the specified id", () => {
      const story = getStoryById("test-story-1")
      expect(story.id).toBe("test-story-1")
      expect(story.title).toBe("Test Story 1")
    })

    it("throws an error if the story is not found", () => {
      expect(() => getStoryById("non-existent-id")).toThrow()
    })
  })
})

