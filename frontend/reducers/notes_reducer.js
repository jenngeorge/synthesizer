import {NotesConstants} from '../actions/note_actions';

const notesReducer = (state = [], action) => {

  const validKeys = ['a', 's', 'd', 'f', 'g'];
  const keyMap = {'a': 'C5', 's': 'D5', 'd': 'E5', 'f': "F5", 'g': "G5"};
  const keys = Object.keys(keyMap);

  switch(action.type){

    case NotesConstants.KEY_RELEASED:
      if (keys.includes(action.key) && state.includes(keyMap[action.key])){
        let exclude = state.indexOf(keyMap[action.key]);
        return state.slice(0, exclude).concat(exclude+1);
      } else {
        return state;
      }

    case NotesConstants.KEY_PRESSED:
      if (keys.includes(action.key)) {
        return [
          ...state,
          keyMap[action.key]
        ];
      } else {
        return state;
      }

    default:
      return state;
  }
};

export default notesReducer;
