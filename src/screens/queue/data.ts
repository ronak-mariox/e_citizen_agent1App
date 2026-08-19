/**
 * Queue content — Figma nodes 675:1519 (Assigned), 739:2 (Pending),
 * 742:1000 (Waiting Customer) and 742:1465 (Waiting Payment). Placeholder data
 * standing in for the API; the shapes match what the screen renders.
 *
 * @format
 */

import type { CaseStatus, Priority } from '../../constants/cases';

/**
 * The buckets along the filter strip.
 *
 * A bucket is where a case sits in the workflow; the badge on the card is its
 * status. They usually agree, but not always — a query raised while waiting on
 * the customer keeps the case in Waiting Customer and shows Query Raised — so
 * they are separate fields.
 */
export type QueueFilter =
  | 'assigned'
  | 'pending'
  | 'waitingCustomer'
  | 'waitingPayment'
  | 'paymentVerification'
  | 'sentToAgent2'
  | 'govProcessing'
  | 'completed'
  | 'delayed'
  | 'rejected'
  | 'rePayment';

export const QUEUE_FILTERS: { key: QueueFilter; label: string }[] = [
  { key: 'assigned', label: 'Assigned' },
  { key: 'pending', label: 'Pending' },
  { key: 'waitingCustomer', label: 'Waiting Customer' },
  { key: 'waitingPayment', label: 'Waiting Payment' },
  { key: 'paymentVerification', label: 'Payment Verification' },
  { key: 'sentToAgent2', label: 'Sent to Agent 2' },
  { key: 'govProcessing', label: 'Gov Processing' },
  { key: 'completed', label: 'Completed' },
  { key: 'delayed', label: 'Delayed' },
  { key: 'rejected', label: 'Rejected' },
  { key: 'rePayment', label: 'Re-Payment' },
];

export type QueueCase = {
  key: string;
  name: string;
  /** Drawn on the avatar; kept with the record so the card stays presentational. */
  initials: string;
  reference: string;
  department: string;
  service: string;
  priority: Priority;
  status: CaseStatus;
  filter: QueueFilter;
  /** Already formatted — the fee the citizen owes on this application. */
  amount: string;
};

/**
 * The cases the four frames draw, across the four buckets they show.
 *
 * The other seven buckets carry counts in the frames but no cards, so they are
 * left empty rather than filled with invented people. The chip counts below are
 * derived from this list, so what a chip promises is always what opening it
 * shows.
 */
export const QUEUE_CASES: QueueCase[] = [
  {
    key: 'q1',
    name: 'Rajesh Kumar',
    initials: 'RK',
    reference: 'APP-2024-00418',
    department: 'Revenue',
    service: 'Property Tax',
    priority: 'High',
    status: 'assigned',
    filter: 'assigned',
    amount: '₹4,500',
  },
  {
    key: 'q2',
    name: 'Deepak Mishra',
    initials: 'DM',
    reference: 'APP-2024-00423',
    department: 'Revenue',
    service: 'Property Tax',
    priority: 'Medium',
    status: 'assigned',
    filter: 'assigned',
    amount: '₹3,200',
  },
  {
    key: 'q3',
    name: 'Anand Verma',
    initials: 'AV',
    reference: 'APP-2024-00420',
    department: 'Revenue',
    service: 'Encumbrance Cert',
    priority: 'Medium',
    status: 'pendingVerification',
    filter: 'pending',
    amount: '₹2,800',
  },
  {
    key: 'q4',
    name: 'Arun Joshi',
    initials: 'AJ',
    reference: 'APP-2024-00426',
    department: 'Urban Dev',
    service: 'Zone Certificate',
    priority: 'High',
    status: 'verificationStarted',
    filter: 'pending',
    amount: '₹6,000',
  },
  {
    key: 'q5',
    name: 'Nisha Gupta',
    initials: 'NG',
    reference: 'APP-2024-00427',
    department: 'Registration',
    service: 'Sale Deed',
    priority: 'Low',
    status: 'pendingVerification',
    filter: 'pending',
    amount: '₹8,500',
  },
  {
    key: 'q6',
    name: 'Priya Sharma',
    initials: 'PS',
    reference: 'APP-2024-00419',
    department: 'Urban Dev',
    service: 'Building Plan',
    priority: 'High',
    status: 'waitingCustomer',
    filter: 'waitingCustomer',
    amount: '₹12,000',
  },
  {
    key: 'q7',
    name: 'Sunita Patel',
    initials: 'SP',
    reference: 'APP-2024-00421',
    department: 'Registration',
    service: 'Mutation',
    priority: 'Low',
    status: 'queryRaised',
    filter: 'waitingCustomer',
    amount: '₹1,800',
  },
  {
    key: 'q8',
    name: 'Vikram Singh',
    initials: 'VS',
    reference: 'APP-2024-00428',
    department: 'Revenue',
    service: 'Land Records',
    priority: 'High',
    status: 'waitingPayment',
    filter: 'waitingPayment',
    amount: '₹9,500',
  },
];

/** How many cases sit in each bucket, counted rather than written down. */
export const countsByFilter = (cases: QueueCase[]) =>
  cases.reduce<Partial<Record<QueueFilter, number>>>((tally, entry) => {
    tally[entry.filter] = (tally[entry.filter] ?? 0) + 1;
    return tally;
  }, {});

/**
 * The cases a bucket shows, narrowed by the search box.
 *
 * The box says "name or ID", so it searches exactly those two — matching the
 * department or the fee would surprise someone who typed a name.
 */
export const filterCases = (
  cases: QueueCase[],
  filter: QueueFilter,
  search: string,
) => {
  const term = search.trim().toLowerCase();

  return cases.filter(entry => {
    if (entry.filter !== filter) return false;
    if (!term) return true;
    return (
      entry.name.toLowerCase().includes(term) ||
      entry.reference.toLowerCase().includes(term)
    );
  });
};
