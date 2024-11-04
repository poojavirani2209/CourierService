import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import RequestProvider from "../../api/apiRequestProvider";
import { useParams, useNavigate } from 'react-router-dom';
import UpdateShipmentStatus from "../../components/UpdateShipment";

jest.mock(`../../api/apiRequestProvider`);
jest.mock('react-router-dom', () => ({
    useParams: jest.fn(),
    useNavigate: jest.fn(),
}));

describe('Update Shipment Status Component', () => {
    const mockRequest = RequestProvider.request;
    const mockNavigate = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
        useParams.mockReturnValue({ id: '123' });
        useNavigate.mockReturnValue(mockNavigate);
    });

    test(`Given component is called, it should render update shipment status component`, () => {
        render(<UpdateShipmentStatus />);

        expect(screen.getByText(/Update Shipment Status/i)).toBeInTheDocument();
        expect(screen.getByText(/Status:/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Update Status/i })).toBeInTheDocument();
    });

    test('When provided with a dropdown value, then it should successfully update shipment status', async () => {
        mockRequest.mockReturnValue({
            post: jest.fn().mockResolvedValue({}),
        });

        render(<UpdateShipmentStatus />);

        fireEvent.change(screen.getByRole('combobox'), { target: { value: 'COMPLETED' } });

        fireEvent.click(screen.getByRole('button', { name: /Update Status/i }));

        await waitFor(() => {
            expect(mockRequest().post).toHaveBeenCalledWith('/shipments/update/123', { status: 'COMPLETED' });
            expect(mockNavigate).toHaveBeenCalledWith('/dashboard-admin');
        });
    });

    test('Given error occurs while updating shipment status, it should show error message', async () => {
        mockRequest.mockReturnValue({
            post: jest.fn().mockRejectedValue(new Error('Update failed')),
        });

        render(<UpdateShipmentStatus />);

        fireEvent.click(screen.getByRole('button', { name: /Update Status/i }));

        await waitFor(() => {
            expect(screen.getByText(/Failed to update shipment status/i)).toBeInTheDocument();
        });
    });
});
