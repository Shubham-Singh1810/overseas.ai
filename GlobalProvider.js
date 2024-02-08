import React, {createContext, useContext, useEffect, useState} from 'react';
import {translation} from './Language';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Step 1: Create a context
const GlobalStateContext = createContext();

// Step 2: Create a provider component
export const GlobalStateProvider = ({children}) => {
  const setUserData = async () => {
    try {
     let localUser = await AsyncStorage.getItem('user');
      setGlobalState({...globalState, user:localUser});
    } catch (error) {
      console.warn('error from global provider');
    }
  };

  const [globalState, setGlobalState] = useState({
    // Your initial global state values go here
    selectedLanguage: 'english',
    user: null,
    profileStrength:null,
    notifications:null
  });
  const [translation, setTranslation] = useState({});
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
          ? 'पर लागू'
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
          ? 'लागू पाठ्यक्रम'
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
          ? 'नौकरियाँ बचाई गईं'
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
  };
  useEffect(() => {
    setLanguage();
  }, [globalState]);
  useEffect(() => {
    setUserData();
  }, []);
  return (
    <GlobalStateContext.Provider
      value={{globalState, setGlobalState, translation, setUserData:setUserData}}>
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
