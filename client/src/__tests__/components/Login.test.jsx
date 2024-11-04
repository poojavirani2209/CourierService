import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import RequestProvider from "../../api/apiRequestProvider";
import Login from "../../components/Login";

jest.mock(`../../api/apiRequestProvider`);

describe(`Login Component`, () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test(`Given component is called, it should render login form`, () => {
        render(<Login />);
        expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
        expect(screen.getByRole(`button`, { name: /login/i })).toBeInTheDocument();
    });

    test(`Given empty values for provided fields, then it should show error message.`, async () => {
        render(<Login />);
        fireEvent.click(screen.getByRole(`button`, { name: /login/i }));

        expect(await screen.findByText(`All fields are required`)).toBeInTheDocument();
    });

    test(`Given proper inputs, then it should login a user successfully`, async () => {
        const mockResponse = `Login successfully`;

        (RequestProvider.request).mockReturnValue({
            post: jest.fn().mockResolvedValue({ data: mockResponse }),
        });

        render(<Login />);
        fireEvent.change(screen.getByPlaceholderText(`Email`), { target: { value: `user1@abc.com` } });
        fireEvent.change(screen.getByPlaceholderText(`Password`), { target: { value: `password123` } });

        fireEvent.click(screen.getByRole(`button`, { name: /login/i }));

        expect(RequestProvider.request().post).toHaveBeenCalledWith(`/users/login`, {
            email: `user1@abc.com`,
            password: `password123`
        });

        expect(await screen.findByText(`Login successfully`)).toBeInTheDocument();

    });

    test(`Given the details were not proper, then it should handle login failure`, async () => {
        const mockResponse = `Login failed!`;

        (RequestProvider.request).mockReturnValue({
            post: jest.fn().mockRejectedValue(mockResponse),
        });

        render(<Login />);
        fireEvent.change(screen.getByPlaceholderText(`Email`), { target: { value: `user1@abc.com` } });
        fireEvent.change(screen.getByPlaceholderText(`Password`), { target: { value: `password123` } });

        fireEvent.click(screen.getByRole(`button`, { name: /login/i }));

        expect(await screen.findByText(`Login failed!`)).toBeInTheDocument();
    });
});
