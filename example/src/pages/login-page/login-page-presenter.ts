import { Presenter } from "@/core/presenter";
import { LoginPageView } from "./login-page-view";
import { LoginModel } from "@/models/login-model";

export class LoginPagePresenter extends Presenter<LoginPageView, LoginModel> {
  public init() {
    this.view.init({ errorMessage: this.model.errorMessage });

    this.view.on("loginClicked", this.onLoginClick.bind(this));
    this.view.on("typed", () => {
      this.view.updateErrorMessage({ errorMessage: "" });
    });
  }

  public async onLoginClick({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) {
    await this.model.login(username, password);
    this.view.updateErrorMessage({ errorMessage: this.model.errorMessage });
    this.view.enableLoginButton();
  }
}
