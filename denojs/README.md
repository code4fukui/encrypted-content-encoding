# encrypted-content-encoding

A simple implementation of the [HTTP encrypted
content-encoding](https://tools.ietf.org/html/rfc8188)

# Use

```js
import base64 from "./base64.js";
import ece from "./ece.js";
import * as crypto_node from "./crypto_node.js";
import { assert } from "https://code4fukui.github.io/describe/describe.js";
import { Buffer } from "https://taisukef.github.io/buffer/Buffer.js";

const parameters = {
  key: base64.encode(crypto_node.randomBytes(16)),
  salt: base64.encode(crypto_node.randomBytes(16))
};

const data = Buffer.from("test data");

const encrypted = ece.encrypt(data, parameters);

const decrypted = ece.decrypt(encrypted, parameters);

assert.equal(decrypted.compare(data), 0);
console.log(decrypted.toString());
```

This also supports the static-ephemeral ECDH mode.  The source explains how.

# TODO

Use the node streams API instead of the legacy APIs.
