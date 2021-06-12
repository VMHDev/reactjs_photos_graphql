import React from 'react';
import PropTypes from 'prop-types';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { IsAdminColumn } from './Column';

import './styles.scss';

const PermissionTable = (props) => {
  const { userList, onUserSetAdminClick } = props;
  // Init Structe table
  const columns = [
    {
      dataField: '_id',
      text: 'User ID',
    },
    {
      dataField: 'name',
      text: 'Name',
    },
    {
      dataField: 'email',
      text: 'Email',
    },
    {
      dataField: 'isAdmin',
      text: 'Admin',
      sort: false,
      formatter: IsAdminColumn,
      headerAttrs: { width: 80 },
      attrs: { width: 80 },
      events: {
        onClick: (e, column, columnIndex, row, rowIndex) => {
          handleEditClick(e.target.checked, row);
        },
      },
    },
  ];

  // Config pagination
  const options = {
    sizePerPage: 5,
    hideSizePerPage: true,
    hidePageListOnlyOnePage: true,
  };

  // Handle events
  const handleEditClick = (isAdmin, user) => {
    if (onUserSetAdminClick) onUserSetAdminClick(isAdmin, user);
  };

  // Render GUI
  return (
    <div>
      <BootstrapTable
        headerWrapperClasses='text-center'
        bodyClasses='text-left'
        keyField='_id'
        data={userList}
        columns={columns}
        pagination={paginationFactory(options)}
      />
    </div>
  );
};

PermissionTable.propTypes = {
  userList: PropTypes.array,
  onUserEditClick: PropTypes.func,
  onUserRemoveClick: PropTypes.func,
};

PermissionTable.defaultProps = {
  userList: [],
  onUserEditClick: null,
  onUserRemoveClick: null,
};

export default PermissionTable;
