export default function IconLink({ icon, link }) {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="b-std p-2 transition-all duration-300 ease-in-out hover:bg-cyan-700"
    >
      {icon}
    </a>
  );
}
