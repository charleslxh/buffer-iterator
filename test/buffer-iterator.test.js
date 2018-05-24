'use strict';

const assert = require('assert');

const BufferIterator = require('../index');

describe('BufferIterator', function() {
  describe('#next()', function() {
    it('should return 0x01.', function() {
      const bi = BufferIterator.from([0x01, 0x02]);
      assert.equal(bi.next(), 0x01);
    });

    it('should return null when all bytes have been read.', function() {
      const bi = BufferIterator.from([0x01, 0x02]);
      bi.next();
      bi.next();
      assert.equal(bi.next(), null);
    });

    it('should not move the pointer when set needMovePointer false.', function() {
      const bi = BufferIterator.from([0x01, 0x02]);
      bi.next();
      bi.next(false);
      assert.equal(bi.hasNext(), true);
    });
  });

  describe('#prev()', function() {
    it('should return null when not have previous byte.', function() {
      const bi = BufferIterator.from([0x01, 0x02]);
      assert.equal(bi.prev(), null);
    });

    it('should return 0x01 and current byte is 0x02.', function() {
      const bi = BufferIterator.from([0x01, 0x02]);
      bi.next();
      bi.next();
      assert.equal(bi.prev(), 0x01);
      assert.equal(bi.current(), 0x02);
    });

    it('should return 0x01 and current byte is 0x01.', function() {
      const bi = BufferIterator.from([0x01, 0x02]);
      bi.next();
      bi.next();
      assert.equal(bi.prev(true), 0x01);
      assert.equal(bi.current(), 0x01);
    });
  });

  describe('#current()', function() {
    it('should return null when pointer is -1.', function() {
      const bi = BufferIterator.from([0x01, 0x02]);
      assert.equal(bi.current(), null);
    });

    it('should return 0x01.', function() {
      const bi = BufferIterator.from([0x01, 0x02]);
      bi.next();
      assert.equal(bi.current(), 0x01);
    });
  });

  describe('#hasNext()', function() {
    it('should return false when buffer is empty.', function() {
      const bi = new BufferIterator();
      assert.equal(bi.hasNext(), false);
    });

    it('should return true when buffer has remain bytes.', function() {
      const bi = BufferIterator.from([0x01, 0x02]);
      assert.equal(bi.hasNext(), true);
    });

    it('should return false when buffer read end.', function() {
      const bi = BufferIterator.from([0x01, 0x02]);
      bi.readBytes(2);
      assert.equal(bi.hasNext(), false);
    });
  });

  describe('#remainLength()', function() {
    it('should return 2.', function() {
      const bi = BufferIterator.from([0x01, 0x02]);
      assert.equal(bi.remainLength(), 2);
    });

    it('should return 1 after read a byte.', function() {
      const bi = BufferIterator.from([0x01, 0x02]);
      bi.next();
      assert.equal(bi.remainLength(), 1);
    });
  });

  describe('#readBytes()', function() {
    it('should return <Buffer 0x01>.', function() {
      const bi = BufferIterator.from([0x01, 0x02]);
      assert.equal(bi.readBytes(1).equals(Buffer.from([0x01])), true);
    });

    it('should return <Buffer 0x02> after read a byte.', function() {
      const bi = BufferIterator.from([0x01, 0x02]);
      bi.next();
      assert.equal(bi.readBytes(1).equals(Buffer.from([0x02])), true);
    });

    it('should return <Buffer 0x01 0x02> when read 10 bytes.', function() {
      const bi = BufferIterator.from([0x01, 0x02]);
      assert.equal(bi.readBytes(10).equals(Buffer.from([0x01, 0x02])), true);
    });
  });

  describe('#append()', function() {
    it('should have 3 byte after append a <Buffer 0x03>.', function() {
      const bi = BufferIterator.from([0x01, 0x02]);
      bi.append(Buffer.from([0x03]));
      assert.equal(bi.buffer.equals(Buffer.from([0x01, 0x02, 0x03])), true);
    });
  });

  describe('#itaretor()', function() {
    it('should can be foreach by "for...of".', function() {
      const buf = Buffer.from([0x01, 0x02]);
      const bi = new BufferIterator(buf);

      let i = 0;
      for (let byte of bi) {
        assert.equal(byte, buf[i++]);
      }
    });
  });
});
