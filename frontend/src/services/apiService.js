/**
 * Fetches projects data from the backend API.
 */
export const getProjects = async () => {
  try {
    const response = await fetch('/api/projects'); // Uses proxy in development

    if (!response.ok) {
      // Throw an error with the status text if the response is not OK
      throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error("Error fetching projects:", error);
    // Return an empty array or handle error as appropriate for the application
    // Could also throw the error again to be handled by the calling component
    return [];
  }
};

/**
 * Fetches skills data from the backend API.
 */
export const getSkills = async () => {
  try {
    const response = await fetch('/api/skills'); // Uses proxy in development

    if (!response.ok) {
      // Throw an error with the status text if the response is not OK
      throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error("Error fetching skills:", error);
    // Return an empty array or handle error as appropriate for the application
    return [];
  }
};
