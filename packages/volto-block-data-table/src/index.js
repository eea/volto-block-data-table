import {
  components,
  renderers,
  defaultColDef,
} from '@eeacms/volto-block-data-table/config';
import installBlocks from './Blocks';

const applyConfig = (config) => {
  config.settings.table = {
    components,
    renderers,
    defaultColDef,
  };
  return [installBlocks].reduce((acc, apply) => apply(acc), config);
};

export default applyConfig;
