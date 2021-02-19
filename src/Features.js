import React from 'react';
import styled from 'styled-components';
import Input from './Input';
import PlusButton from './PlusButton';

const Features = ({ features, onChange, onSelect, onAddFeature, current }) => {
  const handleChange = (index) => (event) => {
    const { value } = event.target;

    return onChange(index, { ...features[index], name: value });
  };

  const handleSelect = (index) => () => {
    onSelect(index);
  };

  return (
    <Container>
      <div style={{ width: '100%', textAlign: 'left', fontSize: 20, marginBottom: 14 }}>Features</div>
      {features.map((f, i) => (
        <Input style={{ width: '100%', margin: '4px' }} selected={current === i} value={f.name} onSelect={handleSelect(i)} onChange={handleChange(i)} />
      ))}
      <PlusButton onClick={onAddFeature} />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
  border-radius: 12px;
  width: 30vw;
  margin: 40px;
`;

export default Features;
