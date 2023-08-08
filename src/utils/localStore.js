export const setElement = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  }
  
  export const removeElement = (key) => {
    localStorage.removeItem(key);
  }
  export const allremoveElement = (key) => {
    localStorage.clear();
  }
  export const getElement = (key) => {
    return localStorage.getItem(key);
  }