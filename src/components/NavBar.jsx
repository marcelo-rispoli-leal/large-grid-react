import { BsEnvelope, BsGithub, BsLinkedin } from "react-icons/bs";
import IconLink from "./IconLink";
import ThemeToggler from "./ThemeToggler";

//prettier-ignore
const { VITE_EMAIL_LINK, VITE_GITHUB_LINK, VITE_LINKEDIN_LINK } = import.meta.env;

//prettier-ignore
export default function NavBar() {
  return (
    <div role="navigation" className="flex flex-row-reverse gap-2">
      <ThemeToggler />
      {VITE_LINKEDIN_LINK && (<IconLink icon={<BsLinkedin />} link={VITE_LINKEDIN_LINK} />)}
      {VITE_GITHUB_LINK && (<IconLink icon={<BsGithub />} link={VITE_GITHUB_LINK} />)}
      {VITE_EMAIL_LINK && (<IconLink icon={<BsEnvelope />} link={`mailto:${VITE_EMAIL_LINK}`} />)}
    </div>
  );
}
