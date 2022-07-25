import React from "react";
import "./App.css";
import Inputs from "./components/Inputs";
import TimeAndLocation from "./components/TimeAndLocation";
import TimeAndLocations from "./components/TimeAndLocations";
import TemperatureAndDetails from "./components/TemperatureAndDetails";
import TemperatureAndDetailss from "./components/TemperatureAndDetailss";
import Forecast from "./components/Forecast";
import getFormattedWeatherData from "./services/weatherService";
import { useEffect, useState } from "react";
import HeaderButtons from "./components/HeaderButtons";
import {  Line } from "react-chartjs-2";





function App() {
  const [query, setQuery] = useState({ q: "jaipur" });
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState();
  const [ChartHourlyData, setChartHourlyData] = useState([]);
  const [DailyData, setDailyData] = useState([]);

  
  useEffect(() => {
    const fetchWeather = async () => {
      debugger

      let HourlyLabels = [];
      let Htemp = [];
      let DailyLabels = [];
      let Dtemp = [];
     


      await getFormattedWeatherData({ ...query, units }).then((data) => {
        debugger
        setChartHourlyData(data.hourly);
        setDailyData(data.daily);
        setWeather(data);
        for (const dataObj of data.daily.slice(0, 5)) {
          debugger
          DailyLabels.push(dataObj.title);
          Dtemp.push(dataObj.temp);
        }
        for (const dataObj of data.hourly.slice(0, 5)) {
          debugger
          HourlyLabels.push(dataObj.title);
          Htemp.push(dataObj.temp);
        }

        setDailyData({
          labels: DailyLabels,
          datasets: [
            {
              label: query.q + " Data in Hourly ",
              data: Dtemp,
              fill: true,
              backgroundColor: "rgba(75,192,195,0.2)",
              borderColor: "rgba(75,192,192,1)"
            }],
          options: {
            legend: {
              position: "right",
              labels: {
                boxWidth: 10
              }
            },
            scales: {
              xAxes: [
                {
                  ticks: { display: false }
                }
              ]
            }
          }
        });
        setChartHourlyData({
          labels: HourlyLabels,
          datasets: [
            {
              label: query.q + " (Data in Daily ) ",
              data: Htemp,
              fill: true,
              borderColor: "#742774",
              backgroundColor: "#c8bdda",
            }],
          options: {
            legend: {
              position: "right",
              labels: {
                boxWidth: 10
              }
            },
            scales: {
              xAxes: [
                {
                  ticks: { display: false }
                }
              ]
            }
          }
        });




      });
    };

    fetchWeather();
  }, [query, units]);

  const formatBackground = () => {
    debugger
    if (!weather) return "from-cyan-700 to-blue-700";
    const threshold = units === "metric" ? 20 : 60;
    if (weather.temp <= threshold) return "from-cyan-700 to-blue-700";

    return "from-yellow-700 to-orange-300";
  };

  return (
    <>
      <div className="row">
        <div className="col-lg-6 col-md-6 col-sm-6">
          <div className="row">
            <div className="col-lg-12 col-md-6 col-sm-6">
              <div className="{`mx-auto max-w-screen-md mt-4 px-32 bg-gradient-to-br  h-fit shadow-xl shadow-gray-400 ${formatBackground()} card">
                <div className="card">
                  <div className="card-header" style={{ fontSize: '22px' }}>
                    Forecast Chart for Daily Update
                  </div>
                  <div className="card-body">
                    <div className={`mx-auto max-w-screen-md py-5 px-32 bg-gradient-to-br  h-fit shadow-xl shadow-gray-400 ${formatBackground()}`}>
                      {weather && (
                        <div className="row">
                          <div className="col-ld-6 col-md-6 col-sm-12">
                            <TimeAndLocations weather={weather} />
                          </div>
                          <div className="col-ld-6 col-md-6 col-sm-12">
                            <TemperatureAndDetailss weather={weather} />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-12 col-md-6 col-sm-6">
              <div className="{`mx-auto max-w-screen-md mt-4 px-32 bg-gradient-to-br  h-fit shadow-xl shadow-gray-400 ${formatBackground()} card">
                <Line data={ChartHourlyData} height={200}
                  width={400} />
              </div>
            </div>
            <div className="col-lg-12 col-md-6 col-sm-6">
              <div className="{`mx-auto max-w-screen-md mt-4 px-32 bg-gradient-to-br  h-fit shadow-xl shadow-gray-400 ${formatBackground()} card">
                <Line data={DailyData} height={200}
                  width={400} />
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-6 col-md-6 col-sm-6">
          <div className='{`mx-auto max-w-screen-md mt-4 py-5 px-32 bg-gradient-to-br  h-fit shadow-xl shadow-gray-400 ${formatBackground()} card'>
            <div className="card-header" style={{ fontSize: '22px' }}>
              Weather Forecast Details
            </div>
            <div className="card-body">
              <div style={{ marginTop: '0px !important', }}
                className={`mx-auto max-w-screen-md px-32 bg-gradient-to-br  h-fit shadow-xl shadow-gray-400 ${formatBackground()}`}
              >
                <div className="card-header">
                  <HeaderButtons setQuery={setQuery} />
                  <Inputs setQuery={setQuery} units={units} setUnits={setUnits} />
                </div>


                {weather && (
                  <div>
                    <TimeAndLocation weather={weather} />
                    <TemperatureAndDetails weather={weather} />

                    <Forecast title="hourly forecast" items={weather.hourly} />
                    <Forecast title="daily forecast" items={weather.daily} />
                  </div>
                )}


              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
