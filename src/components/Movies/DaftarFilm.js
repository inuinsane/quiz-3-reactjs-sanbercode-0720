import React from 'react';
import MovieList from './MovieList';
import { MovieProvider } from './MovieContext';


const DaftarFilm = () => {
    return (
        <>
            <MovieProvider>
                <MovieList />
            </MovieProvider>
        </>
    )
}

export default DaftarFilm;