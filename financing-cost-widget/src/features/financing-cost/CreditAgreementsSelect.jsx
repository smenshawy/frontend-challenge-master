import React from "react";

const CreditAgreementsSelect = ({ value, onChange, data, labelledBy }) => {
  return (
    <select value={value} onChange={onChange} aria-labelledby={labelledBy}>
      {data.map((ca) => (
        <option key={ca.instalment_count} value={ca.instalment_count}>
          {`${ca.instalment_count} coutas de ${ca.instalment_total.string}/mes`}
        </option>
      ))}
    </select>
  );
};

export default CreditAgreementsSelect;
