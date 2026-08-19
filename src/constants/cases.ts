/**
 * How a case reads wherever it appears — the dashboard's Pending Cases list
 * (Figma 675:1977) and the Queue (675:1519, 739:2, 742:1000, 742:1465).
 *
 * Both screens draw the same card, so the palettes live here rather than in
 * either one: a status must not be amber in one list and grey in the other.
 *
 * @format
 */

export type Priority = 'High' | 'Medium' | 'Low';

export type CaseStatus =
  | 'assigned'
  | 'verificationStarted'
  | 'pendingVerification'
  | 'waitingCustomer'
  | 'queryRaised'
  | 'waitingPayment';

export const PRIORITY_STYLES: Record<
  Priority,
  { background: string; border: string; color: string }
> = {
  High: { background: '#fef2f2', border: '#ffc9c9', color: '#c10007' },
  Medium: { background: '#fffbeb', border: '#fee685', color: '#bb4d00' },
  Low: { background: '#f8fafc', border: '#e2e8f0', color: '#45556c' },
};

/**
 * Every badge is a tinted pill with a solid dot: a 50-weight background, a
 * 200-weight border, a 500-weight dot and 700-weight text from the same hue.
 */
export const STATUS_STYLES: Record<
  CaseStatus,
  { label: string; background: string; border: string; dot: string; color: string }
> = {
  assigned: {
    label: 'Assigned',
    background: '#eff6ff',
    border: '#bedbff',
    dot: '#2b7fff',
    color: '#1447e6',
  },
  verificationStarted: {
    label: 'Verification Started',
    background: '#eef2ff',
    border: '#c6d2ff',
    dot: '#615fff',
    color: '#432dd7',
  },
  pendingVerification: {
    label: 'Pending Verification',
    background: '#fffbeb',
    border: '#fee685',
    dot: '#fe9a00',
    color: '#bb4d00',
  },
  waitingCustomer: {
    label: 'Waiting Customer',
    background: '#fff7ed',
    border: '#ffedd4',
    dot: '#ff6900',
    color: '#ca3500',
  },
  queryRaised: {
    label: 'Query Raised',
    background: '#faf5ff',
    border: '#e9d4ff',
    dot: '#ad46ff',
    color: '#8200db',
  },
  waitingPayment: {
    label: 'Waiting Payment',
    background: '#fff7ed',
    border: '#ffedd4',
    dot: '#ff6900',
    color: '#ca3500',
  },
};
