// import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
// import MCIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// import TaaskyText from '../components/TaaskyText';
import colors from './colorConstants';
import { rootNames } from './constants';

// const homeHeader = (route, navigation) => {
//   const headerTitle = route.params.headerTitle;
//   const hasNotification = true;
//   return (
//     <View style={styles.homeHeadCon}>
//       <TouchableOpacity
//         style={styles.menuCon}
//         onPress={() => navigation.openDrawer()}>
//         <Image
//           source={require('../assets/images/menu.png')}
//           style={styles.menuImage}
//         />
//       </TouchableOpacity>
//       {headerTitle && (
//         <TaaskyText style={styles.homeHeadText}>{headerTitle}</TaaskyText>
//       )}
//       <TouchableOpacity
//         style={styles.menuCon}
//         onPress={() =>
//           navigation.navigate(rootNames.SUB_NAVIGATION, {
//             screen: rootNames.PROFILE_SETTINGS,
//           })
//         }>
//         <MCIcons
//           name={'account-cog-outline'}
//           color={colors.darkBlue}
//           size={30}
//         />
//       </TouchableOpacity>
//     </View>
//   );
// };

// const backHeader = (route, navigation) => {
//   return (
//     <View>
//       <MCIcons
//         name="chevron-left"
//         style={{fontSize: 35, color: colors.appTheme}}
//       />
//     </View>
//   );
// };

// export const getHeader = ({route, navigation, header}) => {
//   if (header === 'back') {
//     return {
//       header: () => backHeader(route, navigation),
//     };
//   } else if (header === 'home') {
//     return {
//       header: () => homeHeader(route, navigation),
//     };
//   } else {
//     return {
//       headerShown: false,
//     };
//   }
// };

export const formatDateToCustomFormat = (dateString: string) => {
  const date = new Date(dateString);

  const day = date.getDate();
  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();

  const getOrdinalSuffix = (day: number): string => {
    if (day > 3 && day < 21) return 'th';
    switch (day % 10) {
      case 1:
        return 'st';
      case 2:
        return 'nd';
      case 3:
        return 'rd';
      default:
        return 'th';
    }
  };

  return `${day}${getOrdinalSuffix(day)} ${month} ${year}`;
};

export const formatTimestamp = (timestamp: number) => {
  if (!timestamp || isNaN(timestamp)) {
    console.error('Invalid timestamp:', timestamp);
    return timestamp;
  }

  const date = new Date(timestamp * 1000);

  if (isNaN(date.getTime())) {
    console.error('Invalid Date object:', date);
    return 'Invalid Date';
  }

  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  };
  return date.toLocaleDateString('en-GB', options).replace(',', '');
};

export const formattedPhoneNumber = (phoneNumber: any) => {
  let formattedPhoneNumber = phoneNumber;
  if (formattedPhoneNumber?.startsWith('+91')) {
    formattedPhoneNumber = formattedPhoneNumber.slice(3);
  }
  return formattedPhoneNumber;
};

export const handleTextChange = (text: string, setNumber: any) => {
  let formattedNumber = text.replace(/^\+91\s?/, '');
  setNumber(formattedNumber);
};

export const keys = {
  adminLoginKey: 'companyAdminLoginCode',
  userLoginKey: 'companyUserLoginCode',
  admin: 'admin',
  worker: 'worker',
};

// const styles = StyleSheet.create({
//   homeHeadCon: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     backgroundColor: colors.appBackground,
//     paddingVertical: wp(3),
//     paddingHorizontal: wp(3),
//   },
//   homeHeadText: {
//     fontSize: 22,
//     color: colors.darkBlue,
//     fontFamily: 'Fredoka-medium',
//   },
//   menuImage: {
//     height: 25,
//     width: 25,
//     objectFit: 'contain',
//   },
//   menuCon: {
//     backgroundColor: colors.inputGrey,
//     padding: wp(2),
//     borderRadius: wp(5),
//   },
// });
