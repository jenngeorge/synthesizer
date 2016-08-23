import React from 'react';
import Note from '../../util/note';
import { NOTE_NAMES, TONES } from '../../util/tones';
import $ from 'jquery';

class Synth extends React.Component {
  constructor(){
    super();
    let notes = NOTE_NAMES.map( (noteName) => {
      return new Note(TONES[noteName]);
    });
    this.notes = notes;
    this.NOTE_NAMES = NOTE_NAMES;
    this.playNotes = this.playNotes.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  onKeyDown(e){
    let key = String.fromCharCode(e.keyCode).toLowerCase();
    this.props.keyPressed(key);
  }

  onKeyUp(e){
    let key = String.fromCharCode(e.keyCode).toLowerCase();
    this.props.keyReleased(key);
  }

  componentDidMount(){
    $(document).on('keydown', e => this.onKeyDown(e));
    $(document).on('keyup', e => this.onKeyUp(e));
  }

  playNotes(){
    let currentStore = this.props.notes;
    let that = this;

    this.notes.forEach((note, idx)=> {
      if (currentStore.includes(that.NOTE_NAMES[idx])){
        note.start();
      } else {
        note.stop();
      }
    });
  }

  render() {
    this.playNotes();
    return (
      <div>
        <ul>
          {this.notes.map( (note, idx) => {
            return <li key={idx} value={note}>{NOTE_NAMES[idx]}</li>;
          })}
        </ul>
      </div>
    );
  }
} //class end

export default Synth;
