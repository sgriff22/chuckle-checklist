import { useEffect, useState } from "react";
import "./App.css";
import {
  deleteJoke,
  getAllJokes,
  postNewJoke,
  updateJoke,
} from "./services/jokeService";
import stevePic from "./assets/steve.png";

export const App = () => {
  const [userInput, setUserInput] = useState("");
  const [allJokes, setAllJokes] = useState([]);
  const [untoldJokes, setUntoldJokes] = useState([]);
  const [toldJokes, setToldJokes] = useState([]);
  const [untoldCount, setUntoldCount] = useState(0);
  const [toldCount, setToldCount] = useState(0);

  //Function to get all jokes
  const getJokes = () => {
    getAllJokes().then((jokesArray) => {
      setAllJokes(jokesArray);
    });
  };

  //Get all jokes on initial render
  useEffect(() => {
    getJokes();
  }, []);

  //use effect to filter untold and told jokes
  useEffect(() => {
    const filterUntoldJokes = allJokes.filter((joke) => joke.told === false);
    setUntoldJokes(filterUntoldJokes);

    const filterToldJokes = allJokes.filter((joke) => joke.told === true);
    setToldJokes(filterToldJokes);
  }, [allJokes]);

  //use effect for count
  useEffect(() => {
    setUntoldCount(untoldJokes.length);
  }, [untoldJokes]);

  //use effect for told count
  useEffect(() => {
    setToldCount(toldJokes.length);
  }, [toldJokes]);

  //Define a  function that will process the click of the add button
  const handleAddBtnClick = () => {
    postNewJoke(userInput);
    setUserInput("");
    getJokes();
  };

  //Define a function that will process the click of toggle button
  const handleToggleBtnClick = (joke) => {
    const editedJoke = {
      id: joke.id,
      text: joke.text,
      told: !joke.told,
    };
    if (joke.told === true) {
      updateJoke(editedJoke);
    } else {
      updateJoke(editedJoke);
    }
    getJokes();
  };

  //define a function that will handle the delete button
  const handleDeleteBtnClick = (joke) => {
    deleteJoke(joke);
    getJokes();
  };

  return (
    <div className="app-container">
      <div className="app-heading">
        <div className="app-heading-circle">
          <img className="app-logo" src={stevePic} alt="Good job Steve" />
        </div>
        <h1 className="app-heading-text">Chuckle Checklist</h1>
      </div>
      <h2>Add Joke</h2>
      <div className="joke-add-form">
        <input
          className="joke-input"
          id="jokeInput"
          type="text"
          value={userInput}
          placeholder="New One Liner"
          onChange={(event) => {
            setUserInput(event.target.value);
          }}
        />
        <button className="joke-input-submit" onClick={handleAddBtnClick}>
          Add
        </button>
      </div>

      <div className="joke-lists-container">
        <div className="joke-list-container">
          <h2>
            UnTold<span className="untold-count">{untoldCount}</span>
          </h2>
          <ul>
            {untoldJokes.map((joke) => {
              return (
                <li className="joke-list-item" key={joke.id}>
                  <p className="joke-list-item-text">{joke.text}</p>
                  <div>
                    <button
                      className="joke-list-action-toggle"
                      onClick={() => handleToggleBtnClick(joke)}
                    >
                      <i className="fa-solid fa-face-grin-squint-tears"></i>
                    </button>
                  </div>

                  <div>
                    <button
                      className="joke-list-action-delete"
                      onClick={() => handleDeleteBtnClick(joke)}
                    >
                      <i className="fa-regular fa-trash-can"></i>
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="joke-list-container">
          <h2>
            Told<span className="told-count">{toldCount}</span>
          </h2>
          <ul>
            {toldJokes.map((joke) => {
              return (
                <li className="joke-list-item" key={joke.id}>
                  <p className="joke-list-item-text">{joke.text}</p>
                  <div>
                    <button
                      className="joke-list-action-toggle"
                      onClick={() => handleToggleBtnClick(joke)}
                    >
                      <i className="fa-solid fa-face-grin-squint-tears"></i>
                    </button>
                  </div>

                  <div>
                    <button
                      className="joke-list-action-delete"
                      onClick={() => handleDeleteBtnClick(joke)}
                    >
                      <i className="fa-regular fa-trash-can"></i>
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};
