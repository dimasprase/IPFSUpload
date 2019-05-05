const Mallet = require('@iohk/mallet/lib/mallet.js');
const path = require('path');
const os = require('os');
const util = require('util');

const mallet = new Mallet('iele', path.join(os.homedir()));
const listAccount = mallet.listAccounts();
const account = mallet.selectAccount(listAccount[0]);
const balance = mallet.getBalance(account);
//const reqFunds = mallet.requestFunds(account);
//console.log(reqFunds);

module.exports = mallet.iele.compile('../public/contract/uploadFile.sol');