import {TracksConstants} from '../actions/tracks_actions';
import merge from 'lodash/merge';


let currTrackId = 0;

const track = (state = {}, action) => {
  switch(action.type){
    case TracksConstants.START_RECORDING:
      return {
        id: currTrackId,
        name: `Track ${currTrackId}`,
        roll: [],
        timeStart: action.timeStart
      };

    case TracksConstants.STOP_RECORDING:
      return merge({}, state,
        {roll:
          [...state.roll,
          { notes: action.notes, timeSlice: action.timeNow - state.timeStart }
          ]
        });

    case TracksConstants.ADD_NOTE:
      return merge({}, state, {
       roll: [
         ...state.roll,
         { notes: action.notes, timeSlice: action.timeNow - state.timeStart }
       ]
     });

  }
};

const tracksReducer = (state = {}, action) => {

  switch(action.type){
    case TracksConstants.START_RECORDING:
      currTrackId ++;
      return merge({}, state,
        {[currTrackId]: track(undefined, action)});

    case TracksConstants.STOP_RECORDING:
      return merge({}, state, {
         [currTrackId]: track(state[currTrackId], action)
       });

    case TracksConstants.ADD_NOTES:
      return merge({}, state, {
        [currTrackId]: track(state[currTrackId], action)
      });

    default:
      return state;
  }

};



export default tracksReducer;
