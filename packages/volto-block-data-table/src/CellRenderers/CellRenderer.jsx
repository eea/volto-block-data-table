import { Fragment } from 'react';
import { Table } from 'semantic-ui-react';

import config from '@plone/volto/registry';

function getDefaultCellRenderer() {
  const { components, renderers } = config.settings.table;
  return components[renderers.default];
}

function getCellRendererByDataType(dataType) {
  const { components, renderers } = config.settings.table;
  const componentName = dataType ? renderers.dataType[dataType] : null;
  return componentName ? components[componentName] : null;
}

function getCellRendererByWidget(widget) {
  const { components, renderers } = config.settings.table;
  const componentName = widget ? renderers.widget[widget] : null;
  return componentName ? components[componentName] : null;
}

function getCellRendererByRowType(rowType) {
  const { components, renderers } = config.settings.table;
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
    <TableCell style={{ minWidth: colDef.minWidth }}>
      <CellRenderer {...props} value={value} />
    </TableCell>
  );
};

export default CellRenderer;
