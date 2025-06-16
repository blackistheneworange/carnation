'use client'

import { Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemText, styled } from "@mui/material"
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Link from "next/link";

const drawerWidth = 240;

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  }));

export const DashboardDrawer = ({ open, handleDrawerClose, navItems }: any) => {

    return (
        <Drawer
            sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
                width: drawerWidth,
                boxSizing: 'border-box',
            },
            }}
            anchor="left"
            open={open}
        >
            <DrawerHeader>
                <IconButton onClick={handleDrawerClose}>
                    <ChevronLeftIcon />
                </IconButton>
            </DrawerHeader>
            <Divider />
            <List>
            {navItems.map(({ name, path }: any) => (
                <ListItem key={name} component={Link} href={path} onClick={handleDrawerClose} disablePadding>
                    <ListItemButton>
                        <ListItemText primary={name} />
                    </ListItemButton>
                </ListItem>
            ))}
            </List>
        </Drawer>
    )
}