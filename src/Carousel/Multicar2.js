import React, { Fragment } from 'react'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./Multicar2.css"
import { Link } from 'react-router-dom';

export const Multicar2 = ({data}) => {

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
  return (
    <Fragment>

       <Carousel responsive={responsive} autoPlay={true} autoPlaySpeed={2500} infinite={true}  itemClass="carousel-item-padding-40-px"   containerClass="carousel-container"   removeArrowOnDeviceType={["tablet", "mobile"]}>
       {data.map((item) => (

           <Link to={`/item/${item.id}`} className='text-dark' style={{'textDecoration':'none'}}>
              <div className='eve' key={item.id}>
                <div className='initem'>
                  <img src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`} className='img-fluid ' alt={item.title} />
                </div>
                {/* <h5 className='px-2 py-1 item-heading '>{item.title}</h5>
                <p className='px-2 py-1'>{item.release_date}</p> */}
              </div>
           </Link>
        ))}
       </Carousel>

    </Fragment>
  )
}
