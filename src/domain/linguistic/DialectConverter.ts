/**
 * DialectConverter — Adyghe (West) <-> Kabardian (East)
 * Version 7 — mojibake temizlenmiş + reverse bigram-önce düzeltmesi
 */

export class DialectConverter {
  private readonly exactLexicon: Record<string, string> = {
    "о": "уэ",
    "тэ": "дэ",
    "жул": "вы",
    "жу": "вы",
    "жулнды": "вынд",
    "жъуагъуэ": "вагъуэ",
    "куэжы": "гуэдз",
    "къупчъ": "къубжэ",
    "хьандзу": "хьэвэ",
    "нэшкъу": "нэф",
  };

  convertWord(word: string): string {
    if (word in this.exactLexicon) {
      return this.exactLexicon[word];
    }

    let c = word;

    // PHASE 1
    c = c.replace(/^дэ(?=[пвйшзжкбгджье])/g, "___F1E___");
    c = c.replace(/^шъо(?=[-кIйшд])/g, "___FO___");
    c = c.replace(/^шъул(?=[-кIйшд])/g, "___FY___");
    c = c.replace(/^ты(?=[-кIйшд])/g, "___DY___");

    // PHASE 2
    c = c.replace(/шъулзы$/g, "___F___ыз");
    c = c.replace(/шъул/g, "___F___ы");
    c = c.replace(/жъуэ/g, "вэ");
    c = c.replace(/жъу/g, "в");
    c = c.replace(/жул/g, "вы");
    c = c.replace(/жу/g, "вы");

    // PHASE 3
    c = c.replace(/шIуэ/g, "___F1E___");
    c = c.replace(/шIу/g, "___F1Y___");
    c = c.replace(/шIэ/g, "___S1E___");
    c = c.replace(/шIы/g, "___S1Y___");
    c = c.replace(/шI/g, "___S1___");

    // PHASE 4
    c = c.replace(/-йт$/g, "-нй");
    c = c.replace(/йт$/g, "нй");
    c = c.replace(/-агъ$/g, "-ай");
    c = c.replace(/агъ$/g, "ай");
    c = c.replace(/-гъэ$/g, "-ай");
    c = c.replace(/-гъ$/g, "-ай");

    // PHASE 5
    c = c.replace(/^о(?=[ндбгвпзсжк])/g, "уэ");
    c = c.replace(/он$/g, "уэн");
    c = c.replace(/од$/g, "уэд");
    c = c.replace(/отэн$/g, "уэтэн");
    c = c.replace(/офы$/g, "уэху");
    c = c.replace(/о$/g, "уэ");
    c = c.replace(/о(?=[нмзсвдкпбг])/g, "уэ");

    // PHASE 5.5
    c = c.replace(/гуфIэ/g, 'гушIо');
    c = c.replace(/гукIэгъу/g, 'гуйIэгъу');
    c = c.replace(/гупшысэ/g, 'гупсысэ');
    c = c.replace(/шъхьащэ/g, 'щхьэшэ');
    c = c.replace(/нэшкъу/g, 'нэф');
    c = c.replace(/шълъпкъэ/g, 'йлъпкъэ');
    c = c.replace(/пIэ/g, 'Iэ');
    c = c.replace(/тIы/g, 'Iы');
    c = c.replace(/кIэ/g, 'чэ');
    c = c.replace(/жIыды/g, 'жIыху');
    c = c.replace(/жыгъо/g, 'дзыгъуэ');
    c = c.replace(/жIы/g, 'дзIы');
    c = c.replace(/гъо/g, 'гъуэ');

    // PHASE 6
    c = c.replace(/фы$/g, "ху");
    c = c.replace(/ф/g, "ху");
    c = c.replace(/шъ/g, "щ");
    c = c.replace(/жъ/g, "жь");

    // PHASE 7
    c = c.replace(/___F1E___/g, "фIэ");
    c = c.replace(/___F1Y___/g, "фIы");
    c = c.replace(/___S1E___/g, "йIэ");
    c = c.replace(/___S1Y___/g, "йIы");
    c = c.replace(/___S1___/g, "йI");
    c = c.replace(/___FO___/g, "фо");
    c = c.replace(/___FY___/g, "фы");
    c = c.replace(/___DY___/g, "ды");
    c = c.replace(/___DE___/g, "дэ");
    c = c.replace(/___F___/g, "ф");

    // PHASE 8
    if (c.length > 3 && c.endsWith("ы") && !c.endsWith("хуы")) {
      c = c.slice(0, -1);
    }

    c = c.replace(/шън/g, 'йн');
    return c;
  }

  /**
   * Kbd (Doğu) -> Ady (Batı) — ters dönüşüm.
   * KRİTİK: bigram kuralları (щӀ, йӀ) tek karakter kurallarından (щ, й) ÖNCE.
   */
  convertWordReverse(word: string): string {
     const exact: Record<string, string> = {
      "джэд": "чэты",
      "джэду": "кӀэтыу",
    };
    if (word in exact) return exact[word];
     let c = word;

    // --- 1) BIGRAM ONCE (tek karakter kuralindan once uygulanmali) ---
    c = c.replace(/щӀ/g, "шӀ");
    c = c.replace(/йӀ/g, "шӀ");

    // --- 2) TEK KARAKTER ---
    c = c.replace(/щ/g, "шъ");
    c = c.replace(/й/g, "шъ");

    // --- 3) жь / ху ---
    c = c.replace(/жь/g, "жъ");
    c = c.replace(/ху/g, "ф");

    return c;
  }
}