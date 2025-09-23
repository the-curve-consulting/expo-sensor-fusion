import { ExpoSensorFusion } from '@the-curve-consulting/expo-sensor-fusion';
import { useEffect, useRef } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
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
          matrix.m11, matrix.m21, matrix.m31,
          matrix.m12, matrix.m22, matrix.m32,
          matrix.m13, matrix.m23, matrix.m33
        );

        textRef.current?.setText(
          `1,1:\t\t${matrix.m11}\n` +   
          `1,2:\t\t${matrix.m12}\n` +   
          `1,3:\t\t${matrix.m13}\n\n` + 
          `2,1:\t\t${matrix.m21}\n` +   
          `2,2:\t\t${matrix.m22}\n` +   
          `2,3:\t\t${matrix.m23}\n\n` + 
          `3,1:\t\t${matrix.m31}\n` +   
          `3,2:\t\t${matrix.m32}\n` +   
          `3,3:\t\t${matrix.m33}`
        );
      });

    return () => {
      rotationUpdateSubscription.remove();
    };
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center'
      }}
    >
      <FloatingBackButton onBack={onBack} />

      <View style={{ padding: 24 }}>
        <ImperativeTextWithLabel ref={textRef} label="Rotation matrix:" />

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
      </View>
    </SafeAreaView>
  );
};
