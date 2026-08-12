/**
 * Agent 1 dashboard — Figma "E-Citizen Mobile App", node 675:1977.
 *
 * @format
 */

import type { ReactNode } from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import BottomNav, { BOTTOM_NAV_HEIGHT } from '../../components/BottomNav';
import type { NavTabKey } from '../../components/BottomNav';
import { colors, fonts } from '../../theme';
import {
  AGENT,
  CHART_HEIGHT,
  HERO_STATS,
  PAYMENTS,
  PENDING_CASES,
  PERFORMANCE,
  PERFORMANCE_PERIOD,
  PRIORITY_STYLES,
  QUICK_ACTIONS,
  RECENT_ACTIVITY,
  STATUS_STYLES,
  SUMMARY_DATE,
  SUMMARY_TILES,
} from './data';
import type { PendingCase } from './data';

type DashboardScreenProps = {
  onSelectTab?: (key: NavTabKey) => void;
  onOpenMenu?: () => void;
  onOpenAlerts?: () => void;
  onQuickAction?: (key: string) => void;
  onOpenCase?: (entry: PendingCase) => void;
  onViewAllCases?: () => void;
};

/** Card shell: white, hairline border, the same soft double shadow throughout. */
function Card({ children }: { children: ReactNode }) {
  return <View style={styles.card}>{children}</View>;
}

/** Section heading, with an optional link on the right. */
function SectionHead({
  title,
  action,
  onAction,
  muted = false,
}: {
  title: string;
  action?: string;
  onAction?: () => void;
  /** The date beside Today's Summary is grey; the links are brand blue. */
  muted?: boolean;
}) {
  return (
    <View style={styles.sectionHead}>
      <Text style={styles.sectionTitle}>{title}</Text>

      {action ? (
        <Pressable onPress={onAction} hitSlop={8} accessibilityRole="button">
          <Text style={muted ? styles.sectionDate : styles.sectionAction}>
            {action}
          </Text>
        </Pressable>
      ) : null}
    </View>
  );
}

function DashboardScreen({
  onSelectTab,
  onOpenMenu,
  onOpenAlerts,
  onQuickAction,
  onOpenCase,
  onViewAllCases,
}: DashboardScreenProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="light-content" />

      <ScrollView
        contentContainerStyle={{
          paddingBottom: BOTTOM_NAV_HEIGHT + insets.bottom + 7.5,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* --------------------------------------------------------- hero */}
        <View style={[styles.hero, { paddingTop: insets.top + 20 }]}>
          <View style={styles.discTop} />
          <View style={styles.discBottom} />

          <View style={styles.heroBar}>
            <Pressable
              style={styles.heroButton}
              onPress={onOpenMenu}
              accessibilityRole="button"
              accessibilityLabel="Open menu"
            >
              <Image
                source={require('../../assets/images/icon-menu.png')}
                style={styles.heroButtonIcon}
              />
            </Pressable>

            <Pressable
              style={styles.heroButton}
              onPress={onOpenAlerts}
              accessibilityRole="button"
              accessibilityLabel={`Alerts, ${AGENT.alerts} unread`}
            >
              <Image
                source={require('../../assets/images/icon-bell.png')}
                style={styles.heroButtonIcon}
              />
              {AGENT.alerts > 0 ? (
                <View style={styles.heroBadge}>
                  <Text style={styles.heroBadgeLabel}>{AGENT.alerts}</Text>
                </View>
              ) : null}
            </Pressable>
          </View>

          <Text style={styles.greeting}>{AGENT.greeting}</Text>
          <Text style={styles.name}>{AGENT.name}</Text>
          <Text style={styles.posting}>
            {AGENT.employeeId} · {AGENT.department}
          </Text>

          <View style={styles.heroStats}>
            {HERO_STATS.map(stat => (
              <View key={stat.key} style={styles.heroStat}>
                <Image source={stat.icon} style={styles.heroStatIcon} />
                <Text style={styles.heroStatValue}>{stat.value}</Text>
                <Text style={styles.heroStatLabel}>{stat.label}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.body}>
          {/* --------------------------------------------- today's summary */}
          <Card>
            <SectionHead title="Today's Summary" action={SUMMARY_DATE} muted />

            <View style={styles.summaryGrid}>
              {SUMMARY_TILES.map(tile => (
                <View
                  key={tile.key}
                  style={[styles.summaryTile, { backgroundColor: tile.background }]}
                >
                  <Image
                    source={tile.icon}
                    style={[styles.summaryIcon, { tintColor: tile.color }]}
                  />
                  <View style={styles.summaryText}>
                    <Text style={[styles.summaryValue, { color: tile.color }]}>
                      {tile.value}
                    </Text>
                    <Text style={[styles.summaryLabel, { color: tile.color }]}>
                      {tile.label}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </Card>

          {/* --------------------------------------------- quick actions */}
          <View style={styles.section}>
            <SectionHead title="Quick Actions" />

            <View style={styles.actionRow}>
              {QUICK_ACTIONS.map(action => (
                <Pressable
                  key={action.key}
                  style={styles.actionCard}
                  onPress={() => onQuickAction?.(action.key)}
                  accessibilityRole="button"
                >
                  <View
                    style={[styles.actionTile, { backgroundColor: action.background }]}
                  >
                    <Image source={action.icon} style={styles.actionIcon} />
                  </View>
                  <Text style={styles.actionLabel} numberOfLines={1}>
                    {action.label}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>

          {/* ---------------------------------------- performance overview */}
          <View style={styles.section}>
            <Card>
              <SectionHead
                title="Performance Overview"
                action={PERFORMANCE_PERIOD}
              />

              {/* Bars are drawn rather than imported: the frame exports them as
                  eight separate slices, and two rounded rectangles per month is
                  both smaller and something real numbers can drive later. */}
              <View style={styles.chart}>
                {PERFORMANCE.map(month => (
                  <View key={month.month} style={styles.chartGroup}>
                    <View style={styles.chartBars}>
                      <View
                        style={[
                          styles.bar,
                          styles.barCompleted,
                          { height: month.completed * CHART_HEIGHT },
                        ]}
                      />
                      <View
                        style={[
                          styles.bar,
                          styles.barAssigned,
                          { height: month.assigned * CHART_HEIGHT },
                        ]}
                      />
                    </View>
                    <Text style={styles.chartLabel}>{month.month}</Text>
                  </View>
                ))}
              </View>

              <View style={styles.legend}>
                <View style={styles.legendItem}>
                  <View style={[styles.legendSwatch, styles.barCompleted]} />
                  <Text style={styles.legendLabel}>Completed</Text>
                </View>
                <View style={styles.legendItem}>
                  <View style={[styles.legendSwatch, styles.barAssigned]} />
                  <Text style={styles.legendLabel}>Assigned</Text>
                </View>
              </View>
            </Card>
          </View>

          {/* --------------------------------------------- payment status */}
          <View style={styles.section}>
            <Card>
              <SectionHead title="Payment Status" />

              <View style={styles.paymentRow}>
                {PAYMENTS.map(payment => (
                  <View
                    key={payment.key}
                    style={[
                      styles.paymentTile,
                      {
                        backgroundColor: payment.background,
                        borderColor: payment.border,
                      },
                    ]}
                  >
                    <Image
                      source={payment.icon}
                      style={[styles.paymentIcon, { tintColor: payment.color }]}
                    />
                    <Text style={[styles.paymentAmount, { color: payment.color }]}>
                      {payment.amount}
                    </Text>
                    <Text style={[styles.paymentLabel, { color: payment.color }]}>
                      {payment.label}
                    </Text>
                  </View>
                ))}
              </View>
            </Card>
          </View>

          {/* --------------------------------------------- pending cases */}
          <View style={styles.section}>
            <SectionHead
              title="Pending Cases"
              action="View All →"
              onAction={onViewAllCases}
            />

            <View style={styles.caseList}>
              {PENDING_CASES.map(entry => {
                const priority = PRIORITY_STYLES[entry.priority];
                const status = STATUS_STYLES[entry.status];

                return (
                  <Pressable
                    key={entry.key}
                    style={styles.caseCard}
                    onPress={() => onOpenCase?.(entry)}
                    accessibilityRole="button"
                  >
                    <View style={styles.avatar}>
                      <Text style={styles.avatarLabel}>{entry.initials}</Text>
                    </View>

                    <View style={styles.caseBody}>
                      <View style={styles.caseHead}>
                        <Text style={styles.caseName} numberOfLines={1}>
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

                      <Text style={styles.caseReference}>{entry.reference}</Text>

                      <View style={styles.caseMeta}>
                        <View style={styles.departmentChip}>
                          <Text style={styles.metaLabel}>{entry.department}</Text>
                        </View>
                        <Text style={styles.metaLabel}>·</Text>
                        <Text style={styles.metaLabel}>{entry.service}</Text>
                      </View>

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
                    </View>
                  </Pressable>
                );
              })}
            </View>
          </View>

          {/* -------------------------------------------- recent activity */}
          <View style={styles.section}>
            <SectionHead title="Recent Activity" />

            <View style={styles.activityList}>
              {RECENT_ACTIVITY.map(entry => (
                <View
                  key={entry.key}
                  style={[
                    styles.activityRow,
                    entry.unread ? styles.activityUnread : null,
                  ]}
                >
                  <View style={[styles.activityTile, { backgroundColor: entry.tile }]}>
                    <Image source={entry.icon} style={styles.activityIcon} />
                  </View>

                  <View style={styles.activityText}>
                    <Text style={styles.activityTitle}>{entry.title}</Text>
                    <Text style={styles.activityTime}>{entry.time}</Text>
                  </View>

                  {entry.unread ? <View style={styles.activityDot} /> : null}
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>

      <BottomNav active="home" alerts={AGENT.alerts} onSelect={onSelectTab} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.surface,
  },

  /* ------------------------------------------------------------- hero -- */
  hero: {
    paddingHorizontal: 15,
    paddingBottom: 22.5,
    overflow: 'hidden',
    experimental_backgroundImage:
      'linear-gradient(144.07deg, rgb(0, 26, 77) 0%, rgb(0, 45, 138) 50%, rgb(0, 82, 204) 100%)',
  },
  discTop: {
    position: 'absolute',
    top: -30,
    left: 270,
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  discBottom: {
    position: 'absolute',
    bottom: -60,
    left: 135,
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(56, 189, 248, 0.1)',
  },
  heroBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  heroButton: {
    width: 33.75,
    height: 33.75,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  heroButtonIcon: {
    width: 15,
    height: 15,
  },
  heroBadge: {
    position: 'absolute',
    top: -1.88,
    left: 20.63,
    minWidth: 15,
    height: 15,
    paddingHorizontal: 2,
    borderRadius: 999,
    backgroundColor: colors.danger,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroBadgeLabel: {
    fontFamily: fonts.bold,
    fontSize: 9,
    lineHeight: 13.5,
    color: '#ffffff',
    textAlign: 'center',
  },

  greeting: {
    marginTop: 15,
    fontFamily: fonts.medium,
    fontSize: 11.25,
    lineHeight: 15,
    color: colors.brandBlueTint,
  },
  name: {
    fontFamily: fonts.bold,
    fontSize: 18.75,
    lineHeight: 26.25,
    color: '#ffffff',
  },
  posting: {
    marginTop: 1.875,
    fontFamily: fonts.regular,
    fontSize: 11.25,
    lineHeight: 15,
    color: 'rgba(142, 197, 255, 0.7)',
  },

  heroStats: {
    marginTop: 15,
    flexDirection: 'row',
    gap: 11.25,
  },
  heroStat: {
    flex: 1,
    padding: 11.25,
    borderRadius: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  heroStatIcon: {
    width: 15,
    height: 15,
  },
  heroStatValue: {
    marginTop: 3.75,
    fontFamily: fonts.bold,
    fontSize: 18.75,
    lineHeight: 26.25,
    color: '#ffffff',
  },
  heroStatLabel: {
    fontFamily: fonts.regular,
    fontSize: 10,
    lineHeight: 12.5,
    color: 'rgba(142, 197, 255, 0.8)',
  },

  /* ------------------------------------------------------------- body -- */
  body: {
    paddingHorizontal: 15,
    paddingTop: 15,
  },
  section: {
    marginTop: 15,
  },
  card: {
    padding: 15,
    borderRadius: 15,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.hairline,
    boxShadow:
      '0px 1px 1.5px rgba(0, 0, 0, 0.1), 0px 1px 1px rgba(0, 0, 0, 0.1)',
  },

  sectionHead: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  sectionTitle: {
    fontFamily: fonts.bold,
    fontSize: 13.125,
    lineHeight: 18.75,
    color: colors.textHeading,
  },
  sectionAction: {
    fontFamily: fonts.semiBold,
    fontSize: 10,
    lineHeight: 15,
    color: colors.brandBlue,
  },
  sectionDate: {
    fontFamily: fonts.medium,
    fontSize: 10,
    lineHeight: 15,
    color: colors.textMuted,
  },

  /* --------------------------------------------------------- summary -- */
  summaryGrid: {
    marginTop: 11.25,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 11.25,
  },
  summaryTile: {
    // Two per row, with the 11.25 gap taken out of the pair.
    width: '48%',
    flexGrow: 1,
    minHeight: 50,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9.375,
    padding: 11.25,
    borderRadius: 15.25,
  },
  summaryIcon: {
    width: 15,
    height: 15,
  },
  summaryText: {
    flex: 1,
    minWidth: 0,
  },
  summaryValue: {
    fontFamily: fonts.bold,
    fontSize: 11.25,
    lineHeight: 15,
  },
  summaryLabel: {
    fontFamily: fonts.regular,
    fontSize: 10,
    lineHeight: 12.5,
    opacity: 0.8,
  },

  /* --------------------------------------------------- quick actions -- */
  actionRow: {
    marginTop: 11.25,
    flexDirection: 'row',
    gap: 7.5,
  },
  actionCard: {
    flex: 1,
    minHeight: 78.25,
    alignItems: 'center',
    gap: 7.5,
    padding: 11.25,
    borderRadius: 15,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.hairline,
    boxShadow:
      '0px 1px 1.5px rgba(0, 0, 0, 0.1), 0px 1px 1px rgba(0, 0, 0, 0.1)',
  },
  actionTile: {
    width: 33.75,
    height: 33.75,
    borderRadius: 15.25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionIcon: {
    width: 15,
    height: 15,
  },
  actionLabel: {
    fontFamily: fonts.semiBold,
    fontSize: 10,
    lineHeight: 12.5,
    color: colors.textLabel,
    textAlign: 'center',
  },

  /* ----------------------------------------------------------- chart -- */
  chart: {
    marginTop: 11.25,
    height: CHART_HEIGHT + 20,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  chartGroup: {
    flex: 1,
    alignItems: 'center',
  },
  chartBars: {
    height: CHART_HEIGHT,
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 4,
  },
  bar: {
    width: 16,
    borderRadius: 3.75,
  },
  barCompleted: {
    backgroundColor: colors.brandBlue,
  },
  barAssigned: {
    backgroundColor: colors.brandSky,
  },
  chartLabel: {
    marginTop: 5,
    fontFamily: fonts.regular,
    fontSize: 9,
    lineHeight: 15,
    color: '#94a3b8',
    textAlign: 'center',
  },

  legend: {
    marginTop: 7.5,
    flexDirection: 'row',
    gap: 15,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5.625,
  },
  legendSwatch: {
    width: 9.375,
    height: 9.375,
    borderRadius: 3.75,
  },
  legendLabel: {
    fontFamily: fonts.regular,
    fontSize: 10,
    lineHeight: 15,
    color: colors.textSlate,
  },

  /* --------------------------------------------------------- payments -- */
  paymentRow: {
    marginTop: 11.25,
    flexDirection: 'row',
    gap: 11.25,
  },
  paymentTile: {
    flex: 1,
    minHeight: 72.62,
    padding: 11.25,
    borderRadius: 15.25,
    borderWidth: 1,
  },
  paymentIcon: {
    width: 13.125,
    height: 13.125,
  },
  paymentAmount: {
    marginTop: 3.75,
    fontFamily: fonts.bold,
    fontSize: 13.125,
    lineHeight: 18.75,
  },
  paymentLabel: {
    fontFamily: fonts.regular,
    fontSize: 10,
    lineHeight: 12.5,
    opacity: 0.8,
  },

  /* ------------------------------------------------------------ cases -- */
  caseList: {
    marginTop: 11.25,
    gap: 9.375,
  },
  caseCard: {
    flexDirection: 'row',
    gap: 11.25,
    padding: 15,
    borderRadius: 15,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.hairline,
    boxShadow:
      '0px 1px 1.5px rgba(0, 0, 0, 0.1), 0px 1px 1px rgba(0, 0, 0, 0.1)',
  },
  avatar: {
    width: 33.75,
    height: 33.75,
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
  caseBody: {
    flex: 1,
    minWidth: 0,
  },
  caseHead: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  caseName: {
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
    borderWidth: 1,
  },
  priorityLabel: {
    fontFamily: fonts.bold,
    fontSize: 10,
    lineHeight: 15,
  },
  caseReference: {
    marginTop: 3.75,
    // The frame sets the reference in a mono face, as a machine-readable id.
    fontFamily: 'Menlo',
    fontSize: 10,
    lineHeight: 15,
    color: colors.textMuted,
  },
  caseMeta: {
    marginTop: 5.625,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5.625,
  },
  departmentChip: {
    paddingHorizontal: 7.5,
    paddingVertical: 1.875,
    borderRadius: 999,
    backgroundColor: colors.surface,
  },
  metaLabel: {
    fontFamily: fonts.medium,
    fontSize: 10,
    lineHeight: 15,
    color: colors.textSlate,
  },
  status: {
    alignSelf: 'flex-start',
    marginTop: 5.625,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3.75,
    paddingHorizontal: 7.5,
    paddingVertical: 1.875,
    borderRadius: 999,
    borderWidth: 1,
  },
  statusDot: {
    width: 5.625,
    height: 5.625,
    borderRadius: 999,
  },
  statusLabel: {
    fontFamily: fonts.semiBold,
    fontSize: 10,
    lineHeight: 15,
  },

  /* --------------------------------------------------------- activity -- */
  activityList: {
    marginTop: 11.25,
    gap: 7.5,
  },
  activityRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 11.25,
    padding: 11.25,
    borderRadius: 15.25,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.hairline,
  },
  // Unread rows are outlined in blue as well as dotted.
  activityUnread: {
    borderColor: '#dbeafe',
  },
  activityTile: {
    width: 30,
    height: 30,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activityIcon: {
    width: 13.125,
    height: 13.125,
  },
  activityText: {
    flex: 1,
    minWidth: 0,
  },
  activityTitle: {
    fontFamily: fonts.semiBold,
    fontSize: 11.25,
    lineHeight: 14.063,
    color: colors.textHeading,
  },
  activityTime: {
    marginTop: 1.875,
    fontFamily: fonts.regular,
    fontSize: 10,
    lineHeight: 15,
    color: colors.textMuted,
  },
  activityDot: {
    marginTop: 3.75,
    width: 7.5,
    height: 7.5,
    borderRadius: 999,
    backgroundColor: '#2b7fff',
  },
});

export default DashboardScreen;
