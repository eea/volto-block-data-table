import { capitalize } from 'lodash';
import { Table } from 'semantic-ui-react';

const HeaderComponent = ({ colDef }) => {
  return (
    <Table.HeaderCell>
      {colDef.headerName || capitalize(colDef.field)}
    </Table.HeaderCell>
  );
};

export default HeaderComponent;
