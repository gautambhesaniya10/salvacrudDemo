import { Route, Routes } from 'react-router-dom';
import './App.css';
import Homepage from './Pages/Homepage';
import Adduserform from './Pages/Adduserform';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/adduser' element={<Adduserform />} />
        <Route path='/edituser/:id' element={<Adduserform />} />
      </Routes>
      
    </div>
  );
}

export default App;
