// ============================================================
// EMAIL TEMPLATES
// All transactional email HTML templates
// Matches the Lost and Found application visual theme:
// navy (#0C1628) background header, amber (#E8A23C) accents,
// Rubik font stack with system fallbacks
// ============================================================

// ── Shared wrapper ───────────────────────────────────────────

function emailWrapper(content: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Westview Lost and Found</title>
</head>
<body style="
  margin: 0;
  padding: 0;
  background-color: #f1f5f9;
  font-family: 'Rubik', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
">
  <table width="100%" cellpadding="0" cellspacing="0" role="presentation"
         style="background-color: #f1f5f9; padding: 40px 16px;">
    <tr>
      <td align="center">
        <table width="580" cellpadding="0" cellspacing="0" role="presentation"
               style="max-width: 580px; width: 100%;">

          <!-- ── Header ── -->
          <tr>
            <td style="
              background-color: #0C1628;
              border-radius: 6px 6px 0 0;
              padding: 28px 36px;
            ">
              <p style="
                margin: 0 0 4px 0;
                font-size: 10px;
                font-weight: 500;
                letter-spacing: 0.14em;
                text-transform: uppercase;
                color: #E8A23C;
              ">Westview High School</p>
              <p style="
                margin: 0;
                font-size: 20px;
                font-weight: 600;
                color: #ffffff;
                letter-spacing: -0.01em;
              ">Lost &amp; Found</p>
            </td>
          </tr>

          <!-- ── Body ── -->
          <tr>
            <td style="
              background-color: #ffffff;
              padding: 36px;
              border-left: 1px solid #e2e8f0;
              border-right: 1px solid #e2e8f0;
            ">
              ${content}
            </td>
          </tr>

          <!-- ── Footer ── -->
          <tr>
            <td style="
              background-color: #f8fafc;
              border: 1px solid #e2e8f0;
              border-top: none;
              border-radius: 0 0 6px 6px;
              padding: 20px 36px;
            ">
              <p style="
                margin: 0;
                font-size: 11px;
                color: #94a3b8;
                line-height: 1.6;
              ">
                This is an automated message from the Westview High School
                Lost and Found system. Please do not reply to this email.
                For assistance, contact the main office directly.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

// ── Shared UI primitives ──────────────────────────────────────

// Amber call-to-action button
function ctaButton(label: string, url: string): string {
  return `
<table cellpadding="0" cellspacing="0" role="presentation" style="margin: 24px 0;">
  <tr>
    <td style="
      background-color: #E8A23C;
      border-radius: 4px;
    ">
      <a href="${url}"
         style="
           display: inline-block;
           padding: 12px 28px;
           font-size: 13px;
           font-weight: 600;
           color: #0C1628;
           text-decoration: none;
           letter-spacing: 0.01em;
         ">
        ${label}
      </a>
    </td>
  </tr>
</table>`;
}

// Highlighted info box
function infoBox(content: string, type: 'success' | 'warning' | 'error' = 'success'): string {
  const styles = {
    success: { bg: '#f0fdf4', border: '#22c55e', text: '#15803d' },
    warning: { bg: '#fffbeb', border: '#E8A23C', text: '#92400e' },
    error:   { bg: '#fef2f2', border: '#ef4444', text: '#991b1b' },
  };
  const s = styles[type];
  return `
<div style="
  background-color: ${s.bg};
  border-left: 3px solid ${s.border};
  border-radius: 0 4px 4px 0;
  padding: 12px 16px;
  margin: 16px 0;
">
  <p style="margin: 0; font-size: 13px; color: ${s.text}; line-height: 1.5;">
    ${content}
  </p>
</div>`;
}

// Divider line
function divider(): string {
  return `<hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0;" />`;
}

// Item name highlight
function itemName(title: string): string {
  return `<strong style="color: #0C1628;">"${title}"</strong>`;
}

// ── Greeting + body text helpers ─────────────────────────────

function greeting(name: string): string {
  return `<p style="margin: 0 0 6px 0; font-size: 13px; color: #64748b;">
    Hello ${name},
  </p>`;
}

function heading(text: string): string {
  return `<h1 style="
    margin: 0 0 20px 0;
    font-size: 22px;
    font-weight: 600;
    color: #0C1628;
    line-height: 1.2;
    letter-spacing: -0.01em;
  ">${text}</h1>`;
}

function bodyText(text: string): string {
  return `<p style="
    margin: 0 0 16px 0;
    font-size: 14px;
    color: #475569;
    line-height: 1.7;
  ">${text}</p>`;
}

function mutedText(text: string): string {
  return `<p style="
    margin: 0;
    font-size: 12px;
    color: #94a3b8;
    line-height: 1.6;
  ">${text}</p>`;
}

// ── Templates ────────────────────────────────────────────────

interface ItemApprovedProps {
  submitterName: string;
  itemTitle: string;
  itemId: string;
  appUrl: string;
}

interface ItemRejectedProps {
  submitterName: string;
  itemTitle: string;
  reason?: string;
}

interface ClaimSubmittedProps {
  claimantName: string;
  itemTitle: string;
  itemId: string;
  appUrl: string;
}

interface ClaimDecisionProps {
  claimantName: string;
  itemTitle: string;
  approved: boolean;
}

export function itemApprovedTemplate({
  submitterName,
  itemTitle,
  itemId,
  appUrl,
}: ItemApprovedProps): string {
  return emailWrapper(`
    ${greeting(submitterName)}
    ${heading('Your submission has been approved')}
    ${bodyText(
      `The item ${itemName(itemTitle)} you submitted to the Lost and Found
       has been reviewed and approved by a staff member. It is now publicly
       listed so the rightful owner can find it.`
    )}
    ${infoBox('Your item is now visible to all students and staff.', 'success')}
    ${ctaButton('View Listing', `${appUrl}/items/${itemId}`)}
    ${divider()}
    ${mutedText(
      `Items are held for 30 days. If no claim is made, the item will be removed from the listing.
       Thank you for helping reunite lost items with their owners.`
    )}
  `);
}

export function itemRejectedTemplate({
  submitterName,
  itemTitle,
  reason,
}: ItemRejectedProps): string {
  return emailWrapper(`
    ${greeting(submitterName)}
    ${heading('Update on your submission')}
    ${bodyText(
      `Your submission for ${itemName(itemTitle)} has been reviewed.
       Unfortunately, it was not approved for listing at this time.`
    )}
    ${reason
      ? infoBox(`<strong>Reason:</strong> ${reason}`, 'error')
      : ''
    }
    ${divider()}
    ${bodyText(
      `If you believe this decision was made in error, or if you have
       additional information about the item, please visit the main office
       during school hours.`
    )}
    ${mutedText('Office hours: Monday through Friday, 7:30am to 4:00pm.')}
  `);
}

export function claimSubmittedTemplate({
  claimantName,
  itemTitle,
  itemId,
  appUrl,
}: ClaimSubmittedProps): string {
  return emailWrapper(`
    ${greeting(claimantName)}
    ${heading('Your claim request has been received')}
    ${bodyText(
      `We have received your claim request for ${itemName(itemTitle)}.
       A staff member will review your claim and verify the identifying
       information you provided.`
    )}
    ${infoBox(
      'You will receive another email once your claim has been reviewed. This typically takes 1 to 2 school days.',
      'warning'
    )}
    ${ctaButton('View Item', `${appUrl}/items/${itemId}`)}
    ${divider()}
    ${bodyText(
      `Please keep this email as your claim reference. If you need to
       follow up, contact the main office and mention the item name and
       the date you submitted this claim.`
    )}
    ${mutedText(
      `Do not visit the office to collect your item until you receive
       an approval email. Items will only be released to verified claimants
       with valid school ID.`
    )}
  `);
}

export function claimDecisionTemplate({
  claimantName,
  itemTitle,
  approved,
}: ClaimDecisionProps): string {
  if (approved) {
    return emailWrapper(`
      ${greeting(claimantName)}
      ${heading('Your claim has been approved')}
      ${infoBox('Great news — your claim has been verified and approved.', 'success')}
      ${bodyText(
        `Your claim for ${itemName(itemTitle)} has been approved by a
         staff member. You may now collect your item from the main office.`
      )}
      ${bodyText(
        `Please bring a valid school ID when you come to collect the item.
         Office hours are Monday through Friday, 7:30am to 4:00pm.`
      )}
      ${divider()}
      ${mutedText(
        `If you are unable to collect the item within 5 school days,
         please contact the office to make alternative arrangements.`
      )}
    `);
  }

  return emailWrapper(`
    ${greeting(claimantName)}
    ${heading('Update on your claim')}
    ${bodyText(
      `We have reviewed your claim for ${itemName(itemTitle)}.
       Unfortunately, your claim was not approved at this time.`
    )}
    ${infoBox(
      'If you believe this is an error, please visit the main office with additional proof of ownership.',
      'error'
    )}
    ${divider()}
    ${bodyText(
      `Acceptable proof of ownership may include a description of the
       item contents, a receipt or photo showing you with the item,
       or a unique identifying feature not visible in the listing photo.`
    )}
    ${mutedText('Office hours: Monday through Friday, 7:30am to 4:00pm.')}
  `);
}