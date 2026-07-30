import { COMPANY_INFO } from "@/config/company-data";
import { AszfTemplate } from "@/templates/ASZF-template";

export default function AszfPage() {
  return (
    <AszfTemplate
      companyInfo={COMPANY_INFO}
      siteSpecificInfo={{
        siteName: "Rendezvényárnyékolás",
        siteUrl: "https://rendezvenyarnyekolas.hu",
        activityDescription:
          "Egyedi festésű és nyomtatott lycra dekor ponyvák bérbeadása és helyszíni telepítése rendezvényekre.",
      }}
    />
  );
}
