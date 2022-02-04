import axios from "axios";
import { toast } from "react-toastify";
import Configuration from "../config/configuration";

axios.defaults.headers.common["x-auth-token"] = localStorage.getItem("token");
axios.defaults.headers.common["Content-Type"] = "multipart/form-data";

class EventService {
  constructor() {
    this.config = new Configuration();
  }

  addEvent(formData) {
    return axios.post(this.config.apiBaseUrl + "events", formData);
  }

  updateEvent(id, formData) {
    return axios.put(this.config.apiBaseUrl + `events/${id}`, formData);
  }

  getEvent = () => {
    return axios.get(this.config.apiBaseUrl + "events");
  };

  deleteEvent(id) {
    return axios.delete(this.config.apiBaseUrl + "events/" + id);
  }

  handleMessage(type) {
    if (type === "add") toast("Successfully Registered!");
    else if (type === "update") toast("Successfully updated Event");
    else if (type === "delete") toast("Successfully deleted Event");
  }
  handleCustomMessage(message) {
    toast(message.toString());
  }
  handleError() {
    toast("Something went wrong!");
  }
}

let eventService = new EventService();

export default eventService;
