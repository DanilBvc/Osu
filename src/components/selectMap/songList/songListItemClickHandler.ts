const songListItemClickHandler = (
  event: React.MouseEvent,
  setClickedSongListItemID: React.Dispatch<React.SetStateAction<string>>
) => {
  const songListItem = event.currentTarget.closest('.song-list-item');

  if (songListItem instanceof HTMLElement) {
    setClickedSongListItemID(String(songListItem.getAttribute('data-id')));
    if (songListItem.classList.contains('selected-item')) {
      new Audio('/sounds/selectMapPage/start.mp3').play();
    } else {
      songListItem.classList.add('selected-item');
      new Audio('/sounds/selectMapPage/select.mp3').play();
    }
  }
};

export default songListItemClickHandler;
