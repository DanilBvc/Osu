/* eslint-disable consistent-return */
import React, { useEffect, useState } from 'react';
import { incrementMapBlock, maxMapBlocks } from '../constants/constants';

const useInfiniteScroll = (): number => {
  const [loading, SetLoading] = useState(false);
  const [count, SetCount] = useState(incrementMapBlock);
  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop + 1
      < document.documentElement.scrollHeight || loading) {
      return false;
    }
    SetLoading(true);
  };
  useEffect(() => {
    if (!loading) {
      return;
    }
    if (count + incrementMapBlock >= maxMapBlocks) {
      SetCount(maxMapBlocks);
    } else {
      SetCount(count + incrementMapBlock);
    }
    SetLoading(false);
  }, [loading]);
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return count;
};
export default useInfiniteScroll;
