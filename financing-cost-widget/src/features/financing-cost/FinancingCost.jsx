import React, { useCallback, useEffect, useId, useState } from "react";

import { EventTypes, addEvent, fetchCreditAgreements } from "../../utils/api";
import CreditAgreementsSelect from "./CreditAgreementsSelect";
import FinancingDetailsModal from "./FinancingDetailsModal";

import classes from "./FinancingCost.module.scss";

const FinancingCost = ({ config }) => {
  const [creditAgreements, setCreditAgreements] = useState();
  const [selectedCreditAgreementValue, setSelectedCreditAgreementValue] =
    useState();
  const [financingDetailsVisibility, setFinancingDetailsVisibility] =
    useState(false);
  const headerId = useId();

  useEffect(() => {
    const fetchData = async () => {
      const quantity = config.quantity ?? 1;
      const data = await fetchCreditAgreements(
        Number(+config.price * quantity)
      );
      setCreditAgreements(data);
      if (data && data.length > 0) {
        setSelectedCreditAgreementValue(data[0].instalment_count);
      }
    };

    fetchData();
  }, []);

  const CreditAgreementChangeHandler = useCallback(
    (event) => {
      setSelectedCreditAgreementValue(event.target.value);

      addEvent(EventTypes.simulatorInstalmentChanged, +event.target.value);
    },
    [addEvent]
  );

  const MoreInfoClickHandler = useCallback(() => {
    setFinancingDetailsVisibility(true);
    addEvent(
      EventTypes.simulatorMoreInfoClicked,
      +selectedCreditAgreementValue
    );
  }, [addEvent, selectedCreditAgreementValue]);

  return (
    <>
      <div className={classes["financing-cost"]}>
        <div className={classes["financing-cost__header"]}>
          <h5 id={headerId} className={classes["financing-cost__heading"]}>
            Pagálo en
          </h5>
          <button
            onClick={MoreInfoClickHandler}
            className={classes["financing-cost__action"]}
          >
            más info
          </button>
        </div>
        {creditAgreements && (
          <CreditAgreementsSelect
            value={selectedCreditAgreementValue}
            onChange={CreditAgreementChangeHandler}
            data={creditAgreements}
            labelledBy={headerId}
          />
        )}
      </div>
      {financingDetailsVisibility && (
        <FinancingDetailsModal
          data-testid="financing-details-modal"
          installmentFee={
            creditAgreements?.find(
              (ca) => ca.instalment_count === +selectedCreditAgreementValue
            )?.instalment_fee.string
          }
          onClose={() => {
            setFinancingDetailsVisibility(false);
          }}
        />
      )}
    </>
  );
};

export default FinancingCost;
