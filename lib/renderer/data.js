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
    //this.log.push(new Entry())
    //let currentDate = new Date()
    //let entry = [currentDate.getHours()+':'+currentDate.getMinutes()+':'+currentDate.getSeconds(),input]
    //this.log.push(entry)
  },
  decode(raw) {
    // Loop through every letter to find value character & next character.
    for (let i=0; i<raw.length; i++) {
      switch (raw[i]) {
        case this.config.valueChar:
          this.status.isName = false
          this.status.isValue = true
        break
        case this.config.nextChar:
          this.status.isName = true
          this.status.isValue = false
        default:
          if(this.status.isName) this.packet.name += raw[i]
          else if (this.status.isValue) this.packet.name += raw[i]
          else console.error('[DATA] [DECODE] Raw input is neither name or value.')

      }
    }
  }
}
