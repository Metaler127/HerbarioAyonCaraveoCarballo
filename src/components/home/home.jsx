import React from "react";
import Cards from "./cards/cards";

function Home() {
  return (
    <div className="bg-[#474747] h-full overflow-auto flex-col">
      <div className="pt-24 p-4 flex-1 flex flex-wrap gap-3 justify-center ">
        <Cards />
      </div>
    </div>
  );
}

export default Home;
