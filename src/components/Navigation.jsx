import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Routes from "../routes";
import Nav from "react-bootstrap/Nav";
import "./Navigation.css";

const Navigation = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  function nextPage(path) {
    setShow(false);
    navigate(path);
  }

  return (
    <>
      <Nav className="navside ps-4 pt-4">
        {Routes.map((route, index) => {
          return (
            <Nav.Link
              className="navNav mb-2"
              key={index}
              onClick={() => nextPage(route.path)}
            >
              {route.name}
            </Nav.Link>
          );
        })}

        <div className="overlays1"></div>
      </Nav>
    </>
  );
};

export default Navigation;
