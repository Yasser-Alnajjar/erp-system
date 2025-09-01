const Regex = {
  format: {
    StartWithCharAllowSpace:
      /^[A-Za-z\u0600-\u06FF ][A-Za-z0-9\u0600-\u06FF ]*$/,
    StartWithCharAllowSpaceBackSlashForwardSlashDash:
      /^[A-Za-z\u0600-\u06FF ][A-Za-z0-9\u0600-\u06FF /-\\]*$/,
    LettersOrDigitals: /^[a-zA-Z0-9]+$/,
    PasswordRegExp: /(?=^.{8,}$)((?=.*[A-Z])(?=.*[a-z]))^.*/,
    NotAcceptSpacesOnlyAcceptPeriodsOrUnderscores: /^[^0-9][a-zA-Z0-9_.]*$/,
    PhoneRegExp: /^\d{10,}$/,
    ErrUserName: /^Username.*is already taken\.$/,
    ErrRoleName: /^Role name.*is already taken\.$/,
    ErrEmail: /^Email.*is already taken\.$/,
    FileName: /^(?!-)[a-z0-9-]{3,40}(?<!-)$/,
    EmailFormat: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    Alphanumeric: /^[a-zA-Z0-9]+$/,
    YouTubeVideo:
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?(?:embed\/)?(?:v\/)?(?:shorts\/)?(?:\S+)/,
    Geolocation:
      /^(-?(?:90(?:\.0+)?|(?:[1-8]?\d(?:\.\d+)?)|(?:0{1,2}(?:\.\d+)?)))[\s,]+(-?(?:180(?:\.0+)?|(?:(?:1[0-7]\d|0?\d{1,2})(?:\.\d+)?)))$/,
  },
  message: {
    ar: {
      StartWithCharAllowSpace:
        "يجب أن يبدأ بحرف (عربي أو لاتيني)، ويمكن أن يحتوي على أحرف وأرقام ومسافات.",
      StartWithCharAllowSpaceBackSlashForwardSlashDash:
        "يجب أن يبدأ بحرف (عربي أو لاتيني)، ويمكن أن يحتوي على أحرف وأرقام ومسافات وشرطات (/ \\ -).",
      LettersOrDigitals: "يسمح فقط بالأحرف والأرقام بدون مسافات أو رموز.",
      PasswordRegExp:
        "يجب أن تكون كلمة المرور 8 أحرف على الأقل، وتحتوي على حرف كبير وحرف صغير على الأقل.",
      NotAcceptSpacesOnlyAcceptPeriodsOrUnderscores:
        "يجب أن يبدأ بحرف، ويسمح فقط بالأحرف أو الأرقام أو الشرطة السفلية (_) أو النقطة (.)، ولا يمكن أن يحتوي على مسافات أو يبدأ برقم.",
      PhoneRegExp: "يجب أن يحتوي رقم الهاتف على 10 أرقام على الأقل وأرقام فقط.",
      ErrUserName: "اسم المستخدم هذا مستخدم بالفعل. الرجاء اختيار اسم آخر.",
      ErrRoleName: "اسم الدور هذا مستخدم بالفعل. الرجاء اختيار اسم آخر.",
      ErrEmail:
        "البريد الإلكتروني هذا مستخدم بالفعل. الرجاء استخدام بريد إلكتروني آخر.",
      FileName:
        "يجب أن يكون اسم الملف من 3 إلى 40 حرفًا، بأحرف صغيرة، ويحتوي فقط على أحرف أو أرقام أو شرطات، ولا يبدأ أو ينتهي بشرطة.",
      EmailFormat:
        "تنسيق البريد الإلكتروني غير صالح. الرجاء إدخال بريد إلكتروني صحيح (مثال: example@example.com).",
      Alphanumeric: "يسمح فقط بالأحرف والأرقام. بدون مسافات أو رموز.",
      YouTubeVideo:
        "رابط فيديو يوتيوب غير صالح. الرجاء إدخال رابط صحيح لفيديو على يوتيوب.",
      Geolocation:
        "الإحداثيات غير صالحة. يجب أن تكون بصيغة: خط العرض، خط الطول (مثال: 25.276987, 55.296249).",
    },
    en: {
      StartWithCharAllowSpace:
        "Must start with a letter (Arabic or Latin) and can contain letters, numbers, and spaces.",
      StartWithCharAllowSpaceBackSlashForwardSlashDash:
        "Must start with a letter (Arabic or Latin) and may contain letters, numbers, spaces, slashes (/ \\), or dashes (-).",
      LettersOrDigitals:
        "Only letters and digits are allowed. No spaces or special characters.",
      PasswordRegExp:
        "Password must be at least 8 characters long, with at least one uppercase and one lowercase letter.",
      NotAcceptSpacesOnlyAcceptPeriodsOrUnderscores:
        "Must start with a letter and can only contain letters, digits, underscores (_), or periods (.). Cannot start with a digit or contain spaces.",
      PhoneRegExp:
        "Phone number must be at least 10 digits and contain only numbers.",
      ErrUserName:
        "This username is already taken. Please choose a different one.",
      ErrRoleName:
        "This role name is already taken. Please choose a different one.",
      ErrEmail:
        "This email is already taken. Please use a different email address.",
      FileName:
        "Filename must be 3 to 40 characters long, lowercase, alphanumeric or hyphenated, and cannot start or end with a hyphen.",
      EmailFormat:
        "Invalid email format. Please enter a valid email address (example@example.com).",
      Alphanumeric:
        "Only letters and numbers are allowed. No spaces or special characters.",
      YouTubeVideo:
        "Invalid YouTube URL. Please enter a valid YouTube video link.",
      Geolocation:
        "Invalid coordinates. Format must be: latitude, longitude (e.g. 25.276987, 55.296249).",
    },
  },
};

export { Regex };
