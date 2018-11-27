// Data object.
const data = {
  packets: [],
  raw: '',
  currentIndex: -1,
  save: (name, value) => {
    data.packets[data.currentIndex][name] = value
    data.liveUpdate(name, value)
  },
  new: () => {
    // Increment currentIndex with 1.
    data.currentIndex += 1
    // Create new save object.
    let time = new Date()
    let packet = {
      timeCreated: time.getTime()
    }
    data.packets.push(packet)
  },
  liveUpdate: (name, value) => {
    $(`data-${name}`).innerHTML = value
  },
  reset: () => {
    this.currentIndex = -1
  }
}
