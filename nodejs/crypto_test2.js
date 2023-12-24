import { Buffer } from "https://taisukef.github.io/buffer/Buffer.js";
import forge from "https://taisukef.github.io/forge-es/lib/forge.js";
import {} from "https://taisukef.github.io/forge-es/lib/aes.js";
import { hex } from "https://code4sabae.github.io/js/hex.js";

/*
node --experimental-default-type=module crypto_test.js
deno run crypto_test.js
*/


const array2s = (ar) => {
  const res = [];
  for (let i = 0; i < ar.length; i++) {
    res.push(String.fromCharCode(ar[i]));
  }
  const s = res.join("");
  //console.log("a2s", ar, s);
  return s;
};
const getSeries = (len) => {
  const a = new Uint8Array(len);
  for (let i = 0; i < a.length; i++) {
    a[i] = i;
  }
  return Buffer.from(a);
};

const clearText = Buffer.from(new TextEncoder().encode('secret'));
const key = getSeries(16); //crypto.randomBytes(16);
//const iv = Buffer.from(crypto.randomBytes(12));
const iv = getSeries(12);
const algo = 'aes-128-gcm';
console.log(`clearText: ${clearText}`);

//const cipher = crypto.createCipheriv(algo, key, iv);
const cipher = forge.cipher.createCipher('AES-GCM', array2s(key));
cipher.start({
  iv: iv, // should be a 12-byte binary-encoded string or byte buffer
  //additionalData: 'binary-encoded string', // optional
  tagLength: 128, // optional, defaults to 128 bits
});

cipher.update(forge.util.createBuffer(clearText));
cipher.update(forge.util.createBuffer(clearText));
const encrypted = hex.toBin(cipher.output.toHex()); // Buffer.concat([encrypted, encrypted2, cipher.final()]);
//const cipherTag = cipher.getAuthTag();
cipher.finish();
const cipherTag = hex.toBin(cipher.mode.tag.toHex());
//console.log(`encrypted: ${Buffer.from(encrypted)}`);
console.log(`encrypted: ${encrypted}`);
console.log(`tag: ${cipherTag}`);

console.log(algo, key.length, iv.length, cipherTag);
//let decipher = crypto.createDecipheriv(algo, key, iv);
//decipher.setAuthTag(cipherTag); 
const decipher = forge.cipher.createDecipher('AES-GCM', array2s(key));
decipher.start({
  iv: iv,
  //additionalData: 'binary-encoded string', // optional
  tagLength: 128, // optional, defaults to 128 bits
  tag: forge.util.createBuffer(cipherTag), //forge.util.createBuffer(tag) // authentication tag from encryption
});
decipher.update(forge.util.createBuffer(encrypted));
if (!decipher.finish()) {
  throw new Error("err");
}
const decrypted = hex.toBin(decipher.output.toHex()); //decrypted = Buffer.concat([decrypted, decipher.final()]);
console.log(`decrypted: ${new TextDecoder().decode(decrypted)}`);

/*

const clearText = 'secret';
const key = crypto.randomBytes(16);
const iv = Buffer.from(crypto.randomBytes(12));
const algo = 'aes-128-gcm';
console.log(`clearText: ${clearText}`);

const cipher = crypto.createCipheriv(algo, key, iv);
let encrypted = cipher.update(clearText, 'utf8', 'hex');
encrypted += cipher.final('hex');
const cipherTag = cipher.getAuthTag();
console.log(`encrypted: ${encrypted}`);

let decipher = crypto.createDecipheriv(algo, key, iv);
decipher.setAuthTag(cipherTag); 
let decrypted = decipher.update(encrypted, 'hex', 'utf-8');
decrypted += decipher.final('utf-8');
console.log(`decrypted: ${decrypted}`);

*/