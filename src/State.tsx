import { createContext, useReducer } from "react";

type User = {
  _id: string;
  name: string;
  email: string;
  token: string;
  isAdmin: boolean;
};

type State = {
  user: User | null;
};

type Action = { type: "SET_USER"; payload: User } | { type: "CLEAR_USER" };

type Dispatch = (action: Action) => void;

const initialState: State = {
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")!)
    : null,
};

const StateContext = createContext<{ state: State; dispatch: Dispatch }>({
  state: initialState,
  dispatch: () => {},
});

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload };
    case "CLEAR_USER":
      return { ...state, user: null };
    default:
      return state;
  }
};

const StateProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StateContext.Provider value={{ state, dispatch }}>
      {children}
    </StateContext.Provider>
  );
};

export { StateContext, StateProvider };
