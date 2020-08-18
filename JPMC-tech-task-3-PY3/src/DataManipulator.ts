import { ServerRespond } from './DataStreamer';

/**
 * Interface with data types set to add data to
 */ 
export interface Row {
  price_abc: number,
  price_def: number,
  ratio: number,
  timestamp: Date,
  upper_bound: number,
  lower_bound: number,
  trigger_alert: number | undefined,
}

/**
 * Data is manipulated with the generateRow function
 */
export class DataManipulator {

  /**
   * The row of stock data information is calculated from the dataset 
   * @param serverResponds is each data object in the array
   * @return the processed row object 
   */
  static generateRow(serverResponds: ServerRespond[]): Row {
    const priceABC = (serverResponds[0].top_ask.price + serverResponds[0].top_bid.price)/2;
    const priceDEF = (serverResponds[1].top_ask.price + serverResponds[1].top_bid.price)/2;
    const ratio = priceABC/priceDEF;
    const upperBound = 1 + 0.10; // Standard error + .1
    const lowerBound = 1 - 0.10; // Standard error - .1
    return {
        price_abc: priceABC,
        price_def: priceDEF,
        ratio, // Ratio is the same
        timestamp: serverResponds[0].timestamp > serverResponds[1].timestamp ? serverResponds[0].timestamp : serverResponds[1].timestamp, // Comparison of time for greater value
        upper_bound: upperBound,
        lower_bound: lowerBound,
        trigger_alert: (ratio > upperBound || ratio < lowerBound) ? ratio : undefined, //Comparsion of bounds for alert
      };
  }
}