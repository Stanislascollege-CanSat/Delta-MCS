// Data object.
const data = {
  log: [],
  status: {
    isValue: false,
    isName: true
  },
  pair: {
    name: '',
    value: ''
  },
  config: {
    _valueChar: ':',
    _nextChar: ';',
    // Char get function.
    get valueChar() {
      return this._valueChar
    },
    get nextChar() {
      return this._nextChar
    }
  },
  add(input) {
    console.log(input)
    this.decode(input)
  },
}
