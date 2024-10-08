import React, { useEffect } from "react";
import { gsap, Linear } from "gsap";
import './NotFound.css';
import {  Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const NotFound = () => {
  useEffect(() => {
    let t1 = gsap.timeline();
    let t2 = gsap.timeline();
    let t3 = gsap.timeline();

    t1.to(".cog1notfound", {
      transformOrigin: "50% 50%",
      rotation: "+=360",
      repeat: -1,
      ease: Linear.easeNone,
      duration: 8,
    });

    t2.to(".cog2notfound", {
      transformOrigin: "50% 50%",
      rotation: "-=360",
      repeat: -1,
      ease: Linear.easeNone,
      duration: 8,
    });

    t3.fromTo(
      ".wrong-para",
      {
        opacity: 0,
      },
      {
        opacity: 1,
        duration: 1,
        stagger: {
          repeat: -1,
          yoyo: true,
        },
      }
    );
  }, []);

  return (
    <div className="containernotfound">
      <h1 className="first-four">4</h1>
      <div className="cog-wheel1">
        <div className="cog1notfound">
          <div className="topn"></div>
          <div className="downn"></div>
          <div className="left-topn"></div>
          <div className="left-downn"></div>
          <div className="right-topn"></div>
          <div className="right-downn"></div>
          <div className="leftn"></div>
          <div className="rightn"></div>
        </div>
      </div>

      <div className="cog-wheel2">
        <div className="cog2notfound">
          <div className="topn"></div>
          <div className="downn"></div>
          <div className="left-topn"></div>
          <div className="left-downn"></div>
          <div className="right-topn"></div>
          <div className="right-downn"></div>
          <div className="leftn"></div>
          <div className="rightn"></div>
        </div>
      </div>
      <h1 className="second-four">4</h1>
      <p className="wrong-para">Uh Oh! Page not found!</p>
      <Link to="/signedinUser" className="go-home-button">
      <Button className="go-home-button" >Go back to home</Button>

      </Link>


    </div>
  );
};

export default NotFound;