import React from 'react';
import './Movie.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import noImg from './No-Image-Placeholder.svg.png';

export default function Movie({
    movie,
    isFav,
    toggleFav
}) {
    const { Poster, Title, Year } = movie;

    return (
        <div className='movie-wrapper col-6 col-xs-6 col-sm-6 col-md-4 col-lg-3 col-xl-2'>
            <div className="movie-card">
                <div className="movie-card-image">
                    <img src={Poster === 'N/A' ? noImg : Poster} alt="" />
                </div>
                <div className="movie-card-body">
                    <div className="movie-title">{Title} ({Year})</div>
                    <div className="movie-fav-wrapper">
                        <div onClick={() => {toggleFav(movie)}} className="movie-fav">
                            <FontAwesomeIcon className='fav-icon' icon={faHeart} />
                            <FontAwesomeIcon className={isFav ? 'mark-fav-icon marked' : 'mark-fav-icon'} icon={faHeart} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
