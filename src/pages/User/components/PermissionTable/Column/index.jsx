import React from 'react';
import { Input } from 'reactstrap';

// GUI column Edit
const IsAdminColumn = (cell, row, rowIndex, formatExtraData) => {
  return (
    <div
      style={{
        textAlign: 'center',
      }}>
      <Input
        type='checkbox'
        style={{ marginLeft: '-0.45rem' }}
        checked={cell}
        onChange={(e) => null}
      />
    </div>
  );
};

export { IsAdminColumn };
