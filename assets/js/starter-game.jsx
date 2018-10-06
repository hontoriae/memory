import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';

export default function game_init(root, channel) {
  ReactDOM.render(<MatchGame channel={channel}/>, root);
}

class MatchGame extends React.Component {
  constructor(props) {
    super(props);
    this.channel = props.channel;
    this.state = {
      matchesComplete: 0,
      matchesAvailable: 8,
      clicks: 0,
      matches: null,
      check: null
    };

    this.channel.join()
      .receive("ok", this.gotView.bind(this))
      .receive("error", resp => {console.log("Woopsies", resp)});
  }

  gotView(view) {
    console.log("new view", view);
    console.log("game");
    console.log(view.game);
    this.setState(view.game);
  }

  sendFlip(ev) {
    this.channel.push("flip", { card: "hi" })
      .receive("ok", this.gotView.bind(this))
      .receive("error", resp => {console.log("Uhhh", resp)});
  }

  sendReset(ev) {
    this.channel.push("reset")
      .receive("ok", this.gotView.bind(this))
      .receive("error", resp => {console.log("tried to reset woops", resp)})
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
    let resetButton = <button onClick={this.sendReset.bind(this)}>Reset</button>
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
