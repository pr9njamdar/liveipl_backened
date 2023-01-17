

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Form from './Components/Form';
import Navbar from './Components/Navbar';
import Room from './Components/Room';
import Loginform from './Components/loginform';
function App() {
  return (
<BrowserRouter>
    <Routes>
      <Route path='/'element={ <div className="App">
      <Navbar/>
      <Form/>
    </div>}/>
    <Route path='/login'element={ <div className="App">
      <Navbar/>
      <Loginform/>
    </div>}/>

     <Route path='/Room' element={<Room/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
