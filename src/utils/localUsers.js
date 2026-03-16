const LOCAL_USERS_KEY = "local-created-users";
const DELETED_USERS_KEY = "local-deleted-users";

export function getLocalUsers() {
  const storedUsers = localStorage.getItem(LOCAL_USERS_KEY);

  if (!storedUsers) {
    return [];
  }

  try {
    const parsedUsers = JSON.parse(storedUsers);
    return Array.isArray(parsedUsers) ? parsedUsers : [];
  } catch {
    return [];
  }
}

export function saveLocalUser(user) {
  const users = getLocalUsers();
  localStorage.setItem(LOCAL_USERS_KEY, JSON.stringify([user, ...users]));
}

export function getLocalUserById(id) {
  const users = getLocalUsers();
  return users.find((user) => String(user.id) === String(id));
}

export function removeLocalUserById(id) {
  const users = getLocalUsers().filter((user) => String(user.id) !== String(id));
  localStorage.setItem(LOCAL_USERS_KEY, JSON.stringify(users));
}

export function getDeletedUserIds() {
  const storedIds = localStorage.getItem(DELETED_USERS_KEY);

  if (!storedIds) {
    return [];
  }

  try {
    const parsedIds = JSON.parse(storedIds);
    return Array.isArray(parsedIds) ? parsedIds : [];
  } catch {
    return [];
  }
}

export function saveDeletedUserId(id) {
  const deletedIds = getDeletedUserIds();

  if (deletedIds.includes(String(id))) {
    return;
  }

  localStorage.setItem(DELETED_USERS_KEY, JSON.stringify([...deletedIds, String(id)]));
}

export function isUserDeleted(id) {
  return getDeletedUserIds().includes(String(id));
}
