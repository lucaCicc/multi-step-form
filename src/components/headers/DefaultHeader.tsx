import React from "react";

interface Props {
  readonly title: string;
  readonly subtitle?: string;
}

/**
 *
 *
 */
const DefaultHeader = ({ title, subtitle }: Props) => {
  return (
    <>
      <h1 className="mb-4 text-4xl font-semibold text-white md:text-7xl">
        {title}
      </h1>
      {subtitle && (
        <span className="text-sm font-light text-white md:text-2xl">
          {subtitle}
        </span>
      )}
    </>
  );
};

export { DefaultHeader };
