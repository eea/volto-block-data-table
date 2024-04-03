import { isNull, isUndefined } from 'lodash';

import {
  parseNumber,
  formatDecimalValue,
  applyTemplate,
} from '@eeacms/volto-block-data-table/utils';

const NumberCellRenderer = ({ value, colDef }) => {
  let _value = parseNumber(value);

  if (isUndefined(_value)) {
    return null;
  }

  if (isNull(_value)) {
    _value = 0;
  }

  const formattedValue = formatDecimalValue(_value, colDef);

  return applyTemplate(colDef.template, formattedValue);
};

export default NumberCellRenderer;
