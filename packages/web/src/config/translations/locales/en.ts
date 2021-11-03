export default {
  game: {
    pageLoadingAssets: "Loading assets... ({{count}}/{{total}})",
    pageLoading: "Loading game...",
  },
  games: {
    cacao: {
      actions: {
        confirmSelection: {
          label: "Confirm",
        },
        resetSelection: {
          label: "Reset",
        },
        rotateLeft: {
          label: "Rotate left",
        },
        rotateRight: {
          label: "Rotate right",
        },
      },
      banner: {
        selectForestPosition: {
          label: "Choose a Forest space to fill",
        },
        selectForestTile: {
          label: "Choose a Forest tile from the display",
        },
        selectVillagePosition: {
          label: "Choose a Village space to build on",
        },
        selectVillageTile: {
          label: "Choose a Village tile from your hand",
        },
      },
      forest: {
        beans1: {
          description:
            "For each adjacent worker, add 1 Cacao bean to your storage (max 5).",
          label: "Cacao plantation",
        },
        beans2: {
          description:
            "For each adjacent worker, add 2 Cacao beans to your storage (max 5).",
          label: "Cacao plantation",
        },
        gold1: {
          description: "For each adjacent worker, you get 1 Coin.",
          label: "Gold mine",
        },
        gold2: {
          description: "For each adjacent worker, you get 2 Coins.",
          label: "Gold mine",
        },
        kitchen: {
          description:
            "For each adjacent worker, transform 1 Cacao bean in your storage into 1 Chocolate bar. Chocolate bars can be sold for 7 Coins in some markets.",
          label: "Chocolate kitchen",
        },
        market2: {
          description:
            "For each adjacent worker, you may sell 1 Cacao bean for 2 Coins.",
          label: "Market",
        },
        market3: {
          description:
            "For each adjacent worker, you may sell 1 Cacao bean for 3 Coins.",
          label: "Market",
        },
        market3_chocolate: {
          description:
            "For each adjacent worker, you may sell 1 Cacao bean for 3 Coins or 1 Chocolate bar for 7 Coins.",
          label: "Chocolate market",
        },
        market4: {
          description:
            "For each adjacent worker, you may sell 1 Cacao bean for 4 Coins.",
          label: "Market",
        },
        market5: {
          description:
            "For each adjacent worker, you may sell 1 Cacao bean for 5 Coins.",
          label: "Market",
        },
        sun: {
          description:
            "For each adjacent worker, you get 1 Sun Disk (max 3). After all Jungle tiles have been placed, players may spend Sun Disks to overbuild on their own tiles. Unused Sun Disks are worth 1 Coin each at the end of the game.",
          label: "Sun-worshipping site",
        },
        temple6: {
          description:
            "At the end of the game, the player with the most adjacent workers gets 6 Coins. Second place also gives 3 Coins.",
          label: "Temple",
        },
        temple8: {
          description:
            "At the end of the game, the player with the most adjacent workers gets 8 Coins. Second place only gives 1 Coin.",
          label: "Golden temple",
        },
        tree: {
          description:
            "For each adjacent worker, you get 1 Coin. If there are no adjacent workers, gain 3 Coins instead.",
          label: "Tree of Life",
        },
        water: {
          description:
            "For each adjacent worker, move your Water Carrier forward 1 space.",
          label: "Water spring",
        },
      },
      name: "Cacao",
      player: {
        beans: {
          label: "Storage: {{beans}} beans / {{max}}",
        },
        beansWithChocolate: {
          label: "Storage: {{beans}} beans + {{chocolate}} bars / {{max}}",
        },
        name: {
          label: "{{name}} ({{score}}pts)",
        },
        over: {
          label: "Final score: {{score}}pts",
        },
        ready: {
          label: "Ready",
        },
        sun: {
          label: "Sun disks: {{sun}} / {{max}} ({{score}}pts)",
        },
        temple: {
          label: "Temples: {{score}}pts",
        },
        waiting: {
          label: "Waiting...",
        },
        water: {
          label: "Water carrier: {{water}} / {{max}} ({{score}}pts)",
        },
      },
    },
    metropolys: {
      name: "Metropolys",
    },
    papayoo: {
      actions: {
        discard: "Discard {{value}} of {{color}}",
        play: "Play {{value}} of {{color}}",
        swap: "Swap {{value}} of {{color}}",
        unswap: "Return to hand",
      },
      banner: {
        play: {
          message: "Choose a card to play or discard",
        },
        swap: {
          actions: {
            confirm: {
              label: "Confirm",
            },
          },
          message: "Choose {{count}} cards to pass to the next player",
          ready: "Waiting for other players...",
        },
      },
      card: {
        empty: "Empty",
        label: "{{value}} of {{color}}",
        tooltip: "{{value}} of {{color}} ({{score}} points)",
      },
      color: {
        0: "Payoos",
        1: "Spades",
        2: "Hearts",
        3: "Clubs",
        4: "Diamonds",
      },
      name: "Papayoo",
      reason: {
        notPlayable: "You must play a card of the requested color if able.",
        notYourTurn: "It's not your turn to play.",
      },
    },
    roborally: {
      name: "Roborally",
    },
  },
  home: {
    gameTile: {
      tooltip: "Show {{game}} rooms",
    },
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
