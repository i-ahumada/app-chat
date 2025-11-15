import { UserProvider } from "./context/UserContext";
import { ChatProvider } from "./context/ChatContext";
import Navbar from "./components/Navbar";
import ChatPanel from "./components/ChatPanel";
import "./globals.css";


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="h-screen w-screen overflow-hidden">

        <UserProvider>
          <ChatProvider>

            <div className="grid grid-cols-[1fr_3fr_11fr] h-full w-full">

              <div className="h-full min-w-0 overflow-hidden border-r border-neutral-700 flex flex-col">
                <Navbar />
              </div>

              <div className="h-full min-w-0 overflow-hidden border-r border-neutral-700 flex flex-col">
                <ChatPanel />
              </div>

              <div className="h-full min-w-0 overflow-hidden flex flex-col">
                {children}
              </div>

            </div>

          </ChatProvider>
        </UserProvider>

      </body>
    </html>
  );
}

