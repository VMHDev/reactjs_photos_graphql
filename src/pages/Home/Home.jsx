import React, { Fragment } from 'react';

// Styles
import './styles.scss';

const Home = () => {
  return (
    <Fragment>
      <div className='home'>
        <div
          className='home home-container'
          data-aos='zoom-in'
          data-aos-delay={100}>
          <h1>Welcome to Photos App</h1>
          <h2>Picture, image and more...</h2>
        </div>
      </div>
    </Fragment>
  );
};

export default Home;
