'use client';

import React, { useState } from 'react';
import { Footer } from './Footer';
import Kaynaklar from './Kaynaklar';

export function FooterWrapper() {
  const [kaynaklarAcik, setKaynaklarAcik] = useState(false);

  return (
    <>
      <Footer onKaynaklarAc={() => setKaynaklarAcik(true)} />
      {kaynaklarAcik && (
        <Kaynaklar onClose={() => setKaynaklarAcik(false)} />
      )}
    </>
  );
}