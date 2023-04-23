import { feedBackData } from "./server/data/index.js";
import {userData } from "./server/data/index.js"

try{
    const upFeed = await feedBackData.update("64456db258cb930fc0044ca8","false",3,5,4,"test")
    console.log(upFeed);
}catch(e){
    console.log(e);
}


// try {
//   let users = await userData.getAllUser(false)
//   console.log(users);
// } catch (e) {
//   console.log(e);
// }
// try {
//   let users = await feedBackData.getAll()
//   console.log(users);
// } catch (e) {
//   console.log(e);
// }

// try {
//   let firstfeed = await feedBackData.createFeedBack(
//     "643b7312a23709af14b68ff4",
//     "643b7312a23709af14b68ff4",
//     true,
//     3,
//     4,
//     2,
//     "rightNow"
//   );
//   console.log(firstfeed);
// } catch (e) {
//   console.log(e);
// }

// try {
//   let secondfeed = await feedBackData.createFeedBack(
//     "643b7312a23709af14b68ff4",
//     "643b7312a23709af14b68ff4",
//     false,
//     4,
//     4,
//     4,
//     "pretty good"
//   );
//   console.log(secondfeed);
// } catch (e) {
//   console.log(e);
// }
// try {
//   let thirdfeed = await feedBackData.createFeedBack(
//     "643b7312a23709af14b68ff4",
//     "643b7312a23709af14b68ff4",
//     false,
//     2,
//     3,
//     5,
//     "meh"
//   );
//   console.log(thirdfeed);
// } catch (e) {
//   console.log(e);
// }

// try {
//   const all = await feedBackData.update("643ec8b9264dc18e42bd5d03",true,3,4,2,"pretty");
//   //const all = await feedBackData.getAll()
//   console.log(all);
// } catch (e) {
//   console.log(e);
// }
