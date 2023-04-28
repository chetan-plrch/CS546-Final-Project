import { faker } from '@faker-js/faker';
import https from 'https';
import fetch from 'node-fetch'

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

try {
  let firstfeed = await feedBackData.createFeedBack(
    "643b7312a23709af14b68ff4",
    "643b7312a23709af14b68ff4",
    "true",
    3,
    4,
    2,
    "rightNow"
  );
  console.log(firstfeed);
} catch (e) {
  console.log(e);
}
const createFakeUser = async (count) => {
    function imageUrlToBase64(url) {
        return new Promise((resolve, reject) => {
          https.get(url, response => {
            const chunks = [];
      
            response.on('data', chunk => {
              chunks.push(chunk);
            });
      
            response.on('end', () => {
              const buffer = Buffer.concat(chunks);
              const base64 = buffer.toString('base64');
              resolve('data:image/jpeg;base64,' + base64);
            });
          }).on('error', error => {
            reject(error);
          });
        });
      }
    
    
    let USERS = [];
    
    function createRandomUser() {
      const user = {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        gender: faker.name.sex(true),
        age: faker.datatype.number({
            max: 100,
            min: 14
        }),
        profilePic: faker.image.avatar(),
      };
    
      return {
          ...user,
          username: faker.internet.userName(user.firstName, user.lastName),
          email: faker.internet.email(user.firstName, user.lastName),
          imageUrl: user.profilePic
      }
    }
    
    Array.from({ length: count }).forEach(() => {
      USERS.push(createRandomUser());
    });
    
    const createUsers = async () => {
        const imagePromises = USERS.map((user) => {
            return imageUrlToBase64(user.profilePic)
        })
        
        const images = await Promise.all(imagePromises)
        
        USERS = USERS.map((user, idx) => {
            user.role = (idx % 2 === 0) ? 'LISTENER' : 'SEEKER'
            user.isAnonymous = (idx % 5 === 0)
            user.password = user.firstName[0].toUpperCase() + user.firstName.slice(1, user.firstName.length).toLowerCase() + '@123'
            user.confirmPassword = user.password
            user.profilePic = images[idx]
            return user;
        });
    
        const userCreationPromises = USERS.map((user) => createUserOnServer(user))
        const createdAll = await Promise.all(userCreationPromises)
        console.log(createdAll)
    }
    
    const createUserOnServer = async (data) => {
        const response = await fetch('http://localhost:3001/user/signup', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        })
        const responseJson = await response.json()
        return responseJson
    }

    return createUsers()
}

createFakeChats()