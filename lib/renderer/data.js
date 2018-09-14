// Data object.
const data = {
  log: [],
  add(input) {
    let currentDate = new Date()
    let entry = [currentDate.getHours()+':'+currentDate.getMinutes()+':'+currentDate.getSeconds(),input]
    this.log.push(entry)
  }
}
