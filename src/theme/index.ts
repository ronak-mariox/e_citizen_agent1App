/**
 * Design tokens for the Agent 1 app — Figma file "E-Citizen Mobile App".
 *
 * The palette is the citizen app's, extended with the two colours the agent
 * screens add: the navy the hero fades from, and the sky accent its badges use.
 * Keeping the shared values identical means the two apps cannot drift into
 * slightly different blues.
 *
 * @format
 */

export const colors = {
  /** Screen background behind the white form area. */
  surface: '#f8fafc',
  card: '#ffffff',
  cardBorder: '#e2e8f0',

  /** Hairline around every dashboard card, and above the tab bar. */
  hairline: '#f1f5f9',

  textPrimary: '#0f172a',
  /** Card and section headings on the dashboard. */
  textHeading: '#0f172b',
  /** Field labels, the Remember me caption, quick-action captions. */
  textLabel: '#45556c',
  textSecondary: '#64748b',
  /** Chip text and chart legend. */
  textSlate: '#62748e',
  textMuted: '#90a1b9',

  /** Unchecked checkbox outline. */
  checkboxBorder: '#cad5e2',

  brandBlue: '#0052cc',
  brandBlueSoft: '#eff6ff',
  /** The dark end of the hero gradient. */
  brandNavy: '#001a4d',
  /** Badge text and outline on the navy hero. */
  brandSky: '#38bdf8',
  /** Body copy sitting on a brand-blue surface. */
  brandBlueTint: '#8ec5ff',

  danger: '#d4351c',
} as const;

/**
 * PostScript names of the bundled DM Sans faces, matching the file names in
 * `src/assets/fonts` so one string resolves on both platforms.
 *
 * These files are copied into the native projects by `npx react-native-asset`,
 * which has to be run once — and the app rebuilt — before the faces resolve.
 * New font files do not reach a running app through Fast Refresh.
 */
export const fonts = {
  regular: 'DMSans-Regular',
  medium: 'DMSans-Medium',
  semiBold: 'DMSans-SemiBold',
  bold: 'DMSans-Bold',
} as const;
