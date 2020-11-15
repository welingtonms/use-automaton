# @cheesebit/use-automaton

React hook that implements the basic mechanism of an automaton. It can be used to implement a more generic reducer-like logic.

Whenever you have a number of states whose transition from one to another are based on specific tokens, just like our know friend [automaton](https://en.wikipedia.org/wiki/Automaton), that's where this hook comes in handy.

## Instalation

You can add this hook as a dependency by running `npm install @cheesebit/use-automaton` or `yarn add @cheesebit/use-automaton`.

## Props

### - `states`

This object will represent the states of your automaton, allong with its transitions.

Your `states` prop, should look something like this.

```js
const states = {
  // 'state-1' is the state identifier
  'state-1': {
    // here we defined the transitions we allow for this step
    on: {
      // when transition receives 'some-token', automaton will transition to 'state-2'
      'some-token': 'state-2',
    },
  },
  // you can have as many states you wish
};
```

Important to notice here that you can use token to send the automaton to a dead-end state (where there is no transition from) if you want it to remain like that; once at this state, there is no way to get out of it.

### - `initialCurrent`

Initial state from where we will start this automaton.

## Usage guide

```jsx
export default function App() {
  const states = {
    'state-1': {
      on: {
        'token-a': 'state-2',
        'token-b': 'state-3',
      },
    },
    'state-2': {
      on: {
        'token-c': 'state-3',
      },
    },
    'state-3': {
      on: {
        'token-d': 'state-1',
        'token-e': 'dead-end',
      },
    },
  };
  const { transition, current } = useAutomaton(states, 'state-1');
  const [token, setToken] = React.useState('');

  return (
    <div className="App">
      <h1>useAutomaton</h1>
      <div className="flex flex-col justify-start p-4">
        <p className="mt-2">
          Current: <code>{current}</code>
        </p>
        <label className="flex flex-row items-center">
          Type the transition token
          <input
            type="text"
            className="mx-2 border px-4 py-2"
            value={token}
            onChange={e => {
              const {
                target: { value },
              } = e;

              setToken(value);
            }}
          />
          <button
            type="button"
            className="bg-blue-500 px-4 py-2 text-white"
            onClick={() => {
              transition(token);
              setToken('');
            }}
          >
            Transition
          </button>
        </label>
      </div>
    </div>
  );
}
```
