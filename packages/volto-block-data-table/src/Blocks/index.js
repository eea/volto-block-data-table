import installDataTable from './DataTable';

const installBlocks = (config) => {
  return [installDataTable].reduce((acc, apply) => apply(acc), config);
};

export default installBlocks;
