import React, { useState } from 'react';

import './App.css';
import Markup from './Markup';
import Table from './Table';

function App() {
  const [markup, setMarkup] = useState([]);

  return (
    <div className="App">
      <Markup markup={markup} onChange={setMarkup} />
      <Table markup={markup} />
    </div>
  );
}

export default App;
