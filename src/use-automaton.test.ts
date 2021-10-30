import { renderHook, act } from "@testing-library/react-hooks";
import useAutomaton from "./use-automaton";

describe("useAutomaton", () => {
  const initialCurrent = "state-1";

  const { result } = renderHook(() =>
    useAutomaton(
      {
        "state-1": {
          on: {
            "token-a": "state-2",
          },
        },
        "state-2": {
          on: {
            "token-b": "state-1",
            "token-c": "dead-end",
          },
        },
        "dead-end": {},
      },
      initialCurrent
    )
  );

  it("handles automaton correctly", () => {
    expect(result.current.current).toBe(initialCurrent);

    // transitions when the given token is expected for a transition from the current state .
    act(() => {
      result.current.transition("token-a");
    });

    expect(result.current.current).toBe("state-2");

    // transitions when the given token is expected for a transition from the current state .
    act(() => {
      result.current.transition("token-b");
      result.current.transition("token-a");
    });

    expect(result.current.current).toBe("state-2");

    // transitions to dead-end, where there´s no way to get out from.
    act(() => {
      result.current.transition("token-c");
    });

    expect(result.current.current).toBe("dead-end");

    act(() => {
      result.current.transition("token-a");
    });

    expect(result.current.current).toBe("dead-end");

    act(() => {
      result.current.transition("token-b");
    });

    expect(result.current.current).toBe("dead-end");

    act(() => {
      result.current.transition("token-c");
    });

    expect(result.current.current).toBe("dead-end");
  });
});
