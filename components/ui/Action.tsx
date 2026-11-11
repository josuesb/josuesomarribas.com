import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import styles from "./Action.module.css";

type Appearance = { variant?: "primary" | "secondary" | "light"; size?: "regular" | "small" };

export function ButtonLink({ variant="primary", size="regular", className="", children, ...props }: AnchorHTMLAttributes<HTMLAnchorElement> & Appearance) {
  return <a {...props} className={`${styles.button} ${className}`.trim()} data-ui="button" data-variant={variant} data-size={size}>{children}</a>;
}

export function Button({ variant="primary", size="regular", className="", type="button", ...props }: ButtonHTMLAttributes<HTMLButtonElement> & Appearance) {
  return <button {...props} type={type} className={`${styles.button} ${className}`.trim()} data-ui="button" data-variant={variant} data-size={size}/>;
}

export function TextLink({ className="", children, ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) {
  return <a {...props} className={`${styles.link} ${className}`.trim()} data-ui="text-link">{children}</a>;
}
