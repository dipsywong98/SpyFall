import { createStore } from 'redux'

const reducer = (state = { lang: 'en' }, action) => {
  switch (action.type) {
    case 'CHANGE_LANG': return { lang: action.newLang };
    default: return state;
  }
}

const setLang = newLang => ({ type: 'CHANGE_LANG', newLang })

const store = createStore(reducer)

store.subscribe(() => console.log(store.getState()))

export {
  store,
  setLang
}
