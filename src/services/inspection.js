import http from "@/api/axios";
import authHeader from "../api/headers";

const END_POINT = "inspections/";

export default {
  get(uuid) {
    return http.get(`${END_POINT}${uuid}/`, {
      headers: authHeader(),
    });
  },
  inspectionCreate(data) {
    return http.post(`inspection/`, data, {
      headers: authHeader(),
    });
  },
  answerCreate(data) {
    return http.post(`answers/`, data, {
      headers: authHeader(),
    });
  },
  inspectionComplete(data) {
    return http.post(`${END_POINT}`, data, {
      headers: authHeader(),
    });
  },
};
