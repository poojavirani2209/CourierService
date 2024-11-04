import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import RequestProvider from "../../api/apiRequestProvider";
import Login from "../../components/Login";
import Dashboard from "../../components/Dashboard";

jest.mock(`../../api/apiRequestProvider`);


describe('Dashboard component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test(`Given component is called, it should render dashboard`, () => {
        render(<Dashboard />);
        expect(screen.getByText(/Dashboard/i)).toBeInTheDocument();
    });

    test('Given userId, it should fetch and display shipments', async () => {
        const mockShipments = [
            { id: '1', recipientName: 'User1', status: 'COMPLETED' },
            { id: '2', recipientName: 'User2', status: 'IN_PROGRESS' },
        ];

        RequestProvider.request.mockReturnValue({
            get: jest.fn().mockResolvedValue({status:200,data:mockShipments}),
        });

        render(<Dashboard isAdmin={false} userId={'123'} />);

        await waitFor(() => {
            expect(screen.getByText('User1 - Status: COMPLETED')).toBeInTheDocument();
            expect(screen.getByText('User2 - Status: IN_PROGRESS')).toBeInTheDocument();
        });
    });

    test('Given error occurrs while fetching shipments for user, it should show error message', async () => {
        RequestProvider.request.mockReturnValue({
            get: jest.fn().mockRejectedValue(new Error('Failed to fetch data')),
        });

        render(<Dashboard isAdmin={false} userId={'123'} />);

        await waitFor(() => {
            expect(screen.getByText(/Failed to fetch data/i)).toBeInTheDocument();
        });
    });
});
