export type EventListener<E> = (event: E) => void;

/**
 * The matrix representing a rotation.
 */
export type RotationMatrix = {
  m11: number;
  m12: number;
  m13: number;
  m21: number;
  m22: number;
  m23: number;
  m31: number;
  m32: number;
  m33: number;
};
