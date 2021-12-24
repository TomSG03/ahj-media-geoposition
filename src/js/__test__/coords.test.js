import Gui from '../gui';

const winModal = new Gui();

test.each([
  ['51.50851, −0.12572', { latitude: '51.50851', longitude: '−0.12572' }],
  ['51.50851,−0.12572', { latitude: '51.50851', longitude: '−0.12572' }],
  ['[51.50851, −0.12572]', { latitude: '51.50851', longitude: '−0.12572' }],
  ['51.50851, text', false],
  [',0.12572', false],
  ['0.12572', false],
  ['51.50851 0.12572', false],
])(('Coords test'), (value, expected) => {
  expect(winModal.checkValidCoords(value)).toEqual(expected);
});
