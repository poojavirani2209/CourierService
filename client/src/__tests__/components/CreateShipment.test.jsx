import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import RequestProvider from "../../api/apiRequestProvider";
import CreateShipment from "../../components/CreateShipment";

jest.mock('../../api/apiRequestProvider');

describe('CreateShipment Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test(`Given component is called, it should render create shipment form`, () => {
        render(<CreateShipment />);
        expect(screen.getByPlaceholderText(/recipient name/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/recipient address/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/shipment details/i)).toBeInTheDocument();
        expect(screen.getByRole(`button`, { name: /Create Shipment/i })).toBeInTheDocument();
    });

    test(`Given empty values for provided fields, then it should show error message.`, async () => {
        render(<CreateShipment />);

        fireEvent.click(screen.getByRole('button', { name: /Create Shipment/i }));

        expect(await screen.findByText(/All fields are required/i)).toBeInTheDocument();
    });

    test(`Given proper inputs, then it should create a shipment successfully`, async () => {
        RequestProvider.request.mockReturnValue({
            post: jest.fn().mockResolvedValue({ data: 'Shipment created successfully!' }),
        });

        render(<CreateShipment />);

        fireEvent.change(screen.getByPlaceholderText(/UserId/i), { target: { value: 'user123' } });
        fireEvent.change(screen.getByPlaceholderText(/Recipient Name/i), { target: { value: ' User2' } });
        fireEvent.change(screen.getByPlaceholderText(/Recipient Address/i), { target: { value: '123 street, USA' } });
        fireEvent.change(screen.getByPlaceholderText(/Shipment Details/i), { target: { value: 'Keep it safe' } });

        fireEvent.click(screen.getByRole('button', { name: /Create Shipment/i }));

        expect(await screen.findByText(/Shipment created successfully!/i)).toBeInTheDocument();
    });

    test(`Given the details were not proper, then it should handle shipment failure`, async () => {
        RequestProvider.request.mockReturnValue({
            post: jest.fn().mockRejectedValue(new Error('Failed to create shipment!')),
        });

        render(<CreateShipment />);

        fireEvent.change(screen.getByPlaceholderText(/UserId/i), { target: { value: 'user123' } });
        fireEvent.change(screen.getByPlaceholderText(/Recipient Name/i), { target: { value: ' User2' } });
        fireEvent.change(screen.getByPlaceholderText(/Recipient Address/i), { target: { value: '123 street, USA' } });
        fireEvent.change(screen.getByPlaceholderText(/Shipment Details/i), { target: { value: 'Keep it safe' } });

        fireEvent.click(screen.getByRole('button', { name: /Create Shipment/i }));

        expect(await screen.findByText(/Failed to create shipment!/i)).toBeInTheDocument();
    });
});
