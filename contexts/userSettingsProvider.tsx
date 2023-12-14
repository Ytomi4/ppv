'use client'

import React, { createContext, useState, ReactNode } from 'react';
import { Vector3 } from 'three';

interface UserSettingContextType {
    cameraPos: Vector3;
    resetCamera: () => void;
    updateCameraPos: (vec3: Vector3) => void;
    colorName: String;
    updateColorName: (t: String) => void;
    transparency: boolean;
    setTransparencyValue: (b: boolean) => void;
}

export const UserSettingContext = createContext<UserSettingContextType | undefined>(undefined);

export const UserSettingProvider = ({ children }: { children: ReactNode }) => {
  const [cameraPos, setCameraPos] = useState<Vector3>(new Vector3(-1, 1.5, 2));
  const [colorName, setColorName] = useState<String>("Gentle Green");
  const [transparency, setTransparency] = useState<boolean>(false);

  const resetCamera = () => setCameraPos(new Vector3(-1, 1.5, 2));
  const updateCameraPos = (vec3: Vector3) => setCameraPos(vec3);

  const updateColorName = (t: String) => setColorName(t);

  const setTransparencyValue = (b: boolean) => setTransparency(b);

  return (
    <UserSettingContext.Provider value={{ cameraPos, resetCamera, updateCameraPos, colorName, updateColorName, transparency, setTransparencyValue}}>
      {children}
    </UserSettingContext.Provider>
  );
};