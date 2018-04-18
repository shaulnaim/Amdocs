import React, { Component } from 'react';

class Card extends Component {
  render() {
    const { name, age, representative } = this.props.details;
    const { city, country } = this.props.details.location;
    return (
      <div className="card">
        <span className="card-header">
          <span className="card-title">
            <h3>{name}</h3>
          </span>
        </span>
        <span className="card-line">Age: {age}</span>
        <span className="card-line">City: {city}</span>
        <span className="card-line">Country: {country}</span>
        <span className="card-line">Representative: {representative}</span>
      </div>
    );
  }
}

export default Card;
