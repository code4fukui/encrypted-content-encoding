import { Base64URL } from "https://code4fukui.github.io/Base64URL/Base64URL.js";
import { Buffer } from "https://taisukef.github.io/buffer/Buffer.js";

export default {
  encode: (b) => Base64URL.encode(b),
  decode: (s) => Buffer.from(Base64URL.decode(s)),
};
