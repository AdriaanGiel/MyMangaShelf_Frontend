import { AuthProvider } from "./context/AuthProvider";
import { UserMediaProvider } from "./context/UserMediaListProvider";
import Root from "./Root";

export default function App() {
  return (
    <AuthProvider>
      <UserMediaProvider>
        <Root />
      </UserMediaProvider>
    </AuthProvider>
  );
}
