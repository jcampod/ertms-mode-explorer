import { useTheme } from '../../hooks/useTheme';
import { useLanguage } from '../../i18n/index';

const LevelTransitions = () => {
  const { theme } = useTheme();
  const { language } = useLanguage();

  const basePath = import.meta.env.BASE_URL || '/';
  const src = `${basePath}level-transitions.html?theme=${theme}&lang=${language}`;

  return (
    <div className="w-full h-full overflow-hidden">
      <iframe
        key={`${theme}-${language}`}
        src={src}
        className="w-full h-full border-0"
        title="ERTMS Level Transitions"
      />
    </div>
  );
};

export default LevelTransitions;
