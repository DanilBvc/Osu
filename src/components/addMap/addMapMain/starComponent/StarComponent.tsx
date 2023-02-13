import React from 'react';

interface IProps {
  star: number;
}

function StarComponent({ star }: IProps) {
  return (
    <>
      {star >= 0 && star <= 1 ? <div className="difficult Beginner"></div> : null}
      {star > 1 && star <= 2.4 ? <div className="difficult Normal "></div> : null}
      {star > 2.4 && star <= 3.8 ? <div className="difficult Hard "></div> : null}
      {star > 3.8 && star <= 4.5 ? <div className="difficult Insane "></div> : null}
      {star > 4.5 && star <= 5.5 ? <div className="difficult DDInsane"></div> : null}
      {star > 5.5 && star <= 6 ? <div className="difficult Expert "></div> : null}
      {star > 6 ? <div className="difficult Extra "></div> : null}
    </>
  );
}

export default StarComponent;
