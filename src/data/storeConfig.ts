import type { StoreConfig } from "../types/store";

export const storeConfig: StoreConfig = {
  name: "The Açaí Co.",
  shortName: "The Açaí",
  whatsappNumber: "5581982906336",
  address: {
    street: "Rua das Frutas, 123",
    city: "Recife",
    state: "PE",
    zipCode: "51020-000",
  },
  hours: {
    weekdays: "Segunda a sábado, 14h às 22h",
    sunday: "Domingo, 15h às 21h",
  },
  paymentMethods: ["Pix", "Cartão", "Dinheiro"],
};
