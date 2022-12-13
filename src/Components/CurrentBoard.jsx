import React from "react";
const board_id = process.env.REACT_APP_BOARD_ID;

export const CurrentBoard = () => {
  return (
    <div>
      <iframe
        title="OIC Vestaboard"
        src`"https://simulator.vestaboard.com/?boardId=${board_id}`
        width="680"
        height="379.7"
        scrolling="no"
        style={{ border: "none" }}
      ></iframe>
    </div>
  );
};
