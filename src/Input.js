import React, { useState } from 'react';
import styled from 'styled-components';

const Input = ({ selected, onSelect, ...props }) => {

  const handleSelect = () => {
    onSelect && onSelect(!selected);
  };

  return (
    <Container onClick={handleSelect} selected={selected}>
      <StyledInput selected={selected} {...props} />
    </Container>
  );
};

const Container = styled.div`
`;

const StyledInput = styled.input`
  border-radius: 10px;
  padding: 4px 10px;
  outline: none;
  -webkit-box-shadow: none;
  box-shadow: none;
  border-width: 1px;
  border-color: ${({ selected }) => selected ? 'pink' : 'black'};
  
  &:focus {
    border-color: inherit;
    -webkit-box-shadow: none;
    box-shadow: none;
  }
`;

 export default Input;
