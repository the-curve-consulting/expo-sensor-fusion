import { ExpoSensorFusion } from 'expo-sensor-fusion';
import { useEffect, useRef, useState } from 'react';
import { SafeAreaView, Text, TextInput } from 'react-native';
import { Matrix3 } from 'three';

import { FloatingBackButton } from '../lib/components/FloatingBackButton';
import {
  ImperativeTextWithLabel,
  ImperativeTextWithLabelRef
} from '../lib/components/ImperativeTextWithLabel';

export type ExpoSensorFusionDebugScreenName = 'ExpoSensorFusionDebugScreen';

type ExpoSensorFusionDebugScreenProps = {
  onBack: () => void;
};

export const ExpoSensorFusionDebugScreen = ({
  onBack
}: ExpoSensorFusionDebugScreenProps) => {
  const matrixRef = useRef(new Matrix3());
  const textRef = useRef<ImperativeTextWithLabelRef>(null);

  useEffect(() => {
    const rotationUpdateSubscription =
      ExpoSensorFusion.addRotationUpdateListener((event) => {
        if (!textRef.current) {
          return;
        }

        const matrix = event.rotationMatrix;
        matrixRef.current.set(
          matrix.m11, matrix.m21, matrix.m31, // eslint-disable-line prettier/prettier
          matrix.m12, matrix.m22, matrix.m32, // eslint-disable-line prettier/prettier
          matrix.m13, matrix.m23, matrix.m33, // eslint-disable-line prettier/prettier
        );

        // textRef.current?.setText(
        //   `1,1:\t\t${matrix.m11}\n` +     // eslint-disable-line
        //   `1,2:\t\t${matrix.m12}\n` +     // eslint-disable-line
        //   `1,3:\t\t${matrix.m13}\n\n` +     // eslint-disable-line
        //   `2,1:\t\t${matrix.m21}\n` + // eslint-disable-line
        //   `2,2:\t\t${matrix.m22}\n` +     // eslint-disable-line
        //   `2,3:\t\t${matrix.m23}\n\n` +     // eslint-disable-line
        //   `3,1:\t\t${matrix.m31}\n` +     // eslint-disable-line
        //   `3,2:\t\t${matrix.m32}\n` +     // eslint-disable-line
        //   `3,3:\t\t${matrix.m33}`           // eslint-disable-line
        // );
      });

    return () => {
      rotationUpdateSubscription.remove();
    };
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center',
        padding: 24
      }}
    >
      <FloatingBackButton onBack={onBack} />

      <ImperativeTextWithLabel
        ref={textRef}
        label="Rotation matrix:"
        text="Waiting for data..."
      />

      <Text
        style={{
          textAlign: 'center',
          marginTop: 12,
          color: 'grey',
          fontSize: 13
        }}
      >
        Rotate your device (and/or yourself) around to see the values change.
      </Text>
    </SafeAreaView>
  );
};
