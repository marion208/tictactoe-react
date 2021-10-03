import React from 'react';
import './App.css';
import GridBox from './components/GridBox';
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { Fireworks } from "fireworks-js";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.startNewGame = this.startNewGame.bind(this);
    this.boxSelected = this.boxSelected.bind(this);
  }

  startNewGame() {
    window.location.reload();
  };

  boxSelected(id_box) {
    if (id_box !== undefined) {
      var loader = document.getElementById('loader');
      loader.classList.remove("invisible");
      var box = document.getElementById(id_box);
      if (box !== null) {
        if (box.textContent === "") {
          box.innerHTML = "X";
          this.continueGame();
        }
      }

      setTimeout(function () {
        box.parentNode.classList.remove('EmptyBox');
        box.parentNode.classList.add('FilledBox');
        loader.classList.add("invisible");
      }, 500);
    }
  };

  continueGame() {
    var result = this.checkIfSomeoneWins();
    if (result === "X") {
      var firebox = document.getElementById("fireworks_container");
      if (firebox.classList.contains("invisible")) {
        firebox.classList.remove("invisible");
      }
      const fireworks = new Fireworks(firebox, {});
      fireworks.setSize({ height: 500, width: 500 });
      fireworks.start();
      setTimeout(function () {
        fireworks.stop();
      }, 10000);
    } else if (result === "O") {
      var eltMessageGame = document.getElementById("game_message_container");
      eltMessageGame.innerHTML = "Vous avez perdu !";
      var grid = document.getElementsByClassName('GridGame');
      grid[0].style.zIndex = -2;
    } else {
      var GameOver = this.checkIfGameIsOver();
      if (GameOver === false) {
        this.computerPlays();
        var resultComputer = this.checkIfSomeoneWins();
        if (resultComputer === "O") {
          var elmtMessageGame = document.getElementById("game_message_container");
          elmtMessageGame.innerHTML = "Vous avez perdu !";
          var gridElt = document.getElementsByClassName('GridGame');
          gridElt[0].style.zIndex = -2;
        }
      } else {
        var messageGame = document.getElementById("game_message_container");
        messageGame.innerHTML = "Match nul !";
        var gridElmt = document.getElementsByClassName('GridGame');
        gridElmt[0].style.zIndex = -2;
      }
    }
  }

  computerPlays() {
    var box00 = document.getElementById('box00');
    var box01 = document.getElementById('box01');
    var box02 = document.getElementById('box02');
    var box10 = document.getElementById('box10');
    var box11 = document.getElementById('box11');
    var box12 = document.getElementById('box12');
    var box20 = document.getElementById('box20');
    var box21 = document.getElementById('box21');
    var box22 = document.getElementById('box22');
    var computerCanWin = this.computerAlmostWin(box00, box01, box02, box10, box11, box12, box20, box21, box22);
    if (!computerCanWin) {
      var humanCanWin = this.humanAlmostWin(box00, box01, box02, box10, box11, box12, box20, box21, box22);
      if (!humanCanWin) {
        this.playDefaultLogic(box00, box01, box02, box10, box11, box12, box20, box21, box22);
      }
    }
  }

  computerAlmostWin(box00, box01, box02, box10, box11, box12, box20, box21, box22) {
    var computerAlmostWinFirstLine = ((box00.textContent === "O" && box01.textContent === "O") || (box01.textContent === "O" && box02.textContent === "O") || (box00.textContent === "O" && box02.textContent === "O")) && (box00.textContent === "" || box01.textContent === "" || box02.textContent === "");
    if (computerAlmostWinFirstLine) {
      if (box00.textContent === "") {
        box00.innerHTML = "O";
        box00.parentNode.classList.remove('EmptyBox');
        box00.parentNode.classList.add('FilledBox');
        return true;
      } else if (box01.textContent === "") {
        box01.innerHTML = "O";
        box01.parentNode.classList.remove('EmptyBox');
        box01.parentNode.classList.add('FilledBox');
        return true;
      } else {
        box02.innerHTML = "O";
        box02.parentNode.classList.remove('EmptyBox');
        box02.parentNode.classList.add('FilledBox');
        return true;
      }
    } else {
      var computerAlmostWinMiddleLine = ((box10.textContent === "O" && box11.textContent === "O") || (box11.textContent === "O" && box12.textContent === "O") || (box10.textContent === "O" && box12.textContent === "O")) && (box10.textContent === "" || box11.textContent === "" || box12.textContent === "");
      if (computerAlmostWinMiddleLine) {
        if (box10.textContent === "") {
          box10.innerHTML = "O";
          box10.parentNode.classList.remove('EmptyBox');
          box10.parentNode.classList.add('FilledBox');
          return true;
        } else if (box11.textContent === "") {
          box11.innerHTML = "O";
          box11.parentNode.classList.remove('EmptyBox');
          box11.parentNode.classList.add('FilledBox');
          return true;
        } else {
          box12.innerHTML = "O";
          box12.parentNode.classList.remove('EmptyBox');
          box12.parentNode.classList.add('FilledBox');
          return true;
        }
      } else {
        var computerAlmostWinLastLine = ((box20.textContent === "O" && box21.textContent === "O") || (box21.textContent === "O" && box22.textContent === "O") || (box20.textContent === "O" && box22.textContent === "O")) && (box20.textContent === "" || box21.textContent === "" || box22.textContent === "");
        if (computerAlmostWinLastLine) {
          if (box20.textContent === "") {
            box20.innerHTML = "O";
            box20.parentNode.classList.remove('EmptyBox');
            box20.parentNode.classList.add('FilledBox');
            return true;
          } else if (box21.textContent === "") {
            box21.innerHTML = "O";
            box21.parentNode.classList.remove('EmptyBox');
            box21.parentNode.classList.add('FilledBox');
            return true;
          } else {
            box22.innerHTML = "O";
            box22.parentNode.classList.remove('EmptyBox');
            box22.parentNode.classList.add('FilledBox');
            return true;
          }
        } else {
          var computerAlmostWinFirstColumn = ((box00.textContent === "O" && box10.textContent === "O") || (box10.textContent === "O" && box20.textContent === "O") || (box00.textContent === "O" && box20.textContent === "O")) && (box00.textContent === "" || box10.textContent === "" || box20.textContent === "");
          if (computerAlmostWinFirstColumn) {
            if (box00.textContent === "") {
              box00.innerHTML = "O";
              box00.parentNode.classList.remove('EmptyBox');
              box00.parentNode.classList.add('FilledBox');
              return true;
            } else if (box10.textContent === "") {
              box10.innerHTML = "O";
              box10.parentNode.classList.remove('EmptyBox');
              box10.parentNode.classList.add('FilledBox');
              return true;
            } else {
              box20.innerHTML = "O";
              box20.parentNode.classList.remove('EmptyBox');
              box20.parentNode.classList.add('FilledBox');
              return true;
            }
          } else {
            var computerAlmostWinMiddleColumn = ((box01.textContent === "O" && box11.textContent === "O") || (box11.textContent === "O" && box21.textContent === "O") || (box01.textContent === "O" && box21.textContent === "O")) && (box01.textContent === "" || box11.textContent === "" || box21.textContent === "");
            if (computerAlmostWinMiddleColumn) {
              if (box01.textContent === "") {
                box01.innerHTML = "O";
                box01.parentNode.classList.remove('EmptyBox');
                box01.parentNode.classList.add('FilledBox');
                return true;
              } else if (box11.textContent === "") {
                box11.innerHTML = "O";
                box11.parentNode.classList.remove('EmptyBox');
                box11.parentNode.classList.add('FilledBox');
                return true;
              } else {
                box21.innerHTML = "O";
                box21.parentNode.classList.remove('EmptyBox');
                box21.parentNode.classList.add('FilledBox');
                return true;
              }
            } else {
              var computerAlmostWinLastColumn = ((box02.textContent === "O" && box12.textContent === "O") || (box12.textContent === "O" && box22.textContent === "O") || (box02.textContent === "O" && box22.textContent === "O")) && (box02.textContent === "" || box12.textContent === "" || box22.textContent === "");
              if (computerAlmostWinLastColumn) {
                if (box02.textContent === "") {
                  box02.innerHTML = "O";
                  box02.parentNode.classList.remove('EmptyBox');
                  box02.parentNode.classList.add('FilledBox');
                  return true;
                } else if (box12.textContent === "") {
                  box12.innerHTML = "O";
                  box12.parentNode.classList.remove('EmptyBox');
                  box12.parentNode.classList.add('FilledBox');
                  return true;
                } else {
                  box22.innerHTML = "O";
                  box22.parentNode.classList.remove('EmptyBox');
                  box22.parentNode.classList.add('FilledBox');
                  return true;
                }
              } else {
                var computerAlmostWinCross = ((box00.textContent === "O" && box11.textContent === "O") || (box11.textContent === "O" && box22.textContent === "O") || (box00.textContent === "O" && box22.textContent === "O")) && (box00.textContent === "" || box11.textContent === "" || box22.textContent === "");
                if (computerAlmostWinCross) {
                  if (box00.textContent === "") {
                    box00.innerHTML = "O";
                    box00.parentNode.classList.remove('EmptyBox');
                    box00.parentNode.classList.add('FilledBox');
                    return true;
                  } else if (box11.textContent === "") {
                    box11.innerHTML = "O";
                    box11.parentNode.classList.remove('EmptyBox');
                    box11.parentNode.classList.add('FilledBox');
                    return true;
                  } else {
                    box22.innerHTML = "O";
                    box22.parentNode.classList.remove('EmptyBox');
                    box22.parentNode.classList.add('FilledBox');
                    return true;
                  }
                } else {
                  var computerAlmostWinInvertCross = ((box02.textContent === "O" && box11.textContent === "O") || (box11.textContent === "O" && box20.textContent === "O") || (box02.textContent === "O" && box20.textContent === "O")) && (box02.textContent === "" || box11.textContent === "" || box20.textContent === "");
                  if (computerAlmostWinInvertCross) {
                    if (box02.textContent === "") {
                      box02.innerHTML = "O";
                      box02.parentNode.classList.remove('EmptyBox');
                      box02.parentNode.classList.add('FilledBox');
                      return true;
                    } else if (box11.textContent === "") {
                      box11.innerHTML = "O";
                      box11.parentNode.classList.remove('EmptyBox');
                      box11.parentNode.classList.add('FilledBox');
                      return true;
                    } else {
                      box20.innerHTML = "O";
                      box20.parentNode.classList.remove('EmptyBox');
                      box20.parentNode.classList.add('FilledBox');
                      return true;
                    }
                  } else {
                    return false;
                  }
                }
              }
            }
          }
        }
      }
    }
  };

  humanAlmostWin(box00, box01, box02, box10, box11, box12, box20, box21, box22) {
    var humanAlmostWinFirstLine = ((box00.textContent === "X" && box01.textContent === "X") || (box01.textContent === "X" && box02.textContent === "X") || (box00.textContent === "X" && box02.textContent === "X")) && (box00.textContent === "" || box01.textContent === "" || box02.textContent === "");
    if (humanAlmostWinFirstLine) {
      if (box00.textContent === "") {
        box00.innerHTML = "O";
        box00.parentNode.classList.remove('EmptyBox');
        box00.parentNode.classList.add('FilledBox');
        return true;
      } else if (box01.textContent === "") {
        box01.innerHTML = "O";
        box01.parentNode.classList.remove('EmptyBox');
        box01.parentNode.classList.add('FilledBox');
        return true;
      } else {
        box02.innerHTML = "O";
        box02.parentNode.classList.remove('EmptyBox');
        box02.parentNode.classList.add('FilledBox');
        return true;
      }
    } else {
      var humanAlmostWinMiddleLine = ((box10.textContent === "X" && box11.textContent === "X") || (box11.textContent === "X" && box12.textContent === "X") || (box10.textContent === "X" && box12.textContent === "X")) && (box10.textContent === "" || box11.textContent === "" || box12.textContent === "");
      if (humanAlmostWinMiddleLine) {
        if (box10.textContent === "") {
          box10.innerHTML = "O";
          box10.parentNode.classList.remove('EmptyBox');
          box10.parentNode.classList.add('FilledBox');
          return true;
        } else if (box11.textContent === "") {
          box11.innerHTML = "O";
          box11.parentNode.classList.remove('EmptyBox');
          box11.parentNode.classList.add('FilledBox');
          return true;
        } else {
          box12.innerHTML = "O";
          box12.parentNode.classList.remove('EmptyBox');
          box12.parentNode.classList.add('FilledBox');
          return true;
        }
      } else {
        var humanAlmostWinLastLine = ((box20.textContent === "X" && box21.textContent === "X") || (box21.textContent === "X" && box22.textContent === "X") || (box20.textContent === "X" && box22.textContent === "X")) && (box20.textContent === "" || box21.textContent === "" || box22.textContent === "");
        if (humanAlmostWinLastLine) {
          if (box20.textContent === "") {
            box20.innerHTML = "O";
            box20.parentNode.classList.remove('EmptyBox');
            box20.parentNode.classList.add('FilledBox');
            return true;
          } else if (box21.textContent === "") {
            box21.innerHTML = "O";
            box21.parentNode.classList.remove('EmptyBox');
            box21.parentNode.classList.add('FilledBox');
            return true;
          } else {
            box22.innerHTML = "O";
            box22.parentNode.classList.remove('EmptyBox');
            box22.parentNode.classList.add('FilledBox');
            return true;
          }
        } else {
          var humanAlmostWinFirstColumn = ((box00.textContent === "X" && box10.textContent === "X") || (box10.textContent === "X" && box20.textContent === "X") || (box00.textContent === "X" && box20.textContent === "X")) && (box00.textContent === "" || box10.textContent === "" || box20.textContent === "");
          if (humanAlmostWinFirstColumn) {
            if (box00.textContent === "") {
              box00.innerHTML = "O";
              box00.parentNode.classList.remove('EmptyBox');
              box00.parentNode.classList.add('FilledBox');
              return true;
            } else if (box10.textContent === "") {
              box10.innerHTML = "O";
              box10.parentNode.classList.remove('EmptyBox');
              box10.parentNode.classList.add('FilledBox');
              return true;
            } else {
              box20.innerHTML = "O";
              box20.parentNode.classList.remove('EmptyBox');
              box20.parentNode.classList.add('FilledBox');
              return true;
            }
          } else {
            var humanAlmostWinMiddleColumn = ((box01.textContent === "X" && box11.textContent === "X") || (box11.textContent === "X" && box21.textContent === "X") || (box01.textContent === "X" && box21.textContent === "X")) && (box01.textContent === "" || box11.textContent === "" || box21.textContent === "");
            if (humanAlmostWinMiddleColumn) {
              if (box01.textContent === "") {
                box01.innerHTML = "O";
                box01.parentNode.classList.remove('EmptyBox');
                box01.parentNode.classList.add('FilledBox');
                return true;
              } else if (box11.textContent === "") {
                box11.innerHTML = "O";
                box11.parentNode.classList.remove('EmptyBox');
                box11.parentNode.classList.add('FilledBox');
                return true;
              } else {
                box21.innerHTML = "O";
                box21.parentNode.classList.remove('EmptyBox');
                box21.parentNode.classList.add('FilledBox');
                return true;
              }
            } else {
              var humanAlmostWinLastColumn = ((box02.textContent === "X" && box12.textContent === "X") || (box12.textContent === "X" && box22.textContent === "X") || (box02.textContent === "X" && box22.textContent === "X")) && (box02.textContent === "" || box12.textContent === "" || box22.textContent === "");
              if (humanAlmostWinLastColumn) {
                if (box02.textContent === "") {
                  box02.innerHTML = "O";
                  box02.parentNode.classList.remove('EmptyBox');
                  box02.parentNode.classList.add('FilledBox');
                  return true;
                } else if (box12.textContent === "") {
                  box12.innerHTML = "O";
                  box12.parentNode.classList.remove('EmptyBox');
                  box12.parentNode.classList.add('FilledBox');
                  return true;
                } else {
                  box22.innerHTML = "O";
                  box22.parentNode.classList.remove('EmptyBox');
                  box22.parentNode.classList.add('FilledBox');
                  return true;
                }
              } else {
                var humanAlmostWinCross = ((box00.textContent === "X" && box11.textContent === "X") || (box11.textContent === "X" && box22.textContent === "X") || (box00.textContent === "X" && box22.textContent === "X")) && (box00.textContent === "" || box11.textContent === "" || box22.textContent === "");
                if (humanAlmostWinCross) {
                  if (box00.textContent === "") {
                    box00.innerHTML = "O";
                    box00.parentNode.classList.remove('EmptyBox');
                    box00.parentNode.classList.add('FilledBox');
                    return true;
                  } else if (box11.textContent === "") {
                    box11.innerHTML = "O";
                    box11.parentNode.classList.remove('EmptyBox');
                    box11.parentNode.classList.add('FilledBox');
                    return true;
                  } else {
                    box22.innerHTML = "O";
                    box22.parentNode.classList.remove('EmptyBox');
                    box22.parentNode.classList.add('FilledBox');
                    return true;
                  }
                } else {
                  var humanAlmostWinInvertCross = ((box02.textContent === "X" && box11.textContent === "X") || (box11.textContent === "X" && box20.textContent === "X") || (box02.textContent === "X" && box20.textContent === "X")) && (box02.textContent === "" || box11.textContent === "" || box20.textContent === "");
                  if (humanAlmostWinInvertCross) {
                    if (box02.textContent === "") {
                      box02.innerHTML = "O";
                      box02.parentNode.classList.remove('EmptyBox');
                      box02.parentNode.classList.add('FilledBox');
                      return true;
                    } else if (box11.textContent === "") {
                      box11.innerHTML = "O";
                      box11.parentNode.classList.remove('EmptyBox');
                      box11.parentNode.classList.add('FilledBox');
                      return true;
                    } else {
                      box20.innerHTML = "O";
                      box20.parentNode.classList.remove('EmptyBox');
                      box20.parentNode.classList.add('FilledBox');
                      return true;
                    }
                  } else {
                    return false;
                  }
                }
              }
            }
          }
        }
      }
    }
  };

  playDefaultLogic(box00, box01, box02, box10, box11, box12, box20, box21, box22) {
    var firstLineEmpty = (box00.textContent === "" && box01.textContent === "" && box02.textContent === "");
    if (firstLineEmpty) {
      if (Math.random() < 0.5) {
        box00.innerHTML = "O";
        box00.parentNode.classList.remove('EmptyBox');
        box00.parentNode.classList.add('FilledBox');
      } else {
        box02.innerHTML = "O";
        box02.parentNode.classList.remove('EmptyBox');
        box02.parentNode.classList.add('FilledBox');
      }
    } else {
      var firstLineState = (box00.textContent === "O" || box01.textContent === "O" || box02.textContent === "O") && (box00.textContent !== "X" && box01.textContent !== "X" && box02.textContent !== "X");
      if (firstLineState) {
        if (box00.textContent === "") {
          box00.innerHTML = "O";
          box00.parentNode.classList.remove('EmptyBox');
          box00.parentNode.classList.add('FilledBox');
        } else if (box01.textContent === "") {
          box01.innerHTML = "O";
          box01.parentNode.classList.remove('EmptyBox');
          box01.parentNode.classList.add('FilledBox');
        } else {
          box02.innerHTML = "O";
          box02.parentNode.classList.remove('EmptyBox');
          box02.parentNode.classList.add('FilledBox');
        }
      } else {
        var lastLineEmpty = (box20.textContent === "" && box21.textContent === "" && box22.textContent === "");
        if (lastLineEmpty) {
          if (Math.random() < 0.5) {
            box20.innerHTML = "O";
            box20.parentNode.classList.remove('EmptyBox');
            box20.parentNode.classList.add('FilledBox');
          } else {
            box22.innerHTML = "O";
            box22.parentNode.classList.remove('EmptyBox');
            box22.parentNode.classList.add('FilledBox');
          }
        } else {
          var lastLineState = (box20.textContent === "O" || box21.textContent === "O" || box22.textContent === "O") && (box20.textContent !== "X" && box21.textContent !== "X" && box22.textContent !== "X");
          if (lastLineState) {
            if (box20.textContent === "") {
              box20.innerHTML = "O";
              box20.parentNode.classList.remove('EmptyBox');
              box20.parentNode.classList.add('FilledBox');
            } else if (box21.textContent === "") {
              box21.innerHTML = "O";
              box21.parentNode.classList.remove('EmptyBox');
              box21.parentNode.classList.add('FilledBox');
            } else {
              box22.innerHTML = "O";
              box22.parentNode.classList.remove('EmptyBox');
              box22.parentNode.classList.add('FilledBox');
            }
          } else {
            var firstColumnEmpty = (box00.textContent === "" && box10.textContent === "" && box20.textContent === "");
            if (firstColumnEmpty) {
              if (Math.random() < 0.5) {
                box00.innerHTML = "O";
                box00.parentNode.classList.remove('EmptyBox');
                box00.parentNode.classList.add('FilledBox');
              } else {
                box20.innerHTML = "O";
                box20.parentNode.classList.remove('EmptyBox');
                box20.parentNode.classList.add('FilledBox');
              }
            } else {
              var firstColumnState = (box00.textContent === "O" || box10.textContent === "O" || box20.textContent === "O") && (box00.textContent !== "X" && box10.textContent !== "X" && box20.textContent !== "X");
              if (firstColumnState) {
                if (box00.textContent === "") {
                  box00.innerHTML = "O";
                  box00.parentNode.classList.remove('EmptyBox');
                  box00.parentNode.classList.add('FilledBox');
                } else if (box10.textContent === "") {
                  box10.innerHTML = "O";
                  box10.parentNode.classList.remove('EmptyBox');
                  box10.parentNode.classList.add('FilledBox');
                } else {
                  box20.innerHTML = "O";
                  box20.parentNode.classList.remove('EmptyBox');
                  box20.parentNode.classList.add('FilledBox');
                }
              } else {
                var lastColumnEmpty = (box02.textContent === "" && box12.textContent === "" && box22.textContent === "");
                if (lastColumnEmpty) {
                  if (Math.random() < 0.5) {
                    box02.innerHTML = "O";
                    box02.parentNode.classList.remove('EmptyBox');
                    box02.parentNode.classList.add('FilledBox');
                  } else {
                    box22.innerHTML = "O";
                    box22.parentNode.classList.remove('EmptyBox');
                    box22.parentNode.classList.add('FilledBox');
                  }
                } else {
                  var lastColumnState = (box02.textContent === "O" || box12.textContent === "O" || box22.textContent === "O") && (box02.textContent !== "X" && box12.textContent !== "X" && box22.textContent !== "X");
                  if (lastColumnState) {
                    if (box02.textContent === "") {
                      box02.innerHTML = "O";
                      box02.parentNode.classList.remove('EmptyBox');
                      box02.parentNode.classList.add('FilledBox');
                    } else if (box12.textContent === "") {
                      box12.innerHTML = "O";
                      box12.parentNode.classList.remove('EmptyBox');
                      box12.parentNode.classList.add('FilledBox');
                    } else {
                      box22.innerHTML = "O";
                      box22.parentNode.classList.remove('EmptyBox');
                      box22.parentNode.classList.add('FilledBox');
                    }
                  } else {
                    var middleColumnEmpty = (box01.textContent === "" && box11.textContent === "" && box21.textContent === "");
                    if (middleColumnEmpty) {
                      box11.innerHTML = "O";
                      box11.parentNode.classList.remove('EmptyBox');
                      box11.parentNode.classList.add('FilledBox');
                    } else {
                      var middleColumnState = (box01.textContent === "O" || box11.textContent === "O" || box21.textContent === "O") && (box01.textContent !== "X" && box11.textContent !== "X" && box21.textContent !== "X");
                      if (middleColumnState) {
                        if (box01.textContent === "") {
                          box01.innerHTML = "O";
                          box01.parentNode.classList.remove('EmptyBox');
                          box01.parentNode.classList.add('FilledBox');
                        } else if (box11.textContent === "") {
                          box11.innerHTML = "O";
                          box11.parentNode.classList.remove('EmptyBox');
                          box11.parentNode.classList.add('FilledBox');
                        } else {
                          box21.innerHTML = "O";
                          box21.parentNode.classList.remove('EmptyBox');
                          box21.parentNode.classList.add('FilledBox');
                        }
                      } else {
                        var crossGridEmpty = (box00.textContent === "" && box11.textContent === "" && box22.textContent === "");
                        if (crossGridEmpty) {
                          box11.innerHTML = "O";
                          box11.parentNode.classList.remove('EmptyBox');
                          box11.parentNode.classList.add('FilledBox');
                        } else {
                          var crossGridState = (box00.textContent === "O" || box11.textContent === "O" || box22.textContent === "O") && (box00.textContent !== "X" && box11.textContent !== "X" && box22.textContent !== "X");
                          if (crossGridState) {
                            if (box00.textContent === "") {
                              box00.innerHTML = "O";
                              box00.parentNode.classList.remove('EmptyBox');
                              box00.parentNode.classList.add('FilledBox');
                            } else if (box11.textContent === "") {
                              box11.innerHTML = "O";
                              box11.parentNode.classList.remove('EmptyBox');
                              box11.parentNode.classList.add('FilledBox');
                            } else {
                              box22.innerHTML = "O";
                              box22.parentNode.classList.remove('EmptyBox');
                              box22.parentNode.classList.add('FilledBox');
                            }
                          } else {
                            var invertCrossGridEmpty = (box02.textContent === "" && box11.textContent === "" && box20.textContent === "");
                            if (invertCrossGridEmpty) {
                              box11.innerHTML = "O";
                              box11.parentNode.classList.remove('EmptyBox');
                              box11.parentNode.classList.add('FilledBox');
                            } else {
                              var invertCrossGridState = (box02.textContent === "O" || box11.textContent === "O" || box20.textContent === "O") && (box02.textContent !== "X" && box11.textContent !== "X" && box20.textContent !== "X");
                              if (invertCrossGridState) {
                                if (box02.textContent === "") {
                                  box02.innerHTML = "O";
                                  box02.parentNode.classList.remove('EmptyBox');
                                  box02.parentNode.classList.add('FilledBox');
                                } else if (box11.textContent === "") {
                                  box11.innerHTML = "O";
                                  box11.parentNode.classList.remove('EmptyBox');
                                  box11.parentNode.classList.add('FilledBox');
                                } else {
                                  box20.innerHTML = "O";
                                  box20.parentNode.classList.remove('EmptyBox');
                                  box20.parentNode.classList.add('FilledBox');
                                }
                              } else {
                                var middleLineEmpty = (box10.textContent === "" && box11.textContent === "" && box12.textContent === "");
                                if (middleLineEmpty) {
                                  box11.innerHTML = "O";
                                  box11.parentNode.classList.remove('EmptyBox');
                                  box11.parentNode.classList.add('FilledBox');
                                } else {
                                  var midlleLineState = (box10.textContent === "O" || box11.textContent === "O" || box12.textContent === "O") && (box10.textContent !== "X" && box11.textContent !== "X" && box12.textContent !== "X");
                                  if (midlleLineState) {
                                    if (box10.textContent === "") {
                                      box10.innerHTML = "O";
                                      box10.parentNode.classList.remove('EmptyBox');
                                      box10.parentNode.classList.add('FilledBox');
                                    } else if (box11.textContent === "") {
                                      box11.innerHTML = "O";
                                      box11.parentNode.classList.remove('EmptyBox');
                                      box11.parentNode.classList.add('FilledBox');
                                    } else {
                                      box12.innerHTML = "O";
                                      box12.parentNode.classList.remove('EmptyBox');
                                      box12.parentNode.classList.add('FilledBox');
                                    }
                                  } else {
                                    if (box00.textContent === "") {
                                      box00.innerHTML = "O";
                                      box00.parentNode.classList.remove('EmptyBox');
                                      box00.parentNode.classList.add('FilledBox');
                                    } else if (box01.textContent === "") {
                                      box01.innerHTML = "O";
                                      box01.parentNode.classList.remove('EmptyBox');
                                      box01.parentNode.classList.add('FilledBox');
                                    } else if (box02.textContent === "") {
                                      box02.innerHTML = "O";
                                      box02.parentNode.classList.remove('EmptyBox');
                                      box02.parentNode.classList.add('FilledBox');
                                    } else if (box10.textContent === "") {
                                      box10.innerHTML = "O";
                                      box10.parentNode.classList.remove('EmptyBox');
                                      box10.parentNode.classList.add('FilledBox');
                                    } else if (box11.textContent === "") {
                                      box11.innerHTML = "O";
                                      box11.parentNode.classList.remove('EmptyBox');
                                      box11.parentNode.classList.add('FilledBox');
                                    } else if (box12.textContent === "") {
                                      box12.innerHTML = "O";
                                      box12.parentNode.classList.remove('EmptyBox');
                                      box12.parentNode.classList.add('FilledBox');
                                    } else if (box20.textContent === "") {
                                      box20.innerHTML = "O";
                                      box20.parentNode.classList.remove('EmptyBox');
                                      box20.parentNode.classList.add('FilledBox');
                                    } else if (box21.textContent === "") {
                                      box21.innerHTML = "O";
                                      box21.parentNode.classList.remove('EmptyBox');
                                      box21.parentNode.classList.add('FilledBox');
                                    } else if (box22.textContent === "") {
                                      box22.innerHTML = "O";
                                      box22.parentNode.classList.remove('EmptyBox');
                                      box22.parentNode.classList.add('FilledBox');
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }

                    }
                  }
                }
              }
            }
          }
        }

      }
    }
  };

  checkIfSomeoneWins() {
    var valueBox00 = document.getElementById('box00').textContent;
    var valueBox01 = document.getElementById('box01').textContent;
    var valueBox02 = document.getElementById('box02').textContent;
    var valueBox10 = document.getElementById('box10').textContent;
    var valueBox11 = document.getElementById('box11').textContent;
    var valueBox12 = document.getElementById('box12').textContent;
    var valueBox20 = document.getElementById('box20').textContent;
    var valueBox21 = document.getElementById('box21').textContent;
    var valueBox22 = document.getElementById('box22').textContent;
    if ("" !== valueBox00 && valueBox00 === valueBox01 && valueBox00 === valueBox02) {
      return valueBox00;
    } else if ("" !== valueBox10 && valueBox10 === valueBox11 && valueBox10 === valueBox12) {
      return valueBox10;
    } else if ("" !== valueBox20 && valueBox20 === valueBox21 && valueBox20 === valueBox22) {
      return valueBox20;
    } else if ("" !== valueBox00 && valueBox00 === valueBox10 && valueBox00 === valueBox20) {
      return valueBox00;
    } else if ("" !== valueBox01 && valueBox01 === valueBox11 && valueBox01 === valueBox21) {
      return valueBox01;
    } else if ("" !== valueBox02 && valueBox02 === valueBox12 && valueBox02 === valueBox22) {
      return valueBox02;
    } else if ("" !== valueBox00 && valueBox00 === valueBox11 && valueBox00 === valueBox22) {
      return valueBox00;
    } else if ("" !== valueBox20 && valueBox20 === valueBox11 && valueBox20 === valueBox02) {
      return valueBox20;
    } else {
      return false;
    }
  };

  checkIfGameIsOver() {
    var valueBox00 = document.getElementById('box00').textContent;
    var valueBox01 = document.getElementById('box01').textContent;
    var valueBox02 = document.getElementById('box02').textContent;
    var valueBox10 = document.getElementById('box10').textContent;
    var valueBox11 = document.getElementById('box11').textContent;
    var valueBox12 = document.getElementById('box12').textContent;
    var valueBox20 = document.getElementById('box20').textContent;
    var valueBox21 = document.getElementById('box21').textContent;
    var valueBox22 = document.getElementById('box22').textContent;
    if (valueBox00 !== '' && valueBox01 !== '' && valueBox02 !== '' && valueBox10 !== '' && valueBox11 !== '' && valueBox12 !== '' && valueBox20 !== '' && valueBox21 !== '' && valueBox22 !== '') {
      return true;
    } else {
      return false;
    }
  };

  render() {
    return (
      <div className="App">
        <h1>Jeu du morpion</h1>
        <p className="ButtonStartNewGame" onClick={this.startNewGame}>Recommencer une nouvelle partie</p>
        <div id="fireworks_container"></div>
        <div id="game_message_container"></div>
        <div className="GridContainer">
          <div id="loader" className="invisible">
            <Loader
              type="Circles"
              color="#00BFFF"
              height={50}
              width={50}
            />
          </div>
          <div className="GridGame">
            <GridBox id_box="box00" boxClicked={() => this.boxSelected('box00')} />
            <GridBox id_box="box01" boxClicked={() => this.boxSelected('box01')} />
            <GridBox id_box="box02" boxClicked={() => this.boxSelected('box02')} />
            <GridBox id_box="box10" boxClicked={() => this.boxSelected('box10')} />
            <GridBox id_box="box11" boxClicked={() => this.boxSelected('box11')} />
            <GridBox id_box="box12" boxClicked={() => this.boxSelected('box12')} />
            <GridBox id_box="box20" boxClicked={() => this.boxSelected('box20')} />
            <GridBox id_box="box21" boxClicked={() => this.boxSelected('box21')} />
            <GridBox id_box="box22" boxClicked={() => this.boxSelected('box22')} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
