import ProjectCardsClient from "../../components/project-cards-client";

export default function CyrusPage() {
  return (
    <main className="cyrus-cv-bg">
      <div className="cyrus-card">
        <img src="/Cyrus.jpeg" alt="Cyrus" className="cyrus-card-img" />
        <div className="cyrus-card-body">
          <h1 className="cyrus-card-name">Cyrus Devlin</h1>
          <p className="cyrus-card-role">Senior Product Manager</p>
          <a
            className="cyrus-linkedin"
            href="https://www.linkedin.com/in/cyrus-devlin/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LINKEDIN&nbsp;<span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>

      <section className="cyrus-section" aria-labelledby="about-heading">
        <h2 id="about-heading" className="cyrus-section-title">About</h2>
        <p className="cyrus-section-text">Product manager with over 6 years experience launching digital products from inception to scale. Adept at leading cross-functional teams, balancing trade-offs, and delivering user-centric solutions that drive adoption and value. I completed a full-stack developer bootcamp to deepen my technical fluency and regularly leverage that experience when collaborating with engineers and designers.  </p>
        <p className="cyrus-section-text"> Naturally curious and comfortable navigating complex user journeys and data, I enjoy turning ambiguous problems into validated product outcomes. </p>
        <a
          className="cyrus-resume-btn"
          href="https://docs.google.com/document/d/1Lb-ISxpP6atHzYTKypKQBqo_XCbcd1gx/edit?usp=sharing&ouid=109239314140910049691&rtpof=true&sd=true"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg className="cyrus-resume-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          <span>Resume</span>
        </a>
      </section>

      <section className="cyrus-section" aria-labelledby="projects-heading">
        <h2 id="projects-heading" className="cyrus-section-title">Featured Projects</h2>
        {/* client-side project list handles progressive loading */}
        <ProjectCardsClient />
      </section>

      <section className="cyrus-section" aria-labelledby="experience-heading">
        <h2 id="experience-heading" className="cyrus-section-title">Experience</h2>
        <ul className="cyrus-edu-list">
          <li className="cyrus-edu-item">
            <div className="cyrus-edu-left">
              <div className="cyrus-edu-inst">Nordlink Capital</div>
              <div className="cyrus-edu-degree">Senior Advisor</div>
            </div>
            <div className="cyrus-edu-right">Aug 2025 – Present</div>
          </li>

          <li className="cyrus-edu-item">
            <div className="cyrus-edu-left">
              <div className="cyrus-edu-inst">Future Arc</div>
              <div className="cyrus-edu-degree">Senior Product Manager</div>
            </div>
            <div className="cyrus-edu-right">Feb 2021 – Jun 2025</div>
          </li>

          <li className="cyrus-edu-item">
            <div className="cyrus-edu-left">
              <div className="cyrus-edu-inst">Future Arc</div>
              <div className="cyrus-edu-degree">Product Manager</div>
            </div>
            <div className="cyrus-edu-right">Feb 2019 – Feb 2021</div>
          </li>

          <li className="cyrus-edu-item">
            <div className="cyrus-edu-left">
              <div className="cyrus-edu-inst">Edge of Belgravia</div>
              <div className="cyrus-edu-degree">Head of Operations</div>
            </div>
            <div className="cyrus-edu-right">Jun 2014 – Nov 2018</div>
          </li>
        </ul>
      </section>

      <section className="cyrus-section" aria-labelledby="education-heading">
        <h2 id="education-heading" className="cyrus-section-title">Relevant Certifications</h2>
        <ul className="cyrus-edu-list">
          <li className="cyrus-edu-item">
            <div className="cyrus-edu-left">
              <div className="cyrus-edu-inst">Le Wagon, UK</div>
              <div className="cyrus-edu-degree">Full-Stack Developer Bootcamp</div>
            </div>
            <div className="cyrus-edu-right">Feb 2024 – Jul 2024</div>
          </li>
        </ul>

        <h2 id="education-heading" className="cyrus-section-title">Education</h2>
        <ul className="cyrus-edu-list">
          <li className="cyrus-edu-item">
            <div className="cyrus-edu-left">
              <div className="cyrus-edu-inst">University of Westminster, UK</div>
              <div className="cyrus-edu-degree">BA (Hons) Business Management</div>
            </div>
            <div className="cyrus-edu-right">Sep 2013 – Jun 2017</div>
          </li>

          <li className="cyrus-edu-item">
            <div className="cyrus-edu-left">
              <div className="cyrus-edu-inst">Université Paris Dauphine, France</div>
              <div className="cyrus-edu-degree">BA (Hons) Business Management (Summer Exchange)</div>
            </div>
            <div className="cyrus-edu-right">2016</div>
          </li>

          <li className="cyrus-edu-item">
            <div className="cyrus-edu-left">
              <div className="cyrus-edu-inst">Clifton College, Bristol, UK</div>
              <div className="cyrus-edu-degree">GCSEs &amp; A-Level</div>
            </div>
            <div className="cyrus-edu-right">Sep 2005 – Jun 2012</div>
          </li>

          <li className="cyrus-edu-item">
            <div className="cyrus-edu-left">
              <div className="cyrus-edu-inst">JFK &amp; Feutersoey, Gstaad, Switzerland</div>
              <div className="cyrus-edu-degree">Primary School</div>
            </div>
            <div className="cyrus-edu-right">Sep 1999 – Jun 2005</div>
          </li>
        </ul>
      </section>

      <section className="cyrus-section">
        <p className="cyrus-section-text cyrus-contact-line">
          London, United Kingdom&nbsp;&middot;&nbsp;
          <a href="mailto:cyrusdevlin@gmail.com">cyrusdevlin@gmail.com</a>&nbsp;&middot;&nbsp;
          <a href="tel:+447527755201">+44 (0) 752 7755 201</a>
        </p>
      </section>
    </main>
  )
}
