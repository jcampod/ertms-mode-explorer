import { useTheme } from '../../hooks/useTheme';
import ATOStateDiagram from './ATOStateDiagram';
import GoAComparison from './GoAComparison';
import ETCSIntegration from './ETCSIntegration';
import ATOReferences from './ATOReferences';

const ATOOverview = () => {
  const { theme } = useTheme();
  const dk = theme === 'dark';

  const sectionHeader = `text-[10px] uppercase tracking-wider font-semibold mb-3 ${dk ? 'text-slate-500' : 'text-slate-400'}`;

  return (
    <div className="h-full overflow-y-auto">
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
              ETCS Integration
            </h2>
            <ETCSIntegration />
          </div>

          {/* GoA Comparison — full width */}
          <div>
            <h2 className={sectionHeader}>
              Grades of Automation (GoA 1–4)
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
