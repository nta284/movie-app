import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import MovieList from './MovieList';

function App() {
    const [search, setSearch] = useState('');
    const [movieList, setMovieList] = useState([]);
    const [favList, setFavList] = useState(() => {
        let storageFavList = localStorage.getItem('favList');

        return JSON.parse(storageFavList) ?? [];
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`https://www.omdbapi.com/?s=${search}&apikey=22d06335`)
            .then(response => {
                // console.log(response);
                if (response.ok) {
                    return response.json();
                }
                else {
                    throw response;
                }
            })
            .then(data => {
                console.log(data.Search);
                console.log("Fetching data successful");
                setMovieList(prev => {
                    if (data.Search === undefined) {
                        return prev;
                    }
                    else {
                        setLoading(true);
                        return data.Search;
                    }
                })
                setLoading(false);
            })
            .catch(error => {
                console.log("Error fetching data", error);
            })
            .finally(() => {
                console.log("Finally");
            })
    }, [search])

    useEffect(() => {
        localStorage.setItem('favList', JSON.stringify(favList));
    }, [favList])

    const toggleFav = (movie) => {
        let newFavList = [...favList];

        if (!favList.map(ele => ele.imdbID).includes(movie.imdbID)) {
            newFavList.push(movie);
            setFavList(newFavList);
        }
        else {
            newFavList.splice(newFavList.indexOf(movie), 1);
            setFavList(newFavList);
        }
    }

    return (
        <div className="App">
            <div className="header">
                <div className="header_title">MOVIE SEARCH APP</div>
                <div className="header_input-wrapper">
                    <input
                        value={search}
                        placeholder='Search for movies'
                        onChange={e => setSearch(e.target.value)}
                    />
                    <FontAwesomeIcon className='search-icon' icon={faMagnifyingGlass} />
                </div>
            </div>
            <div className='container-fluid movies-section'>
                <MovieList
                    heading='Movies'
                    loading={loading}
                    renderList={movieList}
                    favList={favList}
                    toggleFav={toggleFav}
                />
                <MovieList
                    heading='Favourites'
                    renderList={favList}
                    favList={favList}
                    toggleFav={toggleFav}
                />
            </div>
        </div>
    );
}

export default App;
