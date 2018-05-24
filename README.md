# Buffer Itaretor

Let Buffer can be foreach.

## Install

```bash
$ npm install buffer-iterator
```

## Methods

1. `next(needMovePointer = true): Number|Null`: Read a byte from buffer, and move pointer to next byte when `needMovePointer` is `true`(**default**), if has not next byte, return *null*.
    
    ```js
    const assert = require('assert');
    const BufferIterator = require('buffer-iterator');

    const bi = new BufferIterator(Buffer.from([0x01, 0x02]));
    assert.equal(bi.next(), 0x01);
    ```

2. `prev(needMovePointer = false): Number|Null`: Read a previous byte from buffer, and move pointer to previous byte when `needMovePointer` is `true`(**default false**), if has not previous byte, return *null*.

    ```js
    const assert = require('assert');
    const BufferIterator = require('buffer-iterator');

    const bi = new BufferIterator(Buffer.from([0x01, 0x02]));
    bi.next();
    bi.next();
    assert.equal(bi.prev(), 0x01);
    ```

3. `current(): Number`: Read current byte, if has not current byte, return *null*..

    ```js
    const assert = require('assert');
    const BufferIterator = require('buffer-iterator');

    const bi = new BufferIterator(Buffer.from([0x01, 0x02]));
    bi.next();
    assert.equal(bi.current(), 0x01);
    ```

4. `hasNext(): Boolean`: If have remain bytes to read.

    ```js
    const assert = require('assert');
    const BufferIterator = require('buffer-iterator');

    const bi = new BufferIterator(Buffer.from([0x01, 0x02]));
    bi.next();
    assert.equal(bi.hasNext(), true);
    ```

5. `remainLength(): Number`: Count bytes which have not been read.

    ```js
    const assert = require('assert');
    const BufferIterator = require('buffer-iterator');

    const bi = new BufferIterator(Buffer.from([0x01, 0x02]));
    bi.next();
    assert.equal(bi.remainLength(), 1);
    ```

6. `readBytes(number = 1): Buffer|Null`: Read multi bytes.

    ```js
    const assert = require('assert');
    const BufferIterator = require('buffer-iterator');

    const bi = new BufferIterator(Buffer.from([0x01, 0x02]));
    assert.equal(bi.readBytes(10).equals(Buffer.from([0x01, 0x02])), true);
    ```

7. `append(buf): Null`: Append buffer.

    ```js
    const assert = require('assert');
    const BufferIterator = require('buffer-iterator');

    const bi = new BufferIterator(Buffer.from([0x01, 0x02]));
    bi.append(Buffer.from([0x03]));
    assert.equal(bi.buffer.equals(Buffer.from([0x01, 0x02, 0x03])), true);
    ```

8. use `for...of`.

    ```js
    const assert = require('assert');
    const BufferIterator = require('buffer-iterator');

    const bi = new BufferIterator(Buffer.from([0x01, 0x02]));
    for (let byte of bi) {
      console.log(byte);
    }

    // 1
    // 2
    ```
