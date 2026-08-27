import type { Metadata } from "next";
import NotFound from "../not-found";

export const metadata: Metadata = {
  title: "404 — Signal lost · Josue Somarribas",
  description: "This page didn't survive the experiment.",
  robots: { index:false, follow:true },
};

export default NotFound;
