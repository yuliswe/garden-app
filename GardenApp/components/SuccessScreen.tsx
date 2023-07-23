import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import {RootStackParamList} from '../App';
import {useAppSelector} from '../hooks';

export function SuccessScreen({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'SuccessScreen'>): JSX.Element {
  const timerState = useAppSelector(state => state.timer);
  return (
    <SafeAreaView style={{backgroundColor: 'lightblue', flex: 1}}>
      <View style={{margin: 15, gap: 20}}>
        <Text style={{fontSize: 22}}>Your plants are no longer thirsty.</Text>
        <Text>
          Total watering minutes:{' '}
          {Math.floor(timerState.selectedWaterSeconds / 60)}
        </Text>
      </View>
    </SafeAreaView>
  );
}
