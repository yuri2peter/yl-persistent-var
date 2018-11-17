# yl-persistent-var
Persist your data by localStorage and use it like react's state.

Recommended for use in webpack environment.

## How to Use

```javascript
import YlPersistentVar from 'yl-persistent-var'

const v = new YlPersistentVar();
// set states
v.setState({
  a:1,
  b:2,
});
console.log(v.getState());

// set state by a function
v.setState(prevState => {
  prevState.a++;
  return prevState;
});
console.log(v.getState());

// clear your data
v.clear();
console.log(v.getState());

```

Your data will be saved by localStorage. Try run this script again. 
