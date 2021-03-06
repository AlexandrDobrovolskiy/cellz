import React from 'react';
import styled from 'styled-components';
import plus from './plus.svg';

const PlusButton = ({ ...props }) => {
    return (
      <Container {...props}>
        <img src={plus} alt="plus" />
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

export default PlusButton;
