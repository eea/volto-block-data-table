import React from 'react';
import isArray from 'lodash/isArray';
import toNumber from 'lodash/toNumber';
import { FormattedValue } from '@eeacms/volto-datablocks/Utils';

// Number of rows requested from the provider when pivoting, so that the whole
// dataset is available client-side and tabs can be built from every value.
export const MAX_PIVOT_ROWS = 10000;

export const getValue = (tableData, column, rowIndex, textTemplate) => {
  let value = isArray(tableData)
    ? tableData[rowIndex]?.[column]
    : tableData[column]?.[rowIndex];
  if (textTemplate) {
    value = textTemplate.replace('{}', value);
  }
  return value;
};

export const getCellValue = (tableData, colDef, rowIndex, placeholder = '') => {
  let value;

  if (colDef === 'string') {
    value = isArray(tableData)
      ? tableData[rowIndex]?.[colDef]
      : tableData[colDef]?.[rowIndex];
  } else {
    value = isArray(tableData)
      ? tableData[rowIndex]?.[colDef.column]
      : tableData[colDef.column]?.[rowIndex];
  }

  return typeof colDef === 'string'
    ? React.createElement('span', null, value || placeholder)
    : React.createElement(FormattedValue, {
        textTemplate: colDef.textTemplate,
        value: value || placeholder,
        specifier: colDef.specifier,
      });
};

export const isValidUrl = (url) => {
  if (!url) return '';

  let containsProtocol = url.includes('http://') || url.includes('https://');
  let checkedUrl = containsProtocol ? url : `https://${url}`;
  return checkedUrl;
};

/**
 * Display page size for the table (client-side, per pivot tab).
 */
export const getItemsPerPage = (data = {}) => {
  const value = toNumber(data.itemsPerPage);
  return value > 0 ? value : 5;
};

/**
 * Page size requested from the provider. When pivoting we need the whole
 * dataset in one request so the tabs cover every distinct value.
 */
export const getFetchItemsPerPage = (data = {}) =>
  data.pivotColumn ? MAX_PIVOT_ROWS : getItemsPerPage(data);

/**
 * Distinct values of `column`, in order of first appearance, plus whether any
 * row has an empty value (shown under the "Unknown" tab).
 */
export const getPivotValues = (rows = [], column) => {
  const values = [];
  const seen = new Set();
  let hasEmpty = false;

  rows.forEach((row) => {
    const value = row?.[column];
    if (value === undefined || value === null || value === '') {
      hasEmpty = true;
      return;
    }
    const key = String(value);
    if (!seen.has(key)) {
      seen.add(key);
      values.push(value);
    }
  });

  return { values, hasEmpty };
};

/**
 * Rows belonging to a pivot tab. `unknown` selects the rows with an empty
 * pivot value.
 */
export const filterRowsByPivot = (rows = [], column, value, unknown = false) =>
  rows.filter((row) => {
    const cell = row?.[column];
    const isEmpty = cell === undefined || cell === null || cell === '';
    return unknown ? isEmpty : !isEmpty && String(cell) === String(value);
  });
