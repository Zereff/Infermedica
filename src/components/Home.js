import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
	return (
		<div className="container">
		<div className="row">
			<div className="col">
				<h4>Having headache or fever?</h4>
				<p className="lead">I can help you find out what`s going
				on and connect to a right doctor.
				Just start.</p>
				<Link className="link link-lg" to={`/symptoms`}>Symptom assessment</Link>
			</div>
		</div>
	</div>
	);
}

export default Home;