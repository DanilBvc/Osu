import React, { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import AddMapHeader from './addMapHeader/AddMapHeader';
import './addMap.scss';
import AddMapComponent from './addMapMain/AddMapComponent';
import AddMapNews from './addMapNews/AddMapNews';

function AddMap() {
  const [input, setInput] = useState<string>('');
  const { state } = useLocation();
  const handleInput = (
    value: React.KeyboardEvent<HTMLElement> | null,
    inputValue: string,
    mustBeRemoved?: boolean
  ) => {
    if (value?.key === 'Enter') {
      setInput(inputValue);
    }
    if (mustBeRemoved) {
      setInput('');
    }
  };
  useEffect(() => {
    if (state) {
      setInput(state.input);
    }
  }, [state]);
  return (
    <>
      <AddMapHeader handleInput={handleInput} input={input} />
      <Routes>
        <Route path="/" element={<AddMapNews />} />
        <Route path="recently" element={<AddMapComponent input={input} />} />
        <Route path="popular" element={<AddMapComponent input={input} />} />
        <Route path="classification" element={<AddMapComponent input={input} />} />
      </Routes>
    </>
  );
}

export default AddMap;
