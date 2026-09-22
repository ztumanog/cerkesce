import {
  InMemoryTranslationRepository,
  DEFAULT_MOCK_ENTRIES,
} from "./InMemoryTranslationRepository";

export class MockTranslationRepository {
  private repository: InMemoryTranslationRepository;

  constructor(repository?: InMemoryTranslationRepository) {
    this.repository =
      repository || new InMemoryTranslationRepository(DEFAULT_MOCK_ENTRIES);
  }

  async getByLemma(lemma: string) {
    return this.repository.findByLemma(lemma);
  }

  async getTranslations(query: string) {
    return this.repository.search(query);
  }

  async reverseLookup(meaningQuery: string) {
    return this.repository.searchByMeaning(meaningQuery);
  }

  async getByGroup(groupId: string) {
    return this.repository.findGroupSenses(groupId);
  }
}