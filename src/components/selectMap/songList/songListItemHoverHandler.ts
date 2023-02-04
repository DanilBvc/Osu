const songListItemHoverHandler = (event: React.MouseEvent) => {
  const songListItem = event.currentTarget.closest('.song-list-item');

  if (songListItem instanceof HTMLElement) {
    songListItem.classList.add('active-item');
    if (songListItem.classList.contains('selected-item')) {
      songListItem.classList.add('stick-selected-item');
    }
    new Audio('/sounds/selectMapPage/hover.mp3').play();
  }
};

export default songListItemHoverHandler;
