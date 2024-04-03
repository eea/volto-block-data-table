import { isNumber, isNaN, isString, isNull } from 'lodash';

export function parseNumber(number) {
  const parsedNumber = isString(number)
    ? parseFloat(number)
    : isNumber(number)
    ? number
    : null;
  return isNull(parsedNumber) || isNaN(parsedNumber) ? null : parsedNumber;
}

export const formatDecimalValue = (value, props) => {
  const maximumFractionDigits = props.maximumFractionDigits || 3;
  const minimumFractionDigits =
    props.minimumFractionDigits || props.maximumFractionDigits || 2;

  const valueToAvoidRounding =
    Math.round(value * 10 ** maximumFractionDigits) /
    10 ** maximumFractionDigits;

  return valueToAvoidRounding.toLocaleString(undefined, {
    maximumFractionDigits,
    minimumFractionDigits,
  });
};

export const applyTemplate = (template, value) => {
  const [prefix = '', sufix = ''] = (template || '').split('{}');

  return (template || '').includes('{}')
    ? prefix + value + sufix
    : template || value;
};
