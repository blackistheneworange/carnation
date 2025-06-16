'use client'

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store";

import { Grid, Typography } from "@mui/material";
import { ListedCarInfo } from "@/components/ListedCarInfo";
import { useEffect } from "react";
import { addPurchasedCar, deleteSavedCar, setDeletingState, setListedCars, setLoadingState, setPurchasingState, updateStock } from "@/lib/features/car/carSlice";

import axios from "axios";
import { FullPageLoader } from "@/components/FullPageLoader";
import { showNotification } from "@/lib/features/notification/notificationSlice";
import { ListedCarManage } from "@/components/ListedCarManage";
import { filterCarData } from "@/utils/filterCarData";

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

  const onDelete = async (carId: any) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
        try {
            dispatch(setDeletingState(true));
            const res = await axios.delete(`/api/admin/cars?id=${carId}`);

            dispatch(deleteSavedCar(res.data.id));
            dispatch(showNotification({ 
                message: 'Deleted successfully',
                type: 'success'
            }));
        }
        catch(err: any) {
            dispatch(showNotification({ 
            message: err.response?.data?.message || err.message || err,
            type: 'error'
            }));
        }
        finally {
            dispatch(setDeletingState(false));
        }
    }
  }

  if(car_data.loading) return <FullPageLoader />;
  
  const filtered_car_data = filterCarData(car_data.listed_cars, car_data.filter_options) as Array<any>;

  return (
    <Grid container spacing={2} style={{ padding:'24px'}}>
      {filtered_car_data.length === 0 ?
        <Typography>No data to display</Typography>
      : filtered_car_data.map(car =>
        <Grid key={car.id} size={{ xs: 6, md: 4, lg: 2 }}>
          <ListedCarManage {...car} onDelete={onDelete} />
        </Grid>
      )}
  </Grid>
  );
}
