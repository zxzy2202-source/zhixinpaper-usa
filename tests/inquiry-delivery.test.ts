import assert from "node:assert/strict";
import test from "node:test";
import { buildInquiryResponse, isInquiryAccepted } from "../src/lib/inquiry-delivery";

test("rejects when neither database nor notification accepts the inquiry", () => {
  const state = { stored: false, notificationSent: false };
  assert.equal(isInquiryAccepted(state), false);
  assert.equal(buildInquiryResponse({ ...state, autoReplySent: false }), null);
});

test("accepts a database-only delivery", () => {
  assert.deepEqual(
    buildInquiryResponse({ stored: true, notificationSent: false, autoReplySent: false }),
    { success: true, acceptedBy: "database", autoReplySent: false }
  );
});

test("accepts a notification-only delivery", () => {
  assert.deepEqual(
    buildInquiryResponse({ stored: false, notificationSent: true, autoReplySent: false }),
    { success: true, acceptedBy: "notification", autoReplySent: false }
  );
});

test("database remains the acceptance source when both channels succeed", () => {
  assert.deepEqual(
    buildInquiryResponse({ stored: true, notificationSent: true, autoReplySent: true }),
    { success: true, acceptedBy: "database", autoReplySent: true }
  );
});

test("automatic reply status is independent from inquiry acceptance", () => {
  const withoutReply = buildInquiryResponse({ stored: true, notificationSent: false, autoReplySent: false });
  const withReply = buildInquiryResponse({ stored: true, notificationSent: false, autoReplySent: true });

  assert.equal(withoutReply?.success, true);
  assert.equal(withoutReply?.autoReplySent, false);
  assert.equal(withReply?.success, true);
  assert.equal(withReply?.autoReplySent, true);
});
