export async function promptUserName(oldName?: string): Promise<string | null> {
  // eslint-disable-next-line no-alert
  const userName = window.prompt("Enter your user name", oldName)
  if (userName) {
    return userName.trim()
  } else {
    return null
  }
}
