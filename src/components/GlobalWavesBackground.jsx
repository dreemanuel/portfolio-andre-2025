// src/components/GlobalWavesBackground.jsx
import Waves from './ui/Backgrounds/Waves/Waves';

const GlobalWavesBackground = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      {/* Base background */}
      <div className="absolute inset-0 bg-gradient-to-br from-ctp-base to-ctp-mantle" />
      
      {/* Global Waves Effect */}
      <Waves 
        gradientColors={["#33ccff", "#00ff99"]}
        backgroundColor="transparent"
        waveSpeedX={0.008}
        waveSpeedY={0.003}
        waveAmpX={24}
        waveAmpY={12}
        className="opacity-80"
      />
    </div>
  );
};

export default GlobalWavesBackground;