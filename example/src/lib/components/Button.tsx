import { PropsWithChildren } from 'react';
import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';

export const Button = (props: PropsWithChildren<TouchableOpacityProps>) => {
  return (
    <TouchableOpacity
      {...props}
      style={{
        paddingHorizontal: 18,
        paddingVertical: 12,
        backgroundColor: 'black',
        borderRadius: 24,
        ...((props.style as object) || {})
      }}
      activeOpacity={0.7}
    >
      <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>
        {props.children}
      </Text>
    </TouchableOpacity>
  );
};
