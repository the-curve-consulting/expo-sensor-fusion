import { forwardRef } from 'react';
import { DoubleSide, Mesh } from 'three';

const NINETY_DEG = Math.PI / 2;

type CubeFaceSide = 'left' | 'right' | 'front' | 'back' | 'top' | 'bottom';

type CubeFaceProps = {
  side: CubeFaceSide;
  dimension: number;
  color: string;
};

export const CubeFace = forwardRef<Mesh, CubeFaceProps>(
  ({ side, dimension }, ref) => {
    return (
      <mesh
        ref={ref}
        position={getPositionForCubeFaceSide(side, dimension)}
        rotation={getRotationForCubeFaceSide(side)}
      >
        <planeGeometry args={[dimension, dimension]} />
        <meshStandardMaterial color="green" side={DoubleSide} />
      </mesh>
    );
  }
);

const getPositionForCubeFaceSide = (
  side: CubeFaceSide,
  dimension: number
): [number, number, number] => {
  switch (side) {
    case 'front':
      return [0, 0, 0];

    case 'back':
      return [0, 0, dimension];

    case 'left':
      return [-(dimension / 2), 0, dimension / 2];

    case 'right':
      return [dimension / 2, 0, dimension / 2];

    case 'top':
      return [0, dimension / 2, dimension / 2];

    case 'bottom':
      return [0, -(dimension / 2), dimension / 2];
  }
};

const getRotationForCubeFaceSide = (
  side: CubeFaceSide
): [number, number, number] | undefined => {
  switch (side) {
    case 'front':
      return undefined;

    case 'back':
      return undefined;

    case 'left':
    case 'right':
      return [0, NINETY_DEG, 0];

    case 'top':
    case 'bottom':
      return [NINETY_DEG, 0, 0];
  }
};
