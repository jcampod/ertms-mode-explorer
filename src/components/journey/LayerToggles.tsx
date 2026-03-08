import type { VisualizerLayers } from '../../data/journey-types';
import { useUI } from '../../i18n/useUI';
import { lineColors, phaseColors, gradientColors, restrictionColors } from '../../utils/journey-colors';

interface LayerTogglesProps {
  dk: boolean;
  layers: VisualizerLayers;
  onToggle: (key: keyof VisualizerLayers) => void;
}

const LayerToggles = ({ dk, layers, onToggle }: LayerTogglesProps) => {
  const ui = useUI();

  const items: { key: keyof VisualizerLayers; label: string; color: string }[] = [
    {
      key: 'etcsCeiling',
      label: ui.jpLayerEtcsCeiling,
      color: dk ? lineColors.dark.etcsCeiling : lineColors.light.etcsCeiling,
    },
    {
      key: 'atoTarget',
      label: ui.jpLayerAtoTarget,
      color: dk ? lineColors.dark.atoTarget : lineColors.light.atoTarget,
    },
    {
      key: 'phaseColors',
      label: ui.jpLayerPhaseColors,
      color: phaseColors.accel,
    },
    {
      key: 'gradients',
      label: ui.jpLayerGradients,
      color: dk ? gradientColors.uphill.dark : gradientColors.uphill.light,
    },
    {
      key: 'restrictions',
      label: ui.jpLayerRestrictions,
      color: dk ? restrictionColors.temporary.dark.stroke : restrictionColors.temporary.light.stroke,
    },
  ];

  return (
    <div className="flex items-center gap-3 flex-wrap">
      <span className={`text-[10px] uppercase tracking-wider font-medium ${
        dk ? 'text-slate-500' : 'text-slate-400'
      }`}>
        {ui.jpLayers}
      </span>
      {items.map(item => (
        <button
          key={item.key}
          onClick={() => onToggle(item.key)}
          className={`
            flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium
            transition-all duration-150 cursor-pointer border
            ${layers[item.key]
              ? dk
                ? 'border-slate-600 bg-slate-800/80 text-slate-200'
                : 'border-slate-300 bg-white text-slate-700'
              : dk
                ? 'border-slate-800 bg-slate-900/40 text-slate-600'
                : 'border-slate-100 bg-slate-50/50 text-slate-400'
            }
          `}
        >
          <span
            className="w-2.5 h-2.5 rounded-sm"
            style={{
              backgroundColor: item.color,
              opacity: layers[item.key] ? 1 : 0.3,
            }}
          />
          {item.label}
        </button>
      ))}
    </div>
  );
};

export default LayerToggles;
