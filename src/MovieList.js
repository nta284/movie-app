import React from 'react';
import Movie from './Movie';
import './MovieList.scss';
import loadingGif from './Spin-1s-200px.gif'

export default function MovieList({
    heading,
    loading = false,
    renderList = [],
    favList = [],
    toggleFav = () => {}
}) {
    return (
        <div className='movie-list-wrapper'>
            <h2 className="movie-list_heading">{heading}</h2>
            {loading ?
                <div className="loader"></div> :
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
            }
        </div>
    )
}
