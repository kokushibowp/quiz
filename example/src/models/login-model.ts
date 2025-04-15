import { AuthAPI } from "@/api";
import { AppStore } from "@/state/app-store";

export class LoginModel {
  private _errorMessage: string = "";

  public async login(
    username: string | undefined,
    password: string | undefined,
  ) {
    if (!username || !password) {
      this._errorMessage = "Введите корректные данные";
      return;
    }

    try {
      const token = await AuthAPI.login(username, password);
      localStorage.setItem("token", token);
      AppStore.setState({
        authToken: token,
      });

      location.hash = "";
    } catch (error) {
      this._errorMessage = "Произошла непредвиденная ошибка";
    }
  }

  public get errorMessage() {
    return this._errorMessage;
  }
}
