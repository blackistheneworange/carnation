import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { FormControl, FormLabel, InputLabel, Select, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import { applyFilterOptions, clearFilterOptions } from '@/lib/features/car/carSlice';

export default function FilterMenu() {
    const filter_options = useSelector((state: RootState) => state.car.filter_options);
    const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [filterInputs, setFilterInputs] = React.useState({
      variant: '',
      cost_from: '',
      cost_to: '',
      brand: '',
      safetyRating: ''
  });

  const open = Boolean(anchorEl);

  React.useEffect(() => {
    setFilterInputs({ ...filter_options });
  }, [filter_options])

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (ev: any) => {
    const name = ev?.currentTarget?.name || ev.target.name;

    setFilterInputs({
        ...filterInputs,
        [name]: ev?.currentTarget?.value || ev.target.value
    })
  }

  const onApply = () => {
    handleClose();
    dispatch(applyFilterOptions(filterInputs));
  }

  const onClear = () => {
    handleClose();
    dispatch(clearFilterOptions());
  }

  return (
    <div>
      <Button
        id="filter"
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        style={{ marginRight: '12px' }}
      >
        Filter
      </Button>
      <Menu
        id="filter-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem>
            <FormControl fullWidth style={{ marginTop: '12px' }}>
                <InputLabel id="variantLabel">Variant</InputLabel>
                <Select
                    labelId="variantLabel"
                    name="variant"
                    id="variant"
                    label="Variant"
                    value={filterInputs.variant}
                    onChange={handleChange}
                >
                    <MenuItem value={'Petrol'}>Petrol</MenuItem>
                    <MenuItem value={'Diesel'}>Diesel</MenuItem>
                    <MenuItem value={'EV'}>EV</MenuItem>
                </Select>
            </FormControl>
        </MenuItem>

        <MenuItem>
            <FormControl>
                <FormLabel htmlFor="cost_from">Cost From</FormLabel>
                <TextField
                    name="cost_from"
                    type="number"
                    id="cost_from"
                    value={filterInputs.cost_from}
                    onChange={handleChange}
                    required
                    variant="outlined"
                />
            </FormControl>
            
            <FormControl>
                <FormLabel htmlFor="cost_to">Cost To</FormLabel>
                <TextField
                    name="cost_to"
                    type="number"
                    id="cost_to"
                    value={filterInputs.cost_to}
                    onChange={handleChange}
                    required
                    variant="outlined"
                />
            </FormControl>
        </MenuItem>

        <MenuItem>
            <FormControl>
                <FormLabel htmlFor="brand">Brand</FormLabel>
                <TextField
                    name="brand"
                    type="text"
                    id="brand"
                    value={filterInputs.brand}
                    onChange={handleChange}
                    required
                    variant="outlined"
                />
            </FormControl>
        </MenuItem>
        
        <MenuItem>
            <FormControl fullWidth style={{ marginTop: '12px' }}>
                <InputLabel id="safetyRatingLabel">Safety Rating</InputLabel>
                <Select
                    labelId="safetyRatingLabel"
                    name="safetyRating"
                    id="safetyRating"
                    label="Safety Rating"
                    value={filterInputs.safetyRating}
                    onChange={handleChange}
                >
                    <MenuItem value={5}>5</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={1}>1</MenuItem>
                </Select>
            </FormControl>
        </MenuItem>

        <MenuItem>
            <Button onClick={onApply}>Apply</Button>
            <Button onClick={onClear}>Clear</Button>
        </MenuItem>
      </Menu>
    </div>
  );
}