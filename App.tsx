/**
 * @format
 */

import { useCallback, useState } from 'react';
import { Alert } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import LoginScreen from './src/screens/LoginScreen';
import ForgotPasswordScreen from './src/screens/ForgotPasswordScreen';
import VerifyOtpScreen from './src/screens/VerifyOtpScreen';
import DashboardScreen from './src/screens/dashboard/DashboardScreen';
import QueueScreen from './src/screens/queue/QueueScreen';
import type { Credentials } from './src/screens/LoginScreen';
import type { NavTabKey } from './src/components/BottomNav';
import type { PendingCase } from './src/screens/dashboard/data';
import type { QueueCase } from './src/screens/queue/data';
import { AGENT } from './src/screens/dashboard/data';

type Stage = 'login' | 'forgotPassword' | 'verifyOtp' | 'dashboard' | 'queue';

/** The code the verify screen advertises until there is an API to ask. */
const DEMO_OTP = '123456';

function App() {
  const [stage, setStage] = useState<Stage>('login');
  /** Whose reset is in flight — the address the OTP was sent to. */
  const [otpEmail, setOtpEmail] = useState('');

  /**
   * There is no API client in this app yet, so signing in only moves the
   * screen. The credentials are validated by the form before it calls this;
   * checking them against the server is what replaces this line.
   */
  const handleSignIn = useCallback(
    (_credentials: Credentials) => setStage('dashboard'),
    [],
  );

  const handleSendOtp = useCallback((email: string) => {
    setOtpEmail(email);
    setStage('verifyOtp');
  }, []);

  /**
   * Stands in for the server's check. Returning a message rejects the code and
   * the verify screen shows it under the boxes; returning nothing accepts it.
   */
  const handleVerifyOtp = useCallback((code: string) => {
    if (code !== DEMO_OTP) {
      return 'That code is not right. Check your email and try again.';
    }
    setStage('dashboard');
  }, []);

  const handleResendOtp = useCallback(() => {
    Alert.alert(
      'OTP resent',
      `A new six-digit code would go to ${otpEmail}. Until the API is wired up, ${DEMO_OTP} is the one that works.`,
    );
  }, [otpEmail]);

  /** Every dashboard destination below this one is still to be designed. */
  const soon = useCallback((what: string) => {
    Alert.alert(what, 'This screen is not built yet.');
  }, []);

  const showLogin = useCallback(() => setStage('login'), []);
  const showForgotPassword = useCallback(() => setStage('forgotPassword'), []);

  /** Home and Queue are built; the other three tabs say so. */
  const handleSelectTab = useCallback(
    (key: NavTabKey) => {
      if (key === 'home') setStage('dashboard');
      else if (key === 'queue') setStage('queue');
      else soon(key.charAt(0).toUpperCase() + key.slice(1));
    },
    [soon],
  );

  /** Both lists open the same case; neither has a detail screen yet. */
  const openCase = useCallback((entry: PendingCase | QueueCase) => {
    Alert.alert(
      entry.name,
      `${entry.reference} · ${entry.service}. The case detail screen is not built yet.`,
    );
  }, []);

  if (stage === 'queue') {
    return (
      <SafeAreaProvider>
        <QueueScreen
          alerts={AGENT.alerts}
          onSelectTab={handleSelectTab}
          onOpenCase={openCase}
          onOpenFilters={() => soon('Filters')}
          onRefresh={() => soon('Refresh')}
        />
      </SafeAreaProvider>
    );
  }

  if (stage === 'dashboard') {
    return (
      <SafeAreaProvider>
        <DashboardScreen
          onSelectTab={handleSelectTab}
          onOpenMenu={() => soon('Menu')}
          onOpenAlerts={() => soon('Alerts')}
          onQuickAction={key =>
            key === 'queue'
              ? setStage('queue')
              : soon(key.charAt(0).toUpperCase() + key.slice(1))
          }
          onViewAllCases={() => setStage('queue')}
          onOpenCase={openCase}
        />
      </SafeAreaProvider>
    );
  }

  if (stage === 'verifyOtp') {
    return (
      <SafeAreaProvider>
        <VerifyOtpScreen
          onSubmit={handleVerifyOtp}
          onResend={handleResendOtp}
          onBack={showForgotPassword}
        />
      </SafeAreaProvider>
    );
  }

  if (stage === 'forgotPassword') {
    return (
      <SafeAreaProvider>
        <ForgotPasswordScreen
          onSubmit={handleSendOtp}
          onBackToLogin={showLogin}
        />
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <LoginScreen
        onSubmit={handleSignIn}
        onForgotPassword={showForgotPassword}
      />
    </SafeAreaProvider>
  );
}

export default App;
