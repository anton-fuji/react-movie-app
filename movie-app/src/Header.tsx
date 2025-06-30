import  "./App.css";
import type { ReactNode } from "react";

function Header({ children }: {children: ReactNode}) {
  return (
    <div>
        <header className="app-header">
            <h1 className="app-title">MOVIEFLIX</h1>
        </header>
        <main>{children}</main>
    </div>
  );
}

export default Header;