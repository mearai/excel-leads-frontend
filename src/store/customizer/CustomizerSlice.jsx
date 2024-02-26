import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeDir: 'ltr',
  activeMode: 'light', // This can be light or dark
  activeTheme: 'BLUE_THEME', // BLUE_THEME, GREEN_THEME, BLACK_THEME, PURPLE_THEME, ORANGE_THEME
  SidebarWidth: 270,
  MiniSidebarWidth: 87,
  TopbarHeight: 70,
  isLayout: 'boxed', // This can be full or boxed
  isCollapse: false, // to make sidebar Mini by default
  isSidebarHover: false,
  isMobileSidebar: false,
  isHorizontal: false,
  isLanguage: 'en',
  isCardShadow: true,
  borderRadius: 7,
};

export const CustomizerSlice = createSlice({
  name: 'customizer',
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.activeTheme = action.payload;
    },
    setDarkMode: (state, action) => {
      state.activeMode = action.payload;
    },
    hoverSidebar: (state, action) => {
      state.isSidebarHover = action.payload;
    },
    toggleSidebar: (state) => {
      state.isCollapse = !state.isCollapse;
    }
  },
});

export const {
  setTheme,
  setDarkMode,
  hoverSidebar,
  toggleSidebar
} = CustomizerSlice.actions;

export default CustomizerSlice.reducer;
