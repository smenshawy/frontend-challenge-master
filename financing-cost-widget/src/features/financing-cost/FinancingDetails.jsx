import React from "react";

import fullPayment from "../../assets/full-payment.svg";
import delivery from "../../assets/delivery.svg";
import firstInstallment from "../../assets/first-installment.svg";

import classes from "./FinancingDetails.module.scss";

const steps = [
  {
    id: 1,
    copy: 'Eliges "Fracciona tu pago" al realizar tu pedido y pagas sólo la primera cuota',
    icon: firstInstallment,
  },
  {
    id: 2,
    copy: "Recibes tu pedido",
    icon: delivery,
  },
  {
    id: 3,
    copy: "El reso de pagos se cargaran automaticamenta a tu tarjeta",
    icon: fullPayment,
  },
];

const FinancingDetails = ({ installmentFee }) => {
  return (
    <section className={classes["financing-details"]}>
      <header className={classes["financing-details__header"]}>
        <h2>Fracciona tu pago</h2>
        <h2>SeQura</h2>
      </header>
      <ol className={classes["financing-details__steps"]}>
        {steps.map((step) => (
          <li key={step.id} className={classes["financing-details__step"]}>
            <p>{step.copy}</p>
            <img src={step.icon} width={20} />
          </li>
        ))}
      </ol>
      <footer className={classes["financing-details__footer"]}>
        <span>Asi de simple!</span>
        <p>{`Ademas, en el importa mostrada ya se incluye la cuota unica mensual de ${installmentFee}/mes, por lo que no tendras ninguna sorpresa.`}</p>
      </footer>
    </section>
  );
};

export default FinancingDetails;
