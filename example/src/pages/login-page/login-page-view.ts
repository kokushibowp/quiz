import { TargetElementType, View } from "@/core/view";

export interface LoginPageViewProps {
  errorMessage: string;
}

export class LoginPageView extends View<LoginPageViewProps> {
  private get _loginButton() {
    return document.getElementById("auth-login-button");
  }

  constructor(
    protected readonly targetElement: TargetElementType,
    protected readonly replace = false,
  ) {
    super(targetElement, replace);
  }

  public template({ errorMessage }: LoginPageViewProps) {
    return `
      <div>
        <div class="auth-card">
          <h1>Вход</h1>
          <a href="#">Вернуться на главную</a>

          <div id="warning">
            ${errorMessage && `<div class="warning">${errorMessage}</div>`}
          </div>

          <input class="log-input" type="text" name="username" id="auth-username" placeholder="Эл. почта">
          <input class="log-input" type="text" name="password" id="auth-password" placeholder="Пароль">
          
          <button type="button" class="enter-button" id="auth-login-button">Войти</button>
        </div>
      </div>
      `;
  }

  public updateErrorMessage({ errorMessage }: LoginPageViewProps) {
    const message = document.querySelector("#warning");
    if (!message) {
      return;
    }
    message.innerHTML = "";

    if (errorMessage) {
      message.innerHTML = `<div class="warning">${errorMessage}</div>`;
    }
  }

  public enableLoginButton() {
    this._loginButton?.removeAttribute("disabled");
  }

  public override bindListeners() {
    const usernameInput = document.getElementById(
      "auth-username",
    ) as HTMLInputElement;
    const passwordInput = document.getElementById(
      "auth-password",
    ) as HTMLInputElement;

    usernameInput.addEventListener("change", () => {
      this.bus.emit("typed", {});
    });

    passwordInput.addEventListener("change", () => {
      this.bus.emit("typed", {});
    });

    this._loginButton?.addEventListener("click", async () => {
      const username = usernameInput.value;
      const password = passwordInput.value;
      this._loginButton?.setAttribute("disabled", "");

      this.bus.emit("loginClicked", { username, password });
    });
  }
}
