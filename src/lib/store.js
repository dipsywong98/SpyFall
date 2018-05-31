import { createStore } from 'redux'

const reducer = (state = 'en', action) => {
  switch (action.type) {
    case 'CHANGE': return action.value;
    default: return state;
  }
}

const setLang =  newLang => ({ type: 'CHANGE', value: newLang })

const store = createStore(reducer)

store.subscribe(()=>console.log(store.getState()))

const getLang = store.getState

export {
  store,
  setLang,
  getLang
}
