import forge from "https://taisukef.github.io/forge-es/lib/forge.js";
import {} from "https://taisukef.github.io/forge-es/lib/aes.js";
import { hex } from "https://code4sabae.github.io/js/hex.js";
import { Buffer } from "https://taisukef.github.io/buffer/Buffer.js";
import node_crypto from "node:crypto"; // for createECDH, createHmac

const array2s = (ar) => {
  const res = [];
  for (let i = 0; i < ar.length; i++) {
    res.push(String.fromCharCode(ar[i]));
  }
  const s = res.join("");
  //console.log("a2s", ar, s);
  return s;
};

export const createCipheriv = (alg, key, iv) => { // alg only AES-GCM
  const cipher = forge.cipher.createCipher('AES-GCM', array2s(key));
  cipher.start({
    iv: iv, // should be a 12-byte binary-encoded string or byte buffer
    //additionalData: 'binary-encoded string', // optional
    tagLength: 128, // optional, defaults to 128 bits
  });
  return {
    update: (buf) => {
      cipher.update(forge.util.createBuffer(buf));
    },
    final: () => {
      cipher.finish();
      return Buffer.from(hex.toBin(cipher.output.toHex()));
    },
    getAuthTag: () => {
      return Buffer.from(hex.toBin(cipher.mode.tag.toHex()));
    },
  };
};

export const createDecipheriv = (alg, key, iv, tag) => { // alg only AES-GCM
  const decipher = forge.cipher.createDecipher('AES-GCM', array2s(key));
  decipher.start({
    iv: iv,
    //additionalData: 'binary-encoded string', // optional
    tagLength: 128, // optional, defaults to 128 bits
    tag: forge.util.createBuffer(tag), //forge.util.createBuffer(tag) // authentication tag from encryption
  });
  return {
    update: (buf) => {
      decipher.update(forge.util.createBuffer(buf));
    },
    final: () => {
      if (!decipher.finish()) {
        //return null;
      }
      const decrypted = hex.toBin(decipher.output.toHex()); //decrypted = Buffer.concat([decrypted, decipher.final()]);
      return Buffer.from(decrypted);
    },
  };
};

export const randomBytes = (len) => {
  const n = new Uint8Array(len);
  crypto.getRandomValues(n);
  return Buffer.from(n);
};

// node:crypto
export const createECDH = (alg) => {
  return node_crypto.createECDH(alg);
};
export const createHmac = (alg, key) => {
  return node_crypto.createHmac(alg, key);
};
