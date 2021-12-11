import React from 'react';
import {NavLink} from "react-router-dom";

function Home() {
  return (
    <div>
      <NavLink to="/login">Login</NavLink>
      Welcome to the Home Page!
    </div>
  );
}

export default Home;
