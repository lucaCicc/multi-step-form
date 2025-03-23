import { ReactNode } from "react";

interface Pros {
  children: ReactNode;
  navigation: ReactNode;
}

/**
 *
 *
 */
const ContentWrapper: React.FC<Pros> = ({ children, navigation }) => {
  return (
    <div className="mt-4 lg:mt-20 mb-28 flex flex-col gap-x-16 text-white lg:flex-row">
      {navigation}
      <div className="w-full">{children}</div>
    </div>
  );
};

export { ContentWrapper };
