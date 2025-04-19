import { configureStore } from "@reduxjs/toolkit";
import { AllAPIs } from "../features/API";
import SearchSlice from "../features/SearchSlice";

export const store = configureStore({
  reducer: {
 
    [AllAPIs.reducerPath]: AllAPIs.reducer,
    inputs: SearchSlice,

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(AllAPIs.middleware)
      
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
