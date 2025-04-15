import React, { useMemo } from 'react';
import { compose } from 'redux';
import { toNumber } from 'lodash';
import { SidebarPortal, BlockDataForm } from '@plone/volto/components';
import { withBlockExtensions } from '@plone/volto/helpers';
import { VisibilitySensor } from '@eeacms/volto-datablocks/components';
import { connectToProviderData } from '@eeacms/volto-datablocks/hocs';

import { getSchema } from './schema';
import { View } from './View';

const Edit = (props) => {
  const schema = useMemo(
    () => getSchema(props.provider_data),
    [props.provider_data],
  );

  return (
    <>
      <View {...props} mode="edit" />
      <SidebarPortal selected={props.selected}>
        <BlockDataForm
          block={props.block}
          schema={schema}
          title={schema.title}
          onChangeBlock={props.onChangeBlock}
          onChangeField={(id, value) => {
            props.onChangeBlock(props.block, {
              ...props.data,
              [id]: value,
            });
          }}
          formData={props.data}
        />
      </SidebarPortal>
    </>
  );
};

const EditWrapper = compose(
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
    provider_url:
      props.visualization_data?.provider_url ||
      props.data?.provider_url ||
      props.data?.url,
    pagination: {
      enabled: props.data.withPagination,
      itemsPerPage: props.itemsPerPage,
    },
  })),
  withBlockExtensions,
)(Edit);

export default EditWrapper;
