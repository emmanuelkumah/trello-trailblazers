import { ReactNode } from "react";
import Container from "../container";
import TopNav from "./TopNav";


export default function UserLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <Container className="relative flex flex-col">
      <TopNav />
      <main className="w-full h-full overflow-hidden flex bg-floral dark:bg-black mt-18">
        <div role="presentation" className="relative w-full max-w-7xl h-full mx-auto py-8 overflow-x-hidden">
          {children}
          <div className="w-full py-6" />
        </div>
      </main>
    </Container>
  )
}
