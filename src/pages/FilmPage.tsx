import React, { useState } from 'react'
import { useLoaderData } from 'react-router-dom'
import { fetchMovies, showPoepleFromMovie } from '../api/moviesApi'
import { Box, Typography } from '@mui/material'
import Grid from '@mui/system/Unstable_Grid'
import { FilmCard } from '../components'
import { Film } from '../interfaces/Films'
import { People } from '../interfaces/People'
import { DataGrid, GridColDef } from '@mui/x-data-grid'

const FilmPage = () => {
    const loaderData = useLoaderData() as Film[]
    const [people, setPeople] = useState<People[]>([])
    const [movie, setMovie] = useState<Film>()
    const handleOnClick = async (movie: Film) => {
        const res = await showPoepleFromMovie(movie)
        setPeople(res)
        setMovie(movie)
    }

    const columns: GridColDef[] = [
        {
            field: 'name',
            headerName: 'Character Name',
            width: 150,
        },
        {
            field: 'gender',
            headerName: 'gender',
            width: 150,
        },
        {
            field: 'birth_year',
            headerName: 'Birth Year',
            width: 150,
        },
        {
            field: 'mass',
            headerName: 'Mass',
            width: 150
        }
    ]

    return (
        <Box>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {loaderData.map((film, id) => (
                    <Grid xs={2} sm={4} md={4} key={id} >
                        <FilmCard movie={film} handleOnClick={() => handleOnClick(film)} />
                    </Grid>
                ))}
            </Grid>
            <Box height='600px'>
                <Typography variant='subtitle1'>characters from movie: {movie?.title}</Typography>
                <DataGrid columns={columns} rows={people} getRowId={(row) => row.name} />
            </Box>
        </Box >
    )
}

export default FilmPage

export const movieLoader = async () => {
    return await fetchMovies()
}