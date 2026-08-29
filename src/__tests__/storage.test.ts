import { describe, it, expect, beforeEach } from 'vitest';
import { loadFromStorage, saveToStorage, removeFromStorage } from '../utils/storage';

describe('storage utility', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('saves and loads data from localStorage', () => {
    const data = { name: 'Test Lead', value: 5000 };
    saveToStorage('test_key', data);

    const loaded = loadFromStorage('test_key', null);
    expect(loaded).toEqual(data);
  });

  it('returns fallback value if key does not exist', () => {
    const loaded = loadFromStorage('non_existent', 'default_val');
    expect(loaded).toBe('default_val');
  });

  it('removes item from localStorage', () => {
    saveToStorage('remove_me', 'hello');
    removeFromStorage('remove_me');
    expect(loadFromStorage('remove_me', null)).toBeNull();
  });
});
