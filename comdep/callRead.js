const Mallet = require('@iohk/mallet/lib/mallet.js');
const path = require('path');
const os = require('os');
const mallet = new Mallet('iele', path.join(os.homedir()));

    const txCallFunc = {to: '0x0d21e35ada8bce37341ffd5949f0063df9e2fa41', value: 0, gas: 1000000, func: 'read()', args: []};
    const result = mallet.iele.constantCall(txCallFunc);
    const decode = mallet.iele.dec(result[0], 'string');
    const decode1 = mallet.iele.dec(result[1], 'string');
    const decode2 = mallet.iele.dec(result[2], 'string');
    const decode3 = mallet.iele.dec(result[3], 'string');
    const decode4 = mallet.iele.dec(result[4], 'string');
    console.log(decode+"\n"+decode1+"\n"+decode2+"\n"+decode3+"\n"+decode4);