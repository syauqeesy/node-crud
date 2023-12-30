import Application from "./Application";
import Http from "./Http";

const application = (type: "http" = "http"): Application => {
  switch (type) {
    default:
      return new Http();
  }
};

export default application;
