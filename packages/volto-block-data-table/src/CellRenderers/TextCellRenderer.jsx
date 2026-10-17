import { applyTemplate } from '@eeacms/volto-block-data-table/utils';

const TextCellRenderer = ({ value, colDef }) => {
  return applyTemplate(colDef.template, value ? value : '');
};

export default TextCellRenderer;
