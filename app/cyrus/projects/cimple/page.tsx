import BackCardClient from "../../../../components/back-card-client";
import ProjectGalleryClient from "../../../../components/project-gallery-client";

const project = {
  slug: "cimple",
  title: "Cimple",
  sub: "A procurement platform transforming the way organisations exchange goods and services.",
  img: "/Cimpleicon.png",
};

export default function CimplePage() {
  return (
    <main className="cyrus-cv-bg">
      <BackCardClient />

      <div className="cyrus-card">
        <img src={project.img} alt={project.title} className="cyrus-card-img" />
        <div className="cyrus-card-body">
          <h1 className="cyrus-card-name">{project.title}</h1>
          <p className="cyrus-card-role">{project.sub}</p>
          <a
            className="cyrus-resume-btn"
            href="https://cimple.uk/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ marginTop: '0.5rem', display: 'inline-flex' }}
            aria-label="Open project link"
          >
            <span>Link ↗</span>
          </a>
        </div>
      </div>

  {/* Gallery card */}
  <ProjectGalleryClient images={["/Cimple1.png", "/Cimple2.png", "/Cimple3.png"]} altPrefix={project.title} />

  <section className="cyrus-section">
        <h2 className="cyrus-section-title">Context</h2>
        <p className="cyrus-section-text">Cimple is a B2B procurement platform that connects buyers and suppliers in both the public and private sectors. The platform aims to remove complexity from sourcing and contracting processes, making procurement more transparent, efficient, and accessible, especially for organisations that might otherwise struggle with traditional (often expensive or cumbersome) procurement tools. Cimple supports activities such as publishing tenders and competitions, enabling suppliers to bid, evaluating submissions, and managing contracts. </p>

        <h3 className="cyrus-section-title" style={{ marginTop: '0.6rem' }}>Role</h3>
        <ul className="cyrus-role-list">
          <li>Led comprehensive user research across buyers and suppliers to understand real-world pain points, mental models, and workflow variations. This included conducting interviews, running usability tests, mapping end-to-end procurement journeys, and synthesising insights to inform product direction and feature prioritisation.</li>
          <li>Supported the development of the overall product strategy for Cimple, aligning product vision with the company’s mission.</li>
          <li>Oversaw legislation and compliance review, ensuring that the platform’s procurement and tendering workflows comply with UK regulations and transparency requirements.</li>
          <li>Coordinated and collaborated with stakeholders across buyers, suppliers, and internal teams to ensure alignment between product functionality and user needs.</li>
          <li>Worked closely with design and engineering teams to translate strategic requirements into user-friendly product features.</li>
        </ul>
        {/* Link button moved into the top card */}
      </section>
      <BackCardClient />
    </main>
  );
}
