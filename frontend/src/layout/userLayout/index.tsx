import { ReactNode } from "react";
import Container from "../container";
import TopNav from "./TopNav";


export default function UserLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <Container className="relative flex flex-col">
      <TopNav />
      <main className="w-full h-full overflow-hidden flex bg-floral dark:bg-black mt-18">
        <div role="presentation" className="relative w-full max-w-7xl h-full mx-auto pt-8 pb-4 overflow-x-hidden px-4 lg:px-6 2xl:px-0">
          {children}
          <div className="w-full py-3" />
        </div>
      </main>
    </Container>
  )
}
