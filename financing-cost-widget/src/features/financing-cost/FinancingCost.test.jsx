import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";

import FinancingCost from "./FinancingCost";
import {
  EventTypes,
  environment,
  eventPostOptionsCreator,
} from "../../utils/api";

describe("Test Financing Cost Component", () => {
  let originalFetch;

  beforeEach(() => {
    originalFetch = global.fetch;
    global.fetch = jest.fn(() =>
      Promise.resolve({
        status: 200,
        json: () => Promise.resolve(data),
      })
    );
  });

  afterEach(() => {
    global.fetch = originalFetch;
  });

  test("it fetchs credit agreements", async () => {
    render(<FinancingCost config={{ price: 1000 }} />);

    expect(global.fetch).toHaveBeenCalledWith(
      `${environment.baseUrl}/credit_agreements?totalWithTax=1000`
    );
  });

  test("it renders a combobox with the credit agreements", async () => {
    render(<FinancingCost config={{ price: 1000 }} />);

    const combobox = await screen.findByRole("combobox");
    const options = await screen.findAllByRole("option");
    expect(options).toHaveLength(data.length);
  });

  test("it sets the first credit agreement as default option in the combobox", async () => {
    render(<FinancingCost config={{ price: 1000 }} />);

    const options = await screen.findAllByRole("option");
    expect(options[0].selected).toBeTruthy();
  });

  test("it posts new event when selected agreement is changed", async () => {
    render(<FinancingCost config={{ price: 1000 }} />);

    const combobox = await screen.findByRole("combobox");
    const options = await screen.findAllByRole("option");
    global.fetch = jest.fn(() => Promise.resolve({ status: 200 }));
    const selectedInstalment = data[1].instalment_count;
    fireEvent.change(combobox, { target: { value: selectedInstalment } });
    expect(global.fetch).toHaveBeenCalledWith(
      `${environment.baseUrl}/events`,
      eventPostOptionsCreator(
        EventTypes.simulatorInstalmentChanged,
        selectedInstalment
      )
    );
  });

  test("it renders the Financing Details Modal when More Info button is clicked", async () => {
    render(<FinancingCost config={{ price: 1000 }} />);

    const button = await screen.findByRole("button");
    let modal = screen.queryByTestId("financing-details-modal");
    expect(modal).toBeNull();
    fireEvent.click(button);
    modal = screen.queryByTestId("financing-details-modal");
    expect(modal).toBeDefined();
  });

  test("it posts new event when More info is clicked", async () => {
    render(<FinancingCost config={{ price: 1000 }} />);

    const button = await screen.findByRole("button");
    global.fetch = jest.fn(() => Promise.resolve({ status: 200 }));
    fireEvent.click(button);
    expect(global.fetch).toHaveBeenCalledWith(
      `${environment.baseUrl}/events`,
      eventPostOptionsCreator(
        EventTypes.simulatorMoreInfoClicked,
        data[0].instalment_count
      )
    );
  });
});

const dataDetails = {
  apr: { value: 10408, string: "104,08 %" },
  total_with_tax: { value: 15000, string: "150,00 €" },
  cost_of_credit: { value: 900, string: "9,00 €" },
  cost_of_credit_pct: { value: 600, string: "6,00 %" },
  grand_total: { value: 15900, string: "159,00 €" },
  max_financed_amount: { value: 200000, string: "2.000,00 €" },
  instalment_amount: { value: 5000, string: "50,00 €" },
  instalment_fee: { value: 300, string: "3,00 €" },
  instalment_total: { value: 5300, string: "53,00 €" },
};

const data = [
  {
    instalment_count: 3,
    ...dataDetails,
  },
  {
    instalment_count: 6,
    ...dataDetails,
  },
  {
    instalment_count: 12,
    ...dataDetails,
  },
];
