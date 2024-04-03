import React, { useMemo } from 'react';
import { capitalize } from 'lodash';
import { Icon } from '@plone/volto/components';
import { Menu, Loader } from 'semantic-ui-react';

import { defaultColDef } from '@eeacms/volto-block-data-table/config';
import Table from '@eeacms/volto-block-data-table/Table';

import leftSVG from '@plone/volto/icons/left-key.svg';
import rightSVG from '@plone/volto/icons/right-key.svg';

const DefaultView = (props) => {
  const {
    rows,
    fields,
    pagination,
    updatePagination,
    loadingProviderData,
    TableProps,
  } = props;
  const { withHeaders, withPagination } = props.data;

  const columnDefs = useMemo(() => {
    if (!!props.data.columnDefs?.length) return props.data.columnDefs;
    return fields.map((field) => ({
      field,
      headerName: capitalize(field),
    }));
  }, [props.data.columnDefs, fields]);

  return (
    <>
      <Table
        rows={rows}
        fields={fields}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        withHeaders={withHeaders}
        TableProps={TableProps}
      />
      {withPagination && (
        <Menu pagination>
          <Menu.Item
            as="a"
            icon
            disabled={loadingProviderData || pagination.activePage === 1}
            onClick={() => {
              if (pagination.activePage > 1) {
                updatePagination({
                  activePage: pagination.activePage - 1,
                });
              }
            }}
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
            disabled={
              props.loadingProviderData ||
              pagination.activePage === pagination.lastPage
            }
            onClick={() => {
              if (rows.length === pagination.itemsPerPage) {
                updatePagination({
                  activePage: pagination.activePage + 1,
                });
              }
            }}
          >
            <Icon name={rightSVG} size="24px" />
          </Menu.Item>
        </Menu>
      )}
    </>
  );
};

export default DefaultView;
