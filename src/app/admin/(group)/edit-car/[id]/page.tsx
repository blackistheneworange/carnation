'use client'

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store";

import { Grid } from "@mui/material";
import { addSavedCar, setAddOrEditState } from "@/lib/features/car/carSlice";

import { showNotification } from "@/lib/features/notification/notificationSlice";
import CarForm from "@/components/CarForm";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FullPageLoader } from "@/components/FullPageLoader";

export default function EditCar({ params }: any) {
  const dispatch = useDispatch();
  const router = useRouter();

  const [editCarData, setEditCarData] = React.useState<any>();

  const item_id = (React.use(params) as any).id;

  useEffect(() => {
    if(!editCarData && item_id){
        axios.get(`/api/admin/cars?id=${item_id}`)
        .then(res => {
            setEditCarData({ ...res.data });
        })
        .catch((err) => {
            setEditCarData({ });
            dispatch(showNotification({
                message: err.response?.data?.message || err.message || err,
                type: 'error'
            }))
        })
    }
  }, [item_id])

  const onUpdate = async (form_data: any) => {
    try {
      dispatch(setAddOrEditState(true));
      const res = await axios.put('/api/admin/cars', { ...form_data, id: editCarData.id });

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

  if(!editCarData){
    return <FullPageLoader />
  }

  return (
    <Grid container spacing={2} style={{ padding:'24px'}}>
      <CarForm handleSubmit={onUpdate} edit_data={editCarData} />
    </Grid>
  );
}