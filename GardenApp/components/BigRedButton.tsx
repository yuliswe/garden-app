import React, {useEffect, useRef} from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';

type RippleEffectProps = {
  maxSize: number;
  center: [number, number];
  play: boolean;
  duration: number;
  delay: number;
};
function RippleEffect(props: RippleEffectProps): JSX.Element {
  const progress = useRef(new Animated.Value(0)).current;
  const progress2 = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.loop(
      Animated.parallel([
        Animated.sequence([
          Animated.timing(progress, {
            toValue: 1,
            duration: props.duration,
            useNativeDriver: true,
          }),
          Animated.timing(progress, {
            toValue: 0,
            duration: 0,
            useNativeDriver: true,
          }),
        ]),
        Animated.sequence([
          Animated.delay(props.delay),
          Animated.timing(progress2, {
            toValue: 1,
            duration: props.duration,
            useNativeDriver: true,
          }),
          Animated.timing(progress2, {
            toValue: 0,
            duration: 0,
            useNativeDriver: true,
          }),
        ]),
      ]),
    ).start();
  }, [props.delay, props.duration, progress, progress2]);
  const styles = StyleSheet.create({
    common: {
      position: 'absolute',
      borderColor: '#4169e1',
      borderWidth: 5,
      borderRadius: props.maxSize / 2,
      width: props.maxSize,
      height: props.maxSize,
    } as const,
    ripple1: {
      transform: [{scaleX: progress}, {scaleY: progress}],
      opacity: Animated.subtract(1, progress),
    },
    ripple2: {
      transform: [{scaleX: progress2}, {scaleY: progress2}],
      opacity: Animated.subtract(1, progress2),
    },
  });
  return (
    <View>
      <Animated.View style={[styles.common, styles.ripple1]} />
      <Animated.View style={[styles.common, styles.ripple2]} />
    </View>
  );
}

type BigRedButtonProps = {
  size: number;
  pressed: boolean;
  onPress: () => void;
};
export function BigRedButton(props: BigRedButtonProps): JSX.Element {
  return (
    <TouchableHighlight
      onPress={props.onPress}
      style={{
        height: props.size,
        width: props.size,
        borderRadius: props.size / 2,
        // borderColor: 'black',
        // borderWidth: 1,
      }}>
      <View style={{flex: 1}}>
        <View
          style={{
            borderRadius: props.size / 2,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: props.pressed ? 'lightblue' : '#f0ffff',
            shadowColor: '#bbb',
            shadowOffset: {width: 0, height: 0},
            shadowRadius: 20,
            shadowOpacity: 0.8,
            position: 'absolute',
            height: '100%',
            width: '100%',
          }}>
          <Text>{props.pressed ? 'Stop water' : 'Start watering'}</Text>
        </View>
        {props.pressed && (
          <RippleEffect
            maxSize={props.size}
            center={[props.size / 2, props.size / 2]}
            play={props.pressed}
            duration={2000}
            delay={700}
          />
        )}
      </View>
    </TouchableHighlight>
  );
}
