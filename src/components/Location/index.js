const Location = (props) => {
  const { details, updateLocation } = props;
  const { locationId, label } = details;
  return (
    <li>
      <input
        id={locationId}
        type="checkbox"
        value={label}
        onChange={(event) => updateLocation(event.target.value)}
      />
      <label htmlFor={locationId}>{label}</label>
    </li>
  );
};

export default Location;
