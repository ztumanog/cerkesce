import { IConceptGraphRepository, ConceptNeighbor } from '../domain/discovery/services/IConceptGraphRepository';
import { DiscoveryRelationType } from '../domain/discovery/types/DiscoveryRelationType';
import { CONCEPT_REGISTRY } from '../domain/concept/ConceptRegistry';

export class InMemoryConceptGraphRepository implements IConceptGraphRepository {
  private graph: Map<string, ConceptNeighbor[]> = new Map();

  static readonly WATER_ID = CONCEPT_REGISTRY.WATER;
  static readonly ICE_ID = CONCEPT_REGISTRY.ICE;
  static readonly RIVER_ID = CONCEPT_REGISTRY.RIVER;
  static readonly TREE_ID = CONCEPT_REGISTRY.TREE;
  static readonly HORSE_ID = CONCEPT_REGISTRY.HORSE;
  static readonly HEAD_ID = CONCEPT_REGISTRY.HEAD;
  static readonly TOP_ID = CONCEPT_REGISTRY.TOP;
  static readonly SURFACE_ID = CONCEPT_REGISTRY.SURFACE;
  static readonly WINDOW_ID = CONCEPT_REGISTRY.WINDOW;
  static readonly FREEDOM_ID = CONCEPT_REGISTRY.FREEDOM;
  static readonly REASON_ID = CONCEPT_REGISTRY.REASON;
  static readonly HAIR_ID = CONCEPT_REGISTRY.HAIR;
  static readonly MOVEMENT_ID = CONCEPT_REGISTRY.MOVEMENT;
  static readonly SLEEP_ID = CONCEPT_REGISTRY.SLEEP;
  static readonly HEART_ID = CONCEPT_REGISTRY.HEART;
  static readonly LANGUAGE_ID = CONCEPT_REGISTRY.LANGUAGE;
  static readonly TRAIN_ID = CONCEPT_REGISTRY.TRAIN;
  static readonly JOY_ID = CONCEPT_REGISTRY.JOY;
  static readonly INTELLIGENCE_ID = CONCEPT_REGISTRY.INTELLIGENCE;
  static readonly LOYALTY_ID = CONCEPT_REGISTRY.LOYALTY;
  static readonly ANGER_ID = CONCEPT_REGISTRY.ANGER;
  static readonly HOPE_ID = CONCEPT_REGISTRY.HOPE;
  static readonly EYE_ID = CONCEPT_REGISTRY.EYE;
  static readonly FALSEHOOD_ID = CONCEPT_REGISTRY.FALSEHOOD;
  static readonly BLINDNESS_ID = CONCEPT_REGISTRY.BLINDNESS;
  static readonly GOODNESS_ID = CONCEPT_REGISTRY.GOODNESS;
  static readonly FACE_ID = CONCEPT_REGISTRY.FACE;
  static readonly HAND_ID = CONCEPT_REGISTRY.HAND;
  static readonly FINGER_ID = CONCEPT_REGISTRY.FINGER;
  static readonly PALM_ID = CONCEPT_REGISTRY.PALM;
  static readonly MANUSCRIPT_ID = CONCEPT_REGISTRY.MANUSCRIPT;
  static readonly FOOT_ID = CONCEPT_REGISTRY.FOOT;
  static readonly SHOE_ID = CONCEPT_REGISTRY.SHOE;
  static readonly TONGUE_ID = CONCEPT_REGISTRY.TONGUE;
  static readonly SPEECH_ID = CONCEPT_REGISTRY.SPEECH;
  static readonly GRAMMAR_ID = CONCEPT_REGISTRY.GRAMMAR;
  static readonly SOUL_ID = CONCEPT_REGISTRY.SOUL;
  static readonly LIFE_ID = CONCEPT_REGISTRY.LIFE;
  static readonly LOVE_ID = CONCEPT_REGISTRY.LOVE;
  static readonly PEACE_ID = CONCEPT_REGISTRY.PEACE;
  static readonly NOSE_ID = CONCEPT_REGISTRY.NOSE;
  static readonly BEGINNING_ID = CONCEPT_REGISTRY.BEGINNING;
  static readonly ROOM_ID = CONCEPT_REGISTRY.ROOM;
  static readonly LEADER_ID = CONCEPT_REGISTRY.LEADER;
  static readonly TOOTH_ID = CONCEPT_REGISTRY.TOOTH;
  static readonly JAW_ID = CONCEPT_REGISTRY.JAW;
  static readonly ARMY_ID = CONCEPT_REGISTRY.ARMY;
  static readonly CHEST_ID = CONCEPT_REGISTRY.CHEST;
  static readonly EAGLE_ID = CONCEPT_REGISTRY.EAGLE;
  static readonly WALNUT_ID = CONCEPT_REGISTRY.WALNUT;
  static readonly KNIFE_ID = CONCEPT_REGISTRY.KNIFE;
  static readonly BEE_ID = CONCEPT_REGISTRY.BEE;
  static readonly HONEY_ID = CONCEPT_REGISTRY.HONEY;
  static readonly SUGAR_ID = CONCEPT_REGISTRY.SUGAR;
  static readonly EARTH_ID = CONCEPT_REGISTRY.EARTH;
  static readonly LIGHT_ID = CONCEPT_REGISTRY.LIGHT;

  constructor() {
    this.seed();
  }

  private seed(): void {
    const R = DiscoveryRelationType;

    // === WATER AİLESİ ===
    this.graph.set(InMemoryConceptGraphRepository.WATER_ID, [
      { targetConceptId: InMemoryConceptGraphRepository.ICE_ID, relationType: R.STATE_OF },
      { targetConceptId: InMemoryConceptGraphRepository.RIVER_ID, relationType: R.LOCATION_OF },
      { targetConceptId: InMemoryConceptGraphRepository.LIFE_ID, relationType: R.RELATED },
    ]);
    this.graph.set(InMemoryConceptGraphRepository.ICE_ID, [
      { targetConceptId: InMemoryConceptGraphRepository.WATER_ID, relationType: R.STATE_OF },
    ]);
    this.graph.set(InMemoryConceptGraphRepository.RIVER_ID, [
      { targetConceptId: InMemoryConceptGraphRepository.WATER_ID, relationType: R.LOCATION_OF },
    ]);

    // === HEAD AİLESİ ===
    this.graph.set(InMemoryConceptGraphRepository.HEAD_ID, [
      { targetConceptId: InMemoryConceptGraphRepository.TOP_ID, relationType: R.RELATED },
      { targetConceptId: InMemoryConceptGraphRepository.SURFACE_ID, relationType: R.RELATED },
      { targetConceptId: InMemoryConceptGraphRepository.HAIR_ID, relationType: R.RELATED },
      { targetConceptId: InMemoryConceptGraphRepository.WINDOW_ID, relationType: R.RELATED },
      { targetConceptId: InMemoryConceptGraphRepository.REASON_ID, relationType: R.RELATED },
      { targetConceptId: InMemoryConceptGraphRepository.FREEDOM_ID, relationType: R.RELATED },
      { targetConceptId: InMemoryConceptGraphRepository.MOVEMENT_ID, relationType: R.RELATED },
      { targetConceptId: InMemoryConceptGraphRepository.SLEEP_ID, relationType: R.RELATED },
    ]);
    this.graph.set(InMemoryConceptGraphRepository.HAIR_ID, [
      { targetConceptId: InMemoryConceptGraphRepository.HEAD_ID, relationType: R.RELATED },
    ]);
    this.graph.set(InMemoryConceptGraphRepository.TOP_ID, [
      { targetConceptId: InMemoryConceptGraphRepository.HEAD_ID, relationType: R.RELATED },
      { targetConceptId: InMemoryConceptGraphRepository.SURFACE_ID, relationType: R.RELATED },
    ]);
    this.graph.set(InMemoryConceptGraphRepository.SURFACE_ID, [
      { targetConceptId: InMemoryConceptGraphRepository.HEAD_ID, relationType: R.RELATED },
      { targetConceptId: InMemoryConceptGraphRepository.TOP_ID, relationType: R.RELATED },
    ]);
    this.graph.set(InMemoryConceptGraphRepository.WINDOW_ID, [
      { targetConceptId: InMemoryConceptGraphRepository.HEAD_ID, relationType: R.RELATED },
    ]);
    this.graph.set(InMemoryConceptGraphRepository.REASON_ID, [
      { targetConceptId: InMemoryConceptGraphRepository.HEAD_ID, relationType: R.RELATED },
    ]);
    this.graph.set(InMemoryConceptGraphRepository.FREEDOM_ID, [
      { targetConceptId: InMemoryConceptGraphRepository.HEAD_ID, relationType: R.RELATED },
    ]);
    this.graph.set(InMemoryConceptGraphRepository.MOVEMENT_ID, [
      { targetConceptId: InMemoryConceptGraphRepository.HEAD_ID, relationType: R.RELATED },
    ]);
    this.graph.set(InMemoryConceptGraphRepository.SLEEP_ID, [
      { targetConceptId: InMemoryConceptGraphRepository.HEAD_ID, relationType: R.RELATED },
    ]);

    // === HEART AİLESİ ===
    this.graph.set(InMemoryConceptGraphRepository.HEART_ID, [
      { targetConceptId: InMemoryConceptGraphRepository.LANGUAGE_ID, relationType: R.RELATED },
      { targetConceptId: InMemoryConceptGraphRepository.TRAIN_ID, relationType: R.RELATED },
      { targetConceptId: InMemoryConceptGraphRepository.JOY_ID, relationType: R.RELATED },
      { targetConceptId: InMemoryConceptGraphRepository.INTELLIGENCE_ID, relationType: R.RELATED },
      { targetConceptId: InMemoryConceptGraphRepository.LOYALTY_ID, relationType: R.RELATED },
      { targetConceptId: InMemoryConceptGraphRepository.ANGER_ID, relationType: R.RELATED },
      { targetConceptId: InMemoryConceptGraphRepository.HOPE_ID, relationType: R.RELATED },
    ]);
    [InMemoryConceptGraphRepository.LANGUAGE_ID, InMemoryConceptGraphRepository.TRAIN_ID, InMemoryConceptGraphRepository.JOY_ID, InMemoryConceptGraphRepository.INTELLIGENCE_ID, InMemoryConceptGraphRepository.LOYALTY_ID, InMemoryConceptGraphRepository.ANGER_ID, InMemoryConceptGraphRepository.HOPE_ID].forEach(id => {
      this.graph.set(id, [{ targetConceptId: InMemoryConceptGraphRepository.HEART_ID, relationType: R.RELATED }]);
    });

    // === EYE AİLESİ ===
    this.graph.set(InMemoryConceptGraphRepository.EYE_ID, [
      { targetConceptId: InMemoryConceptGraphRepository.FALSEHOOD_ID, relationType: R.RELATED },
      { targetConceptId: InMemoryConceptGraphRepository.BLINDNESS_ID, relationType: R.RELATED },
      { targetConceptId: InMemoryConceptGraphRepository.GOODNESS_ID, relationType: R.RELATED },
      { targetConceptId: InMemoryConceptGraphRepository.FACE_ID, relationType: R.RELATED },
      { targetConceptId: InMemoryConceptGraphRepository.WATER_ID, relationType: R.RELATED },
    ]);
    [InMemoryConceptGraphRepository.FALSEHOOD_ID, InMemoryConceptGraphRepository.BLINDNESS_ID, InMemoryConceptGraphRepository.GOODNESS_ID, InMemoryConceptGraphRepository.FACE_ID].forEach(id => {
      this.graph.set(id, [{ targetConceptId: InMemoryConceptGraphRepository.EYE_ID, relationType: R.RELATED }]);
    });

    // === HAND AİLESİ ===
    this.graph.set(InMemoryConceptGraphRepository.HAND_ID, [
      { targetConceptId: InMemoryConceptGraphRepository.FINGER_ID, relationType: R.RELATED },
      { targetConceptId: InMemoryConceptGraphRepository.PALM_ID, relationType: R.RELATED },
      { targetConceptId: InMemoryConceptGraphRepository.MANUSCRIPT_ID, relationType: R.RELATED },
    ]);
    [InMemoryConceptGraphRepository.FINGER_ID, InMemoryConceptGraphRepository.PALM_ID, InMemoryConceptGraphRepository.MANUSCRIPT_ID].forEach(id => {
      this.graph.set(id, [{ targetConceptId: InMemoryConceptGraphRepository.HAND_ID, relationType: R.RELATED }]);
    });

    // === FOOT AİLESİ ===
    this.graph.set(InMemoryConceptGraphRepository.FOOT_ID, [
      { targetConceptId: InMemoryConceptGraphRepository.SHOE_ID, relationType: R.RELATED },
    ]);
    this.graph.set(InMemoryConceptGraphRepository.SHOE_ID, [
      { targetConceptId: InMemoryConceptGraphRepository.FOOT_ID, relationType: R.RELATED },
    ]);

    // === TONGUE AİLESİ ===
    this.graph.set(InMemoryConceptGraphRepository.TONGUE_ID, [
      { targetConceptId: InMemoryConceptGraphRepository.SPEECH_ID, relationType: R.RELATED },
      { targetConceptId: InMemoryConceptGraphRepository.GRAMMAR_ID, relationType: R.RELATED },
      { targetConceptId: InMemoryConceptGraphRepository.LANGUAGE_ID, relationType: R.RELATED },
    ]);
    [InMemoryConceptGraphRepository.SPEECH_ID, InMemoryConceptGraphRepository.GRAMMAR_ID].forEach(id => {
      this.graph.set(id, [{ targetConceptId: InMemoryConceptGraphRepository.TONGUE_ID, relationType: R.RELATED }]);
    });

    // === SOUL AİLESİ ===
    this.graph.set(InMemoryConceptGraphRepository.SOUL_ID, [
      { targetConceptId: InMemoryConceptGraphRepository.LIFE_ID, relationType: R.RELATED },
      { targetConceptId: InMemoryConceptGraphRepository.LOVE_ID, relationType: R.RELATED },
      { targetConceptId: InMemoryConceptGraphRepository.PEACE_ID, relationType: R.RELATED },
    ]);
    [InMemoryConceptGraphRepository.LIFE_ID, InMemoryConceptGraphRepository.LOVE_ID, InMemoryConceptGraphRepository.PEACE_ID].forEach(id => {
      this.graph.set(id, [{ targetConceptId: InMemoryConceptGraphRepository.SOUL_ID, relationType: R.RELATED }]);
    });

    // === NOSE AİLESİ ===
    this.graph.set(InMemoryConceptGraphRepository.NOSE_ID, [
      { targetConceptId: InMemoryConceptGraphRepository.BEGINNING_ID, relationType: R.RELATED },
      { targetConceptId: InMemoryConceptGraphRepository.ROOM_ID, relationType: R.RELATED },
      { targetConceptId: InMemoryConceptGraphRepository.LEADER_ID, relationType: R.RELATED },
    ]);
    [InMemoryConceptGraphRepository.BEGINNING_ID, InMemoryConceptGraphRepository.ROOM_ID, InMemoryConceptGraphRepository.LEADER_ID].forEach(id => {
      this.graph.set(id, [{ targetConceptId: InMemoryConceptGraphRepository.NOSE_ID, relationType: R.RELATED }]);
    });

    // === TOOTH AİLESİ ===
    this.graph.set(InMemoryConceptGraphRepository.TOOTH_ID, [
      { targetConceptId: InMemoryConceptGraphRepository.JAW_ID, relationType: R.RELATED },
      { targetConceptId: InMemoryConceptGraphRepository.ARMY_ID, relationType: R.RELATED },
    ]);
    [InMemoryConceptGraphRepository.JAW_ID, InMemoryConceptGraphRepository.ARMY_ID].forEach(id => {
      this.graph.set(id, [{ targetConceptId: InMemoryConceptGraphRepository.TOOTH_ID, relationType: R.RELATED }]);
    });

    
    // === KNIFE AİLESİ ===
    this.graph.set(InMemoryConceptGraphRepository.KNIFE_ID, [
      { targetConceptId: InMemoryConceptGraphRepository.HAND_ID, relationType: R.RELATED },
      { targetConceptId: InMemoryConceptGraphRepository.TOOTH_ID, relationType: R.RELATED },
      { targetConceptId: InMemoryConceptGraphRepository.MANUSCRIPT_ID, relationType: R.RELATED },
    ]);

    
    // === WALNUT AİLESİ ===
    this.graph.set(InMemoryConceptGraphRepository.WALNUT_ID, [
      { targetConceptId: InMemoryConceptGraphRepository.TREE_ID, relationType: R.RELATED },
      { targetConceptId: InMemoryConceptGraphRepository.EAGLE_ID, relationType: R.RELATED },
    ]);

    // === KNIFE AİLESİ ===
    this.graph.set(InMemoryConceptGraphRepository.KNIFE_ID, [
      { targetConceptId: InMemoryConceptGraphRepository.HAND_ID, relationType: R.RELATED },
      { targetConceptId: InMemoryConceptGraphRepository.TOOTH_ID, relationType: R.RELATED },
      { targetConceptId: InMemoryConceptGraphRepository.MANUSCRIPT_ID, relationType: R.RELATED },
    ]);

    // === TREE ve HORSE (bagımsız) ===
    this.graph.set(InMemoryConceptGraphRepository.TREE_ID, []);
    this.graph.set(InMemoryConceptGraphRepository.HORSE_ID, []);

    // === BEE AİLESİ ===
    this.graph.set(InMemoryConceptGraphRepository.BEE_ID, [
      { targetConceptId: InMemoryConceptGraphRepository.HONEY_ID, relationType: R.RELATED },
      { targetConceptId: InMemoryConceptGraphRepository.TREE_ID, relationType: R.RELATED },
      { targetConceptId: InMemoryConceptGraphRepository.EARTH_ID, relationType: R.RELATED },
      { targetConceptId: InMemoryConceptGraphRepository.LIGHT_ID, relationType: R.RELATED },
    ]);

    // === HONEY AİLESİ ===
    this.graph.set(InMemoryConceptGraphRepository.HONEY_ID, [
      { targetConceptId: InMemoryConceptGraphRepository.BEE_ID, relationType: R.RELATED },
      { targetConceptId: InMemoryConceptGraphRepository.SUGAR_ID, relationType: R.RELATED },
    ]);
  }

  public getNeighbors(conceptId: string): ConceptNeighbor[] {
    if (!conceptId) return [];
    return this.graph.get(conceptId) || [];
  }

  public addRelation(sourceConceptId: string, targetConceptId: string, relationType: DiscoveryRelationType): void {
    const existing = this.graph.get(sourceConceptId) || [];
    existing.push({ targetConceptId, relationType });
    this.graph.set(sourceConceptId, existing);
  }

  public clear(): void {
    this.graph.clear();
  }
}