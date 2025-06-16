'use client'

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store";

import { Grid, Typography } from "@mui/material";
import { useEffect } from "react";
import { setLoadingState, setPurchasedCars } from "@/lib/features/car/carSlice";
import { PurchasedCarInfo } from "@/components/PurchasedCarInfo";
import { FullPageLoader } from "@/components/FullPageLoader";
import axios from "axios";
import { showNotification } from "@/lib/features/notification/notificationSlice";

export default function PurchasedCars() {
  const car_data = useSelector((state: RootState) => state.car);
  const dispatch = useDispatch();

  useEffect(() => {
    if(!car_data.initial_fetch_purchased_cars){
      dispatch(setLoadingState(true));
      axios('/api/cars/purchase')
      .then(res => {
        dispatch(setPurchasedCars(res.data));
      })
      .catch(err => {
        dispatch(showNotification({ 
          message: err.response?.data?.message || err.message || err,
          type: 'error'
        }));
      })
      .finally(() => {
        dispatch(setLoadingState(false));
      })
    }
  }, [])

  if(car_data.loading) return <FullPageLoader />;

  return (
    <Grid container spacing={2} style={{ padding:'24px'}}>
      {car_data.purchased_cars.length === 0 ?
        <Typography>No data to display</Typography>
      : car_data.purchased_cars.map(car =>
        <Grid key={car.id} size={{ xs: 6, md: 4, lg: 2 }}>
          <PurchasedCarInfo {...car} />
        </Grid>
      )}
    </Grid>
  );
}
