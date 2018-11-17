import Cache from 'yl-cache';

const deepCopy = data => JSON.parse(JSON.stringify(data));

export default class YlPersistentVar {
  constructor(name = 'yl-persistent-var') {
    const key = 'yl-persistent-var' + (name ? '-' + name : '');
    this._isBrowser = typeof localStorage !== 'undefined';
    if (this._isBrowser) {
      this._cache = new Cache(key);
      this._state = this._cache.get('data') || {}
    } else {
      this._state = {};
    }
    this._save();
  }
  
  setState(newState) {
    if (typeof newState === 'function') {
      this._state = deepCopy(newState(deepCopy(this._state)));
    } else if (typeof newState === 'object') {
      this._state = {
        ...deepCopy(this._state),
        ...deepCopy(newState),
      }
    }
    this._save();
  }
  
  getState() {
    return deepCopy(this._state);
  }
  
  clear() {
    this._state = {};
    this._save();
  }
  
  _save() {
    if (this._isBrowser) {
      this._cache.set('data', this._state);
    }
  }
}

