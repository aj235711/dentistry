import * as React from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";
import { Pie, Bar } from "react-chartjs-2";

import useData from "./data";
import { Placeholder } from "..";
import { IResultItem } from "../../interfaces/result";

interface IProps {
  submissionId: string;
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  ArcElement,
  Tooltip,
  Legend
);

export const getPieData = (result: IResultItem) => {
  return {
    labels: ["YES", "NO", "N/A"],
    datasets: [
      {
        data: [result.yes, result.no, result.na],
        backgroundColor: [
          "rgba(50, 255, 160, 0.4)",
          "rgba(255, 50, 50, 0.4)",
          "rgba(220, 220, 86, 0.4)",
        ],
        borderColor: [
          "rgba(50, 255, 160, 1)",
          "rgba(255, 50, 50, 1)",
          "rgba(220, 220, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
};

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "bottom" as const,
    },
    title: {
      display: true,
      text: "Final Result",
      position: "bottom" as const,
    },
  },
  maintainAspectRatio: false,
};

export const getBarData = (results: IResultItem[]) => {
  return {
    labels: results.map((result) => result.category.name),
    datasets: [
      {
        label: "Marked YES",
        data: results.map((result) => result.yes),
        backgroundColor: "rgba(53, 162, 235, 0.8)",
      },
    ],
  };
};

const getFinalScore = (results: IResultItem[]) => {
  const totalYes = results.reduce((acc, curr) => acc + curr.yes, 0);
  const total = results.reduce((acc, curr) => acc + curr.total - curr.na, 0);
  return `${totalYes} / ${total}`;
};

const ResultGraphs: React.FC<IProps> = ({ submissionId }) => {
  const { state } = useData({ submissionId });

  const { results, loading } = state;

  if (loading) {
    return <Placeholder height={800} />;
  }

  return (
    <>
      <div className="w-full flex flex-wrap justify-center">
        {results.map((result) => (
          <div
            key={result.category._id}
            className="m-5 w-5/6 lg:w-5/12 rounded-md shadow-lg border border-gray-200"
          >
            <div className="w-full py-3 px-3 border-b border-gray-200">
              {result.category.name}
            </div>
            <div className="w-full pb-5 pt-2 flex flex-wrap justify-center lg:justify-start">
              <div className="w-5/6 md:w-2/3 lg:w-1/2 p-5">
                <Pie data={getPieData(result)} />
              </div>
              <div className="w-1/2 lg:w-1/4 px-5 flex flex-wrap justify-center items-center content-center">
                <div className="w-full py-1 text-sm lg:text-xs xl:text-sm">{`Total Questions - ${result.total}`}</div>
                <div className="w-full py-1 text-sm lg:text-xs xl:text-sm">{`Marked YES - ${result.yes}`}</div>
                <div className="w-full py-1 text-sm lg:text-xs xl:text-sm">{`Marked NO - ${result.no}`}</div>
                {result.category.showNa === "YES" && (
                  <div className="w-full py-1 text-sm lg:text-xs xl:text-sm">{`Marked N/A - ${result.na}`}</div>
                )}
              </div>
              <div className="w-1/2 lg:w-1/4 flex flex-wrap items-center content-center">
                <div className="w-full text-center text-3xl underline py-1 font-bold">
                  Total
                </div>
                <div className="w-full text-center text-2xl py-1">{`${
                  result.yes
                } / ${result.total - result.na}`}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="w-full flex justify-center flex-wrap mt-5 mb-10">
        <div className="w-5/6 lg:w-4/5 rounded-md shadow-lg border border-gray-200">
          <div className="w-full py-3 px-3 border-b border-gray-200">
            FINAL RESULT
          </div>
          <div className="w-full pb-5 pt-2 flex flex-wrap justify-center lg:justify-start">
            <div className="w-full lg:w-1/2 h-96 p-5 pt-8">
              <Bar options={options} data={getBarData(results)} />
            </div>
            <div className="w-1/2 flex flex-wrap items-center content-center">
              <div className="w-full text-center text-3xl underline py-1 font-bold">
                Final Score
              </div>
              <div className="w-full text-center text-2xl py-1">
                {getFinalScore(results)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResultGraphs;
