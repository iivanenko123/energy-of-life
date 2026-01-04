const SpaceBackground = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <div className="absolute inset-0 space-glow" />
      <div className="absolute inset-0 stars-bg" />
    </div>
  );
};

export default SpaceBackground;
