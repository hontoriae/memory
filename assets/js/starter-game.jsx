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
      matches: this.newMatches(),
      check: null
    };
  }

  newMatches() {
    let letterList = ["a", "b", "c", "d", "e", "f", "g", "h"];
    let xs = [];
    _.times(8, () => {
      let letterIndex = Math.floor(Math.random() * letterList.length);
      let letterVal = letterList[letterIndex];
      letterList.splice(letterIndex, 1);
      let match = { letter: letterVal, show: false }
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
      clicks: 0,
      check: null
    });
    this.setState({ st1 });
  }


  swap(_ev) {
    let origClicks = clone(this.state.clicks);
    let state1 = _.assign({}, this.state, {
      // What goes here? Probably need to copy paste this like 4 times for swapping state things
    });
    this.setState(state1);
  }

  update(ii) {
    let newClicks = this.state.clicks + 1;
    let currCard = this.state.matches[ii];
    let matchesList = this.state.matches;

    if (this.state.check != null) {
      let otherCard = this.state.matches[this.state.check];
      if (currCard.letter == otherCard.letter) {
        let newCard = { letter: "✓", show: true };
        let secondNewCard = { letter: "✓", show: true };
        matchesList.splice(ii, 1, newCard);
        matchesList.splice(this.state.check, 1, secondNewCard);
        let newMatchesCompleted = this.state.matchesComplete + 1;
        console.log("Increased matches completed!");
        console.log(newMatchesCompleted);
        let state1 = _.assign({}, this.state, {
          clicks: newClicks,
          matches: matchesList,
          check: null,
          matchesComplete: newMatchesCompleted
        });
        this.setState(state1);
      } else {
        let newCard = { letter: currCard.letter, show: false };
        let secondNewCard = { letter: otherCard.letter, show: false };
        matchesList.splice(ii, 1, newCard);
        matchesList.splice(this.state.check, 1, secondNewCard);
        let state1 = _.assign({}, this.state, {
          clicks: newClicks,
          matches: matchesList,
          check: null,
        });
        this.setState(state1);
      }
    } else {
      let newCard = { letter: currCard.letter, show: true };
      matchesList.splice(ii, 1, newCard);
      let state1 = _.assign({}, this.state, {
        clicks: newClicks,
        matches: matchesList,
        check: ii,
      });
      this.setState(state1);
    }
  }

  rowRender(start, end) {
    let toRender = this.state.matches.slice(start, end);
    let rendered =
      _.map(toRender, (card, ii) => {
        let letterToShow = "";
        if (card.show) {
          letterToShow = card.letter;
        } else {
          letterToShow = "x";
        }

        let actualPos = start + ii;
        return (
          <div className="column">
            <div className="card" key={actualPos} onClick={this.update.bind(this, actualPos)}>
              {letterToShow}
            </div>
          </div>
        )
      });
    return rendered;
  }

  render() {
    console.log("render");
    let resetButton = <button onClick={this.defaultMatches.bind(this)}>Reset</button>
    let clickTotal = <div>
      <p>
        You have clicked: {this.state.clicks} times
      </p>
    </div>
    console.log(this.state.matchesAvailable.valueOf());
    console.log(this.state.matchesComplete.valueOf());
    if (this.state.matchesAvailable.valueOf() == this.state.matchesComplete.valueOf()) {
      return <div>
        {resetButton}
        <p>You win!</p>
      </div>;
    }

    return (
      <div id="game">
        {clickTotal}
        {resetButton}
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
