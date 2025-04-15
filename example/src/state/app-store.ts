import { State } from "@/core/state";

export interface AppState {
  user: null;
  quiz: null;
  answers: {};
  authToken?: string;
}

export const AppStore = new State<AppState>({
  user: null,
  quiz: null,
  answers: {},
});
