import React,{useEffect, useState} from 'react'
import { Horrorcar } from '../Carousel/Horrorcar';
import { Link } from 'react-router-dom';

export const Horror = () => {

  const [horror, setHorror] = useState([]);

  const apiKey = '597d2cb41ac4e2ee360d43e1caadb65d';

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
    fethorrormovie();
  }, []);


  return (
    <>
    <Horrorcar hor={horror}/>

    <div className='container'>
        <h2 className='py-4 px-5'>Horror</h2>
      </div>

    <div className='container movie my-5'>
       <div className='movie-items'>
          {
            horror.map((item)=>(
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
    </>
  )
}
