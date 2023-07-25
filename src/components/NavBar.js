import React, { useEffect, useState, useContext, useRef } from "react";
import { NavLink } from 'react-router-dom';
import "./NavBar.css";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LocaleContext from "./LocaleContext";
import i18n from "./i18n";

//https://blog.shahednasser.com/how-to-internationalize-a-react-app/

function NavBar() {
  const [dropdown, setDropdown] = useState(false);
  const dropdownBtn = useRef();
  const [isMediaSizeUnder992px, setIsMediaSizeUnder992px] = useState(window.innerWidth < 992);
  const navigate = useNavigate();

    
  //Resize Check  
  useEffect(() => {
    const handleResize = () => {
      setIsMediaSizeUnder992px(window.innerWidth < 992);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
    
  //For dropdown that appears upon resizing
  useEffect(() => {
    document.addEventListener("click", (e) => {
      if (dropdown && !dropdownBtn.current?.contains(e.target)) {
        setDropdown(false);
      }
    });

    return () =>
      document.removeEventListener("click", (e) => {
        setDropdown(false);
      });
  }, []);

  const { t } = useTranslation();
  const { locale } = useContext(LocaleContext);

  //LangChange
  function changeLocale (l) {
    if (locale !== l) {
      i18n.changeLanguage(l);
    }
  }

return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
    <a className="navbar-brand" style={{justifyContent:"flex-start",marginLeft:"20px" }} href="#">JunHao86 Github</a>
      
    <div className="container-fluid gap-3" style={{justifyContent:"flex-start"}}>
      <a class="" href="#" onClick={() => changeLocale('en')}>English</a>
      <a class="" href="#" onClick={() => changeLocale('jp')}>日本語</a> 
      <a> Current Language: {t('language')}</a>
    </div>

    <h2>{t('greeting')}</h2>
      
    {/* Size >992px */}
    {!isMediaSizeUnder992px && (
    <div className="container-fluid d-flex justify-content-end">
      <div className="navbar-nav gap-3">
        <NavLink to="/about">Upload</NavLink>
        <NavLink to="/education">Education</NavLink>
        <NavLink to="/projects">Projects</NavLink>
      </div>
    </div>
    )}


    {/* Size <992px */}
    {isMediaSizeUnder992px && (
    <div>
        <div className="navbar-nav gap-3">See More</div>
        <div className="dropdown" style={{ paddingRight: "30px" }}>

        <div
            className="dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
            onClick={() => setDropdown(!dropdown)}
            ref={dropdownBtn}
        >
        </div>

        {dropdown && (
        <div className="dropdown-content" aria-labelledby="dropdownMenuButton">
            <div onClick={() => {
            setDropdown(false);
            navigate("/about");
            }}>Upload</div>

            <div onClick={() => {
            setDropdown(false);
            navigate("/education");
            }}>Education</div>

            <div onClick={() => {
            setDropdown(false);
            navigate("/projects");
            }}>Projects</div>
        </div>
        )}
        </div>
    </div>
    )}
  </nav>
  )
}

export default NavBar