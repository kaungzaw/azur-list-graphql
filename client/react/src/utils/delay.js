import * as React from "react";

export const delayPromise = (promise, delay = 1000) => {
  return Promise.all([
    promise,
    new Promise((resolve) => setTimeout(resolve, delay)),
  ]).then(([result]) => result);
};

export const delayLazy = (promise, delay = 1000) => {
  return React.lazy(() =>
    Promise.all([
      promise,
      new Promise((resolve) => setTimeout(resolve, delay)),
    ]).then(([module]) => module)
  );
};
