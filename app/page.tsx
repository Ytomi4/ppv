
import { UserSettingProvider } from '@/contexts/userSettingsProvider';
import MidiVisualizer from '@/components/midiVisualizer';
import SettingModal from '@/components/setting_mordal';
import ColorNameComponent from '@/components/manageBG';
import Head from 'next/head';

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <Head>
        <title>PianoPlayVisualizer</title>
        <link rel="icon" href="/public/ppv_favicon.ico"></link>
      </Head>
      <UserSettingProvider>
        <SettingModal />
        <ColorNameComponent />
        <MidiVisualizer />
      </UserSettingProvider>
    </div>
  )
}
