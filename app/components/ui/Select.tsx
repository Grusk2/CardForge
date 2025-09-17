"use client";

import { forwardRef } from "react";
import { ChevronUpDownIcon } from "@heroicons/react/24/outline";
import clsx from "classnames";

type SelectProps = React.ComponentPropsWithoutRef<"select">;

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { className, children, ...props },
  ref
) {
  return (
    <div className="relative">
      <select
        ref={ref}
        {...props}
        className={clsx(
          "w-full appearance-none rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-inner shadow-slate-100 focus:border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:shadow-none dark:focus:border-primary-500 dark:focus:ring-primary-600/40",
          className
        )}
      >
        {children}
      </select>
      <ChevronUpDownIcon className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
    </div>
  );
});
