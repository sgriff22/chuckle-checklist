export const postNewJoke = (newJokeText) => {
  const newJokeState = { text: newJokeText, told: false };

  //define POST options for fetch
  const postOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newJokeState),
  };

  //Send new joke state to api
  fetch("http://localhost:8088/jokes", postOptions);
};

export const getAllJokes = () => {
  return fetch("http://localhost:8088/jokes").then((res) => res.json());
};

export const updateJoke = (jokeObject) => {
  const id = jokeObject.id;

  const putOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(jokeObject),
  };

  return fetch(`http://localhost:8088/jokes/${id}`, putOptions);
};

export const deleteJoke = (jokeObject) => {
  const id = jokeObject.id;

  const deleteOptions = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  };

  return fetch(`http://localhost:8088/jokes/${id}`, deleteOptions);
};
