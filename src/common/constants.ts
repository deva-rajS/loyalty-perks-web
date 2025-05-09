// import { Dimensions, PixelRatio } from 'react-native';

// export const {width, height} = Dimensions.get('window');

export const rootNames = {
  GET_STARTED: 'getstarted',
  LOADING_SCREEN: 'loadingscreen',

  HOME_SCREEN: 'homesnavigation',
  MAIN_SCREEN: 'mainnavigation',
  SUB_NAVIGATION: 'subnavigation',
  HOME: 'home',
  PROFILE_SETTINGS: 'profilesettings',
  DRAWER: 'drawer',

  SING_IN: 'signin',
  SING_UP: 'signup',
  SING_UP_ADMIN: 'signupadmin',
  SING_UP_USER: 'signupuser',
  SING_UP_NAV: 'signupnav',
  SING_UP_CONTAINER: 'signupcontainer',
  REQUEST_PASSWORD: 'requestpassword',
  RESET_PASSWORD: 'resetpassword',
  RESET_PASSWORD_ADMIN: 'resetpasswordadmin',
  RESET_PASSWORD_USER: 'resetpassworduser',
  RESET_PASSWORD_CONTAINER: 'resetpasswordcontainer',

  ADD_USER: 'adduser',
  MANAGE_CUSTOMERS: 'managecustomers',
  MANAGE_USERS: 'manageusers',
  EDIT_USER: 'edituser',
  ADD_DEPARTMENT: 'adddepartment',
  CUSTOMER_TIMELINE: 'customertimeline',
  SHOW_CUSTOMER_TIMELINE: 'showcustomertimeline',
  GENERATE_POINTS: 'generatepoints',
  CUSTOMER_REWARDS: 'customerrewards',
};

// const widthPercentageToDP = (elementWidth: number) => {
//   return PixelRatio.roundToNearestPixel((width * elementWidth) / 100);
//   // * scaleFactor
// };

// const wp = widthPercentageToDP;
// const artboardWidth = 375;

// export const responsiveWidth = (width: number) => {
//   const scaleFactor = width > 500 ? 0.65 : 1;
//   const value = (width / artboardWidth) * 100 * scaleFactor;
//   return widthPercentageToDP(value);
// };

export const truncateText = (text: string, maxLength: number) => {
  if (text.length <= maxLength) {
    return text;
  } else {
    return text.substring(0, maxLength) + '...';
  }
};

// export {widthPercentageToDP as wp};
