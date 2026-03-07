import { useTheme } from '../../hooks/useTheme';

const GridBackground = () => {
  const { theme } = useTheme();

  const smallStroke = theme === 'dark'
    ? 'rgba(51, 65, 85, 0.1)'
    : 'rgba(148, 163, 184, 0.15)';
  const largeStroke = theme === 'dark'
    ? 'rgba(51, 65, 85, 0.2)'
    : 'rgba(148, 163, 184, 0.25)';

  return (
    <>
      <defs>
        <pattern
          id="grid-small"
          width="20"
          height="20"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M 20 0 L 0 0 0 20"
            fill="none"
            stroke={smallStroke}
            strokeWidth="0.5"
          />
        </pattern>
        <pattern
          id="grid-large"
          width="100"
          height="100"
          patternUnits="userSpaceOnUse"
        >
          <rect width="100" height="100" fill="url(#grid-small)" />
          <path
            d="M 100 0 L 0 0 0 100"
            fill="none"
            stroke={largeStroke}
            strokeWidth="1"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid-large)" />
    </>
  );
};

export default GridBackground;
