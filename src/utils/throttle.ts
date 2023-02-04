function throttle(
  func: () => void,
  throttleStatus: React.MutableRefObject<boolean>,
  limit: number
) {
  const throttleInProgress = throttleStatus;

  if (throttleInProgress.current) {
    return;
  }
  throttleInProgress.current = true;
  setTimeout(() => {
    throttleInProgress.current = false;
    func();
  }, limit);
}

export default throttle;
