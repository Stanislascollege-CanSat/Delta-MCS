// Data object.
const data = {
  log: [],
  push(input) {
    let currentDate = new Date()
    let entry = [currentDate.getHours()+':'+currentDate.getMinutes()+':'+currentDate.getSeconds(),input]
    this.log.push(entry)
  }
}
