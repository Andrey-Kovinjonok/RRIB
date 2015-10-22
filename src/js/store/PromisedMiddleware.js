
export default store => next => action => {
  if (!action.promise) {
    const actionResult = next(action);
    if (action.postPromise) {
      action.postPromise(store.getState())
      .then(
        (res) => console.log(res),
        (err) => console.log(err)
      );
    }
    return actionResult;
  }

  // else
  const { promise, onSuccess, onFail } = action;

  return promise.then(
    (result) => {
      const data = onSuccess(result);
      return next({
        ...action,
        ...data
      });
    },
    onFail || () => {}
  );
};
