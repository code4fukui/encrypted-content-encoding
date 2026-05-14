# encrypted-content-encoding

[
![Node.js CI](https://github.com/martinthomson/encrypted-content-encoding/actions/workflows/node.yml/badge.svg)
](https://github.com/martinthomson/encrypted-content-encoding/actions/workflows/node.yml)
[
![Python package](https://github.com/martinthomson/encrypted-content-encoding/actions/workflows/python.yml/badge.svg)
](https://github.com/martinthomson/encrypted-content-encoding/actions/workflows/python.yml)

[HTTP Encrypted Content-Encoding](https://tools.ietf.org/html/rfc8188) (RFC 8188) のシンプルな実装です。

このライブラリは Deno、Node.js、Python 用の実装を提供します。

## 機能

-   **マルチプラットフォーム:** Deno、Node.js、Python 用のそのまま使える（ドロップイン）実装。
-   **セキュア:** RFC 8188 で定義されている `aes128gcm` コンテンツ暗号化を実装。
-   **鍵共有 (Key Agreement):** 直接的な対称鍵と、静的-一時的 (static-ephemeral) ECDH モードの両方をサポート。

## 使い方

### Deno

URLから直接モジュールをインポートします。

```javascript
import ece from "https://code4fukui.github.io/encrypted-content-encoding/denojs/ece.js";
import base64 from "https://code4fukui.github.io/encrypted-content-encoding/denojs/base64.js";
import * as crypto_node from "https://code4fukui.github.io/encrypted-content-encoding/denojs/crypto_node.js";
import { Buffer } from "https://taisukef.github.io/buffer/Buffer.js";

// The `key` and `salt` are passed as URL-safe base64 encoded strings.
const params = {
  key: base64.encode(crypto_node.randomBytes(16)),
  salt: base64.encode(crypto_node.randomBytes(16))
};

const data = Buffer.from("I am the walrus");

// Encrypt the data
const encrypted = ece.encrypt(data, params);

// Decrypt the data
const decrypted = ece.decrypt(encrypted, params);

console.assert(decrypted.compare(data) === 0, "Decryption failed!");
console.log(decrypted.toString()); // "I am the walrus"
```

### Node.js

npmからパッケージをインストールします:

```sh
npm install http_ece
```

**例:**

```javascript
const ece = require('http_ece');
const crypto = require('crypto');

// The `key` and `salt` can be Buffers.
const params = {
  key: crypto.randomBytes(16),
  salt: crypto.randomBytes(16)
};

const data
```
