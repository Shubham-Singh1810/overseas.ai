import React, {createContext, useContext, useEffect, useState} from 'react';
import {translation} from './Language';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getProfileStrength} from './services/user.service';

// Step 1: Create a context
const GlobalStateContext = createContext();

// Step 2: Create a provider component
export const GlobalStateProvider = ({children}) => {
  const setUserData = async () => {
    try {
      let localUser = await AsyncStorage.getItem('user');
      setGlobalState({...globalState, user: localUser});
    } catch (error) {
      console.warn('error from global provider');
    }
  };

  const [globalState, setGlobalState] = useState({
    // Your initial global state values go here
    selectedLanguage: 'english',
    user: null,
    profileStrength: null,
    notifications: null,
    regSource:null
  });
  const [translation, setTranslation] = useState({});
  const [newTranslation, setNewTranslation] = useState({});
  const setLanguage = () => {
    setTranslation({
      signUp:
        globalState.selectedLanguage == 'english'
          ? 'Sign Up'
          : globalState.selectedLanguage == 'hindi'
          ? 'साइन अप करें'
          : 'নিবন্ধন করুন',
      logIn:
        globalState.selectedLanguage == 'english'
          ? '  Log In'
          : globalState.selectedLanguage == 'hindi'
          ? 'लॉग इन करें'
          : 'প্রবেশ করুন',
      authenticate:
        globalState.selectedLanguage == 'english'
          ? '  Authenticate'
          : globalState.selectedLanguage == 'hindi'
          ? 'प्रमाणित'
          : 'প্রমাণীকরণ',
      LogInToYourAccount:
        globalState.selectedLanguage == 'english'
          ? 'Log in to your account'
          : globalState.selectedLanguage == 'hindi'
          ? 'अपने अकाउंट में लॉग इन करें'
          : 'আপনার অ্যাকাউন্টে লগ ইন করুন',
      createNewAccount:
        globalState.selectedLanguage == 'english'
          ? 'Create new account'
          : globalState.selectedLanguage == 'hindi'
          ? 'नया खाता बनाएँ'
          : 'নতুন অ্যাকাউন্ট তৈরি',
      name:
        globalState.selectedLanguage == 'english'
          ? 'Name'
          : globalState.selectedLanguage == 'hindi'
          ? 'नाम'
          : 'নাম',
      mobileNumber:
        globalState.selectedLanguage == 'english'
          ? 'Mobile number'
          : globalState.selectedLanguage == 'hindi'
          ? 'मोबाइल नंबर'
          : 'মোবাইল নম্বর',
      password:
        globalState.selectedLanguage == 'english'
          ? 'Password'
          : globalState.selectedLanguage == 'hindi'
          ? 'पासवर्ड'
          : 'পাসওয়ার্ড',
      enterPassword:
        globalState.selectedLanguage == 'english'
          ? 'Enter Password'
          : globalState.selectedLanguage == 'hindi'
          ? 'पास वर्ड दर्ज करें'
          : 'পাসওয়ার্ড লিখুন',
      reEnterPassword:
        globalState.selectedLanguage == 'english'
          ? 'Re Enter Password'
          : globalState.selectedLanguage == 'hindi'
          ? 'पासवर्ड फिर से दर्ज करें'
          : 'পাসওয়ার্ড পুনরায় প্রবেশ',
      forgetPassword:
        globalState.selectedLanguage == 'english'
          ? 'Forget Password'
          : globalState.selectedLanguage == 'hindi'
          ? 'पासवर्ड भूल गए'
          : 'পাসওয়ার্ড ভুলে গেছেন',
      sendOtp:
        globalState.selectedLanguage == 'english'
          ? 'Send Otp'
          : globalState.selectedLanguage == 'hindi'
          ? 'OTP भेजें'
          : 'Otp পাঠান',
      orContinueWithSocialAccount:
        globalState.selectedLanguage == 'english'
          ? 'Or Continue with social account'
          : globalState.selectedLanguage == 'hindi'
          ? 'या सोशल अकाउंट जारी रखें'
          : 'অথবা সামাজিক অ্যাকাউন্ট দিয়ে চালিয়ে যান',
      bySigningUpLogginInIAgreeTo:
        globalState.selectedLanguage == 'english'
          ? 'By Signing up/ Loggin in. I agree to'
          : globalState.selectedLanguage == 'hindi'
          ? 'साइन अप/लॉग इन करके। मैं सहमत हूं'
          : 'সাইন আপ/লগইন করে। আমি রাজি',
      termsCondition:
        globalState.selectedLanguage == 'english'
          ? 'Terms & Condition'
          : globalState.selectedLanguage == 'hindi'
          ? 'नियम व शर्त'
          : 'বিধি - নিষেধ এবং শর্তাবলী',
      home:
        globalState.selectedLanguage == 'english'
          ? 'Home'
          : globalState.selectedLanguage == 'hindi'
          ? 'घर'
          : 'বাড়ি',
      hello:
        globalState.selectedLanguage == 'english'
          ? 'Hello'
          : globalState.selectedLanguage == 'hindi'
          ? 'नमस्ते'
          : 'হ্যালো',
      enterJobTitleOccupation:
        globalState.selectedLanguage == 'english'
          ? 'Enter Job title, Occupation'
          : globalState.selectedLanguage == 'hindi'
          ? 'नौकरी का शीर्षक, व्यवसाय दर्ज करें'
          : 'চাকরির শিরোনাম, পেশা লিখুন',
      enterCountryName:
        globalState.selectedLanguage == 'english'
          ? 'Enter Country name'
          : globalState.selectedLanguage == 'hindi'
          ? 'देश का नाम दर्ज करें'
          : 'দেশের নাম লিখুন',
      jobsYouCanGet:
        globalState.selectedLanguage == 'english'
          ? 'Jobs you can get'
          : globalState.selectedLanguage == 'hindi'
          ? 'नौकरियाँ आपको मिल सकती हैं'
          : 'আপনি পেতে পারেন চাকরি',
      hereFromOther:
        globalState.selectedLanguage == 'english'
          ? 'Hear from others'
          : globalState.selectedLanguage == 'hindi'
          ? 'दूसरों से सुनें'
          : 'অন্যদের থেকে শুনুন',
      getTrainingToEnhanceYourSkill:
        globalState.selectedLanguage == 'english'
          ? 'Get training to enhance your skill'
          : globalState.selectedLanguage == 'hindi'
          ? 'अपने कौशल को बढ़ाने के लिए प्रशिक्षण प्राप्त करें'
          : 'আপনার দক্ষতা বাড়ানোর জন্য প্রশিক্ষণ নিন',
      countriesWhereYouCanApply:
        globalState.selectedLanguage == 'english'
          ? 'Countries where you can apply'
          : globalState.selectedLanguage == 'hindi'
          ? 'वे देश जहां आप आवेदन कर सकते हैं'
          : 'যেসব দেশে আপনি আবেদন করতে পারবেন',
      getCertified:
        globalState.selectedLanguage == 'english'
          ? 'Get Certified'
          : globalState.selectedLanguage == 'hindi'
          ? 'प्रमाणन हासिल करें'
          : 'সার্টিফাইড পান',
      learnNewSkills:
        globalState.selectedLanguage == 'english'
          ? 'Learn new skills'
          : globalState.selectedLanguage == 'hindi'
          ? 'नए हुनर ​​सीखना'
          : 'নতুন কিছু শিখুন',
      applyForPassport:
        globalState.selectedLanguage == 'english'
          ? 'Apply for passport'
          : globalState.selectedLanguage == 'hindi'
          ? 'पासपोर्ट के लिए आवेदन करें'
          : 'পাসপোর্টের জন্য আবেদন করুন',
      topProfiles:
        globalState.selectedLanguage == 'english'
          ? 'Top Profiles'
          : globalState.selectedLanguage == 'hindi'
          ? 'शीर्ष प्रोफाइल'
          : 'শীর্ষ প্রোফাইল',
      others:
        globalState.selectedLanguage == 'english'
          ? 'Others'
          : globalState.selectedLanguage == 'hindi'
          ? 'अन्य'
          : 'অন্যান্য',
      savedVideo:
        globalState.selectedLanguage == 'english'
          ? 'Saved Video'
          : globalState.selectedLanguage == 'hindi'
          ? 'सहेजा गया वीडियो'
          : 'সংরক্ষিত ভিডিও',
      makeYourVideoResume:
        globalState.selectedLanguage == 'english'
          ? 'Make your video resume'
          : globalState.selectedLanguage == 'hindi'
          ? 'अपना वीडियो बायोडाटा बनाएं'
          : 'আপনার ভিডিও সারসংকলন করুন',
      clickCameraToStart:
        globalState.selectedLanguage == 'english'
          ? 'Click camera to start'
          : globalState.selectedLanguage == 'hindi'
          ? 'प्रारंभ करने के लिए कैमरा क्लिक करें'
          : 'শুরু করতে ক্যামেরা ক্লিক করুন',
      checkUpdatesOnYourApplication:
        globalState.selectedLanguage == 'english'
          ? 'Check updates on your application'
          : globalState.selectedLanguage == 'hindi'
          ? 'अपने एप्लिकेशन पर अपडेट जांचें'
          : 'আপনার আবেদনের আপডেট চেক করুন',
      appliedOn:
        globalState.selectedLanguage == 'english'
          ? 'Applied on'
          : globalState.selectedLanguage == 'hindi'
          ? 'अप्लाई हुआ '
          : 'প্রয়োগ করা হয়েছে',
      status:
        globalState.selectedLanguage == 'english'
          ? 'Status'
          : globalState.selectedLanguage == 'hindi'
          ? 'स्थिति'
          : 'স্ট্যাটাস',
      applicationSendtoHr:
        globalState.selectedLanguage == 'english'
          ? 'Application send to HR'
          : globalState.selectedLanguage == 'hindi'
          ? 'आवेदन एचआर को भेजें'
          : 'HR-এ আবেদন পাঠান',
      applicationUnderReview:
        globalState.selectedLanguage == 'english'
          ? 'Application under review'
          : globalState.selectedLanguage == 'hindi'
          ? 'आवेदन समीक्षाधीन है'
          : 'রিভিউ অধীনে আবেদন',
      shortlistedInInterview:
        globalState.selectedLanguage == 'english'
          ? 'Shortlisted in interview'
          : globalState.selectedLanguage == 'hindi'
          ? 'इंटरव्यू में शॉर्टलिस्ट किया गया'
          : 'ইন্টারভিউতে বাছাই করা হয়েছে',
      selected:
        globalState.selectedLanguage == 'english'
          ? 'Selected'
          : globalState.selectedLanguage == 'hindi'
          ? 'चयनित'
          : 'নির্বাচিত',
      saveAllYourImportantDocumentsHere:
        globalState.selectedLanguage == 'english'
          ? 'Save all your important documents here'
          : globalState.selectedLanguage == 'hindi'
          ? 'अपने सभी महत्वपूर्ण दस्तावेज़ यहां सहेजें'
          : 'এখানে আপনার সমস্ত গুরুত্বপূর্ণ নথি সংরক্ষণ করুন',
      cv:
        globalState.selectedLanguage == 'english'
          ? 'CV'
          : globalState.selectedLanguage == 'hindi'
          ? 'सीवी'
          : 'সিভি',
      noteThisIsAnAutoGeneratedCvByOurSystem:
        globalState.selectedLanguage == 'english'
          ? 'Note : This is an auto generated cv by our system.'
          : globalState.selectedLanguage == 'hindi'
          ? 'नोट: यह हमारे सिस्टम द्वारा स्वचालित रूप से जेनरेट किया गया सीवी है।'
          : 'দ্রষ্টব্য: এটি আমাদের সিস্টেম দ্বারা একটি স্বয়ংক্রিয়ভাবে তৈরি করা সিভি।',
      clickEditToMakeChanges:
        globalState.selectedLanguage == 'english'
          ? 'Click ‘Edit’ to make changes'
          : globalState.selectedLanguage == 'hindi'
          ? "परिवर्तन करने के लिए 'संपादित करें' पर क्लिक करें"
          : "পরিবর্তন করতে 'সম্পাদনা করুন' এ ক্লিক করুন",
      passport:
        globalState.selectedLanguage == 'english'
          ? 'Passport'
          : globalState.selectedLanguage == 'hindi'
          ? 'पासपोर्ट'
          : 'পাসপোর্ট',
      experienceCertificate:
        globalState.selectedLanguage == 'english'
          ? 'Experience Certificate'
          : globalState.selectedLanguage == 'hindi'
          ? 'अनुभव प्रमाण पत्र'
          : 'অভিজ্ঞতা সনদপত্র',
      jobPermit:
        globalState.selectedLanguage == 'english'
          ? 'Job Permit'
          : globalState.selectedLanguage == 'hindi'
          ? 'नौकरी परमिट'
          : 'জব পারমিট',
      covidVaccineCertificate:
        globalState.selectedLanguage == 'english'
          ? 'Covid Vaccine Certificate'
          : globalState.selectedLanguage == 'hindi'
          ? 'कोविड वैक्सीन प्रमाणपत्र'
          : 'কোভিড ভ্যাকসিন সার্টিফিকেট',
      exitLetter:
        globalState.selectedLanguage == 'english'
          ? 'Exit letter'
          : globalState.selectedLanguage == 'hindi'
          ? 'निकास पत्र'
          : 'প্রস্থান চিঠি',
      drivingLicense:
        globalState.selectedLanguage == 'english'
          ? 'Driving License'
          : globalState.selectedLanguage == 'hindi'
          ? 'ड्राइविंग लाइसेंस'
          : 'ড্রাইভিং লাইসেন্স',
      addNewDocument:
        globalState.selectedLanguage == 'english'
          ? 'Add new document'
          : globalState.selectedLanguage == 'hindi'
          ? 'नया दस्तावेज़ जोड़ें'
          : 'নতুন নথি যোগ করুন',
      allYourDocumentsAreSafeWithUs:
        globalState.selectedLanguage == 'english'
          ? 'All your documents are safe with us!'
          : globalState.selectedLanguage == 'hindi'
          ? 'आपके सभी दस्तावेज़ हमारे पास सुरक्षित हैं!'
          : 'আপনার সমস্ত নথি আমাদের কাছে নিরাপদ!',
      home:
        globalState.selectedLanguage == 'english'
          ? 'Home'
          : globalState.selectedLanguage == 'hindi'
          ? 'होम'
          : 'হোম',
      video:
        globalState.selectedLanguage == 'english'
          ? 'Video'
          : globalState.selectedLanguage == 'hindi'
          ? 'वीडियो'
          : 'ভিডিও',
      jobApplied:
        globalState.selectedLanguage == 'english'
          ? 'Jobs Applied'
          : globalState.selectedLanguage == 'hindi'
          ? 'आवेदन'
          : 'চাকরির আবেদন',
      documents:
        globalState.selectedLanguage == 'english'
          ? 'Documents'
          : globalState.selectedLanguage == 'hindi'
          ? 'दस्तावेज़'
          : 'নথিপত্র',
      myProfile:
        globalState.selectedLanguage == 'english'
          ? 'My Profile'
          : globalState.selectedLanguage == 'hindi'
          ? 'मेरी प्रोफाइल'
          : 'আমার প্রোফাইল',
      uploadNow:
        globalState.selectedLanguage == 'english'
          ? 'Upload Now'
          : globalState.selectedLanguage == 'hindi'
          ? 'अभी अपलोड करें'
          : 'এখন আপলোড করুন',
      yourProfilePhotoIsVisibleToRecruiter:
        globalState.selectedLanguage == 'english'
          ? 'Your profile photo is visible to recruiters'
          : globalState.selectedLanguage == 'hindi'
          ? 'आपकी प्रोफ़ाइल फ़ोटो भर्तीकर्ताओं को दिखाई देती है'
          : 'আপনার প্রোফাইল ফটো নিয়োগকারীদের কাছে দৃশ্যমান',
      edit:
        globalState.selectedLanguage == 'english'
          ? 'Edit'
          : globalState.selectedLanguage == 'hindi'
          ? 'संपादन'
          : 'সম্পাদনা',
      clickToPlayVideoResume:
        globalState.selectedLanguage == 'english'
          ? 'Click to play video resume'
          : globalState.selectedLanguage == 'hindi'
          ? 'वीडियो बायोडाटा चलाने के लिए क्लिक करें'
          : 'ভিডিও সারসংকলন চালানোর জন্য ক্লিক করুন',
      myCareerGraph:
        globalState.selectedLanguage == 'english'
          ? 'My Career Graph'
          : globalState.selectedLanguage == 'hindi'
          ? 'मेरा कैरियर ग्रा'
          : 'আমার ক্যারিয়ার গ্রাফ',
      coursesApplied:
        globalState.selectedLanguage == 'english'
          ? 'Courses Applied'
          : globalState.selectedLanguage == 'hindi'
          ? 'एप्लाइड  पाठ्यक्रम'
          : 'কোর্স প্রয়োগ করা হয়েছে',
      myDocuments:
        globalState.selectedLanguage == 'english'
          ? 'My Documents'
          : globalState.selectedLanguage == 'hindi'
          ? 'मेरे दस्तावेज़'
          : 'আমার ডকুমেন্টস',
      savedJobs:
        globalState.selectedLanguage == 'english'
          ? 'Saved Jobs'
          : globalState.selectedLanguage == 'hindi'
          ? 'सेव नौकरियाँ'
          : 'সেভ করা চাকরি',
      notifications:
        globalState.selectedLanguage == 'english'
          ? 'Notifications'
          : globalState.selectedLanguage == 'hindi'
          ? 'सूचनाएं'
          : 'বিজ্ঞপ্তি',
      savedVideos:
        globalState.selectedLanguage == 'english'
          ? 'Saved Videos'
          : globalState.selectedLanguage == 'hindi'
          ? 'सहेजे गए वीडियो'
          : 'সংরক্ষিত ভিডিও',
      needHelp:
        globalState.selectedLanguage == 'english'
          ? 'Need Help'
          : globalState.selectedLanguage == 'hindi'
          ? 'मदद की ज़रूरत है'
          : 'সাহায্য দরকার',
      logOut:
        globalState.selectedLanguage == 'english'
          ? 'Log Out'
          : globalState.selectedLanguage == 'hindi'
          ? 'लॉग आउट'
          : 'প্রস্থান',
      version:
        globalState.selectedLanguage == 'english'
          ? 'Version'
          : globalState.selectedLanguage == 'hindi'
          ? 'संस्करण'
          : 'সংস্করণ0',
      tellUsHowCanWehelpYou:
        globalState.selectedLanguage == 'english'
          ? 'Tell us how can we help you?'
          : globalState.selectedLanguage == 'hindi'
          ? 'हमें बताएं कि हम आपकी कैसे मदद कर सकते हैं?'
          : 'আমাদের বলুন কিভাবে আমরা আপনাকে সাহায্য করতে পারি?',
      callOurAgents:
        globalState.selectedLanguage == 'english'
          ? 'Call Our Agents'
          : globalState.selectedLanguage == 'hindi'
          ? 'हमारे एजेंटों को कॉल करें'
          : 'আমাদের এজেন্টদের কল করুন',
      help:
        globalState.selectedLanguage == 'english'
          ? 'Help'
          : globalState.selectedLanguage == 'hindi'
          ? 'मदद'
          : 'সাহায্য',
      new:
        globalState.selectedLanguage == 'english'
          ? 'New'
          : globalState.selectedLanguage == 'hindi'
          ? 'नया'
          : 'নতুন',
      welder:
        globalState.selectedLanguage == 'english'
          ? 'Welder'
          : globalState.selectedLanguage == 'hindi'
          ? 'वेल्डर'
          : 'ওয়েল্ডার',
      applyBefore:
        globalState.selectedLanguage == 'english'
          ? 'Apply Before'
          : globalState.selectedLanguage == 'hindi'
          ? 'पहले आवेदन करें'
          : 'আগে আবেদন করুন',
      experience:
        globalState.selectedLanguage == 'english'
          ? 'Experience'
          : globalState.selectedLanguage == 'hindi'
          ? 'अनुभव'
          : 'অভিজ্ঞতা',
      yourProfileMatched:
        globalState.selectedLanguage == 'english'
          ? 'Your profile matched'
          : globalState.selectedLanguage == 'hindi'
          ? 'आपकी प्रोफ़ाइल मेल खा गई'
          : 'আপনার প্রোফাইল মিলেছে',
      years:
        globalState.selectedLanguage == 'english'
          ? 'Years'
          : globalState.selectedLanguage == 'hindi'
          ? 'साल'
          : 'বছর',
      applyNow:
        globalState.selectedLanguage == 'english'
          ? 'Apply Now'
          : globalState.selectedLanguage == 'hindi'
          ? 'अभी अप्लाई करें'
          : 'এখন আবেদন কর',
      readDetails:
        globalState.selectedLanguage == 'english'
          ? 'Read Details'
          : globalState.selectedLanguage == 'hindi'
          ? 'विवरण पढ़ें'
          : 'বিস্তারিত পড়ুন',
    });
    setNewTranslation({
      logIn:
        globalState.selectedLanguage == 'english'
          ? 'Log In'
          : globalState.selectedLanguage == 'hindi'
          ? 'लॉग इन करें'
          : 'লগ ইন',
      logInToYourAccount:
        globalState.selectedLanguage == 'english'
          ? 'Log in to your account'
          : globalState.selectedLanguage == 'hindi'
          ? 'अपने अकाउंट में लॉग इन करें'
          : 'আপনার অ্যাকাউন্টে লগ ইন করুন',
      mobileNumber:
        globalState.selectedLanguage == 'english'
          ? 'Mobile number'
          : globalState.selectedLanguage == 'hindi'
          ? 'मोबाइल नंबर'
          : 'মোবাইল নম্বর',
      password:
        globalState.selectedLanguage == 'english'
          ? 'Password'
          : globalState.selectedLanguage == 'hindi'
          ? 'पासवर्ड'
          : 'পাসওয়ার্ড',
      logInViaOtpVerification:
        globalState.selectedLanguage == 'english'
          ? 'Log In Via OTP Verification'
          : globalState.selectedLanguage == 'hindi'
          ? 'ओ टी पी के माध्यम से लॉग इन करें'
          : 'ও টি পি এর মাধ্যমে লগ ইন করুন',
      dontHaveAnyAccount:
        globalState.selectedLanguage == 'english'
          ? "Don't have any account?"
          : globalState.selectedLanguage == 'hindi'
          ? 'कोई खाता नहीं है?'
          : 'কোনো অ্যাকাউন্ট নেই?',
      signUp:
        globalState.selectedLanguage == 'english'
          ? 'Sign Up'
          : globalState.selectedLanguage == 'hindi'
          ? 'साइन अप करें'
          : 'সাইন আপ করুন',
      mobileNumberMustBeOf10Digit:
        globalState.selectedLanguage == 'english'
          ? 'Mobile number must be of 10 digit'
          : globalState.selectedLanguage == 'hindi'
          ? 'मोबाइल नंबर 10 अंक का होना चाहिए'
          : 'মোবাইল নম্বর 10 সংখ্যার হতে হবে',
      passwordMustBeAtLeast6Characters:
        globalState.selectedLanguage == 'english'
          ? 'Password must be at least 6 characters'
          : globalState.selectedLanguage == 'hindi'
          ? 'पासवर्ड कम से कम 6 अंकों का होना चाहिए'
          : 'পাসওয়ার্ড কমপক্ষে 6 অক্ষরের হতে হবে',
      invalidCredentials:
        globalState.selectedLanguage == 'english'
          ? 'Invalid credentials'
          : globalState.selectedLanguage == 'hindi'
          ? 'अवैध प्रमाणपत्र'
          : 'অবৈধ শংসাপত্র',
      phoneNumberNotRegistered:
        globalState.selectedLanguage == 'english'
          ? 'Phone number not registered'
          : globalState.selectedLanguage == 'hindi'
          ? 'फ़ोन नंबर पंजीकृत नहीं है'
          : 'ফোন নম্বর নিবন্ধিত নয়',
      pleaseEnterAValidNumber:
        globalState.selectedLanguage == 'english'
          ? 'Phone number not registered'
          : globalState.selectedLanguage == 'hindi'
          ? 'कृपया सही अंक दर्ज करें'
          : 'দয়া করে একটি বৈধ নম্বর লিখুন',
      createNewAccount:
        globalState.selectedLanguage == 'english'
          ? 'Create new account'
          : globalState.selectedLanguage == 'hindi'
          ? 'नया खाता बनाएँ'
          : 'নতুন অ্যাকাউন্ট তৈরি করুন',
      name:
        globalState.selectedLanguage == 'english'
          ? 'Name'
          : globalState.selectedLanguage == 'hindi'
          ? 'नाम'
          : 'নাম',
      password:
        globalState.selectedLanguage == 'english'
          ? 'Password'
          : globalState.selectedLanguage == 'hindi'
          ? 'पासवर्ड'
          : 'পাসওয়ার্ড',
      enterPassword:
        globalState.selectedLanguage == 'english'
          ? 'Enter Password'
          : globalState.selectedLanguage == 'hindi'
          ? 'पास वर्ड दर्ज करें'
          : 'পাসওয়ার্ড লিখুন',
      reEnterPassword:
        globalState.selectedLanguage == 'english'
          ? 'Re Enter Password'
          : globalState.selectedLanguage == 'hindi'
          ? 'पासवर्ड फिर से दर्ज करें'
          : 'পাসওয়ার্ড পুনরায় লিখুন',
      alreadyHaveAnAccount:
        globalState.selectedLanguage == 'english'
          ? 'Already have an account ?'
          : globalState.selectedLanguage == 'hindi'
          ? 'क्या आपके पास पहले से एक खाता मौजूद है ?'
          : 'আপনার কি একাউন্ট তৈরী আছে ?',
      nameIsARequiredField:
        globalState.selectedLanguage == 'english'
          ? 'Name is a required field'
          : globalState.selectedLanguage == 'hindi'
          ? 'नाम एक आवश्यक फ़ील्ड है'
          : 'নাম একটি প্রয়োজনীয় ক্ষেত্র',
      confirmPasswordDoesNotMatch:
        globalState.selectedLanguage == 'english'
          ? 'Confirm Password does not match'
          : globalState.selectedLanguage == 'hindi'
          ? 'पासवर्ड पुष्टि नहीं मिल रहा है '
          : 'নিশ্চিত পাসওয়ার্ড মিলছে না',
      userAlredyRegistered:
        globalState.selectedLanguage == 'english'
          ? 'User alredy registered'
          : globalState.selectedLanguage == 'hindi'
          ? 'यह खता पहले से ही है'
          : 'আপনার একাউন্ট তৌরি আছে',
      somethingWentWrong:
        globalState.selectedLanguage == 'english'
          ? 'Something went wrong'
          : globalState.selectedLanguage == 'hindi'
          ? 'कुछ गलत है'
          : 'কিছু ভুল হয়েছে',
      wrongOtp:
        globalState.selectedLanguage == 'english'
          ? 'Wrong OTP'
          : globalState.selectedLanguage == 'hindi'
          ? 'ओ टी पी गलत है'
          : 'ও টি পি ভুল হয়েছে',
      otpResendSuccessfully:
        globalState.selectedLanguage == 'english'
          ? 'OTP resend successfully'
          : globalState.selectedLanguage == 'hindi'
          ? 'ओ टी पी सफलतापूर्वक दोबारा भेजा गया'
          : 'ও টি পি পুনরায় পাঠানো হয়েছে',
      enterOTP:
        globalState.selectedLanguage == 'english'
          ? 'Enter OTP'
          : globalState.selectedLanguage == 'hindi'
          ? 'ओ टी पी दर्ज करें'
          : 'ও টি পি লিখুন',
      timesUp:
        globalState.selectedLanguage == 'english'
          ? 'Times up'
          : globalState.selectedLanguage == 'hindi'
          ? 'समय पूर्ण हुआ'
          : 'সময় শেষ',
      didntgetOTP:
        globalState.selectedLanguage == 'english'
          ? 'Didn’t get OTP?'
          : globalState.selectedLanguage == 'hindi'
          ? 'ओ टी पी नहीं मिला?'
          : 'ও টি পি পাননি?',
      resendOTP:
        globalState.selectedLanguage == 'english'
          ? 'Resend OTP'
          : globalState.selectedLanguage == 'hindi'
          ? 'ओ टी पी नहीं मिला?'
          : 'ও টি পি আবার পাঠান',
      verifyOTP:
        globalState.selectedLanguage == 'english'
          ? 'Verify OTP'
          : globalState.selectedLanguage == 'hindi'
          ? 'ओ टी पी सत्यापित करें'
          : 'ও টি পি যাচাই করুন',
      ourAdvisorIsJustACallAway:
        globalState.selectedLanguage == 'english'
          ? 'Our advisor is just a call away'
          : globalState.selectedLanguage == 'hindi'
          ? 'हमारा सलाहकार बस एक कॉल की दूरी पर है'
          : 'আমাদের উপদেষ্টা মাত্র একটি কল দূরে',
      available24X7forYourQuires:
        globalState.selectedLanguage == 'english'
          ? 'Available 24X7 for your quires'
          : globalState.selectedLanguage == 'hindi'
          ? 'हम आपके सवालों का जवाब 24 घंटे देने के लिए तैयार हैं'
          : 'আপনাদের প্রশ্নের উত্তর দেওয়ার জন্য ২৪ ঘন্টা প্রস্তুত',
      haveAQueryLetsSolveThis:
        globalState.selectedLanguage == 'english'
          ? 'Have a query? Let’s Solve this'
          : globalState.selectedLanguage == 'hindi'
          ? 'कोई प्रश्न है? आइए इसे हल करें'
          : 'আপনার কি কিছু জানার আছে? এর সমাধান করা যাক',
      subject:
        globalState.selectedLanguage == 'english'
          ? 'Subject'
          : globalState.selectedLanguage == 'hindi'
          ? 'विषय'
          : 'বিষয়',
      writeyourqueryhere:
        globalState.selectedLanguage == 'english'
          ? 'Write your query here*'
          : globalState.selectedLanguage == 'hindi'
          ? 'अपना प्रश्न यहाँ लिखें'
          : 'আপনার প্রশ্ন এখানে লিখুন',
      selected:
        globalState.selectedLanguage == 'english'
          ? 'Selected'
          : globalState.selectedLanguage == 'hindi'
          ? 'चयनित'
          : 'নির্বাচিত',
      uploadVideo:
        globalState.selectedLanguage == 'english'
          ? 'Upload Video'
          : globalState.selectedLanguage == 'hindi'
          ? 'विडियो अॅॅपलोड '
          : 'ভিডিও আপলোড',
      audioVideo:
        globalState.selectedLanguage == 'english'
          ? 'Audio Upload'
          : globalState.selectedLanguage == 'hindi'
          ? 'ऑडियो अपलोड'
          : 'অডিও আপলোড',
      submit:
        globalState.selectedLanguage == 'english'
          ? 'Submit'
          : globalState.selectedLanguage == 'hindi'
          ? 'जमा करे'
          : 'জমা করুন',
      subjectisrequiredfield:
        globalState.selectedLanguage == 'english'
          ? 'Subject is required field'
          : globalState.selectedLanguage == 'hindi'
          ? 'विषय आवश्यक फ़ील्ड है'
          : 'বিষয় প্রয়োজনীয় ক্ষেত্র',
      queryIsRequiredField:
        globalState.selectedLanguage == 'english'
          ? 'Query is required field'
          : globalState.selectedLanguage == 'hindi'
          ? 'प्रश्न आवश्यक फ़ील्ड है'
          : 'অনুসন্ধান প্রয়োজনীয় ক্ষেত্র',
      Helprequestsubmittedsuccessfully:
        globalState.selectedLanguage == 'english'
          ? 'Help request submitted successfully!'
          : globalState.selectedLanguage == 'hindi'
          ? 'सहायता अनुरोध सफलतापूर्वक सबमिट किया गया'
          : 'সাহায্যের অনুরোধ সফলভাবে জমা দেওয়া হয়েছে',
      Ourteammemberwillgetbacktoyousoon:
        globalState.selectedLanguage == 'english'
          ? 'Our team member will get back to you soon.'
          : globalState.selectedLanguage == 'hindi'
          ? 'सहायता अनुरोध सफलतापूर्वक सबमिट किया गया'
          : 'আমাদের উপদেষ্টা শীঘ্রই আপনার সঙ্গে যোগাযোগ করবেন',
      saveAllYourImportantDocumentsHere:
        globalState.selectedLanguage == 'english'
          ? 'Save all your important documents here'
          : globalState.selectedLanguage == 'hindi'
          ? 'अपने सभी महत्वपूर्ण दस्तावेज़ यहां सहेजें'
          : 'এখানে আপনার সমস্ত গুরুত্বপূর্ণ নথি সংরক্ষণ করুন',
      customCV:
        globalState.selectedLanguage == 'english'
          ? 'Custom CV'
          : globalState.selectedLanguage == 'hindi'
          ? 'स्वनिर्धारित सीवी'
          : 'নিজের তৈরী সিভি',
      covidCertificate:
        globalState.selectedLanguage == 'english'
          ? 'Covid Certificate'
          : globalState.selectedLanguage == 'hindi'
          ? 'कोविड प्रमाणपत्र'
          : 'কোভিড প্রমানপত্র',
      educationCertificate:
        globalState.selectedLanguage == 'english'
          ? 'Education Certificate'
          : globalState.selectedLanguage == 'hindi'
          ? 'शिक्षा का प्रमाण पत्र'
          : 'শিক্ষা প্রমানপত্র',
      otherDocuments:
        globalState.selectedLanguage == 'english'
          ? 'Other Documents'
          : globalState.selectedLanguage == 'hindi'
          ? 'अन्य प्रमाणपत्र'
          : 'অন্যান্য নথিপত্র',
      passport:
        globalState.selectedLanguage == 'english'
          ? 'Passport'
          : globalState.selectedLanguage == 'hindi'
          ? 'पासपोर्ट'
          : 'পাসপোর্ট',
      experienceCertificate:
        globalState.selectedLanguage == 'english'
          ? 'Experience Certificate'
          : globalState.selectedLanguage == 'hindi'
          ? 'अनुभव प्रमाण पत्र'
          : 'অভিজ্ঞতা প্রমানপত্র',
      drivingLicense:
        globalState.selectedLanguage == 'english'
          ? 'Driving License'
          : globalState.selectedLanguage == 'hindi'
          ? 'ड्राइविंग लाइसेंस'
          : 'ড্রাইভিং লাইসেন্স',

      enterPassportNumber:
        globalState.selectedLanguage == 'english'
          ? 'Enter Passport Number'
          : globalState.selectedLanguage == 'hindi'
          ? 'पासपोर्ट नंबर दर्ज करें'
          : 'পাসপোর্ট নম্বর লিখুন',

      placeOfIssue:
        globalState.selectedLanguage == 'english'
          ? 'Place of Issue'
          : globalState.selectedLanguage == 'hindi'
          ? 'आवेदन का स्थान'
          : 'আবেদনের জায়গা',
          selectPassportCategory:
        globalState.selectedLanguage == 'english'
          ? 'Select Passport Category'
          : globalState.selectedLanguage == 'hindi'
          ? 'पासपोर्ट श्रेणी चुनें'
          : 'পাসপোর্ট বিভাগ নির্বাচন করুন',
      upload:
        globalState.selectedLanguage == 'english'
          ? 'Upload'
          : globalState.selectedLanguage == 'hindi'
          ? 'अपलोड'
          : 'আপলোড',
      view:
        globalState.selectedLanguage == 'english'
          ? 'View'
          : globalState.selectedLanguage == 'hindi'
          ? 'देखिये'
          : 'দেখুন',
      update:
        globalState.selectedLanguage == 'english'
          ? 'Update'
          : globalState.selectedLanguage == 'hindi'
          ? 'अपडेट'
          : 'আপডেট',
      // translation of news feed start
      discoverFreshFeedDelightsNow:
        globalState.selectedLanguage == 'english'
          ? 'Discover Fresh Feed Delights Now!'
          : globalState.selectedLanguage == 'hindi'
          ? 'तजा खबर का आनंदें लें'
          : 'নুতুন খবরের আনন্দ উপভোগ করুন ',
      // translation of news feed end

      // translation of need migration loan start
      initiateMigrationLoanApplication:
        globalState.selectedLanguage == 'english'
          ? 'Initiate migration loan application.'
          : globalState.selectedLanguage == 'hindi'
          ? 'प्रवासन ऋण आवेदन आरंभ करें.'
          : 'মাইগ্রেশন লোনের আবেদন।',

      applicantName:
        globalState.selectedLanguage == 'english'
          ? 'Applicant Name'
          : globalState.selectedLanguage == 'hindi'
          ? 'आवेदक का नाम'
          : 'আবেদনকারীর নাম',

      contactNumber:
        globalState.selectedLanguage == 'english'
          ? 'Contact Number'
          : globalState.selectedLanguage == 'hindi'
          ? 'कांटेक्ट नंबर '
          : 'যোগাযোগ নম্বর',

      panNumber:
        globalState.selectedLanguage == 'english'
          ? 'PAN Number'
          : globalState.selectedLanguage == 'hindi'
          ? 'पैन नंबर'
          : 'প্যান নম্বর',

      doYouHaveLoanGuarantor:
        globalState.selectedLanguage == 'english'
          ? 'Do you have loan guarantor'
          : globalState.selectedLanguage == 'hindi'
          ? 'क्या आपके पास लोन गारंटर है?'
          : 'আপনার কি ঋণ গ্যারান্টার আছে?',

      guarantorName:
        globalState.selectedLanguage == 'english'
          ? 'Guarantor Name'
          : globalState.selectedLanguage == 'hindi'
          ? 'गारंटर का नाम'
          : 'গ্যারান্টারের নাম',

      guarantorContactNumber:
        globalState.selectedLanguage == 'english'
          ? 'Guarantor Contact Number'
          : globalState.selectedLanguage == 'hindi'
          ? 'गारंटर संपर्क नंबर'
          : 'গ্যারান্টারের যোগাযোগ নম্বর',

      guarantorOccupation:
        globalState.selectedLanguage == 'english'
          ? 'Guarantor Occupation'
          : globalState.selectedLanguage == 'hindi'
          ? 'गारंटर का व्यवसाय'
          : 'গ্যারান্টারের পেশা',

      doYouhavePrioLoanRecords:
        globalState.selectedLanguage == 'english'
          ? 'Do you have Prior Loan Records?'
          : globalState.selectedLanguage == 'hindi'
          ? 'क्या आपके पास पूर्व ऋण रिकॉर्ड हैं?'
          : 'আপনার কি পূর্বের ঋণের রেকর্ড আছে?',

      loanAmount:
        globalState.selectedLanguage == 'english'
          ? 'Loan Amount'
          : globalState.selectedLanguage == 'hindi'
          ? 'उधार की राशि'
          : 'ঋণের পরিমাণ',
      yes:
        globalState.selectedLanguage == 'english'
          ? 'Yes'
          : globalState.selectedLanguage == 'hindi'
          ? 'हाँ'
          : 'হ্যাঁ',
      no:
        globalState.selectedLanguage == 'english'
          ? 'No'
          : globalState.selectedLanguage == 'hindi'
          ? 'नहीं'
          : 'না',
      select:
        globalState.selectedLanguage == 'english'
          ? 'Select'
          : globalState.selectedLanguage == 'hindi'
          ? 'चुनें'
          : 'নির্বাচন করুন',
      loanProvider:
        globalState.selectedLanguage == 'english'
          ? 'Loan Provider'
          : globalState.selectedLanguage == 'hindi'
          ? 'ऋण प्रदाता'
          : 'ঋণ প্রদানকারী',
      // translation of need migration loan end

      // translation of get certificate start
      upgradeYourSkill:
        globalState.selectedLanguage == 'english'
          ? 'Upgrade your skill'
          : globalState.selectedLanguage == 'hindi'
          ? 'अपने कौशल को उन्नत करें'
          : 'আপনার দক্ষতা আপগ্রেড',
      getCertified:
        globalState.selectedLanguage == 'english'
          ? 'Get Certified'
          : globalState.selectedLanguage == 'hindi'
          ? 'सर्टिफिकेट प्राप्त करें'
          : 'সার্টিফিকেট পান',
      searchInstitute:
        globalState.selectedLanguage == 'english'
          ? 'Search Institute'
          : globalState.selectedLanguage == 'hindi'
          ? 'संस्थान खोजें'
          : 'ইনস্টিটিউট অনুসন্ধান করুন ',
      topInstitute:
        globalState.selectedLanguage == 'english'
          ? 'Top Institute'
          : globalState.selectedLanguage == 'hindi'
          ? 'शीर्ष संस्थान'
          : 'শীর্ষ ইনস্টিটিউট',
      topCourses:
        globalState.selectedLanguage == 'english'
          ? 'Top Courses'
          : globalState.selectedLanguage == 'hindi'
          ? 'शीर्ष कोर्स'
          : 'শীর্ষ কোর্স',
      searchResults:
        globalState.selectedLanguage == 'english'
          ? 'Search Results'
          : globalState.selectedLanguage == 'hindi'
          ? 'खोज के परिणाम'
          : 'অনুসন্ধানের ফলাফল',
      courseAddedThisWeek:
        globalState.selectedLanguage == 'english'
          ? 'Course Added This Week'
          : globalState.selectedLanguage == 'hindi'
          ? 'इस सप्ताह के कोर्स'
          : 'এই সপ্তাহের কোর্স',

      appliedCourse:
        globalState.selectedLanguage == 'english'
          ? 'Applied Course'
          : globalState.selectedLanguage == 'hindi'
          ? 'एप्लाइड कोर्स'
          : 'আবেদন করা কোর্স',

      myCertificate:
        globalState.selectedLanguage == 'english'
          ? 'My Certificate'
          : globalState.selectedLanguage == 'hindi'
          ? 'मेरा प्रमाणपत्र'
          : 'আমার সার্টিফিকেট',
      applied:
        globalState.selectedLanguage == 'english'
          ? 'Applied'
          : globalState.selectedLanguage == 'hindi'
          ? 'एप्लाइड हो गया'
          : 'প্রয়োগ করা হয়েছে',
      apply:
        globalState.selectedLanguage == 'english'
          ? 'Apply'
          : globalState.selectedLanguage == 'hindi'
          ? 'आवेदन करे'
          : 'আবেদন করুন',
      rejected:
        globalState.selectedLanguage == 'english'
          ? 'Rejected'
          : globalState.selectedLanguage == 'hindi'
          ? 'अस्वीकृत'
          : 'খারিজ',
      inProgress:
        globalState.selectedLanguage == 'english'
          ? 'In Progress'
          : globalState.selectedLanguage == 'hindi'
          ? 'प्रगति पर है'
          : 'চলছে',
      completed:
        globalState.selectedLanguage == 'english'
          ? 'Completed'
          : globalState.selectedLanguage == 'hindi'
          ? 'समाप्त हो गया '
          : 'সম্পন্ন হয়েছে ',
      learnMore:
        globalState.selectedLanguage == 'english'
          ? 'Learn More'
          : globalState.selectedLanguage == 'hindi'
          ? 'और अधिक जानें'
          : 'আরও জানুন',
      submitTill:
        globalState.selectedLanguage == 'english'
          ? 'Submit Till'
          : globalState.selectedLanguage == 'hindi'
          ? 'कब तक जमा करें'
          : 'জমা দেওয়ার শেষ তারিখ',
      duration:
        globalState.selectedLanguage == 'english'
          ? 'Duration'
          : globalState.selectedLanguage == 'hindi'
          ? 'अवधि'
          : 'সময়কাল',
      examMode:
        globalState.selectedLanguage == 'english'
          ? 'Exam Mode'
          : globalState.selectedLanguage == 'hindi'
          ? 'परीक्षा का माध्यम'
          : 'পরীক্ষার মাধ্যম',
      courseType:
        globalState.selectedLanguage == 'english'
          ? 'Course Type'
          : globalState.selectedLanguage == 'hindi'
          ? 'कोर्स का प्रकार'
          : 'কোর্সের ধরন',
      learnMore:
        globalState.selectedLanguage == 'english'
          ? 'Learn More'
          : globalState.selectedLanguage == 'hindi'
          ? 'और अधिक जानें'
          : 'আরও জানুন',
      // translation of get certificate end

      // translation of your HRA stsrt
      searchByName:
        globalState.selectedLanguage == 'english'
          ? 'Search By Name'
          : globalState.selectedLanguage == 'hindi'
          ? 'नाम से खोजें'
          : 'নাম দ্বারা খুঁজুন',
      sortBy:
        globalState.selectedLanguage == 'english'
          ? 'Sort By'
          : globalState.selectedLanguage == 'hindi'
          ? 'क्रमबद्ध करें'
          : 'ক্রমানুসার',
      rating:
        globalState.selectedLanguage == 'english'
          ? 'Rating'
          : globalState.selectedLanguage == 'hindi'
          ? 'रेटिंग'
          : 'রেটিং',
      since:
        globalState.selectedLanguage == 'english'
          ? 'Since'
          : globalState.selectedLanguage == 'hindi'
          ? 'तब से'
          : 'থেকে',
      lowToHigh:
        globalState.selectedLanguage == 'english'
          ? 'Low To High'
          : globalState.selectedLanguage == 'hindi'
          ? 'कम से ज्यादा'
          : 'কম থেকে বেশি',
      highToLow:
        globalState.selectedLanguage == 'english'
          ? 'High To Low'
          : globalState.selectedLanguage == 'hindi'
          ? 'ज्यादा से कम '
          : 'বেশি থেকে কম',
      oldestToNewest:
        globalState.selectedLanguage == 'english'
          ? 'Oldest To Newest'
          : globalState.selectedLanguage == 'hindi'
          ? 'पुराने से नवीनतम'
          : 'পুরানো থেকে নতুন',
      newestToOldest:
        globalState.selectedLanguage == 'english'
          ? 'Newest To Oldest'
          : globalState.selectedLanguage == 'hindi'
          ? 'नवीनतम से पुराने'
          : 'নতুন থেকে পুরানো',
      showingResultesFor:
        globalState.selectedLanguage == 'english'
          ? 'Showing resultes for'
          : globalState.selectedLanguage == 'hindi'
          ? 'परिणाम है'
          : 'ফলাফল দেখানোর জন্য',
      // translation of your HRA end
      // translation of fav job Start
      handPickedJobsForYou:
        globalState.selectedLanguage == 'english'
          ? 'Hand picked jobs for you'
          : globalState.selectedLanguage == 'hindi'
          ? 'आपके लिए चुनी गई नौकरियाँ'
          : 'আপনার জন্য বাছাই করা কাজ',
      // translation of job card start
      applyBefore:
        globalState.selectedLanguage == 'english'
          ? 'Apply Before'
          : globalState.selectedLanguage == 'hindi'
          ? 'अंतिम आवेदन तिथि'
          : 'আবেদনের শেষ তারিখ',
      applyNow:
        globalState.selectedLanguage == 'english'
          ? 'Apply Now'
          : globalState.selectedLanguage == 'hindi'
          ? 'अभी अप्लाई करें'
          : 'আবেদন করুন',
      ageLimit:
        globalState.selectedLanguage == 'english'
          ? 'Age Limit'
          : globalState.selectedLanguage == 'hindi'
          ? 'आयु सीमा'
          : 'বয়স সীমা',
      experieceType:
        globalState.selectedLanguage == 'english'
          ? 'Experiece Type'
          : globalState.selectedLanguage == 'hindi'
          ? 'अनुभव का प्रकार'
          : 'অভিজ্ঞতার ধরন',
      passportType:
        globalState.selectedLanguage == 'english'
          ? 'Passport Type'
          : globalState.selectedLanguage == 'hindi'
          ? 'पासपोर्ट का प्रकार'
          : 'পাসপোর্টের ধরন',
      jobsYouHaveSavedEarlier:
        globalState.selectedLanguage == 'english'
          ? 'Jobs you have saved earlier'
          : globalState.selectedLanguage == 'hindi'
          ? 'जो नौकरियाँ आपने पहले सेव की हैं'
          : 'আপনার সংরক্ষণ করা কাজের লিস্ট',
      // translation of job card end

      // translation of job APPLIED card end
      appliedOn:
        globalState.selectedLanguage == 'english'
          ? 'Applied on'
          : globalState.selectedLanguage == 'hindi'
          ? 'आवेदन तिथि'
          : 'আবেদনের তারিখ',
      status:
        globalState.selectedLanguage == 'english'
          ? 'Status'
          : globalState.selectedLanguage == 'hindi'
          ? 'स्थिति'
          : 'স্ট্যাটাস',
      view:
        globalState.selectedLanguage == 'english'
          ? 'View'
          : globalState.selectedLanguage == 'hindi'
          ? 'देखिये'
          : 'দেখুন',
      applicationRejected:
        globalState.selectedLanguage == 'english'
          ? 'Application Rejected'
          : globalState.selectedLanguage == 'hindi'
          ? 'आवेदन अस्वीकृत'
          : 'আবেদন প্রত্যাখ্যান হয়েছে',
      applicationInProgress:
        globalState.selectedLanguage == 'english'
          ? 'Application In Progress'
          : globalState.selectedLanguage == 'hindi'
          ? 'आवेदन प्रगति पर है'
          : 'আবেদন প্রক্রিয়াধীন রয়েছে',
      medicalAndPccUploaded:
        globalState.selectedLanguage == 'english'
          ? 'Medical and PCC uploaded'
          : globalState.selectedLanguage == 'hindi'
          ? 'मेडिकल एवं पीसीसी अपलोड किया गया'
          : 'মেডিকেল এবং পিসিসি আপলোড করা হয়েছে',
      applicationSentToHr:
        globalState.selectedLanguage == 'english'
          ? 'Application sent to HR'
          : globalState.selectedLanguage == 'hindi'
          ? 'एचआर को आवेदन भेजा गया'
          : 'HR-এর কাছে আবেদন পাঠানো হয়েছে',
      visaAndTicketReleased:
        globalState.selectedLanguage == 'english'
          ? 'Visa and Ticket released'
          : globalState.selectedLanguage == 'hindi'
          ? 'वीज़ा और टिकट जारी हो गया'
          : 'ভিসা ও টিকিট প্রকাশ হয়েছে',
      placed:
        globalState.selectedLanguage == 'english'
          ? 'Placed'
          : globalState.selectedLanguage == 'hindi'
          ? 'सफलतापूर्बक चयनित'
          : 'সফলভাবে সম্পুর্ন্ন হয়েছে',
      // translation of job APPLIED card end
      // home translation start
      searchYourDreamJob:
        globalState.selectedLanguage == 'english'
          ? 'Search your dream job!'
          : globalState.selectedLanguage == 'hindi'
          ? 'अपने सपनों की नौकरी खोजें!'
          : 'আপনার স্বপ্নের কাজ খুঁজুন!',
      selectOccupation:
        globalState.selectedLanguage == 'english'
          ? 'Select Occupation'
          : globalState.selectedLanguage == 'hindi'
          ? 'विभाग चुनें'
          : 'পেশা নির্বাচন করুন',
      selectCountry:
        globalState.selectedLanguage == 'english'
          ? 'Select Country'
          : globalState.selectedLanguage == 'hindi'
          ? 'देश का चयन करें'
          : 'দেশ নির্বাচন করুন',
      countriesWhereYouCanApply:
        globalState.selectedLanguage == 'english'
          ? 'Countries where you can apply'
          : globalState.selectedLanguage == 'hindi'
          ? 'वे देश जहां आप आवेदन कर सकते हैं'
          : 'যেসব দেশে আপনি আবেদন করতে পারবেন',
      JobOccupationsThatWeOffer:
        globalState.selectedLanguage == 'english'
          ? 'Job occupations that we offer'
          : globalState.selectedLanguage == 'hindi'
          ? 'नौकरी व्यवसाय जो हम प्रदान करते हैं'
          : 'আমাদের অফার করা পেশা',
      OppsNoResultFoundForThisCombination:
        globalState.selectedLanguage == 'english'
          ? 'Opps! No result found for this combination'
          : globalState.selectedLanguage == 'hindi'
          ? 'इस संयोजन के लिए कोई परिणाम नहीं मिला'
          : 'এই সংমিশ্রণের জন্য কোন ফলাফল পাওয়া যায়নি',
      discoverFreshFeedDelightsNow:
        globalState.selectedLanguage == 'english'
          ? 'Discover Fresh Feed Delights Now!'
          : globalState.selectedLanguage == 'hindi'
          ? 'अभी ताजा फ़ीड देखिये'
          : 'এখন সর্বশেষ ফিড দেখুন',
      readDetails:
        globalState.selectedLanguage == 'english'
          ? 'Read Details'
          : globalState.selectedLanguage == 'hindi'
          ? 'विवरण पढ़ें'
          : 'বিস্তারিত পড়ুন',
      hideDetails:
        globalState.selectedLanguage == 'english'
          ? 'Hide Details'
          : globalState.selectedLanguage == 'hindi'
          ? 'विवरण छुपाओ'
          : 'আড়াল বিস্তারিত',
      // home translation end

      // edit profile translation start
      whatsappNumber:
        globalState.selectedLanguage == 'english'
          ? 'Whatsapp Number'
          : globalState.selectedLanguage == 'hindi'
          ? 'वॉट्स्ऐप नंबर'
          : 'হোয়াটস্যাপ নম্বর',

      languageKnown:
        globalState.selectedLanguage == 'english'
          ? 'Language Known'
          : globalState.selectedLanguage == 'hindi'
          ? 'भाषा चुनिए'
          : 'ভাষা জ্ঞান',

      maritalStatus:
        globalState.selectedLanguage == 'english'
          ? 'Marital Status'
          : globalState.selectedLanguage == 'hindi'
          ? 'वैवाहिक स्थितिें'
          : 'বৈবাহিক অবস্থা',

      doYouHavePassport:
        globalState.selectedLanguage == 'english'
          ? 'Do You Have Passport ?'
          : globalState.selectedLanguage == 'hindi'
          ? 'क्या तुम्हारे पास पासपोर्ट है ?'
          : 'আপনার কি পাসপোর্ট আছে?',

      presentWorkingDepertment:
        globalState.selectedLanguage == 'english'
          ? 'Present Working Department'
          : globalState.selectedLanguage == 'hindi'
          ? 'वर्तमान कार्य विभाग'
          : 'বর্তমান কাজের বিভাগ',

      presentOccupation:
        globalState.selectedLanguage == 'english'
          ? 'Present Occupation'
          : globalState.selectedLanguage == 'hindi'
          ? 'वर्तमान कौशल'
          : 'বর্তমান পেশা',

      pastInternationalMigrationExperience:
        globalState.selectedLanguage == 'english'
          ? 'Past International Migration Experience'
          : globalState.selectedLanguage == 'hindi'
          ? 'पिछला अंतर्राष्ट्रीय प्रवासन अनुभव'
          : 'বিদেশ যাওয়ার অভিজ্ঞতা',

      highestEducationQualification:
        globalState.selectedLanguage == 'english'
          ? 'Highest Education Qualification'
          : globalState.selectedLanguage == 'hindi'
          ? 'उच्चतम शिक्षा योग्यता'
          : 'সর্বোচ্চ শিক্ষাগত যোগ্যতা',

      technicalVocationalEducation:
        globalState.selectedLanguage == 'english'
          ? 'Technical / Vocational Education'
          : globalState.selectedLanguage == 'hindi'
          ? 'तकनीकी/व्यावसायिक शिक्षा'
          : 'কারিগরি এবং বৃত্তিমূলক শিক্ষা',

      email:
        globalState.selectedLanguage == 'english'
          ? 'Email'
          : globalState.selectedLanguage == 'hindi'
          ? 'ईमेल'
          : 'ইমেইল',

      aadhaNumber:
        globalState.selectedLanguage == 'english'
          ? 'Aadhar Number'
          : globalState.selectedLanguage == 'hindi'
          ? 'आधार नंबर'
          : 'আধার নম্বর ',

      presentMonthlyIncome:
        globalState.selectedLanguage == 'english'
          ? 'Present Monthly Income'
          : globalState.selectedLanguage == 'hindi'
          ? 'वर्तमान मासिक आय'
          : 'আপনার মাসিক উপার্জন',

      expectedMonthlyIncome:
        globalState.selectedLanguage == 'english'
          ? 'Expected Monthly Income'
          : globalState.selectedLanguage == 'hindi'
          ? 'अपेक्षित मासिक आय'
          : 'প্রত্যাশিত মাসিক উপার্জন ',

      referencePersoneName:
        globalState.selectedLanguage == 'english'
          ? 'Reference Person Name'
          : globalState.selectedLanguage == 'hindi'
          ? 'संदर्भ व्यक्ति का नाम'
          : 'রেফারেন্স ব্যক্তির নাম',

      referencePersoneContact:
        globalState.selectedLanguage == 'english'
          ? 'Reference Persone Contact'
          : globalState.selectedLanguage == 'hindi'
          ? 'संदर्भ व्यक्ति संपर्क'
          : 'রেফারেন্স ব্যক্তির নম্বর ',

      specialisation:
        globalState.selectedLanguage == 'english'
          ? 'Specialisation'
          : globalState.selectedLanguage == 'hindi'
          ? 'विशेषज्ञता'
          : 'বিশেষীকরণ',

      yearOfHighestEducationQualification:
        globalState.selectedLanguage == 'english'
          ? 'Year Of Highest Education Qualification'
          : globalState.selectedLanguage == 'hindi'
          ? 'उच्चतम शिक्षा योग्यता का वर्ष'
          : 'সর্বোচ শিক্ষাগত যোগ্যতা পাশের বছর ',

      areYouInterestedInInternationalMigration:
        globalState.selectedLanguage == 'english'
          ? 'Are You Interested In International Migration?'
          : globalState.selectedLanguage == 'hindi'
          ? 'क्या आप अंतर्राष्ट्रीय प्रवासन में रुचि रखते हैं?'
          : 'আপনি কি বিদেশে যাওয়ার জন্য আগ্রহী ',

      countryPreference:
        globalState.selectedLanguage == 'english'
          ? 'Country Preference'
          : globalState.selectedLanguage == 'hindi'
          ? 'देश की प्राथमिकता'
          : 'কোন কোন দেশে যেতে ইচ্ছুক ',
      editProfilePic:
        globalState.selectedLanguage == 'english'
          ? 'Edit Profile Pic'
          : globalState.selectedLanguage == 'hindi'
          ? 'प्रोफ़ाइल चित्र संपादित करें'
          : 'প্রোফাইল ছবি পরিবর্তন করুন',
      save:
        globalState.selectedLanguage == 'english'
          ? 'Save'
          : globalState.selectedLanguage == 'hindi'
          ? 'सेव'
          : 'সেভ',
      married:
        globalState.selectedLanguage == 'english'
          ? 'Married'
          : globalState.selectedLanguage == 'hindi'
          ? 'विवाहित'
          : 'বিবাহিত',
      single:
        globalState.selectedLanguage == 'english'
          ? 'Unmarried'
          : globalState.selectedLanguage == 'hindi'
          ? 'अविवाहित'
          : 'অবিবাহিত',
      experience:
        globalState.selectedLanguage == 'english'
          ? 'Experience'
          : globalState.selectedLanguage == 'hindi'
          ? 'अनुभव'
          : 'অভিজ্ঞতা',
      profileStrength:
        globalState.selectedLanguage == 'english'
          ? 'profile Strength'
          : globalState.selectedLanguage == 'hindi'
          ? 'प्रोफाइल शक्ति'
          : 'প্রোফাইল ক্ষমতা',
      edit:
        globalState.selectedLanguage == 'english'
          ? 'Edit'
          : globalState.selectedLanguage == 'hindi'
          ? 'संपादन'
          : 'পরিবর্তন করুন',
      listofcourseyouhaveappliedearlier:
        globalState.selectedLanguage == 'english'
          ? 'List of course you have applied earlier.'
          : globalState.selectedLanguage == 'hindi'
          ? 'आपके द्वारा पहले आवेदन किए गए पाठ्यक्रम की सूची।'
          : 'আপনার আগের আবেদন করা কোর্সের লিস্ট.',

      // edit profile translation end
      // experience  translation start
      addMoreExperience:
        globalState.selectedLanguage == 'english'
          ? 'Add More Experience'
          : globalState.selectedLanguage == 'hindi'
          ? 'और अनुभव जोड़े'
          : 'আরও অভিজ্ঞতা যোগ করুন',
      experinceCount:
        globalState.selectedLanguage == 'english'
          ? 'Experince Count'
          : globalState.selectedLanguage == 'hindi'
          ? 'अनुभव की संख्या'
          : 'অভিজ্ঞতার সংখ্যা',
      department:
        globalState.selectedLanguage == 'english'
          ? 'Department'
          : globalState.selectedLanguage == 'hindi'
          ? 'विभाग'
          : 'বিভাগ',
      occupation:
        globalState.selectedLanguage == 'english'
          ? 'Occupation'
          : globalState.selectedLanguage == 'hindi'
          ? 'व्यवसाय'
          : 'ব্যবসা',
      experienceType:
        globalState.selectedLanguage == 'english'
          ? 'Experience Type'
          : globalState.selectedLanguage == 'hindi'
          ? 'अनुभव का प्रकार'
          : 'অভিজ্ঞতার ধরন',
      location:
        globalState.selectedLanguage == 'english'
          ? 'Location'
          : globalState.selectedLanguage == 'hindi'
          ? 'स्थान'
          : 'অবস্থান',
      uploadCertificate:
        globalState.selectedLanguage == 'english'
          ? 'Upload Certificate'
          : globalState.selectedLanguage == 'hindi'
          ? 'प्रमाणपत्र अपलोड करें'
          : 'সার্টিফিকেট আপলোড করুন',
      companyName:
        globalState.selectedLanguage == 'english'
          ? 'Company Name'
          : globalState.selectedLanguage == 'hindi'
          ? 'कंपनी का नाम'
          : 'সংস্থার নাম',
      joiningDate:
        globalState.selectedLanguage == 'english'
          ? 'Joining Date'
          : globalState.selectedLanguage == 'hindi'
          ? 'जोइनिंग डेट'
          : 'যোগদান তারিখ',
      endingDate:
        globalState.selectedLanguage == 'english'
          ? 'Ending Date'
          : globalState.selectedLanguage == 'hindi'
          ? 'एंडिंग डेट'
          : 'শেষ তারিখ',
      selectSkill:
        globalState.selectedLanguage == 'english'
          ? 'Select Skill'
          : globalState.selectedLanguage == 'hindi'
          ? 'कौशल चुनें'
          : 'দক্ষতা নির্বাচন করুন',
      // experience  translation end
      // logout popup  translation start
      areYouSureYouWantToLogout:
        globalState.selectedLanguage == 'english'
          ? 'Are you sure you want to logout'
          : globalState.selectedLanguage == 'hindi'
          ? 'क्या आप लॉग आउट करना चाहते हैं'
          : 'আপনি লগ আউট করতে চান',
      // logout popup  translation end

      // video translation start
      introductoryVideo:
        globalState.selectedLanguage == 'english'
          ? 'Introductory Video'
          : globalState.selectedLanguage == 'hindi'
          ? 'परिचयात्मक वीडियो'
          : 'পরিচিতিমূলক ভিডিও',
      uploadIntroVideo:
        globalState.selectedLanguage == 'english'
          ? 'Upload Intro Video'
          : globalState.selectedLanguage == 'hindi'
          ? 'परिचय वीडियो अपलोड करें'
          : 'ইন্ট্রো ভিডিও আপলোড করুন',
      workVideo:
        globalState.selectedLanguage == 'english'
          ? 'Work Videos'
          : globalState.selectedLanguage == 'hindi'
          ? 'कार्य वीडियो'
          : 'কাজের ভিডিও',
      chooseVideoFile:
        globalState.selectedLanguage == 'english'
          ? 'Choose Video File'
          : globalState.selectedLanguage == 'hindi'
          ? 'वीडियो फ़ाइल चुनें'
          : 'ভিডিও ফাইল নির্বাচন করুন',
      // checked by sahid
      uploadWorkVideo:
        globalState.selectedLanguage == 'english'
          ? 'Upload Work Video'
          : globalState.selectedLanguage == 'hindi'
          ? 'कार्य वीडियो अपलोड करें'
          : 'কাজের ভিডিও আপলোড করুন',
      myWorkVideo:
        globalState.selectedLanguage == 'english'
          ? 'My Work Video'
          : globalState.selectedLanguage == 'hindi'
          ? 'मेरा कार्य वीडियो'
          : 'আমার কাজের ভিডিও',
      share:
        globalState.selectedLanguage == 'english'
          ? 'Share'
          : globalState.selectedLanguage == 'hindi'
          ? 'शेयर'
          : 'শেয়ার',
      areYouSureWantToDeleteThisVideo:
        globalState.selectedLanguage == 'english'
          ? 'Are you sure want to delete this video?'
          : globalState.selectedLanguage == 'hindi'
          ? 'क्या आप वाकई इस वीडियो को हटाना चाहते हैं?'
          : 'আপনি কি এই ভিডিওটি মুছতে চান?',
      delete:
        globalState.selectedLanguage == 'english'
          ? 'Delete'
          : globalState.selectedLanguage == 'hindi'
          ? 'डिलीट'
          : 'ডিলিট',
      // video translation end

      // job Id translation start

      applyBefore:
        globalState.selectedLanguage == 'english'
          ? 'Apply Before'
          : globalState.selectedLanguage == 'hindi'
          ? 'पहले आवेदन करें'
          : 'আগে আবেদন করুন',
      // job Id translation end

      // institute translation start
      address:
        globalState.selectedLanguage == 'english'
          ? 'Address'
          : globalState.selectedLanguage == 'hindi'
          ? 'पता'
          : 'ঠিকানা',
      visitWebsite:
        globalState.selectedLanguage == 'english'
          ? 'Visit Website'
          : globalState.selectedLanguage == 'hindi'
          ? 'बेवसाइट देखें'
          : 'ওয়েবসাইট',
      affliatedBy:
        globalState.selectedLanguage == 'english'
          ? 'Affliated By'
          : globalState.selectedLanguage == 'hindi'
          ? 'संबंधन'
          : 'অধিভুক্তি',
      registrationNumber:
        globalState.selectedLanguage == 'english'
          ? 'Registration Number'
          : globalState.selectedLanguage == 'hindi'
          ? 'पंजीकरण संख्या'
          : 'রেজিস্ট্রেশন নম্বর',
      courseProvidedByInstitute:
        globalState.selectedLanguage == 'english'
          ? 'Course Provided By Institute'
          : globalState.selectedLanguage == 'hindi'
          ? 'संस्थान द्वारा प्रदान किया जाने वाला पाठ्यक्रम'
          : 'ইনস্টিটিউট দ্বারা প্রদত্ত কোর্স',
      // institute translation end

      // hra translation start
      follow:
        globalState.selectedLanguage == 'english'
          ? 'Follow'
          : globalState.selectedLanguage == 'hindi'
          ? 'फॉलो'
          : 'ফলো',
      unfollow:
        globalState.selectedLanguage == 'english'
          ? 'Unfollow'
          : globalState.selectedLanguage == 'hindi'
          ? 'अनफॉलो'
          : 'আনফলো',
      followers:
        globalState.selectedLanguage == 'english'
          ? 'Followers'
          : globalState.selectedLanguage == 'hindi'
          ? 'फोल्लोवेर्स'
          : 'ফলোয়ার্স',
      countryPresence:
        globalState.selectedLanguage == 'english'
          ? 'Country Presence'
          : globalState.selectedLanguage == 'hindi'
          ? 'देश की उपस्थिति'
          : 'দেশের উপস্থিতি',
      industriesServed:
        globalState.selectedLanguage == 'english'
          ? 'Industries Served'
          : globalState.selectedLanguage == 'hindi'
          ? 'उद्योगों की सेवा की'
          : 'শিল্প পরিবেশিত',
      numberOfAverageCandidatesPlacedYearly:
        globalState.selectedLanguage == 'english'
          ? 'Number of average candidates placed yearly'
          : globalState.selectedLanguage == 'hindi'
          ? 'वार्षिक रूप से चयनित औसत उम्मीदवारों की संख्या'
          : 'বার্ষিক স্থাপন করা গড় প্রার্থীদের সংখ্যা',
      listOfClientsOfTheHra:
        globalState.selectedLanguage == 'english'
          ? 'List of clients of the HRA'
          : globalState.selectedLanguage == 'hindi'
          ? 'एचआरए के ग्राहकों की सूची'
          : 'HRA এর গ্রাহকদের তালিকা',
      jobsPostedByHra:
        globalState.selectedLanguage == 'english'
          ? 'Jobs posted by HRA : '
          : globalState.selectedLanguage == 'hindi'
          ? 'एचआरए द्वारा पोस्ट की गई नौकरियाँ : '
          : 'HRA দ্বারা পোস্ট করা চাকরি : ',
      // hra translation end

      //course by id translation start
      
      institute:
        globalState.selectedLanguage == 'english'
          ? 'Institute'
          : globalState.selectedLanguage == 'hindi'
          ? 'संस्थान'
          : 'ইনস্টিটিউট',
      totalSeats:
        globalState.selectedLanguage == 'english'
          ? 'Total Seats'
          : globalState.selectedLanguage == 'hindi'
          ? 'कुल सीटें'
          : 'মোট আসন',
      eligibility:
        globalState.selectedLanguage == 'english'
          ? 'Eligibility'
          : globalState.selectedLanguage == 'hindi'
          ? 'पात्रता'
          : 'যোগ্যতা',
      courseFee:
        globalState.selectedLanguage == 'english'
          ? 'Course Fee'
          : globalState.selectedLanguage == 'hindi'
          ? 'पाठ्यक्रम शुल्क'
          : 'প্রশিক্ষণের খরচ',
      //course by id translation end

      // tab name start
      home:
        globalState.selectedLanguage == 'english'
          ? 'Home'
          : globalState.selectedLanguage == 'hindi'
          ? 'होम'
          : 'হোম',
          myProfile:
        globalState.selectedLanguage == 'english'
          ? 'My Profile'
          : globalState.selectedLanguage == 'hindi'
          ? 'मेरी प्रोफाइल'
          : 'আমার প্রোফাইল',
          myVideos:
        globalState.selectedLanguage == 'english'
          ? 'My Videos'
          : globalState.selectedLanguage == 'hindi'
          ? 'मेरे वीडियो'
          : 'আমার ভিডিও',
          improveYourProfile:
        globalState.selectedLanguage == 'english'
          ? 'Improve Your Profile'
          : globalState.selectedLanguage == 'hindi'
          ? 'अपने प्रोफाइल को बेहतर बनाएं'
          : 'আপনার প্রোফাইল উন্নত করুন',
          newsFeed:
        globalState.selectedLanguage == 'english'
          ? 'News Feed'
          : globalState.selectedLanguage == 'hindi'
          ? 'समाचार पढ़े'
          : 'খবর পড়ুন',
          favouriteJob:
        globalState.selectedLanguage == 'english'
          ? 'Favourite Job'
          : globalState.selectedLanguage == 'hindi'
          ? 'पसंदीदा नौकरियां'
          : 'প্রিয় কাজ',
          savedJobs:
        globalState.selectedLanguage == 'english'
          ? 'Saved Jobs'
          : globalState.selectedLanguage == 'hindi'
          ? 'सेव नौकरियां'
          : 'সংরক্ষিত কাজ',
          appliedJobs:
        globalState.selectedLanguage == 'english'
          ? 'Applied Jobs'
          : globalState.selectedLanguage == 'hindi'
          ? 'एप्लाइड नौकरियाँ'
          : 'প্রয়োগ করা চাকরি',
          yourHra:
        globalState.selectedLanguage == 'english'
          ? 'Your HRA'
          : globalState.selectedLanguage == 'hindi'
          ? 'आपका  एचआरए'
          : 'তোমার HRA',
          JobsByDepartment:
        globalState.selectedLanguage == 'english'
          ? 'Jobs By Department'
          : globalState.selectedLanguage == 'hindi'
          ? 'विभाग द्वारा नौकरियाँ'
          : 'বিভাগ দ্বারা চাকরি',
          jobsByCountry:
        globalState.selectedLanguage == 'english'
          ? 'Jobs By Country'
          : globalState.selectedLanguage == 'hindi'
          ? 'देश के अनुसार नौकरियाँ'
          : 'দেশ অনুযায়ী চাকরি',
          myExperience:
        globalState.selectedLanguage == 'english'
          ? 'My Experience'
          : globalState.selectedLanguage == 'hindi'
          ? 'मेरा अनुभव'
          : 'আমার অভিজ্ঞতা',
          jobDetails:
        globalState.selectedLanguage == 'english'
          ? 'Job Details'
          : globalState.selectedLanguage == 'hindi'
          ? 'नौकरी विवरण'
          : 'চাকরির বিস্তারিত',
          courseDetails:
        globalState.selectedLanguage == 'english'
          ? 'Course Details'
          : globalState.selectedLanguage == 'hindi'
          ? 'पाठ्यक्रम विवरण'
          : 'কোর্স বিবরণ',
          trainingInstitute:
        globalState.selectedLanguage == 'english'
          ? 'Training Institute'
          : globalState.selectedLanguage == 'hindi'
          ? 'प्रशिक्षण संस्थान'
          : 'প্রশিক্ষণ প্রতিষ্ঠান',
          editProfile :
        globalState.selectedLanguage == 'english'
          ? 'Edit Profile '
          : globalState.selectedLanguage == 'hindi'
          ? 'प्रोफ़ाइल संपादित करें'
          : 'প্রোফাইল পরিবর্তন',
      // tab name end

      // job By Id start
      applyNow:
        globalState.selectedLanguage == 'english'
          ? 'Apply Now'
          : globalState.selectedLanguage == 'hindi'
          ? 'अभी अप्लाई करें'
          : 'এখন আবেদন করুন',
          jobPostedBy:
        globalState.selectedLanguage == 'english'
          ? 'Job Posted By :'
          : globalState.selectedLanguage == 'hindi'
          ? 'नौकरी किसके द्वारा पोस्ट किया गया'
          : 'চাকরি পোস্ট করেছেন',
          numberOfVacancy:
        globalState.selectedLanguage == 'english'
          ? 'Number of Vacancy'
          : globalState.selectedLanguage == 'hindi'
          ? 'रिक्ति की संख्या'
          : 'শূন্যপদের সংখ্যা',
          jobPostedBy:
        globalState.selectedLanguage == 'english'
          ? 'Job Posted By :'
          : globalState.selectedLanguage == 'hindi'
          ? 'नौकरी किसके द्वारा पोस्ट किया गया'
          : 'চাকরি পোস্ট করেছেন',
          contractPeriod:
        globalState.selectedLanguage == 'english'
          ? 'Contract Period'
          : globalState.selectedLanguage == 'hindi'
          ? 'संविदा अवधि'
          : 'চুক্তির মেয়াদ',
          experienceRequired:
        globalState.selectedLanguage == 'english'
          ? 'Experience Required'
          : globalState.selectedLanguage == 'hindi'
          ? 'अनुभव जरूरी'
          : 'অভিজ্ঞতা প্রয়োজন',
          moreDetails:
        globalState.selectedLanguage == 'english'
          ? 'More Details'
          : globalState.selectedLanguage == 'hindi'
          ? 'अधिक जानकारी'
          : 'আরো বিস্তারিত',
          serviceCharge:
        globalState.selectedLanguage == 'english'
          ? 'Service Charge'
          : globalState.selectedLanguage == 'hindi'
          ? 'सेवा शुल्क'
          : 'সার্ভিস খরচ',
          salaryNegotiable:
        globalState.selectedLanguage == 'english'
          ? 'Salary Negotiable'
          : globalState.selectedLanguage == 'hindi'
          ? 'वेतन पर भाव - ताव'
          : 'আলোচনা সাপেক্ষে বেতন',
          hiringCompany:
        globalState.selectedLanguage == 'english'
          ? 'Hiring Company : '
          : globalState.selectedLanguage == 'hindi'
          ? 'नौकरी देने वाली कंपनी : '
          : 'নিয়োগকারী সংস্থা : ',
          interviewMode:
          globalState.selectedLanguage == 'english'
            ? 'Interview Mode : '
            : globalState.selectedLanguage == 'hindi'
            ? 'साक्षात्कार मोड : '
            : 'ইন্টারভিউ মোড : ',
            workingDays:
          globalState.selectedLanguage == 'english'
            ? 'Working Days : '
            : globalState.selectedLanguage == 'hindi'
            ? 'कार्य दिवस : '
            : 'কর্মদিবস : ',
            workingHours:
          globalState.selectedLanguage == 'english'
            ? 'Working Hours : '
            : globalState.selectedLanguage == 'hindi'
            ? 'कार्य के घण्टे  : '
            : 'কর্মঘন্টা : ',
            overtime:
          globalState.selectedLanguage == 'english'
            ? 'Overtime : '
            : globalState.selectedLanguage == 'hindi'
            ? 'ओवरटाइम : '
            : 'ওভারটাইম : ',
            facilities:
          globalState.selectedLanguage == 'english'
            ? 'Facilities : '
            : globalState.selectedLanguage == 'hindi'
            ? 'सुविधाएँ : '
            : 'সু্যোগ - সুবিধা : ',
            requiredDocuments:
          globalState.selectedLanguage == 'english'
            ? 'Required Documents : '
            : globalState.selectedLanguage == 'hindi'
            ? 'आवश्यक दस्तावेज : '
            : 'প্রয়োজনীয় কাগজপত্র : ',
            interviewDate:
          globalState.selectedLanguage == 'english'
            ? 'Interview Date'
            : globalState.selectedLanguage == 'hindi'
            ? 'साक्षात्कार तिथि'
            : 'সাক্ষাৎকারের তারিখ ',
      // job By Id end

      // job applied By Id start
      selectPCC:
      globalState.selectedLanguage == 'english'
        ? 'Select PCC'
        : globalState.selectedLanguage == 'hindi'
        ? 'पीसीसी का चयन करें'
        : 'PCC নির্বাচন করুন',
      // job applied By Id end

      // Step 1 translation start
      skip:
      globalState.selectedLanguage == 'english'
        ? 'Skip'
        : globalState.selectedLanguage == 'hindi'
        ? 'स्किप'
        : 'এড়িয়ে যান ',
        anyOtherContact:
      globalState.selectedLanguage == 'english'
        ? 'Any other contact'
        : globalState.selectedLanguage == 'hindi'
        ? 'कोई अन्य संपर्क'
        : 'অন্য যোগাযোগ নম্বর ',
        addProfilePic:
      globalState.selectedLanguage == 'english'
        ? 'Add Profile Pic'
        : globalState.selectedLanguage == 'hindi'
        ? 'प्रोफ़ाइल चित्र जोड़ें'
        : 'প্রোফাইল ছবি যোগ করুন',
        pleaseEnterYourDetails:
      globalState.selectedLanguage == 'english'
        ? 'Please Enter Your Details : '
        : globalState.selectedLanguage == 'hindi'
        ? 'कृपया अपना विवरण दर्ज करें : '
        : 'অনুগ্রহ করে আপনার বিস্তারিত লিখুন : ',
        dateOfBirth:
        globalState.selectedLanguage == 'english'
          ? 'Date of Birth'
          : globalState.selectedLanguage == 'hindi'
          ? 'जन्म की तारीख'
          : 'জন্ম তারিখ',
          gender:
        globalState.selectedLanguage == 'english'
          ? 'Gender'
          : globalState.selectedLanguage == 'hindi'
          ? 'लिंग'
          : 'লিঙ্গ',
          male:
        globalState.selectedLanguage == 'english'
          ? 'Male'
          : globalState.selectedLanguage == 'hindi'
          ? 'पुरुष'
          : 'পুরুষ',
          female:
        globalState.selectedLanguage == 'english'
          ? 'Female'
          : globalState.selectedLanguage == 'hindi'
          ? 'महिला'
          : 'মহিলা',
          others:
        globalState.selectedLanguage == 'english'
          ? 'Others'
          : globalState.selectedLanguage == 'hindi'
          ? 'अन्य'
          : 'অন্যান্য',
          parmanentAddress:
        globalState.selectedLanguage == 'english'
          ? 'Parmanent Address*'
          : globalState.selectedLanguage == 'hindi'
          ? 'स्थायी पता'
          : 'স্থায়ী ঠিকানা',
          state:
        globalState.selectedLanguage == 'english'
          ? 'State'
          : globalState.selectedLanguage == 'hindi'
          ? 'राज्य'
          : 'রাজ্য',
          district:
        globalState.selectedLanguage == 'english'
          ? 'District'
          : globalState.selectedLanguage == 'hindi'
          ? 'ज़िला'
          : 'জেলা',
          pinCode:
        globalState.selectedLanguage == 'english'
          ? 'Pin Code*'
          : globalState.selectedLanguage == 'hindi'
          ? 'पिन कोड'
          : 'পিনকোড',
          workingDepertment:
        globalState.selectedLanguage == 'english'
          ? 'Working Department'
          : globalState.selectedLanguage == 'hindi'
          ? 'कार्य विभाग'
          : 'কাজের বিভাগ',
          insideIndia:
          globalState.selectedLanguage == 'english'
            ? 'Inside India'
            : globalState.selectedLanguage == 'hindi'
            ? 'भारत के अंदर'
            : 'ভারতের ভিতরে',
            outsideIndia:
            globalState.selectedLanguage == 'english'
              ? 'Outside India'
              : globalState.selectedLanguage == 'hindi'
              ? 'भारत के बाहर'
              : 'ভারতের বাইরে',
      // Step 1 translation end 
      applicationSentToHRA:
      globalState.selectedLanguage == 'english'
        ? 'Application Sent to HRA'
        : globalState.selectedLanguage == 'hindi'
        ? 'आवेदन एचआरए को भेजा गया'
        : 'HRA-তে আবেদন পাঠানো হয়েছে',
        interviewScheduled:
      globalState.selectedLanguage == 'english'
        ? 'Interview Scheduled'
        : globalState.selectedLanguage == 'hindi'
        ? 'साक्षात्कार निर्धारित'
        : 'সাক্ষাৎকার নির্ধারিত',
        rejectedInInterview:
        globalState.selectedLanguage == 'english'
          ? 'Rejected in interview'
          : globalState.selectedLanguage == 'hindi'
          ? 'इंटरव्यू में रिजेक्ट कर दिया गया'
          : 'সাক্ষাৎকারে প্রত্যাখ্যাত',
          viewOfferLetter:
        globalState.selectedLanguage == 'english'
          ? 'View Offer Letter'
          : globalState.selectedLanguage == 'hindi'
          ? 'प्रस्ताव पत्र देखें'
          : 'অফার লেটার দেখুন',
          signedOfferLetter:
        globalState.selectedLanguage == 'english'
          ? 'Signed Offer Letter'
          : globalState.selectedLanguage == 'hindi'
          ? 'हस्ताक्षरित प्रस्ताव पत्र'
          : 'স্বাক্ষরিত অফার লেটার',
          medicalAndPCC:
        globalState.selectedLanguage == 'english'
          ? 'Medical And PCC'
          : globalState.selectedLanguage == 'hindi'
          ? 'चिकित्सा एवं पीसीसी'
          : 'মেডিকেল এবং পিসিসি',
          visaApplicationRejected:
        globalState.selectedLanguage == 'english'
          ? 'Visa Application Rejected'
          : globalState.selectedLanguage == 'hindi'
          ? 'वीज़ा आवेदन अस्वीकृत'
          : 'ভিসার আবেদন প্রত্যাখ্যান',
          visaReleased:
        globalState.selectedLanguage == 'english'
          ? 'Visa Released'
          : globalState.selectedLanguage == 'hindi'
          ? 'वीज़ा जारी हुआ'
          : 'ভিসা রিলিজ',
          ticketReleased:
        globalState.selectedLanguage == 'english'
          ? 'Ticket Released'
          : globalState.selectedLanguage == 'hindi'
          ? 'टिकट जारी हुआ'
          : 'টিকিট প্রকাশ',
          applyForCautionMoney:
        globalState.selectedLanguage == 'english'
          ? 'Apply for caution money'
          : globalState.selectedLanguage == 'hindi'
          ? 'कॉशन मनी के लिए आवेदन करें'
          : 'জামানতের টাকার জন্য আবেদন',
          cautionMoneyRepay:
        globalState.selectedLanguage == 'english'
          ? 'Caution Money Refunded'
          : globalState.selectedLanguage == 'hindi'
          ? 'कॉशन मनी वापस किया गया'
          : 'জামানতের টাকা ফেরত',
          congoMess:
        globalState.selectedLanguage == 'english'
          ? 'Congratulations!  You can fly to achieve your dream.'
          : globalState.selectedLanguage == 'hindi'
          ? 'बधाई हो! आप अपने सपने को हासिल करने के लिए उड़ान भर सकते हैं।'
          : 'অভিনন্দন! আপনি আপনার স্বপ্ন পূরণ করতে উড়তে পারেন.',
          interviewLocation:
        globalState.selectedLanguage == 'english'
          ? 'Interview Location'
          : globalState.selectedLanguage == 'hindi'
          ? 'साक्षात्कार स्थान'
          : 'সাক্ষাৎকারের অবস্থান',
          joinNow:
        globalState.selectedLanguage == 'english'
          ? 'Join Now'
          : globalState.selectedLanguage == 'hindi'
          ? 'ज्वाइन करे'
          : 'এখনি যোগদিন',
          meetingLinkWillBeUpdatedSoon:
        globalState.selectedLanguage == 'english'
          ? 'Meeting Link will be updated soon.'
          : globalState.selectedLanguage == 'hindi'
          ? 'मीटिंग लिंक जल्द ही अपडेट किया जाएगा'
          : 'মিটিং লিঙ্ক শীঘ্রই আপডেট করা হবে',
          offerLetter:
        globalState.selectedLanguage == 'english'
          ? 'Offer Letter'
          : globalState.selectedLanguage == 'hindi'
          ? 'प्रस्ताव पत्र'
          : 'প্রস্তাবপত্র',
          uploadSignedOfferLetter:
        globalState.selectedLanguage == 'english'
          ? 'Upload Signed Offer Letter'
          : globalState.selectedLanguage == 'hindi'
          ? 'हस्ताक्षरित प्रस्ताव पत्र अपलोड करें'
          : 'স্বাক্ষরিত অফার লেটার আপলোড করুন',
          cautionAmount:
          globalState.selectedLanguage == 'english'
            ? 'Caution Amount'
            : globalState.selectedLanguage == 'hindi'
            ? 'कॉशन राशि'
            : 'জামানতের পরিমাণ',
            selectpaymentScreensort:
          globalState.selectedLanguage == 'english'
            ? 'Select Payment Screensort'
            : globalState.selectedLanguage == 'hindi'
            ? 'भुगतान स्क्रीनशॉट चुनें'
            : 'পেমেন্ট স্ক্রিনশট নির্বাচন করুন',
            selectSignedOfferLetter:
          globalState.selectedLanguage == 'english'
            ? 'Select Signed Offer Letter'
            : globalState.selectedLanguage == 'hindi'
            ? 'हस्ताक्षरित प्रस्ताव पत्र का चयन करें'
            : 'স্বাক্ষরিত অফার লেটার নির্বাচন করুন',
            paymentStatus:
            globalState.selectedLanguage == 'english'
              ? 'Payment Status'
              : globalState.selectedLanguage == 'hindi'
              ? 'भुगतान की स्थिति'
              : 'লেনদেনের অবস্থা',
              waitingForAdminApproval:
              globalState.selectedLanguage == 'english'
                ? 'Waiting for Admin Approval'
                : globalState.selectedLanguage == 'hindi'
                ? 'एडमिन की मंजूरी का इंतजार है'
                : 'অ্যাডমিন অনুমোদনের জন্য অপেক্ষা করছি',
                paymentMarkedAsRejected:
              globalState.selectedLanguage == 'english'
                ? 'Payment marked as Rejected'
                : globalState.selectedLanguage == 'hindi'
                ? 'भुगतान अस्वीकृत के रूप में चिह्नित किया गया'
                : 'পেমেন্ট প্রত্যাখ্যাত হিসাবে চিহ্নিত',
                paymentMarkedAsSuccessfull:
              globalState.selectedLanguage == 'english'
                ? 'Payment marked as Successful !'
                : globalState.selectedLanguage == 'hindi'
                ? 'भुगतान सफल के रूप में चिह्नित!'
                : 'পেমেন্ট সফল হিসাবে চিহ্নিত!',
                interviewTime:
              globalState.selectedLanguage == 'english'
                ? 'Interview Time'
                : globalState.selectedLanguage == 'hindi'
                ? 'साक्षात्कार का समय'
                : 'সাক্ষাৎকারের সময়',
                doYouHavePastExperience:
              globalState.selectedLanguage == 'english'
                ? 'Do You Have Past Experience ? '
                : globalState.selectedLanguage == 'hindi'
                ? 'क्या आपके पास पिछला अनुभव है ?'
                : 'আপনার কি অতীত অভিজ্ঞতা আছে ?',
                noteMessage:
              globalState.selectedLanguage == 'english'
                ? "You will get a full refund of your caution money once you migrate successfully or if you fail in visa/ medical test"
                : globalState.selectedLanguage == 'hindi'
                ? 'सफलतापूर्वक प्रवास करने पर या वीज़ा/मेडिकल परीक्षण में असफल होने पर आपको आपकी कॉशन मनी की पूरी राशि वापस मिल जाएगी'
                : 'একবার আপনি সফলভাবে মাইগ্রেট করলে বা ভিসা/চিকিৎসা পরীক্ষায় ব্যর্থ হলে আপনি আপনার জামানতের টাকা সম্পূর্ণ ফেরত পাবেন',
                doYouWantToAddMoreExperience:
                globalState.selectedLanguage == 'english'
                ? "Do you want to add more experience ?"
                : globalState.selectedLanguage == 'hindi'
                ? 'क्या आप और अधिक अनुभव जोड़ना चाहते हैं?'
                : 'আপনি আরো অভিজ্ঞতা যোগ করতে চান?',
                
                
    });
  };

  useEffect(() => {
    setLanguage();
  }, [globalState]);
  useEffect(() => {
    setUserData();
  }, []);

  return (
    <GlobalStateContext.Provider
      value={{
        globalState,
        setGlobalState,
        translation,
        newTranslation,
        setUserData: setUserData,
      }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

// Step 3: Create a custom hook to access the global state
export const useGlobalState = () => {
  const context = useContext(GlobalStateContext);
  if (!context) {
    throw new Error('useGlobalState must be used within a GlobalStateProvider');
  }
  return context;
};
