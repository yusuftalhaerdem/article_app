import Chart from "chart.js/auto";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTags, tagsReport } from "../actions";
import { selectTagList, loadTags } from "../features/tagsSlice";
import { selectUser } from "../features/userSlice";

let myChart = null;
export const Reports = () => {
  const user = useSelector(selectUser);

  const chartFiller = (keys, values, border_colors, background_colors) => {
    console.log("chart is getting created");
    const ctx = document.getElementById("myChart").getContext("2d");
    if (myChart !== null) {
      myChart.destroy();
      myChart = null;
    }
    myChart = new Chart(ctx, {
      type: "pie",
      data: {
        labels: [...keys],
        datasets: [
          {
            label: "# of Votes",
            data: [...values],
            backgroundColor: [...background_colors],
            borderColor: [...border_colors],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
        plugins: {
          title: {
            display: true,
            text: "Number Of Articles Per Tag",
            color: "#5CB85C",
            font: {
              size: 16,
            },
          },
        },
      },
    });
  };

  const [state, setState] = useState([]);
  useEffect(() => {
    tagsReport(user.token, setState, state);
  }, [user]);

  const stringToColour = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    let rgb_numbers = [];
    for (let i = 0; i < 3; i++) {
      const value = (hash >> (i * 8)) & 255;
      rgb_numbers[i] = value.toString();
    }
    //console.log(rgb_numbers);
    return rgb_numbers.join(", ");
  };

  useEffect(() => {
    console.log(state);
    // it is tag names but we will use them as keys.
    const keys = state.map((current) => {
      return current.tag;
    });
    const lengths = state.map((current) => {
      return current.length;
    });
    const colors = keys.map((current) => {
      return stringToColour(current);
    });
    const border_colors = colors.map((color) => {
      return `rgba(${color} , 1)`;
    });
    const background_colors = colors.map((color) => {
      return `rgba(${color} , 0.2)`;
    });
    console.log(keys, lengths, border_colors, background_colors);
    if (lengths[0] !== undefined)
      chartFiller(keys, lengths, border_colors, background_colors);
  }, [state]);

  return (
    <>
      <div className="page">
        <div className="chart-container">
          <canvas id="myChart"></canvas>
        </div>
      </div>
    </>
  );
};
