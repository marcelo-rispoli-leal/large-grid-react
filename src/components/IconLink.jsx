// Exports each IconLink for import into the NavBar
export default function IconLink({ icon, link }) {
  return (
    <a
      href={link}
      role="link"
      target="_blank"
      rel="noopener noreferrer"
      className="3xl:w-[60px] 3xl:rounded-[15px] 3xl:p-[10px] 4xl:w-[72px] 4xl:rounded-[18px] 4xl:p-[12px] b-std h-full w-[48px] rounded-[12px] bg-neutral-300 p-[8px] transition-colors hover:bg-teal-700 dark:bg-neutral-700"
    >
      {icon}
    </a>
  );
}
