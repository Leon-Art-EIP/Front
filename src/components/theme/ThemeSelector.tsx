"use client";

import React from "react";
import Themes, { ITheme } from "./Themes";

interface ThemeSelectorProps {
  onSelectColor: (color: string) => void;
  selectedColor: string;
  onThemeSelect: (theme: string) => void; // Ajoutez une fonction pour la sélection de thème
}

const ThemeSelector: React.FC<ThemeSelectorProps> = ({ onSelectColor, selectedColor, onThemeSelect }) => {
  const themeNames = Object.keys(Themes); // Récupérez les noms des thèmes

  const handleColorChange = (color: string) => {
    onSelectColor(color); // Mettre à jour la couleur sélectionnée
  };

  return (
    <div className="p-4 flex items-center">
      {themeNames.map((themeName, index) => {
        const theme: ITheme = Themes[themeName]; // Obtenez le thème correspondant au nom du thème
        return (
          <button
            key={index}
            className="w-10 h-10 mr-2 bg-gray-200 rounded"
            onClick={() => onThemeSelect(themeName)} // Appel de la fonction onThemeSelect avec le nom du thème sélectionné
            style={{ backgroundColor: theme.primary }} // Utilisez une couleur du thème comme couleur de fond du bouton
          ></button>
        );
      })}
    </div>
  );
};

export default ThemeSelector;
