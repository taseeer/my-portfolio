import { useState, useCallback } from 'react';
import { loadPortfolioData, savePortfolioData, defaultPortfolioData } from '../data/portfolioData';

export function usePortfolioData() {
  const [data, setData] = useState(() => loadPortfolioData());

  const persist = useCallback((newData) => {
    setData(newData);
    savePortfolioData(newData);
  }, []);

  // Replace an entire section (e.g. projects, experiences)
  const updateSection = useCallback((section, value) => {
    persist({ ...data, [section]: value });
  }, [data, persist]);

  // Update a single item in an array section by index
  const updateItem = useCallback((section, index, item) => {
    const arr = [...data[section]];
    arr[index] = item;
    persist({ ...data, [section]: arr });
  }, [data, persist]);

  // Add a new item to an array section
  const addItem = useCallback((section, item) => {
    const arr = [...(data[section] || []), item];
    persist({ ...data, [section]: arr });
  }, [data, persist]);

  // Delete an item from an array section by index
  const deleteItem = useCallback((section, index) => {
    const arr = data[section].filter((_, i) => i !== index);
    persist({ ...data, [section]: arr });
  }, [data, persist]);

  // Update a nested skills category (frontend/backend/other)
  const updateSkillCategory = useCallback((category, skills) => {
    persist({ ...data, skills: { ...data.skills, [category]: skills } });
  }, [data, persist]);

  // Update hero info
  const updateHero = useCallback((heroData) => {
    persist({ ...data, hero: { ...data.hero, ...heroData } });
  }, [data, persist]);

  // Reset everything to defaults
  const resetToDefaults = useCallback(() => {
    persist(defaultPortfolioData);
  }, [persist]);

  return {
    data,
    updateSection,
    updateItem,
    addItem,
    deleteItem,
    updateSkillCategory,
    updateHero,
    resetToDefaults
  };
}
