import React, { useState } from'react';
import styled from 'styled-components';
import Input from './Input';
import PlusButton from './PlusButton';

const Markup = ({ markup, onChange }) => {
  const handleAddRow = () => {
    onChange(m => [
      ...m,
      { name: '', value: ''}
    ]);
  }

  const handleNameChange = (index) => (event) => {
    const { value: name } = event.target;

    onChange(m => m.map((r, i) => {
      if (i === index) {
        return { ...r, name };
      }

      return r;
    }))
  };

  const handleValueChange = (index) => ({ target }) => {
    const { value } = target;

    onChange(m => m.map((r, i) => {
      if (i === index) {
        return { ...r, value };
      }

      return r;
    }));
  };

  return (
    <Container>
      <Row style={{ marginBottom: '10px' }}>
        <div style={{ width: '100%', textAlign: 'left' }}>
          Name
        </div>
        <div style={{ width: '100%', textAlign: 'left' }}>
          Value
        </div>
      </Row>
      {markup.map(({ name, value }, index) => (
        <Row>
          <Input onChange={handleNameChange(index)} value={name} />
          <Input onChange={handleValueChange(index)} value={value} />
        </Row>
      ))}
      <PlusButton onClick={handleAddRow}>+</PlusButton>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
  border-radius: 12px;
  width: 30vw;
  margin: 40px;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin: 6px;
  width: 100%;
`;

export default Markup;
