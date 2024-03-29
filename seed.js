import { faker } from "@faker-js/faker";
import https from "https";
import userData from "./server/data/user.js";
import { journalData } from "./server/data/index.js";
import userInfo from "./users.js";
import feedbackInfo from "./feedbackFake.js";
import { addMessagesToChat, getAllChatId } from "./server/data/chat.js";
import { feedData } from "./server/data/index.js";
import { feedBackData } from "./server/data/index.js";
import feeds from "./feedsFake.js";


const createFeeds = async () => {
  let feedIds = []
  feedIds = await Promise.all(feeds.map(async (feed) => feedData.createFeed(
        feed.title,
        feed.description,
        feed.type,
        feed.images
  )))
  return feedIds
}

const imageUrlToBase64 = async (url) => {
  return new Promise((resolve, reject) => {
    https
      .get(url, (response) => {
        const chunks = [];

        response.on("data", (chunk) => {
          chunks.push(chunk);
        });

        response.on("end", () => {
          const buffer = Buffer.concat(chunks);
          const base64 = buffer.toString("base64");
          resolve("data:image/jpeg;base64," + base64);
        });
      })
      .on("error", (error) => {
        reject(error);
      });
  });
};

const createFeedback = async (chatArray, feedbacks) => {
  try {
    for (const chat of chatArray) {
      const userIds = chat.users;
      const chatId = chat._id;

      for (const userId of userIds) {
        const feedback = feedbacks[Math.floor(Math.random() * feedbacks.length)];

        const createdFeedback = await feedBackData.createFeedBack(
          userId,
          chatId,
          feedback.isPublic,
          feedback.rating.reconnect_probability,
          feedback.rating.satisfied_with_chat,
          feedback.rating.listener_rating,
          feedback.description
        );
        console.log(`Created feedback ${createdFeedback._id} for user ${userId} in chat ${chatId}`);
      }
    }
  } catch (e) {
    console.log(e);
  }
};

const createFeedLikeSaveComment = async (users, feedIds) => {
  const likePromises = users.map((user) => feedData.updateLike(user._id, feedIds[0], true))
  const likePromises2 = users.map((user) => feedData.updateLike(user._id, feedIds[1], true))
  
  await Promise.all(likePromises)
  await Promise.all(likePromises2)

  console.log('Create likes for users')
  const savePromises = users.map((user) => feedData.savePost(user._id, feedIds[0], true))
  const savePromises2 = users.map((user) => feedData.savePost(user._id, feedIds[1], true))
  
  await Promise.all(savePromises)
  await Promise.all(savePromises2)

  console.log('Create saves for users')
  const commentPromises = users.map((user) => feedData.updateComment({ userId: user._id, feedId: feedIds[0], message: 'my comment', userName: `${user.firstName} ${user.lastName}` }))
  const commentPromises2 = users.map((user) => feedData.updateComment({ userId: user._id, feedId: feedIds[1], message: 'my comment', userName: `${user.firstName} ${user.lastName}` }))
  
  await Promise.all(commentPromises)
  await Promise.all(commentPromises2)
  console.log('Create comments for users')
}

const createConversations = async (seekerIds, listenerIds) => {
  try {
    const messages = [
      "Hi! How are you?",
      "What brings you here today?",
      "How can I help you?",
      "Tell me about yourself.",
      "What's on your mind?",
      "Is there anything you want to talk about?",
      "How has your day been?",
      "What do you like to do for fun?",
      "Do you have any hobbies?",
      "What's your favorite book/movie/band?",
    ];

    for (const seekerId of seekerIds) {
      for (const listenerId of listenerIds) {
        await addMessagesToChat(
          seekerId,
          listenerId,
          messages[Math.floor(Math.random() * messages.length)]
        );
        console.log(`Created chat between seeker ${seekerId} and listener ${listenerId}`);
      }
    }

    const chatIdArray = await getAllChatId();
    const feedbacks = feedbackInfo.feedback;

    await createFeedback(chatIdArray, feedbacks);
  } catch (e) {
    console.log(e);
  }
};

const createUsersAndJournals = async (users, messages) => {
  try {
    for (const user of users) {
      const profilePicBase64 = await imageUrlToBase64(faker.image.avatar());
      const createdUser = await userData.create(
        user.firstName,
        user.lastName,
        user.username,
        user.email,
        user.password,
        user.gender,
        user.age,
        user.city,
        user.state,
        user.isAnonymous,
        user.role,
        profilePicBase64
      );

      const randomIndex = Math.floor(Math.random() * messages.length);
      const message = messages[randomIndex];

      const startDate = "2023-05-07";
      const endDate = "2023-12-31";
      const start = new Date(startDate).getTime();
      const end = new Date(endDate).getTime();
      const randomTime = Math.random() * (end - start) + start;
      const randomDate = new Date(randomTime);
      const date = randomDate.toISOString();

      const journalEntry = await journalData.CreateJournal(
        createdUser._id,
        message,
        date
      );
      console.log(`Created journal entry for user ${createdUser.username}`);
    }

    const idArray = await userData.allUsers();
    const seekerIds = [];
    const listenerIds = [];

    idArray.forEach((obj) => {
      if (obj.role === "seeker") {
        seekerIds.push(obj._id.toString());
      } else if (obj.role === "listener") {
        listenerIds.push(obj._id.toString());
      }
    });

    await createConversations(seekerIds, listenerIds);
    
    const feedIds = await createFeeds()
    await createFeedLikeSaveComment(idArray, feedIds)

    console.log('\n**** Successfully ran seed file! ****\n')
    process.exit()
  } catch (e) {
    console.log(e);
 }
};

const users = userInfo.users;
const messages = [
"YAY I am in the Journal",
"I am inside a Journal of a random user",
"This is a journal for web programming 1",
"Hello Prof Patrick Loved your dedication and hardwork for this course",
"I am generated by Sachin",
"I dont know where am I",
"I am trying to get an internship",
"My teammates worked so hard with me in this project",
"Spent 6 hours a day for this project at library with group memebers in last week of semester",
"Good Bye ",
];

createUsersAndJournals(users, messages);

