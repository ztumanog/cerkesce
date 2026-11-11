import { DialectMapper } from "@/domain/dialect/services/DialectMapper";
import { DialectCode } from "@/domain/dialect/types/DialectTypes";

export function getDialectMapper(): DialectMapper {
  const m = new DialectMapper();
  // ADY -> KBD: ш -> ф, шӀ -> фӀ, шъ -> ф, щ -> щ (ayni)
  m.addRule({ sourceDialect: DialectCode.ADY, targetDialect: DialectCode.KBD, pattern: "шӀ", replacement: "фӀ" });
  m.addRule({ sourceDialect: DialectCode.ADY, targetDialect: DialectCode.KBD, pattern: "ш", replacement: "ф" });
  // KBD -> ADY: ф -> ш, фӀ -> шӀ
  m.addRule({ sourceDialect: DialectCode.KBD, targetDialect: DialectCode.ADY, pattern: "фӀ", replacement: "шӀ" });
  m.addRule({ sourceDialect: DialectCode.KBD, targetDialect: DialectCode.ADY, pattern: "ф", replacement: "ш" });
  m.addRule({ sourceDialect: DialectCode.ADY, targetDialect: DialectCode.KBD, pattern: "шы", replacement: "фы" });
  m.addRule({ sourceDialect: DialectCode.KBD, targetDialect: DialectCode.ADY, pattern: "фы", replacement: "шы" });
  return m;
}
