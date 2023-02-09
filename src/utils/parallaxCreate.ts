const parallaxCreate = (event: MouseEvent, background: HTMLDivElement | null) => {
  const backgroundElement = background;
  const x = event.clientX / window.innerWidth;
  const y = event.clientY / window.innerHeight;

  if (backgroundElement !== null) {
    backgroundElement.style.transform = `translate(-${x * 15}px, -${y * 15}px)`;
  }
};

export default parallaxCreate;
