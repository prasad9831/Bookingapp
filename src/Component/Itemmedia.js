import React, { Fragment, useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


export const Itemmedia = ({main, movie}) => {

    const [video,setvideo]=useState(false);

    const popular =()=>{
        setvideo(false);
    }

    const Videos =()=>{
        setvideo(true);
    }

   
  return (
    <Fragment>

        <div className='container py-5'>

            <Navbar bg="light" data-bs-theme="light">
            
                <Navbar.Brand>Media</Navbar.Brand>
                <Nav className="me-auto">
                <Nav.Link href="#home" onClick={popular}>Most Popular</Nav.Link>
                <Nav.Link href="#features" onClick={Videos}>Images</Nav.Link>
                
                </Nav>
        
            </Navbar>

            {video ? (
                <div className='container'>

                <img src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`} className='img-fluid ' alt={movie.title} />
                <img src={`https://image.tmdb.org/t/p/w200/${movie.backdrop_path}`} className='img-fluid ' alt={movie.title} />

                </div>
                ) : (
                    <div className='container'>
                    {
                        main.length > 0 && (
                            <div key={main[0].id} className='container'>
                                <iframe
                                    title={main[0].name}
                                    width="100%"
                                    height="500px"
                                    src={`https://www.youtube.com/embed/${main[0].key}?autoplay=1&controls=0&enablejsapi=1`}
                                    frameBorder="0"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        )
                    }
                </div>
            )}
            
        </div>
    </Fragment>
  )
}
   