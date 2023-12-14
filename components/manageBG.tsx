'use client'

import { useContext, useEffect, useState } from 'react';
import { UserSettingContext } from '@/contexts/userSettingsProvider';
import { ColorName2ThemeColorId } from '../utils/colorNameParser'; 

const ColorNameComponent = () => {
  const userSettings = useContext(UserSettingContext);
  
  if (!userSettings) {
    throw new Error("UserSettingContext is undefined. Make sure the context provider is set up correctly.");
  }

  const [colorName, setColorName] = useState("");
  const [transparency, setTransparency] = useState<boolean>(false);

  useEffect(() => {
    if (userSettings) {
      setColorName(userSettings.colorName.toString());
      setTransparency(userSettings.transparency);
    }
  }, [userSettings]);

  useEffect(() => {
    let root = document.documentElement;

    if (transparency) {
      root.style.setProperty('--background-start-rgb', `transparency`);
    } else if (colorName) {
      let id = ColorName2ThemeColorId(colorName);
      root.style.setProperty('--background-start-rgb', `var(--background-option${id}-start-rgb)`);
      root.style.setProperty('--background-end-rgb', `var(--background-option${id}-end-rgb)`);
    }
  }, [colorName, transparency]);

  return (
    <div></div>
  );
};

export default ColorNameComponent;
