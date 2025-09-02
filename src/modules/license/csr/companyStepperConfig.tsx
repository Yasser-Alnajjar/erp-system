"use client";
import * as Yup from "yup";
import StepThree from "./StepThree";
import { Step } from "src/components/common/organisms/stepper-form";
import { IStep } from "src/components/common/organisms/stepper-form/FormSteeperTypes";
import { StepOne } from "./StepOne";

const stepOneFields: IStep = {
  title: "إنشاء حساب منشأة جديدة",
  description:
    "يرجى استكمال البيانات المطلوبة لإنشاء حساب منشأتك على المنصة، وبدء رحلتك في إدارة أعمالك بكفاءة وسهولة.",
  stepTitle: "بيانات الشركة",
  label: "بيانات الشركة",
  initialValues: {
    logo: "",
    companyNameAr: "",
    companyNameEn: "",
    companySize: "",
    companyType: "",
    hq: "",
    mainActivity: "",
    ownerType: "",
    ownerName: "",
    nationalId: "",
    jobTitle: "",
    gender: "",
    birthDate: "",
    nationality: "",
    city: "",
    companyDescription: "",
  },
  validationSchema: Yup.object({
    companyNameAr: Yup.string().required("مطلوب"),
    companyNameEn: Yup.string().required("مطلوب"),
    companySize: Yup.string().required("مطلوب"),
    companyType: Yup.string().required("مطلوب"),
    hq: Yup.string().required("مطلوب"),
    mainActivity: Yup.string().required("مطلوب"),
    ownerType: Yup.string().required("مطلوب"),
    ownerName: Yup.string().required("مطلوب"),
    nationalId: Yup.string().required("مطلوب"),
    jobTitle: Yup.string().required("مطلوب"),
    gender: Yup.string().required("مطلوب"),
    birthDate: Yup.date().required("مطلوب"),
    nationality: Yup.string().required("مطلوب"),
    city: Yup.string().required("مطلوب"),
  }),
  component: (props) => (
    <StepOne
      {...props}
      validationSchema={stepOneFields.validationSchema}
      fieldGroups={[
        {
          title: "بيانات المنشأة الأساسية",
          fields: [
            {
              name: "logo",
              description: "يرجى إضافة شعار منشأتك",
              type: "file",
            },
            {
              name: "naturalId",
              label: "الرقم الوطني الموحد",
              placeholder: "الرقم الوطني الموحد",
              description:
                "قريبًا، استيراد بيانات المنشأة تلقائيًا بنقرة واحدة.",
              type: "number",
              disabled: true,
            },
            {
              name: "companyNameAr",
              label: "اسم الشركة بالعربية",
              placeholder: "اسم الشركة بالعربية",
              type: "text",
              col: "col-span-6",
            },
            {
              name: "companyNameEn",
              label: "اسم الشركة بالإنجليزية",
              placeholder: "اسم الشركة بالإنجليزية",
              type: "text",
              col: "col-span-6",
            },
            {
              name: "companySize",
              label: "حجم الشركة",
              placeholder: "حجم الشركة",
              type: "select",
              col: "col-span-6",
              options: [
                { label: "صغيرة", value: "small" },
                { label: "متوسطة", value: "medium" },
                { label: "كبيرة", value: "large" },
              ],
            },
            {
              name: "companyType",
              label: "نوع الشركة",
              placeholder: "نوع الشركة",
              type: "select",
              col: "col-span-6",
              options: [
                { label: "مؤسسة فردية", value: "sole" },
                { label: "شركة ذات مسؤولية محدودة", value: "llc" },
                { label: "شركة مساهمة", value: "joint_stock" },
              ],
              description:
                "تحديد نوع الشركة (مثل: ذات مسؤولية محدودة، مساهمة مغلقة).",
            },
            {
              name: "hq",
              label: "المقر الرئيسي",
              placeholder: "المقر الرئيسي",
              type: "select",
              col: "col-span-6",
              options: [
                { label: "الرياض", value: "riyadh" },
                { label: "جدة", value: "jeddah" },
                { label: "الدمام", value: "dammam" },
              ],
            },
            {
              name: "mainActivity",
              label: "النشاط الرئيسي",
              placeholder: "النشاط الرئيسي",
              type: "select",
              col: "col-span-6",
              options: [
                { label: "تجارة", value: "commerce" },
                { label: "صناعة", value: "industry" },
                { label: "خدمات", value: "services" },
                { label: "تقنية", value: "technology" },
              ],
            },
          ],
        },
        {
          title: "بيانات المالك",
          fields: [
            {
              name: "ownerName",
              label: "اسم المالك",
              placeholder: "اسم المالك",
              type: "text",
              col: "col-span-6",
            },
            {
              name: "ownerType",
              label: "نوع المالك",
              placeholder: "نوع المالك",
              type: "select",
              col: "col-span-6",
              options: [
                { label: "فرد سعودي", value: "saudi_individual" },
                { label: "أجنبي", value: "foreigner" },
                { label: "شركة", value: "company" },
                { label: "جمعية غير ربحية", value: "ngo" },
              ],
            },
            {
              name: "nationalId",
              label: "رقم الهوية",
              placeholder: "رقم الهوية",
              type: "text",
              col: "col-span-6",
            },
            {
              name: "jobTitle",
              label: "المسمى الوظيفي",
              placeholder: "المسمى الوظيفي",
              type: "select",
              col: "col-span-6",
              options: [
                { label: "مدير عام", value: "general_manager" },
                { label: "مدير تنفيذي", value: "ceo" },
                { label: "مالك", value: "owner" },
                { label: "شريك", value: "partner" },
              ],
            },
            {
              name: "gender",
              label: "الجنس",
              placeholder: "الجنس",
              type: "select",
              col: "col-span-6",
              options: [
                { label: "ذكر", value: "male" },
                { label: "أنثى", value: "female" },
              ],
            },
            {
              name: "birthDate",
              label: "تاريخ الميلاد",
              placeholder: "تاريخ الميلاد",
              type: "date",
              col: "col-span-6",
            },
            {
              name: "nationality",
              label: "الجنسية",
              placeholder: "الجنسية",
              type: "select",
              col: "col-span-6",
              options: [
                { label: "سعودي", value: "saudi" },
                { label: "مصري", value: "egyptian" },
                { label: "هندي", value: "indian" },
                { label: "باكستاني", value: "pakistani" },
              ],
            },
            {
              name: "city",
              label: "المدينة",
              placeholder: "المدينة",
              type: "select",
              col: "col-span-6",
              options: [
                { label: "الرياض", value: "riyadh" },
                { label: "جدة", value: "jeddah" },
                { label: "مكة", value: "makkah" },
                { label: "المدينة", value: "madinah" },
                { label: "الدمام", value: "dammam" },
              ],
            },
          ],
        },
        {
          title: "وصف الشركة",
          fields: [
            {
              name: "companyDescription",
              placeholder: "وصف",
              type: "textarea",
              rows: 10,
            },
          ],
        },
      ]}
    />
  ),
};

const stepTwoFields: IStep = {
  title: "إنشاء حساب منشأة جديدة",
  stepTitle: "انشاء حساب",
  description:
    "يرجى استكمال البيانات المطلوبة لإنشاء حساب منشأتك على المنصة، وبدء رحلتك في إدارة أعمالك بكفاءة وسهولة.",
  label: "بيانات الترخيص",
  initialValues: {
    employeesCount: "",
    unifiedNumber: "",
    taxNumber: "",
    commercialRegValue: null,
    capital: null,
    confirmDate: "",
    startDate: "",
    fiscalYearStart: "",
    fiscalYearEnd: "",
    attachments: [],
  },
  validationSchema: Yup.object({
    unifiedNumber: Yup.string().required("مطلوب"),
    taxNumber: Yup.string().required("مطلوب"),
    commercialRegValue: Yup.number().required("مطلوب"),
    capital: Yup.number().min(5000, "الحد الأدنى 5000").required("مطلوب"),
    confirmDate: Yup.date().required("مطلوب"),
    startDate: Yup.date().required("مطلوب"),
    fiscalYearStart: Yup.date().required("مطلوب"),
    fiscalYearEnd: Yup.date().required("مطلوب"),
  }),
  component: (props) => (
    <Step
      {...props}
      validationSchema={stepTwoFields.validationSchema}
      fieldGroups={[
        {
          title: "البيانات المالية",
          fields: [
            {
              name: "employeesCount",
              label: "عدد الموظفين",
              placeholder: "عدد الموظفين",
              type: "number",
              description: "يُعبأ تلقائيًا بناءً على الموظفين المسجلين",
            },
            {
              name: "unifiedNumber",
              col: "col-span-6",
              label: "الرقم الموحد",
              placeholder: "الرقم الموحد",
              type: "text",
            },
            {
              name: "taxNumber",
              col: "col-span-6",
              label: "الرقم الضريبي",
              placeholder: "الرقم الضريبي",
              type: "text",
            },
            {
              name: "commercialRegValue",
              col: "col-span-6",
              label: "قيمة السجل التجاري",
              placeholder: "قيمة السجل التجاري",
              type: "number",
            },
            {
              name: "capital",
              col: "col-span-6",
              label: "رأس المال",
              placeholder: "رأس المال",
              type: "number",
            },
            {
              name: "startDate",
              col: "col-span-6",
              label: "تاريخ البداية",
              placeholder: "تاريخ البداية",
              type: "date",
            },
            {
              name: "confirmDate",
              col: "col-span-6",
              label: "تاريخ التأكيد",
              placeholder: "تاريخ التأكيد",
              type: "date",
            },
            {
              name: "fiscalYearStart",
              label: "بداية السنة المالية",
              placeholder: "بداية السنة المالية",
              col: "col-span-6",
              type: "date",
            },
            {
              name: "fiscalYearEnd",
              label: "نهاية السنة المالية",
              placeholder: "نهاية السنة المالية",
              col: "col-span-6",
              type: "date",
            },
            {
              name: "attachments",
              label: "المرفقات",
              placeholder: "المرفقات",
              type: "drop-file",
            },
          ],
        },
      ]}
    />
  ),
};

const stepThreeFields: IStep = {
  title: "الأنشطة والرخص الخاصة بالمنشأة",
  stepTitle: "الانشطة والرخص",
  description:
    "في هذه الصفحة، يمكنك إضافة وتعديل وإدارة جميع الرخص والأنشطة الاقتصادية الخاصة بمنشأتك لضمان التوافق مع المتطلبات.",
  label: "التراخيص",
  initialValues: {
    licenses: [],
  },
  validationSchema: Yup.object({
    licenses: Yup.array().of(
      Yup.object({
        ministry: Yup.string().required(),
        address: Yup.string().required(),
        activity: Yup.string().required(),
        licenseType: Yup.string().required(),
        licenseNumber: Yup.string().required(),
        licenseIssueDate: Yup.date().required(),
        licenseExpiryDate: Yup.date().required(),
        status: Yup.string().required(),
      })
    ),
  }),

  component: (props) => (
    <StepThree
      {...props}
      fieldGroups={[
        {
          title: "التراخيص",
          fields: [
            {
              name: "ministry",
              label: "الوزارة",
              placeholder: "الوزارة",
              type: "select",
              options: [
                { label: "وزارة التجارة", value: "commerce" },
                { label: "وزارة الاستثمار", value: "investment" },
                { label: "وزارة الموارد البشرية", value: "hr" },
              ],
            },
            {
              name: "address",
              label: "العنوان",
              placeholder: "العنوان",
              type: "text",
            },
            {
              name: "activity",
              label: "النشاط",
              placeholder: "النشاط",
              type: "text",
            },
            {
              name: "licenseType",
              label: "نوع الترخيص",
              placeholder: "نوع الترخيص",
              type: "select",
              options: [
                { label: "صناعي", value: "industrial" },
                { label: "تجاري", value: "commercial" },
                { label: "خدمي", value: "service" },
              ],
            },
            {
              name: "licenseNumber",
              label: "رقم الترخيص",
              placeholder: "رقم الترخيص",
              type: "text",
            },
            {
              name: "licenseIssueDate",
              label: "تاريخ الإصدار",
              placeholder: "تاريخ الإصدار",
              type: "date",
            },
            {
              name: "licenseExpiryDate",
              label: "تاريخ الانتهاء",
              placeholder: "تاريخ الانتهاء",
              type: "date",
            },
            {
              name: "status",
              label: "الحالة",
              placeholder: "الحالة",
              type: "select",
              options: [
                { label: "ساري", value: "active" },
                { label: "منتهي", value: "expired" },
                { label: "معلق", value: "pending" },
              ],
            },
          ],
        },
      ]}
    />
  ),
};

export const companyStepperConfig = [
  stepOneFields,
  stepTwoFields,
  stepThreeFields,
];
