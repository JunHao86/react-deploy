import logo from './logo.svg';
import { HashRouter , Routes , Route } from "react-router-dom"
import { Navigate } from "react-router-dom";
import { Suspense } from 'react';
import i18n from './components/i18n';
import './App.css';

// npm run deploy 

//Components/Pages
import NavBar from './components/NavBar';
import Landing from './pages/Landing';
import NoPage from './pages/NoPage';

import About from './pages/About';
import Education from './pages/Education';
import Projects from './pages/Projects';
import Loading from './components/loading';
import { useState } from 'react';
import LocaleContext from './components/LocaleContext';

function App() {
  const [locale, setLocale] = useState(i18n.language);

  i18n.on('languageChanged', (lng) => setLocale(i18n.language));

  return (
    <LocaleContext.Provider value={{locale, setLocale}}>
      <Suspense fallback={<Loading/>}>
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
      </Suspense>
    </LocaleContext.Provider>
  );
}

export default App;
