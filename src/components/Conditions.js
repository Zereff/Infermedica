import React from 'react';

const Conditions = ({conditions}) => (
  <div className="container">
    <div className="row">
      <div className="col">
				<h4 className="border-bottom">Conditions</h4>
				<ul className="list-group list-group-flush">
					<p className="text-right"><span>Probability</span></p>
					{conditions.map((condition, index) => (
						<li key={condition.id}
							className={`list-group-item d-flex justify-content-between align-items-center 
								${0 !== index ? '' : 'active'}`}>
							{condition.name}
							<span>{condition.probability}</span>
						</li>
					))}
				</ul>
			</div>	
		</div>
	</div>
);

export default Conditions;