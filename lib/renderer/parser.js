const parser = {
  START_CHAR: "{",
  STOP_CHAR: "}",

  isRunning: false,
  isReading: false,

  readArray: [],
  readString: "",

  start: function(data){
    this.isRunning = true
    let char = ""
    for(let i = 0; i < data.length; ++i){
      char = data[i]
      switch(char){
        case this.START_CHAR:
          if(!this.isReading){
            this.isReading = true
          }else{
            // DATA CORRUPTION OCCURED
            this.readArray.push(this.readString)
            this.readString = ""
          }
          break
        case this.STOP_CHAR:
          if(this.isReading){
            this.isReading = false
            this.readArray.push(this.readString)
            this.readString = ""
          }else{
            // DATA CORRUPTION OCCURED
          }
          break
        default:
          if(this.isReading){
            this.readString += char
          }
      }
    }
  },

  emptyArray: function(){
    this.readArray = []
  },

  getArray: function(){
    bufferArray = this.readArray
    this.emptyArray()
    return bufferArray
  },

  stop: function(){
    isRunning = false
  }
}
