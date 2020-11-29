import { renderHook, act } from '@testing-library/react-hooks';
import useAutomaton from './use-automaton';

const STATES = {
  'state-1': {
    on: {
      'token-a': 'state-2',
    },
  },
  'state-2': {
    on: {
      'token-b': 'state-1',
      'token-c': 'dead-end',
    },
  },
};

describe('useAutomaton', () => {
  it('handles automaton correctly', () => {
    const initialCurrent = 'state-1';

    const { result } = renderHook(() => useAutomaton(STATES, initialCurrent));

    expect(result.current.current).toBe(initialCurrent);

    // transitions when the given token is expected for a transition from the current state .
    act(() => {
      result.current.transition('token-a');
    });

    expect(result.current.current).toBe('state-2');

    // transitions when the given token is expected for a transition from the current state .
    act(() => {
      result.current.transition('token-b');
      result.current.transition('token-a');
    });

    expect(result.current.current).toBe('state-2');

    // transitions to dead-end, where there´s no way to get out from.
    act(() => {
      result.current.transition('token-c');
    });

    expect(result.current.current).toBe('dead-end');

    act(() => {
      result.current.transition('token-a');
    });

    expect(result.current.current).toBe('dead-end');

    act(() => {
      result.current.transition('token-b');
    });

    expect(result.current.current).toBe('dead-end');

    act(() => {
      result.current.transition('token-c');
    });

    expect(result.current.current).toBe('dead-end');
  });

  it('throws an error when `states` parameter is not provided', () => {
    expect(() => useAutomaton()).toThrowError('I think you forgot to provide the states for your automaton');
  });

  it('throws an error when `initialCurrent` parameter is not provided', () => {
    expect(() => useAutomaton(STATES)).toThrowError('hmm, I think you forgot the initial state, huh?!');
  });
});
