import React, { Component } from 'react';
import { database } from '../utils/firebase.js'

class AddCard extends Component {
  constructor(props){
    super(props);

    this.state = {
      value: '',
      dbPrompts: []
    }
    this._updateText = this._updateText.bind(this);
    this._addToDb = this._addToDb.bind(this);
  }

  _updateText(){
    this.setState({
      value: this.inputText.value
    })
  }

  _addToDb(evt){
    evt.preventDefault();
    let promptToAdd = this.state.value + '_______________';
    console.log("adding " + promptToAdd + " to database");
    database.ref('/prompts')
      .push({
        value: promptToAdd
      })
      .then(() => {
        console.log("success");
      })
      .catch((error) => {
        console.log(error);
      })
      console.log('rnnin line 36');
    }

  render() {
    return (
      <div>
        <section className="container-fluid">
          <div className="row">
            <form name="add-card" id="add-card" onSubmit= {this._addToDb}>
              <input onChange={this._updateText} ref={(input) => this.inputText = input} type="text" name="question" id="question" placeholder="What's your question?" />
              <button type="submit">Submit Question</button>
            </form>
            <br />
            <div className="card">
              <h4 className="card-title">{this.state.value}</h4>
              <h6>Cards Against Assembly</h6>
            </div>
          </div>
        </section>
      </div>
    )
  }
}

export default AddCard;
