import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'; // For extended matchers like .toBeInTheDocument()

import Skills from './Skills';
import * as apiService from '../services/apiService'; // Import the service to mock

// Mock the apiService module
jest.mock('../services/apiService');

describe('Skills Component', () => {
  test('renders loading state initially', () => {
    // Mock the service to return a promise that never resolves for this test
    apiService.getSkills.mockResolvedValueOnce([]);

    render(<Skills />);
    expect(screen.getByText(/loading skills.../i)).toBeInTheDocument();
  });

  test('renders skills fetched from API', async () => {
    // Setup the mock response
    const mockSkills = [
      { id: 1, name: 'React', proficiencyLevel: 'Intermediate' },
      { id: 2, name: 'JavaScript', proficiencyLevel: 'Advanced' },
    ];
    apiService.getSkills.mockResolvedValueOnce(mockSkills);

    // Render the component
    render(<Skills />);

    // Wait for the loading text to disappear and skills to appear
    // Use findByText which waits for the element
    expect(await screen.findByText(/React/i)).toBeInTheDocument();
    expect(screen.getByText(/Intermediate/i)).toBeInTheDocument();

    expect(await screen.findByText(/JavaScript/i)).toBeInTheDocument();
    expect(screen.getByText(/Advanced/i)).toBeInTheDocument();

    // Verify the loading text is gone
    expect(screen.queryByText(/loading skills.../i)).not.toBeInTheDocument();

    // Verify the API was called
    expect(apiService.getSkills).toHaveBeenCalledTimes(1);
  });

  test('renders error message when API call fails', async () => {
    // Setup the mock to reject
    const errorMessage = 'Failed to load skills. Please try again later.';
    apiService.getSkills.mockRejectedValueOnce(new Error("API Error"));

    // Render the component
    render(<Skills />);

    // Wait for the error message to appear
    expect(await screen.findByText(errorMessage)).toBeInTheDocument();

    // Verify the loading text is gone
    expect(screen.queryByText(/loading skills.../i)).not.toBeInTheDocument();

    // Verify no skills are rendered
    expect(screen.queryByText(/React/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/JavaScript/i)).not.toBeInTheDocument();

    // Verify the API was called
    expect(apiService.getSkills).toHaveBeenCalledTimes(1);
  });

   test('renders "No skills found" when API returns empty array', async () => {
    // Setup the mock response
    const mockSkills = [];
    apiService.getSkills.mockResolvedValueOnce(mockSkills);

    // Render the component
    render(<Skills />);

    // Wait for the "No skills found" message
    expect(await screen.findByText(/No skills found./i)).toBeInTheDocument();

    // Verify the loading text is gone
    expect(screen.queryByText(/loading skills.../i)).not.toBeInTheDocument();
     // Verify the API was called
    expect(apiService.getSkills).toHaveBeenCalledTimes(1);
  });

});
