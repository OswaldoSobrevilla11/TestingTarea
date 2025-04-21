import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '../sharedComponent/theme';
import EasyButton from '../sharedComponent/EasyButton';

function Wrapper({ children, initialTheme }) {
  return <ThemeProvider initialTheme={initialTheme}>{children}</ThemeProvider>;
}

test('renders EasyButton with light theme', () => {
  render(<EasyButton />, { wrapper: ({ children }) => <Wrapper initialTheme="light">{children}</Wrapper> });

  const button = screen.getByRole('button');
  expect(button).toHaveStyle({
    backgroundColor: 'white',
    color: 'black',
  });
});

test('renders EasyButton with dark theme', () => {
  render(<EasyButton />, { wrapper: ({ children }) => <Wrapper initialTheme="dark">{children}</Wrapper> });

  const button = screen.getByRole('button');
  expect(button).toHaveStyle({
    backgroundColor: 'black',
    color: 'white',
  });
});
