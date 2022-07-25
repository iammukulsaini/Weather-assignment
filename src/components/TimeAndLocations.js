import React from "react";
import { formatToLocalTime } from "../services/weatherService";

function TimeAndLocations({ weather: { dt, timezone, name, country } }) {
  return (
    <div className="">
      <div className="col-lg-12 col-md-12 col-sm-12 items-center justify-center my-6">
        <p className="text-white text-xl font-extralight">
          {formatToLocalTime(dt, timezone)}
        </p>
      </div>

      <div className="col-lg-12 col-md-12 col-sm-12 items-center justify-center my-3">
        <p className="text-white text-3xl font-medium">{`${name}, ${country}`}</p>
      </div>
    </div>
  );
}

export default TimeAndLocations;
