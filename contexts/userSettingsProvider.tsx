'use client'

import React, { createContext, useState, ReactNode } from 'react';
import { Vector3 } from 'three';

interface UserSettingContextType {
    cameraPos: Vector3;
    resetCamera: () => void;
    updateCameraPos: (vec3: Vector3) => void;
}

export const UserSettingContext = createContext<UserSettingContextType | undefined>(undefined);

export const UserSettingProvider = ({ children }: { children: ReactNode }) => {
  const [cameraPos, setCameraPos] = useState<Vector3>(new Vector3(-1, 1.5, 2));

  const resetCamera = () => setCameraPos(new Vector3(-1, 1.5, 2));
  const updateCameraPos = (vec3: Vector3) => setCameraPos(vec3);

  return (
    <UserSettingContext.Provider value={{ cameraPos, resetCamera, updateCameraPos }}>
      {children}
    </UserSettingContext.Provider>
  );
};