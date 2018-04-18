import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Card from './Card';
import Modal from './Modal';

export const Title = () => {
  return (
    <div className="title">
      <div className="title-container">
        <h1>Amdocs React Assignment</h1>
      </div>
      <div className="button-container">
        <Link to="/list">
          <button>Show the Cards</button>
        </Link>
      </div>
    </div>
  );
};
