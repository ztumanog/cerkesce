/**
 * File: src/components/Footer.tsx
 * Generated: 2026-09-16
 * Layer: UI
 */

import React from 'react';

export interface FooterLink {
  ad: string;
  href?: string;
  onClick?: (() => void) | boolean;
  icon?: React.ComponentType<{ className?: string }>;
}

export const Footer: React.FC<{ links?: FooterLink[] }> = ({ links = [] }) => {
  return (
    <footer>
      {links.map((link, idx) => {
        const IconComponent = link.icon;
        const isClickable = Boolean(link.onClick);
        return (
          <div key={idx}>
            {IconComponent && <IconComponent className="w-4 h-4" />}
            {isClickable ? (
              <button onClick={typeof link.onClick === 'function' ? link.onClick : undefined}>
                {link.ad}
              </button>
            ) : (
              <a href={link.href ?? '#'}>{link.ad}</a>
            )}
          </div>
        );
      })}
    </footer>
  );
};
export default Footer;
