import React from 'react';
import { useParams } from 'react-router-dom';
import TableView from './TableView';

const TablePage = () => {
  const { tableName } = useParams();
  return <TableView tableName={tableName} />;
};

export default TablePage;
