import React, { Fragment } from 'react'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./Gamecar.css";
import { Link } from 'react-router-dom';

export const Game = ({data}) => {

    const responsive = {
        
        desktop: {
          breakpoint: { max: 2560, min: 1024 },
          items: 6
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
  return (
    <Fragment>

       <Carousel responsive={responsive} autoPlay={true} autoPlaySpeed={2500} infinite={true}  itemClass="carousel-item-padding-40-px"   containerClass="carousel-container"   removeArrowOnDeviceType={["tablet", "mobile"]}>

            {data.map((item)=>(

              <Link to={`/item/${item.id}`} className='text-dark' style={{'textDecoration':'none'}}>
                  <div className=' item' key={item.id}>
                    <div className='playcar'>
                      <img src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`} className='img-fluid ' alt={item.title} />
                    </div>
                    <h5 className='py-2 px-2'>{item.title}</h5>
                  </div>
              </Link>
            ))}
           

            

        
       </Carousel>
    </Fragment>
  )
}
