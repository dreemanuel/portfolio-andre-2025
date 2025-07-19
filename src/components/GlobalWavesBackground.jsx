// src/components/GlobalWavesBackground.jsx
import Waves from './ui/Backgrounds/Waves/Waves';

const GlobalWavesBackground = () => {
  return (
    <div className="fixed inset-0 z-0">
      {/* Base background with pointer-events-none to allow interaction with waves */}
      <div className="absolute inset-0 bg-gradient-to-br from-ctp-base to-ctp-mantle pointer-events-none" />
      
      {/* Global Waves Effect - WITH mouse interaction enabled */}
      <Waves 
        gradientColors={["#33ccff", "#00ff99"]}
        backgroundColor="transparent"
        waveSpeedX={0.06}
        waveSpeedY={0.005}
        waveAmpX={32}
        waveAmpY={16}
        friction={0.925}
        tension={0.01}
        className="opacity-80"
      />
    </div>
  );
};

export default GlobalWavesBackground;