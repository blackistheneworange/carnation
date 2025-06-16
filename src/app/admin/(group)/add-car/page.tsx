'use client'

import React from "react";
import { useDispatch } from "react-redux";

import { Grid } from "@mui/material";
import { addSavedCar, setAddOrEditState } from "@/lib/features/car/carSlice";

import { showNotification } from "@/lib/features/notification/notificationSlice";
import CarForm from "@/components/CarForm";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function AddCar() {
  const dispatch = useDispatch();
  const router = useRouter();

  const onAdd = async (form_data: any) => {
    try {
      dispatch(setAddOrEditState(true));
      const res = await axios.post('/api/admin/cars', { ...form_data });

      dispatch(showNotification({ 
        message: 'Saved successfully',
        type: 'success'
      }));
      dispatch(addSavedCar({ ...res.data }));

      router.push('/admin');
    }
    catch(err: any) {
      dispatch(showNotification({ 
        message: err.response?.data?.message || err.message || err,
        type: 'error'
      }));
    }
    finally {
      dispatch(setAddOrEditState(false));
    }
  }

  return (
    <Grid container spacing={2} style={{ padding:'24px'}}>
      <CarForm handleSubmit={onAdd} />
    </Grid>
  );
}
