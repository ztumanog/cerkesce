import React from 'react';

type DivProps = React.HTMLAttributes<HTMLDivElement>;

export function Badge({ className = '', ...p }: React.HTMLAttributes<HTMLSpanElement>) {
  return <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${className}`} {...p} />;
}

export function Input({ className = '', ...p }: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input className={`flex h-9 w-full rounded-lg border border-slate-300 bg-white px-3 py-1 text-sm text-slate-900 outline-none transition focus:ring-2 focus:ring-indigo-500/40 ${className}`} {...p} />;
}

export function Card({ className = '', ...p }: DivProps) {
  return <div className={`rounded-xl border border-slate-200 bg-white text-slate-900 shadow-sm ${className}`} {...p} />;
}

export function CardHeader({ className = '', ...p }: DivProps) {
  return <div className={`flex flex-col gap-1.5 p-4 ${className}`} {...p} />;
}

export function CardContent({ className = '', ...p }: DivProps) {
  return <div className={`p-4 ${className}`} {...p} />;
}

export function CardTitle({ className = '', ...p }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={`font-semibold leading-none tracking-tight ${className}`} {...p} />;
}

export function CardDescription({ className = '', ...p }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={`text-sm text-slate-500 ${className}`} {...p} />;
}

export function Separator({ className = '' }: { className?: string }) {
  return <div role="separator" className={`h-px w-full bg-slate-100 ${className}`} />;
}