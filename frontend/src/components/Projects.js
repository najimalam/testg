import React, { useState, useEffect } from 'react';
import { getProjects } from '../services/apiService'; // Correct path assuming services is sibling to components

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true); // Start with loading true
  const [error, setError] = useState(null); // Optional: Add error state

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true); // Set loading true when fetch starts
        const data = await getProjects();
        setProjects(data);
        setError(null); // Clear any previous errors
      } catch (err) {
        console.error("Failed to fetch projects:", err);
        setError('Failed to load projects. Please try again later.'); // Set error message
        setProjects([]); // Clear projects on error
      } finally {
        setLoading(false); // Set loading false when fetch ends (success or fail)
      }
    };

    fetchProjects();
  }, []); // Empty dependency array means this runs once on mount

  return (
    <div>
      <h2>Projects</h2>
      {loading && <p>Loading projects...</p>}
      {error && <p className="error-message" style={{ color: 'red' }}>{error}</p>} {/* Added error class */}
      {!loading && !error && (
        <div className="projects-list"> {/* Added class */}
          {projects.length === 0 ? (
            <p>No projects found.</p>
          ) : (
            projects.map(project => (
              <div key={project.id} className="project-item"> {/* Added class and removed inline style */}
                <h3 className="project-title">{project.title}</h3> {/* Added class */}
                {project.imageUrl && (
                  <img src={project.imageUrl} alt={project.title} className="project-image" /> /* Added class and removed inline style */
                )}
                <p className="project-description">{project.description}</p> {/* Added class */}
                {project.projectUrl && (
                  <p className="project-link"> {/* Added class */}
                    <a href={project.projectUrl} target="_blank" rel="noopener noreferrer">View Project</a>
                  </p>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default Projects;
