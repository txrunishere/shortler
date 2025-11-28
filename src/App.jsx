import { AppRouter } from "./app/router/AppRouter";
import { Toaster } from "./components/ui/sonner";

function App() {
  return (
    <>
      <Toaster position="top-center" richColors />
      <AppRouter />
    </>
  )
}

export default App;
