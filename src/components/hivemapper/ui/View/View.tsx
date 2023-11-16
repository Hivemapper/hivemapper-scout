import React from "react";

export interface ViewProps {
  children: React.ReactNode;
}

const View: React.FC<ViewProps> = ({ children }) => {
  return (
    <div className="rounded-md border solid mt-3 overflow-hidden">
      {children}
    </div>
  );
};

export default View;
