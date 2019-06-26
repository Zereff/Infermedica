import React, { Fragment } from 'react';
import Nav from '../../../../../Nav';
import Avatar from '../../../../../Avatar';
// import '../../../../../../../../images/google-map.jpg'

const Doctor = (props) => {
  return (
    <Fragment>
      <div className="bg-green">
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="doctor-top-content">
                <Nav options="doctor" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="doctor-top-avatar">
              <div className="upper-content">
                <Avatar src={require(`../../../../../../../../images/neurologist-1-lg.jpg`)} size="l" />
              </div>
            </div>
            <div className="doctor-data">
              <div className="main-text mt-3">Cuzor Tatiana</div>
              <div className="second-text">Family Physician, Travel Medicine</div>
              <div className="away">0.5km away</div>
              <div className="rating mt-5">
                <i className="fas fa-star fa-2x"></i>
                <i className="fas fa-star fa-2x"></i>
                <i className="fas fa-star fa-2x"></i>
                <i className="fas fa-star fa-2x"></i>
                <i className="fas fa-star fa-2x"></i>
              </div>
              <div className="reviews mt-3">
                <a href="#">2215 reviews</a>
              </div>
              <p className="third mt-5 text-center">Dr. Cuzor Tatiana encourages open communication with his
                patients which allows him to guide them through their treatment as an active
                participant in their own well-being.</p>
              <div className="mt-3">
                <button className="read-more">Read more</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="google-map mt-5">
        <img src={require(`../../../../../../../../images/google-map.jpg`)} alt="Map" />
      </div>

      <div className="container mt-5">
        <div className="row">
          <div className="col">
            <button className="btn link-simple btn-lg btn-block mb-3">Book a free appointment</button>
            <button className="btn link-simple btn-lg btn-block mb-3">Ask for a second opinion</button>
          </div>
        </div>  
      </div>
    </Fragment>
  );
  // return <h1>Doctor {props.match.params.id}</h1>;
}

export default Doctor;