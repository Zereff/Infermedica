import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Nav from '../Nav';
import Avatar from '../Avatar';

const Home = () => {
	return (
		<Fragment>
			<div className="container">
				<div className="row">
					<div className="col">
						<Nav />
						<div className="text-center mt-6 mb-5">
							<Avatar />
						</div>
						<p className="main text-center mb-20">Having 
							<span className="green">headache</span> or 
							<span className="green">fever</span>?<br /><br />
							I can help you find out what`s going
							on and connect to a right doctor.
							Just start.</p>
						<Link className="btn link-simple btn-lg btn-block mb-3" to={`/symptoms`}>Symptom assessment</Link>
						<button className="btn link-simple btn-lg btn-block mb-3">Ask for a doctor's opinion</button>
						<button className="btn link-simple btn-lg btn-block mb-3">Find a doctor near me</button>
					</div>
				</div>
			</div>
		</Fragment>
	);
}

export default Home;