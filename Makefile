node-gyp:
	npm install -g node-gyp
nvm:
	nvm install 18
truffle:
	npm install -g truffle

ganache:
	npm install -g ganache-cli

ganache-cli:
	ganache-cli

deploy:
	truffle migrate
test:
	truffle test
.PHONY: node-gyp nvm ganache ganache-cli deploy test
	