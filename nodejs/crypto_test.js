import crypto from "node:crypto";
import { Buffer } from "https://taisukef.github.io/buffer/Buffer.js";

/*
node --experimental-default-type=module crypto_test.js
deno run crypto_test.js
*/

const clearText = Buffer.from(new TextEncoder().encode('secret'));
const key = crypto.randomBytes(16);
const iv = Buffer.from(crypto.randomBytes(12));
const algo = 'aes-128-gcm';
console.log(`clearText: ${clearText}`);

const cipher = crypto.createCipheriv(algo, key, iv);
let encrypted = cipher.update(clearText);
let encrypted2 = cipher.update(clearText);
encrypted = Buffer.concat([encrypted, encrypted2, cipher.final()]);
const cipherTag = cipher.getAuthTag();
console.log(`encrypted: ${encrypted}`);

console.log(algo, key.length, iv.length, cipherTag);
let decipher = crypto.createDecipheriv(algo, key, iv);
decipher.setAuthTag(cipherTag); 
let decrypted = decipher.update(encrypted);
decrypted = Buffer.concat([decrypted, decipher.final()]);
console.log(`decrypted: ${decrypted}`);

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