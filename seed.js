import { feedBackData } from "./server/data/index.js";

try {
  let firstfeed = await feedBackData.createFeedBack(
    "643b7312a23709af14b68ff4",
    "643b7312a23709af14b68ff4",
    true,
    3,
    4,
    2,
    "good"
  );
  console.log(firstfeed);
} catch (e) {
  console.log(e);
}
