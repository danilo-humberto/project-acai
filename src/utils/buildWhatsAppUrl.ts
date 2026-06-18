export function buildWhatsAppUrl(phoneNumber: string, message: string) {
  const sanitizedPhoneNumber = phoneNumber.replace(/\D/g, '')

  return `https://wa.me/${sanitizedPhoneNumber}?text=${encodeURIComponent(message)}`
}
