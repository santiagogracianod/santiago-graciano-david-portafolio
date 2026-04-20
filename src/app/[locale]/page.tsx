"use client";

import ProfileSection from "../../components/organisms/profile-section";
import KnowledgeSection from "../../components/organisms/knowledge-section";
import EducationSection from "../../components/organisms/education-section";
import PortfolioSection from "../../components/organisms/portfolio-section";
import FooterSection from "../../components/organisms/footer-section";

export default function Page() {
  return (
    <div className="max-w-4xl mx-auto">
      <ProfileSection />
      <KnowledgeSection />
      <EducationSection />
      <PortfolioSection />
      <FooterSection />
    </div>
  );
}
