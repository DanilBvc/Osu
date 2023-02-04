const songListMousLeaveHandler = (
  event: React.MouseEvent,
  clickedSongListItemID: string
) => {
  const songListItem = event.currentTarget.closest('.song-list-item');
  if (songListItem instanceof HTMLElement) {
    const songListItemID = String(songListItem.getAttribute('data-id'));

    if (songListItemID !== clickedSongListItemID) {
      songListItem.classList.remove('active-item');
    }
    songListItem.classList.remove('stick-selected-item');
  }
};

export default songListMousLeaveHandler;
