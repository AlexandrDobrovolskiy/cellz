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

const Table = ({ markup, current, feature, onChange }) => {
  const setRows = (cb) => {
    if (typeof cb === 'function') {
      onChange(current, { ...feature, rows: cb(feature.rows) });
      return;
    }

    onChange(current, { ...feature, rows: cb });
  };

  useEffect(() => {
    setRows(markupRows(markup, feature.rows));
  }, [markup]);


  const handleAddRow = () => {
    setRows(r => markupRows(markup, [...r, { name: `Category ${r.length + 1}`, markup: [] }]));
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
              return { ...m, selected: true };
            }

            return { ...m, selected: false };
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
    let textRows1 = `<tr><td>${feature.name}</td></tr>`;
    textRows1 += `<tr>${feature.rows.map(row => `<td>${row.name}</td>`).join('')}</tr>`
    for (let i = 0; i < feature.rows.length; i++) {
      textRows1 += `<tr>${feature.rows.map(row => `<td style="background-color: ${row.markup[i].selected ? 'lightgreen' : 'none'}">${row.markup[i].name}</td>`).join('')}</tr>`
    }
    textRows1 += `<tr>${feature.rows.map(row => `<td><b>Score:</b> ${calcResult(row.markup)}</td>`).join('')}</tr>`
    textRows1 += `<tr><td><b>Total feature score:</b> ${calcResult(feature.rows.reduce((acc, { markup }) => [...acc, ...markup], []))}</td></tr>`
    const textTable1 = `<table>${textRows1}</table>`;

    const item = new clipboard.ClipboardItem({
      "text/html": new Blob(
        [textTable1],
        { type: "text/html" }
      ),
      "text/plain": "Paste it to google sheets or exel"
    });
    clipboard.write([item]);
  };

  return (
    <Container>
      <Row>
        <div style={{ display: 'flex' }}>
          <div>{feature.name}</div>
        </div>
      </Row>
      <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
        {feature.rows.map(({ name, markup }, index) => (
            <div style={{ display: 'flex', flexDirection: 'column', padding: 20 }}>
              <Input value={name} onChange={handleNameChange(index)}/>
              {markup.map((m, i) => <Markup key={i} onClick={handleSelect(index, m.name)} selected={m.selected}>{m.name}</Markup>)}
              <div>{calcResult(feature.rows[index].markup)}</div>
            </div>
        ))}
      <PlusButton onClick={handleAddRow} />
      </div>
      <div><b>Total points: </b>{calcResult(feature.rows.reduce((acc, { markup }) => [...acc, ...markup], []))}</div>
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
  flex-direction: column;
  width: 100%;
  justify-content: space-between;
  margin: 10px 0;
`;

const Markup = styled.div`
  cursor: pointer;
  padding: 4px 14px;
  text-align: left;
  width: 100%;
  margin: 6px 4px;
  border-radius: 4px;
  ${({ selected }) => selected ? 'background-color: lightgreen;' : ''}
`;

export default Table;
