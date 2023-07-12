import React, { useEffect, useState, useContext, useRef } from "react";
import { NavLink } from 'react-router-dom';
import "./NavBar.css";
import { useNavigate } from "react-router-dom";

function NavBar() {
    const [dropdown, setDropdown] = useState(false);
    const dropdownBtn = useRef();
    const [isMediaSizeUnder992px, setIsMediaSizeUnder992px] = useState(window.innerWidth < 992);
    const navigate = useNavigate();


    useEffect(() => {
        const handleResize = () => {
          setIsMediaSizeUnder992px(window.innerWidth < 992);
        };
    
        window.addEventListener("resize", handleResize);
    
        return () => {
          window.removeEventListener("resize", handleResize);
        };
      }, []);
    

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

return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
    <a className="navbar-brand" style={{justifyContent:"flex-start",marginLeft:"20px" }} href="#">JunHao86 Github</a>
        <div className="container-fluid" style={{ justifyContent: "flex-end" }}>
        
        {/* Size >992px */}
        {!isMediaSizeUnder992px && (
            <div className="navbar-nav gap-3">
                <NavLink to="/about">Upload</NavLink>
                <NavLink to="/education">Education</NavLink>
                <NavLink to="/projects">Projects</NavLink>
            </div>
            )}
        </div>

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