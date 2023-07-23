/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text} from 'react-native';

type TimerProps = {
  seconds: number;
};
export function Timer(props: TimerProps): JSX.Element {
  const hours = '00';
  const minutes = `${Math.floor(props.seconds / 60)}`.padStart(2, '0');
  const seconds = `${props.seconds % 60}`.padStart(2, '0');
  return (
    <Text
      style={{
        fontSize: 40,
        fontFamily: 'Courier',
      }}>
      00:{minutes}:{seconds}
    </Text>
  );
}
