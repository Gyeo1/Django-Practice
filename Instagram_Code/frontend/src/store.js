import React, { createContext, useContext } from "react";
import { getStorageItem, setStorageItem } from "./utils/useLocalStorage";
import useReducerWithSideEffects, {
  UpdateWithSideEffect,
  Update,
} from "use-reducer-with-side-effects";

const AppContext = createContext();

const reducer = (prevState, action) => {
  const { type } = action;
  if (type === SET_TOKEN) {
    const { payload: jwtToken } = action;

    const newState = {
      ...prevState,
      jwtToken,
    };
    return UpdateWithSideEffect(newState, (state, dispatch) => {
      setStorageItem("jwtToken", jwtToken); //로컬 strage에 저장
    });
  } else if (type === DELETE_TOKEN) {
    const newState = {
      ...prevState,
      jwtToken: "",
    };
    return UpdateWithSideEffect(newState, (state, dispatch) => {
      setStorageItem("jwtToken", "");
    });
  }
  return prevState;
};

export const AppProvider = ({ childern }) => {
  const [store, dispatch] = useReducerWithSideEffects(reducer, {
    jwtToken: getStorageItem("jwtToken", ""),
  });
  return (
    <AppContext.Provider value={{ store, dispatch }}>
      {childern}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext); //값을 읽어올때 사용한다.

//Actions
const SET_TOKEN = "APP/SET_TOKEN";
const DELETE_TOKEN = "APP/DELETE_TOKEN";

//Actions Creators
export const setToken = (token) => ({ type: SET_TOKEN, payload: token });
export const deleteToekn = () => ({ type: DELETE_TOKEN });
