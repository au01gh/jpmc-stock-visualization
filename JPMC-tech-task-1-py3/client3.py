################################################################################
#
#  Permission is hereby granted, free of charge, to any person obtaining a
#  copy of this software and associated documentation files (the "Software"),
#  to deal in the Software without restriction, including without limitation
#  the rights to use, copy, modify, merge, publish, distribute, sublicense,
#  and/or sell copies of the Software, and to permit persons to whom the
#  Software is furnished to do so, subject to the following conditions:
#
#  The above copyright notice and this permission notice shall be included in
#  all copies or substantial portions of the Software.
#
#  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
#  OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
#  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
#  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
#  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
#  FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
#  DEALINGS IN THE SOFTWARE.

import urllib.request
import random
import json
import time

# Server API links
QUERY = "http://localhost:8080/query?id={}"

# 500 server request
N = 500

"""
	Produces all of the needed values to generate a datapoint
	:param quote: the object of each line from the CSV file
	:return : a new datapoint consisting of new calculated information
"""
def getDataPoint(quote):
	stock = quote['stock']
	bid_price = float(quote['top_bid']['price'])
	ask_price = float(quote['top_ask']['price'])
	price = (bid_price + ask_price)/2
	return stock, bid_price, ask_price, price

"""
	Gets the ratio of price_a and price_b
	:param price_a: ask price
	:param price_b: bid price
	:return : the ratio between price_a and price_b 
"""
def getRatio(price_a, price_b):
	if(price_b == 0):
		return #Exits the function if executed
	return price_a/price_b

# Main method of the class
if __name__ == "__main__":

	# Query the price once every N seconds
	for _ in range(N):
		quotes = json.loads(urllib.request.urlopen(QUERY.format(random.random())).read()) #Loads and reads the request for the data
		prices = {}

		for quote in quotes:
			stock, bid_price, ask_price, price = getDataPoint(quote) #Passes the data through the first function
			prices[stock] = price #Price is the stock and stores it in the dictionary
			print("Quoted %s at (bid:%s, ask:%s, price:%s)" % (stock, bid_price, ask_price, price))

		print("Ratio %s" % (getRatio(prices['ABC'], prices['DEF']))) #Pass the values of 'ABC' and 'DEF'