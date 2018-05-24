'use strict';

var _iterator = require('babel-runtime/core-js/symbol/iterator');

var _iterator2 = _interopRequireDefault(_iterator);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _symbol = require('babel-runtime/core-js/symbol');

var _symbol2 = _interopRequireDefault(_symbol);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BUFFER = (0, _symbol2.default)('BufferIterator#buffer');
var POINTER = (0, _symbol2.default)('BufferIterator#pointer');
var BUFFER_ITERATOR = (0, _symbol2.default)('BufferIterator#iterator');

var BufferIterator = function () {
  function BufferIterator(buf) {
    (0, _classCallCheck3.default)(this, BufferIterator);

    this.append(buf);

    this[POINTER] = -1;
  }

  (0, _createClass3.default)(BufferIterator, [{
    key: 'current',


    /**
    * Read current byte
    *
    * @return Number|Null
    **/
    value: function current() {
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

  }, {
    key: 'next',
    value: function next() {
      var needMovePointer = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

      if (this.hasNext()) {
        var pointer = needMovePointer ? ++this[POINTER] : this[POINTER] + 1;
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

  }, {
    key: 'prev',
    value: function prev() {
      var needMovePointer = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      if (this[POINTER] < 1) {
        return null;
      }

      var pointer = needMovePointer ? --this[POINTER] : this[POINTER] - 1;
      return this.buffer.readUInt8(pointer);
    }

    /**
    * If the has remain bytes to read.
    *
    * @return Boolean
    **/

  }, {
    key: 'hasNext',
    value: function hasNext() {
      var maxOffset = this.length - 1;
      return this.length > 0 && this[POINTER] < maxOffset;
    }

    /**
    * Get the count of unread bytes.
    *
    * @return Number
    **/

  }, {
    key: 'remainLength',
    value: function remainLength() {
      var maxOffset = this.length - 1;
      return this[POINTER] < maxOffset ? maxOffset - this[POINTER] : 0;
    }

    /**
    * Read some bytes
    *
    * @param number, the number of bytes to read, default is 1.
    * @return Buffer|Null
    **/

  }, {
    key: 'readBytes',
    value: function readBytes() {
      var number = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

      var start = this[POINTER] + 1;

      if (start > this.length - 1) {
        return null;
      }

      var buf = this.buffer.slice(start, start + number);
      this[POINTER] = this[POINTER] + number;
      return buf;
    }

    /**
    * Add buffer to buffer list.
    **/

  }, {
    key: 'append',
    value: function append(buf) {
      if (buf === null || buf === undefined) {
        return;
      }

      if (!buf instanceof Buffer) {
        buf = Buffer.from(buf);
      }

      this.buffer = Buffer.concat([this.buffer, buf], this.length + buf.length);
    }
  }, {
    key: _iterator2.default,
    value: function value() {
      var self = this;
      return {
        next: function next() {
          var value = self.next(true);
          var done = value === null;
          return { value: value, done: done };
        }
      };
    }
  }, {
    key: 'length',
    get: function get() {
      return this.buffer.length;
    }
  }, {
    key: 'buffer',
    get: function get() {
      if (!this[BUFFER]) {
        this[BUFFER] = Buffer.alloc(0);
      }

      return this[BUFFER];
    },
    set: function set(buf) {
      return this[BUFFER] = buf;
    }
  }]);
  return BufferIterator;
}();

;

module.exports = BufferIterator;