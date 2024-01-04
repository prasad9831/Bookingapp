import React, {useEffect, useState} from 'react'
import { Showcar } from './Showcar';
import { Link } from 'react-router-dom';

export const Shows = () => {

  const [tv, setTv] = useState([]);

  const apiKey = '597d2cb41ac4e2ee360d43e1caadb65d';

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

  useEffect(() => {
    
    fetTvData();
  
  }, []);


  return (
    <>
    <Showcar Show={tv}/>

    <div className='container'>
        <h2 className='py-4 px-5'>TV Shows</h2>
      </div>

    <div className='container movie my-5'>
       <div className='movie-items'>
          {
            tv.map((item)=>(
              <Link to={`/item/${item.id}`} className='text-dark' style={{'textDecoration':'none'}}>

                <div key={item.id} className='item'>
                  <div className='initem'>
                    <img src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`} className='img-fluid' alt={item.title} />

                  </div>
                  <h5 className='px-2 py-1 item-heading castname'>{item.name}</h5>    
                </div>
              </Link>
            ))
          }
        </div>
     </div>
    </>
  )
}
