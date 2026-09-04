import CellRenderer from './CellRenderers/CellRenderer';
import TextCellRenderer from './CellRenderers/TextCellRenderer';
import NumberCellRenderer from './CellRenderers/NumberCellRenderer';
import PercentageCellRenderer from './CellRenderers/PercentageCellRenderer';
import BooleanCellRenderer from './CellRenderers/BooleanCellRenderer';
import DateCellRenderer from './CellRenderers/DateCellRenderer';
import linkCellRenderer from './CellRenderers/LinkCellRenderer';
import SkeletonCellRenderer from './CellRenderers/SkeletonCellRenderer';
import HeaderComponent from './Components/HeaderComponent';

export const components = {
  cellRenderer: CellRenderer,
  textCellRenderer: TextCellRenderer,
  numberCellRenderer: NumberCellRenderer,
  percentageCellRenderer: PercentageCellRenderer,
  booleanCellRenderer: BooleanCellRenderer,
  dateCellRenderer: DateCellRenderer,
  linkCellRenderer: linkCellRenderer,
  skeletonCellRenderer: SkeletonCellRenderer,
  columnHeader: HeaderComponent,
  // columnHeaderGroup: AgHeaderGroupComponent,
};

export const renderers = {
  default: 'textCellRenderer',
  dataType: {
    text: 'textCellRenderer',
    number: 'numberCellRenderer',
    percentage: 'percentageCellRenderer',
    boolean: 'booleanCellRenderer',
    date: 'dateCellRenderer',
  },
  widget: {
    link: 'linkCellRenderer',
    skeleton: 'skeletonCellRenderer',
  },
  rowType: {
    skeleton: 'skeletonCellRenderer',
  },
};

export const defaultColDef = {
  minWidth: 100,
};
