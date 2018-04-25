import React, { Component, StrictMode } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as contactsActions from '../actions/contactsActions';
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
    this.setState({ color, bgColor });
  };

  render() {
    return (
      <React.Fragment>
        <StrictMode>
          <button
            className="toggle-theme"
            onClick={() => this.handleThemeToggle()}
          >
            Toggle theme
          </button>
          <ThemeContext.Provider value={{ state: this.state }}>
            {this.props.children}
          </ThemeContext.Provider>
        </StrictMode>
      </React.Fragment>
    );
  }
}

class CardsList extends Component {
  UNSAFE_componentWillMount() {
    // HERE WE ARE TRIGGERING THE ACTION
    this.props.contactsActions.getContacts();
  }
  componentDidMount() {
    this.myRef.current.focus();
  }

  updateSearch = event => {
    this.props.contactsActions.dispatchSearch(event.target.value.substr(0, 10));
  };

  toggleModal = selectedObj => {
    this.props.contactsActions.dispatchToggleModal(!this.props.isOpen);
    if (selectedObj.name !== undefined) {
      this.props.contactsActions.dispatchUpdateSelected(selectedObj);
    }
  };

  handleChangeName = ev => {
    this.props.contactsActions.dispatchEditName(ev.target.value);
  };

  handleChangeAge = ev => {
    this.props.contactsActions.dispatchEditAge(ev.target.value);
  };

  handleChangeCity = ev => {
    this.props.contactsActions.dispatchEditCity(ev.target.value);
  };

  myRef = React.createRef();
  render() {
    const { isOpen } = this.props;
    const { age, name, city } = this.props;
    let filteredContacts = this.props.contacts.filter(contact => {
      return contact.name
        .toLowerCase()
        .includes(this.props.search.toLowerCase());
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
                    defaultValue={this.props.search}
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
                    <ModalContent
                      age={age}
                      city={city}
                      name={name}
                      onEnter={this.toggleModal}
                      onChangeCity={this.handleChangeCity}
                      onChangeAge={this.handleChangeAge}
                      onChangeName={this.handleChangeName}
                    />
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

const mapStateToProps = state => {
  return {
    contacts: state.contacts.contacts,
    age: state.contacts.selected.age,
    name: state.contacts.selected.name,
    city: state.contacts.selected.location.city,
    isOpen: state.contacts.isOpen,
    search: state.contacts.search
  };
};

const mapDispatchToProps = dispatch => {
  return {
    contactsActions: bindActionCreators(contactsActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CardsList);
