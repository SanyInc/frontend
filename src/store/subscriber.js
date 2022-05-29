import store from "../store";
import axios from "axios";

store.subscribe((mutation) => {
  switch (mutation.type) {
    case "auth/SET_CREDENTIALS":
      if (mutation.payload) {
        localStorage.setItem("credentials", JSON.stringify(mutation.payload));
      } else {
        axios.defaults.headers.common["Authorization"] = null;
        localStorage.removeItem("credentials");
      }
      break;
  }
});
