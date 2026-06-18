export type StoreConfig = {
  name: string
  shortName: string
  whatsappNumber: string
  address: {
    street: string
    city: string
    state: string
    zipCode: string
  }
  hours: {
    weekdays: string
    sunday: string
  }
  paymentMethods: string[]
}
