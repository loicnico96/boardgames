import { Global, useTheme } from "@emotion/react"

export function GlobalStyle() {
  const theme = useTheme()

  return (
    <Global
      styles={`
        html,
        body,
        #__next {
          font-family: ${theme.fonts.join(", ")};
          height: 100%;
          margin: 0;
          padding: 0;
        }

        * {
          box-sizing: border-box;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        button {
          cursor: pointer;
        }

        button:disabled {
          cursor: not-allowed;
        }
        `}
    />
  )
}
