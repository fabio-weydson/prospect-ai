export function isMobileNumber(phone: string | undefined): boolean {
  if (!phone) return false;
  
  // Remove non-digits
  const digits = phone.replace(/\D/g, "");
  
  // Brazilian mobile numbers are:
  // 11 digits: (DD) 9NNNN-NNNN -> DD matches 11-99, then 9
  // 13 digits with country code: 55 DD 9NNNN-NNNN
  
  if (digits.length === 11) {
    return digits[2] === "9";
  }
  
  if (digits.length === 13 && digits.startsWith("55")) {
    return digits[4] === "9";
  }
  
  // If it's exactly 11 or 13 digits, let's treat it as mobile/whatsapp capable if it could be a number
  // Some regions might not have the extra 9 yet? No, currently all mobile in Brazil have it.
  
  return digits.length === 11 || (digits.length === 13 && digits.startsWith("55"));
}

export function formatWhatsAppLink(phone: string | undefined): string {
  if (!phone) return "";
  
  const digits = phone.replace(/\D/g, "");
  
  // Ensure it has the country code
  let formatted = digits;
  if ((digits.length === 10 || digits.length === 11) && !digits.startsWith("55")) {
    formatted = "55" + digits;
  }
  
  return `https://wa.me/${formatted}`;
}

export function formatPhoneNumber(phone: string | undefined): string {
  if (!phone) return "";
  
  const digits = phone.replace(/\D/g, "");
  
  if (digits.length === 11) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  }
  
  if (digits.length === 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  }
  
  return phone;
}
