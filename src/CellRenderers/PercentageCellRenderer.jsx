import { isNull, isUndefined } from 'lodash';

import {
  parseNumber,
  applyTemplate,
} from '@eeacms/volto-block-data-table/utils';

const PercentageCellRenderer = ({ value, colDef }) => {
  let _value = parseNumber(value);

  if (isUndefined(_value)) {
    return null;
  }

  if (isNull(_value)) {
    _value = 0;
  }

  // if (_value > 0 && _value < 1) {
  //   _value = _value * 100;
  // }

  return applyTemplate(colDef.template, `${_value}%`);
};

export default PercentageCellRenderer;
