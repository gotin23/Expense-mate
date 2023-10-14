import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../Types/types";

export default function MyGroup() {
  const users = useSelector((state: RootState) => state.user);

  return (
    <div>
      <h1>Hello le group!</h1>
    </div>
  );
}
