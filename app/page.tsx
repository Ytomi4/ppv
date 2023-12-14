
import { UserSettingProvider } from '@/contexts/userSettingsProvider';
import MidiVisualizer from '@/components/midiVisualizer';
import SettingModal from '@/components/setting_mordal';

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <UserSettingProvider>
        <SettingModal />
        <MidiVisualizer />
      </UserSettingProvider>
    </div>
  )
}
