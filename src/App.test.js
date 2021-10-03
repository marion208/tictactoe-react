import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

test('App has a title', () => {
  render(<App />);
  const titleGame = screen.getByText('Jeu du morpion');
  expect(titleGame).toBeInTheDocument();
});
test('App has a text to restart the game', () => {
  render(<App />);
  const textRestartGame = screen.getByText('Recommencer une nouvelle partie');
  expect(textRestartGame).toBeInTheDocument();
});
test('App correctly handles the first human click', () => {
  const { container } = render(<App />);
  const firstBox = container.querySelector('#box00');
  fireEvent.click(firstBox);
  expect(firstBox).toHaveTextContent('X');
});
test('If human almost win on the first line, the computer prevents him to win', () => {
  const { container } = render(<App />);
  const firstBox = container.querySelector('#box00');
  firstBox.innerHTML = 'X';
  const secondBox = container.querySelector('#box01');
  fireEvent.click(secondBox);
  const thirdBox = container.querySelector('#box02');
  expect(thirdBox).toHaveTextContent('O');
});
test('If human almost win on the second line, the computer prevents him to win', () => {
  const { container } = render(<App />);
  const firstBox = container.querySelector('#box10');
  firstBox.innerHTML = 'X';
  const secondBox = container.querySelector('#box11');
  fireEvent.click(secondBox);
  const thirdBox = container.querySelector('#box12');
  expect(thirdBox).toHaveTextContent('O');
});
test('If human almost win on the third line, the computer prevents him to win', () => {
  const { container } = render(<App />);
  const firstBox = container.querySelector('#box20');
  firstBox.innerHTML = 'X';
  const secondBox = container.querySelector('#box21');
  fireEvent.click(secondBox);
  const thirdBox = container.querySelector('#box22');
  expect(thirdBox).toHaveTextContent('O');
});
test('If human almost win on the first column, the computer prevents him to win', () => {
  const { container } = render(<App />);
  const firstBox = container.querySelector('#box00');
  firstBox.innerHTML = 'X';
  const secondBox = container.querySelector('#box10');
  fireEvent.click(secondBox);
  const thirdBox = container.querySelector('#box20');
  expect(thirdBox).toHaveTextContent('O');
});
test('If human almost win on the second column, the computer prevents him to win', () => {
  const { container } = render(<App />);
  const firstBox = container.querySelector('#box01');
  firstBox.innerHTML = 'X';
  const secondBox = container.querySelector('#box11');
  fireEvent.click(secondBox);
  const thirdBox = container.querySelector('#box21');
  expect(thirdBox).toHaveTextContent('O');
});
test('If human almost win on the third column, the computer prevents him to win', () => {
  const { container } = render(<App />);
  const firstBox = container.querySelector('#box02');
  firstBox.innerHTML = 'X';
  const secondBox = container.querySelector('#box12');
  fireEvent.click(secondBox);
  const thirdBox = container.querySelector('#box22');
  expect(thirdBox).toHaveTextContent('O');
});
test('If human almost win on the cross line, the computer prevents him to win', () => {
  const { container } = render(<App />);
  const firstBox = container.querySelector('#box00');
  firstBox.innerHTML = 'X';
  const secondBox = container.querySelector('#box11');
  fireEvent.click(secondBox);
  const thirdBox = container.querySelector('#box22');
  expect(thirdBox).toHaveTextContent('O');
});
test('If human almost win on the invert cross line, the computer prevents him to win', () => {
  const { container } = render(<App />);
  const firstBox = container.querySelector('#box02');
  firstBox.innerHTML = 'X';
  const secondBox = container.querySelector('#box11');
  fireEvent.click(secondBox);
  const thirdBox = container.querySelector('#box20');
  expect(thirdBox).toHaveTextContent('O');
});
test('Computer wins on the first line if the human is too bad', () => {
  const { container } = render(<App />);
  const firstBox = container.querySelector('#box00');
  firstBox.innerHTML = 'O';
  const secondBox = container.querySelector('#box01');
  secondBox.innerHTML = 'O';
  const thirdBox = container.querySelector('#box02');
  const fourthBox = container.querySelector('#box10');
  fireEvent.click(fourthBox);
  expect(thirdBox).toHaveTextContent('O');
});
test('Computer wins on the second line if the human is too bad', () => {
  const { container } = render(<App />);
  const firstBox = container.querySelector('#box10');
  firstBox.innerHTML = 'O';
  const secondBox = container.querySelector('#box11');
  secondBox.innerHTML = 'O';
  const thirdBox = container.querySelector('#box12');
  const fourthBox = container.querySelector('#box20');
  fireEvent.click(fourthBox);
  expect(thirdBox).toHaveTextContent('O');
});
test('Computer wins on the third line if the human is too bad', () => {
  const { container } = render(<App />);
  const firstBox = container.querySelector('#box20');
  firstBox.innerHTML = 'O';
  const secondBox = container.querySelector('#box21');
  secondBox.innerHTML = 'O';
  const thirdBox = container.querySelector('#box22');
  const fourthBox = container.querySelector('#box10');
  fireEvent.click(fourthBox);
  expect(thirdBox).toHaveTextContent('O');
});
test('Computer wins on the first column if the human is too bad', () => {
  const { container } = render(<App />);
  const firstBox = container.querySelector('#box00');
  firstBox.innerHTML = 'O';
  const secondBox = container.querySelector('#box10');
  secondBox.innerHTML = 'O';
  const thirdBox = container.querySelector('#box20');
  const fourthBox = container.querySelector('#box01');
  fireEvent.click(fourthBox);
  expect(thirdBox).toHaveTextContent('O');
});
test('Computer wins on the second column if the human is too bad', () => {
  const { container } = render(<App />);
  const firstBox = container.querySelector('#box01');
  firstBox.innerHTML = 'O';
  const secondBox = container.querySelector('#box11');
  secondBox.innerHTML = 'O';
  const thirdBox = container.querySelector('#box21');
  const fourthBox = container.querySelector('#box02');
  fireEvent.click(fourthBox);
  expect(thirdBox).toHaveTextContent('O');
});
test('Computer wins on the third column if the human is too bad', () => {
  const { container } = render(<App />);
  const firstBox = container.querySelector('#box02');
  firstBox.innerHTML = 'O';
  const secondBox = container.querySelector('#box12');
  secondBox.innerHTML = 'O';
  const thirdBox = container.querySelector('#box22');
  const fourthBox = container.querySelector('#box01');
  fireEvent.click(fourthBox);
  expect(thirdBox).toHaveTextContent('O');
});
test('Computer wins on the cross if the human is too bad', () => {
  const { container } = render(<App />);
  const firstBox = container.querySelector('#box00');
  firstBox.innerHTML = 'O';
  const secondBox = container.querySelector('#box11');
  secondBox.innerHTML = 'O';
  const thirdBox = container.querySelector('#box22');
  const fourthBox = container.querySelector('#box01');
  fireEvent.click(fourthBox);
  expect(thirdBox).toHaveTextContent('O');
});
test('Computer wins on the invert cross if the human is too bad', () => {
  const { container } = render(<App />);
  const firstBox = container.querySelector('#box02');
  firstBox.innerHTML = 'O';
  const secondBox = container.querySelector('#box11');
  secondBox.innerHTML = 'O';
  const thirdBox = container.querySelector('#box20');
  const fourthBox = container.querySelector('#box22');
  fireEvent.click(fourthBox);
  expect(thirdBox).toHaveTextContent('O');
});
test('If computer wins, the message is showed', () => {
  const { container } = render(<App />);
  const firstBox = container.querySelector('#box00');
  firstBox.innerHTML = 'O';
  const secondBox = container.querySelector('#box01');
  secondBox.innerHTML = 'O';
  const fourthBox = container.querySelector('#box10');
  fireEvent.click(fourthBox);
  const eltMessageGame = container.querySelector('#game_message_container');
  expect(eltMessageGame).toHaveTextContent('Vous avez perdu !');
});
test('If the match is drawn, the message is showed', () => {
  const { container } = render(<App />);
  const firstBox = container.querySelector('#box00');
  firstBox.innerHTML = 'X';
  const secondBox = container.querySelector('#box01');
  secondBox.innerHTML = 'O';
  const thirdBox = container.querySelector('#box02');
  thirdBox.innerHTML = 'X';
  const fourthBox = container.querySelector('#box10');
  fourthBox.innerHTML = 'O';
  const fifthBox = container.querySelector('#box11');
  fifthBox.innerHTML = 'O';
  const sixthBox = container.querySelector('#box12');
  sixthBox.innerHTML = 'X';
  const seventhBox = container.querySelector('#box20');
  seventhBox.innerHTML = 'X';
  const ninthBox = container.querySelector('#box22');
  ninthBox.innerHTML = 'O';
  const eigthBox = container.querySelector('#box21');
  fireEvent.click(eigthBox);
  const eltMessageGame = container.querySelector('#game_message_container');
  expect(eltMessageGame).toHaveTextContent('Match nul !');
});
test('If the human wins, the firework is showed', () => {
  const { container } = render(<App />);
  const firstBox = container.querySelector('#box00');
  firstBox.innerHTML = 'X';
  const secondBox = container.querySelector('#box01');
  secondBox.innerHTML = 'X';
  const thirdBox = container.querySelector('#box02');
  fireEvent.click(thirdBox);
  const eltMessageGame = container.querySelector('#game_message_container');
  const eltFireworksContainer = container.querySelector('#fireworks_container');
  expect(eltMessageGame).toHaveTextContent('');
  expect(eltFireworksContainer.classList.contains('invisible')).toBe(false);
});
