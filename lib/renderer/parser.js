/* Serial data parser */
const parser = {
  // Open &  close character for packets.
  config: {
    _openChar: '{',
    _closeChar: '}',
    _valueChar: ':',
    _nextChar: ';',
    // Char get function.
    get openChar () {
      return this._openChar
    },
    get closeChar () {
      return this._closeChar
    },
    get valueChar () {
      return this._valueChar
    },
    get nextChar () {
      return this._nextChar
    }
  },
  status: {
    inPacket: false,
    isValue: false,
    isName: true
  },
  packet: '',
  pair: {
    name: '',
    value: ''
  },
  log: [],
  // Convert bits of packet from the serial connection to complete packets.
  pipe (raw, callback) {
    // Safe the raw serial data in the data Object.
    data.raw += raw
    // Loop through every letter to find open & close character.
    for (let i = 0; i < raw.length; i++) {
      switch (raw[i]) {
        case this.config.openChar:
          if (!this.status.inPacket) this.status.inPacket = true
          else {
            // Is already parsing but found another opening bracket.
          }
          // Create new packet save location.
          data.new()
          break
        case this.config.closeChar:
          if (this.status.inPacket) {
            this.status.inPacket = false
            // Packet pipeing done.
            callback(this.packet)
            // Add one packet to counter.
            this.count.addReceived()
            this.packet = ''
          } else {
            // Found close character while it was not parsing.
          }
          break
        default:
          if (this.status.inPacket) this.packet += raw[i]
      }
    }
  },
  /*
    FIXME: Throw error when two valueChar or nextChar are given after each other.
  */
  // Convert complete packet to object.
  decode (raw) {
    // Loop through every letter to find value character & next character.
    for (let i = 0; i < raw.length; ++i) {
      // Check if character is normal text or the value or next character.
      if (raw[i] === this.config.valueChar) {
        this.status.isName = false
        this.status.isValue = true
      } else if (raw[i] === this.config.nextChar) {
        this.status.isName = true
        this.status.isValue = false
        // Save data pair to data log.
        data.add(this.pair.name, this.pair.value)
        // Reset pair variables.
        this.pair.name = ''
        this.pair.value = ''
      } else {
        if (this.status.isName && !this.status.isValue) this.pair.name += raw[i]
        else if (this.status.isValue && !this.status.isName) this.pair.value += raw[i]
        else console.error('[DATA] [DECODE] given string has section that is a name and value.')
      }
    }
    return this.log
  },
  // Packet counter.
  count: {
    _received: 0,
    addReceived () {
      this._received += 1
      $('packetsReceived').innerHTML = ': ' + this._received

      return this._received
    },
    _send: 0,
    addSend () {
      this._send += 1
      $('packetsSend').innerHTML = ': ' + this._send
    },
    reset () {
      this._received = 0
      this._send = 0
      $('packetsReceived').innerHTML = ': --'
      $('packetsSend').innerHTML = ': --'
    }
  }
}
