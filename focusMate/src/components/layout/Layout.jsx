import React from "react";
import Header from "./Header";
const Layout = ({ children, title, description, keywords, author }) => {
  return (
    <div className="bg-[#0F1B41] from-white via-[#f0f4ff] to-[#e8f0ff] min-h-screen">
      <Header />
      <main>{children}</main>
    </div>
  );
};

Layout.defaultProps = {
  title: "Focusmate",
  description: "mern stack project",
  keywords: "mern,react,node,mongodb",
  author: "Subham Srijit Lenka",
};

export default Layout;
