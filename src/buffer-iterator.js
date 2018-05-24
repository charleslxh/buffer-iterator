'use strict';

const BUFFER = Symbol('BufferIterator#buffer');
const POINTER = Symbol('BufferIterator#pointer');
const BUFFER_ITERATOR = Symbol('BufferIterator#iterator');

class BufferIterator {
  constructor(buf) {
    this.append(buf);

    this[POINTER] = -1;
  }

  get length() {
    return this.buffer.length;
  }

  get buffer() {
    if (!this[BUFFER]) {
      this[BUFFER] = Buffer.alloc(0);
    }

    return this[BUFFER];
  }

  set buffer(buf) {
    return this[BUFFER] = buf;
  }

  /**
  * Read current byte
  *
  * @return Number|Null
  **/
  current() {
    if (this[POINTER] < 0 || this[POINTER] > this.length - 1) {
      return null;
    }

    return this.buffer[this[POINTER]];
  }

  /**
  * Read next one byte
  *
  * @param needMovePointer, move the pointer to next byte.
  * @return Number|Null
  **/
  next(needMovePointer = true) {
    if (this.hasNext()) {
      const pointer = needMovePointer ? ++this[POINTER] : this[POINTER] + 1
      return this.buffer.readUInt8(pointer);
    }

    return null;
  }

  /**
  * Read previous one byte
  *
  * @param needMovePointer, move the pointer to next byte.
  * @return Number|Null
  **/
  prev(needMovePointer = false) {
    if (this[POINTER] < 1) {
      return null;
    }

    const pointer = needMovePointer ? --this[POINTER] : this[POINTER] - 1
    return this.buffer.readUInt8(pointer);
  }

  /**
  * If the has remain bytes to read.
  *
  * @return Boolean
  **/
  hasNext() {
    const maxOffset = this.length - 1;
    return this.length > 0 && this[POINTER] < maxOffset;
  }

  /**
  * Get the count of unread bytes.
  *
  * @return Number
  **/
  remainLength() {
    const maxOffset = this.length - 1;
    return this[POINTER] < maxOffset ? maxOffset - this[POINTER] : 0;
  }

  /**
  * Read some bytes
  *
  * @param number, the number of bytes to read, default is 1.
  * @return Buffer|Null
  **/
  readBytes(number = 1) {
    const start = this[POINTER] + 1;

    if (start > this.length - 1) {
      return null
    }

    const buf = this.buffer.slice(start, start + number);
    this[POINTER] = this[POINTER] + number;
    return buf;
  }

  /**
  * Add buffer to buffer list.
  **/
  append(buf) {
    if (buf === null || buf === undefined) {
      return;
    }

    if (!buf instanceof Buffer) {
      buf = Buffer.from(buf);
    }

    this.buffer = Buffer.concat([this.buffer, buf], this.length + buf.length);
  }

  [Symbol.iterator]() {
    const self = this;
    return {
      next: function() {
        const value = self.next(true);
        const done = value === null;
        return { value, done };
      }
    }
  }
};

module.exports = BufferIterator;
