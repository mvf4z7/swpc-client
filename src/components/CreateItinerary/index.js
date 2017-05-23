import React from 'react';

import ItineraryForm from '../ItineraryForm';
import {
  CreateItineraryBtn
} from './parts';

export default class CreateItinerary extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
    this.onReset = this.onReset.bind(this);

    this.state = {
      itinerary: this.getDefaultItinerary(),
      showForm: false,
    };
  }

  render() {
    const {
      showForm,
      itinerary,
    } = this.state;

    if(showForm) {
      return (
        <ItineraryForm 
          itinerary={itinerary}
          isModified
        />
      );
    } else {
      return (
        <CreateItineraryBtn onClick={()=>this.setState({ showForm: true })}/>
      );
    }
  }

  getDefaultItinerary() {
    return {
      origin_airport: '',
      destination_airport: '',
      outbound_date: '',
      return_date: '',
    };
  }

  onChange() {

  }

  onSave() {

  }

  onReset() {

  }

  ifModified() {

  }
}