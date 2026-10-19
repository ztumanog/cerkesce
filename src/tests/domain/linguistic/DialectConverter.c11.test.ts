import { describe, it, expect } from 'vitest';
import { DialectConverter } from '@/domain/linguistic/DialectConverter';

describe('DialectConverter C-11 (Adıgece → Kabardeyce)', () => {
  const converter = new DialectConverter();

  const testler: Array<[string, string, string]> = [
    ['шъхьэ', 'щхьэ', 'kafa'],
    ['дышъэ', 'дыщэ', 'altın'],
    ['шъыпкъэ', 'щыпкъэ', 'gerçek'],
    ['шъхьащэ', 'щхьэшэ', 'saygı'],
    ['гукӀэгъу', 'гущӀэгъу', 'merhamet'],
    ['нэшъу', 'нэф', 'kör'],
    ['чъыгы', 'жыг', 'ağaç'],
    ['Ӏофы', 'Ӏуэху', 'iş'],
    ['цӀыфы', 'цӀыху', 'insan'],
    ['бжьыныф', 'бжьыныху', 'sarımsak'],
    ['фабэ', 'хуабэ', 'sıcak'],
    ['мафэ', 'махуэ', 'gün'],
    ['фыжьы', 'хужь', 'beyaz'],
    ['жъы', 'жьы', 'eski'],
    ['бжъэ', 'бжьэ', 'boynuz'],
    ['шӀын', 'щӀын', 'yapmak'],
    ['гъашӀэ', 'гъащӀэ', 'hayat'],
    ['гупшысэ', 'гупсысэ', 'düşünce'],
    ['гушӀо', 'гуфӀэ', 'sevinç'],
    ['цуы', 'вы', 'öküz'],
  ];

  it.each(testler)('%s → %s (%s)', (ady, kbd) => {
    expect(converter.convertWord(ady)).toBe(kbd);
  });
});
