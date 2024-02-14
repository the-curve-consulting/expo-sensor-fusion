import { forwardRef, useImperativeHandle, useRef } from 'react';
import { Text, TextInput, View } from 'react-native';

export type ImperativeTextWithLabelProps = {
  label: string;
  text: string;
};

export type ImperativeTextWithLabelRef = {
  setText: (text?: string) => void;
};

/**
 * A component to be used for displaying text that allows for imperative updates,
 * that is, avoiding delays caused by {@link React#useState[setState]}.
 *
 * @example
 * ```tsx
 * const MyComponent = () => {
 *   const imperativeTextRef = useRef<ImperativeTextWithLabelRef>(null!);
 *
 *   useEffect(() => {
 *     SomeEventEmitter.addListener((text: string) => {
 *        // This won't cause the component to re-render and will update the text for faster
 *        // text updates than using useState.
 *        imperativeTextRef.setText(text);
 *     });
 *   });
 *
 *   return (
 *     <ImperativeTextWithLabel ref={imperativeTextRef} label="Example" text="Initial text" />
 *   )
 * }
 * ```
 */
export const ImperativeTextWithLabel = forwardRef<
  ImperativeTextWithLabelRef,
  ImperativeTextWithLabelProps
>(({ label, text }, ref) => {
  const textInputRef = useRef<TextInput>(null);

  useImperativeHandle(
    ref,
    () => {
      return {
        setText(text) {
          textInputRef.current?.setNativeProps({ text });
        }
      };
    },
    []
  );

  return (
    <View
      style={{
        backgroundColor: '#e5e5e5',
        padding: 12,
        borderRadius: 18
      }}
    >
      <Text style={{ fontWeight: 'bold', marginBottom: 2 }}>{label}</Text>

      <TextInput
        ref={textInputRef}
        style={{ color: '#0A0908' }}
        value={text}
        editable={false}
        pointerEvents="none"
        multiline
      />
    </View>
  );
});
