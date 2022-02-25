import { ISubmission } from "../../interfaces/submission";

export const getScore = (submission: ISubmission) => {
  const [yes, total] = submission.questions.reduce(
    (acc, curr) => {
      if (curr.response === "YES") {
        return [acc[0] + 1, acc[1] + 1];
      } else if (curr.response === "NO") {
        return [acc[0], acc[1] + 1];
      } else {
        return acc;
      }
    },
    [0, 0]
  );
  return `${yes}/${total}`;
};
