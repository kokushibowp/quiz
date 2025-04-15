import { Router } from "./core/router";
import { LoginModel } from "./models/login-model";
import { HomePagePresenter } from "./pages/home-page/home-page-presenter";
import { HomePageView } from "./pages/home-page/home-page-view";
import { LoginPagePresenter } from "./pages/login-page/login-page-presenter";
import { LoginPageView } from "./pages/login-page/login-page-view";

const initLoginPage = () => {
  const model = new LoginModel();
  const view = new LoginPageView("#app", false);
  const presenter = new LoginPagePresenter(view, model);

  return presenter;
};

const initHomePage = () => {
  const view = new HomePageView("#app", false);
  const presenter = new HomePagePresenter(view);

  return presenter;
};

const routes = {
  "/": initHomePage,
  login: initLoginPage,
};

document.addEventListener("DOMContentLoaded", () => {
  new Router(routes);
});
