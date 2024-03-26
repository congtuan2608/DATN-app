export const ThemeConfig = {
  DefaultTheme: {
    primaryBackgroundColor: "rgb(248 113 113)",

    //text color
    primaryTextColor: "black",
    primaryFocusedColor: "white",
    secondTextColor: "#FFFFFF",
    thirdTextColor: "#828282",
    //button color
    primaryButtonBackgroundColor: "#8278F0",
    primaryDisabledButtonColor: "#e5e5e5",
  },
  DarkTheme: {
    primaryBackgroundColor: "blue",
    primaryTextColor: "black",
    primaryFocusedColor: "white",
    primarySecondTextColor: "#FFFFFF",
    primaryButtonBackgroundColor: "#8278F0",
    primaryDisabledButtonColor: "#e5e5e5",
  },
  GreenTheme: {
    primaryBackgroundColor: "green",
    primaryTextColor: "black",
    primaryFocusedColor: "white",
    primarySecondTextColor: "#FFFFFF",
    primaryButtonBackgroundColor: "red",
    primaryDisabledButtonColor: "#e5e5e5",
  },
};

export const listTheme = [
  { label: "Default", key: "DefaultTheme" },
  { label: "Dark", key: "DarkTheme" },
  { label: "Green", key: "GreenTheme" },
];
