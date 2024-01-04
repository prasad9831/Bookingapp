import React,{useEffect,useState} from 'react'
import { Eventcar } from '../Carousel/Eventcar';
import { Link } from 'react-router-dom';

export const Events = () => {

  const [upcoming, setUpcoming] = useState([]);

  const apiKey = '597d2cb41ac4e2ee360d43e1caadb65d';

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

  
  useEffect(() => {
    
    fetUpcomingData();
    
  }, []);

  return (
    <>
    <Eventcar Up={upcoming}/>

    <div className='container'>
        <h2 className='py-4 px-5'>Events</h2>
      </div>

    <div className='container movie my-5'>
       <div className='movie-items'>
          {
            upcoming.map((item)=>(
              <Link to={`/item/${item.id}`} className='text-dark' style={{'textDecoration':'none'}}>

                <div key={item.id} className='item'>
                  <div className='initem'>
                    <img src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`} className='img-fluid' alt={item.title} />

                  </div>
                  <h5 className='px-2 py-1 item-heading castname'>{item.original_title}</h5>    
                </div>
              </Link>
            ))
          }
        </div>
     </div>
    </>
  )
}
