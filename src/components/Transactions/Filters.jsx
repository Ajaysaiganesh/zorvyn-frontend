function Filters({ filter, setFilter }) {
  const filters = ["all", "income", "expense"];
  return (
    <div className="join mb-4">
      {filters.map((f) => (
        <button
          key={f}
          className={`btn btn-sm join-item capitalize ${filter === f ? "btn-primary" : "btn-ghost"}`}
          onClick={() => setFilter(f)}
        >
          {f}
        </button>
      ))}
    </div>
  );
}

export default Filters;