import { replace, TranslationConfig } from "./types"

const CONFIG: TranslationConfig = {
  games: {
    metropolys: {
      name: "Metropolys",
    },
    roborally: {
      boards: {
        // TODO
      },
      name: "Roborally",
      roomBoards: replace("Boards: {{boardNames}}"),
    },
  },
  general: {
    listSeparator: ", ",
  },
  home: {
    gameTile: {
      tooltip: "Click to show rooms",
    },
    pageTitle: "Home",
  },
  login: {
    pageTitle: "Login",
    rememberMe: "Remember me",
    setUserName: "Click to change user name",
    signIn: "Sign in",
    signInAnonymously: {
      label: "Sign in as guest",
      reason: {},
      tooltip: "Sign in as guest",
    },
    signInWithGoogle: {
      label: "Sign in with Google",
      reason: {},
      tooltip: "Sign in with Google",
    },
    signOut: {
      label: "Sign out",
      reason: {},
      tooltip: "Sign out",
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
      tooltip: "Create a new room",
    },
    noRooms: "No rooms are available.",
    pageLoading: "Loading rooms...",
    pageTitle: "All games",
  },
  roomPage: {
    closeRoom: {
      label: "Close",
      reason: {
        notAuthenticated: "The room can only be closed by the room's owner",
        notOwner: "The room can only be closed by the room's owner",
      },
      tooltip: "Close this room",
    },
    enterRoom: {
      label: "Join",
      reason: {
        alreadyInRoom: "You have already joined this room",
        notAuthenticated: "You must be signed in to create or join rooms",
        noUserName: "You must set an username to create or join rooms",
      },
      tooltip: "Join this room as a player",
    },
    leaveRoom: {
      label: "Leave",
      reason: {
        isOwner: "You cannot leave a room that you have created",
        notAuthenticated: "You are not a player in this room",
        notInRoom: "You are not a player in this room",
      },
      tooltip: "Leave this room",
    },
    pageLoading: "Loading room...",
    pageTitle: "Room",
    roomOwner: replace("{{playerName}} (owner)"),
    roomPlayers: replace("Players: {{playerNames}}"),
    roomTitle: replace("{{gameType}} - {{roomStatus}}"),
    startGame: {
      label: "Start",
      reason: {
        notAuthenticated: "The game can only be started by the room's owner",
        notOwner: "The game can only be started by the room's owner",
      },
      tooltip: "Start the game",
    },
  },
  roomStatus: {
    finished: "Finished",
    ongoing: "Ongoing",
    opened: "Opened",
  },
}

export default CONFIG
