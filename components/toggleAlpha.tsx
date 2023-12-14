import { useContext, useEffect, useState } from 'react'
import { Switch } from '@headlessui/react'
import { UserSettingContext } from '@/contexts/userSettingsProvider'

export default function ToggleAlpha() {
  const userSettings = useContext(UserSettingContext);
  const transparency = userSettings?.transparency;
  const setTransparency = userSettings?.setTransparencyValue;

  const [enabled, setEnabled] = useState(transparency ? transparency : false);

  // toggleというよりも、setで上体をあわせた方がいい
  useEffect(() => {
    if (setTransparency) {
      setTransparency(enabled);
    }
  },[enabled])

  return (
    <div className="flex flex-row items-center py-1">
        <label className="text-sm text-gray-500">Toggle background transparency</label>
        <Switch
        checked={enabled}
        onChange={setEnabled}
        className={`${
            enabled ? 'bg-blue-600' : 'bg-gray-200'
        } relative inline-flex h-6 w-11 items-center rounded-full ml-4`}
        >
        <span className="sr-only">Enable notifications</span>
        <span
            className={`${
            enabled ? 'translate-x-6' : 'translate-x-1'
            } inline-block h-4 w-4 transform rounded-full bg-white transition`}
        />
        </Switch>
    </div>

  )
}