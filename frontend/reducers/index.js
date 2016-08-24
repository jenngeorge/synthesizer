import { combineReducers } from 'redux';
import notesReducer from './notes_reducer';
import tracksReducer from './tracks_reducer';
import recordingsReducer from './is_recording_reducer';

const rootReducer = combineReducers({
  notes: notesReducer,
  tracks: tracksReducer,
  recordings: recordingsReducer

});

export default rootReducer;
