import { useEffect, useMemo, useState } from 'react';
import capitalize from 'lodash/capitalize';
import { defineMessages, useIntl } from 'react-intl';
import Icon from '@plone/volto/components/theme/Icon/Icon';
import config from '@plone/volto/registry';
import { Menu, Loader } from 'semantic-ui-react';

import Table from '@eeacms/volto-block-data-table/Table';

import { filterRowsByPivot, getPivotValues } from '../helpers';

import leftSVG from '@plone/volto/icons/left-key.svg';
import rightSVG from '@plone/volto/icons/right-key.svg';

const messages = defineMessages({
  unknown: {
    id: 'data-table-pivot-unknown',
    defaultMessage: 'Unknown',
  },
});

const UNKNOWN_KEY = '__unknown__';

const DefaultView = (props) => {
  const {
    rows,
    fields,
    pagination,
    updatePagination,
    loadingProviderData,
    TableProps,
  } = props;
  const { withHeaders, withPagination, transposed, pivotColumn } = props.data;
  const itemsPerPage =
    props.itemsPerPage && props.itemsPerPage > 0 ? props.itemsPerPage : 5;
  const intl = useIntl();

  const [activeTab, setActiveTab] = useState(null);
  const [activePage, setActivePage] = useState(1);

  // Distinct values are only meaningful once real data has arrived.
  const pivot = useMemo(
    () =>
      pivotColumn && !loadingProviderData
        ? getPivotValues(rows || [], pivotColumn)
        : null,
    [rows, pivotColumn, loadingProviderData],
  );

  const tabs = useMemo(() => {
    if (!pivot) return [];
    const list = pivot.values.map((value) => ({
      key: String(value),
      value,
      unknown: false,
    }));
    if (pivot.hasEmpty) {
      list.push({ key: UNKNOWN_KEY, value: null, unknown: true });
    }
    return list;
  }, [pivot]);

  // Fall back to the first tab when the selected one disappears (data reload).
  const activeTabKey = useMemo(() => {
    if (!pivot) return null;
    if (activeTab && tabs.some((tab) => tab.key === activeTab)) {
      return activeTab;
    }
    return tabs[0]?.key ?? null;
  }, [pivot, tabs, activeTab]);

  useEffect(() => {
    setActivePage(1);
  }, [activeTabKey]);

  const activePivotTab = useMemo(
    () => tabs.find((tab) => tab.key === activeTabKey) || null,
    [tabs, activeTabKey],
  );

  const columnDefs = useMemo(() => {
    const defs = !!props.data.columnDefs?.length
      ? props.data.columnDefs
      : fields.map((field) => ({
          field,
          headerName: capitalize(field),
        }));
    // The pivot column would repeat the same value on every row of a tab.
    return pivotColumn
      ? defs.filter((colDef) => colDef.field !== pivotColumn)
      : defs;
  }, [props.data.columnDefs, fields, pivotColumn]);

  const visibleRows = useMemo(() => {
    if (!pivot || !activePivotTab) return rows || [];
    return filterRowsByPivot(
      rows || [],
      pivotColumn,
      activePivotTab.value,
      activePivotTab.unknown,
    );
  }, [rows, pivot, pivotColumn, activePivotTab]);

  const clientPaginate = !!pivot && withPagination;
  const totalPages = clientPaginate
    ? Math.max(1, Math.ceil(visibleRows.length / itemsPerPage))
    : 1;

  const pageRows = useMemo(() => {
    if (!clientPaginate) return visibleRows;
    const start = (activePage - 1) * itemsPerPage;
    return visibleRows.slice(start, start + itemsPerPage);
  }, [clientPaginate, visibleRows, activePage, itemsPerPage]);

  const isFirstPage = pivot ? activePage <= 1 : pagination.activePage === 1;
  const isLastPage = pivot
    ? activePage >= totalPages
    : pagination.activePage === pagination.lastPage;

  const handlePrevPage = () => {
    if (pivot) {
      setActivePage((page) => Math.max(1, page - 1));
    } else if (pagination.activePage > 1) {
      updatePagination({ activePage: pagination.activePage - 1 });
    }
  };

  const handleNextPage = () => {
    if (pivot) {
      setActivePage((page) => Math.min(totalPages, page + 1));
    } else if (rows.length === pagination.itemsPerPage) {
      updatePagination({ activePage: pagination.activePage + 1 });
    }
  };

  const showPagination =
    withPagination && (!pivot || (tabs.length > 0 && totalPages > 1));

  return (
    <>
      {pivot && tabs.length > 0 && (
        <Menu
          secondary
          pointing
          fluid
          role="tablist"
          className="data-table-tabs"
        >
          {tabs.map((tab) => (
            <Menu.Item
              key={tab.key}
              role="tab"
              active={tab.key === activeTabKey}
              aria-selected={tab.key === activeTabKey}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.unknown ? intl.formatMessage(messages.unknown) : tab.value}
            </Menu.Item>
          ))}
        </Menu>
      )}
      <Table
        rows={pivot ? pageRows : rows}
        fields={fields}
        columnDefs={columnDefs}
        defaultColDef={config.settings.table.defaultColDef}
        withHeaders={withHeaders}
        // Transposing a pivoted table is meaningless.
        transposed={pivot ? false : transposed}
        TableProps={TableProps}
      />
      {showPagination && (
        <Menu pagination>
          <Menu.Item
            as="a"
            icon
            disabled={loadingProviderData || isFirstPage}
            onClick={handlePrevPage}
          >
            <Icon name={leftSVG} size="24px" />
          </Menu.Item>
          <Menu.Item fitted>
            <Loader
              disabled={!props.loadingProviderData}
              active
              inline
              size="tiny"
            />
          </Menu.Item>
          <Menu.Item
            as="a"
            icon
            disabled={loadingProviderData || isLastPage}
            onClick={handleNextPage}
          >
            <Icon name={rightSVG} size="24px" />
          </Menu.Item>
        </Menu>
      )}
    </>
  );
};

export default DefaultView;
