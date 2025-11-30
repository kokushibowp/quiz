import { AuthAPI } from "@/api";
import { AppStore } from "@/state/app-store";

export class LoginModel {
  private _errorMessage: string = "";

  public async login(
    username: string | undefined,
    password: string | undefined,
  ) {
    if (!username || !password) {
      this._errorMessage = "Неверный логин или пароль";
      return;
    }

    try {
      const token = await AuthAPI.login(username, password);
      localStorage.setItem("token", token);
      console.log(token);
      AppStore.setState({
        authToken: token,
      });

      location.hash = "#main";
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === 'Unauthorized')
          this._errorMessage = 'Неверный логин или пароль';
        else if (error.message === 'Failed to fetch') {
          this._errorMessage = 'Нет связи с сервером базы данных';
        }
        else {
          this._errorMessage = error.message
        }
      } else {
        this._errorMessage = 'Произошла непредвиденная ошибка';
      }
    }
  }

  public get errorMessage() {
    return this._errorMessage;
  }
}
