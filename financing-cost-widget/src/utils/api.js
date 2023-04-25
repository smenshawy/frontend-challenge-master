export const environment = {
  baseUrl: "http://localhost:8080",
};

export const eventPostOptionsCreator = (type, selectedInstalment) => {
  return {
    method: "POST",
    body: JSON.stringify({
      context: "checkoutWidget",
      type: type,
      selectedInstalment: selectedInstalment,
    }),
    headers: { "Content-type": "application/json" },
  };
};

export const fetchCreditAgreements = async (totalWithTax) => {
  if (isNaN(totalWithTax) || totalWithTax <= 0) return [];

  const params = `totalWithTax=${totalWithTax}`;
  const response = await fetch(
    `${environment.baseUrl}/credit_agreements?${params}`
  );

  if (response.status !== 200) {
    // TODO: report error
    return [];
  }
  const data = await response.json();
  return data;
};

export const EventTypes = {
  simulatorInstalmentChanged: "simulatorInstalmentChanged",
  simulatorMoreInfoClicked: "simulatorMoreInfoClicked",
};

export const addEvent = async (type, selectedInstalment) => {
  if (!type || !selectedInstalment || isNaN(selectedInstalment)) return;

  const response = await fetch(
    `${environment.baseUrl}/events`,
    eventPostOptionsCreator(type, selectedInstalment)
  );

  if (response.status !== 200) {
    // TODO: report erro
  }
};
