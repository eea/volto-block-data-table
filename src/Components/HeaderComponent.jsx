import { capitalize } from 'lodash';
import { Table } from 'semantic-ui-react';

const HeaderComponent = ({ className, colDef, as }) => {
  const Component = as || Table.HeaderCell;
  return (
    <Component className={className} style={{ minWidth: colDef.minWidth }}>
      {colDef.headerName || capitalize(colDef.field)}
    </Component>
  );
};

export default HeaderComponent;
