'use client'

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store";

import { Grid, Typography } from "@mui/material";
import { ListedCarInfo } from "@/components/ListedCarInfo";
import { useEffect } from "react";
import { addPurchasedCar, setListedCars, setLoadingState, setPurchasingState, updateStock } from "@/lib/features/car/carSlice";

import axios from "axios";
import { FullPageLoader } from "@/components/FullPageLoader";
import { showNotification } from "@/lib/features/notification/notificationSlice";

const applyFilterOptions = (data: any, filter: any) => {
  return data.filter((d: any) => {
    if(
      (filter.brand.length === 0 || d.brand?.toLowerCase() === filter.brand?.toLowerCase()) &&
      (filter.variant.length === 0 || d.variant?.toLowerCase() === filter.variant?.toLowerCase()) &&
      (filter.cost_from.length === 0 || parseInt(d.cost) >= parseInt(filter.cost_from)) &&
      (filter.cost_to.length === 0 || parseInt(d.cost) <= parseInt(filter.cost_to)) &&
      (filter.safetyRating.length === 0 || parseInt(d.safetyRating) == parseInt(filter.safetyRating))
    ){
      return true;
    }
    return false;
  });
}

export default function ListedCars() {
  const car_data = useSelector((state: RootState) => state.car);
  const dispatch = useDispatch();

  useEffect(() => {
    if(!car_data.initial_fetch_listed_cars){
      dispatch(setLoadingState(true));
      axios('/api/cars/list')
      .then(res => {
        dispatch(setListedCars(JSON.parse(res.data)))
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

  const onPurchase = async (carInfo: any) => {
    if (window.confirm("Are you sure you want to buy this car?")) {
      try {
        dispatch(setPurchasingState(true));
        const res = await axios.post('/api/cars/purchase', { ...carInfo });

        dispatch(showNotification({ 
          message: 'Purchased successfully',
          type: 'success'
        }));
        dispatch(updateStock({
          id: carInfo.id,
          stock: carInfo.stock-1
        }));
        dispatch(addPurchasedCar({ ...res.data }));
      }
      catch(err: any) {
        dispatch(showNotification({ 
          message: err.response?.data?.message || err.message || err,
          type: 'error'
        }));
      }
      finally {
        dispatch(setPurchasingState(false));
      }
    }
  }

  if(car_data.loading) return <FullPageLoader />;

  const filtered_car_data = applyFilterOptions(car_data.listed_cars, car_data.filter_options) as Array<any>;

  return (
    <Grid container spacing={2} style={{ padding:'24px'}}>
      {filtered_car_data.length === 0 ?
        <Typography>No data to display</Typography>
      : filtered_car_data.map((car: any) =>
        <Grid key={car.id} size={{ xs: 6, md: 4, lg: 2 }}>
          <ListedCarInfo {...car} onPurchase={onPurchase} />
        </Grid>
      )}
  </Grid>
  );
}
