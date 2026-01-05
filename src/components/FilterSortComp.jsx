export const FilterSortComp = (props) => {
  const { listOfOptions, label, onSelect } = props;

  return (
    <div className="collection-sort">
      <label>{label}</label>
      <select onChange={(event) => onSelect(event.target.value)}>
        {listOfOptions.map((opt) => (
          <option value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
};
