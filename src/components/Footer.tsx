import * as React from 'react';
import { Box } from '@mui/material';

export const Footer = () => (
    <Box component="section" sx={{ p: 1, border: '1px dashed grey', textAlign: 'center' }}>
        <span>&copy; {new Date().getFullYear()}</span>
    </Box>
)