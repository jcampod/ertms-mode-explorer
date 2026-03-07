const GridBackground = () => {
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
            stroke="rgba(51, 65, 85, 0.1)"
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
            stroke="rgba(51, 65, 85, 0.2)"
            strokeWidth="1"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid-large)" />
    </>
  );
};

export default GridBackground;
