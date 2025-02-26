import React from "react";
import bgBanner from "../../assets/banner.png"
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="hero py-24">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <Link to="/login"><img className='w-full' src={bgBanner} alt="" /></Link>
      </div>
    </div>
  );
};

export default Home;
