const Mallet = require('@iohk/mallet/lib/mallet.js');
const path = require('path');
const os = require('os');
const util = require('util');

const mallet = new Mallet('iele', path.join(os.homedir()));
const account = mallet.newAccount("samid oitesarp");
console.log(account);