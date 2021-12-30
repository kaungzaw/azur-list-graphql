const delayPromise = (promise, delay = 1000) => {
  return Promise.all([
    promise,
    new Promise((resolve) => setTimeout(resolve, delay)),
  ]).then(([result]) => result);
};

module.exports = {
  delayPromise,
};
