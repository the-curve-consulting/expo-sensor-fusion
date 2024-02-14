import { CameraController } from '../lib/components/CameraController';
import { CubeFace } from '../lib/components/CubeFace';
import { FloatingBackButton } from '../lib/components/FloatingBackButton';
import { Scene } from '../lib/components/Scene';

export type CubeMapScreenName = 'CubeMapScreen';

type CubeMapScreenProps = {
  onBack: () => void;
};

export const CubeMapScreen = ({ onBack }: CubeMapScreenProps) => {
  return (
    <>
      <Scene>
        <CameraController />

        <CubeFace side="front" color="red" dimension={30} />
        <CubeFace side="back" color="green" dimension={30} />
        <CubeFace side="left" color="blue" dimension={30} />
        <CubeFace side="right" color="yellow" dimension={30} />
        <CubeFace side="top" color="magenta" dimension={30} />
        <CubeFace side="bottom" color="cyan" dimension={30} />
      </Scene>

      <FloatingBackButton onBack={onBack} />
    </>
  );
};
