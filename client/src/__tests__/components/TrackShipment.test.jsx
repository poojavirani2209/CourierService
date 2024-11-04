import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import TrackShipment from '../../components/TrackShipment';
import RequestProvider from '../../api/apiRequestProvider';

jest.mock('../../api/apiRequestProvider');

describe('TrackShipment', () => {
    const mockShipmentDetails = {
        recipient_name: 'User2',
        status: 'IN_PROGRESS',
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('Given a valid tracking number, then it should successfully track a shipment', async () => {
        RequestProvider.request.mockReturnValue({
            get: jest.fn().mockResolvedValueOnce({ data: mockShipmentDetails }),
        });

        render(<TrackShipment />);

        fireEvent.change(screen.getByPlaceholderText('Tracking Number'), { target: { value: 'TRACK-123456' } });
        fireEvent.click(screen.getByText('Track'));

        expect(await screen.findByText('Shipment Details:')).toBeInTheDocument();
        expect(screen.getByText((content, element) => {
            return element.textContent === 'Recipient: User2';
        })).toBeInTheDocument();
        expect(screen.getByText((content, element) => {
            return element.textContent === 'Status: IN_PROGRESS';
        })).toBeInTheDocument();
    });

    test('Given no shipment was found with the trackign number, then it should display error message', async () => {
        RequestProvider.request.mockReturnValue({
            get: jest.fn().mockRejectedValueOnce(new Error('Not Found')),
        });

        render(<TrackShipment />);

        fireEvent.change(screen.getByPlaceholderText('Tracking Number'), { target: { value: 'INVALID-TRACKING' } });
        fireEvent.click(screen.getByText('Track'));

        expect(await screen.findByText('Shipment was not found!')).toBeInTheDocument();
    });
});
