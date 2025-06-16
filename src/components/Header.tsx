'use client'

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from 'next/link';

export const Header = () => {

    return(
        <AppBar color='default' position='relative' style={{ height:'9%' }}>
            <Toolbar style={{ height:'100%' }}>
                <Typography
                    variant="h6"
                    sx={{ flexGrow: 1, cursor: 'pointer', textDecoration: 'none' }}
                >
                    <Link
                        href="/"
                    >
                        CarNation
                    </Link>
                </Typography>
            </Toolbar>
        </AppBar>
    )
}