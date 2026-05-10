export const PATIENTS = [
  { id:'P-1042', name:'Arjun Sharma',     age:54, gender:'Male',   blood:'B+',  dept:'Cardiology',       doctor:'Dr. Ananya Reddy',  status:'Critical',  admitted:'12 May 2025', next:'20 May 2025', ward:'ICU-A',     bed:'3',  location:'Mumbai, MH',       phone:'+91-98201-11234', email:'arjun@gmail.com',     vitals:{bp:'160/100',hr:98, spo2:94,temp:99.1}, conditions:['Hypertension','Arrhythmia'],              meds:['Amlodipine 5mg','Metoprolol 25mg','Aspirin 75mg'],          allergies:['Penicillin'],       notes:'Patient on continuous cardiac monitoring. AF episodes overnight.',    insurance:'Star Health — SH-9812341',   emergency:{name:'Sunita Sharma',rel:'Wife',    phone:'+91-98201-99123'}, av:'AS',avC:'#e8572a',avB:'#fef0ec' },
  { id:'P-1043', name:'Priya Nair',       age:34, gender:'Female', blood:'O+',  dept:'Obstetrics',        doctor:'Dr. Kavita Bose',   status:'Stable',    admitted:'10 May 2025', next:'22 May 2025', ward:'Maternity', bed:'7',  location:'Pune, MH',         phone:'+91-97309-22345', email:'priya@outlook.com',   vitals:{bp:'110/70', hr:76, spo2:99,temp:98.4}, conditions:['Prenatal Care (32 wks)','Anaemia'],       meds:['Folic Acid 5mg','Iron Sucrose IV','Calcium 500mg'],         allergies:[],                   notes:'Regular fetal movements. Iron infusion Day 2 completed.',            insurance:'HDFC Ergo — HE-3421987',     emergency:{name:'Rajan Nair',  rel:'Husband', phone:'+91-97309-88456'}, av:'PN',avC:'#1a7a4a',avB:'#e6f7ee' },
  { id:'P-1044', name:'Rohit Verma',      age:61, gender:'Male',   blood:'A-',  dept:'Orthopedics',       doctor:'Dr. Suresh Menon',  status:'Recovering',admitted:'05 May 2025', next:'25 May 2025', ward:'Ortho-B',  bed:'12', location:'New Delhi',        phone:'+91-96100-33456', email:'rohit@yahoo.com',     vitals:{bp:'122/80', hr:72, spo2:97,temp:98.6}, conditions:['Hip Replacement','Osteoporosis'],         meds:['Cefazolin 1g IV','Enoxaparin 40mg','Tramadol 50mg'],        allergies:['Sulfa drugs'],      notes:'Physiotherapy initiated. Weight-bearing with walker. Wound clean.',   insurance:'New India — NI-5512908',     emergency:{name:'Anjali Verma',rel:'Daughter',phone:'+91-96100-77234'}, av:'RV',avC:'#00b8a9',avB:'#e0f9f7' },
  { id:'P-1045', name:'Sneha Iyer',       age:28, gender:'Female', blood:'AB+', dept:'Neurology',         doctor:'Dr. Rahul Joshi',   status:'Stable',    admitted:'08 May 2025', next:'18 May 2025', ward:'Neuro-A',  bed:'5',  location:'Chennai, TN',      phone:'+91-95009-44567', email:'sneha@gmail.com',     vitals:{bp:'115/75', hr:80, spo2:98,temp:98.2}, conditions:['Migraine (Chronic)','Anxiety Disorder'],  meds:['Topiramate 50mg','Sumatriptan 50mg PRN','Escitalopram 10mg'],allergies:['Codeine'],           notes:'MRI Brain ordered. Quiet-room therapy effective.',                   insurance:'Bajaj Allianz — BA-7723412', emergency:{name:'Ramesh Iyer', rel:'Father',  phone:'+91-95009-11678'}, av:'SI',avC:'#6c5ce7',avB:'#f0eeff' },
  { id:'P-1046', name:'Vikram Malhotra',  age:47, gender:'Male',   blood:'O-',  dept:'Oncology',          doctor:'Dr. Priya Kapoor',  status:'Critical',  admitted:'01 May 2025', next:'15 May 2025', ward:'Onco-ICU', bed:'2',  location:'Bengaluru, KA',   phone:'+91-94009-55678', email:'vikram@corp.com',     vitals:{bp:'140/92', hr:102,spo2:91,temp:100.4},conditions:['Lung Cancer Stage III-B','Diabetes'],    meds:['Carboplatin 450mg IV','Paclitaxel 260mg IV','Metformin 500mg'],allergies:['Contrast dye','NSAIDs'],notes:'Cycle 3 chemo in progress. Monitoring for febrile neutropenia.',  insurance:'ICICI Lombard — IL-4498712', emergency:{name:'Neha Malhotra',rel:'Wife',    phone:'+91-94009-22890'}, av:'VM',avC:'#e8572a',avB:'#fef0ec' },
  { id:'P-1047', name:'Kavya Reddy',      age:19, gender:'Female', blood:'B-',  dept:'Pulmonology',       doctor:'Dr. Ananya Reddy',  status:'Stable',    admitted:'13 May 2025', next:'21 May 2025', ward:'General-C',bed:'9',  location:'Hyderabad, TS',   phone:'+91-93000-66789', email:'kavya@student.com',   vitals:{bp:'108/68', hr:74, spo2:99,temp:98.0}, conditions:['Asthma (Moderate)','Seasonal Rhinitis'],  meds:['Budesonide 200mcg BD','Salbutamol PRN','Montelukast 10mg'],  allergies:['Aspirin'],          notes:'Spirometry improved. Allergy panel sent.',                           insurance:'United Health — UH-6634512', emergency:{name:'Suresh Reddy',rel:'Father',  phone:'+91-93000-44123'}, av:'KR',avC:'#f5a623',avB:'#fff6e6' },
  { id:'P-1048', name:'Suresh Pillai',    age:68, gender:'Male',   blood:'A+',  dept:'Cardiology',        doctor:'Dr. Ananya Reddy',  status:'Recovering',admitted:'03 May 2025', next:'19 May 2025', ward:'Cardio-B', bed:'4',  location:'Kochi, KL',       phone:'+91-92001-77890', email:'suresh@gmail.com',    vitals:{bp:'130/84', hr:68, spo2:96,temp:98.8}, conditions:['Post-CABG (Day 11)','Hyperlipidemia'],    meds:['Atorvastatin 40mg','Clopidogrel 75mg','Ramipril 5mg'],       allergies:[],                   notes:'Cardiac rehab initiated. Echo Day 14 scheduled.',                    insurance:'LIC Health — LH-8812341',    emergency:{name:'Meera Pillai',rel:'Wife',    phone:'+91-92001-33456'}, av:'SP',avC:'#1a7a4a',avB:'#e6f7ee' },
  { id:'P-1049', name:'Meena Gupta',      age:42, gender:'Female', blood:'O+',  dept:'Endocrinology',     doctor:'Dr. Suresh Menon',  status:'Stable',    admitted:'11 May 2025', next:'23 May 2025', ward:'General-A',bed:'11', location:'Jaipur, RJ',      phone:'+91-91009-88901', email:'meena@biz.com',       vitals:{bp:'118/76', hr:78, spo2:98,temp:98.5}, conditions:['Type 2 Diabetes','Hypothyroidism'],       meds:['Insulin Glargine 20U','Levothyroxine 75mcg','Metformin 1g BD'],allergies:['Sulphonylureas'],   notes:'HbA1c 9.2%. Insulin titration in progress.',                         insurance:'Max Bupa — MB-3309812',      emergency:{name:'Ravi Gupta',  rel:'Husband', phone:'+91-91009-55234'}, av:'MG',avC:'#00b8a9',avB:'#e0f9f7' },
  { id:'P-1050', name:'Deepak Patel',     age:36, gender:'Male',   blood:'B+',  dept:'Gastroenterology',  doctor:'Dr. Rahul Joshi',   status:'Stable',    admitted:'14 May 2025', next:'24 May 2025', ward:'General-B',bed:'6',  location:'Ahmedabad, GJ',  phone:'+91-90001-99012', email:'deepak@tech.com',     vitals:{bp:'120/78', hr:75, spo2:98,temp:98.3}, conditions:["Crohn's Disease",'Iron Deficiency'],      meds:['Mesalazine 800mg TDS','Prednisolone 40mg','Iron Sucrose IV'], allergies:['Latex'],            notes:"Colonoscopy done. Biopsies sent. IBD review scheduled.",             insurance:'Religare — RL-1122334',      emergency:{name:'Pooja Patel', rel:'Wife',    phone:'+91-90001-44789'}, av:'DP',avC:'#6c5ce7',avB:'#f0eeff' },
  { id:'P-1051', name:'Lakshmi Krishnan', age:71, gender:'Female', blood:'AB-', dept:'Nephrology',        doctor:'Dr. Priya Kapoor',  status:'Critical',  admitted:'09 May 2025', next:'16 May 2025', ward:'HD Unit',  bed:'1',  location:'Coimbatore, TN',  phone:'+91-89001-10123', email:'lakshmi@retired.com', vitals:{bp:'168/104',hr:88, spo2:93,temp:99.6}, conditions:['CKD Stage IV','Hypertension'],            meds:['Erythropoietin 4000U','Furosemide 80mg','Amlodipine 10mg'],  allergies:['ACE Inhibitors'],   notes:'Dialysis MWF. AV fistula functioning. Fluid restriction 1L/day.',    insurance:'Oriental — OI-9987612',      emergency:{name:'Venkat K.',   rel:'Son',     phone:'+91-89001-55234'}, av:'LK',avC:'#e8572a',avB:'#fef0ec' },
]

export const STATUS_CFG = {
  Critical:   { color:'#e8572a', bg:'#fef0ec', border:'#fbd0c2' },
  Stable:     { color:'#1a7a4a', bg:'#e6f7ee', border:'#b3e6c8' },
  Recovering: { color:'#f5a623', bg:'#fff6e6', border:'#fde3b0' },
}

export const DEPTS   = ['All','Cardiology','Neurology','Orthopedics','Oncology','Pulmonology','Obstetrics','Endocrinology','Gastroenterology','Nephrology']
export const STATUSES = ['All','Critical','Stable','Recovering']

export const ADM_DATA = [
  {m:'Jan',a:420,d:390,i:42},{m:'Feb',a:380,d:370,i:38},{m:'Mar',a:510,d:490,i:55},
  {m:'Apr',a:460,d:450,i:48},{m:'May',a:530,d:510,i:60},{m:'Jun',a:490,d:480,i:52},
  {m:'Jul',a:570,d:545,i:65},{m:'Aug',a:620,d:600,i:70},{m:'Sep',a:580,d:560,i:63},
  {m:'Oct',a:640,d:615,i:72},{m:'Nov',a:590,d:570,i:68},{m:'Dec',a:680,d:650,i:78},
]
export const REV_DATA = [
  {m:'Jan',r:2.1,e:1.6},{m:'Feb',r:1.9,e:1.5},{m:'Mar',r:2.6,e:1.9},
  {m:'Apr',r:2.4,e:1.8},{m:'May',r:2.8,e:2.0},{m:'Jun',r:2.5,e:1.9},
  {m:'Jul',r:3.1,e:2.2},{m:'Aug',r:3.4,e:2.4},{m:'Sep',r:3.0,e:2.2},
  {m:'Oct',r:3.5,e:2.5},{m:'Nov',r:3.2,e:2.3},{m:'Dec',r:3.8,e:2.6},
]
export const DEPT_PIE = [
  {name:'Cardiology',value:340,color:'#1a7a4a'},{name:'Neurology',value:280,color:'#f5a623'},
  {name:'Orthopedics',value:220,color:'#00b8a9'},{name:'Oncology',value:190,color:'#6c5ce7'},
  {name:'Nephrology',value:160,color:'#e8572a'},
]
export const SAT_DATA = [
  {c:'Overall Care',s:4.6},{c:'Cleanliness',s:4.8},{c:'Communication',s:4.3},
  {c:'Wait Time',s:3.9},{c:'Pain Mgmt',s:4.5},{c:'Discharge',s:4.2},
]

export const APPOINTMENTS = [
  { id:'A-001', patient:'Arjun Sharma',    doctor:'Dr. Ananya Reddy', dept:'Cardiology',    date:'2025-05-20', time:'09:30', type:'Follow-up',   status:'Confirmed', duration:30 },
  { id:'A-002', patient:'Priya Nair',      doctor:'Dr. Kavita Bose',  dept:'Obstetrics',    date:'2025-05-20', time:'10:15', type:'Check-up',    status:'Confirmed', duration:45 },
  { id:'A-003', patient:'Sneha Iyer',      doctor:'Dr. Rahul Joshi',  dept:'Neurology',     date:'2025-05-20', time:'11:00', type:'Consultation',status:'Pending',   duration:30 },
  { id:'A-004', patient:'Vikram Malhotra', doctor:'Dr. Priya Kapoor', dept:'Oncology',      date:'2025-05-21', time:'09:00', type:'Chemo Review', status:'Confirmed', duration:60 },
  { id:'A-005', patient:'Meena Gupta',     doctor:'Dr. Suresh Menon', dept:'Endocrinology', date:'2025-05-21', time:'10:30', type:'Lab Review',  status:'Confirmed', duration:30 },
  { id:'A-006', patient:'Kavya Reddy',     doctor:'Dr. Ananya Reddy', dept:'Pulmonology',   date:'2025-05-21', time:'14:00', type:'Follow-up',   status:'Cancelled', duration:30 },
  { id:'A-007', patient:'Suresh Pillai',   doctor:'Dr. Ananya Reddy', dept:'Cardiology',    date:'2025-05-22', time:'09:30', type:'Echo Review', status:'Confirmed', duration:45 },
  { id:'A-008', patient:'Deepak Patel',    doctor:'Dr. Rahul Joshi',  dept:'Gastro',        date:'2025-05-22', time:'11:15', type:'Biopsy Review',status:'Pending',  duration:30 },
  { id:'A-009', patient:'Lakshmi Krishnan',doctor:'Dr. Priya Kapoor', dept:'Nephrology',    date:'2025-05-23', time:'08:00', type:'Dialysis',    status:'Confirmed', duration:240},
  { id:'A-010', patient:'Rohit Verma',     doctor:'Dr. Suresh Menon', dept:'Orthopedics',   date:'2025-05-23', time:'10:00', type:'Physio',      status:'Confirmed', duration:60 },
]

export const REPORTS = [
  { id:'R-001', title:'Q1 2025 Clinical Summary',        type:'Clinical',   date:'01 Apr 2025', size:'2.4 MB', status:'Final',   dept:'All Departments',  author:'Dr. Admin' },
  { id:'R-002', title:'Monthly Admissions — April 2025', type:'Operations', date:'30 Apr 2025', size:'1.1 MB', status:'Final',   dept:'Administration',   author:'Ms. Sharma'  },
  { id:'R-003', title:'ICU Capacity Report — May 2025',  type:'Clinical',   date:'10 May 2025', size:'876 KB', status:'Draft',   dept:'ICU',              author:'Dr. Kapoor'  },
  { id:'R-004', title:'Pharmacy Expenditure Q1',         type:'Financial',  date:'15 Apr 2025', size:'3.2 MB', status:'Final',   dept:'Pharmacy',         author:'Mr. Patel'   },
  { id:'R-005', title:'Staff Utilisation Report',        type:'HR',         date:'05 May 2025', size:'1.8 MB', status:'Final',   dept:'HR',               author:'Ms. Reddy'   },
  { id:'R-006', title:'Infection Control Audit',         type:'Compliance', date:'12 May 2025', size:'2.1 MB', status:'Final',   dept:'Infection Control',author:'Dr. Bose'    },
  { id:'R-007', title:'Revenue vs Budget — Apr 2025',    type:'Financial',  date:'30 Apr 2025', size:'4.5 MB', status:'Final',   dept:'Finance',          author:'CFO Office'  },
  { id:'R-008', title:'Patient Satisfaction Survey Q1',  type:'Quality',    date:'01 Apr 2025', size:'1.3 MB', status:'Final',   dept:'Quality',          author:'Quality Dept'},
]