import BackCardClient from "../../../../components/back-card-client";
import ProjectGalleryClient from "../../../../components/project-gallery-client";

const project = {
  slug: "pwc",
  title: "PWC",
  sub: "A Big Four consultancy; engaged us to support strategy development and prototyping.",
  img: "/PWCicon.png",
};

export default function PWCPage() {
  return (
    <main className="cyrus-cv-bg">
      <BackCardClient />

      <div className="cyrus-card">
        <img src={project.img} alt={project.title} className="cyrus-card-img" />
        <div className="cyrus-card-body">
          <h1 className="cyrus-card-name">{project.title}</h1>
          <p className="cyrus-card-role">{project.sub}</p>
        </div>
      </div>

  {/* Gallery card */}
  <ProjectGalleryClient images={["/PWC1.jpeg"]} altPrefix={project.title} />

  <section className="cyrus-section">
        <h2 className="cyrus-section-title">Context</h2>
        <p className="cyrus-section-text">PwC engaged me to support strategy and design for their Supply Chain function, which was looking to digitise a service delivered alongside a third-party platform to help businesses identify and monitor supplier risks. The objective was to commoditise and digitise the service, reduce cost to serve, and enable PwC to scale efficiently to serve more clients.</p>

        <h3 className="cyrus-section-title" style={{ marginTop: '0.6rem' }}>Role</h3>
        <ul className="cyrus-role-list">
          <li>Supported the delivery of a condensed design sprint with senior stakeholders and delivery managers to define objectives, key results, and priorities for the digital platform.</li>
          <li>Developed low-fidelity wireframes and a clickable prototype to validate concepts with delivery managers, iterating based on feedback.</li>
          <li>Authored the full product requirements and defined the roadmap for platform delivery.</li>
          <li>Partnered with PwC engineers to deliver an MVP leveraging PowerApps, ensuring alignment between design, technical feasibility, and business goals.</li>
        </ul>
        {/* Link button moved into the top card */}
      </section>
      <BackCardClient />
    </main>
  );
}
