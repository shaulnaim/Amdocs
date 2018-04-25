import React, { Component } from 'react';
import { ThemeContext } from './CardsList';

class Card extends Component {
  render(props) {
    const { name, age, representative, avatar } = this.props.details;
    const { city, country } = this.props.details.location;
    return (
      <ThemeContext.Consumer>
        {context => (
          <div className="card">
            <div className="card-image" style={{backgroundImage:`url(${avatar})`}}/>
            <span className="card-header">
              <span
                className="card-title"
                style={{ backgroundColor: context.state.bgColor }}
              >
                <h3 style={{ color: context.state.color }}>{name}</h3>
              </span>
            </span>
            <span className="card-line">Age: {age}</span>
            <span className="card-line">City: {city}</span>
            <span className="card-line">Country: {country}</span>
            <span className="card-line">Representative: {representative}</span>
          </div>
        )}
      </ThemeContext.Consumer>
    );
  }
}

export default Card;
