## CryptoPunks: Collectible Characters on the Ethereum Blockchain

This repo contains the Ethereum contract used to manage the Punks, a verifiable image of all the punks, and a unit test to verify the contract's functionality.

### Deploy, Test and interact with contract 

* **Install** 
* ```make node-gyp ``` to install node-gyp
* ```make nvm ``` to install nvm
* ```make truffle ``` to install truffle
* ```make ganache ``` to install ganache
* ```make ganache-cli ``` to run ganache network on 127.0.0.1:8545


* **Deploy** 
* ```make deploy ``` to deploy contract to local network
* **Run Contract Test case** 
* ```make test ``` to run all test case

### How to Use the CryptoPunks Contract


Once you are watching the contract you can execute the following functions to transact punks:

* ```getPunk(uint index)``` to claim ownership of a punk (this is no longer useful as all 10,000 punks have been claimed).
* ```transferPunk(address to, uint index)``` transfer ownership of a punk to someone without requiring any payment.
* ```offerPunkForSale(uint punkIndex, uint minSalePriceInWei)``` offer one of your punks for sale to anyone willing to pay the minimum price specified (in Wei).
* ```offerPunkForSaleToAddress(uint punkIndex, uint minSalePriceInWei, address toAddress)``` offer one of your punks for some minumum price, but only to the address specified. Use this to sell a punk to a specific person.
* ```enterBidForPunk(uint punkIndex)``` enters a bid for the punkIndex specified. Send in the amount of your bid in the value field and we will hold that ether in escrow.
* ```acceptBidForPunk(uint punkIndex, uint minPrice)``` to accept a pending bid for the specified punk. You can specify a minPrice in Wei to protect yourself from someone switching the bid for a lower bid.
* ```withdrawBidForPunk(uint punkIndex)``` will withdraw a bid for the specified punk and send you the ether from the bid.
* ```buyPunk(uint punkIndex)``` buy punk at the specified index. That punk needs to be previously offered for sale, and you need to have sent at least the amount of Ether specified as the sale price for the punk.
* ```withdraw()``` claim all the Ether people have previously sent to buy your punks.
