import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Register from '../../components/Register';
import RequestProvider from '../../api/apiRequestProvider';

jest.mock('../../api/apiRequestProvider');
beforeAll(() => {
    window.alert = jest.fn();
});
describe('Register Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('Given component is called, then it should render the registration form', () => {
        render(<Register />);

        expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Sender Name')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Sender Address')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /register/i })).toBeInTheDocument();
    });


    test('Given proper inputs, then it should register a user successfully', async () => {
        const mockResponse = 'User registered successfully';
        (RequestProvider.request).mockReturnValue({
            post: jest.fn().mockResolvedValue(mockResponse),
        });

        render(<Register />);

        fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'user1@abc.com' } });
        fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password123' } });
        fireEvent.change(screen.getByPlaceholderText('Sender Name'), { target: { value: 'User1' } });
        fireEvent.change(screen.getByPlaceholderText('Sender Address'), { target: { value: '123 street, India' } });
        fireEvent.click(screen.getByRole('button', { name: /register/i }));

        expect(await screen.findByText('User registered successfully')).toBeInTheDocument();
    });

    test('Given empty values for provided fields, then it should show error message.', async () => {
        render(<Register />);
        fireEvent.click(screen.getByRole('button', { name: /register/i }));

        expect(await screen.findByText('All fields are required')).toBeInTheDocument();
    });


    test('Given the details were not proper, then it should handle registration failure', async () => {
        (RequestProvider.request).mockReturnValue({
            post: jest.fn().mockRejectedValue(new Error('Registration failed!')),
        });

        render(<Register />);

        fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password123' } });
        fireEvent.change(screen.getByPlaceholderText('Sender Name'), { target: { value: 'John Doe' } });
        fireEvent.change(screen.getByPlaceholderText('Sender Address'), { target: { value: '123 Main St' } });
        fireEvent.click(screen.getByRole('button', { name: /register/i }));

        expect(await screen.findByText('Registration failed!')).toBeInTheDocument();
    });
});
