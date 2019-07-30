
import React from './node_modules/react';
import ReactDOM from './node_modules/react-dom';
import { Grid, GridColumn } from './node_modules/@progress/kendo-react-grid';

const loadingPanel = (
  <div className="k-loading-mask">
    <span className="k-loading-text">Loading</span>
    <div className="k-loading-image"></div>
    <div className="k-loading-color"></div>
  </div>
);


class App extends React.Component {
  state = {
    gridData: []
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then(response => response.json())
      .then(json => {
        this.setState({
          gridData: json
        })
      })
  }

  render() {
    return (
      <div>
        {this.state.gridData.length === 0 && loadingPanel}
        <Grid
          style={{ height: '400px' }}
          data={this.state.gridData}
        >
          <GridColumn field="id" />
          <GridColumn field="userId" />
          <GridColumn field="completed" />
          <GridColumn field="title" />
        </Grid>
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.querySelector('my-app')
);

