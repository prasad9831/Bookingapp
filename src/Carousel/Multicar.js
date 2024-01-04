import React from 'react';
import { Link } from 'react-router-dom';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./Multicar.css";

export const Multicar = ({ data }) => {
    console.log(data);
  const responsive = {
    desktop: {
      breakpoint: { max: 2560, min: 1024 },
      items: 6,
    },
    desktopL: {
      breakpoint: { max: 1440, min: 1023 },
      items: 6,
    },
    desktopS: {
      breakpoint: { max: 1024, min: 799 },
      items: 6,
    },
    tablet: {
      breakpoint: { max: 800, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 425, min: 0 },
      items: 1,
    },
  };

  return (
    <>
      <Carousel responsive={responsive} autoPlay={true} autoPlaySpeed={2500} infinite={true}  itemClass="carousel-item-padding-40-px"   containerClass="carousel-container"   removeArrowOnDeviceType={["tablet", "mobile"]}>
      {data.map((item) => (
        <Link to={`/item/${item.id}`} className='text-dark' style={{'textDecoration':'none'}}>
          <div className='item' key={item.id}>
            <div className='initem'>
              <img src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`} className='img-fluid ' alt={item.title} />
            </div>
            <h5 className='px-2 py-1 item-heading '>{item.title}</h5>
            <p className='px-2 py-1'>{item.release_date}</p>
          </div>
          </Link>
        ))}
      </Carousel>
    </>
  );
};
