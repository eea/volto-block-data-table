import { useMemo } from 'react';
import { compose } from 'redux';
import { toNumber, range } from 'lodash';
import { withBlockExtensions } from '@plone/volto/helpers';
import { VisibilitySensor } from '@eeacms/volto-datablocks/components';
import { connectToProviderData } from '@eeacms/volto-datablocks/hocs';

const View = (props) => {
  const {
    variation,
    provider_data,
    pagination = {},
    itemsPerPage,
    data,
  } = props;

  const Table = variation?.view || null;

  const rawRows = useMemo(() => {
    return (
      (pagination.data[pagination.activePage]
        ? pagination.data[pagination.activePage]
        : pagination.activePage !== pagination.prevPage
        ? pagination.data[pagination.prevPage]
        : null) || provider_data
    );
  }, [pagination, provider_data]);

  const fields = useMemo(() => {
    return Object.keys(rawRows || {});
  }, [rawRows]);

  const rows = useMemo(() => {
    if (!rawRows)
      return range(itemsPerPage).map((i) => ({
        id: i + 1,
        rowType: 'skeleton',
      }));
    const keys = Object.keys(rawRows);

    // Create an empty array to store the transformed objects
    let transformedArray = [];
    if (keys.length) {
      // Iterate over the values and construct new objects
      for (let i = 0; i < rawRows[keys[0]]?.length; i++) {
        let row = {
          id: rawRows.id?.[i] || i + 1,
        };
        keys.forEach((key) => {
          row[key] = rawRows[key][i];
        });
        transformedArray.push(row);
      }
    }

    return transformedArray;
  }, [rawRows, itemsPerPage]);

  return (
    <div className="data-table-block">
      <Table
        {...props}
        rows={rows}
        fields={fields}
        TableProps={{
          celled: data.celled,
          striped: data.striped,
          compacted: data.compacted,
          borderless: data.borderless,
        }}
      />
    </div>
  );
};

const ViewWrapper = compose(
  (WrappedComponent) => (props) => {
    const itemsPerPage =
      !!props.data.itemsPerPage && toNumber(props.data.itemsPerPage) > 0
        ? toNumber(props.data.itemsPerPage)
        : 5;
    return (
      <VisibilitySensor offset={{ top: -150, bottom: -150 }}>
        <WrappedComponent {...props} itemsPerPage={itemsPerPage} />
      </VisibilitySensor>
    );
  },
  connectToProviderData((props) => ({
    provider_url: props.data?.provider_url,
    pagination: {
      enabled: props.data.withPagination,
      itemsPerPage: props.itemsPerPage,
    },
  })),
  withBlockExtensions,
)(View);

export { View };

export default ViewWrapper;
