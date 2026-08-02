export type InquiryDeliveryState = {
  stored: boolean;
  notificationSent: boolean;
};

export function isInquiryAccepted({ stored, notificationSent }: InquiryDeliveryState) {
  return stored || notificationSent;
}

export type InquiryResponse = {
  success: true;
  acceptedBy: "database" | "notification";
  autoReplySent: boolean;
};

export function buildInquiryResponse(
  state: InquiryDeliveryState & { autoReplySent: boolean }
): InquiryResponse | null {
  if (!isInquiryAccepted(state)) return null;

  return {
    success: true,
    acceptedBy: state.stored ? "database" : "notification",
    autoReplySent: state.autoReplySent,
  };
}
