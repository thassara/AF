import { configureStore } from "@reduxjs/toolkit";
import { AllAPIs } from "../features/API";

export const store = configureStore({
  reducer: {
 
    [AllAPIs.reducerPath]: AllAPIs.reducer,

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(AllAPIs.middleware)
      
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
