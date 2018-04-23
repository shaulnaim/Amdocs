import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Card from './Card';
import Modal from './Modal';

export const ThemeContext = React.createContext();
class ThemeProvider extends React.Component {
  state = {
    color: 'white',
    bgColor: 'slategrey',
    modalBgColor: 'yellow'
  };
  handleThemeToggle = () => {
    let color = this.state.color == 'white' ? 'slategrey' : 'white';
    let bgColor = color == 'white' ? 'slategrey' : '#c66b6b4d';
    let modalBgColor = color == 'white' ? 'tellow' : 'pink';
    this.setState({ color, bgColor ,modalBgColor});
  };

  render() {
    return (
      <React.Fragment>
        <button  className="toggle-theme" onClick={() => this.handleThemeToggle()}> Toggle theme </button>
        <ThemeContext.Provider value={{ state: this.state }}>
          {this.props.children}
        </ThemeContext.Provider>
      </React.Fragment>
    );
  }
}

export class List extends Component {
  constructor(props) {
    super(props);
    // console.log('conextAPI', ThemeContext);
    this.state = {
      isOpen: false,
      list: props.source.people,
      selected: {
        id: 2,
        age: 24,
        name: 'placeholder',
        location: {
          address: ' 25 Happy st',
          city: 'Ashdod',
          country: 'Israel'
        },
        representative: 'shir'
      }
    };
  }

  toggleModal = selectedObj => {
    this.setState({
      isOpen: !this.state.isOpen
    });
    if (selectedObj.name != undefined) {
      this.setState({
        selected: selectedObj
      });
    }
  };

  handleChangeName = ev => {
    const { list } = this.state;
    const updated = Object.assign({}, this.state.selected, {
      name: ev.target.value
    });
    const foundObject = list.find(obj => obj.id === updated.id);
    Object.assign(foundObject, updated);
    this.setState({ list: list }); // further value
  };

  handleChangeAge = ev => {
    const { list } = this.state;
    const updated = Object.assign({}, this.state.selected, {
      age: ev.target.value
    });
    const foundObject = list.find(obj => obj.id === updated.id);
    Object.assign(foundObject, updated);
    this.setState({ list: list }); // further value
  };

  handleChangeCity = ev => {
    const { list } = this.state;
    const updated = {
      ...this.state.selected, //copy everything from state.selected
      location: {
        //override the location property
        ...this.state.selected.location, //copy the everything from selected.location
        city: ev.target.value //override selected.location.city
      }
    };
    const foundObject = list.find(obj => obj.id === updated.id);
    Object.assign(foundObject.location, updated.location);
    this.setState({ list: list }); // further value
  };

  render() {
    const { isOpen } = this.state;
    const { age, name } = this.state.selected;
    const { city } = this.state.selected.location;
    return (
      <ThemeProvider>
        <div className="button-container header">
            <Link to="/">
              <button>Back Home</button>
            </Link>
          </div>
        <div className="page-container">
          <div className="cards-container">
            {this.state.list.map(itemObj => (
              <div key={itemObj.id} onClick={() => this.toggleModal(itemObj)}>
                <Card details={itemObj} />
              </div>
            ))}
          </div>
          <Modal
            show={isOpen}
            onClose={this.toggleModal}
            onSave={this.saveCanges}
          >
            <ThemeContext.Consumer>
              {context => (
                <div>
                  <h4
                    style={{
                      backgroundColor: context.state.bgColor,
                      color: context.state.color,
                      margin:0,
                      padding:10,
                      marginBottom:10
                    }}
                  >
                    Edit Data
                  </h4>
                  <div className="edit-field">
                    <label htmlFor="name">name:</label>
                    <input
                      id="name"
                      onChange={e => this.handleChangeName(e)}
                      defaultValue={name}
                    />
                  </div>
                  <div className="edit-field">
                    <label htmlFor="age">age</label>
                    <input
                      id="age"
                      onChange={this.handleChangeAge}
                      defaultValue={age}
                    />
                  </div>
                  <div className="edit-field">
                    <label htmlFor="city">city</label>
                    <input
                      id="city"
                      onChange={this.handleChangeCity}
                      defaultValue={city}
                    />
                  </div>
                </div>
              )}
            </ThemeContext.Consumer>
          </Modal>
        </div>
      </ThemeProvider>
    );
  }
}
