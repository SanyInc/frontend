export default function authHeader() {
  let credentials = JSON.parse(localStorage.getItem("credentials"));

  if (credentials) {
    return { Authorization: "Token " + credentials.token };
  } else {
    return {};
  }
}
