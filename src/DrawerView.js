import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import { connect } from "react-redux";
import DeviceInfo from "react-native-device-info";
import Color from "../theme/Color";
import Icon from "../assets";
import Fonts from "../theme/Fonts";
import profile from "../assets/logoRound1.png";
import {
  logoutUserFromServer,
  initiateAppointmentFilter,
  initiateServiceFilter,
  initiateJobFilter,
  getAllJobCards,
  getAllServiceEstimates,
  getAllAppointments,
  dropDownSelection,
  vehicleTextInput,
  resetVehicleHistory
} from "../redux/actions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import strings from "../lang/appLocalization";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import globalFont from "../theme/globalFont";
import Analytics from "../utils/analytics";
import { AnalyticsScreenActionConstants, AnalyticsScreenConstants } from "../utils/analyticsEnum";
import { ENV } from "../redux/utils/config";

const DrawerView = (props) => {
  const [version, setVersion] = useState(undefined);
  const [userObj, setUserObj] = useState(null)


  useEffect(() => {
    getApplicationVersion();
  }, []);

  const getApplicationVersion = async () => {
    const value = await AsyncStorage.getItem("loginDetails");
    console.log(" user detail", JSON.parse(value));
    setUserObj(JSON.parse(value))
    const version = await DeviceInfo.getVersion();
    // console.log("Version ", version);
    setVersion(version);
  };

  const navigateToAppointment = async () => {
    Analytics.postAnalyticsScreenAction(AnalyticsScreenConstants.AppointmentScreen, AnalyticsScreenActionConstants.DRAWER_APPOINTMENT_CLICK_EVENT),
      await props.initiateAppointmentFilter();
    await props.getAllAppointments();
    props.navigation.navigate("Appointment");
  };

  const navigateToServiceEstimate = async () => {
    Analytics.postAnalyticsScreenAction(AnalyticsScreenConstants.ServiceListScreen, AnalyticsScreenActionConstants.DRAWER_SERVICE_ESTIMATE_CLICK_EVENT),
      await props.initiateServiceFilter();
    await props.getAllServiceEstimates();
    props.navigation.navigate("ServiceEstimate");
  };

  const navigateToJobCard = async () => {
    Analytics.postAnalyticsScreenAction(AnalyticsScreenConstants.JobCardScreen, AnalyticsScreenActionConstants.DRAWER_JOBCARD_CLICK_EVENT),
      await props.initiateJobFilter();
    await props.getAllJobCards();
    props.navigation.navigate("JobCard");
  };

  const navigateToVehicleHistory = async () => {
    Analytics.postAnalyticsScreenAction(AnalyticsScreenConstants.VehicleHistoryScreen, AnalyticsScreenActionConstants.DRAWER_VEHICLE_HISTORY_CLICK_EVENT),
      await props.dropDownSelection("Registration No");
    await props.vehicleTextInput("");
    await props.resetVehicleHistory();
    props.navigation.navigate("VehicleHistory");
  };

  const navigateToGateIn = () => {
    Analytics.postAnalyticsScreenAction(AnalyticsScreenConstants.GetInScreen, AnalyticsScreenActionConstants.DRAWER_GATE_IN_CLICK_EVENT),
      props.navigation.navigate("GateIn");
  }

  const navigateToNotification = async () => {

    props.navigation.navigate("NotificationScreen");
  };

  const navigateToTPMS = () => {
    Analytics.postAnalyticsScreenAction(AnalyticsScreenConstants.TPMSDetailScreen, AnalyticsScreenActionConstants.DRAWER_TPMS_CLICK_EVENT),
      props.navigation.navigate("TPMS");
  }

  const createTwoButtonAlert = () =>
    Alert.alert(strings["Warning"], strings["Are you sure, you want to logout?"], [
      {
        text: strings["No"],
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: strings["Yes"], onPress: () => props.logoutUserFromServer() },
    ]);
  return (
    <View style={styles.root}>
      <View style={styles.drawerTopView}>
        <Image source={profile} style={styles.profileImage}></Image>
        <View
          style={{
            height: 100,
            paddingBottom: 10,
            flexDirection: "column",
            justifyContent: "flex-end",
          }}
        >
          <Text
            style={[
              styles.menuText,
              globalFont.S16Regular,
              { color: Color.orangeBackground, maxWidth: "100%" },
            ]}
          >
            {userObj ? userObj.username : '-'}
          </Text>
          <Text style={[styles.menuText, globalFont.S16Regular, { color: Color.orangeBackground }]}>
            {userObj ? userObj.phoneNumber : '-'}
          </Text>
        </View>
      </View>

      <View style={styles.drawerCenterView}>
        <ScrollView style={{ paddingHorizontal: 20 }}>
          <TouchableOpacity
            onPress={() => navigateToAppointment()}
            style={[styles.menuButton, { marginTop: 10 }]}
          >
            <Icon style={styles.menuIcon} type={"appointment_ic"} />
            <Text style={[styles.menuText, globalFont.S16Regular]}>{strings["Appointments"]}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigateToServiceEstimate()}
            style={styles.menuButton}
          >
            <Icon style={styles.menuIcon} type={"rupee"} />
            <Text style={[styles.menuText, globalFont.S16Regular]}>{strings["Service estimates"]}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigateToJobCard()}
            style={styles.menuButton}
          >
            <Icon style={styles.menuIcon} type={"files"} />
            <Text style={[styles.menuText, globalFont.S16Regular]}>{strings["Job cards"]}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigateToVehicleHistory()}
            style={styles.menuButton}
          >
            <Icon style={styles.menuIcon} type={"files"} />
            <Text style={[styles.menuText, globalFont.S16Regular]}>{strings["Vehicle History"]}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigateToGateIn()}
            style={styles.menuButton}
          >
            <Icon style={styles.menuIcon} type={"files"} />
            <Text style={[styles.menuText, globalFont.S16Regular]}>{strings["Vehicle Inward"]}</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity
                  onPress={() => navigateToTPMS()}
                  style={styles.menuButton}
                >
                  <Icon style={styles.menuIcon} type={"files"} />
                  <Text style={[styles.menuText, globalFont.S16Regular]}>{strings["TPMS"]}</Text>
                </TouchableOpacity> */}

          <TouchableOpacity
            onPress={() => createTwoButtonAlert()}
            style={[styles.menuButton, { borderBottomColor: "white" }]}
          >
            <Icon style={[styles.menuIcon, { height: hp('3'), width: wp('5') }]} type={"logout"} />
            <Text style={[styles.menuText, globalFont.S16Regular]}>{strings["Logout"]}</Text>
          </TouchableOpacity>



          {/*<TouchableOpacity*/}
          {/*  onPress={() => props.navigation.navigate("JobCardScreen")}*/}
          {/*  style={styles.menuButton}*/}
          {/*>*/}
          {/*  <Icon type={"files"} />*/}
          {/*  <Text style={styles.menuText}>Job cards</Text>*/}
          {/*</TouchableOpacity>*/}

          {/* <TouchableOpacity
            onPress={() => props.navigation.navigate("InvoiceScreen")}
            style={styles.menuButton}
          >
            <Icon type={"files"} />
            <Text style={styles.menuText}>Invoice</Text>
          </TouchableOpacity> */}
        </ScrollView>
      </View>

      <View style={{ width: wp("40"), alignSelf: 'flex-end' }}>
        <Text
          style={[{
            color: Color.orangeBorder,
            alignSelf: "flex-end",
            marginRight: 10,
            marginBottom: 10,
          }, globalFont.S14Regular]}
        >
          {version ? `${ENV} - v${version}` : ""}
        </Text>
        {/* <TouchableOpacity
          style={styles.drawerBottomView}
          onPress={() => createTwoButtonAlert()}
        >
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center",
  },
  drawerTopView: {
    height: hp("25"),
    alignItems: "center",
    flexDirection: "row",
    alignSelf: 'flex-start',
    width: wp('70'),
  },
  drawerCenterView: {
    flex: 1,
    backgroundColor: Color.appBackground,
    alignSelf: 'flex-start',
    width: wp('70')
  },
  drawerBottomView: {
    backgroundColor: Color.orangeBackground,
    minHeight: 60,
    maxHeight: 70,
    alignItems: "center",
    justifyContent: "center",
    width: wp('70')
  },
  profileImage: {
    height: wp('18'),
    width: wp('18'),
    // height: 100,
    // width: 100,
    marginLeft: 20,
    borderRadius: 50
  },
  menuButton: {
    height: hp('6'),
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 0.5,
    marginTop: 30,
    borderBottomColor: Color.orangeBorder,
  },
  menuText: {
    marginLeft: 18,
    color: '#000000',
  },
  menuIcon: {
    height: hp('3.5'),
    width: wp('5')
  },
  logoutText: {
    fontFamily: Fonts.OpenSansRegular,
    color: Color.whiteText,
  },
});

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {
  logoutUserFromServer,
  initiateAppointmentFilter,
  initiateServiceFilter,
  initiateJobFilter,
  getAllJobCards,
  getAllServiceEstimates,
  getAllAppointments,
  dropDownSelection,
  vehicleTextInput,
  resetVehicleHistory
})(DrawerView);
