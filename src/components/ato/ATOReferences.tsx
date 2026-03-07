import { BookOpen } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

const specifications = [
  {
    id: 'subset-125',
    name: 'Subset-125',
    title: 'ATO System Requirements Specification',
    description: 'Primary ATO specification defining system-level requirements, state machines, and functional architecture.',
    status: 'Released v1.0.0 (2023)',
  },
  {
    id: 'subset-126',
    name: 'Subset-126',
    title: 'ATO-OB / ATO-TS Interface (Application Layer)',
    description: 'Defines data messages between ATO on-board and trackside, including Journey Profile and Segment Profile structures.',
    status: 'Released v1.0.0 (2023)',
  },
  {
    id: 'subset-130',
    name: 'Subset-130',
    title: 'ATO-OB / ETCS-OB Interface',
    description: 'Interface between the ATO on-board unit and the ETCS on-board unit. Defines data exchanges and safety handover mechanisms.',
    status: 'Released v1.0.0 (2023)',
  },
  {
    id: 'subset-139',
    name: 'Subset-139',
    title: 'ATO to Vehicle Interface',
    description: 'Defines the connection between ATO and the physical train — traction control, braking commands, door operations, sensor feedback.',
    status: 'Released v1.0.0 (2023)',
  },
  {
    id: 'subset-148',
    name: 'Subset-148',
    title: 'ATO-OB / ATO-TS Interface (Transport & Security)',
    description: 'Transport layer specifications, security protocols, and integrity checks for ATO communication.',
    status: 'Released v1.0.0 (2023)',
  },
];

const ATOReferences = () => {
  const { theme } = useTheme();
  const dk = theme === 'dark';

  return (
    <div>
      <div className={`flex items-center gap-1.5 mb-3 ${dk ? 'text-slate-500' : 'text-slate-400'}`}>
        <BookOpen className="w-3.5 h-3.5" />
        <span className="text-[10px] uppercase tracking-wider font-semibold">
          References — Key ATO Specifications (CCS TSI 2023)
        </span>
      </div>
      <div className="space-y-2">
        {specifications.map((spec) => (
          <div
            key={spec.id}
            className={`rounded-lg border px-3 py-2.5 ${dk ? 'border-slate-800 bg-slate-900/40' : 'border-slate-200 bg-white'}`}
          >
            <div className="flex items-center gap-2 mb-1">
              <span className={`text-xs font-mono font-bold ${dk ? 'text-blue-300' : 'text-blue-600'}`}>
                {spec.name}
              </span>
              <span className={`text-xs ${dk ? 'text-slate-300' : 'text-slate-700'}`}>
                — {spec.title}
              </span>
            </div>
            <p className={`text-[11px] leading-relaxed ${dk ? 'text-slate-500' : 'text-slate-400'}`}>
              {spec.description}
            </p>
            <span className={`inline-block mt-1 text-[10px] ${dk ? 'text-slate-600' : 'text-slate-400'}`}>
              {spec.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ATOReferences;
