import logo from './logo.svg';
import { HashRouter , Routes , Route } from "react-router-dom"
import { Navigate } from "react-router-dom";

import './App.css';

// npm run deploy 

//Components/Pages
import NavBar from './components/NavBar';
import Landing from './pages/Landing';
import NoPage from './pages/NoPage';

import About from './pages/About';
import Education from './pages/Education';
import Projects from './pages/Projects';


function App() {
  return (
    <HashRouter>
      <NavBar/>
      <Routes>
        {/* defaults */}
        <Route path="/" element={<Landing/>}/>
        <Route path="*" element={<NoPage/>}/>
        {/* Other routing */}
        <Route path="/about" element={<About/>}/>
        <Route path="/education" element={<Education/>}/>
        <Route path="/projects" element={<Projects/>}/>
      </Routes>


    </HashRouter>
  );
}

export default App;
