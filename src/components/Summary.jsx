export default function Summary({ count, lines }) {
  return (
    <div className="b-std bg-cyan-700 p-3 transition-all duration-300 ease-in-out" role="region" aria-label="Resumo da lista">
      <div className="grid h-full items-center text-neutral-100">
        <div>
          Users Founded: <strong aria-label={`${count.toLocaleString("pt-BR")} usuários encontrados`}>{count.toLocaleString("pt-BR")}</strong>
        </div>
        <div>
          Number of Lines: <strong aria-label={`${lines.toLocaleString("pt-BR")} linhas`}>{lines.toLocaleString("pt-BR")}</strong>
        </div>
      </div>
    </div>
  );
}
