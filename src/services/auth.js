import http from "../api/axios";

const END_POINT = "inspectors/";

export default {
  login(data) {
    return http.post(`${END_POINT}login/`, data);
  },
};
