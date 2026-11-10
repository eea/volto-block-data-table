import { applyTemplate } from '@eeacms/volto-block-data-table/utils';

const BooleanCellRenderer = ({ value, colDef }) => {
  const _value = value ? 'Yes' : 'No';
  return applyTemplate(colDef.template, _value);
};

export default BooleanCellRenderer;
