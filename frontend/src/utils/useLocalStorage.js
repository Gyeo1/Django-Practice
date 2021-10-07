//https://usehooks.com/useLocalStorage/의 코드 입니다.
import { useState } from "react";

export function getStorageItem(key, initialValue) {
  try {
    // Get from local storage by key
    const item = window.localStorage.getItem(key); //해당 key에 대한 값이 있다면 return으로
    // Parse stored json or if none return initialValue
    return item ? JSON.parse(item) : initialValue; //JSON으로 파싱한다 키값이 없다면 초기값 반환
  } catch (error) {
    // If error also return initialValue
    console.log(error);
    return initialValue;
  }
}
export function setStorageItem(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value)); //문자열로 직렬화 해주고 저장한다.
  } catch (error) {
    console.log(error);
  }
}

// Hook 키와 초기값을 지정해 줄 수 있다!
function useLocalStorage(key, initialValue) {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState(() => {
    return getStorageItem(key, initialValue);
  });

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = (value) => {
    const valueToStore = value instanceof Function ? value(storedValue) : value;
    // Save state
    setStoredValue(valueToStore);
    setStorageItem(key, valueToStore);
  };
  return [storedValue, setValue]; //반환값은 2개로
}

export default useLocalStorage;
