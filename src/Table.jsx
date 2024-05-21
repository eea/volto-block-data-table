import React, { useState } from 'react';
import cx from 'classnames';
import { Table } from 'semantic-ui-react';
import config from '@plone/volto/registry';

import './table.less';

const TableComponent = (props) => {
  const { components } = config.settings.table;
  const { rows, columnDefs, defaultColDef, withHeaders, TableProps } = props;
  const { celled, striped, borderless, compacted } = TableProps || {};

  const [ColumnHeader] = useState(() => components.columnHeader);
  const [CellRenderer] = useState(() => components.cellRenderer);

  return (
    <Table
      className={cx('data-table unstackable', {
        borderless,
        compacted,
      })}
      celled={celled}
      striped={striped}
      stackable={false}
    >
      {withHeaders && (
        <Table.Header>
          <Table.Row>
            {columnDefs.map((colDef) => (
              <ColumnHeader
                key={colDef.field}
                colDef={{ ...defaultColDef, ...colDef }}
              />
            ))}
          </Table.Row>
        </Table.Header>
      )}
      <Table.Body>
        {rows.map((row) => (
          <Table.Row key={row.id}>
            {columnDefs.map((colDef) => (
              <CellRenderer
                key={colDef.field}
                colDef={{ ...defaultColDef, ...colDef }}
                row={row}
              />
            ))}
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

export default TableComponent;
