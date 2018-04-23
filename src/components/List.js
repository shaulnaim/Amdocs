import React, { Component, StrictMode } from 'react';
import { Link } from 'react-router-dom';
import Card from './Card';
import Modal from './Modal';
import ModalContent from './ModalContent';

export const ThemeContext = React.createContext();
class ThemeProvider extends React.Component {
  state = {
    color: 'white',
    bgColor: 'slategrey',
    modalBgColor: 'yellow'
  };
  handleThemeToggle = () => {
    let color = this.state.color === 'white' ? 'slategrey' : 'white';
    let bgColor = color === 'white' ? 'slategrey' : '#c66b6b4d';
    let modalBgColor = color === 'white' ? 'tellow' : 'pink';
    this.setState({ color, bgColor, modalBgColor });
  };

  render() {
    return (
      <React.Fragment>
        <StrictMode>
          <button
            className="toggle-theme"
            onClick={() => this.handleThemeToggle()}
          >
            {' '}
            Toggle theme{' '}
          </button>
          <ThemeContext.Provider value={{ state: this.state }}>
            {this.props.children}
          </ThemeContext.Provider>
        </StrictMode>
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
      search: '',
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

  componentDidMount() {
    this.myRef.current.focus();
  }

  updateSearch = event => {
    this.setState({
      search: event.target.value.substr(0, 10)
    });
  };

  toggleModal = selectedObj => {
    this.setState({
      isOpen: !this.state.isOpen
    });
    if (selectedObj.name !== undefined) {
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

  myRef = React.createRef();
  render() {
    const { isOpen } = this.state;
    const { age, name } = this.state.selected;
    const { city } = this.state.selected.location;
    let filteredContacts = this.state.list.filter(contact => {
      return contact.name
        .toLowerCase()
        .includes(this.state.search.toLowerCase());
    });
    let isDisplay = filteredContacts.length < 1 ? 'block' : 'none';
    return (
      <StrictMode>
        <ThemeProvider>
          <ThemeContext.Consumer>
            {context => (
              <React.Fragment>
                <div
                  className="button-container header"
                  style={{ backgroundColor: context.state.bgColor }}
                >
                  <Link to="/">
                    <button className="back">Back Home</button>
                  </Link>
                  <input
                    ref={this.myRef}
                    className="search-input"
                    type="text"
                    defaultValue={this.state.search}
                    onChange={this.updateSearch}
                    placeholder="Search Pesrson"
                  />
                </div>

                <div className="page-container">
                  <div className="cards-container">
                    <div className="no-data" style={{ display: isDisplay }}>
                      {' '}
                      No data Found
                    </div>
                    {filteredContacts.map(contact => (
                      <div
                        key={contact.id}
                        onClick={() => this.toggleModal(contact)}
                      >
                        <Card details={contact} />
                      </div>
                    ))}
                  </div>
                  <Modal
                    show={isOpen}
                    onClose={this.toggleModal}
                    onSave={this.saveCanges}
                  >
                  <ModalContent age={age} 
                                city={city}   
                                name={name}
                                onEnter={this.toggleModal}
                                onChangeCity={this.handleChangeCity}
                                onChangeAge={this.handleChangeAge}
                                onChangeName={this.handleChangeName}/>
                  </Modal>
                </div>
              </React.Fragment>
            )}
          </ThemeContext.Consumer>
        </ThemeProvider>
      </StrictMode>
    );
  }
}
