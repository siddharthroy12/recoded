import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'
import App from './App';


describe('App', () => {
  it('renders the app', () => {
    const { getByText } = render(<App />);
    const headerElement = getByText("Colors");

    expect(headerElement).toBeInTheDocument();
  });


  it('updates the editor state when typing', () => {
    const { getByTestId } = render(<App />);
    const editor = getByTestId('editor');
    const textarea = editor.querySelector('textarea');

    fireEvent.input(textarea, { target: { value: 'Typing code in' } });
    expect(textarea.value).toBe('Typing code in');
  });


  it('updates padding value', async () => {
    const { getByTestId } = render(<App />);
    const paddingInput = getByTestId('padding-input');

    fireEvent.change(paddingInput, { target: { value: '60' } });
    await waitFor(() => expect(paddingInput.value).toBe('60'));
  });


  it('updates language value', async () => {
    const { getByTestId, getByText } = render(<App />);
    const languageSelect = getByTestId('language-select');
    fireEvent.click(languageSelect);

    const optionsContainer = getByText('Python');
    fireEvent.click(optionsContainer);

    expect(languageSelect.textContent).toBe('Python');
  });


  it('updates font value', async () => {
    const { getByTestId, getByText } = render(<App />);
    const fontSelect = getByTestId('font-select');
    fireEvent.click(fontSelect);

    const optionsContainer = getByText('Fira Code');
    fireEvent.click(optionsContainer);

    expect(fontSelect.textContent).toBe('Fira Code');
  });


  it('updates background color value', async () => {
    const { getByTestId } = render(<App />);
    const backgroundColorSelect = getByTestId('background-color-select');
    const optionsContainer = getByTestId('background-options-container');
    const option3 = optionsContainer.querySelector('.background-color-3');
    
    fireEvent.click(option3);

    const circleElement = backgroundColorSelect.querySelector('.circle');
    expect(circleElement.className).toContain('background-color-3');
  });


});


