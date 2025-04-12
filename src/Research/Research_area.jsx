import React from "react";
import "./Research_area.css";

function Research_area() {
    return (
        <section className="research-area">
            <div className="research-container">
                <header className="research-header">
                    <h2 className="research-main-title">Research Focus Areas</h2>
                    <p className="research-intro">The CISKS research is focused on five strategic areas of Indian Knowledge Systems</p>
                </header>

                <div className="research-grid">
                    <article className="strategy-card">
                        <h3 className="section-title">Strategic Research Areas</h3>
                        <ul className="research-list">
                            <li className="research-item">Knowledge Paradigms</li>
                            <li className="research-item">Sustainable Agriculture</li>
                            <li className="research-item">Novel Materials</li>
                            <li className="research-item">Holistic Medicine</li>
                            <li className="research-item">Preserving Traditional Knowledge</li>
                        </ul>
                    </article>

                    <article className="manpower-card">
                        <h3 className="section-title">Research Manpower</h3>
                        <div className="manpower-content">
                            <p className="manpower-description">
                                The center will house:
                                <span className="highlight">10 faculty members</span> and 
                                <span className="highlight">30 research scholars</span> working across all focus areas.
                            </p>
                        </div>
                    </article>

                    <article className="achievements-card">
                        <h3 className="section-title">Recent Achievements</h3>
                        <div className="achievements-content">
                            <ul className="progress-list">
                                <li>Funded 8 internal research projects</li>
                                <li>Secured 3 external grants from IKS Division, Ministry of Education</li>
                                <li>Ongoing 3rd call for collaborative proposals with MSRVVP and Maharshi Panini Sanskrit Vidyalaya</li>
                                <li>Anticipated funding for 6-12 new projects in current cycle</li>
                            </ul>
                        </div>
                    </article>
                </div>
            </div>
        </section>
    )
}

export default Research_area;