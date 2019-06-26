import React, { Component } from 'react';
import './List.css';

export default class List extends Component {
	callbackItemList = e => {
		this.props.callbackItemList(e.target);
	}

	render() {
		let { item } = this.props;

		return (
			<div className="form-check">
				<input type="checkbox"
					id={item.id}
					onChange={this.callbackItemList}
					className="form-check-input" />

				<label htmlFor={item.id}
					className="form-check-label">
					{item.label ? item.label : item.name}
				</label>
			</div>
		);
	}
}