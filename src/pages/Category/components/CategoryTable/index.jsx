import React from 'react';
import PropTypes from 'prop-types';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { EditColumn, DeleteColumn } from './Column';

import './styles.scss';

const CategoryTable = (props) => {
  const { categoryList, onCategoryEditClick, onCategoryRemoveClick } = props;

  // Init Structe table
  const columns = [
    {
      dataField: '_id',
      text: 'Category ID',
    },
    {
      dataField: 'name',
      text: 'Category Name',
    },
    {
      dataField: 'edit',
      text: 'Edit',
      sort: false,
      formatter: EditColumn,
      headerAttrs: { width: 80 },
      attrs: { width: 80 },
      events: {
        onClick: (e, column, columnIndex, row, rowIndex) => {
          handleEditClick(row);
        },
      },
    },
    {
      dataField: 'delete',
      text: 'Delete',
      sort: false,
      formatter: DeleteColumn,
      headerAttrs: { width: 80 },
      attrs: { width: 80 },
      events: {
        onClick: (e, column, columnIndex, row, rowIndex) => {
          handleRemoveClick(row);
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
  const handleEditClick = (category) => {
    if (onCategoryEditClick) onCategoryEditClick(category);
  };

  const handleRemoveClick = (category) => {
    if (onCategoryRemoveClick) onCategoryRemoveClick(category);
  };

  // Render GUI
  return (
    <div>
      <BootstrapTable
        headerWrapperClasses='text-center'
        bodyClasses='text-left'
        keyField='_id'
        data={categoryList}
        columns={columns}
        pagination={paginationFactory(options)}
      />
    </div>
  );
};

CategoryTable.propTypes = {
  categoryList: PropTypes.array,
  onCategoryEditClick: PropTypes.func,
  onCategoryRemoveClick: PropTypes.func,
};

CategoryTable.defaultProps = {
  categoryList: [],
  onCategoryEditClick: null,
  onCategoryRemoveClick: null,
};

export default CategoryTable;
