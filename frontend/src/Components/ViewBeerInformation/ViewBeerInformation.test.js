import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import { renderWithRouter } from '../../testUtils';
import { toBeInTheDocument } from '@testing-library/jest-dom/dist/matchers';

import ViewBeerInformation from './ViewBeerInformation';
import App from '../../App';

describe('ViewBeerInformation component', () => {
    const route = '/brewery/1/beers/1';

    test('renders ViewBeerInformation component', async () => {
        render(
            <MemoryRouter initialEntries={[route]}>
                <App />
            </MemoryRouter>
        );

        const titleElements = await screen.findAllByRole('heading', {
            level: 3,
        });

        const viewBeerListLinkElement = await screen.findByText(
            /View Beer List/i
        );

        expect(titleElements[0]).toBeInTheDocument();
        expect(viewBeerListLinkElement).toBeInTheDocument();
    });

    test('expects test beer information to be rendered on page', async () => {
        render(
            <MemoryRouter initialEntries={[route]}>
                <App />
            </MemoryRouter>
        );

        const beerDescriptionElement = await screen.findByText(/light blonde/i);
        const beerABVElement = await screen.findByText(/5.9/i);
        const beerTypeElement = await screen.findByText(/Pale Lager/i);

        expect(beerDescriptionElement).toBeInTheDocument();
        expect(beerABVElement).toBeInTheDocument();
        expect(beerTypeElement).toBeInTheDocument();
    });
});
