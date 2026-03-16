# 暗号化コンテンツエンコーディング

このライブラリは、[HTTP 暗号化コンテンツエンコーディング](https://tools.ietf.org/html/rfc8188)の簡単な実装です。Deno、Node.js、Pythonの各実装が利用可能です。

## 使い方

### Deno

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

このライブラリはスタティック-エフェメラルECDHモードにも対応しています。ソースコードに詳しい説明があります。

### Python

```python
import http_ece
import os, base64

key = os.urandom(16)
salt = os.urandom(16)
data = os.urandom(100)

encrypted = http_ece.encrypt(data, salt=salt, key=key)
decrypted = http_ece.decrypt(encrypted, salt=salt, key=key)
assert data == decrypted
```

このライブラリはスタティック-エフェメラルECDHモードにも対応しています。

### Node.js

```js
var ece = require('http_ece');
var crypto = require('crypto')
var base64 = require('base64url');

var parameters = {
  key: base64.encode(crypto.randomBytes(16)),
  salt: base64.encode(crypto.randomBytes(16))
};
var encrypted = ece.encrypt(data, parameters);

var decrypted = ece.decrypt(encrypted, parameters);

require('assert').equal(decrypted.compare(data), 0);
```

このライブラリはスタティック-エフェメラルECDHモードにも対応しています。ソースコードに詳しい説明があります。

## ライセンス
MIT License