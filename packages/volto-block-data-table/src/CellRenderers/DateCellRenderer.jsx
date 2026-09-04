import { applyTemplate } from '@eeacms/volto-block-data-table/utils';

const DateCellRenderer = ({ value, colDef }) => {
  const _value = value ? new Date(value).toLocaleDateString() : '';
  return applyTemplate(colDef.template, _value);
};

export default DateCellRenderer;
