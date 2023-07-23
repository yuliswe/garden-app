import {PayloadAction, createSlice} from '@reduxjs/toolkit';

interface TimerState {
  defaultTimerOption: number;
  selectedWaterSeconds: number;
}

const initialState: TimerState = {
  defaultTimerOption: 5,
  selectedWaterSeconds: 5 * 60,
};

const timerSlice = createSlice({
  name: 'timer',
  initialState,
  reducers: {
    setSelectedWaterSeconds: (state, {payload}: PayloadAction<number>) => {
      state.selectedWaterSeconds = payload;
    },
  },
});

export const {setSelectedWaterSeconds} = timerSlice.actions;
export default timerSlice.reducer;
