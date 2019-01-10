import localforage from 'localforage';

export const saveState = state => localforage.setItem('state', state);

export const loadState = () => localforage.getItem('state');
