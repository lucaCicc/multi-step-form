import { ReactNode } from "react";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

interface Pros {
  readonly children: ReactNode;
}

/**
 * Main
 *
 */
const Main = ({ children }: Pros) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="min-h-screen px-8 max-w-7xl mx-auto py-20">
          <div className="w-full px-2 lg:px-0">{children}</div>
        </main>
      </body>
    </html>
  );
};

export { Main };
