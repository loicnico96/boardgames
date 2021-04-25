export async function promptUserName(oldName?: string) {
  // eslint-disable-next-line no-alert
  const newName = window.prompt("Enter your user name", oldName)?.trim()
  if (newName) {
    return newName
  } else {
    throw Error("Username cannot be empty")
  }
}
