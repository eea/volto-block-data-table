import installBlocks from './Blocks';

const applyConfig = (config) => {
  return [installBlocks].reduce((acc, apply) => apply(acc), config);
};

export default applyConfig;
