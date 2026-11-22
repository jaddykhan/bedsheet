import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
  return `Rs. ${price.toLocaleString("en-PK")}`;
}

export function isValidPakistaniPhone(phone: string): boolean {
  // Accepts: 03001234567, 0300-1234567, +923001234567, 923001234567
  const cleaned = phone.replace(/[\s\-\(\)]/g, "");
  const pakPhoneRegex = /^((\+92)|(92)|0)?3[0-9]{9}$/;
  return pakPhoneRegex.test(cleaned);
}

export const PAKISTAN_CITIES = [
  "Karachi",
  "Lahore",
  "Islamabad",
  "Rawalpindi",
  "Faisalabad",
  "Multan",
  "Peshawar",
  "Quetta",
  "Sialkot",
  "Gujranwala",
  "Hyderabad",
  "Bahawalpur",
  "Sargodha",
  "Abbottabad",
  "Sukkur",
  "Larkana",
  "Sheikhupura",
  "Jhelum",
  "Sahiwal",
  "Rahim Yar Khan",
  "Wah Cantt",
  "Mardan",
  "Kasur",
  "Dera Ghazi Khan",
  "Mirpur (AJK)",
  "Muzaffarabad",
  "Other City",
];

export const PAKISTAN_PROVINCES = [
  "Punjab",
  "Sindh",
  "Khyber Pakhtunkhwa",
  "Balochistan",
  "Islamabad Capital Territory",
  "Azad Jammu & Kashmir",
  "Gilgit-Baltistan",
];
