import React from 'react'
import ContentContainer from '../../components/ContentContainer';
import './style.css';

 const NotFound = () => {
  return (
    <>
    <ContentContainer>
      <div className="notfound">
        <h3>Error 404</h3>
        <span>Page not found!</span>
      </div>
    </ContentContainer>
    </>
  )
};

export default NotFound;
