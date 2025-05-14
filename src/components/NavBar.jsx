import { BsEnvelope, BsGithub, BsLinkedin } from "react-icons/bs";
import IconLink from "./IconLink";
import ToggleTheme from "./ToggleTheme";

//prettier-ignore
const { VITE_EMAIL_LINK, VITE_GITHUB_LINK, VITE_LINKEDIN_LINK } = import.meta.env;

export default function NavBar() {
  return (
    <div className="absolute top-0 right-0 flex gap-2">
      {VITE_EMAIL_LINK && (
        <IconLink icon={<BsEnvelope />} link={`mailto:${VITE_EMAIL_LINK}`} />
      )}
      {VITE_GITHUB_LINK && (
        <IconLink icon={<BsGithub />} link={VITE_GITHUB_LINK} />
      )}
      {VITE_LINKEDIN_LINK && (
        <IconLink icon={<BsLinkedin />} link={VITE_LINKEDIN_LINK} />
      )}
      <ToggleTheme />
    </div>
  );
}
