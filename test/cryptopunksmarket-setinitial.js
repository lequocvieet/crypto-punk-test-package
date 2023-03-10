require('babel-polyfill');
var CryptoPunksMarket = artifacts.require("./CryptoPunksMarket.sol");


var expectThrow = async function(promise){
  try {
    await promise;
  } catch (error) {
    // TODO: Check jump destination to destinguish between a throw
    //       and an actual invalid jump.
    const invalidJump = error.message.search('invalid JUMP') >= 0;
    // TODO: When we contract A calls contract B, and B throws, instead
    //       of an 'invalid jump', we get an 'out of gas' error. How do
    //       we distinguish this from an actual out of gas event? (The
    //       testrpc log actually show an 'invalid jump' event.)
    const outOfGas = error.message.search('out of gas') >= 0;
    const revert = error.message.search('revert') >= 0
    assert(
      invalidJump || outOfGas || revert,
      "Expected throw, got '" + error + "' instead",
    );
    return;
  }
  assert.fail('Expected throw not received');
};

contract('CryptoPunksMarket-setInitial', function (accounts) {
  it("Should start with 0 balance", async function () {
    var contract = await CryptoPunksMarket.deployed();
    await contract.setInitialOwner(accounts[0], 0);
    var balance = await contract.balanceOf.call(accounts[0]);
    assert.equal(balance.valueOf(), 1, "Didn't get the initial punk");
    var owner = await contract.punkIndexToAddress.call(0);
    assert.equal(owner, accounts[0], "Ownership array wrong");
    var remaining = await contract.punksRemainingToAssign.call();
    assert.equal(9999, remaining);

    // todo Set this back to 10000 for final runs
    var assignCoins = 100;
    for (var i = 1; i < assignCoins; i++) {
      await contract.setInitialOwner(accounts[0], i);
    }

    var remainingAfter = await contract.punksRemainingToAssign.call();
    assert.equal(10000 - assignCoins, remainingAfter);
    var balanceAfter = await contract.balanceOf.call(accounts[0]);
    assert.equal(assignCoins, balanceAfter);

  }),
    it("bulk assign", async function () {
      //test initial list owner for list punks
      var contract = await CryptoPunksMarket.deployed();
      var owners = [accounts[0], accounts[1], accounts[2], accounts[3], accounts[4], accounts[5], accounts[6], accounts[7], accounts[8], accounts[9]];
      var punks = [1000, 1001, 1002, 1003, 1004, 1005, 1006, 1007, 1008, 1009];
      await contract.setInitialOwners(owners, punks);
      for (var i = 0; i < 10; i++) {
        var currentOwner = await contract.punkIndexToAddress.call(punks[i]);
        assert.equal(currentOwner, owners[i]);
      }
      var remainingAfter = await contract.punksRemainingToAssign.call();
      assert.equal(10000 - 110, remainingAfter);
    }),
    it("can not pass an invalid index to assign initial", async function () {
      var contract = await CryptoPunksMarket.deployed();
      try {
        await contract.setInitialOwner(accounts[0], 10000);
        assert(false, "Should have thrown exception.");
      } catch (err) {
        // Should catch an exception
      }

    }),
    it("only owner can assign initial", async function () {
      var contract = await CryptoPunksMarket.deployed();
      //call setInitialOwner using another account
      await expectThrow(contract.setInitialOwner(accounts[1], 1, { from: accounts[1] }));

    }),
    it("Can not claim punk after set initial owners assigned", async function () {
      var contract = await CryptoPunksMarket.deployed();
      await contract.allInitialOwnersAssigned();
      //after all initial owner assigned set the setInitialOwner will return error
      await expectThrow(contract.setInitialOwner(accounts[1], 1) );

    })
});
