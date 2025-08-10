class GlobalState {
  constructor() {
    if (!GlobalState.instance) {
      this.state = {};
      GlobalState.instance = this;
    }
    return GlobalState.instance;
  }

  set(key, value) {
    this.state[key] = value;
  }

  get(key) {
    return this.state[key];
  }
}

module.exports = new GlobalState();
