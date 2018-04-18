import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Card from './Card';
import Modal from './Modal';

 class List extends Component {
    constructor(props) {
      super(props);
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
          representative: 'shir',
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
      const {list} = this.state;
      const updated = Object.assign({}, this.state.selected, {name: ev.target.value});
      const foundObject = list.find(obj => obj.id === updated.id);
      Object.assign(foundObject, updated);
      this.setState({ list:list });// further value
    };

    handleChangeAge = ev => {
      const {list} = this.state;
      const updated = Object.assign({}, this.state.selected, {age: ev.target.value});
      const foundObject = list.find(obj => obj.id === updated.id);
      Object.assign(foundObject, updated);
      this.setState({ list:list });// further value
    };

    handleChangeCity = ev => {
      const {list} = this.state;
      const updated = Object.assign({}, this.state.selected, {city: ev.target.value});
      const foundObject = list.find(obj => obj.id === updated.id);
      Object.assign(foundObject.location, updated.location);
      this.setState({ list:list });// further value
    };

    render() {
      const { isOpen } = this.state;
      const { age, name } = this.state.selected;
      const { city } = this.state.selected.location;
      return (
        <div className="page-container">
          <div className="button-container">
            <Link to="/">
              <button>Back Home</button>
            </Link>
          </div>
          <div className="cards-container">
            {this.state.list.map(itemObj => (
              <div key={itemObj.id} onClick={() => this.toggleModal(itemObj)}>
                <Card details={itemObj} />
              </div>
            ))}
          </div>
          <Modal show={isOpen} onClose={this.toggleModal} onSave={this.saveCanges}>
            <div className="edit-field">
              <label htmlFor="name">name</label>
              <input
                id="name"
                onChange={(e) => this.handleChangeName(e)}
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
          </Modal>
        </div>
      );
    }
  }
  

  export default List;