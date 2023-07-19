import axios from "axios";

const isServer = typeof window === "undefined";

const baseURL = isServer ? "http://backend:4000" : "http://localhost:4000";

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImUxZTFhYWY5LTQ5MDQtNGMyYS1iMTU1LTBlZjZjYzFjMDJjMyIsImVtYWlsIjoiZGV2QGRldi5jb20iLCJpYXQiOjE2ODk4MDEwMjUsImV4cCI6MTY4OTg4NzQyNX0.7w48EkjnZwx7z4WZQKsY-VrUyb7AqGEO55l8RpQRsuI",
  },
});

export default api;
