import { faker } from '@faker-js/faker';
import https from 'https';
import fetch from 'node-fetch'
import feedFunction from "./server/data/feeds.js";

// try {
//     const firstuser = await userData.create("naruto","uzimaki","hokage","naruto@5tails.com","#Naruto1234","m",23,"leaf","jwfkjvn",true,"seeker")
// } catch (e) {
//     console.log(e);    
// }
// try{
//     const upFeed = await feedBackData.update("64456db258cb930fc0044ca8","false",3,5,4,"test")
//     console.log(upFeed);
// }catch(e){
//     console.log(e);
// }

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
//     "true",
//     3,
//     4,
//     2,
//     "rightNow"
//   );
//   console.log(firstfeed);
// } catch (e) {
//   console.log(e);
// }
// const createFakeUser = async (count) => {
//     function imageUrlToBase64(url) {
//         return new Promise((resolve, reject) => {
//           https.get(url, response => {
//             const chunks = [];
      
//             response.on('data', chunk => {
//               chunks.push(chunk);
//             });
      
//             response.on('end', () => {
//               const buffer = Buffer.concat(chunks);
//               const base64 = buffer.toString('base64');
//               resolve('data:image/jpeg;base64,' + base64);
//             });
//           }).on('error', error => {
//             reject(error);
//           });
//         });
//       }
    
    
//     let USERS = [];
    
//     function createRandomUser() {
//       const user = {
//         firstName: faker.name.firstName(),
//         lastName: faker.name.lastName(),
//         gender: faker.name.sex(true),
//         age: faker.datatype.number({
//             max: 100,
//             min: 14
//         }),
//         profilePic: faker.image.avatar(),
//       };
    
//       return {
//           ...user,
//           username: faker.internet.userName(user.firstName, user.lastName),
//           email: faker.internet.email(user.firstName, user.lastName),
//           imageUrl: user.profilePic
//       }
//     }
    
//     Array.from({ length: count }).forEach(() => {
//       USERS.push(createRandomUser());
//     });
    
//     const createUsers = async () => {
//         const imagePromises = USERS.map((user) => {
//             return imageUrlToBase64(user.profilePic)
//         })
        
//         const images = await Promise.all(imagePromises)
        
//         USERS = USERS.map((user, idx) => {
//             user.role = (idx % 2 === 0) ? 'LISTENER' : 'SEEKER'
//             user.isAnonymous = (idx % 5 === 0)
//             user.password = user.firstName[0].toUpperCase() + user.firstName.slice(1, user.firstName.length).toLowerCase() + '@123'
//             user.confirmPassword = user.password
//             user.profilePic = images[idx]
//             return user;
//         });
    
//         const userCreationPromises = USERS.map((user) => createUserOnServer(user))
//         const createdAll = await Promise.all(userCreationPromises)
//         console.log(createdAll)
//     }
    
//     const createUserOnServer = async (data) => {
//         const response = await fetch('http://localhost:3001/user/signup', {
//             method: 'POST',
//             headers: {'Content-Type': 'application/json'},
//             body: JSON.stringify(data)
//         })
//         const responseJson = await response.json()
//         return responseJson
//     }

//     return createUsers()
// }

// createFakeChats()


// feeds

const feeds = [
  {
    "title": "Believe in Yourself",
    "description": "No one can believe in you as much as you can believe in yourself.",
    "type": "motivational-post",
    "images": ["https://img.freepik.com/free-vector/motivational-poster-with-inspirational-quote_1284-45846.jpg?w=900&t=st=1682896690~exp=1682897290~hmac=6c5ecd89785e1f0fe16fc0f61ef18370aa3b7ff4566863183e4563af17aea55c"],
    "alt": "Motivational poster with an inspirational quote"
  },
   
  {
    "title": "You Can Do It!",
    "description": "Believe in yourself and all that you are. Know that there is something inside you that is greater than any obstacle.",
    "type": "motivational-post",
    "images": ["https://s3.amazonaws.com/thumbnails.venngage.com/template/1a1d823b-5935-42dc-bf32-2b221b7fdf68.png"],
    "alt": "Motivational poster with an inspirational quote"
  },
  
  {
    "title": "Success Is Not Final",
    "description": "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    "type": "motivational-post",
    "images": ["https://d1csarkz8obe9u.cloudfront.net/posterpreviews/motivational-instagram-post-design-template-33da1a8c630c24b913d660ac17ca575f_screen.jpg?ts=1585502602"],
    "alt": "Motivational poster with an inspirational quote"
  },
  {
    "title": "Make It Happen",
    "description": "Don't wait for opportunities, create them.",
    "type": "motivational-post",
    "images": ["https://images.unsplash.com/photo-1552508744-1696d4464960?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"],
    "alt": "Motivational poster with an inspirational quote"
  },
  {
    "title": "Small Steps Lead to Big Results",
    "description": "You don't have to see the whole staircase, just take the first step.",
    "type": "motivational-post",
    "images": ["https://images.unsplash.com/photo-1468971050039-be99497410af?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80"],
    "alt": "Motivational poster with an inspirational quote"
  },
  {
    "title": "Stay Focused",
    "description": "The secret of your success is determined by your daily routine.",
    "type": "motivational-post",
    "images": ["https://images.unsplash.com/photo-1494178270175-e96de2971df9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1080&q=80"],
    "alt": "Motivational poster with an inspirational quote"
  },
  {
    "title": "Never Give Up",
    "description": "Fall seven times, stand up eight.",
    "type": "motivational-post",
    "images": ["https://images.unsplash.com/photo-1504805572947-34fad45aed93?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"],
    "alt": "Motivational poster with an inspirational quote"
  },
  {
    "title": "Stay Positive",
    "description": "Positive anything is better than negative nothing.",
    "type": "motivational-post",
    "images": ["https://images.unsplash.com/photo-1537444399873-da0fea0cf4b3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80"],
    "alt": "Motivational poster with an inspirational quote"
  },
  {
    "title": "Believe You Can",
    "description": "Believe you can and you're halfway there.",
    "type": "motivational-post",
    "images": ["https://images.unsplash.com/photo-1548438294-1ad5d5f4f063?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80"],
    "alt": "Motivational poster with an inspirational quote"
  },
  {
    "title": "Stay Strong",
    "description": "Strength doesn't come from what you can do. It comes from overcoming the things you once thought you couldn't.",
    "type": "motivational-post",
    "images": ["https://images.unsplash.com/photo-1549633030-89d0743bad01?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"],
    "alt": "Motivational poster with an inspirational quote"
  },
  
  {
    "title": "You Are Capable",
    "description": "Believe in yourself and your abilities. You have the power to achieve great things.",
    "type": "motivational-post",
    "images": ["https://images.unsplash.com/photo-1544764200-d834fd210a23?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"],
    "alt": "Motivational poster with an inspirational quote"
    },
    
    {
    "title": "Take Action",
    "description": "Success is not just about dreaming, it's about taking action.",
    "type": "motivational-post",
    "images": ["https://images.unsplash.com/photo-1568849676085-51415703900f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"],
    "alt": "Motivational poster with an inspirational quote"
    },
    
    {
    "title": "Focus on Progress",
    "description": "Don't focus on perfection, focus on progress. Every step forward is a step closer to your goal.",
    "type": "motivational-post",
    "images": ["https://images.unsplash.com/photo-1612436524004-4f90d7fe71a5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"],
    "alt": "Motivational poster with an inspirational quote"
    },
    
    {
    "title": "Overcome Fear",
    "description": "The only thing standing between you and your goal is the fear of failure. Overcome it and you'll achieve greatness.",
    "type": "motivational-post",
    "images": ["https://images.unsplash.com/photo-1589876981668-03e78101c97f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"],
    "alt": "Motivational poster with an inspirational quote"
    },
    
    {
    "title": "Stay Committed",
    "description": "The difference between success and failure is commitment. Stay committed to your goals and you'll achieve them.",
    "type": "motivational-post",
    "images": ["https://images.unsplash.com/photo-1516939884455-1445c8652f83?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"],
    "alt": "Motivational poster with an inspirational quote"
    },
    
    {
    "title": "Be Resilient",
    "description": "Life is full of challenges, but you have the strength to overcome them. Be resilient and keep moving forward.",
    "type": "motivational-post",
    "images": ["https://images.unsplash.com/photo-1496449903678-68ddcb189a24?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"],
    "alt": "Motivational poster with an inspirational quote"
    },
    
    {
    "title": "Embrace Change",
    "description": "Change is inevitable, but it can be a catalyst for growth. Embrace it and see where it takes you.",
    "type": "motivational-post",
    "images": ["https://images.unsplash.com/photo-1557426575-6e9ea75ef57a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"],
    "alt": "Motivational poster with an inspirational quote"
    },
    
    {
    "title": "Think Positive",
    "description": "Your thoughts shape your reality. Think positive and you'll attract positivity into your life.",
    "type": "motivational-post",
    "images": ["https://images.unsplash.com/photo-1495106245177-55dc6f43e83f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"],
    "alt": "Motivational poster with an inspirational quote"
    },
    {
      "title": "Push Your Limits",
      "description": "You never know your limits until you push yourself to them.",
      "type": "motivational-post",
      "images": ["https://images.unsplash.com/photo-1604129494056-8068ea3cefc5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80"],
      "alt": "Motivational poster with an inspirational quote"
      },
      
      {
      "title": "The Only Way to Do Great Work",
      "description": "The only way to do great work is to love what you do.",
      "type": "motivational-post",
      "images": ["https://images.unsplash.com/photo-1503876466-1fc5143eda57?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80"],
      "alt": "Motivational poster with an inspirational quote"
      },
      
      {
      "title": "Keep Going",
      "description": "Success is not final, failure is not fatal, it's the courage to continue that counts.",
      "type": "motivational-post",
      "images": ["https://thumbs.dreamstime.com/b/business-inspirational-motivational-quote-consistency-key-keep-going-sunset-sunrise-color-background-beach-smooth-246444086.jpg"],
      "alt": "Motivational poster with an inspirational quote"
      },
      
      {
      "title": "Be The Change",
      "description": "Be the change you wish to see in the world.",
      "type": "motivational-post",
      "images": ["https://w0.peakpx.com/wallpaper/422/470/HD-wallpaper-quotes-motivation-victory-winner-with-quotes.jpg"],
      "alt": "Motivational poster with an inspirational quote"
      },
      
      {
      "title": "Don't Let Yesterday Take Up Too Much of Today",
      "description": "Don't let yesterday take up too much of today.",
      "type": "motivational-post",
      "images": ["https://e0.pxfuel.com/wallpapers/723/278/desktop-wallpaper-nice-quotes-inspirational.jpg"],
      "alt": "Motivational poster with an inspirational quote"
      },
      
      {
      "title": "Believe and Achieve",
      "description": "Believe you can and you're halfway there.",
      "type": "motivational-post",
      "images": ["https://4kwallpapers.com/images/walls/thumbs_3t/7693.jpg"],
      "alt": "Motivational poster with an inspirational quote"
      },
      
      {
      "title": "The Best Way to Predict Your Future",
      "description": "The best way to predict your future is to create it.",
      "type": "motivational-post",
      "images": ["https://c4.wallpaperflare.com/wallpaper/839/741/145/your-future-hd-your-future-is-created-by-what-you-do-today-not-tomorrow-wallpaper-preview.jpg"],
      "alt": "Motivational poster with an inspirational quote"
      },
      
      {
      "title": "Dream Big",
      "description": "Dream big, work hard, stay focused, and surround yourself with good people.",
      "type": "motivational-post",
      "images": ["https://i.pinimg.com/564x/71/a1/27/71a1271d1f6dcaa4cb32c5509d1be2bf.jpg"],
      "alt": "Motivational poster with an inspirational quote"
      },
      
      {
      "title": "Take Action",
      "description": "The only way to get started is to quit talking and begin doing.",
      "type": "motivational-post",
      "images": ["https://quotefancy.com/media/wallpaper/3840x2160/80272-Denis-Waitley-Quote-Motivation-is-motive-in-action.jpg"],
      "alt": "Motivational poster with an inspirational quote"
      },
      
      {
      "title": "Be Bold",
      "description": "Be bold enough to use your voice, brave enough to listen to your heart, and strong enough to live the life you've always imagined.",
      "type": "motivational-post",
      "images": ["https://thestrive.co/wp-content/uploads/2022/03/Fearless-Motivation-Quotes.jpg"],
      "alt": "Motivational poster with an inspirational quote"
      },
      {
        "title": "Dream Big",
        "description": "The biggest adventure you can ever take is to live the life of your dreams.",
        "type": "motivational-post",
        "images": ["https://quotefancy.com/media/wallpaper/3840x2160/4674533-Urijah-Faber-Quote-Dream-big-stay-positive-work-hard-and-enjoy-the.jpg"],
        "alt": "Motivational poster with an inspirational quote"
        },
        
        {
        "title": "Be Brave",
        "description": "Being brave doesn't mean you're not scared. It means you go on even though you're scared.",
        "type": "motivational-post",
        "images": ["https://themilitarywifeandmom.com/wp-content/uploads/2020/01/military-motivational-quotes-on-bravery.jpg"],
        "alt": "Motivational poster with an inspirational quote"
        },
        
        {
        "title": "Positive Vibes",
        "description": "Surround yourself with positive people and positive vibes.",
        "type": "motivational-post",
        "images": ["https://img.freepik.com/premium-vector/positive-mind-vibes-hand-drawn-lettering-motivational-quote-with-floral-element_17937-756.jpg?w=900"],
        "alt": "Motivational poster with an inspirational quote"
        },
        {
        "title": "Never Stop Learning",
        "description": "The more that you read, the more things you will know. The more that you learn, the more places you'll go.",
        "type": "motivational-post",
        "images": ["https://img.freepik.com/premium-vector/never-stop-learning-inspirational-motivational-typography-quotes-lettering-tshirts-mugs_558159-567.jpg?w=900"],
        "alt": "Motivational poster with an inspirational quote"
        },
        {
        "title": "Rise Above",
        "description": "The only way to do great work is to love what you do. If you haven't found it yet, keep looking. Don't settle.",
        "type": "motivational-post",
        "images": ["http://www.gymquotes.co/wp-content/uploads/2018/03/rise-above-the-pain-and-dont-stop-motivational-gym-quotes.jpg"],
        "alt": "Motivational poster with an inspirational quote"
        },
        {
        "title": "Think Positive",
        "description": "Positive thinking will let you do everything better than negative thinking will.",
        "type": "motivational-post",
        "images": ["https://as1.ftcdn.net/v2/jpg/03/14/03/70/1000_F_314037023_D0bqLJVAcBUY5RGmUD4GqoeoH7dGysd1.jpg"],
        "alt": "Motivational poster with an inspirational quote"
        },
        {
        "title": "Be Yourself",
        "description": "Be yourself; everyone else is already taken.",
        "type": "motivational-post",
        "images": ["https://images.pexels.com/photos/2740956/pexels-photo-2740956.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"],
        "alt": "Motivational poster with an inspirational quote"
        },
        {
        "title": "Stay Humble",
        "description": "Stay humble, work hard, be kind.",
        "type": "motivational-post",
        "images": ["https://images.pexels.com/photos/2255441/pexels-photo-2255441.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"],
        "alt": "Motivational poster with an inspirational quote"
        },
        {
        "title": "Don't Give Up",
        "description": "Success is not final, failure is not fatal: it is the courage to continue that counts.",
        "type": "motivational-post",
        "images": ["https://images.pexels.com/photos/21696/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"],
        "alt": "Motivational poster with an inspirational quote"
        },
  
];

feeds.forEach(async (feed) => {
  try {
    const insertedId = await feedFunction.createFeed(feed.title, feed.description, feed.type, feed.images);
    console.log(`New feed created with ID: ${insertedId}`);
  } catch (error) {
    console.error(`Cannot create feed: ${error.message}`);
  }
});
