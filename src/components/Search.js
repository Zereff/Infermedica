import React from 'react';

const Search = ({callbackSymptomInput}, {placeholder}) => 
	<input type="text"
		placeholder={placeholder}
		onChange={callbackSymptomInput}
		className="form-control" />;

export default Search;