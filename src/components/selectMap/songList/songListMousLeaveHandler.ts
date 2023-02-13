const songListMousLeaveHandler = (
  event: React.MouseEvent,
  clickedSongListItemID: string,
  selectedSongDifficulty: string
) => {
  const songListItem = event.currentTarget.closest('.song-list-item');

  if (songListItem instanceof HTMLElement) {
    const songListItemID = String(songListItem.getAttribute('data-id'));
    const songListItemDiffuculty = String(songListItem.getAttribute('data-difficulty'));

    if (
      songListItemID !== clickedSongListItemID
      || selectedSongDifficulty !== songListItemDiffuculty
    ) {
      songListItem.classList.remove('active-item');
    }
    songListItem.classList.remove('stick-selected-item');
  }
};

export default songListMousLeaveHandler;
