const storage = {
  set(key, val){
    if (val) {
      val = JSON.stringify(val);
    }
    return localStorage.setItem(key, val)
  },
  get(key){

    let value = localStorage.getItem(key);
    if (value && value != "undefined" && value != "null") {
      return JSON.parse(value);
    }
    return null;
  },
  remove(key) {
    if(key){
      localStorage.removeItem(key)
    }
  },
  clearAll() {
    localStorage.clear()
  }
}

export {
  storage
}