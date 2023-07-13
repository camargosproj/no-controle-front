import axios from "axios";

const isServer = typeof window === "undefined";

const baseURL = isServer ? "http://backend:4000" : "http://localhost:4000";

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImUxZTFhYWY5LTQ5MDQtNGMyYS1iMTU1LTBlZjZjYzFjMDJjMyIsImVtYWlsIjoiZGV2QGRldi5jb20iLCJpYXQiOjE2ODkyNTQyNDEsImV4cCI6MTY4OTM0MDY0MX0.7TFkaFDcFlHw4Uzuvnjl6qRY18OM_HdmhSC5yPMN4CA",
  },
});

export default api;
