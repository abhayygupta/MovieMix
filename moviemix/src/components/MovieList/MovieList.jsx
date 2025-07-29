import React, { useEffect, useState } from 'react'
import './MovieList.css'
import MovieCard from './MovieCard'

const MovieList = () => {

    const [movies, setMovies] = useState([])
    const [minRating, setMinRating] = useState(0)

    useEffect(()=>{
        fetchMovies()
    },[])
    
    const fetchMovies = async()=>{
        
        const response = await fetch("https://api.themoviedb.org/3/movie/popular?api_key=183928bab7fc630ed0449e4f66ec21bd")
        const data = await response.json()
        setMovies(data.results)
        
    }

    const handleFilter = rate => {
        setMinRating(rate)

        const filtered= movies.filter(movie => movie.vote_average >= rate)
        setMovies(filtered)
    }
  return (
   <section className='movie-list'>
    <header className='align-center movie-list-header'>
        <h2 className='align-center movie-list-heading'>Popular 🔥</h2>

        <div className='align-center movie-list-fs'>
            <ul className="align-center movie-filter">
                <li className="movie-filter-item active" onClick={()=>handleFilter(8)}>8+ Star</li>
                <li className="movie-filter-item" onClick={()=>handleFilter(7)}>7+Star</li>
                <li className="movie-filter-item" onClick={()=>handleFilter(6)}>6+ Star</li>
            </ul>

            <select name="" id="" className="movie-sorting">
                <option value="">SortBy</option>
                <option value="">Date</option>
                <option value="">Rating</option>
            </select>

            <select name="" id="" className="movie-sorting">
                <option value="">Ascending</option>
                <option value="">Descending</option>
            </select>
        </div>
    </header>

    <div className='movie-cards'>
        {
            movies.map(movie=> <MovieCard key={movie.id} movie={movie}/>)
        }
    </div>
   </section>
  )
}

export default MovieList
