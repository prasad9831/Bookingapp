import React from 'react';
import "./Footer.css"
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import PinterestIcon from '@mui/icons-material/Pinterest';
import TwitterIcon from '@mui/icons-material/Twitter';

export const Footer = () => {
  return (
   <>
   <div className='container-fluid footer'>
        
        <div className='footerimg py-5'>
        <img src='/img/logo2.png' height="70" alt='logo'/>
        </div>

        <div className='icon'>
            <div className='iconinner'>
                <p><FacebookOutlinedIcon/></p>&nbsp;&nbsp;&nbsp;&nbsp;
                
                <p><YouTubeIcon/></p>&nbsp;&nbsp;&nbsp;&nbsp;
                <p><InstagramIcon/></p>&nbsp;&nbsp;&nbsp;&nbsp;
                <p><LinkedInIcon/></p>&nbsp;&nbsp;&nbsp;&nbsp;
                <p><PinterestIcon/></p>&nbsp;&nbsp;&nbsp;&nbsp;
                <p><TwitterIcon/></p>&nbsp;&nbsp;&nbsp;&nbsp;
            </div>
        </div>

        <div className='footerend py-4'>
            <p>Copyright 2024 Bigtree Entertainment Pvt. Ltd.</p><p> All Rights Reserved
            The Content and images used on this site are copyright protected and copyright vest with the respective owners. The usage of the content and image on this website is intended to promote the work and on endorsement of the artist shall be implied. Unauthorised use is prohibited and punishable by law.
            </p>
        </div>
        
   </div>
   </>
  )
}
