import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../store'

interface CarState {
  listed_cars: Array<any>,
  purchased_cars: Array<any>,
  initial_fetch_listed_cars: boolean,
  initial_fetch_purchased_cars: boolean,
  loading: boolean,
  purchasing: boolean,
  saving: boolean,
  deleting: boolean,
  filter_options: any
}

const default_filter_options = {
  variant: '',
  cost_from: '',
  cost_to: '',
  safetyRating: '',
  brand: ''
}

const initialState: CarState = {
    listed_cars: [],
    purchased_cars: [],
    initial_fetch_listed_cars: false,
    initial_fetch_purchased_cars: false,
    loading: false,
    purchasing: false,
    saving: false,
    deleting: false,
    filter_options: default_filter_options
}

export const carSlice = createSlice({
  name: 'car',
  initialState,
  reducers: {
    setListedCars: (state, action: PayloadAction<any>) => {
        state.listed_cars = action.payload;
        state.initial_fetch_listed_cars = true;
    },
    setPurchasedCars: (state, action: PayloadAction<any>) => {
        state.purchased_cars = action.payload;
        state.initial_fetch_purchased_cars = true;
    },
    addPurchasedCar: (state, action: PayloadAction<any>) => {
        state.purchased_cars.push({ ...action.payload });
    },
    addSavedCar: (state, action: PayloadAction<any>) => {
        if(state.listed_cars.find(c => c.id === action.payload.id)){
          state.listed_cars = state.listed_cars.map(c => c.id === action.payload.id ? { ...action.payload } : c);
        }
        else {
          state.listed_cars.push({ ...action.payload });
        }
    },
    deleteSavedCar: (state, action: PayloadAction<any>) => {
      state.listed_cars = state.listed_cars.filter(c => c.id !== action.payload);
    }, 
    updateStock: (state, action: PayloadAction<any>) => {
      state.listed_cars = state.listed_cars.map(c => c.id === action.payload.id ? { ...c, stock: action.payload.stock } : c);
    },
    setLoadingState: (state, action: PayloadAction<any>) => {
      state.loading = action.payload;
    },
    setPurchasingState : (state, action: PayloadAction<any>) => {
      state.purchasing = action.payload
    },
    setAddOrEditState: (state, action: PayloadAction<any>) => {
      state.saving = action.payload
    },
    setDeletingState: (state, action: PayloadAction<any>) => {
      state.deleting = action.payload
    },
    applyFilterOptions: (state, action: PayloadAction<any>) => {
      state.filter_options = action.payload
    },
    clearFilterOptions: (state) => {
      state.filter_options = default_filter_options
    },
  },
})

export const { setListedCars, setPurchasedCars, addPurchasedCar, addSavedCar, deleteSavedCar, setLoadingState, setDeletingState, setPurchasingState, setAddOrEditState, updateStock, applyFilterOptions, clearFilterOptions } = carSlice.actions

export const selectCarState = (state: RootState) => state.car

export default carSlice.reducer