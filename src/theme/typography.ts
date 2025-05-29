
export const typography
  = () => {
    const isRtl = false;
    const returnFont = isRtl ? "Cairo" : "inherit"
    const returnBodyFont = isRtl ? "Cairo" : "inherit"

    return {
      fontFamily: isRtl ? ['Cairo'].join(",") : "inherit",

      button: {
        fontSize: "14px",
      },

      h1: {
        fontSize: 45,
        fontWeight: "bold",
        fontFamily: returnFont,
      },
      h2: {
        fontSize: 40,
        fontWeight: "bold",
        fontFamily: returnFont,
      },
      h3: {
        fontSize: 37,
        fontWeight: "bold",
        fontFamily: returnFont,
      },
      h4: {
        fontSize: 26,
        fontWeight: "bold",
        fontFamily: returnFont,
      },
      h5: {
        fontSize: 23,
        fontWeight: "bold",
        fontFamily: returnFont,
      },
      h6: {
        fontSize: 16,
        fontWeight: "bold",
        fontFamily: returnFont,
      },

      subtitle1: {
        fontSize: 14,
        fontWeight: "bold",
        fontFamily: returnFont,
      },
      subtitle2: {
        fontSize: 12,
        fontWeight: "bold",
        fontFamily: returnFont,
      },

      body1: {
        fontSize: 13,
        fontFamily: returnBodyFont,
      },
      body2: {
        fontSize: 12,
        fontFamily: returnBodyFont,
      },
      caption: {
        fontSize: 12,
        fontFamily: returnBodyFont,
      },
    }
  }
