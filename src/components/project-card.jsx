import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faLink } from "@fortawesome/free-solid-svg-icons";

import './css/projects.scss'

{/*Used as <Project project={project} key={project.title} /> */}
const Project = ({ project }) => {
    const [linkClass, setLinkClass] = useState('')
    return (
        <div className="project-card">
            <div className="project-left" onClick={() => setLinkClass('shake')}>
                <span className="project-title-container"><div className="project-title">{project.title}</div></span>
                <p className="project-description">{project.description}</p>
            </div>
            <div className="project-right">
                <div className="year">{project.year}</div>
                <img src={project.logo} alt={project.title + " Logo"} />
                <div className="links">
                    {project.link &&
                        <div className="link-container">
                            <a
                                target="_blank"
                                rel="noreferrer noopener"
                                className={linkClass}
                                href={project.link}
                                onAnimationEnd={() => setLinkClass('')}
                            >
                                <FontAwesomeIcon icon={faLink} />
                            </a>
                            <span className="link-tag">See site!</span>
                        </div>
                    }
                    {project.github &&
                        <div className="link-container">
                            <a
                                target="_blank"
                                rel="noreferrer noopener"
                                className={linkClass}
                                href={project.github}
                                onAnimationEnd={() => setLinkClass('')}
                            >
                                <FontAwesomeIcon icon={faGithub} />
                            </a>
                            <span className="link-tag">See code!</span>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Projects;