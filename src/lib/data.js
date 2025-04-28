import axios from "./axios";

async function getData() {
  const res = await axios.get("/api/v1/leads");
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    // throw new Error("Failed to fetch data");
  }

  return res.data;
}
export { getData };
