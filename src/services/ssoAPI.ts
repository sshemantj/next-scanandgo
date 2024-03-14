import client from "@/services/clients/apollo-client";
import {
  createUser,
  getProfile,
  loginWithOtp,
  loginWithSocialAuth,
  LoginWithSocialMedia,
  signUpWithOtp,
  verifyOtp,
} from "@/constants/gql/login";
import { GET_PROFILE_DATA } from "@/constants/gql/MyProfileQuery";
import graphqlMiddlewareClient from "./clients/middleware-graphql";

export const signUpWithOtpAPI = (mobileNumber: any, email: string) => {
  const response = graphqlMiddlewareClient
    .mutate({
      mutation: signUpWithOtp,
      variables: {
        mobileNumber: mobileNumber,
        email: email,
      },
    })
    .then((response: any) => {
      return { status: "success", response: response };
    })
    .catch((error: any) => {
      return { status: "fail", error: error };
    });
  return response;
};

export const loginWithOtpAPI = async (mobileNumber: any) => {
  const response = graphqlMiddlewareClient
    .mutate({
      mutation: loginWithOtp,
      variables: {
        mobileNumber: mobileNumber,
      },
    })
    .then((response: any) => {
      return { status: "success", response: response };
    })
    .catch((error: any) => {
      return { status: "fail", error: error, errorMessage: error.message };
    });
  return response;
};

export const verifyOtpAPI = (MobileNumber: string, otp: string) => {
  const response = graphqlMiddlewareClient
    .mutate({
      mutation: verifyOtp,
      variables: {
        mobileNumber: MobileNumber,
        otp: otp,
      },
    })
    .then(async (response: any) => {
      return { status: "success", response: response };
    })
    .catch((error: any) => {
      return { status: "fail", error: error, errorMessage: error.message };
    });
  return response;
};

export const cartCreateUserAPI = (
  fullName: any,
  mobileNumber: any,
  login: any
) => {
  const response = graphqlMiddlewareClient
    .mutate({
      mutation: createUser,
      variables: {
        fullName: fullName,
        mobile: mobileNumber,
        login: login,
        gender: "",
        address: "",
        anniversary: "",
        birthday: "",
        city: "",
        pincode: "",
        state: "",
      },
    })
    .then((response: any) => {
      return {
        status:
          response?.data?.createUser?.errorMessage === "na" ||
          response?.data?.createUser?.errorMessage === "unidenfied"
            ? "success"
            : "fail",
        response: response,
      };
    })
    .catch((error: any) => {
      return { status: "fail", error: error, errorMessage: error.message };
    });
  return response;
};

export const getProfileAPI = (accessToken: string) => {
  const response = graphqlMiddlewareClient
    .mutate({
      mutation: getProfile,
      variables: {
        accessToken: accessToken,
      },
      fetchPolicy: "no-cache",
    })
    .then((response: any) => {
      return { status: "success", response: response };
    })
    .catch((error: any) => {
      return { status: "fail", error: error, errorMessage: error.message };
    });
  return response;
};

export const getProfileData = () => {
  const response = client
    .query({
      query: GET_PROFILE_DATA,
      fetchPolicy: "no-cache",
    })
    .then((response: any) => {
      return { status: "success", responseData: response };
    })
    .catch((error: any) => {
      return { status: "fail", error: error, errorMessage: error.message };
    });
  return response;
};
export const loginWithSocialMediaAPI = (
  fullName: string,
  email: string,
  mobileNumber: string,
  socialAccessToken: string,
  socialProfileImage: any,
  socialLdp: any
) => {
  const response = graphqlMiddlewareClient
    .mutate({
      mutation: LoginWithSocialMedia,
      variables: {
        address: "",
        anniversary: "",
        birthday: "",
        city: "",
        fullName: fullName,

        gender: "MALE",
        login: email,
        mobile: mobileNumber,
        pincode: "",
        state: "",
        socialAccessToken: socialAccessToken,
        socialProfileImage: socialProfileImage,
        socialLdp: socialLdp,
      },
    })
    .then((response: any) => {
      return { status: "success", response: response };
    })
    .catch((error: any) => {
      return { status: "fail", error: error, errorMessage: error.message };
    });
  return response;
};
export const loginWithSmAPI = (
  firstName: string,
  lastName: string,
  socialAccessToken: any,
  socialLdp: string
) => {
  const response = graphqlMiddlewareClient
    .mutate({
      mutation: loginWithSocialAuth,
      fetchPolicy: "no-cache",
      variables: {
        firstName: firstName,
        lastName: lastName,
        socialAccessToken: socialAccessToken,
        socialLdp: socialLdp,
      },
    })
    .then((response: any) => {
      return { status: "success", response: response };
    })
    .catch((error: any) => {
      return { status: "fail", error: error, errorMessage: error.message };
    });
  return response;
};
export const createProfileAPI = (
  fullName: string,
  gender: string,
  email: string,
  mobileNumber: any,
  address: string,
  anniversary: string,
  birthday: any,
  city: string,
  pinCode: string,
  state: any
) => {
  const response = graphqlMiddlewareClient
    .mutate({
      mutation: createUser,
      variables: {
        fullName: fullName,
        gender: gender,
        login: email,
        mobile: mobileNumber,
        address: address,
        anniversary: anniversary,
        birthday: birthday,
        city: city,
        pincode: pinCode,
        state: state,
      },
    })
    .then((response: any) => {
      return {
        status:
          response?.data?.createUser?.errorMessage === "na" ||
          response?.data?.createUser?.errorMessage === "unidenfied"
            ? "success"
            : "fail",
        response: response,
      };
    })
    .catch((error: any) => {
      return { status: "fail", error: error, errorMessage: error.message };
    });
  return response;
};
