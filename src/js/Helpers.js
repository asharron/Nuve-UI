import history from "./History";

export function goTo(url) {
  history.push(url);
}

export function goBack() {
  window.history.back();
}
