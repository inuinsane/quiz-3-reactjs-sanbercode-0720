import React from 'react';
import { MovieProvider } from './MovieContext';
import EditFilm from './EditFilm';



const MovieEditor = () => {
    return (
        <MovieProvider>
            <EditFilm />
        </MovieProvider>
    )
}


export default MovieEditor;