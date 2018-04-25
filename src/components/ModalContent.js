import React, { Component } from 'react';
import { ThemeContext } from './CardsList';

export default class ModalContent extends Component {
  componentDidMount() {
    this.modalRef.current.focus();
  }
  modalRef = React.createRef();
  render() {
    return (
      <ThemeContext.Consumer>
        {context => (
          <div
            onKeyDown={e => {
              if (e.keyCode == 13) {
                this.props.onEnter(e);
              }
            }}
          >
            <h4
              style={{
                backgroundColor: context.state.bgColor,
                color: context.state.color,
                margin: 0,
                padding: 10,
                marginBottom: 10
              }}
            >
              Edit Data
            </h4>
            <div className="edit-field">
              <label htmlFor="name">name:</label>
              <input
                ref={this.modalRef}
                id="name"
                onChange={e => this.props.onChangeName(e)}
                defaultValue={this.props.name}
              />
            </div>
            <div className="edit-field">
              <label htmlFor="age">age</label>
              <input
                id="age"
                onChange={this.props.onChangeAge}
                defaultValue={this.props.age}
              />
            </div>
            <div className="edit-field">
              <label htmlFor="city">city</label>
              <input
                id="city"
                onChange={this.props.onChangeCity}
                defaultValue={this.props.city}
              />
            </div>
          </div>
        )}
      </ThemeContext.Consumer>
    );
  }
}
