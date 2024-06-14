import CSS from "./App.module.css";

import React, { useEffect, useState } from 'react';
import AppHeader from "./components/appHeader/AppHeader";
import MobilePage from "./mobile/MobilePage";
import AkeyGen from "./pages/akeygen/AkeyGen";
import SnipeMngr from "./pages/snipeit/SnipeMngr";

const App = () => {
  const [mobileCheck, setMobileCheck] = useState(false);

  const checkIfMobile = () => {
    const screenWidth = window.innerWidth;
    return screenWidth < 768
  };

  useEffect(() => {
    setMobileCheck(checkIfMobile());

    const handleResize = () => {
      setMobileCheck(checkIfMobile());
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <main className={CSS.main}>
      {mobileCheck && <MobilePage />}

      {!mobileCheck && <div>
        <AppHeader />

        {false && <SnipeMngr />}
        {true && <AkeyGen />}
      </div>}
    </main>
  );
};

export default App;
