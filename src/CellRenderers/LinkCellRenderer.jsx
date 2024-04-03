import { UniversalLink } from '@plone/volto/components';
import { applyTemplate } from '@eeacms/volto-block-data-table/utils';

import CellRenderer from './CellRenderer';

const LinkCellRenderer = (props) => {
  const { colDef, row } = props;
  const linkValue = applyTemplate(
    colDef.linkTemplate,
    row[colDef.linkField || colDef.field],
  );
  return (
    <UniversalLink href={linkValue}>
      <CellRenderer
        {...props}
        colDef={{ ...colDef, widget: null }}
        tableCell={false}
      />
    </UniversalLink>
  );
};

export default LinkCellRenderer;
