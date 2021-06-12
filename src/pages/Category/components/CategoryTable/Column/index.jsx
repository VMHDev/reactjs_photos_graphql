import React from 'react';
import { Button } from 'reactstrap';
import { BsX, BsPencil } from 'react-icons/bs';

// GUI column Edit
const EditColumn = (cell, row, rowIndex, formatExtraData) => {
  const iconStyles = { color: 'white', fontSize: '1.5em' };
  return (
    <div
      style={{
        textAlign: 'center',
        cursor: 'pointer',
        lineHeight: 'normal',
      }}>
      <Button style={{ fontSize: 12 }} color='success'>
        <BsPencil style={iconStyles} />
      </Button>
    </div>
  );
};
// GUI column Delete
const DeleteColumn = (cell, row, rowIndex, formatExtraData) => {
  const iconStyles = { color: 'white', fontSize: '2.0em' };
  return (
    <div
      style={{
        textAlign: 'center',
        cursor: 'pointer',
        lineHeight: 'normal',
      }}>
      <Button style={{ fontSize: 10 }} color='danger'>
        <BsX style={iconStyles} />
      </Button>
    </div>
  );
};

export { EditColumn, DeleteColumn };
