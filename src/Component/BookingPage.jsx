import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './bookingpage.css';
import screen from './screen.png'
import firebase from './firebase'; // Update the path accordingly
import { ref, push , onValue, get } from "firebase/database";
import { database } from "./firebase"; 
import emailjs from 'emailjs-com';



export const BookingPage = () => {
  const { movie } = useParams();
  const [selectedDate, setSelectedDate] = useState(null);
  const [gettheatre, setGetTheatre] = useState([]);
  const [theatre, setTheatre] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [paymentdetails, setPaymentDetails] = useState({
    card: '',
    upi: '',
    net: '',
  });  const [open, setOpen] = useState(null);
  const [newopen, setNewOpen] = useState(false);
  const [newopen2, setNewOpen2] = useState(false);
  const [newopen4, setNewOpen4] = useState(false);
  const [newopen5, setNewOpen5] = useState(false);
  const [newopen6, setNewOpen6] = useState(false);
  const [bookopen, setBookOpen] = useState(false);
  const [newopen1, setNewOpen1] = useState([]);
  const[proccedbtn, setProccedBtn] = useState(false);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [dynamicOTP, setDynamicOTP] = useState('');
  const [paymentVisible, setPaymentVisible] = useState(false);
  const [paymentDone, setpaymentDone] = useState();

  const maxSeats = 5;


  const emailJsConfig = {
    userId: 'csabiRxRVVph2MwVq',
    templateId: 'template_44v9jxv',
    serviceId: 'service_fwyzmd8', // Replace with your service ID
  };

  function generateOTP() {
    // Define the length of the OTP
    const otpLength = 6;
  
    // Generate a random 6-digit number
    const otp = Math.floor(100000 + Math.random() * 900000);
  
    // Convert the number to a string and pad with leading zeros if needed
    const formattedOTP = otp.toString().padStart(otpLength, '0');
  
    return formattedOTP;
  }

  const generateRecentDates = () => {
    const today = new Date();
    const recentDates = [];

    // Generate dates for the past 5 days (adjust as needed)
    for (let i = 1; i < 5; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);

      // Extract day, date, and month
      const day = date.toLocaleString('en-US', { weekday: 'short' });
      const month = date.toLocaleString('en-US', { month: 'short' });
      const formattedDate = date.getDate();

      recentDates.push({ day, month, formattedDate });
    }

    return recentDates;
  };

  const recentDates = generateRecentDates();

  const handleDateClick = (date) => {
    console.log(date);
    setSelectedDate(date);
  };

  const handleShowClick = (show, selectedTheatre, selectedindex) => {
    
    setTheatre((prevTheatre) => {
      // Create a copy of the previous state
      const newState = { ...prevTheatre };
      
      // Update the state with the new values
      newState.show = show;
      newState.selectedTheatre = selectedTheatre;
      newState.selectedindex = selectedindex;
  
      // Log the updated state
      console.log(newState);
      // Return the new state
      return newState;
    });
   
  };
  

  const handleSeatClick = (seat) => {
    // Check if the seat is already selected
    const isSeatSelected = selectedSeats.includes(seat);

    // If the seat is already selected, remove it from the selection
    if (isSeatSelected) {
      setSelectedSeats((prevSelectedSeats) =>
        prevSelectedSeats.filter((selectedSeat) => selectedSeat !== seat)
      );
    } else {
      // If not selected, check if the maxSeats limit is reached
      if (selectedSeats.length < maxSeats) {
        // Add the seat to the selection
        setSelectedSeats((prevSelectedSeats) => [...prevSelectedSeats, seat]);
        
      } else {
        // Alert or handle the case where the maxSeats limit is reached
        alert('Max seats reached!');
      }
    }
    console.log(selectedSeats);
  };

  const fetchTheatre = () => {
    fetch('https://prasad9831.github.io/theatre-json/theatre.json')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        const uniqueCities = [...new Set(data.map((theater) => theater.city))];
        console.log(uniqueCities);

        if (uniqueCities.includes(selectedCity)) {
          // Filter the data based on the selected city
          const filteredData = data.filter((theater) => theater.city === selectedCity);
          setGetTheatre(filteredData);
          console.log(selectedCity);
        }
        setTimeout(() => {
          console.log(gettheatre);
        }, 2000);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };


  const handleCityChange = (e) => {
    setSelectedCity((prevCity) => {
      const city = e.target.value;
    
      // Directly assign the new value to newState
      const newState = city;
    
      // Log the updated state
      console.log(newState);
    
      // Return the new state
      return newState;
    });

    console.log(selectedCity);
    
  };

  const submit = async  () => {
    console.log(selectedCity);
    console.log(theatre);
    console.log(selectedSeats);
    console.log(selectedDate);

    
  
    
    // Prepare data to be sent to Firebase
    if (!selectedCity || !theatre || !selectedSeats || !selectedDate) {
      alert('Add add date');
      setOpen(false)
      return;
    }
     if (!selectedSeats.length > 0) {
      alert("Select seats please!");  
      console.log(selectedSeats);
      return;
        } 

        
        if(email === ''){
          alert('enter email id');
          return;
        }

      
        
        const dbRef = ref(database, 'bookings'); // Use the 'database' module here

        const total = selectedSeats.length*250;

         
      const bookingData = {
        movie: movie,
        selectedCity: selectedCity,  // Remove leading and trailing whitespaces
        selectedTheatre: theatre.selectedTheatre,  // Assuming selectedTheatre is a string
        selectedSeats: selectedSeats,
        selectedDate: selectedDate,  // Assuming selectedDate is a string
        show: theatre.show,  // Assuming selectedDate is a string
        email: email,
        price:total,  // Assuming selectedDate is a string
      };
      // Rest of your code
    
  
      // Reference to the Firebase database
  
      // Push the data to Firebase
      push(dbRef, bookingData);

      
      
      // Optionally, you can also use Firestore
      // const db = firebase.firestore();
      // db.collection('bookings').add(bookingData);
  
      console.log("done");
      console.log(bookingData);
      setOpen(false);
      setBookOpen(true);
      setNewOpen1(bookingData);
      console.log("Datebase",newopen1);
     
          
setGetTheatre([]);
setSelectedCity('');
setSelectedDate(null)
     
  
    }
  

    const verify = async () => {
      const dbRef = ref(database, 'bookings');
    
   try {
  const snapshot = await get(dbRef);
  const allBookingsData = snapshot.val();

  // Optionally, you can process the data as needed
  console.log('All bookings data from Firebase:', allBookingsData);

  let emailExists = false;

  // Check if email exists in any booking
  for (const bookingId in allBookingsData) {
    const bookingData = allBookingsData[bookingId];

    if (bookingData.email && bookingData.email === email) {
      console.log('Email exists in booking data:', email);
      emailExists = true;
      // Do something if the email exists
      setNewOpen(null)
      setNewOpen2(true);
      setNewOpen4(false);
      setProccedBtn(true);
      break; // Stop iterating once a match is found
    }
  }

  // If you reach here and emailExists is still false, the email doesn't exist
  if (!emailExists) {
    console.log('Email does not exist in booking data:', email);
    setNewOpen(true);
    setNewOpen2(false);
    setNewOpen4(true);
    const newDynamicOTP = generateOTP();
    setDynamicOTP(newDynamicOTP);


    const templateParams = {
      to_email: email,
      otp: newDynamicOTP,
    };

    try {
      // Send the OTP email
      const response = await emailjs.send(
        emailJsConfig.serviceId,
        emailJsConfig.templateId,
        templateParams,
        emailJsConfig.userId
      );

      console.log('OTP sent successfully:', response);
      // Additional logic after OTP is sent
console.log(email);

if(!response){
  console.log("otp id not send");
}
else{
  newopen(false);
}


    } catch (error) {
      console.error('Error sending OTP:', error);
    }

  
  }
} catch (error) {
  console.error('Error fetching bookings data:', error);
}




    };

 
  
    const handleEmailChange = (e) => {
      setEmail(e.target.value);
      setOtp('');  // Reset the OTP when the email changes
    };

    const verifyotp = () => {
      // Check the OTP condition once the user completes entering the OTP
      if (otp === dynamicOTP) {
        setNewOpen5(true);
        setNewOpen6(false);
        setNewOpen4(false);
        setProccedBtn(true);

      } else {
        setNewOpen6(true);
        setNewOpen5(false);
        setNewOpen4(false)
        setProccedBtn(false);

      }
    };

   const pay=()=>{
    setPaymentVisible(true);
    setBookOpen(false);
  }

  const dopay = () => {
    console.log("dopay function called");
    console.log(paymentdetails);
  
    const { card, upi, net } = paymentdetails;
  
    if (card === '' || upi === '' || net === '') {
      console.log("Alert condition met");
      alert("Please fill in all details");
      console.log("alert");
    } else {
      setpaymentDone(true);
      setPaymentVisible(false);
    }
  };
  

  const paydone=()=>{
    setpaymentDone(false);
  }

  useEffect(() => {
    fetchTheatre(selectedCity);
    handleShowClick(theatre);
  }, [selectedCity]);

  return (
    <div className='container '>
      <div className='my-5'>
        <h2>{movie}</h2>
      </div>
      <div className=' justify-content-between d-flex'>
      <div>
        <h5 className='mb-3'>Select Date:</h5>
        <div className=' text-right me-auto justify-content-start d-flex'>
          {recentDates.map((date, index) => (
            <div
              key={index}
              className={selectedDate === date.formattedDate ? 'me-2 border rounded px-3 text-center py-1 selected-date' : 'me-2 border rounded px-3 text-center py-1 '}
              onClick={() => handleDateClick(date.formattedDate)}
            >
              <p className='my-0 date-day'>{date.day}</p>
              <p className='my-0 date-date'>{date.formattedDate}</p>
              <p className='my-0 date-month'>{date.month}</p>
            </div>
          ))}
        </div>
        </div>
        <div>
        <select
      className="form-select my-5"
      value={selectedCity}
      onChange={handleCityChange}
      >
      <option value="" disabled>Select Cities</option>
      <option value="CityA">Mumbai</option>
      <option value="CityB">Navi Mumbai</option>
      <option value="CityC">Thane</option>
      <option value="CityD">Pune</option>
      <option value="CityE">Satara</option>
    </select>
        </div>
      </div>
      <div className='my-5'>
      {gettheatre.length > 0 ? (
  gettheatre.map((item, index) => (
    <div className='page align-items-center my-2 border py-2 px-2' key={index}>
      <div className='w-25 fs-6 text-center'>{item.theatre_name}</div>
      <div className='w-75 d-flex justify-content-around align-items-center'>
        <div className='page '>
        <p className={theatre.show === item.show1[0] && theatre.selectedTheatre === item.theatre_name && theatre.selectedindex=== index ? `btn  btn-success mx-3 my-2 `:`btn  btn-outline-success mx-3 my-2 btn-outline-success`} onClick={() => { handleShowClick(item.show1[0], item.theatre_name, index); setOpen(item.seating_capacity); }}>{item.show1[0]}</p>
                <p className={theatre.show === item.show1[1] && theatre.selectedTheatre === item.theatre_name && theatre.selectedindex=== index ? `btn  btn-success mx-3 my-2 `:`btn  btn-outline-success mx-3 my-2 btn-outline-success`} onClick={() => { handleShowClick(item.show1[1], item.theatre_name, index); setOpen(item.seating_capacity); }} >{item.show1[1]}</p>
                <p className={theatre.show === item.show1[2] && theatre.selectedTheatre === item.theatre_name && theatre.selectedindex=== index ? `btn  btn-success mx-3 my-2 `:`btn  btn-outline-success mx-3 my-2 btn-outline-success`} onClick={() => { handleShowClick(item.show1[2], item.theatre_name, index); setOpen(item.seating_capacity); }}>{item.show1[2]}</p>
                <p className={theatre.show === item.show1[3] && theatre.selectedTheatre === item.theatre_name && theatre.selectedindex=== index ? `btn  btn-success mx-3 my-2 `:`btn  btn-outline-success mx-3 my-2 btn-outline-success`} onClick={() => { handleShowClick(item.show1[3], item.theatre_name, index); setOpen(item.seating_capacity); }}>{item.show1[3]}</p>
                <p className={theatre.show === item.show1[4] && theatre.selectedTheatre === item.theatre_name && theatre.selectedindex=== index ? `btn  btn-success mx-3 my-2 `:`btn  btn-outline-success mx-3 my-2 btn-outline-success`} onClick={() => { handleShowClick(item.show1[4], item.theatre_name, index); setOpen(item.seating_capacity); }} >{item.show1[4]}</p>
        </div>
      </div>
    </div>
  ))
) : (
  <div className="message h-100 text-center d-flex justify-content-center"><h2>Select a city first</h2></div>
) }



{open && (
  <div className='seat-head'>
    <div className='seat-inner  bg-white p-2 py-4'>

      <h3 className='text-start'>Select one or More seats</h3>

      <div>
        <img src={screen} alt="" style={{'transform':'rotate(180deg)'}}/>
      </div>

      <div className='seat-div'>
      {Array.from({ length: open }).map((_, index) => {
        const seatNumber = index + 1;
        const isSelected = selectedSeats.includes(seatNumber);
        const seatClassName = isSelected ? 'seatselected' : 'seat';

        return (
          <div
            key={index}
            className={seatClassName}
            onClick={() => handleSeatClick(seatNumber)}
          >
            {seatNumber}
          </div>
        );
      })}
      
    </div>
    <div className='my-2'>
        <p>Selected Seats: {selectedSeats.join(', ')}</p>
      </div>
      <div className='d-flex justify-content-between w-100 px-3'>
        <p><strong>Price</strong>:- ₹ 250.00</p>
        <p><strong>Total</strong>:-({selectedSeats.length})&nbsp;₹ {selectedSeats.length*250}.00 </p>
      </div>
      {newopen ? (
      <div className='d-flex'>
        <input type="text"     className='form-control w-75 text-center' placeholder='Enter your Otp' value={otp} onChange={(e) => { setOtp(e.target.value) }}/>
        <button className='btn btn-success ms-2' onClick={verifyotp}>VerifyOtp</button>
        </div>
      ):(
        <div className='d-flex'>
      <input type="text"     className='form-control w-75 text-center' placeholder='Enter your Email' value={email} onChange={handleEmailChange}/>
      <button className='btn btn-warning ms-2' onClick={verify}>Verify</button>
      </div>
      )
      }
      {newopen2 ? ( <p className='text-success'>Your are a verified user you can procced</p>):('')}
      {newopen4 ? ( <p className='text-success'>Enter your Otp</p>):('')}
      {newopen5 ? ( <p className='text-success'>Otp is correct click on proceed</p>):('')}
      {newopen6 ? ( <p className='text-danger'>Otp is not correct</p>):('')}
             

      
      <div className='w-100 d-flex justify-content-between mb-3 px-3'>
      <button className='btn btn-outline-danger ' onClick={()=>{setOpen(null);setSelectedSeats([])}}>Cancel</button>

      {proccedbtn ?( <button className='btn btn-danger proceed'  onClick={submit}>Proceed</button>):('')}
      </div>
    </div>
  </div>
)}

{bookopen &&
  <div className='seat-head'>
    <div className='seat-inner  bg-white p-2 py-4'>
      <h3>YOur Booking Details:</h3>
      <p>Movie:{newopen1.movie}</p>
      <p>City:{newopen1.selectedCity}</p>
      <p>Theatre:{newopen1.selectedTheatre}</p>
      <p>Seats:{newopen1.selectedSeats.join(', ')}</p>
      <p>Date:{newopen1.selectedDate}</p>
      <p>Show:{newopen1.show}</p>
      <p>Email:{newopen1.email}</p>
      <p>Email:{newopen1.price}</p>
      <button className='btn btn-danger' onClick={pay}>Proceed to the payment page</button>
    </div>
  </div>
}
    

      </div>

      {paymentVisible && (
        <div className='payment'>
          <div className='payment-inner bg-white'>
            <h5 className='py-3'>Your payment :{newopen1.price}</h5>
            <p>Payment Options</p>
                <div>
                    <div className="form-group">
                      <label htmlFor="card">Card:</label>
                      <input type='text' id='card'  name='card' value={paymentdetails.card} 
  onChange={(e) => setPaymentDetails({ ...paymentdetails, card: e.target.value })}  />
                    </div>

                    <div className="form-group">
                      <label htmlFor="upi">UPI:</label>
                      <input type='text' id='upi' name='upi' value={paymentdetails.upi} 
                      onChange={(e) => setPaymentDetails({ ...paymentdetails, upi: e.target.value })} />
                    </div>

                    <div className="form-group">
                      <label htmlFor="net">Net Banking:</label>
                      <input type='text' id='net' name='net' value={paymentdetails.net} 
                      onChange={(e) => setPaymentDetails({ ...paymentdetails, net: e.target.value })} />
                    </div>

                    <button className='btn btn-danger px-3 mx-5 my-2'  onClick={dopay}>Make Payment</button>
                </div>
          </div> 
        </div>
      )}

      {paymentDone && (
        <div className='payment'>
          <div className='payment-inner bg-white'>
            <h2 className='py-3'>Thank You</h2>
            <h6 className='py-3'>Enjoy Your Movie</h6>
            <button className='btn btn-danger my-2' onClick={paydone}>Done</button>
          </div>
        </div>
      )

      }
    </div>
  );
};
