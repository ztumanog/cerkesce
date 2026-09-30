/**
 * DialectConverter - Adyghe (West Circassian) -> Kabardian (East Circassian)
 * Version 6 - Python v3 birebir portu (40/40 PASS)
 *
 * Kaynak: dialect_converter-v3.py (40/40 PASS, %100)
 *
 * Wikipedia ses denklikleri + morfolojik kurallar:
 * - ф -> ху (sözcüksel ses yasası)
 * - шъ -> щ (sibilant kayması)
 * - жъ -> жь (sibilant kayması)
 * - шъуы -> ф (dudaksılaşmış sibilant)
 * - жъу -> в (dudaksılaşmış sibilant)
 * - шI -> щI (ejektif sibilant)
 * - шIу -> фI (özel)
 * - о -> уэ (ünlü diftonlaşma)
 */

export class DialectConverter {
  private readonly exactLexicon: Record<string, string> = {
    "о": "уэ",
    "тэ": "дэ",
    "цуы": "вы",
    "цу": "вы",
    "цуынды": "вынд",
    "жъуагъуэ": "вагъуэ",
    "куэцы": "гуэдз",
    "гъупчъ": "гъубжэ",
    "хьандзу": "хьэвэ",
    "нэшъу": "нэф",
    "нэшъу": "нэф",
  };

  /**
   * Tek bir kelimeyi Adigece'den Kabardeyce'ye cevirir.
   */
  convertWord(word: string): string {
    // Exact lexicon kontrolu
    if (word in this.exactLexicon) {
      return this.exactLexicon[word];
    }

    let c = word;

    // PHASE 1: GRAMMATICAL PREFIX MAPPING
    c = c.replace(/^фэ(?=[птщшчцкбгдзжх])/g, "___F1E___");
    c = c.replace(/^шъо(?=[-кIщшф])/g, "___FO___");
    c = c.replace(/^шъуы(?=[-кIщшф])/g, "___FY___");
    c = c.replace(/^ты(?=[-кIщшф])/g, "___DY___");

    // PHASE 2: LABIALIZED SIBILANT SHIFTS
    c = c.replace(/шъуызы$/g, "___F___ыз");
    c = c.replace(/шъуы/g, "___F___ы");
    c = c.replace(/жъуэ/g, "вэ");
    c = c.replace(/жъу/g, "в");
    c = c.replace(/цуы/g, "вы");
    c = c.replace(/цу/g, "вы");

    // PHASE 3: EJECTIVE SIBILANT MASKING
    c = c.replace(/шIуэ/g, "___F1E___");
    c = c.replace(/шIу/g, "___F1Y___");
    c = c.replace(/шIэ/g, "___S1E___");
    c = c.replace(/шIы/g, "___S1Y___");
    c = c.replace(/шI/g, "___S1___");

    // PHASE 4: SUFFIX & ENCLITIC
    c = c.replace(/-щт$/g, "-нщ");
    c = c.replace(/щт$/g, "нщ");
    c = c.replace(/-агъ$/g, "-ащ");
    c = c.replace(/агъ$/g, "ащ");
    c = c.replace(/-гъэ$/g, "-ащ");
    c = c.replace(/-гъ$/g, "-ащ");

    // PHASE 5: VOWEL MAPPINGS
    c = c.replace(/^о(?=[ндбгтпзсжк])/g, "уэ");
    c = c.replace(/он$/g, "уэн");
    c = c.replace(/од$/g, "уэд");
    c = c.replace(/отэн$/g, "уэтэн");
    c = c.replace(/офы$/g, "уэху");
    c = c.replace(/о$/g, "уэ");
    c = c.replace(/о(?=[нмзстдкпбг])/g, "уэ");

    // PHASE 5.5: C-9.2 + C-10.2 KURALLAR (ADY -> KBD)
    c = c.replace(/гуфIэ/g, 'гушIо');
    c = c.replace(/гукIэгъу/g, 'гущIэгъу');
    c = c.replace(/гупшысэ/g, 'гупсысэ');
    c = c.replace(/шъхьащэ/g, 'щхьэщэ');
    c = c.replace(/нэшъу/g, 'нэф');
    c = c.replace(/шъыпкъэ/g, 'щыпкъэ');
    c = c.replace(/гъусэ/g, 'гусэ');
    c = c.replace(/джэд/g, 'зэд');
    c = c.replace(/чъыгы/g, 'щыгы');
    c = c.replace(/пӀэ/g, 'Ӏэ');
    c = c.replace(/тӀы/g, 'Ӏы');
    c = c.replace(/кӀэ/g, 'чэ');


    // C-11.2.1: ц -> дз (цӏ'yi koru)
    c = c.replace(/цӏ/g, 'ЦЦЦ');
    c = c.replace(/цыгъо/g, 'дзыгъуэ');
    c = c.replace(/ц/g, 'дз');
    c = c.replace(/гъо/g, 'гъуэ');
    c = c.replace(/цӀы/g, 'дзӀы');
    c = c.replace(/ЦЦЦ/g, 'цӏ');

// PHASE 6: LEXICAL SOUND LAWS
    c = c.replace(/фы$/g, "ху");
    c = c.replace(/ф/g, "ху");
    c = c.replace(/шъ/g, "щ");
    c = c.replace(/жъ/g, "жь");

    // PHASE 7: UNMASKING
    c = c.replace(/___F1E___/g, "фIэ");
    c = c.replace(/___F1Y___/g, "фIы");
    c = c.replace(/___S1E___/g, "щIэ");
    c = c.replace(/___S1Y___/g, "щIы");
    c = c.replace(/___S1___/g, "щI");
    c = c.replace(/___FO___/g, "фо");
    c = c.replace(/___FY___/g, "фы");
    c = c.replace(/___DY___/g, "ды");
    c = c.replace(/___DE___/g, "дэ");
    c = c.replace(/___F___/g, "ф");

    // PHASE 8: POST-PROCESSING
    if (c.length > 3 && c.endsWith("ы") && !c.endsWith("хуы")) {
      c = c.slice(0, -1);
    }

    return c;
  }
}
