import React, { Fragment, useEffect, useState } from 'react';
import { Carou } from '../Carousel/Carou';
import { Multicar } from '../Carousel/Multicar';
import { Maindata } from './Maindata';
import { Playcarousel } from '../Carousel/Playcarousel';
import { Game } from '../Carousel/Game';
import './Main.css'
import { Multicar2 } from '../Carousel/Multicar2';


export const Main = () => {
  const [movies, setMovies] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [top, setTop] = useState([]);
  const [tv, setTv] = useState([]);
  const [horror, setHorror] = useState([]);


  const apiKey = '597d2cb41ac4e2ee360d43e1caadb65d';


  async function fetchMovieData() {
    const apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      console.log(data);
      const sortedMovies = data.results.sort((a, b) => {
        return new Date(b.release_date) - new Date(a.release_date);
      });
      const filteredMovies = data.results.filter(movie => movie.vote_average >= 7.5);

      setTop(filteredMovies)
      setMovies(sortedMovies);
      console.log(data.results);
    } catch (error) {
      console.error('Error fetching movie data:', error);
      setMovies([]); // Set movies to an empty array in case of an error
    }
  }

  async function fetUpcomingData() {
    const apiUrl = `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}`;

    try {
      const response2 = await fetch(apiUrl);
      const data2 = await response2.json();
      setUpcoming(data2.results);

    } catch (error) {
      console.error('Error fetching movie data:', error);
      setUpcoming([]); // Set movies to an empty array in case of an error
    }


  };

  async function fetTvData(){
    const apiUrl = `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&language=en-US&sort_by=popularity.desc`;
    
    try {

      const response3 = await fetch(apiUrl);
      const data3 = await response3.json();
      setTv(data3.results);
      console.log(data3)
      
    } 
      
    catch (error) {
      console.error('Error fetching movie data:', error);
      setTv([])
    }
  
  }

  async function fethorrormovie(){
    const apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&with_genres=27`;
  

  try {

    const response4 = await fetch(apiUrl);
    const data4 = await response4.json();
    setHorror(data4.results);
    console.log(data4)
    
  } catch (error) {
    console.error('Error fetching movie data:', error);
    setHorror([])
  }
  }

  useEffect(() => {
    fetchMovieData();
    fetUpcomingData();
    fetTvData();
    fethorrormovie(); 
  }, []);





  return (
    <Fragment>
     <Carou data={movies}/>

      <div id='recom'  className='my-5 py-5 '>
        <h3 className='mb-4'>Recommended Movies</h3>
         <Multicar data={movies.slice(0, 9)}/>  
      </div>

      <div id='recom' className='my-5 py-5 '>
        <h3 className='mb-4'>The Best Of Events</h3>
         <Multicar2 data={upcoming.slice(0, 9)}/> 
      </div>
      
      <div id='premi'>

        <div id='recom' className='py-1'>
          <div className='d-flex justify-content-start  my-5'>
          <div><img src='img/play.png' alt='play button' className='recom-img'/> 
          </div>
          <div className='px-2'><h3 className='text-white my-0'>PREMIERE</h3>
          <p className='text-white my-0'>Watch new movies at home, every Friday</p></div>
          </div>
          
       

        <Maindata data={top}/>
        </div>
      </div>

      <div className='recom1' >
        <h4>TV Shows</h4>
        <Playcarousel data={tv.slice(0, 10)}/>
      </div>
      
      <div id='recom' >
        <h4>Horror Movies</h4>
        <Game data={horror.slice(0, 10)}/>
      </div>
      
      
    </Fragment>
  );
};
