// Resend email client wrapper
// All outgoing email goes through this module

import { Resend } from 'resend';
import {
  itemApprovedTemplate,
  itemRejectedTemplate,
  claimSubmittedTemplate,
  claimDecisionTemplate,
} from './templates';

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM = process.env.EMAIL_FROM!;

// Generic send function — all email methods call this
async function sendEmail({
  to, subject, html,
}: { to: string; subject: string; html: string }) {
  try {
    const { error } = await resend.emails.send({ from: FROM, to, subject, html });
    if (error) {
      console.error('[Email] Send failed:', error);
      return { success: false, error };
    }
    return { success: true };
  } catch (err) {
    console.error('[Email] Unexpected error:', err);
    return { success: false, error: err };
  }
}

export async function sendItemApproved(params: {
  to: string; submitterName: string; itemTitle: string; itemId: string;
}) {
  return sendEmail({
    to: params.to,
    subject: `Your item "${params.itemTitle}" has been approved`,
    html: itemApprovedTemplate({
      submitterName: params.submitterName,
      itemTitle: params.itemTitle,
      itemId: params.itemId,
      appUrl: process.env.NEXT_PUBLIC_APP_URL!,
    }),
  });
}

export async function sendItemRejected(params: {
  to: string; submitterName: string; itemTitle: string; reason?: string;
}) {
  return sendEmail({
    to: params.to,
    subject: `Update on your Lost and Found submission`,
    html: itemRejectedTemplate({
      submitterName: params.submitterName,
      itemTitle: params.itemTitle,
      reason: params.reason,
    }),
  });
}

export async function sendClaimSubmitted(params: {
  to: string; claimantName: string; itemTitle: string; itemId: string;
}) {
  return sendEmail({
    to: params.to,
    subject: `Claim received for "${params.itemTitle}"`,
    html: claimSubmittedTemplate({
      claimantName: params.claimantName,
      itemTitle: params.itemTitle,
      itemId: params.itemId,
      appUrl: process.env.NEXT_PUBLIC_APP_URL!,
    }),
  });
}

export async function sendClaimDecision(params: {
  to: string; claimantName: string; itemTitle: string; approved: boolean;
}) {
  return sendEmail({
    to: params.to,
    subject: `Your claim has been ${params.approved ? 'approved' : 'reviewed'}`,
    html: claimDecisionTemplate({
      claimantName: params.claimantName,
      itemTitle: params.itemTitle,
      approved: params.approved,
    }),
  });
}