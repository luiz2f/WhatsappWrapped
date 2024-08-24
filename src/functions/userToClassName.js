export function userToClassName(user) {
  if (!user) {
    return "default"; // or some fallback value
  }
  return user.replace(/\s+/g, "").toLowerCase();
}
