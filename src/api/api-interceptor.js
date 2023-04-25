import axos from 'axios';

export const axiosApi = axos.create({
    baseURL: 'http://localhost:3000',
    timeout: 1000,
    // TODO - check if this header is required
    headers: {"Content-Type": "application/json"}
});

// const blockUser = async (user) => {
//     try {
//         const response = await api.post("/user/signup", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify(user),
//         });
//         const responseJson = await response.json();
//         return constructResponse(response.status, responseJson)
//     } catch (e) {
//         console.log("error occurred", e);
//         return [true, 'Some error occurred']
//     }
// }
