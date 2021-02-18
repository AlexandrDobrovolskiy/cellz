import React, { useState } from 'react';
import styled from 'styled-components';

const Input = ({ selected, onSelect, ...props }) => {

  const handleSelect = () => {
    onSelect && onSelect(!selected);
  };

  return (
    <Container onClick={handleSelect} selected={selected}>
      <StyledInput {...props} />
    </Container>
  );
};

const Container = styled.div`
`;

const StyledInput = styled.input`
  border-radius: 10px;
  padding: 4px 10px;
  border-width: 1px;
  border-color: black;
  outline: none;
`;

 export default Input;
