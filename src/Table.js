import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import * as clipboard from 'clipboard-polyfill';
import Input from './Input';
import PlusButton from './PlusButton';
import CopyButton from './CopyButton';

const markupRows = (markup, rows) => {
  return rows.map(({ name, markup: m, ...o }) => {
    return {
      name,
      markup: markup.map((r, i) => ({ ...m[i], ...r })),
      ...o
    }
  });
};

const Table = ({ markup }) => {
  const [rows, setRows] = useState(markupRows(markup,[]));

  useEffect(() => {
    setRows(markupRows(markup, rows));
  }, [markup]);

  const handleAddRow = () => {
    setRows(r => markupRows(markup, [...r, { name: '', markup: [] }]));
  }

  const handleNameChange = (index) => (event) => {
    setRows(r => r.map((r, i) => {
     if (i === index) {
       return { ...r, name: event.target.value };
     }

     return r;
    }));
  };

  const handleSelect = (index, name) => () => {
    setRows(r => r.map((r, i) => {
      if (i === index) {
        return { ...r, markup: r.markup.map((m) => {
            if (m.name === name) {
              return { ...m, selected: !m.selected };
            }

            return m;
          })
        };
      }

      return r;
    }));
  };

  const calcResult = (m) => {
    return m.reduce((acc, { value, selected }) => selected ? acc + parseFloat(value) : acc, 0);
  };

  const handleCopy = () => {
    const textRows = rows.reduce((acc, { name, markup }) => `
    ${acc}<tr><td>${name}</td>${markup.reduce((acc, m) => m.selected ? `${acc}<td style="background-color:lightgreen">${m.name}</td>` : `${acc}<td>${m.name}</td>`, '')}<td>${calcResult(markup)}<td>
    `, `<tr><td><b>Feature</b></td>${Array.from({ length: markup.length }, () => '<td></td>').join('')}<td><b>Result</b></td></tr>`);
    const textTable = `<table>${textRows}</table>`

    const item = new clipboard.ClipboardItem({
      "text/html": new Blob(
        [textTable],
        { type: "text/html" }
      ),
      "text/plain": "ya sosal menya ebali"
    });
    clipboard.write([item]);
  };

  return (
    <Container>
      <Row>
        <div style={{ display: 'flex' }}>
          <div>Feature</div>
        </div>
        <div>Result</div>
      </Row>
      {rows.map(({ name, markup }, index) => (
        <Row>
          <div style={{ display: 'flex' }}>
            <Input value={name} onChange={handleNameChange(index)}/>
            {markup.map((m, i) => <Markup key={i} onClick={handleSelect(index, m.name)} selected={m.selected}>{m.name}</Markup>)}
          </div>
          <div>{calcResult(markup)}</div>
        </Row>
      ))}
      <div className="btn"></div>
      <PlusButton onClick={handleAddRow} />
      <CopyButton style={{ position: 'absolute', right: 10, bottom: 10}} onClick={handleCopy} />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
  border-radius: 12px;
  padding: 20px 40px;
  margin: 40px;
  align-items: center;
  position: relative;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  margin: 10px 0;
`;

const Markup = styled.div`
  cursor: pointer;
  padding: 4px 16px;
  margin: 0 4px;
  border-radius: 4px;
  ${({ selected }) => selected ? 'background-color: lightgreen;' : ''}
`;

export default Table;
