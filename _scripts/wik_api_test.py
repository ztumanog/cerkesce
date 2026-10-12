import json
import urllib.request
import urllib.parse
from pathlib import Path

test_words = ["абы", "ар", "сэ", "гу", "псы", "тхьэ"]

for word in test_words:
    try:
        url = f"https://kbd.wiktionary.org/api/rest_v1/page/definition/{urllib.parse.quote(word)}"
        req = urllib.request.Request(url, headers={"User-Agent": "CerkesceBot/1.0 (test)"})
        with urllib.request.urlopen(req, timeout=10) as resp:
            data = json.loads(resp.read().decode("utf-8"))
            print(f"OK {word}: {list(data.keys())}")
    except Exception as e:
        print(f"FAIL {word}: {type(e).__name__}: {e}")
