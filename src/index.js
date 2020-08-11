import React, { useState, useReducer, useEffect } from "react";
import ReactDOM from "react-dom";

import App from "./App";

var preguntasState = [
  {
    pregunta: "What's the MCC of GERD",
    opciones: [
      ["A", "No"],
      ["B", "Si"]
    ],
    respuesta: "NSAID's",
    id: 666,
    respondida: false
  },

  {
    pregunta: "Que es chigui?",
    opciones: [
      ["C", "No"],
      ["D", "Si"]
    ],
    respuesta: "Mono",
    id: 777,
    respondida: false
  }
];

function reducer(state, action) {
  switch (action.type) {
    case "responder":
      return state.map((item) => {
        if (action.payload.id === item.id) {
          var { pregunta, opciones, respuesta, id } = item;

          return {
            pregunta,
            opciones,
            respuesta,
            id,
            respondida: true
          };
        }

        return item;
      });

    case "prev":
      return { count: state.count - 1 };

    default:
      throw state;
  }
}

const Componente = () => {
  // const initialState =

  const [state, dispatch] = useReducer(reducer, preguntasState);
  const [count, changeC] = useState(0);

  // useEffect(() => {
  //   window.localStorage.setItem("state", state);
  // }, [state]);

  function responder(count) {
    dispatch({
      type: "responder",
      payload: { id: state[count].id }
    });
  }

  return (
    <div>
      <p>{state[count].pregunta}</p>
      <button onClick={() => responder(count)}> Responder </button>

      {state[count].respondida === true ? (
        <p>{state[count].respuesta}</p>
      ) : (
        <></>
      )}
      <div>
        {" "}
        <button onClick={() => changeC((prevC) => prevC + 1)}>
          {" "}
          Siguiente{" "}
        </button>
      </div>
      <div>
        {" "}
        <button onClick={() => changeC((prevC) => prevC - 1)}>
          {" "}
          Anterior{" "}
        </button>
      </div>
    </div>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <App />
    <Componente />
  </React.StrictMode>,
  rootElement
);

//Persisting state on react... No libraries!
//https://egghead.io/lessons/react-store-values-in-localstorage-with-the-react-useeffect-hook
