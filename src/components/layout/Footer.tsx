/**
 * File: src/components/layout/Footer.tsx
 * Generated: 2026-09-16
 * Layer: UI
 */

import React from 'react';
import { Camera, Code2, Users, Shield, BookOpen, Mail, Heart } from 'lucide-react';

export interface FooterLink {
  ad: string;
  href?: string;
  onClick?: (() => void) | boolean;
  icon?: React.ComponentType<{ className?: string }>;
}
