import React, { Fragment } from 'react'
import Carousel from 'react-bootstrap/Carousel';

export const Moviecar = ({data}) => {
  return (

    <Fragment>
    <div className='car'>
        <Carousel className='car1'>
            
            {
                data.map((item)=>(

                    <Carousel.Item key={item.id} className='poster'>
                    <img src={`https://image.tmdb.org/t/p/original/${item.backdrop_path}`} width="100%" className='parent' height="800px" alt='img1'/> 
                    <div className='child'></div>
        
                    </Carousel.Item>
                ))
            }
           

    
        </Carousel>

    </div>

</Fragment>
  )
}
