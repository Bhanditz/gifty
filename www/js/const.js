angular.module('starter')
  .constant('appConst', {
    dictionary: {
      menu: "תפריט",
      activities: "פעולות",
      loadCard: "טעינת כרטיס",
      sendCard: "שליחת כרטיס",
      billingInformation: "פרטי חיוב",
      settings: "הגדרות",
      advancedSettings: "הגדרות מתקדמות",
      advancedAccount: "הגדרות חשבון",
      logOut: "יציאה",
      nis: 'ש"ח',
      passCode:'כניסה מהירה',
      language:'שפה',
      enterPassword:'הכנס סיסמא',
      reEnterPassword:'אמת סיסמא',
    },
    localStorageKeys:{
      userPassCode:"userPassCode"
    }
  });
