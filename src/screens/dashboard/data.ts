/**
 * Dashboard content — Figma node 675:1977. Placeholder data standing in for
 * the API; the shapes match what the screen renders.
 *
 * @format
 */

import type { ImageSourcePropType } from 'react-native';

export const AGENT = {
  greeting: 'Good Morning,',
  name: 'Ravi Kumar',
  employeeId: 'ECZ-A1-0042',
  department: 'Revenue & Registration',
  /** Unread alerts, shown on the bell and on the Alerts tab. */
  alerts: 3,
};

/** The three glass tiles across the hero. */
export const HERO_STATS: {
  key: string;
  value: string;
  label: string;
  icon: ImageSourcePropType;
}[] = [
  {
    key: 'today',
    value: '8',
    label: "Today's Cases",
    icon: require('../../assets/images/icon-cases.png'),
  },
  {
    key: 'pending',
    value: '5',
    label: 'Pending',
    icon: require('../../assets/images/icon-clock.png'),
  },
  {
    key: 'completed',
    value: '3',
    label: 'Completed',
    icon: require('../../assets/images/icon-check-circle.png'),
  },
];

export const SUMMARY_DATE = '02 Jul 2024';

/** Today's Summary — each tile is tinted with its own hue. */
export const SUMMARY_TILES: {
  key: string;
  value: string;
  label: string;
  icon: ImageSourcePropType;
  background: string;
  color: string;
}[] = [
  {
    key: 'assigned',
    value: '2',
    label: 'New Assigned',
    icon: require('../../assets/images/icon-inbox.png'),
    background: '#eff6ff',
    color: '#1447e6',
  },
  {
    key: 'queries',
    value: '1',
    label: 'Queries Raised',
    icon: require('../../assets/images/icon-message.png'),
    background: '#faf5ff',
    color: '#8200db',
  },
  {
    key: 'forwarded',
    value: '1',
    label: 'Forwarded',
    icon: require('../../assets/images/icon-send.png'),
    background: '#f0fdfa',
    color: '#00786f',
  },
];

export const QUICK_ACTIONS: {
  key: string;
  label: string;
  icon: ImageSourcePropType;
  background: string;
}[] = [
  {
    key: 'queue',
    label: 'My Queue',
    icon: require('../../assets/images/icon-queue.png'),
    background: '#eff6ff',
  },
  {
    key: 'search',
    label: 'Search',
    icon: require('../../assets/images/icon-search.png'),
    background: '#eef2ff',
  },
  {
    key: 'reports',
    label: 'Reports',
    icon: require('../../assets/images/icon-reports.png'),
    background: '#f5f3ff',
  },
  {
    key: 'customers',
    label: 'Customers',
    icon: require('../../assets/images/icon-customers.png'),
    background: '#f0fdfa',
  },
];

/** Tallest bar in the frame, and therefore the plot's height in points. */
export const CHART_HEIGHT = 96;

/**
 * Performance Overview.
 *
 * The frame draws the bars but gives no axis and no numbers, so what is known
 * is their height relative to the tallest one. Stored as those fractions
 * rather than as invented case counts — when the API supplies real figures,
 * this becomes a division and nothing else changes.
 */
export const PERFORMANCE_PERIOD = 'This Month';

export const PERFORMANCE: {
  month: string;
  completed: number;
  assigned: number;
}[] = [
  { month: 'Apr', completed: 0.813, assigned: 0.885 },
  { month: 'May', completed: 0.917, assigned: 1 },
  { month: 'Jun', completed: 0.76, assigned: 0.833 },
  { month: 'Jul', completed: 0.406, assigned: 0.479 },
];

export const PAYMENTS: {
  key: string;
  amount: string;
  label: string;
  icon: ImageSourcePropType;
  background: string;
  border: string;
  color: string;
}[] = [
  {
    key: 'pending',
    amount: '₹9,500',
    label: 'Pending',
    icon: require('../../assets/images/icon-pay-pending.png'),
    background: '#fff7ed',
    border: '#ffedd4',
    color: '#ca3500',
  },
  {
    key: 'received',
    amount: '₹7,200',
    label: 'Received',
    icon: require('../../assets/images/icon-pay-received.png'),
    background: '#eff6ff',
    border: '#dbeafe',
    color: '#1447e6',
  },
  {
    key: 'verified',
    amount: '₹45,800',
    label: 'Verified',
    icon: require('../../assets/images/icon-pay-verified.png'),
    background: '#ecfdf5',
    border: '#d0fae5',
    color: '#007a55',
  },
];

export type Priority = 'High' | 'Medium' | 'Low';
export type CaseStatus = 'assigned' | 'pendingVerification';

/** Badge palette per priority (nodes 675:2230, 675:2264). */
export const PRIORITY_STYLES: Record<
  Priority,
  { background: string; border: string; color: string }
> = {
  High: { background: '#fef2f2', border: '#ffc9c9', color: '#c10007' },
  Medium: { background: '#fffbeb', border: '#fee685', color: '#bb4d00' },
  // Not drawn in the frame; follows the neutral chip the same cards use.
  Low: { background: '#f8fafc', border: '#e2e8f0', color: '#62748e' },
};

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
  pendingVerification: {
    label: 'Pending Verification',
    background: '#fffbeb',
    border: '#fee685',
    dot: '#fe9a00',
    color: '#bb4d00',
  },
};

export type PendingCase = {
  key: string;
  name: string;
  /** Drawn on the avatar; derived here so the card stays presentational. */
  initials: string;
  reference: string;
  department: string;
  service: string;
  priority: Priority;
  status: CaseStatus;
};

export const PENDING_CASES: PendingCase[] = [
  {
    key: 'c1',
    name: 'Rajesh Kumar',
    initials: 'RK',
    reference: 'APP-2024-00418',
    department: 'Revenue',
    service: 'Property Tax',
    priority: 'High',
    status: 'assigned',
  },
  {
    key: 'c2',
    name: 'Deepak Mishra',
    initials: 'DM',
    reference: 'APP-2024-00423',
    department: 'Revenue',
    service: 'Property Tax',
    priority: 'Medium',
    status: 'assigned',
  },
  {
    key: 'c3',
    name: 'Anand Verma',
    initials: 'AV',
    reference: 'APP-2024-00420',
    department: 'Revenue',
    service: 'Encumbrance Cert',
    priority: 'Medium',
    status: 'pendingVerification',
  },
];

export type ActivityEntry = {
  key: string;
  title: string;
  time: string;
  icon: ImageSourcePropType;
  tile: string;
  /** Unread rows carry a blue dot and a blue-tinted border. */
  unread: boolean;
};

export const RECENT_ACTIVITY: ActivityEntry[] = [
  {
    key: 'a1',
    title: 'Payment Received',
    time: '5m ago',
    icon: require('../../assets/images/icon-activity-payment.png'),
    tile: '#d0fae5',
    unread: true,
  },
  {
    key: 'a2',
    title: 'Customer Re-uploaded Documents',
    time: '22m ago',
    icon: require('../../assets/images/icon-activity-bell.png'),
    tile: '#dbeafe',
    unread: true,
  },
  {
    key: 'a3',
    title: 'Re-Payment Requested',
    time: '2h ago',
    icon: require('../../assets/images/icon-activity-bell.png'),
    tile: '#dbeafe',
    unread: true,
  },
  {
    key: 'a4',
    title: 'Document Verified Successfully',
    time: '2h ago',
    icon: require('../../assets/images/icon-activity-bell.png'),
    tile: '#dbeafe',
    unread: false,
  },
];
