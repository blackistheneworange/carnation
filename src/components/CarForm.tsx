'use client'

import React from "react";
import { useSelector } from "react-redux";

import { Box, Button, FormControl, FormHelperText, FormLabel, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";

import { RootState } from "@/lib/store";

export default function CarForm({ handleSubmit, edit_data }: any) {
    const is_saving = useSelector((state: RootState) => state.car.saving) as boolean;
  
    const [brandError, setBrandError] = React.useState(false);
    const [brandErrorMessage, setBrandErrorMessage] = React.useState('');
    const [modelError, setModelError] = React.useState(false);
    const [modelErrorMessage, setModelErrorMessage] = React.useState('');
    const [variantError, setVariantError] = React.useState(false);
    const [variantErrorMessage, setVariantErrorMessage] = React.useState('');
    const [costError, setCostError] = React.useState(false);
    const [costErrorMessage, setCostErrorMessage] = React.useState('');
    const [safetyRatingError, setSafetyRatingError] = React.useState(false);
    const [safetyRatingErrorMessage, setSafetyRatingErrorMessage] = React.useState('');
    const [stockError, setStockError] = React.useState(false);
    const [stockErrorMessage, setStockErrorMessage] = React.useState('');

    const [inputs, setInputs] = React.useState({
        brand: '',
        model: '',
        variant: '',
        cost: '',
        safetyRating: '',
        stock: ''
    })

  React.useEffect(() => {
    setInputs({
      ...edit_data
    })
  }, [edit_data])

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (brandError || modelError || costError || safetyRatingError || variantError || stockError) {
        return;
    }

    handleSubmit(inputs)
    .then(() => {
        if(!edit_data?.id){
            setInputs({
                brand: '',
                model: '',
                variant: '',
                cost: '',
                safetyRating: '',
                stock: ''
            })
        }
    })
  }

  const handleChange = (ev: any) => {
    const name = ev?.currentTarget?.name || ev.target.name;

    setInputs({
        ...inputs,
        [name]: ev?.currentTarget?.value || ev.target.value
    })
  }

  const validateInputs = () => {
    let isValid = true;

    if (!inputs.model) {
        setModelError(true);
        setModelErrorMessage('Please enter car model.');
        isValid = false;
    } else {
        setModelError(false);
        setModelErrorMessage('');
    }

    if (!inputs.brand) {
        setBrandError(true);
        setBrandErrorMessage('Please enter car brand.');
        isValid = false;
    } else {
        setBrandError(false);
        setBrandErrorMessage('');
    }

    if (!inputs.variant) {
        setVariantError(true);
        setVariantErrorMessage('Please select a car variant.');
        isValid = false;
    } else {
        setVariantError(false);
        setVariantErrorMessage('');
    }

    if (!inputs.safetyRating) {
        setSafetyRatingError(true);
        setSafetyRatingErrorMessage('Please select a safety rating.');
        isValid = false;
    } else {
        setSafetyRatingError(false);
        setSafetyRatingErrorMessage('');
    }
    
    if (!inputs.cost) {
        setCostError(true);
        setCostErrorMessage('Please enter a valid cost value.');
        isValid = false;
    } else {
        setCostError(false);
        setCostErrorMessage('');
    }
    
    if (!inputs.stock) {
        setStockError(true);
        setStockErrorMessage('Please enter a valid stock value.');
        isValid = false;
    } else {
        setStockError(false);
        setStockErrorMessage('');
    }

    return isValid;
  };

  return (
    <Box
            component="form"
            onSubmit={onSubmit}
            noValidate
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              gap: 2,
            }}
          >
            <FormControl>
              <FormLabel htmlFor="brand">Brand</FormLabel>
              <TextField
                error={brandError}
                helperText={brandErrorMessage}
                id="brand"
                name="brand"
                value={inputs.brand}
                onChange={handleChange}
                placeholder="Tata"
                autoFocus
                required
                variant="outlined"
                color={brandError ? 'error' : 'primary'}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="model">Model</FormLabel>
              <TextField
                error={modelError}
                helperText={modelErrorMessage}
                name="model"
                placeholder="Harrier"
                value={inputs.model}
                onChange={handleChange}
                id="model"
                required
                variant="outlined"
                color={modelError ? 'error' : 'primary'}
              />
            </FormControl>
            <FormControl fullWidth style={{ marginTop: '12px' }} error={variantError}>
                <InputLabel id="variantLabel">Variant</InputLabel>
                <Select
                    labelId="variantLabel"
                    name="variant"
                    id="variant"
                    label="Variant"
                    value={inputs.variant}
                    onChange={handleChange}
                >
                    <MenuItem value={'Petrol'}>Petrol</MenuItem>
                    <MenuItem value={'Diesel'}>Diesel</MenuItem>
                    <MenuItem value={'EV'}>EV</MenuItem>
                </Select>
                {variantError && <FormHelperText>{variantErrorMessage}</FormHelperText>}
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="cost">Cost</FormLabel>
              <TextField
                error={costError}
                helperText={costErrorMessage}
                name="cost"
                type="number"
                id="cost"
                value={inputs.cost}
                onChange={handleChange}
                required
                variant="outlined"
                color={costError ? 'error' : 'primary'}
              />
            </FormControl>
            <FormControl fullWidth style={{ marginTop: '12px' }} error={safetyRatingError}>
                <InputLabel id="safetyRatingLabel">Safety Rating</InputLabel>
                <Select
                    labelId="safetyRatingLabel"
                    name="safetyRating"
                    id="safetyRating"
                    label="Safety Rating"
                    value={inputs.safetyRating}
                    onChange={handleChange}
                >
                    <MenuItem value={5}>5</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={1}>1</MenuItem>
                </Select>
                {safetyRatingError && <FormHelperText>{safetyRatingErrorMessage}</FormHelperText>}
            </FormControl>
            
            <FormControl>
              <FormLabel htmlFor="stock">Stock Quantity</FormLabel>
              <TextField
                error={stockError}
                helperText={stockErrorMessage}
                name="stock"
                type="number"
                id="stock"
                value={inputs.stock}
                onChange={handleChange}
                required
                variant="outlined"
                color={stockError ? 'error' : 'primary'}
              />
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={validateInputs}
              disabled={is_saving}
            >
              {is_saving ? 'Saving...' : 'Save'}
            </Button>
    </Box>
  );
}
