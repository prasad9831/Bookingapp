import React, { Fragment, useEffect, useState } from 'react';
import { Moviecar } from '../Carousel/Moviecar';
import "./Movie.css"
import { Link } from 'react-router-dom';

export const Movies = () => {
  const [movie, setMovie] = useState([]);

  const apiKey = '597d2cb41ac4e2ee360d43e1caadb65d';

  async function fetchMovieData() {
    const apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc`;

    try {
      const response5 = await fetch(apiUrl);
      const data5 = await response5.json();
      setMovie(data5.results);
      console.log(data5);
    } catch (error) {
      console.error(error);
      setMovie([]);
    }
  }

  useEffect(() => {
    fetchMovieData();
  }, []);

  return (
    <Fragment>
      <Moviecar data={movie} />

      <div className='container'>
        <h2 className='py-4 px-5'>Movies</h2>
      </div>
      
     <div className='container movie my-5'>
     
       <div className='movie-items'>
          {
            movie.map((item)=>(
              <Link to={`/item/${item.id}`} className='text-dark' style={{'textDecoration':'none'}}>

                <div key={item.id} className='item'>
                  <div className='initem'>
                    <img src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`} className='img-fluid' alt={item.title} />

                  </div>
                  <h5 className='px-2 py-1 item-heading castname'>{item.title}</h5>    
                </div>
              </Link>
            ))
          }
        </div>
     </div>
    </Fragment>
  );
};
