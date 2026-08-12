/**
 * The five-tab bar at the foot of the app — Figma node 675:2396.
 *
 * @format
 */

import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, fonts } from '../theme';

export type NavTabKey = 'home' | 'queue' | 'customers' | 'alerts' | 'settings';

const TABS: { key: NavTabKey; label: string; icon: number }[] = [
  {
    key: 'home',
    label: 'Home',
    icon: require('../assets/images/icon-nav-home.png'),
  },
  {
    key: 'queue',
    label: 'Queue',
    icon: require('../assets/images/icon-nav-queue.png'),
  },
  {
    key: 'customers',
    label: 'Customers',
    icon: require('../assets/images/icon-nav-customers.png'),
  },
  {
    key: 'alerts',
    label: 'Alerts',
    icon: require('../assets/images/icon-nav-alerts.png'),
  },
  {
    key: 'settings',
    label: 'Settings',
    icon: require('../assets/images/icon-nav-settings.png'),
  },
];

/** Height of the bar itself, before the home-indicator inset is added. */
export const BOTTOM_NAV_HEIGHT = 79.75;

type BottomNavProps = {
  active: NavTabKey;
  /** Unread count on the Alerts tab; hidden at zero. */
  alerts?: number;
  onSelect?: (key: NavTabKey) => void;
};

function BottomNav({ active, alerts = 0, onSelect }: BottomNavProps) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.bar,
        {
          height: BOTTOM_NAV_HEIGHT + insets.bottom,
          paddingBottom: insets.bottom,
        },
      ]}
    >
      {TABS.map(tab => {
        const isActive = tab.key === active;

        return (
          <Pressable
            key={tab.key}
            style={styles.tab}
            onPress={() => onSelect?.(tab.key)}
            accessibilityRole="tab"
            accessibilityState={{ selected: isActive }}
          >
            <View style={[styles.tile, isActive ? styles.tileActive : null]}>
              {/* One export per tab, recoloured here rather than shipped twice:
                  white on the active tile, muted otherwise. */}
              <Image
                source={tab.icon}
                style={[styles.icon, isActive ? styles.iconActive : null]}
              />

              {tab.key === 'alerts' && alerts > 0 ? (
                <View style={styles.badge}>
                  <Text style={styles.badgeLabel}>{alerts}</Text>
                </View>
              ) : null}
            </View>

            <Text style={[styles.label, isActive ? styles.labelActive : null]}>
              {tab.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingTop: 7.5,
    backgroundColor: colors.card,
    borderTopWidth: 1,
    borderTopColor: colors.hairline,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    gap: 3.75,
    paddingVertical: 7.5,
  },
  tile: {
    width: 30,
    height: 30,
    borderRadius: 15.25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tileActive: {
    backgroundColor: colors.brandBlue,
  },
  icon: {
    width: 16.875,
    height: 16.875,
    tintColor: colors.textMuted,
  },
  iconActive: {
    tintColor: '#ffffff',
  },
  badge: {
    position: 'absolute',
    top: -1.88,
    left: 22.5,
    minWidth: 13.125,
    height: 13.125,
    paddingHorizontal: 2,
    borderRadius: 999,
    backgroundColor: colors.danger,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeLabel: {
    fontFamily: fonts.bold,
    fontSize: 8,
    lineHeight: 12,
    color: '#ffffff',
    textAlign: 'center',
  },
  label: {
    fontFamily: fonts.semiBold,
    fontSize: 10,
    lineHeight: 15,
    color: colors.textMuted,
    textAlign: 'center',
  },
  labelActive: {
    color: colors.brandBlue,
  },
});

export default BottomNav;
