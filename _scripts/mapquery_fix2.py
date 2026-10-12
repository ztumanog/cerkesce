import re
from pathlib import Path

ts_path = Path('src/domain/discovery/services/QuerySemanticMapper.ts')
content = ts_path.read_text(encoding='utf-8')

# mapQuery basina map fallback ekle
eski = """  public async mapQuery(query: string): Promise<SemanticQueryResult> {
    const normalizedQuery = (query ?? '')"""

yeni = """  public async mapQuery(query: string): Promise<SemanticQueryResult> {
    // Once senkron map'i dene (hardcoded sozluk: su, water, вода, псы)
    const syncResult = this.map(query);
    if (syncResult.conceptId) {
      return syncResult;
    }

    const normalizedQuery = (query ?? '')"""

if eski in content:
    content = content.replace(eski, yeni)
    ts_path.write_text(content, encoding='utf-8')
    print("✅ mapQuery'ye map fallback eklendi")
else:
    print("❌ Pattern bulunamadi!")
    # Alternatif pattern
    eski2 = "public async mapQuery(query: string): Promise<SemanticQueryResult> {"
    if eski2 in content:
        print("Alternatif pattern bulundu, manuel ekleme gerekli")
