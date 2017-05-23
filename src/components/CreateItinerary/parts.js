import React from 'react';
import glamorous from  'glamorous';

const { Div } = glamorous

export const CreateItineraryBtn = ({ onClick }) => {
  return (
    <Div 
      marginBottom={'1rem'}
      padding={'1rem'}
      textAlign={'center'}
    >
      <button className="btn btn-primary btn-lg" onClick={onClick}>CREAT ITINERARY</button>
    </Div>
  );
}