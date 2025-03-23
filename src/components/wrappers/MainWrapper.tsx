import { ReactNode } from "react";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

interface Pros {
  children: ReactNode;
}

/**
 *
 *
 */
const Main = ({ children }: Pros) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="min-h-screen pr-4 pl-4 lg:pr-16 lg:pl-16 max-w-7xl mx-auto py-4 lg:py-16">
          <div className="w-full">{children}</div>
        </main>
      </body>
    </html>
  );
};

export { Main };
