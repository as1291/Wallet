import { type JSX } from "react";

export function Card({
  className,
  title,
  children,
  href,
}: {
  className?: string;
  title: string;
  children: React.ReactNode;
  href?: string;
}): JSX.Element {
  return (
    // <a
    //   className={className}
    //   href={`${href}?utm_source=create-turbo&utm_medium=basic&utm_campaign=create-turbo"`}
    //   rel="noopener noreferrer"
    //   target="_blank"
    // >
    //   <h2>
    //     {title} <span>-&gt;</span>
    //   </h2>
    //   <p>{children}</p>
    // </a>
      <div
      className="border p-6 bg-white rounded-xl bg-[#ededed]"
    >
      <h1 className="text-xl border-b pb-2">
        {title}
      </h1>
      {children}
    </div>
  );
}
