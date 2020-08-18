import { DataManipulator } from './DataManipulator';
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
interface PerspectiveViewerElement extends HTMLElement {
  load: (table: Table) => void,
}

/**
 * React component that renders Perspective based on data parsed from the parent through the data property
 */
class Graph extends Component<IProps, {}> {
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
    // Gets the element from the DOM
    const elem = document.getElementsByTagName('perspective-viewer')[0] as unknown as PerspectiveViewerElement;

    // Creates the properties of the table
    const schema = {
      price_abc: 'float',
      price_def: 'float',
      ratio: 'float',
      timestamp: 'date',
      upper_bound: 'float',
      lower_bound: 'float',
      trigger_alert: 'float',
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
      elem.setAttribute('row-pivots', '["timestamp"]');
      elem.setAttribute('columns', '["ratio", "lower_bound", "upper_bound", "trigger_alert"]');
      elem.setAttribute('aggregates', JSON.stringify({
        price_abc: 'avg',
        price_def: 'avg',
        ratio: 'avg',
        timestamp: 'distinct count',
        upper_bound: 'avg',
        lower_bound: 'avg',
        trigger_alert: 'avg',
      }));
    }
  }

  /**
   * Everytime the data props is updated, the data is inserted into Perspective table
   */
  componentDidUpdate() {
    if (this.table) {
      this.table.update([
        DataManipulator.generateRow(this.props.data),
      ]);
    }
  }
}

export default Graph;