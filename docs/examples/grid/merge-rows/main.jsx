

import React from 'react';
import ReactDOM from 'react-dom';
import { Grid, GridColumn as Column } from '@progress/kendo-react-grid';

import products from './products.json';

class App extends React.Component {
  state = {
    gridData: products
  }

  cellRender = (cell, props) => {
    if (props.field === "Discontinued") {
      if (props.dataItem.ProductID % 2 !== 0) {
        return (
          <td rowSpan={2}>
            {props.dataItem[props.field].toString()}
          </td>
        )
      } else {
        return null
      }
    }
    return (
      cell
    )
  }

  render() {
    return (
      <div>
        <Grid
          style={{ height: '400px' }}
          data={this.state.gridData}
          cellRender={this.cellRender}
        >
          <Column field="ProductID" title="ID" width="40px" />
          <Column field="ProductName" title="Name" width="250px" />
          <Column field="Category.CategoryName" title="CategoryName" />
          <Column field="UnitPrice" title="Price" width="80px" />
          <Column field="UnitsInStock" title="In stock" width="80px" />
          <Column field="Discontinued" width="120px" />
        </Grid>
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.querySelector('my-app')
);


