function MovieForm({ title, year, setTitle, setYear, onSubmit, buttonLabel }) {
  return (
    <div>
      <input 
        type="text" 
        placeholder="Title" 
        value={title} 
        onChange={e => setTitle(e.target.value)} 
      />
      <input 
        type="number" 
        placeholder="Year" 
        value={year} 
        onChange={e => setYear(e.target.value)} 
      />
      <button onClick={onSubmit}>{buttonLabel}</button>
    </div>
  );
}

export default MovieForm;
