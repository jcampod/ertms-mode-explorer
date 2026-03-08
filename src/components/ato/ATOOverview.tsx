import { Signal } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { useUI } from '../../i18n/useUI';
import { useErtmsLevel } from '../../hooks/useErtmsLevel';
import ATOStateDiagram from './ATOStateDiagram';
import GoAComparison from './GoAComparison';
import ETCSIntegration from './ETCSIntegration';
import ATOReferences from './ATOReferences';

const ATOOverview = () => {
  const { theme } = useTheme();
  const dk = theme === 'dark';
  const ui = useUI();
  const { ertmsLevel } = useErtmsLevel();

  const sectionHeader = `text-[10px] uppercase tracking-wider font-semibold mb-3 ${dk ? 'text-slate-500' : 'text-slate-400'}`;

  if (ertmsLevel === '0') {
    return (
      <div className="h-full flex items-center justify-center p-8">
        <div className="text-center max-w-md">
          <Signal className={`w-12 h-12 mx-auto mb-4 ${dk ? 'text-slate-600' : 'text-slate-300'}`} />
          <p className={`text-sm ${dk ? 'text-slate-400' : 'text-slate-500'}`}>
            {ui.atoNotAvailableAtLevel}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto">
      {/* Level 1 info banner */}
      {ertmsLevel === '1' && (
        <div className={`mx-4 mt-3 px-3 py-2 rounded-lg text-xs ${
          dk ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 'bg-amber-50 text-amber-700 border border-amber-200'
        }`}>
          {ui.atoLimitedAtLevel1}
        </div>
      )}

      {/* ATO State Diagram */}
      <div style={{ height: '520px', minHeight: '400px' }}>
        <ATOStateDiagram />
      </div>

      {/* Content sections — full width, stacked */}
      <div className={`border-t ${dk ? 'border-slate-800' : 'border-slate-200'}`}>
        <div className="max-w-6xl mx-auto px-4 py-6 space-y-8">
          {/* ETCS Integration — full width */}
          <div>
            <h2 className={sectionHeader}>
              {ui.etcsIntegration}
            </h2>
            <ETCSIntegration />
          </div>

          {/* GoA Comparison — full width */}
          <div>
            <h2 className={sectionHeader}>
              {ui.gradesOfAutomation}
            </h2>
            <GoAComparison />
          </div>

          {/* References — bibliography at the end */}
          <div className={`border-t pt-6 ${dk ? 'border-slate-800' : 'border-slate-200'}`}>
            <ATOReferences />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ATOOverview;
