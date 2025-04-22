import React, { useState, useEffect } from 'react';
import { getSkills } from '../services/apiService'; // Correct path assuming services is sibling to components

function Skills() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true); // Start with loading true
  const [error, setError] = useState(null); // Optional: Add error state

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        setLoading(true); // Set loading true when fetch starts
        const data = await getSkills();
        setSkills(data);
        setError(null); // Clear any previous errors
      } catch (err) {
        console.error("Failed to fetch skills:", err);
        setError('Failed to load skills. Please try again later.'); // Set error message
        setSkills([]); // Clear skills on error
      } finally {
        setLoading(false); // Set loading false when fetch ends (success or fail)
      }
    };

    fetchSkills();
  }, []); // Empty dependency array means this runs once on mount

  return (
    <div>
      <h2>Skills</h2>
      {loading && <p>Loading skills...</p>}
      {error && <p className="error-message" style={{ color: 'red' }}>{error}</p>} {/* Added error class */}
      {!loading && !error && (
        <ul className="skills-list"> {/* Added class */}
          {skills.length === 0 ? (
            <p>No skills found.</p>
          ) : (
            skills.map(skill => (
              <li key={skill.id} className="skill-item"> {/* Added class */}
                <strong>{skill.name}</strong>: {skill.proficiencyLevel}
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}

export default Skills;
