
import React from 'react';
import Home from '../HOME/Home';



const LandingPage = () => {

  const [showHome, setShowHome] = React.useState(false);

  const handleClick = () => {
    console.log('hice click');
    setShowHome(true);
  };

  return (
    <div className="landing-page">
      {
        showHome ? (<Home/>): (<button onClick={handleClick}>Home</button>) 
      }
    </div>
  );
};

export default LandingPage;
