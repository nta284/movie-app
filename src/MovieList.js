import React from 'react';
import Movie from './Movie';
import './MovieList.scss';

export default function MovieList({
    heading,
    renderList,
    favList,
    toggleFav
}) {
    return (
        <div className='movie-list-wrapper'>
            <h2 className="movie-list_heading">{heading}</h2>
            <div className="movie-list">
                <div className="row">
                    {renderList.map((movie, index) => (
                        <Movie
                            key={index}
                            movie={movie}
                            isFav={favList.map(ele => ele.imdbID).includes(movie.imdbID)}
                            toggleFav={toggleFav}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}
