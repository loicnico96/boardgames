export default {
  game: {
    pageLoading: "Loading game...",
  },
  games: {
    metropolys: {
      name: "Metropolys",
    },
    papayoo: {
      name: "Papayoo",
    },
    roborally: {
      name: "Roborally",
    },
  },
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
  room: {
    closedByOwner: "The room has been closed by its owner.",
    closeRoom: {
      label: "Close",
      reason: {
        alreadyStarted: "The game has already started",
        notOwner: "Only the room's owner can close the room",
      },
      success: "Room closed",
      tooltip: "Close this room",
    },
    enterRoom: {
      label: "Join",
      reason: {
        alreadyInRoom: "You have already joined this room",
        alreadyFull: "This room is already full",
        alreadyStarted: "The game has already started",
        notAuthenticated: "You must be signed in to create or join rooms",
        noUserName: "You must set an username to create or join rooms",
      },
      tooltip: "Join this room as a player",
    },
    leaveRoom: {
      label: "Leave",
      reason: {
        alreadyStarted: "The game has already started",
        isOwner: "You cannot leave this room",
        notAuthenticated: "You must be signed in to create or join rooms",
        notInRoom: "You are not a player in this room",
      },
      tooltip: "Leave this room",
    },
    notFound: "This room does not exist or has been closed.",
    pageError: "An error occurred.",
    pageLoading: "Loading room...",
    pageTitle: "Room",
    startGame: {
      label: "Start",
      reason: {
        alreadyStarted: "The game has already started",
        notEnoughPlayers: "This room doesn't have enough players",
        notOwner: "Only the room's owner can start the game",
      },
      tooltip: "Start the game",
    },
  },
  roomList: {
    allGames: "All games",
    createRoom: {
      label: "Create room",
      reason: {
        noGameSelected: "You must select a game",
        notAuthenticated: "You must be signed in to create or join rooms",
        noUserName: "You must set an username to create or join rooms",
      },
      success: "Room created",
      tooltip: "Create a new room",
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
      reason: {
        empty: "User name cannot be empty",
      },
      tooltip: "Click to change user name",
    },
  },
}
