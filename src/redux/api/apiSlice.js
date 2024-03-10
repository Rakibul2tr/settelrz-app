import AsyncStorage from "@react-native-async-storage/async-storage";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";




export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://settlrz.aqsasoft.com/api/v1/app",
    }),
    endpoints: (builder) => ({

        //========== slider text of start page api==============
        getTextSliderData: builder.query({
            query: () => "/login-text-sliders",
        }),

        //========= user Register api============
        userRegister:builder.mutation({
         query:(data)=>({
            url:'/register',
            method:'POST',
            body:data
         })
        }),

        //===========user Otp Verify api===============
        userOtpVerify:builder.mutation({
         query:(data)=>({
            url:'/verify-mail-otp',
            method:'POST',
            headers: {
            'authorization': `Bearer ${data.token}`
            },
            body:{mail_otp:data.mail_otp,email:data.email}
         })
        }),

        //=============User login api==============
        loginUser:builder.mutation({
         query:(data)=>({
            url:'/login',
            method:'POST',
            body:{email:data.email,password:data.password}
         })
        }),
        //===============User logOut api==============
        userLogOut:builder.mutation({
         query:(data)=>({
            url:'/user-logout',
            method:'POST',
            headers: {
            'authorization': `Bearer ${data.token}`
            },
         })
        }),
        //============== user data Get api ===============
        getUserData:builder.query({
            query:(data)=>({
            url:'/user-data',
            method:'GET',
            headers: {
            'authorization': `Bearer ${data._token}`
            },
         })
        }),
        //===============User password Change api==============
        passwordChange:builder.mutation({
         query:(data)=>({
            url:'/update-user-password',
            method:'POST',
            headers: {
            'authorization': `Bearer ${data.token}`
                },
            body: {
                current_password: data.current_password,
                new_password: data.new_password,
                new_password_confirmation:data.new_password_confirmation
                }
         })
        }),
        //============== category data Get api===============
        categoryData: builder.query({
            query:(data)=>({
            url:'/user-categories',
            method:'GET',
            headers: {
            'authorization': `Bearer ${data?._token}`
            },
         })
        }),
        //===============user category set api==============
        setUserCategory:builder.mutation({
         query:(data)=>({
            url:'/set-user-category',
            method:'POST',
            headers: {
            'authorization':`Bearer ${data.userInfo._token}`
            },
            body:{
                email:data.userInfo.user_email,
                user_category_id:data.user_category_id
            }
         })
        }),
        //===============user information update api==============
        userInfoUpdate:builder.mutation({
         query:(data)=>({
            url:'/update-user-profile',
            method:'POST',
            headers: {
            'authorization':`Bearer ${data.userInfo._token}`
            },
            body:{
                email:data.userInfo.user_email,
                user_category_id:data.user_category_id
            }
         })
        }),



        //============== first Screen Post data Get api===============
        getFirstScreenPost:builder.query({
            query:(data)=>({
            url:'/posts',
            method:'GET',
            headers: {
            'authorization': `Bearer ${data._token}`
            },
         })
        }),
        //============== second Screen Post data Get api===============
        getSecondScreenPost:builder.query({
            query:(data)=>({
            url:'/secondaryposts',
            method:'GET',
            headers: {
            'authorization': `Bearer ${data._token}`
            },
         })
        }),

        
        // getItem: builder.query({
        //     query: (id) => `/gatting/${id}`,
        // }),
    }),
});

export const { 
    useGetTextSliderDataQuery,
    useCategoryDataQuery,
    useLoginUserMutation,
    useUserOtpVerifyMutation,
    useUserRegisterMutation,
    useUserLogOutMutation,
    useSetUserCategoryMutation,
    useGetFirstScreenPostQuery,
    useGetSecondScreenPostQuery,
    useGetUserDataQuery,
    usePasswordChangeMutation,
    useUserInfoUpdateMutation
} = apiSlice;