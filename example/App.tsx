import { CameraController } from './src/CameraController';
import { CubeFace } from './src/Plane';
import { Scene } from './src/Scene';

export const App = () => {
  return (
    <Scene>
      <CameraController />

      <CubeFace side="front" color="red" dimension={30} />
      <CubeFace side="back" color="green" dimension={30} />
      <CubeFace side="left" color="blue" dimension={30} />
      <CubeFace side="right" color="yellow" dimension={30} />
      <CubeFace side="top" color="magenta" dimension={30} />
      <CubeFace side="bottom" color="cyan" dimension={30} />
    </Scene>
  );
};

export default App;
