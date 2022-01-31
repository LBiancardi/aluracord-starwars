function GlobalStyle() {
  return (
    <head>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
      />
      <title>StarsCord || Home </title>
      <style global jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          list-style: none;
        }
        body {
          font-family: "Open Sans", sans-serif;
        }
        /* App fit Height */
        html,
        body,
        #__next {
          min-height: 100vh;
          display: flex;
          flex: 1;
        }
        #__next {
          flex: 1;
        }
        #__next > * {
          flex: 1;
        }
        /* ./App fit Height */

        ul::-webkit-scrollbar,
        textarea::-webkit-scrollbar {
          width: 5px;
        }
        ul::-webkit-scrollbar-thumb,
        textarea::-webkit-scrollbar-thumb {
          background-color: rgba(36, 39, 52, 0.7);
          border-radius: 50px;
        }
      `}</style>
    </head>
  );
}

export default function MyApp({ Component, pageProps }) {
  // console.log("Roda em todas as paginas");
  // _app tem que ser o nome da pasta para funcionar
  return (
    <>
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  );
}
