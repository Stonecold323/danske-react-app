import { Button, Card, CardActions, CardContent, Typography } from '@mui/material'
import React from 'react'
import { Film } from '../interfaces/Films';

type FilmCardProps = {
    movie: Film
    handleOnClick: () => Promise<void>,
}

const FilmCard = (props: FilmCardProps) => {
    const { movie, handleOnClick } = props

    return (
        <Card sx={{ minWidth: 275 }}>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    {movie.title}
                </Typography>
                <Typography variant="h5" component="div">
                    Episode: {movie.episode_id}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary" component='div'>
                    {`Released: ${movie.release_date}`}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={handleOnClick}>Show People</Button>
            </CardActions>
        </Card>
    );
}

export default FilmCard