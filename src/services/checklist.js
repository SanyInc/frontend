import http from "../api/axios";
import authHeader from "@/api/headers";

const END_POINT = "activities/";

export default {
  get(id) {
    return http.get(`${END_POINT}${id}/`, {
      headers: authHeader(),
    });
  },
};
