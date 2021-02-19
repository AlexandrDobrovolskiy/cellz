import React, { useState } from 'react';
import styled from 'styled-components';

import './App.css';
import Markup from './Markup';
import Table from './Table';
import Features from './Features';

function App() {
  const [markup, setMarkup] = useState([]);
  const [features, setFeatures] = useState([]);
  const [current, setCurrent] = useState(0);

  const handleChangeFeature = (index, feature) => {
    setFeatures(f => f.map((f, i) => {
      if (i === index) {
        return feature;
      }

      return f;
    }));
  };

  const handleSelectFeature = (index) => {
    setCurrent(index);
  };

  const handleAddFeature = () => {
    setFeatures(f => [...f, { name: `Feature ${f.length + 1}`, rows: []}])
  };


  return (
    <div className="App">
      <Row>
        <Markup markup={markup} onChange={setMarkup} />
        <Features current={current} onAddFeature={handleAddFeature} features={features} onSelect={handleSelectFeature} onChange={handleChangeFeature} />
      </Row>
      {!!features.length && <Table markup={markup} current={current} feature={features[current]} onChange={handleChangeFeature}/>}
    </div>
  );
}

const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

export default App;
