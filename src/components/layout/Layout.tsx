import React from "react";
import Footer from "../widgets/Footer";
import Header from "../widgets/Header";

type Props = {
  children: React.ReactNode;
};

export const Layout = ({ children }: Props) => {
  return (
    <div className="bg-linear-to-br from backgorund to-muted">
      <Header />
      <main className="min-h-screen container mx-auto px-4 py-8">
        {children}
      </main>
      <Footer />
    </div>
  );
};
