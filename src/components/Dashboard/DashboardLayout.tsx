'use client'

import * as React from 'react';
import Paper from '@mui/material/Paper';
import { IconButton, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { DashboardDrawer } from './DashboardDrawer';
import { usePathname } from 'next/navigation';
import { Toast } from '../Toast';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import { hideNotification } from '@/lib/features/notification/notificationSlice';
import FilterMenu from '../FilterMenu';

export const DashboardLayout = ({ navItems, children }: any) => {
    const notification = useSelector((state: RootState) => state.notification);
    const dispatch = useDispatch();

    const [open, setOpen] = React.useState(false);
    const pathname = usePathname();
    
    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleNotificationClose = () => {
        dispatch(hideNotification());
    }

    return (
        <Paper>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={[
                        {
                            mr: 2,
                        },
                        open && { display: 'none' },
                        ]}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        {navItems.find((item: any) => item.path === pathname)?.name}
                    </Typography>
                    
                </Toolbar>
                <FilterMenu/>
            </div>
            <DashboardDrawer open={open} handleDrawerClose={handleDrawerClose} navItems={navItems} />

            {children}

            <Toast
                open={notification.open}
                message={notification.message}
                handleClose={handleNotificationClose}
                type={notification.type} 
            />
        </Paper>
    );
};