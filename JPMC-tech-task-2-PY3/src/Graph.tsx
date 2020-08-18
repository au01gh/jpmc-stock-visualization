import { Table } from '@jpmorganchase/perspective';
import { ServerRespond } from './DataStreamer';
import React, { Component } from 'react';
import './Graph.css';

/**
 * Interface that props the declaration for <Graph/>
 */
interface IProps {
  data: ServerRespond[],
}

/**
 * Interface resembles a wrapper and is a perspective library which adds load to HTMLElement prototype
 */
interface PerspectiveViewerElement extends HTMLElement{
  load: (table: Table) => void,
}

/**
 * React component that renders Perspective based on data parsed from the parent through the data property
 */
class Graph extends Component<IProps, {}> {
  // Perspective table
  table: Table | undefined;
  
  /**
   * Render function creates an element to be used 
   * @return the element rendered: 'perspective-viewer'
   */
  render() {
    return React.createElement('perspective-viewer');
  }
  
  /**
   * Mounts the component to the table
   */
  componentDidMount() {
    // Gets the element to attach the table from the DOM
    const elem = document.getElementsByTagName('perspective-viewer')[0] as unknown as PerspectiveViewerElement;

    // Creates the properties of the table
    const schema = {
      stock: 'string',
      top_ask_price: 'float',
      top_bid_price: 'float',
      timestamp: 'date',
    };

    // Checks the perspective and worker object to set the schema to the table
    if (window.perspective && window.perspective.worker()) {
      this.table = window.perspective.worker().table(schema);
    }
    if (this.table) {
      // Loads the `table` in the <perspective-viewer> DOM reference
      elem.load(this.table);
      // More Perspective configurations attributes added
      elem.setAttribute('view', 'y_line');
      elem.setAttribute('column-pivots', '["stock"]');
      elem.setAttribute('row-pivots', '["timestamp"]');
      elem.setAttribute('columns', '["top_ask_price"]');
      elem.setAttribute('aggregates', `
        {"stock": "distinct count",
        "top_ask_price": "avg",
        "top_bid_price": "avg",
        "timestamp": "distinct count"}`);
    }
  }

  /**
   * Everytime the data props is updated, the data is inserted into Perspective table
   * @return the table with the information updated
   */
  componentDidUpdate() {
    // Checks the table and updates it
    if (this.table) {
      this.table.update(this.props.data.map((el: any) => {
        // Formats the data from ServerRespond to the schema
        return {
          stock: el.stock,
          top_ask_price: el.top_ask && el.top_ask.price || 0,
          top_bid_price: el.top_bid && el.top_bid.price || 0,
          timestamp: el.timestamp,
        };
      }));
    }
  }
}

export default Graph;