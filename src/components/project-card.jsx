import React from 'react';

import '../css/project-card.css'

const ProjectCard = ({ project }) => {
    return (
        <div className="project-card">
            <div className="project-logo">
                <img src={`logos/${project.frontmatter.logo}.png`} alt={`${project.frontmatter.title} logo`}/>
            </div>
            <div className="project-info">
                <h2>{project.frontmatter.title}</h2>
                <div>{project.frontmatter.description}</div>
                <div className="project-tags">
                    {project.frontmatter.tags.map(tag => (
                        <span className="project-tag" key={tag}>{tag}</span>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ProjectCard

/**
 * Projects have the following layout:
    id
    frontmatter {
        title
        description
        date(formatString: "YYYY")
        slug
        description
        link
        github
        tags
    }
 */