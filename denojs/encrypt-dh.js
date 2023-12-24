import { Base64URL as base64 } from "https://code4fukui.github.io/Base64URL/Base64URL.js";
//var crypto = require('crypto');
//var ece = require('./ece.js');
import ece from "./ece.js";

if (Deno.args.length < 5 - 2) {
  console.warn('Usage: ' + Deno.args.join(' ') +
               ' <auth-secret> <receiver-public> <message> [JSON args]');
  Deno.exit(2);
}


var params = {
  version: 'aes128gcm',
  authSecret: Deno.args[0],
  dh: Deno.args[1]
};

if (Deno.args.length > 5 - 2) {
  var extra = JSON.parse(Deno.args[3]);
  Object.keys(extra).forEach(function(k) {
    params[k] = extra[k];
  });
}

var sender = crypto.createECDH('prime256v1');
sender.generateKeys();
if (params.senderPrivate) {
  sender.setPrivateKey(base64.decode(params.senderPrivate));
} else {
  params.senderPrivate = base64.encode(sender.getPrivateKey());
}
if (params.senderPublic) {
  sender.setPublicKey(base64.decode(params.senderPublic));
} else {
  params.senderPublic = base64.encode(sender.getPublicKey());
}
params.privateKey = sender;

console.log("Params: " + JSON.stringify(params, null, 2));
var result = ece.encrypt(base64.decode(process.argv[4]), params);

console.log("Encrypted Message: " + base64.encode(result));
