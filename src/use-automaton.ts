import React from "react";

type AutomatonStateTransition<T> = {
  [key: string]: keyof T;
};

type AutomatonState<T> = keyof T;

export type AutomatonStates<T> = {
  [key in AutomatonState<T>]: {
    on?: AutomatonStateTransition<T>;
  };
};

function getReducer<T>(states: AutomatonStates<T>) {
  return function reducer(current: AutomatonState<T>, token: string): AutomatonState<T> {
    const { on } = states[current] || {};

    if (on == null) {
      console.error(`${current} does not have any transition for ${token}.`);
      return current;
    }

    // we keep in the current as fallback
    const newCurrent = on[token] == null ? current : on[token];

    console.debug("[use-automaton]", "transition", current, `→ (${token}) →`, "to", on[token]);

    return newCurrent;
  };
}

/**
 * useAutomaton hook.
 * @template {AutomatonStates} T
 * @param {T} states  - Object representing automaton states ans its transitions.
 * @param {keyof T} initialCurrent - State from where to start automaton.
 */
function useAutomaton<T>(states: AutomatonStates<T>, initialCurrent: AutomatonState<T>) {
  const [current, dispatch] = React.useReducer(getReducer<T>(states), initialCurrent);

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
