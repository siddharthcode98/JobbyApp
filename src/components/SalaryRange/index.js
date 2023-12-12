const SalaryRange = (props) => {
  const { salaryItem, updatedSalaryRange } = props;
  const { salaryRangeId, label } = salaryItem;
  const sendSalary = (event) => {
    updatedSalaryRange(event.target.value);
  };
  return (
    <li>
      <input
        id={salaryRangeId}
        type="radio"
        value={salaryRangeId}
        name="user_salary"
        onChange={sendSalary}
      />
      <label htmlFor={salaryRangeId}>{label}</label>
    </li>
  );
};

export default SalaryRange;
