import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import './tem.css';
import { Itemmedia } from './Itemmedia';



const responsive = {
        
  desktop: {
    breakpoint: { max: 2560, min: 1024 },
    items: 5
  },

  desktopL: {
      breakpoint: { max: 1440, min: 1023 },
      items: 4
  },

  desktopS: {
      breakpoint: { max: 1024, min: 799 },
      items: 3
  },

  tablet: {
    breakpoint: { max: 800, min: 464 },
    items: 2
  },

  mobile: {
    breakpoint: { max: 425, min: 0 },
    items: 1
  }
};

export const Item = () => {
  

  
  const { id } = useParams();

  const [movie, setMovie] = useState({});
  const [credit, setCredit] = useState({cast: [], crew: []});
  const [videos, setVideos] = useState([]);
  const [trailer, setTrailer] = useState(false);





  async function fetchItemData(movieId) {
    const apiKey = '597d2cb41ac4e2ee360d43e1caadb65d';
    const apiUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`;
    const creditsUrl = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}`;
    const videosUrl = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}`;

    try {
      const response = await fetch(apiUrl);
      const moviedata = await response.json();

      const response1 = await fetch(creditsUrl);
      const creditdata = await response1.json();

      const response2 = await fetch(videosUrl);
      const videodata = await response2.json();

      console.log(moviedata);
      console.log(creditdata.crew);
      console.log(creditdata.cast);
      console.log(videodata.results);

      setMovie(moviedata);
      setTimeout(() => {
        setCredit({crew:creditdata.crew , cast: creditdata.cast});

      }, 1500);
      setVideos(videodata.results);
    } catch (error) {
      console.error('Error fetching movie data:', error);
      setMovie({}); 
    }
  }

  useEffect(() => {
    fetchItemData(id);
  }, [id]);



  const convertMinutesToHours = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}min`;
  };


   
  const getYearFromDate = (dateString) => {
    const date = new Date(dateString);
    return date.getFullYear();
  };

  const languageCodes = {
    en: 'English',
    es: 'Spanish',
    fr: 'French',
    
  };



 
  return (
    <div className='w-100'>
            <div className='w-100 item-parent'>
              <img src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} className='img-fluid w-100 item-image'/>
              <div className='item-child'>
                  <div className='container d-flex justify-content-start h-100 align-items-center'>
                  <div className='row'>
                      <div className='col'>
                      <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} className=' h-50 item-poster-image'/>..
                      </div>
                      <div className='col right'>
                      <h3 className='text-white'>{movie.title}</h3>
                      <h6 className='text-white'>Release Year: {getYearFromDate(movie.release_date)}</h6>
                      <h6 className='text-white'>{movie.production_companies && movie.production_companies.length > 0 ? movie.production_companies[0].name : 'No production company available'}</h6>
                      
                      <h6 className='text-white'>
                          Genres:{' '}
                          {movie.genres && movie.genres.map((genre, index) => (
                            <span key={genre.id}>
                              {genre.name}
                              {index < movie.genres.length - 1 ? ', ' : ''} {/* Add comma between genres */}
                            </span>
                          ))}
                      </h6>
                      <p className='text-white'>{convertMinutesToHours(movie.runtime)}</p> 
                      <button className='btn btn-primary' onClick={() => setTrailer(true)}>Play Trailer</button>
                      <Link to={`/bookingpage/${movie.title}`}><button className='btn btn-warning ms-2' >Book Tickets</button></Link>           
                    </div>
                  </div>
                  </div>
              </div>
            </div>

            
            
            <div className=' container py-5'>
              <ul>
                <li><span className='stat'>Status:</span>&nbsp;<span className='state'>{movie.status}</span></li>
                <li><span className='stat'>Original Language:</span>&nbsp;<span className='state'>{languageCodes[movie.original_language]}</span></li>
                <li><span className='stat'>Revenue:</span>&nbsp;<span className='state'>{movie.revenue}</span></li>
                <li><span className='stat'>Content Score:</span>&nbsp;<span className='state cast-content-score'>{movie.vote_count}</span></li>
                <li><span className='stat'>Overview:</span></li>
              </ul>
              
              <p className='px-4 '>{movie.overview}</p>      
        
            </div>
           

          <div className='container casting'>
            <h4 className='py-3'>Cast</h4>
            <Carousel responsive={responsive}   itemClass="carousel-item-padding-40-px"   containerClass="carousel-container"   removeArrowOnDeviceType={["tablet", "mobile"]} className='cast-head'>
              {credit.cast
               .filter((cast) => cast.profile_path !== null)
              .map((cast) => (
                <div key={cast.id} className='item-cast py-3'>

                  <div className='cast mx-auto text-center'>
                    <img src={`https://image.tmdb.org/t/p/w500/${cast.profile_path}`} className='img-fluid mx-auto text-center' alt={cast.title} />
                  </div>

                  <p className='px-2 my-0  py-0 item-heading castname' >{cast.name}</p>
                </div>
              ))}
            </Carousel>
          </div>

          
          <div className='container crewing'>
          <h4 className='py-3 '>Crew</h4>
            <Carousel responsive={responsive}   itemClass="carousel-item-padding-40-px"   containerClass="carousel-container"   removeArrowOnDeviceType={["tablet", "mobile"]} className='cast-head'>
              {credit.crew
              .filter((crew) => crew.profile_path !== null)
              .map((crew) => (
                <div key={crew.id} className='item-cast py-3'>

                  <div className='cast mx-auto text-center'>
                    <img src={`https://image.tmdb.org/t/p/w500/${crew.profile_path}`} className='img-fluid mx-auto text-center' alt={crew.title} />
                  </div>

                  <p className='px-2 my-0  py-0 item-heading castname' >{crew.name}</p>
                </div>
              ))}
            </Carousel>
          </div>

          <div className='container'>
             <Itemmedia main={videos} movie={movie}/>
          </div>

          {/* <BookingPage data={movie}/> */}


          {trailer && videos.length > 0 && (
  <div className='trailer-head'>
      <div key={videos[0].id} className='h-50 w-75'>
          <iframe
              title={videos[0].name}
              width="100%"
              height="500px"
              src={`https://www.youtube.com/embed/${videos[0].key}?autoplay=1&controls=0&enablejsapi=1`}
              frameBorder="0"
              allowFullScreen
              autoPlay
          ></iframe>
          <button onClick={() => setTrailer(false)} className='close btn'>X</button>
      </div>
  </div>
)}
          
    </div>

  );
};


