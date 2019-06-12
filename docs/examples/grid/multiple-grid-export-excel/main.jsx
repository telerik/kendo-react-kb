
import React from 'react';
import ReactDOM from 'react-dom';
import { Grid, GridColumn, GridToolbar } from '@progress/kendo-react-grid';
import { ExcelExport } from '@progress/kendo-react-excel-export';

import products from './products.json';

class App extends React.Component {
  _export;
  export = () => {
    const optionsGridOne = this._exportGridOne.workbookOptions();
    const optionsGridTwo = this._exportGridTwo.workbookOptions();
    optionsGridOne.sheets[1] = optionsGridTwo.sheets[0];
    optionsGridOne.sheets[0].title = "First Grid data"
    optionsGridOne.sheets[1].title = "Second Grid data"
    this._exportGridOne.save(optionsGridOne);
  }
  render() {
    return (
      <div>
        <ExcelExport
          data={products}
          ref={(exporter) => { this._exportGridOne = exporter; }}
        >
          <Grid data={products} style={{ height: '490px' }}>
            <GridToolbar>
              <button
                title="Export PDF"
                className="k-button k-primary"
                onClick={this.export}
              >
                Export to Excel
                        </button>
            </GridToolbar>
            <GridColumn field="ProductID" title="Product ID" />
            <GridColumn field="ProductName" title="Product Name" />
            <GridColumn field="UnitsInStock" title="UnitsInStock" />
          </Grid>
        </ExcelExport>
        <ExcelExport
          data={products}
          ref={(exporter) => { this._exportGridTwo = exporter; }}
        >
          <Grid data={products} style={{ height: '490px' }}>
            <GridToolbar>
              <button
                title="Export PDF"
                className="k-button k-primary"
                onClick={this.export}
              >
                Export to Excel
                        </button>
            </GridToolbar>
            <GridColumn field="ProductID" title="Product ID" />
            <GridColumn field="ProductName" title="Product Name" />
            <GridColumn field="UnitsInStock" title="UnitsInStock" />
          </Grid>
        </ExcelExport>
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.querySelector('my-app')
);

