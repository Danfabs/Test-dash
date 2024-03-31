import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

type UserData = {
    id: number;
    email?: string;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    role: string;
    token: string;
};

var mock = new MockAdapter(axios);

export function configureFakeBackend() {
    let users: UserData[] = [
        {
            id: 1,
            email: 'adminto@coderthemes.com',
            username: 'test',
            password: 'test',
            firstName: 'Test',
            lastName: 'User',
            role: 'Admin',
            token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJjb2RlcnRoZW1lcyIsImlhdCI6MTU4NzM1NjY0OSwiZXhwIjoxOTAyODg5NDQ5LCJhdWQiOiJjb2RlcnRoZW1lcy5jb20iLCJzdWIiOiJzdXBwb3J0QGNvZGVydGhlbWVzLmNvbSIsImxhc3ROYW1lIjoiVGVzdCIsIkVtYWlsIjoic3VwcG9ydEBjb2RlcnRoZW1lcy5jb20iLCJSb2xlIjoiQWRtaW4iLCJmaXJzdE5hbWUiOiJIeXBlciJ9.P27f7JNBF-vOaJFpkn-upfEh3zSprYfyhTOYhijykdI',
        },
    ];

    mock.onPost('/login/').reply(function (config) {
        return new Promise(async function (resolve, reject) {
            // setTimeout(function () {
            //     // get parameters from post request
            //     let params = JSON.parse(config.data);

            //     // find if any user matches login credentials
            //     let filteredUsers = users.filter((user) => {
            //         return user.email === params.email && user.password === params.password;
            //     });

            //     if (filteredUsers.length) {
            //         // if login details are valid return user details and fake jwt token
            //         let user = filteredUsers[0];
            //         resolve([200, user]);
            //     } else {
            //         // else return error
            //         resolve([401, { message: 'Username or password is incorrect' }]);
            //     }
            // }, 1000);
            try {
                let params = JSON.parse(config.data);
                console.log("params", params)
                let email = params.email;
                console.log("email", email)
                let password = params.password;

                // Make HTTP request to your Cloud Function endpoint
                const response = await fetch('https://us-central1-slot-145a8.cloudfunctions.net/loginDashboard', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email,
                        password
                    }),
                    
                });

                if (!response.ok) {
                    // Handle error response
                    resolve([
                        401,
                        {
                            message: 'Sorry, we could not find any registered user with entered username',
                        },
                    ]);
                } else {
                    const userData = await response.json();
                    const email = userData.user.email_address;
                    const password = userData.user.password;
                    const firstName = userData.user.firstName;
                    const lastName = userData.user.lastName;
                    const role = userData.user.role;
                    const token = userData.token;
                   
                        let user = 
                        {
                            id: 1,
                            email: email,
                            username: 'test',
                            password: password,
                            firstName: firstName,
                            lastName: lastName,
                            role: role,
                            token: token,

                    };
                    console.log("user" ,user)
                    resolve([200, user]);

                     // let user = {
                    //     message: "We've sent you a link to reset password to your registered email.",
                    // };
                }

                // If request succeeds, navigate to the dashboard
                console.log("User logged in successfully");

            } catch (error: any) {
                console.error(error);
                // Set login error message
            }


        });
    });

    mock.onPost('/register/').reply(function (config) {
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                // get parameters from post request
                let params = JSON.parse(config.data);

                // add new users
                let [firstName, lastName] = params.fullname.split(' ');
                let newUser: UserData = {
                    id: users.length + 1,
                    username: firstName,
                    password: params.password,
                    firstName: firstName,
                    lastName: lastName,
                    role: 'Admin',
                    token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJjb2RlcnRoZW1lcyIsImlhdCI6MTU4NzM1NjY0OSwiZXhwIjoxOTAyODg5NDQ5LCJhdWQiOiJjb2RlcnRoZW1lcy5jb20iLCJzdWIiOiJzdXBwb3J0QGNvZGVydGhlbWVzLmNvbSIsImxhc3ROYW1lIjoiVGVzdCIsIkVtYWlsIjoic3VwcG9ydEBjb2RlcnRoZW1lcy5jb20iLCJSb2xlIjoiQWRtaW4iLCJmaXJzdE5hbWUiOiJIeXBlciJ9.P27f7JNBF-vOaJFpkn-upfEh3zSprYfyhTOYhijykdI',
                };
                users.push(newUser);

                resolve([200, newUser]);
            }, 1000);
        });
    });

    mock.onPost('/forget-password/').reply(function (config) {
        return new Promise(async function (resolve, reject) {
            // setTimeout(function () {
            //     // get parameters from post request
            //     let params = JSON.parse(config.data);

            //     // find if any user matches login credentials
            //     let filteredUsers = users.filter((user) => {
            //         return user.email === params.email;
            //     });

            //     if (filteredUsers.length) {
            //         // if login details are valid return user details and fake jwt token
            //         let responseJson = {
            //             message: "We've sent you a link to reset password to your registered email.",
            //         };
            //         resolve([200, responseJson]);
            //     } else {
            //         // else return error
            //         resolve([
            //             401,
            //             {
            //                 message: 'Sorry, we could not find any registered user with entered username',
            //             },
            //         ]);
            //     }
            // }, 1000);


            try {
                let params = JSON.parse(config.data);
                let email = params.email;
                let password = params.password;

                // Make HTTP request to your Cloud Function endpoint
                const response = await fetch('https://us-central1-slot-145a8.cloudfunctions.net/loginDashboard', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, password }),
                });

                if (!response.ok) {
                    // Handle error response
                    resolve([
                        401,
                        {
                            message: 'Sorry, we could not find any registered user with entered username',
                        },
                    ]);
                } else {
                    let responseJson = {
                        message: "We've sent you a link to reset password to your registered email.",
                    };
                    resolve([200, responseJson]);
                }

                // If request succeeds, navigate to the dashboard
                console.log("User logged in successfully");

            } catch (error: any) {
                console.error(error);
                // Set login error message
            }

        });
    });
}
