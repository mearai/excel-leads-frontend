"use client";
import { useRef } from "react";
import { makeStore, store } from "./store";
import { Provider } from "react-redux";

export function StoreProvider({ children }) {
  const storeRef = useRef();
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
  }
  return <Provider store={storeRef.current}>{children}</Provider>;
}
