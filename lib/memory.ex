defmodule Memory do
  @moduledoc """
  Memory keeps the contexts that define your domain
  and business logic.

  Contexts are also responsible for managing your data, regardless
  if it comes from the database, an external API or others.

  To port over:
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
  """
@doc """
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
"""
  def new do
    letterList = ["a", "b", "c", "d", "e", "f", "g", "h"]
    xs = newCards(letterList, [])
    %{
      matches: xs,
      matchesComplete: 0,
      matchesAvailable: 8, 
      clicks: 0,
      check: 0
    }
  end

  @doc """
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
  """
  def flip do
    
  end

  @doc """
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
  """
  def newCards(letterList, acc) do
    if (length(letterList) != 0) do
      defMatch(letterList, acc);
    else
      acc 
    end 
  end

  def defMatch(letters, acc) do
    letterVal = hd(letters)
    match = %{letter: letterVal, show: false}
    newAcc = acc ++ [match, match]
    newLetters = tl(letters)
    newCards(newLetters, newAcc)
  end
end
