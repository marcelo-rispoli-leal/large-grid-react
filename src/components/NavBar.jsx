// NavBar dependencies
import { BsEnvelope, BsGithub, BsLinkedin } from "react-icons/bs";
import IconLink from "./IconLink";
import ThemeToggler from "./ThemeToggler";
// prettier-ignore
// Constants from .env to set the NavBar IconLinks
const { VITE_EMAIL_LINK, VITE_GITHUB_LINK, VITE_LINKEDIN_LINK } = import.meta.env;
// Classes for the NavBar IconLinks
const iconClasses = "h-full w-full";
// prettier-ignore
// Export the NavBar for import into the App
export default function NavBar() {
  return (
    <div
      role="navigation"
      className="3xl:h-[60px] 4xl:h-[72px] 3xl:gap-[10px] 4xl:gap-[12px] inline-flex h-[48px] w-full justify-end gap-[8px]"
    >
      {VITE_EMAIL_LINK && (<IconLink icon={<BsEnvelope className={iconClasses} />} link={`mailto:${VITE_EMAIL_LINK}`} />)}
      {VITE_GITHUB_LINK && (<IconLink icon={<BsGithub className={iconClasses} />} link={VITE_GITHUB_LINK} />)}
      {VITE_LINKEDIN_LINK && (<IconLink icon={<BsLinkedin className={iconClasses} />} link={VITE_LINKEDIN_LINK} />)}
      <ThemeToggler />
    </div>
  );
}
