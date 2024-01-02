import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {useState} from 'react';
import SignUp from '../components/SignUp';
import Login from '../components/Login';
import {useGlobalState} from '../GlobalProvider';
const Auth = props => {
  const [showLogin, setShowLogin] = useState(true);
  const {translation} = useGlobalState();
  return (
    <View style={styles.main}>
      <View style={styles.authNav}>
        <TouchableOpacity onPress={() => setShowLogin(false)}>
          <Text style={[styles.navItem, !showLogin && styles.borderBottom]}>
            {translation.signUp}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setShowLogin(true)}>
          <Text style={[styles.navItem, showLogin && styles.borderBottom]}>
            {translation.logIn}
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        {showLogin ? <Login props={props} /> : <SignUp props={props} />}
      </View>
      {/* <View style={styles.footer}>
        <Text style={styles.footerBigText}>
          {translation.orContinueWithSocialAccount}
        </Text>
        <View style={styles.socialGroup}>
          <Image
            source={require('../images/facebookLogo.png')}
            style={{marginRight: 10}}
          />
          <Image
            source={require('../images/googleLogo.png')}
            style={{marginLeft: 10}}
          />
        </View>
        <Text style={styles.footerSmallText}>
          {translation.bySigningUpLogginInIAgreeTo}{' '}
          <Text style={{color: '#4E69FF'}}>{translation.termsCondition}.</Text>{' '}
        </Text>
      </View> */}
    </View>
  );
};

export default Auth;

const styles = StyleSheet.create({
  main: {
    backgroundColor: '#F5F5FA',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  authNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  navItem: {
    color: '#000',
    fontFamily: 'Noto Sans',
    fontSize: 20,
  },
  borderBottom: {
    borderBottomWidth: 2,
    borderColor: '#5F90CA',
  },
  footer: {
    marginTop: 40,
  },
  footerBigText: {
    color: '#000',
    fontFamily: 'Noto Sans',
    fontSize: 14,
    textAlign: 'center',
  },
  footerSmallText: {
    color: '#000',
    fontFamily: 'Noto Sans',
    fontSize: 10,
    textAlign: 'center',
  },
  socialGroup: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 23,
    marginBottom: 70,
  },
});
