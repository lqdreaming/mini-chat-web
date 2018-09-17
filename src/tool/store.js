export default {
  fetch(key) {
    return JSON.parse(window.localStorage.getItem(
      key || "[]"))
  },
  save(key, items) {
    window.localStorage.setItem(key, JSON.stringify(items))
  },
  delete(key){
    window.localStorage.removeItem(key);
  }

}
