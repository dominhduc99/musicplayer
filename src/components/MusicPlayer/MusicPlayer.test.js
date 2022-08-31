import { render } from '@testing-library/react';
import HeartIcon from '../icons/HeartIcon';
import RepeatIcon from '../icons/RepeatIcon';
import SkipBackIcon from '../icons/SkipBackIcon';
import SkipNextIcon from '../icons/SkipNextIcon';

test('should render heart icon', () => {
  render(<HeartIcon />);
});

test('should render repeat icon', () => {
  render(<RepeatIcon />);
});

test('should render back icon', () => {
  render(<SkipBackIcon />);
});

test('should render next icon', () => {
  render(<SkipNextIcon />);
});
