import BackCardClient from "../../../../components/back-card-client";
import ProjectGalleryClient from "../../../../components/project-gallery-client";

const project = {
  slug: "food-import",
  title: "Food Import Business",
  sub: "Food import business in the UAE, sourcing products on behalf of supermarkets, retailers, and airlines.",
  img: "/Foodimport.png",
};

export default function FoodImportPage() {
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

      {/* Gallery card — interactive, client-side */}
      <ProjectGalleryClient images={["/Foodimport1.png", "/foodimport2.png", "/foodimport3.png","/Foodimports5.png"]} altPrefix={project.title} />

      <section className="cyrus-section">
        <h2 className="cyrus-section-title">Context</h2>
        <p className="cyrus-section-text">A leading UAE food import business needed a digital platform to streamline sourcing across its operations and subsidiaries. The organisation sought to reduce manual procurement workflows, improve efficiency, and provide a unified experience for buyers and suppliers, while enabling data-driven decision-making across its supply chain.</p>

        {/* Role — placed inside the same card so it appears under Context */}
        <h3 className="cyrus-section-title" style={{ marginTop: '0.6rem' }}>Role</h3>
        <ul className="cyrus-role-list">
          <li>Led end-to-end delivery of a sourcing platform for a leading Abu Dhabi food organisation, digitising procurement workflows and reducing manual effort.</li>
          <li>Conducted user research and mapped journeys for five key buyer and supplier personas, prioritising features based on ROI, feasibility, and user needs.</li>
          <li>Served as the primary client liaison, securing buy-in from C-level stakeholders and aligning the product roadmap with evolving business objectives.</li>
          <li>Managed timelines and budgets, ensuring the platform was delivered successfully, on time, and within scope.</li>
        </ul>
        {/* Link button moved into the top card */}
      </section>
      {/* Bottom back card for convenience */}
      <BackCardClient />
    </main>
  );
}
