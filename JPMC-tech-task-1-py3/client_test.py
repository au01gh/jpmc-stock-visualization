import unittest
from client3 import *

class ClientTest(unittest.TestCase):

  """
  	Tests a data point and calculates the price via an assertion
  """
  def test_getDataPoint_calculatePrice(self):
    #Different quote objects to use as a test
    quotes = [
      {'top_ask': {'price': 121.2, 'size': 36}, 'timestamp': '2019-02-11 22:06:30.572453', 'top_bid': {'price': 120.48, 'size': 109}, 'id': '0.109974697771', 'stock': 'ABC'},
      {'top_ask': {'price': 121.68, 'size': 4}, 'timestamp': '2019-02-11 22:06:30.572453', 'top_bid': {'price': 117.87, 'size': 81}, 'id': '0.109974697771', 'stock': 'DEF'}
    ]
    for quote in quotes:
      #Checks if both quote objects pass or fail the test
      self.assertEqual(getDataPoint(quote), (quote['stock'], quote['top_bid']['price'], quote['top_ask']['price'], (quote['top_bid']['price'] + quote['top_ask']['price'])/2))

    """
    	Tests a data point and calculates if the price is greater than the ask price via an assertion
    """
  def test_getDataPoint_calculatePriceBidGreaterThanAsk(self):
    #Different quote objects to use as a test
    quotes = [
      {'top_ask': {'price': 119.2, 'size': 36}, 'timestamp': '2019-02-11 22:06:30.572453', 'top_bid': {'price': 120.48, 'size': 109}, 'id': '0.109974697771', 'stock': 'ABC'},
      {'top_ask': {'price': 121.68, 'size': 4}, 'timestamp': '2019-02-11 22:06:30.572453', 'top_bid': {'price': 117.87, 'size': 81}, 'id': '0.109974697771', 'stock': 'DEF'}
    ]
    for quote in quotes:
      #Checks if both quote objects pass or fail the test
      self.assertEqual(getDataPoint(quote), (quote['stock'], quote['top_bid']['price'], quote['top_ask']['price'], (quote['top_bid']['price'] + quote['top_ask']['price'])/2))

    """
    	Tests if the ask price of the quote is 0 in the ratio via an assertion
    """
  def test_getRatio_priceAIsZero(self):
    #Different quote objects to use as a test
    quotes = [
      {'top_ask': {'price': 0, 'size': 36}, 'timestamp': '2019-02-11 22:06:30.572453', 'top_bid': {'price': 120.48, 'size': 109}, 'id': '0.109974697771', 'stock': 'ABC'},
      {'top_ask': {'price': 0, 'size': 4}, 'timestamp': '2019-02-11 22:06:30.572453', 'top_bid': {'price': 117.87, 'size': 81}, 'id': '0.109974697771', 'stock': 'DEF'}
    ]
    for quote in quotes:
      #Checks if both quote objects pass or fail the test
      self.assertEqual(getRatio(0, quote['top_bid']), (quote['top_ask']/['top_bid']))

      """
      	Tests if the bid price of the quote is 0 in the ratio via an assertion
      """
  def test_getRatio_priceBIsZero(self):
    #Different quote objects to use as a test
    quotes = [
      {'top_ask': {'price': 119.2, 'size': 36}, 'timestamp': '2019-02-11 22:06:30.572453', 'top_bid': {'price': 0, 'size': 109}, 'id': '0.109974697771', 'stock': 'ABC'},
      {'top_ask': {'price': 121.68, 'size': 4}, 'timestamp': '2019-02-11 22:06:30.572453', 'top_bid': {'price': 0, 'size': 81}, 'id': '0.109974697771', 'stock': 'DEF'}
    ]
    for quote in quotes:
      #Checks if both quote objects pass or fail the test
      self.assertEqual(getRatio(quote['top_ask'], 0), (quote['top_ask']/['top_bid']))

# Main method of the class
if __name__ == '__main__':
    unittest.main()
