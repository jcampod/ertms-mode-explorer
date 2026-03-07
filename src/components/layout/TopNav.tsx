import { Train } from 'lucide-react';

export default function TopNav() {
  return (
    <header className="h-12 flex items-center justify-between px-4 bg-slate-900 border-b border-slate-800 shrink-0">
      <div className="flex items-center gap-2.5">
        <Train className="w-5 h-5 text-blue-400" />
        <h1 className="text-sm font-semibold text-slate-100 tracking-wide">
          ERTMS Mode Explorer
        </h1>
      </div>
      <span className="text-xs text-slate-500 hidden sm:block">
        ETCS Operating Modes &mdash; Subset-026
      </span>
    </header>
  );
}
