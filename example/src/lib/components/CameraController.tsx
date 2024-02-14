import { useThree } from '@react-three/fiber';
import { ExpoSensorFusion } from 'expo-sensor-fusion';
import { useEffect, useRef } from 'react';
import { Matrix4 } from 'three';

export const CameraController = () => {
  const { camera } = useThree();

  const matrixRef = useRef(new Matrix4());

  useEffect(() => {
    const rotationUpdateSubscription =
      ExpoSensorFusion.addRotationUpdateListener((event) => {
        const matrix = event.rotationMatrix;

        matrixRef.current.set(
          matrix.m11, matrix.m21, matrix.m31, 0, // eslint-disable-line prettier/prettier
          matrix.m12, matrix.m22, matrix.m32, 0, // eslint-disable-line prettier/prettier
          matrix.m13, matrix.m23, matrix.m33, 0, // eslint-disable-line prettier/prettier
          0, 0, 0, 0                             // eslint-disable-line prettier/prettier
        );

        camera.rotation.setFromRotationMatrix(matrixRef.current);
      });
    return () => {
      rotationUpdateSubscription.remove();
    };
  }, []);

  return null;
};
