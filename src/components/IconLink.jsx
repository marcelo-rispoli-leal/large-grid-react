// Exports each Icon Link to import in the NavBar
export default function IconLink({ icon, link }) {
  return (
    <a
      href={link}
      role="link"
      target="_blank"
      rel="noopener noreferrer"
      className="b-std bg-neutral-300 p-2 text-xl transition-colors hover:bg-cyan-700 dark:bg-neutral-700"
    >
      {icon}
    </a>
  );
}
