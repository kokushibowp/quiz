import { TargetElementType, View } from "@/core/view";

export interface LoginPageViewProps {
  errorMessage: string;
}

export class LoginPageView extends View<LoginPageViewProps> {
  private get _loginButton() {
    return document.getElementById("auth-login-button");
  }

  private get _usernameField() {
    return document.getElementById("auth-username");
  }

  private get _passwordField() {
    return document.getElementById("auth-password");
  }

  protected isEyeIconVisible: Boolean = false;

  constructor(
    protected readonly targetElement: TargetElementType,
    protected readonly replace = false,
  ) {
    super(targetElement, replace);
  }

  public template({ errorMessage }: LoginPageViewProps) {
    return `
    <div class="auth-body">
      <div class = "left">
        <div class="textwrap">
          <h4>QuizMaster</h4>
          <h2>Узнайте больше нового о себе и своих интересах</h2>
          <p>QuizMaster - это приложение для прохождения викторин. Проходите различные викторины, проверяйте свои знания и веселитесь!</p>
        </div>
        <div class="imgwrap">
          <img class ="img1440 imgwrap__img" src="img/Image1440.png">
        <img class ="img1920 imgwrap__img" src="img/Image1920.png">
        </div>
      </div>
      <div class = "right">
        <div class="auth-card">
          <h1>Вход</h1>
          <div class="auth-card__p"><p>Нет аккаунта?</p><a href="#registration">Регистрация</a></div>
    
          <div id="warning">
            ${errorMessage && `<div class="warning">${errorMessage}</div>`}
          </div> 

          <div class="inputwrap input-username">
            <input class="log-input" type="text" name="username" id="auth-username" placeholder="Эл. почта">
          </div>
          <div class="inputwrap input-password">
            <input class="log-input" type="text" name="password" id="auth-password" placeholder="Пароль">
            <!--<img src="img/not-visible-eye.svg"> -->
            <div id="eye-icon"></div>
          </div>
          
          <button type="button" class="enter-button" id="auth-login-button" disabled>Войти</button>
        </div>
      </div>
    </div>
      `;
  }

  public addEyeIcon() {
    const inputPassword = document.querySelector("#eye-icon") as HTMLElement;
    inputPassword.innerHTML = '<img src="img/not-visible-eye.svg">';
    this.isEyeIconVisible = true;
  }

  public removeEyeIcon() {
    const inputPassword = document.querySelector("#eye-icon") as HTMLElement;
    inputPassword.innerHTML = '';
    this.isEyeIconVisible = false;
  }

  public updateErrorMessage({ errorMessage }: LoginPageViewProps) {
    const message = document.querySelector("#warning") as HTMLElement;
    if (!message) {
      return;
    }
    message.innerHTML = "";
    if (message instanceof Element) {
      message.style.width = "0px";
      message.style.height = "0px";
    }

    if (errorMessage) {
      message.innerHTML = `<div class="warning">${errorMessage}</div>`;
      if (message instanceof Element) {
        message.style.width = "436px";
        message.style.height = "49px";
      }
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

    document.addEventListener("input", () => {
      let username = this._usernameField;
      let password = this._passwordField;
      if (username instanceof HTMLInputElement && password instanceof HTMLInputElement) {
        if (username.value != "" && password.value != "") {
          this.enableLoginButton()
        } else {
          this._loginButton?.setAttribute("disabled", "");
        }
      }

      if (password instanceof HTMLInputElement) {
        if (password.value == "") {
          this.removeEyeIcon();
        } else if (!this.isEyeIconVisible) {
          this.addEyeIcon();
        }
      }
    })

    document.addEventListener("keydown", (event) => {
      if (event.key == "Enter") {
        const username = usernameInput.value;
        const password = passwordInput.value;
        this.bus.emit("loginClicked", { username, password });
        localStorage.setItem("token", "");
        let token = localStorage.getItem("token");
        if (token) {
          window.location.hash = "#quiz";
        }
      }
    })

    this._loginButton?.addEventListener("click", async () => {
      const username = usernameInput.value;
      const password = passwordInput.value;
      //this._loginButton?.setAttribute("disabled", "");

      this.bus.emit("loginClicked", { username, password });
      localStorage.setItem("token", "");
      let token = localStorage.getItem("token");
      if (token) {
        window.location.hash = "#quiz";
      }
    });
  }
}
