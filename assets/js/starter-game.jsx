import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';

export default function game_init(root) {
  ReactDOM.render(<MatchGame />, root);
}

// State needs:
// how many matches made
// total matches available
// clicks made
// a list of cards

// Card needs:
// a letter
// shown or hidden
// completed

// Additional functionality: reset button

class MatchGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      matchesComplete: 0,
      matchesAvailable: 8,
      clicks: 0,
      matches: this.newMatches()
    };
  }

  newMatches() {
    let letterList = ["a", "b", "c", "d", "e", "f", "g", "h"];
    let xs = [];
    _.times(8, () => {
      let letterIndex = Math.floor(Math.random() * letterList.length);
      let letterVal = letterList[letterIndex];
      letterList.splice(letterIndex, 1);
      let match = { letter: letterVal, show: false, complete: false }
      xs.push(match);
      xs.push(match);
    });
    return _.shuffle(xs);
  }

  defaultMatches() {
    let xs = this.newMatches();
    let st1 = _.assign(this.state, {
      matches: xs,
      matchesComplete: 0,
      matchesAvailable: 8,
      clicks: 0
    });
    this.setState({ st1 });
  }


  swap(_ev) {
    let state1 = _.assign({}, this.state, {
      // What goes here? Probably need to copy paste this like 4 times for swapping state things
    });
    this.setState(state1);
  }

  reset() {
    // Need to reset the state to the original state,
    // create new matches, etc.
  }

  rowRender(start, end) {
    let toRender = this.state.matches.slice(start, end);
    console.log(toRender.length);
    let rendered =
      _.map(toRender, (card, ii) => {
        return <div className="column card">
          {card.letter}
        </div>
      });
    return rendered;
  }

  render() {
    console.log("render");
    // let resetButton = <button onClick="reset">Reset</button>
    let clickTotal = <div>
      <p>
        You have clicked: {this.state.clicks} times
      </p>
    </div>
    if (this.state.matchesAvailable == this.state.matchesComplete) {
      return <div>
        <p>You win!</p>
      </div>;
    }

    return (
      <div id="game">
        {clickTotal}
        <button onClick={this.defaultMatches.bind(this)}>Reset</button>
        <div>
          <div className="row">
            {this.rowRender(0, 4)}
          </div>
          <div className="row">
            {this.rowRender(4, 8)}
          </div>
          <div className="row">
            {this.rowRender(8, 12)}
          </div>
          <div className="row">
            {this.rowRender(12, 17)}
          </div>
        </div>
      </div>
    );
  }
}
