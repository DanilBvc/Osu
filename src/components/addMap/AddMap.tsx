/* eslint-disable import/no-unresolved */
/* eslint-disable guard-for-in */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-restricted-syntax */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import AddMapHeader from './addMapHeader/AddMapHeader';
import './addMap.scss';
import AddMapComponent from './addMapMain/AddMapComponent';

function AddMap() {
  const [input, setInput] = useState<string>('');
  const handleInput = (value: React.KeyboardEvent<HTMLElement>, inputValue: string) => {
    if (value.code === 'Enter') {
      setInput(inputValue);
    }
  };

  return (
    <>
      <AddMapHeader handleInput={handleInput} />
      <Routes>
        <Route path="/" element={<AddMapComponent input={input} />} />
        <Route path="recently" element={<AddMapComponent input={input} />} />
        <Route path="popular" element={<AddMapComponent input={input} />} />
        <Route path="classification" element={<AddMapComponent input={input} />} />
      </Routes>
    </>
  );
}

export default AddMap;
