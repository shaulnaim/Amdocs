import React from 'react';
import PropTypes from 'prop-types';
import { ThemeContext } from './List';

class Modal extends React.Component {
  render() {
    if (!this.props.show) {
      return null;
    }

    // The gray background
    const backdropStyle = {
      position: 'fixed',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'rgba(0,0,0,0.4)',
      padding: 50,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    };

    // The modal "window"
    const modalStyle = {
      backgroundColor: '#fff',
      borderRadius: 5,
      maxWidth: 310,
      minHeight: 180,
      margin: '0 auto',
      padding: 20,
      border: 4,
      borderStyle: 'solid',
      borderColor: 'black',
      zIndex: 999
    };

    const footerStyle = {
      display: 'flex',
      justifyContent: 'center',
      marginTop: 20
    };

    return (
      <ThemeContext.Consumer>
        {context => (
          <div className="backdrop" style={backdropStyle}>
            <div
              className="modal"
              style={Object.assign({}, modalStyle, 
                {borderColor: context.state.bgColor}
              )}
            >
              {this.props.children}
              <div className="footer" style={footerStyle}>
                <button onClick={this.props.onClose}>Close</button>
              </div>
            </div>
          </div>
        )}
      </ThemeContext.Consumer>
    );
  }
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool,
  children: PropTypes.node
};

export default Modal;
