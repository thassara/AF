// src/pages/CountryDashboard.test.tsx
import '@testing-library/jest-dom'; // ensures matchers like toBeInTheDocument work
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import CountryDashboard from './CountryDashboard';
import { rest } from 'msw';
import { setupServer } from 'msw/node';


// Mock API server
const server = setupServer(
  rest.get('/api/country/:name', (req, res, ctx) => {
    return res(
      ctx.json([
        {
          name: { common: 'Sri Lanka' },
          capital: ['Colombo'],
          flags: { png: 'flag.png', alt: 'Sri Lanka flag' },
          region: 'Asia',
          subregion: 'Southern Asia',
          population: 21000000,
          area: 65610,
          timezones: ['UTC+5:30'],
          car: { side: 'left' },
          languages: { en: 'English' },
          currencies: {
            LKR: { name: 'Sri Lankan Rupee', symbol: 'Rs' },
          },
          latlng: [7.8731, 80.7718],
          borders: ['IND'],
        },
      ])
    );
  })
);

// Setup mock server hooks
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('loads and displays country data', async () => {
  render(
    <Provider store={store}>
      <MemoryRouter
        initialEntries={[
          { pathname: '/country', state: { countryName: 'Sri Lanka' } },
        ]}
      >
        <Routes>
          <Route path="/country" element={<CountryDashboard />} />
        </Routes>
      </MemoryRouter>
    </Provider>
  );

  // Assertions
  expect(await screen.findByText('Sri Lanka')).toBeInTheDocument();
  expect(screen.getByText('Colombo')).toBeInTheDocument();
});
