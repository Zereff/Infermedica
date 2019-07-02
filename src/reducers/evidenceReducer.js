const evidenceReducer = (state = [], action) => {
  if (action.type === 'ADD_EVIDENCE') {
    let evidence = [
      ...state,
      ...action.payload
    ];

    localStorage.setItem('evidence', JSON.stringify(evidence));

    return evidence;
  }

  return localStorage.getItem('evidence') 
    ? JSON.parse(localStorage.getItem('evidence'))
    : state;
}

export default evidenceReducer;