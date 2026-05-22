import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact Us — Get a Quote or Request Samples",
  description:
    "Contact Zhixin Paper for wholesale thermal paper rolls and labels. Get a custom quote, request free samples, or reach our sales team via email, phone, or WhatsApp.",
  keywords: [
    "contact thermal paper manufacturer",
    "thermal paper wholesale inquiry",
    "thermal paper quote request",
    "Zhixin Paper contact",
    "thermal paper supplier contact China",
  ],
};

export default function ContactPage() {
  return <ContactClient />;
}
