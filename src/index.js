import React from 'react';

const DEFAULT = {
  OBJECT: {},
};

function getReducer(states) {
  return function reducer(current, input) {
    const { on } = states[current] ?? DEFAULT.OBJECT;

    if (on == null) {
      console.error(`${current} does not have any transition for ${input}.`);
    }

    // we keep in the current as fallback
    const newCurrent = on?.[input] || current;

    console.debug('[use-automaton]', 'transition', current, `→ (${input}) →`, 'to', on?.[input]);

    return newCurrent;
  };
}

function useAutomaton(states, initialCurrent) {
  const [current, dispatch] = React.useReducer(
    getReducer(states || DEFAULT.OBJECT),
    initialCurrent
  );

  return {
    current,
    transition: dispatch,
  };
}

export { useAutomaton };
