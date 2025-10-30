import { Suspense, useEffect, useState } from "react";

import { getCurrentScreen } from "@auth0/auth0-acul-js";

import { getScreenComponent } from "@/utils/screen/screenLoader";

const App = () => {
  // Default to the visual "login" screen so the modified UI shows by default
  const [screen, setScreen] = useState("login");

  useEffect(() => {
    const current = getCurrentScreen();
    setScreen(current || "login");
  }, []);

  const ScreenComponent = getScreenComponent(screen);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      {ScreenComponent ? (
        <ScreenComponent />
      ) : (
        <div>Screen &quot;{screen}&quot; not implemented yet</div>
      )}
    </Suspense>
  );
};

export default App;
