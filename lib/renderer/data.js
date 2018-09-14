// Data object.
const data = {
  log: [],
  push(input) {
    let time = new Date()
    let entry = [time.now(),input]
    this.log.push(entry)
  }
}
