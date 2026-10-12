from pathlib import Path
f = Path('src/tests/domain/linguistic/DialectConverter.cert.test.ts')
c = f.read_text(encoding='utf-8')

test = """
  it('DC-002: C-9.2 kurallar ADY-KBD', () => {
    const cases: Array<[string,string,string]> = [
      ['гушӀо','гуфӀэ','shIo-fI'],
      ['гущӀэгъу','гукӀэгъу','shchIe-kIe'],
      ['гупсысэ','гупшысэ','ps-psh'],
      ['щхьэщэ','шъхьащэ','shchh-shh'],
      ['нэф','нэху','f-khu'],
      ['нэшъу','нэф','shu-f'],
      ['шъыпкъэ','щыпкъэ','sh-shch'],
    ];
    let pass = 0;
    const fails: string[] = [];
    for (const [ady, kbd, tag] of cases) {
      const r = converter.convertWord(ady);
      if (r === kbd) pass++;
      else fails.push(tag + ': ' + ady + ' -> ' + r + ' (expected ' + kbd + ')');
    }
    console.log('C-9.2: ' + pass + '/' + cases.length + ' passed');
    fails.forEach(f => console.log(f));
    expect(fails.length).toBe(0);
  });
"""
c = c.rstrip()
if c.endswith('});'):
    c = c[:-3] + test + '\n});'
f.write_text(c, encoding='utf-8')
print('OK: DC-002 eklendi')
