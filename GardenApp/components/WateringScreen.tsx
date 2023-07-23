import React, {useEffect} from 'react';
import {
  ActionSheetIOS,
  Animated,
  SafeAreaView,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import type {RootStackParamList} from '../App';
import {setSelectedWaterSeconds} from '../features/timer/timerSlice';
import {useAppDispatch, useAppSelector} from '../hooks';
import {BigRedButton} from './BigRedButton';
import {Timer} from './Timer';

function setNewProgress(progress: Animated.Value, percent: number) {
  Animated.timing(progress, {
    toValue: percent,
    duration: 100,
    useNativeDriver: true,
  }).start();
}

export function WateringScreen({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'WateringScreen'>): JSX.Element {
  const timerState = useAppSelector(state => state.timer);
  const dispatch = useAppDispatch();

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const timerOptions = [1, 5, 10, 15, 30];

  const [isWatering, setIsWatering] = React.useState(false);
  const [remainingWaterSeconds, setRemainingWaterSeconds] = React.useState(
    timerState.defaultTimerOption * 60,
  );
  const interval = React.useRef<NodeJS.Timeout | undefined>(undefined);
  const progress = React.useRef(new Animated.Value(0)).current;

  function stopWater() {
    setIsWatering(false);
    clearInterval(interval.current);
  }
  function resetWater() {
    stopWater();
    setIsWatering(false);
    progress.setValue(0);
    setRemainingWaterSeconds(timerState.selectedWaterSeconds);
  }
  function onWaterComplete() {
    resetWater();
    navigation.navigate('SuccessScreen');
  }
  useEffect(() => {
    if (isWatering) {
      interval.current = setInterval(() => {
        setRemainingWaterSeconds(seconds => seconds - 1);
      }, 1000);
    } else {
      clearInterval(interval.current);
    }
    return () => {
      clearInterval(interval.current);
    };
  }, [isWatering]);

  useEffect(() => {
    setNewProgress(
      progress,
      (timerState.selectedWaterSeconds - remainingWaterSeconds + 1) /
        timerState.selectedWaterSeconds,
    );
    if (remainingWaterSeconds <= 0) {
      onWaterComplete();
    }
  }, [remainingWaterSeconds]);

  const [screenHeight, setScreenHeight] = React.useState(0);

  return (
    <SafeAreaView style={backgroundStyle}>
      <View
        onLayout={event => {
          setScreenHeight(event.nativeEvent.layout.height);
        }}
        style={{
          alignItems: 'center',
          height: '100%',
        }}>
        <Animated.View
          style={{
            height: '100%',
            width: '100%',
            position: 'absolute',
            backgroundColor: '#b0e0e6',
            // borderColor: 'red',
            // borderWidth: 1,
            transform: [
              {
                translateY: Animated.multiply(
                  screenHeight,
                  Animated.subtract(1, progress),
                ),
              },
            ],
          }}
        />
        <TouchableOpacity
          disabled={isWatering}
          onPress={() => {
            ActionSheetIOS.showActionSheetWithOptions(
              {
                options: [
                  ...timerOptions.map(t =>
                    t === 1 ? `${t} min` : `${t} mins`,
                  ),
                  'Cancel',
                ],
                cancelButtonIndex: timerOptions.length,
                cancelButtonTintColor: 'red',
              },
              buttonIndex => {
                if (buttonIndex < timerOptions.length) {
                  const selectedSeconds = timerOptions[buttonIndex] * 60;
                  dispatch(setSelectedWaterSeconds(selectedSeconds));
                  setRemainingWaterSeconds(selectedSeconds);
                }
              },
            );
          }}
          style={{
            flex: 1,
            justifyContent: 'center',
            // borderWidth: 1,
            // borderColor: 'red',
          }}>
          <Timer seconds={remainingWaterSeconds} />
        </TouchableOpacity>
        <View
          style={{
            flex: 1,
            // borderWidth: 1,
            // borderColor: 'red',
          }}>
          <BigRedButton
            size={200}
            pressed={isWatering}
            onPress={() => {
              if (isWatering) {
                setIsWatering(false);
              } else {
                setIsWatering(true);
              }
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
