import React, { useEffect, useState } from 'react'
import randomId from 'random-id'
import './style.scss'

export default function Movie () {
  
  const [moviesData, setMoviesData] = useState([])

  async function fetchMovies () {
    const response = await fetch("https://ghibliapi.herokuapp.com/films")
    const responseJson = await response.json()
    setMoviesData( responseJson )
  }
  

  useEffect (() => {
    fetchMovies()
  }, [])

  const sortedScore = moviesData.sort((a, b) => {
    return b.rt_score - a.rt_score
  })

  const movies = sortedScore.map(movie => {
     return (
      <div key={randomId()} className="container">
        <header>
          <h2> {movie.title} </h2>
          Released in <span>{movie.release_date}</span>
        </header>
        <p>{movie.description}</p>
        <div className="wrapper">
          <span className="producer">Produced by : {movie.producer}</span>
          <span className="director">Directed by : {movie.director}</span>
        </div>
        <span className="score">score : {movie.rt_score}</span>
      </div>
     ) 
  })

  return movies
}