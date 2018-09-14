/* Serial data parser */
const parser = {
  config: {
    _openChar: '{',
    _closeChar: '}',
    // Char get function.
    get openChar() {
      return this._openChar
    },
    get closeChar() {
      return this._closeChar
    }
  },
  status: {
    parsing: false
  },
  packet: '',
  pipe(raw,output) {
    // Loop through every letter to find open & close character.
    for (let i=0; i<raw.length; i++) {
      switch (raw[i]) {
        case this.config.openChar:
          if (!this.status.parsing)  this.status.parsing = true
          else {
            // Is already parsing but found another opening bracket.
          }
        break
        case this.config.closeChar:
          if (this.status.parsing) {
            this.status.parsing = false
            output.add(this.packet)
            this.packet = ''
          } else {
            // Found close character while it was not parsing.
          }
        break
        default:
          if(this.status.parsing) this.packet += raw[i]
      }
    }
  }
}
