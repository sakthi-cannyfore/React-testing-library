import { renderHook, act } from "@testing-library/react";
import { jest } from "@jest/globals";
import Debounce from "../components/Debounce";

describe("Debounce custom hook", () => {
  jest.useFakeTimers();

  test("should call function after delay", () => {
    const mockFn = jest.fn();
    const { result } = renderHook(() => Debounce(mockFn, 500));

    // Call the debounced function
    act(() => {
      result.current("Hello");
    });

    //mockFn not called immediately
    expect(mockFn).not.toHaveBeenCalled();

    // Fast-forward time
    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(mockFn).toHaveBeenCalledWith("Hello");
  });

  test("should only call last invocation if multiple rapid triggers happen", () => {
    const mockFn = jest.fn();
    const { result } = renderHook(() => Debounce(mockFn, 600));

    act(() => {
      result.current("A");
      result.current("B");
      result.current("C"); // the last call
    });

    expect(mockFn).not.toHaveBeenCalled(); // still pending

    act(() => {
      jest.advanceTimersByTime(600);
    });

    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(mockFn).toHaveBeenCalledWith("C");
  });

  test("clear timeout on unmount", () => {
    const mockFn = jest.fn();
    const { result, unmount } = renderHook(() => Debounce(mockFn, 400));

    act(() => {
      result.current("Test");
    });

    unmount();

    act(() => {
      jest.advanceTimersByTime(400);
    });

    expect(mockFn).not.toHaveBeenCalled(); // should not run after unmount
  });
});
