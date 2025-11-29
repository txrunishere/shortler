import { UserContextProvider } from "./app/providers";
import { AppRouter } from "./app/router/AppRouter";
import { Toaster } from "./components/ui/sonner";

function App() {
  return (
    <>
      <Toaster position="top-center" richColors />
      <UserContextProvider>
        <AppRouter />
      </UserContextProvider>
    </>
  )
}

export default App;
