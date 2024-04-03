import { Fragment } from 'react';
import { Table } from 'semantic-ui-react';

import { renderers, components } from '@eeacms/volto-block-data-table/config';

function getDefaultCellRenderer() {
  return components[renderers.default];
}

function getCellRendererByDataType(dataType) {
  const componentName = dataType ? renderers.dataType[dataType] : null;
  return componentName ? components[componentName] : null;
}

function getCellRendererByWidget(widget) {
  const componentName = widget ? renderers.widget[widget] : null;
  return componentName ? components[componentName] : null;
}

function getCellRendererByRowType(rowType) {
  const componentName = rowType ? renderers.rowType[rowType] : null;
  return componentName ? components[componentName] : null;
}

const CellRenderer = (props) => {
  const { colDef, row, tableCell = true } = props;
  const { widget, dataType } = colDef;

  const rowType = row.rowType;

  const value = props.row[colDef.field];

  const CellRenderer =
    getCellRendererByRowType(rowType) ||
    getCellRendererByWidget(widget) ||
    getCellRendererByDataType(dataType) ||
    getDefaultCellRenderer();

  const TableCell = tableCell ? Table.Cell : Fragment;

  return (
    <TableCell>
      <CellRenderer {...props} value={value} />
    </TableCell>
  );
};

export default CellRenderer;
