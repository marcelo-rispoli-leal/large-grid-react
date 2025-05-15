export default function IconLink({ icon, link }) {
  return (
    <a
      href={link}
      role="link"
      target="_blank"
      rel="noopener noreferrer"
      className="b-std p-2 transition-colors hover:bg-cyan-700"
    >
      {icon}
    </a>
  );
}
