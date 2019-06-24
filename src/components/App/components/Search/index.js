import React from 'react';
import './Search.css';

const Search = ({callbackSymptomInput, placeholder}) => 
	<input type="text"
		placeholder={placeholder}
		onChange={callbackSymptomInput}
		className="form-control custom-input" />;

export default Search;