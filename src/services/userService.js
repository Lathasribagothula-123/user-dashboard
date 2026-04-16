import axios from "axios";

const API_URL = "https://jsonplaceholder.typicode.com/users";
const STORAGE_KEY = "users";

function formatUser(apiUser) {
  return {
    id: apiUser.id,
    name: apiUser.name || "",
    username: apiUser.username || (apiUser.name || "").toLowerCase().replace(/\s+/g, "."),
    email: apiUser.email || "",
    phone: apiUser.phone || "",
    company: apiUser.company?.name || "",
    address: `${apiUser.address?.street || ""} ${apiUser.address?.suite || ""}`.trim(),
    city: apiUser.address?.city || "",
    zipcode: apiUser.address?.zipcode || "",
    status: apiUser.id % 2 === 0 ? "Inactive" : "Active",
  };
}

function readUsers() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

function writeUsers(users) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
}

export async function fetchUsers() {
  const response = await axios.get(API_URL);
  const apiUsers = response.data.map(formatUser);
  const localUsers = readUsers();
  const merged = new Map();
  [...apiUsers, ...localUsers].forEach((user) => {
    merged.set(String(user.id), user);
  });
  return Array.from(merged.values());
}

export async function fetchUser(id) {
  const localUser = readUsers().find((user) => String(user.id) === String(id));
  if (localUser) return localUser;
  const response = await axios.get(`${API_URL}/${id}`);
  return formatUser(response.data);
}

export function saveUser(userData) {
  const savedUsers = readUsers();
  const index = savedUsers.findIndex((user) => String(user.id) === String(userData.id));
  if (index >= 0) {
    savedUsers[index] = userData;
  } else {
    savedUsers.unshift(userData);
  }
  writeUsers(savedUsers);
}

export function removeUser(id) {
  const savedUsers = readUsers();
  writeUsers(savedUsers.filter((user) => String(user.id) !== String(id)));
}
