import { Box, Container } from '@mui/material'
import React from 'react'
import { Outlet } from 'react-router-dom'
import { Navbar } from '.'

const Layout = () => {
    return (
        <Box>
            <Navbar />
            <Outlet />
        </Box >
    )
}

export default Layout