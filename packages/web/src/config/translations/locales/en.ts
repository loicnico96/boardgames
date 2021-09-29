export default {
  home: {
    pageTitle: "Home",
  },
  login: {
    pageTitle: "Login",
    signInAnonymously: {
      label: "Sign in as guest",
      labelLoading: "Signing in...",
      reason: {
        alreadyLoggedIn: "Already logged in",
      },
    },
    signInWithGoogle: {
      label: "Sign in with Google",
      labelLoading: "Signing in...",
      reason: {
        alreadyLoggedIn: "Already logged in",
      },
    },
  },
  notFound: {
    message: "The page you're looking for doesn't exist.",
    pageTitle: "Are you lost?",
  },
  roomList: {
    createRoom: {
      label: "Create room",
      tooltip: "Create a new room",
      reason: {
        noGameSelected: "You must select a game",
        notAuthenticated: "You must be signed in to create or join rooms",
        noUserName: "You must set an username to create or join rooms",
      },
    },
    noRooms: "No rooms are available.",
    pageLoading: "Loading rooms...",
    pageTitle: "Rooms",
  },
  userProfile: {
    signOut: {
      label: "Sign out",
      tooltip: "Sign out",
    },
    userName: {
      defaultValue: "...",
      label: "Enter your user name",
      tooltip: "Click to change user name",
      reason: {
        empty: "User name cannot be empty",
      },
    },
  },
}
