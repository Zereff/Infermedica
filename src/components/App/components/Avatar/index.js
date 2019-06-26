import React from 'react';
import './Avatar.css';
import defaultImage from './images/avatar.png';

const Avatar = ({src, size}) => {
  let styleSize = '';
  switch (size) {
    case 's':
      styleSize = 'avatar-sm';
      break;
    case 'm':
      styleSize = 'avatar-md';
      break;
    case 'l':
        styleSize = 'avatar-lg';
        break;
    default:
  }

  return <img 
    className={`avatar ${styleSize}`}
    src={src ? src : defaultImage}
    alt="Avatar" />;
}

export default Avatar;