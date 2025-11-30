import { Router } from "./core/router";
import { LoginModel } from "./models/login-model";
import { HomePagePresenter } from "./pages/home-page/home-page-presenter";
import { HomePageView } from "./pages/home-page/home-page-view";
import { LoginPagePresenter } from "./pages/login-page/login-page-presenter";
import { LoginPageView } from "./pages/login-page/login-page-view";
import { MainPagePresenter } from "./pages/main-page/main-page-presenter";
import { MainPageView } from "./pages/main-page/main-page-view";
import { MainModel } from "./models/main-model";

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

const initMainPage = () => {
  const model = new MainModel();
  const view = new MainPageView("#app", false);
  const presenter = new MainPagePresenter(view, model);
  return presenter;
}

const routes = {
  "/": initHomePage,
  login: initLoginPage,
  main: initMainPage,
};

document.addEventListener("DOMContentLoaded", () => {
  new Router(routes);
});

document.addEventListener("input", (event) => {
  //console.log(event);
  let username = document.getElementById('auth-username');
  const password = document.getElementById('auth-password');
  if (username instanceof HTMLInputElement) {
    if (username.value == "")
      console.log("Поле пусто");
  }
})
