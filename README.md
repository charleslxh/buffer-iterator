# Buffer Iterator

[![Build Status](https://travis-ci.org/charleslxh/buffer-iterator.svg?branch=master)](https://travis-ci.org/charleslxh/buffer-iterator)

Let Buffer can be foreach.

## Install

```bash
$ npm install buffer-iterator --save
```

## Static Methods

1. `from(): BufferIterator`: Create a `BufferIterator`, *arguments* is `Buffer.from`'s arguments.

    ```js
    const bi = BufferIterator.from([0x01, 0x02]);
    // same as 
    const bi = new BufferIterator(Buffer.from([0x01, 0x02]));
    ```

## Instance Methods

1. `next(needMovePointer = true): Number|Null`: Read a byte from buffer, and move pointer to the next byte when `needMovePointer` is `true`(**default**), if it has not next byte, return *null*.
    
    ```js
    const assert = require('assert');
    const BufferIterator = require('buffer-iterator');

    const bi = BufferIterator.from([0x01, 0x02]);
    assert.equal(bi.next(), 0x01);
    ```

2. `prev(needMovePointer = false): Number|Null`: Read a previous byte from buffer, and move pointer to previous byte when `needMovePointer` is `true`(**default false**). Returns previous byte if it exists, otherwise it returns *null*.

    ```js
    const assert = require('assert');
    const BufferIterator = require('buffer-iterator');

    const bi = BufferIterator.from([0x01, 0x02]);
    bi.next();
    bi.next();
    assert.equal(bi.prev(), 0x01);
    ```

3. `current(): Number`: Returns current byte if it exists, otherwise it returns *null*.

    ```js
    const assert = require('assert');
    const BufferIterator = require('buffer-iterator');

    const bi = BufferIterator.from([0x01, 0x02]);
    bi.next();
    assert.equal(bi.current(), 0x01);
    ```

4. `hasNext(): Boolean`: Returns true if and only if the iterator has other bytes to read.

    ```js
    const assert = require('assert');
    const BufferIterator = require('buffer-iterator');

    const bi = BufferIterator.from([0x01, 0x02]);
    bi.next();
    assert.equal(bi.hasNext(), true);
    ```

5. `remainLength(): Number`: Counts bytes which have not been read yet.

    ```js
    const assert = require('assert');
    const BufferIterator = require('buffer-iterator');

    const bi = BufferIterator.from([0x01, 0x02]);
    bi.next();
    assert.equal(bi.remainLength(), 1);
    ```

6. `readBytes(number = 1): Buffer|Null`: Read multi bytes.

    ```js
    const assert = require('assert');
    const BufferIterator = require('buffer-iterator');

    const bi = BufferIterator.from([0x01, 0x02]);
    assert.equal(bi.readBytes(10).equals(Buffer.from([0x01, 0x02])), true);
    ```

7. `append(buf): Null`: Append buffer.

    ```js
    const assert = require('assert');
    const BufferIterator = require('buffer-iterator');

    const bi = BufferIterator.from([0x01, 0x02]);
    bi.append(Buffer.from([0x03]));
    assert.equal(bi.buffer.equals(Buffer.from([0x01, 0x02, 0x03])), true);
    ```

8. use `for...of`.

    ```js
    const assert = require('assert');
    const BufferIterator = require('buffer-iterator');

    const bi = BufferIterator.from([0x01, 0x02]);
    for (let byte of bi) {
      console.log(byte);
    }

    // 1
    // 2
    ```

# Contribute

1. fork.

2. install dependencies.

    ```bash
    $ npm install
    ```

3. run command.

    ```bash
    $ gulp
    ```
