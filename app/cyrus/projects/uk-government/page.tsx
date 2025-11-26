import BackCardClient from "../../../../components/back-card-client";
import ProjectGalleryClient from "../../../../components/project-gallery-client";

const project = {
  slug: "uk-government",
  title: "Crown Commercial Services",
  sub: "Contract to support digital transformation and customer segmentation within the energy sector.",
  img: "/CCSicon.png",
};

export default function UKGovernmentPage() {
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
  <ProjectGalleryClient images={["/CCS1.jpg"]} altPrefix={project.title} />

  <section className="cyrus-section">
        <h2 className="cyrus-section-title">Context</h2>
        <p className="cyrus-section-text">Crown Commercial Service (CCS) is the UK government’s central purchasing body, supporting public sector organisations to procure goods and services efficiently. As part of its strategy to better serve key clients, CCS aimed to segment its customer base to tailor service delivery and improve overall efficiency.</p>

        <h3 className="cyrus-section-title" style={{ marginTop: '0.6rem' }}>Role</h3>
        <ul className="cyrus-role-list">
          <li>Supported user journey mapping for existing energy customers, identifying pain points in procuring energy through CCS.</li>
          <li>Assisted with the customer segmentation pilot, analysing energy customer size and spend to categorise clients into four quadrants: Strategic, Grow, Maintain, and Monitor.</li>
          <li>Helped define digital service approaches for each energy customer segment, enabling self-service where possible while ensuring high-value clients received tailored support.</li>
          <li>Helped improve the overall customer experience within the Energy department, ensuring internal resources were prioritised for strategic and growth segments.</li>
        </ul>
        {/* Link button moved into the top card */}
      </section>
      <BackCardClient />
    </main>
  );
}
