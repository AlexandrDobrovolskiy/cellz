import React from 'react';
import styled from 'styled-components';
import copy from './copy.svg';

const CopyButton = ({ ...props }) => {
  return (
    <Container {...props}>
      <img src={copy} alt="plus" />
    </Container>
  );
};

const Container = styled.div`
  width: 40px;
  height: 40px;
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

export default CopyButton;
