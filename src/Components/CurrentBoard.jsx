import React from "react";
const board_id = process.env.REACT_APP_BOARD_ID;

export const CurrentBoard = () => {
  return (
    <div>
      <iframe
        title="OIC Vestaboard"
        src="https://simulator.vestaboard.com/?boardId=8a42a837-3d48-4732-8020-2a8ede87258c"
        width="680"
        height="379.7"
        scrolling="no"
        style={{ border: "none" }}
      ></iframe>
    </div>
  );
};
