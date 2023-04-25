import React from "react";

import Modal from "../../components/UI/Modal";
import FinancingDetails from "./FinancingDetails";

const FinancingDetailsModal = ({ installmentFee, onClose }) => {
  return (
    <Modal onClose={onClose}>
      <FinancingDetails installmentFee={installmentFee} />
    </Modal>
  );
};

export default FinancingDetailsModal;
