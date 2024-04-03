import tableSVG from '@plone/volto/icons/table.svg';
import DataTableEdit from './Edit';
import DataTableView from './View';

import DefaultTable from './variations/DefaultTable';

export default function applyConfig(config) {
  config.blocks.blocksConfig.data_table = {
    id: 'data_table',
    title: 'Data Table',
    icon: tableSVG,
    group: 'data_visualizations',
    edit: DataTableEdit,
    view: DataTableView,
    restricted: false,
    mostUsed: false,
    sidebarTab: 1,
    security: {
      addPermission: [],
      view: [],
    },
    variations: [
      {
        id: 'default',
        title: 'Default',
        isDefault: true,
        view: DefaultTable,
      },
    ],
    available_colors: [
      '#FCE0E0',
      '#E2F1E4',
      '#EB2631',
      '#F06630',
      '#FBDC35',
      '#41B34F',
      '#8EC54A',
      '#D5DF3F',
      '#EFEFEF',
      '#EB9694',
      '#FEF3BD',
      '#C1E1C5',
      '#BEDADC',
      '#C4DEF6',
      '#BED3F3',
      '#D4C4FB',
    ],
  };

  if (config.blocks.blocksConfig.simpleDataConnectedTable) {
    config.blocks.blocksConfig.simpleDataConnectedTable.restricted = true;
  }

  return config;
}
