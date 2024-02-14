import { View } from 'react-native';

import { Button } from './Button';

type BackButtonProps = {
  onBack: () => void;
};

export const FloatingBackButton = ({ onBack }: BackButtonProps) => {
  return (
    <View
      style={{
        position: 'absolute',
        top: 24,
        left: 24
      }}
    >
      <Button onPress={onBack}>⬅️ Back</Button>
    </View>
  );
};
