import './App.css';
import Home from './Home';
import Detail from './Detail';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/detail/:id" element={<Detail/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
