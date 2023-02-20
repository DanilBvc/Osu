const songListItemClickHandler = (event: React.MouseEvent) => {
  const songListItem = event.currentTarget.closest('.song-list-item');

  if (songListItem instanceof HTMLElement) {
    if (songListItem.classList.contains('selected-item')) {
      new Audio('/sounds/selectMapPage/start.m4a').play();
    } else {
      songListItem.classList.add('selected-item');
      new Audio('/sounds/selectMapPage/select.m4a').play();
    }
  }
};

export default songListItemClickHandler;
