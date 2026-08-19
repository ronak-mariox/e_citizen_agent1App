/**
 * Queue — Figma "E-Citizen Mobile App", nodes 675:1519, 739:2, 742:1000 and
 * 742:1465.
 *
 * The four frames are one screen with a different bucket selected, so they are
 * one component: the chips drive the list, and the counts on them come from the
 * list itself.
 *
 * @format
 */

import { useMemo, useState } from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import BottomNav, { BOTTOM_NAV_HEIGHT } from '../../components/BottomNav';
import type { NavTabKey } from '../../components/BottomNav';
import { PRIORITY_STYLES, STATUS_STYLES } from '../../constants/cases';
import { colors, fonts } from '../../theme';
import { QUEUE_CASES, QUEUE_FILTERS, countsByFilter, filterCases } from './data';
import type { QueueCase, QueueFilter } from './data';

type QueueScreenProps = {
  alerts?: number;
  onSelectTab?: (key: NavTabKey) => void;
  onOpenCase?: (entry: QueueCase) => void;
  onOpenFilters?: () => void;
  onRefresh?: () => void;
};

function QueueScreen({
  alerts = 0,
  onSelectTab,
  onOpenCase,
  onOpenFilters,
  onRefresh,
}: QueueScreenProps) {
  const insets = useSafeAreaInsets();
  const [filter, setFilter] = useState<QueueFilter>('assigned');
  const [search, setSearch] = useState('');

  const counts = useMemo(() => countsByFilter(QUEUE_CASES), []);
  const visible = useMemo(
    () => filterCases(QUEUE_CASES, filter, search),
    [filter, search],
  );

  const activeLabel =
    QUEUE_FILTERS.find(entry => entry.key === filter)?.label ?? '';

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="dark-content" />

      {/* ----------------------------------------------------------- header */}
      <View style={[styles.header, { paddingTop: insets.top + 20 }]}>
        <View style={styles.headerRow}>
          <Text style={styles.title}>Queue</Text>

          <View style={styles.headerActions}>
            <Pressable
              style={styles.headerButton}
              onPress={onOpenFilters}
              accessibilityRole="button"
              accessibilityLabel="Filter the queue"
            >
              <Image
                source={require('../../assets/images/icon-filter.png')}
                style={styles.headerIcon}
              />
            </Pressable>

            <Pressable
              style={styles.headerButton}
              onPress={onRefresh}
              accessibilityRole="button"
              accessibilityLabel="Refresh the queue"
            >
              <Image
                source={require('../../assets/images/icon-refresh.png')}
                style={styles.headerIcon}
              />
            </Pressable>
          </View>
        </View>

        <View style={styles.searchRow}>
          <Image
            source={require('../../assets/images/icon-search.png')}
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.search}
            value={search}
            onChangeText={setSearch}
            placeholder="Search by name or ID..."
            placeholderTextColor="rgba(15, 23, 42, 0.5)"
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="search"
            clearButtonMode="while-editing"
          />
        </View>

        {/* Eleven buckets never fit across a phone, so the strip scrolls. The
            frames show chevrons on either side, which is a pointer affordance;
            a swipe is the equivalent here. */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chips}
        >
          {QUEUE_FILTERS.map(entry => {
            const isActive = entry.key === filter;
            const count = counts[entry.key] ?? 0;

            return (
              <Pressable
                key={entry.key}
                style={[styles.chip, isActive ? styles.chipActive : null]}
                onPress={() => setFilter(entry.key)}
                accessibilityRole="button"
                accessibilityState={{ selected: isActive }}
              >
                <Text
                  style={[styles.chipLabel, isActive ? styles.chipLabelActive : null]}
                >
                  {entry.label}
                </Text>

                {/* A bucket with nothing in it carries no pill, the way the
                    frames draw Delayed. */}
                {count > 0 ? (
                  <View
                    style={[styles.chipCount, isActive ? styles.chipCountActive : null]}
                  >
                    <Text
                      style={[
                        styles.chipCountLabel,
                        isActive ? styles.chipCountLabelActive : null,
                      ]}
                    >
                      {count}
                    </Text>
                  </View>
                ) : null}
              </Pressable>
            );
          })}
        </ScrollView>
      </View>

      {/* ------------------------------------------------------------ list */}
      <ScrollView
        style={styles.list}
        contentContainerStyle={[
          styles.listContent,
          { paddingBottom: BOTTOM_NAV_HEIGHT + insets.bottom + 11.25 },
        ]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {visible.map(entry => {
          const priority = PRIORITY_STYLES[entry.priority];
          const status = STATUS_STYLES[entry.status];

          return (
            <Pressable
              key={entry.key}
              style={styles.card}
              onPress={() => onOpenCase?.(entry)}
              accessibilityRole="button"
            >
              <View style={styles.avatar}>
                <Text style={styles.avatarLabel}>{entry.initials}</Text>
              </View>

              <View style={styles.cardBody}>
                <View style={styles.cardHead}>
                  <Text style={styles.name} numberOfLines={1}>
                    {entry.name}
                  </Text>
                  <View
                    style={[
                      styles.priority,
                      {
                        backgroundColor: priority.background,
                        borderColor: priority.border,
                      },
                    ]}
                  >
                    <Text style={[styles.priorityLabel, { color: priority.color }]}>
                      {entry.priority}
                    </Text>
                  </View>
                </View>

                <Text style={styles.reference}>{entry.reference}</Text>

                <View style={styles.tags}>
                  <View style={styles.tag}>
                    <Text style={styles.tagLabel}>{entry.department}</Text>
                  </View>
                  <View style={styles.tag}>
                    <Text style={styles.tagLabel}>{entry.service}</Text>
                  </View>
                </View>

                <View style={styles.cardFoot}>
                  <View
                    style={[
                      styles.status,
                      {
                        backgroundColor: status.background,
                        borderColor: status.border,
                      },
                    ]}
                  >
                    <View style={[styles.statusDot, { backgroundColor: status.dot }]} />
                    <Text style={[styles.statusLabel, { color: status.color }]}>
                      {status.label}
                    </Text>
                  </View>

                  <Text style={styles.amount}>{entry.amount}</Text>
                </View>
              </View>
            </Pressable>
          );
        })}

        {visible.length === 0 ? (
          <Text style={styles.empty}>
            {search.trim()
              ? `Nothing in ${activeLabel} matches “${search.trim()}”.`
              : `No cases in ${activeLabel}.`}
          </Text>
        ) : null}
      </ScrollView>

      <BottomNav active="queue" alerts={alerts} onSelect={onSelectTab} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.surface,
  },

  /* ----------------------------------------------------------- header -- */
  header: {
    paddingHorizontal: 15,
    paddingBottom: 11.25,
    backgroundColor: colors.card,
    borderBottomWidth: 0.701,
    borderBottomColor: colors.hairline,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontFamily: fonts.bold,
    fontSize: 16.875,
    lineHeight: 26.25,
    color: colors.textHeading,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7.5,
  },
  headerButton: {
    width: 29.995,
    height: 29.995,
    borderRadius: 15.25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.hairline,
  },
  headerIcon: {
    width: 14.992,
    height: 14.992,
  },

  searchRow: {
    marginTop: 11.25,
    justifyContent: 'center',
  },
  searchIcon: {
    position: 'absolute',
    left: 11.25,
    width: 14.992,
    height: 14.992,
    zIndex: 1,
    tintColor: colors.textMuted,
  },
  search: {
    height: 37.497,
    paddingLeft: 33.75,
    paddingRight: 15,
    paddingVertical: 0,
    borderRadius: 15.25,
    backgroundColor: colors.surface,
    borderWidth: 0.701,
    borderColor: colors.cardBorder,
    fontFamily: fonts.regular,
    fontSize: 13.125,
    color: colors.textPrimary,
  },

  chips: {
    paddingTop: 11.25,
    paddingBottom: 3.75,
    gap: 7.5,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5.625,
    paddingHorizontal: 11.25,
    paddingVertical: 5.625,
    borderRadius: 999,
    backgroundColor: colors.hairline,
  },
  chipActive: {
    backgroundColor: colors.brandBlue,
    boxShadow:
      '0px 4px 3px rgba(0, 82, 204, 0.25), 0px 2px 2px rgba(0, 82, 204, 0.25)',
  },
  chipLabel: {
    fontFamily: fonts.semiBold,
    fontSize: 11.25,
    lineHeight: 15,
    color: colors.textLabel,
    textAlign: 'center',
  },
  chipLabelActive: {
    color: '#ffffff',
  },
  chipCount: {
    paddingHorizontal: 5.625,
    paddingVertical: 1.875,
    borderRadius: 999,
    backgroundColor: colors.cardBorder,
  },
  chipCountActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  chipCountLabel: {
    fontFamily: fonts.bold,
    fontSize: 10,
    lineHeight: 13.333,
    color: colors.textLabel,
    textAlign: 'center',
  },
  chipCountLabelActive: {
    color: '#ffffff',
  },

  /* ------------------------------------------------------------- list -- */
  list: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 15,
    paddingTop: 11.25,
    gap: 11.25,
  },
  card: {
    flexDirection: 'row',
    gap: 11.25,
    padding: 15,
    borderRadius: 15,
    backgroundColor: colors.card,
    borderWidth: 0.701,
    borderColor: colors.hairline,
    boxShadow:
      '0px 1px 1.5px rgba(0, 0, 0, 0.1), 0px 1px 1px rgba(0, 0, 0, 0.1)',
  },
  avatar: {
    width: 33.741,
    height: 33.741,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.brandBlue,
  },
  avatarLabel: {
    fontFamily: fonts.bold,
    fontSize: 11.25,
    lineHeight: 15,
    color: '#ffffff',
  },
  cardBody: {
    flex: 1,
    minWidth: 0,
  },
  cardHead: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  name: {
    flexShrink: 1,
    fontFamily: fonts.bold,
    fontSize: 13.125,
    lineHeight: 18.75,
    color: colors.textHeading,
  },
  priority: {
    paddingHorizontal: 7.5,
    paddingVertical: 1.875,
    borderRadius: 3.75,
    borderWidth: 0.701,
  },
  priorityLabel: {
    fontFamily: fonts.bold,
    fontSize: 10,
    lineHeight: 15,
  },
  reference: {
    marginTop: 3.75,
    // The frame sets the reference in a mono face, as a machine-readable id.
    fontFamily: 'Menlo',
    fontSize: 10,
    lineHeight: 15,
    color: colors.textMuted,
  },
  tags: {
    marginTop: 5.625,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5.625,
  },
  tag: {
    paddingHorizontal: 7.5,
    paddingVertical: 1.875,
    borderRadius: 999,
    backgroundColor: colors.surface,
    borderWidth: 0.701,
    borderColor: colors.hairline,
  },
  tagLabel: {
    fontFamily: fonts.medium,
    fontSize: 10,
    lineHeight: 15,
    color: colors.textSlate,
  },
  cardFoot: {
    marginTop: 7.5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  status: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3.75,
    paddingHorizontal: 7.5,
    paddingVertical: 1.875,
    borderRadius: 999,
    borderWidth: 0.701,
  },
  statusDot: {
    width: 5.618,
    height: 5.618,
    borderRadius: 999,
  },
  statusLabel: {
    fontFamily: fonts.semiBold,
    fontSize: 10,
    lineHeight: 15,
  },
  amount: {
    fontFamily: fonts.bold,
    fontSize: 10,
    lineHeight: 15,
    color: '#009966',
  },

  empty: {
    paddingTop: 30,
    textAlign: 'center',
    fontFamily: fonts.regular,
    fontSize: 11.25,
    lineHeight: 18,
    color: colors.textMuted,
  },
});

export default QueueScreen;
