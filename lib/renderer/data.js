// Data object.
const data = {
  log: [],
  status: {
    isValue: false,
    isName: true
  },
  packet: {
    name: undefined,
    value: undefined
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
  decode(raw) {
    // Loop through every letter to find value character & next character.
    for (let i=0; i<raw.length; ++i) {
      // Check if character is normal text or the value or next character.
      if (raw[i] === this.config.valueChar) {
        this.status.isName = false
        this.status.isValue = true
        console.warn('valueChar')
      } else if (raw[i] === this.config.nextChar) {
        this.status.isName = true
        this.status.isValue = false
        console.error('nextChar')
      } else {
        if (this.status.isName && !this.status.isValue) console.log('name')
        else if (this.status.isValue && !this.status.isName) console.log('value')
        else console.erro('[DATA] [DECODE] given string has section that is a name and value.')
      }


      // switch (raw[i]) {
      //   case this.config.valueChar:
      //     console.log('valueChar')
      //     this.status.isName = false
      //     this.status.isValue = true
      //   break
      //   case this.config.nextChar:
      //     console.log('nextChar')
      //     this.status.isName = true
      //     this.status.isValue = false
      //   break
      //   default:
      //     console.log('normalChar')
      //     if(this.status.isName) this.packet.name += raw[i]
      //     else if (this.status.isValue) this.packet.name += raw[i]
      //     else console.error('[DATA] [DECODE] Raw input is neither name or value.')
      //
      // }
    }
    return this.packet
  }
}
