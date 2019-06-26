import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Nav from '../../../Nav';
import Avatar from '../../../Avatar';
import Api from '../../../../../../api';

const Conditions = ({conditions}) =>
	<Fragment>
		<div className="container">
			<div className="row">
				<div className="col">
					<Nav options="avatar" />
					<p className="main text-center mt-6 mb-6">Based on the interview, here are possible causes:</p>
					<p className="second text-center mt-4 mb-6">People with symptoms similar to yours do not usually require urgent medical care.
						You should seek advice from a doctor though, within the next 2-3 days.
						If your symptomps ge worse, or if you notice new symptoms,
						you may need to consult a doctor sooner.</p>
				</div>	
			</div>
		</div>

		{conditions.map((condition, index) => {
			let iteration = index + 1;
			let isOdd = iteration % 2 !== 0;
			let toPersentProbability = condition.probability * 100;
			let progressBarStyle = {
				width: `${toPersentProbability}%`
			}

			return (
				<div key={condition.id} className={isOdd ? 'bg-gray' : ''}>
					<div className="container">
						<div className="row">
							<div className="col">

								<div className="opinion">
									<div className="header mt-5">
										<div className="left-side">
											<span className="iteration">{iteration}</span>
										</div>
										<div className="right-side">
											<p className="main">{condition.name}</p>
											<ul className="symptoms">
												<li>neurology</li>
												<li className="red">severe</li>
											</ul>
										</div>
										<div className="progress">
											<div className="progress-bar" role="progressbar" style={progressBarStyle} aria-valuenow={parseInt(toPersentProbability)} aria-valuemin="0" aria-valuemax="100"></div>
										</div>
									</div>
									<div className="body">
										<p className="third text-center mb-5">You need to see a doctor immediately! See doctors near you:</p>
										<div className="conditions">
											<div className="item">
												<Link to={`/doctors/1`}>
													<Avatar src={require(`../../../../../../images/neurologist-1.jpg`)} size="m" />
												</Link>
												<div className="list-data mt-4">
													<div className="main-text">
														<Link to={`/doctors/1`}>Cuzor Tatiana</Link>
													</div>
													<div className="second-text mt-1">neurologist</div>
													<div className="away mt-3">0.5km away</div>
												</div>
											</div>
											<div className="item">
												<Link to={`/doctors/2`}>
													<Avatar src={require(`../../../../../../images/neurologist-2.jpg`)} size="m" />
												</Link>
												<div className="list-data mt-4">
													<div className="main-text">
														<Link to={`/doctors/2`}>Tentiuc Rodica</Link>
													</div>
													<div className="second-text mt-1">neurologist</div>
													<div className="away mt-3">1km away</div>
												</div>
											</div>
											<div className="item">
												<Avatar src={require(`../../../../../../images/map.png`)} size="m" />
												<div className="list-data mt-4">
													<div className="main-text">
														<Link to={`/doctors`}>Sell all doctors</Link>
													</div>
													<div className="second-text mt-1">near your</div>
													<div className="away mt-3">view map</div>
												</div>
											</div>
										</div>
									</div>
									<div className="footer mt-6">
										<Link className="btn link-simple btn-lg btn-block mb-3" to={`/doctors/1`}>Ask neruologist for a 2nd opinion</Link>
									</div>
								</div>

							</div>
						</div>
					</div>
				</div>		
			);
		})}
	</Fragment>

export default Conditions;