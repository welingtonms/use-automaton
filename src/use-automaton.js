import React from 'react';

const DEFAULT = {
  OBJECT: {},
};

const mandatory = (message = 'required') => {
  throw new Error(message);
};

function getReducer(states) {
  return function reducer(current, token) {
    const { on } = states[current] == null ? DEFAULT.OBJECT : states[current];

    if (on == null) {
      // current transition does not have a transition for the provided token
      return current;
    }

    // we keep in the current as fallback
    const newCurrent = on[token] == null ? current : on[token];

    console.debug('[use-automaton]', 'transition', current, `→ (${token}) →`, 'to', on[token]);

    return newCurrent;
  };
}

/**
 * useAutomaton hook.
 * @param {*} states  - Object representing automaton states ans its transitions.
 * @param {(string|number)} initialCurrent - State from where to start automaton.
 */
function useAutomaton(
  states = mandatory('I think you forgot to provide the states for your automaton'),
  initialCurrent = mandatory('hmm, I think you forgot the initial state, huh?!')
) {
  const [current, dispatch] = React.useReducer(
    getReducer(states || DEFAULT.OBJECT),
    initialCurrent
  );

  /**
   * Transition function.
   * @param {(string | number)} token - Token to run transition with.
   */
  function transition(token) {
    dispatch(token);
  }

  return {
    current,
    transition,
  };
}

export default useAutomaton;
