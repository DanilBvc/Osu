const songListMousLeaveHandler = (
  event: React.MouseEvent,
  clickedSongListItemID: string,
  selectedDifficultySongIndex: number
) => {
  const songListItem = event.currentTarget.closest('.song-list-item');

  if (songListItem instanceof HTMLElement) {
    const songListItemID = String(songListItem.getAttribute('data-id'));
    const songDifficultyIndex = Number(songListItem.getAttribute('data-difficulty-index'));

    if (
      songListItemID !== clickedSongListItemID
      || selectedDifficultySongIndex !== songDifficultyIndex
    ) {
      songListItem.classList.remove('active-item');
    }
    songListItem.classList.remove('stick-selected-item');
  }
};

export default songListMousLeaveHandler;
