import './App.css';
import { Movies } from './Component/Movies';
import { Mynav } from './Component/Mynav';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import { Events } from './Component/Events';
import { Horror } from './Component/Horror';
import { Main } from './Component/Main';
import {Item} from './Component/Item';
import { Shows } from './Component/Shows';
import { BookingPage } from './Component/BookingPage';
import { Footer } from './Component/Footer';



function App() {
  return (
   <div>
   
    <BrowserRouter>
    <Mynav/>
        <Routes>
            <Route path="/Movies" element={<Movies/>}/>
           
            <Route path="/Events" element={<Events/>}/>
            <Route path="/Shows" element={<Shows/>}/>
            <Route path="/Sports" element={<Horror/>}/>
            <Route path="/item/:id" element={<Item/>}/>
            <Route path="/" element={<Main/>}/>
            <Route path="/bookingpage/:movie" element={<BookingPage/>}/>
        </Routes>
    <Footer/>
    </BrowserRouter>
   </div>
  );
}

export default App;
