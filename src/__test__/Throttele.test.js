import { renderHook, act } from "@testing-library/react";
import useThrottle from "../components/Throttle";

jest.useFakeTimers();

describe("useThrottle Hook", () => {
  test("should throttle multiple quick calls to a single call", () => {
    const mockFn = jest.fn();
    const { result } = renderHook(() => useThrottle(mockFn, 500));

    act(() => {
      result.current("A");
      result.current("B");
      result.current("C");
    });

    expect(mockFn).toHaveBeenCalledTimes(1); // "A"

    act(() => {
      jest.advanceTimersByTime(500);
      jest.runOnlyPendingTimers();
    });

    expect(mockFn).toHaveBeenCalledTimes(2); // "C"
    expect(mockFn).toHaveBeenLastCalledWith("C");
  });
});
