import { OsceStation } from '../types';

export const INITIAL_OSCE_STATIONS: OsceStation[] = [
  {
    id: 'osce-1',
    title: 'Chest Pain - Acute Coronary Syndrome (History & Risk Stratification)',
    category: 'History Taking',
    difficulty: 'Medium',
    durationMinutes: 8,
    setting: 'Emergency Department / Urgent Care Clinic',
    scenario: 'A 58-year-old male presents to the Emergency Department complaining of retrosternal chest tightness that started 90 minutes ago while walking his dog.',
    candidateInstructions: [
      'Take a focused cardiovascular history from this patient.',
      'Identify key cardiac risk factors and red flags.',
      'Explain your initial differential diagnosis to the patient.',
      'Outline the urgent bedside investigations you will order immediately.'
    ],
    patientProfile: {
      name: 'John Miller',
      age: 58,
      gender: 'Male',
      vitals: {
        bp: '148/92 mmHg',
        hr: '94 bpm (regular)',
        rr: '18 /min',
        temp: '36.8 °C',
        spo2: '97% on room air'
      },
      presentingComplaint: 'Crushing central chest heaviness radiating to the left jaw and inner left arm for 90 minutes with mild diaphoresis.',
      backgroundInfo: 'Hypertension on Amlodipine 5mg. 25 pack-year smoking history. Father died of myocardial infarction at age 52. Denies illicit drug use.'
    },
    tasks: [
      'Characterize chest pain using SOCRATES (Site, Onset, Character, Radiation, Associations, Timing, Exacerbating/Relieving, Severity).',
      'Screen for ischemic heart disease risk factors (smoking, family history, dyslipidemia, diabetes).',
      'Screen for life-threatening causes (Aortic dissection, PE, Pneumothorax, Esophageal rupture).',
      'Explain ECG and high-sensitivity Troponin plan with empathy.'
    ],
    expectedApproach: [
      'Introduce self, confirm patient identity, establish rapport.',
      'Assess pain severity (8/10 on numeric scale).',
      'Rule out aortic dissection: sudden tearing back pain, BP asymmetry in both arms.',
      'Rule out pulmonary embolism: pleuritic pain, calf swelling, immobility.',
      'Explain immediate management: Aspirin 300mg, sublingual GTN, continuous ECG monitoring, and urgent cardiology assessment.'
    ],
    checklist: [
      { id: 'c1', task: 'Introduced self, verified patient identity & obtained consent', points: 1 },
      { id: 'c2', task: 'Detailed pain characterization: onset, crushing quality, radiation to jaw/arm (SOCRATES)', points: 2, isMandatory: true, clinicalPearl: 'Crushing retrosternal pain with radiation has highest likelihood ratio for ACS.' },
      { id: 'c3', task: 'Checked for associated symptoms (diaphoresis, nausea, shortness of breath)', points: 1 },
      { id: 'c4', task: 'Systematically screened for CAD risk factors (HTN, smoking, family history)', points: 2 },
      { id: 'c5', task: 'Explored red flags: ruled out tearing back pain (dissection) and hemoptysis (PE)', points: 2, isMandatory: true },
      { id: 'c6', task: 'Inquired about current medications and drug allergies (especially Aspirin)', points: 1 },
      { id: 'c7', task: 'Communicated plan calmly: 12-lead ECG, serial Troponins, CXR, Aspirin loading', points: 2 },
      { id: 'c8', task: 'Demonstrated empathetic communication and reassuring bedside manner', points: 1 }
    ],
    commonMistakes: [
      'Failing to screen for aortic dissection before considering antithrombotic therapy.',
      'Forgetting to check for Aspirin allergy before administering loading dose.',
      'Not inquiring about recent phosphodiesterase-5 inhibitors (sildenafil) prior to GTN administration.',
      'Rushing the history without exploring patient anxiety.'
    ],
    modelAnswer: '“Mr. Miller, based on your symptoms of crushing central chest heaviness radiating to your jaw and arm, our top priority is to investigate for acute heart-related causes, specifically Acute Coronary Syndrome. We are immediately performing a 12-lead electrocardiogram (ECG) and taking blood tests for cardiac enzymes (Troponin). In the meantime, I will provide chewable Aspirin, oxygen if your levels drop, and pain relief with sublingual nitroglycerin while closely monitoring your heart rhythm.”',
    examinerMarkingCriteria: [
      'Structured history taking utilizing SOCRATES mnemonic.',
      'Comprehensive risk factor stratification.',
      'Accurate identification of emergent red flags.',
      'Professional communication and clear patient education.'
    ],
    highYieldPoints: [
      'AMC Exam Tip: 12-lead ECG must be performed within 10 minutes of arrival for all acute chest pain cases.',
      'Do not give nitrates if SBP < 90 mmHg, HR < 50 bpm or > 100 bpm, or if PDE-5 inhibitors were taken in past 24-48 hours.',
      'Right ventricular infarction must be ruled out with right-sided leads (V4R) if inferior STEMI (II, III, aVF) is suspected.'
    ]
  },
  {
    id: 'osce-2',
    title: 'Abdominal Examination - Suspected Appendicitis / Acute Abdomen',
    category: 'Physical Examination',
    difficulty: 'Medium',
    durationMinutes: 8,
    setting: 'Surgical Ward / Outpatient Clinic',
    scenario: 'A 24-year-old female presents with 18 hours of worsening abdominal pain that began periumbilically and has now localized to the right lower quadrant with low-grade fever and anorexia.',
    candidateInstructions: [
      'Perform a structured abdominal examination on this patient.',
      'Elicit specific signs of peritoneal irritation and localized peritonitis.',
      'Explain your physical findings to the examiner.',
      'State the provisional diagnosis and initial management steps.'
    ],
    patientProfile: {
      name: 'Emma Watson',
      age: 24,
      gender: 'Female',
      vitals: {
        bp: '118/76 mmHg',
        hr: '102 bpm',
        rr: '20 /min',
        temp: '38.1 °C',
        spo2: '99%'
      },
      presentingComplaint: 'Sharp right lower quadrant pain aggravated by movement, coughing, and walking.',
      backgroundInfo: 'Last menstrual period was 2 weeks ago (regular cycles). No previous abdominal surgeries. Sexually active, uses barrier contraception.'
    },
    tasks: [
      'Position patient appropriately (supine, arms by sides, one pillow, knees slightly bent if needed).',
      'Systematic inspection: abdominal distension, scars, visible peristalsis, cough test.',
      'Auscultation: bowel sounds before deep palpation.',
      'Palpation: Light palpation in all 9 quadrants starting away from pain site, then deep palpation.',
      'Special tests: McBurney tenderness, Rovsing sign, Psoas sign, Obturator sign, Guarding & Rebound tenderness.'
    ],
    expectedApproach: [
      'Ask patient where the pain is and examine that area LAST.',
      'Watch the patient’s face continuously for signs of pain or discomfort during palpation.',
      'Assess for peritonism gently without causing severe rebound trauma (percussion tenderness is gentler).',
      'Perform mandatory urine pregnancy test (beta-hCG) in all women of reproductive age.'
    ],
    checklist: [
      { id: 'c1', task: 'Introduced self, explained exam, obtained informed consent & ensured privacy', points: 1 },
      { id: 'c2', task: 'Positioned patient supine with proper exposure (xiphisternum to pubic symphysis)', points: 1 },
      { id: 'c3', task: 'Looked from the end of the bed: inspection for distension, movement with respiration', points: 1 },
      { id: 'c4', task: 'Auscultated bowel sounds before palpation (reduced/normal)', points: 1 },
      { id: 'c5', task: 'Palpated systematically across 9 regions starting furthest from RLQ pain', points: 2, isMandatory: true },
      { id: 'c6', task: 'Identified McBurney point tenderness and voluntary vs involuntary guarding', points: 2, isMandatory: true },
      { id: 'c7', task: 'Elicited special appendiceal signs: Rovsing sign, Psoas/Obturator sign, percussion tenderness', points: 2 },
      { id: 'c8', task: 'Stated differential diagnoses including gynecological causes (ectopic, ovarian cyst torsion/rupture, PID)', points: 2, clinicalPearl: 'Always order urgent urine beta-hCG to exclude ectopic pregnancy in young females.' }
    ],
    commonMistakes: [
      'Starting palpation directly at the site of maximal tenderness.',
      'Failing to watch the patient’s face during palpation.',
      'Performing aggressive rebound tenderness instead of gentle percussion tenderness.',
      'Forgetting to mention urinary beta-hCG and pelvic ultrasound in reproductive age females.'
    ],
    modelAnswer: '“On examination, this young female has localized right iliac fossa tenderness with focal involuntary guarding and positive Rovsing and Psoas signs, highly consistent with acute appendicitis. My top differential in this age group also includes ruptured ectopic pregnancy, ovarian torsion, and pelvic inflammatory disease. Immediate management requires NPO status, IV fluid rehydration, analgesia, urgent FBC, CRP, beta-hCG, and surgical consultation for diagnostic laparoscopy / appendicectomy.”',
    examinerMarkingCriteria: [
      'Gentle, systematic examination technique.',
      'Clear identification of peritoneal signs.',
      'Prioritization of patient comfort and dignity.',
      'Recognition of critical female gynecological differentials.'
    ],
    highYieldPoints: [
      'Alvarado Score components: MANTRELS (Migration, Anorexia, Nausea, Tenderness RLQ, Rebound, Elevated temp, Leukocytosis, Shift to left).',
      'A normal appendix does NOT rule out appendicitis in early presentations (clinical diagnosis supported by imaging/laparoscopy).'
    ]
  },
  {
    id: 'osce-3',
    title: 'Breaking Bad News - Biopsy-Confirmed Colorectal Carcinoma',
    category: 'Communication Skills',
    difficulty: 'Hard',
    durationMinutes: 8,
    setting: 'Outpatient Surgical Consultation Room',
    scenario: 'You are the registrar in a general surgical clinic. Mr. David Clark, a 62-year-old retired teacher, has returned for the histopathology results of his colonoscopy performed two weeks ago for altered bowel habits and iron deficiency anemia. The biopsy confirms moderately differentiated Adenocarcinoma of the sigmoid colon.',
    candidateInstructions: [
      'Communicate the histopathology result using the SPIKES protocol.',
      'Respond empathetically to patient emotion and address immediate concerns.',
      'Outline the multidisciplinary staging and treatment pathway (CT staging, MDT meeting).'
    ],
    patientProfile: {
      name: 'David Clark',
      age: 62,
      gender: 'Male',
      vitals: {
        bp: '130/80 mmHg',
        hr: '76 bpm',
        rr: '14 /min',
        temp: '36.6 °C',
        spo2: '98%'
      },
      presentingComplaint: 'Here to get biopsy results from recent colonoscopy.',
      backgroundInfo: 'Lives with wife. Anxious about results. Non-smoker, mild osteoarthritis.'
    },
    tasks: [
      'Setting up: Private room, tissues, ask if he brought a support person.',
      'Perception: Check patient’s understanding of why the colonoscopy was performed.',
      'Invitation: Confirm how much detail the patient wants to know today.',
      'Knowledge: Deliver a warning shot before stating the clear cancer diagnosis without jargon.',
      'Empathy: Pause for emotional reaction, validate feelings, offer tissues.',
      'Strategy & Summary: Clearly outline next steps (CT scan staging, MDT, colorectal surgeon consultation).'
    ],
    expectedApproach: [
      'Utilize SPIKES framework explicitly.',
      'Deliver the "warning shot": “Unfortunately, the results from the biopsy are not what we had hoped for...”',
      'Use the direct word "cancer" or "malignancy" to avoid ambiguity, followed by an immediate compassionate pause.',
      'Do not overwhelm with statistical survival numbers in the initial emotional shock phase.'
    ],
    checklist: [
      { id: 'c1', task: 'Ensured private environment, sat at eye level, checked for support person', points: 1 },
      { id: 'c2', task: 'Explored patient’s baseline knowledge and expectations (Perception)', points: 1 },
      { id: 'c3', task: 'Gave a clear "Warning Shot" before delivering serious news', points: 2, isMandatory: true },
      { id: 'c4', task: 'Delivered news clearly and concisely without excessive medical jargon (Knowledge)', points: 2, isMandatory: true },
      { id: 'c5', task: 'Paused appropriately to allow patient to process and absorb the news', points: 2, isMandatory: true },
      { id: 'c6', task: 'Acknowledged and validated emotional response with genuine empathy (Empathy)', points: 2 },
      { id: 'c7', task: 'Outlined structured multidisciplinary staging plan: CT chest/abdomen/pelvis & MDT discussion', points: 2 },
      { id: 'c8', task: 'Arranged timely follow-up with specialist nurse contact details and written materials', points: 1 }
    ],
    commonMistakes: [
      'Blurting out the cancer diagnosis without a warning shot.',
      'Filling the silence when the patient cries instead of allowing space for emotional processing.',
      'Using euphemisms like "we found some abnormal cells" that create false reassurance.',
      'Failing to emphasize that there is a dedicated team and actionable treatment plan.'
    ],
    modelAnswer: '“Mr. Clark, unfortunately the results of the tissue biopsy are not as we had hoped. The pathologist found that the growth in the bowel is a bowel cancer (adenocarcinoma). [Pause for reaction]. I know this is shocking and difficult news to hear, and it is completely natural to feel overwhelmed right now. Please know that we have a specialized multidisciplinary team of colorectal surgeons and oncologists. Our immediate next step is to arrange a staging CT scan to check the extent and tailor the best treatment plan for you.”',
    examinerMarkingCriteria: [
      'Strict adherence to SPIKES protocol.',
      'High level of emotional intelligence and active listening.',
      'Clear, jargon-free communication.',
      'Structured, reassuring forward plan.'
    ],
    highYieldPoints: [
      'SPIKES Protocol: Setting, Perception, Invitation, Knowledge, Empathy, Strategy & Summary.',
      'Staging investigations for colon cancer: CT Chest/Abdomen/Pelvis, baseline CEA level.'
    ]
  },
  {
    id: 'osce-4',
    title: 'Medication Counseling - Warfarin & Direct Oral Anticoagulant (DOAC)',
    category: 'Communication Skills',
    difficulty: 'Medium',
    durationMinutes: 8,
    setting: 'General Practice / Outpatient Clinic',
    scenario: 'A 68-year-old female was newly diagnosed with non-valvular Atrial Fibrillation with a CHA2DS2-VASc score of 4. Her cardiologist has started her on Apixaban (Eliquis) 5mg twice daily. She has come to your clinic seeking counseling on why she needs this medicine, how to take it, and what precautions are necessary.',
    candidateInstructions: [
      'Explain the rationale for anticoagulation in atrial fibrillation.',
      'Explain how Apixaban works, correct dosage, and administration.',
      'Detail key precautions, red flag bleeding signs, drug interactions, and missed dose protocol.',
      'Check patient understanding using the teach-back method.'
    ],
    patientProfile: {
      name: 'Margaret Taylor',
      age: 68,
      gender: 'Female',
      vitals: {
        bp: '136/82 mmHg',
        hr: '78 bpm (irregularly irregular)',
        rr: '16 /min',
        temp: '36.7 °C',
        spo2: '98%'
      },
      presentingComplaint: 'Wants to understand her new blood thinner medication.',
      backgroundInfo: 'Hypertension, Type 2 Diabetes, Prior TIA 3 years ago. Normal renal and liver function.'
    },
    tasks: [
      'Explain stroke risk in AF: blood pools in left atrial appendage forming clots that can travel to the brain.',
      'Clarify mechanism: Apixaban is a factor Xa inhibitor that prevents clot formation.',
      'Dosing: 5mg twice daily with or without food (2.5mg if meeting 2 of: age ≥80, weight ≤60kg, creatinine ≥133 umol/L).',
      'Bleeding precautions: minor bruising vs major red flags (melena, hematuria, vomiting blood, severe headache after head strike).',
      'Teach-back confirmation.'
    ],
    expectedApproach: [
      'Establish baseline knowledge: ask what the doctor has already discussed.',
      'Use analogies: “AF causes turbulent blood flow like an eddy in a stream where clots can form”.',
      'Provide safety advice regarding dental work, invasive procedures, and avoiding NSAIDs/Aspirin without medical advice.',
      'Emphasize carrying an Anticoagulant Alert Card or MedicAlert bracelet.'
    ],
    checklist: [
      { id: 'c1', task: 'Introduced self, established rapport, and explored patient understanding of AF', points: 1 },
      { id: 'c2', task: 'Explained clear link between AF and stroke risk in understandable terms', points: 2, isMandatory: true },
      { id: 'c3', task: 'Detailed correct drug name, strength (5mg BD), and regular timing importance', points: 2 },
      { id: 'c4', task: 'Educated on major bleeding signs: black tarry stools, coffee ground vomit, severe headache', points: 2, isMandatory: true },
      { id: 'c5', task: 'Advised avoiding NSAIDs (Ibuprofen) and checking before taking OTC medicines/St John’s Wort', points: 2 },
      { id: 'c6', task: 'Explained protocol for missed dose (take when remembered unless close to next dose, never double up)', points: 1 },
      { id: 'c7', task: 'Advised informing dentists/surgeons before procedures and carrying anticoagulant alert card', points: 1 },
      { id: 'c8', task: 'Employed teach-back technique to verify patient comprehension and answered questions', points: 2 }
    ],
    commonMistakes: [
      'Telling the patient Apixaban requires routine INR blood tests (confusing DOACs with Warfarin).',
      'Failing to warn against concomitant NSAID use.',
      'Not explaining what to do after head trauma or severe falls.',
      'Failing to use the teach-back method.'
    ],
    modelAnswer: '“Mrs. Taylor, because of your atrial fibrillation, the top chambers of your heart quiver rather than pump smoothly, which can allow blood to pool and form small clots. If a clot travels to the brain, it can cause a stroke. Apixaban is a targeted blood thinner that significantly reduces this risk. You will take one 5mg tablet twice a day, roughly 12 hours apart. The most important precaution is monitoring for abnormal bleeding—such as black bowel motions, red urine, or persistent nosebleeds. If you ever bump your head hard or need dental surgery, let the doctors know you take Apixaban.”',
    examinerMarkingCriteria: [
      'Clear, accessible risk-benefit explanation.',
      'Accurate pharmacology counseling for DOACs vs VKAs.',
      'Effective patient safety and interaction guidance.',
      'Utilization of teach-back confirmation.'
    ],
    highYieldPoints: [
      'CHA2DS2-VASc score: Congestive HF (1), HTN (1), Age ≥75 (2), Diabetes (1), Stroke/TIA (2), Vascular disease (1), Age 65-74 (1), Sex category female (1). Score ≥2 in males or ≥3 in females indicates oral anticoagulation.',
      'Apixaban dose reduction criteria (ABC): Age ≥80, Body weight ≤60 kg, Serum Creatinine ≥133 µmol/L (need at least 2 to reduce to 2.5mg BD).'
    ]
  },
  {
    id: 'osce-5',
    title: 'Emergency Scenario - Acute Anaphylaxis Management',
    category: 'Emergency Management',
    difficulty: 'Hard',
    durationMinutes: 8,
    setting: 'Emergency Resuscitation Bay',
    scenario: 'A 19-year-old university student is brought to the ED by friends after eating a meal containing peanut sauce. Within 10 minutes, he developed generalized urticaria, lip angioedema, stridor, and respiratory distress.',
    candidateInstructions: [
      'Manage this acute emergency using the structured ABCDE approach.',
      'State immediate drug interventions, doses, routes, and monitoring requirements.',
      'Outline ongoing management, observation periods, and discharge planning.'
    ],
    patientProfile: {
      name: 'Liam Davies',
      age: 19,
      gender: 'Male',
      vitals: {
        bp: '82/46 mmHg (Hypotension)',
        hr: '128 bpm (Sinus tachycardia)',
        rr: '30 /min (Tachypnea)',
        temp: '37.1 °C',
        spo2: '89% on room air'
      },
      presentingComplaint: 'Severe breathlessness, swelling of lips/tongue, wheezing, dizziness after peanut ingestion.',
      backgroundInfo: 'Known mild asthma. No previous history of documented food anaphylaxis.'
    },
    tasks: [
      'Immediate Recognition: Call for senior emergency help and resuscitation team.',
      'Airway: Assess airway patency, look for stridor and tongue swelling, prepare for difficult intubation.',
      'Breathing: High-flow oxygen (15L/min via non-rebreather mask), nebulized salbutamol.',
      'First-Line Pharmacotherapy: Intramuscular Adrenaline (Epinephrine) 1:1000 (0.5 mg IM in anterolateral thigh).',
      'Circulation: Lay patient flat with legs elevated, two large-bore IV cannulae (14/16G), rapid 20mL/kg warm crystalloid fluid bolus.',
      'Repeat Adrenaline every 5 minutes if no response.'
    ],
    expectedApproach: [
      'Act decisively: IM Adrenaline is the single most critical life-saving drug; do not delay for IV access.',
      'Never allow the patient to stand or walk abruptly (risk of empty heart syndrome / fatal cardiovascular collapse).',
      'Second-line adjuncts: IV Hydrocortisone and IV/oral antihistamines (never substitute for adrenaline).'
    ],
    checklist: [
      { id: 'c1', task: 'Recognized anaphylactic shock and immediately activated emergency resuscitation team', points: 1 },
      { id: 'c2', task: 'Administered Intramuscular Adrenaline 1:1000 (0.5mg IM into mid-anterolateral thigh) without delay', points: 3, isMandatory: true, clinicalPearl: 'IM Adrenaline in the mid-anterolateral thigh provides rapid peak plasma concentration within 8 minutes.' },
      { id: 'c3', task: 'Positioned patient supine with legs elevated (avoided sudden sitting/standing)', points: 1, isMandatory: true },
      { id: 'c4', task: 'Administered High-flow oxygen (15L/min NRB mask) & attached continuous monitors (ECG, SpO2, NIBP)', points: 1 },
      { id: 'c5', task: 'Established 2 large-bore IV lines and initiated rapid fluid resuscitation (1-2L Normal Saline bolus)', points: 2 },
      { id: 'c6', task: 'Stated protocol to repeat IM adrenaline after 5 minutes if symptoms/hypotension persist', points: 2, isMandatory: true },
      { id: 'c7', task: 'Administered secondary adjuncts (Salbutamol nebulizer, IV Corticosteroids)', points: 1 },
      { id: 'c8', task: 'Specified minimum 6-12 hour observation period (biphasic reaction) and prescribed EpiPen on discharge', points: 2 }
    ],
    commonMistakes: [
      'Delaying IM adrenaline to give antihistamines or steroids first.',
      'Giving IV adrenaline push in non-cardiac arrest instead of IM (causing fatal arrhythmias).',
      'Letting the hypotensive anaphylaxis patient sit up or stand.',
      'Discharging the patient too early without observing for biphasic anaphylaxis (which occurs in up to 20% of cases).'
    ],
    modelAnswer: '“This is acute life-threatening anaphylaxis with airway compromise and distributive shock. I will immediately call for a Code Blue / Resuscitation Team. First and most importantly, I will administer Intramuscular Adrenaline 1:1000, 0.5mg into the mid-outer thigh. I will place the patient flat with legs elevated, administer 15L high-flow oxygen via a non-rebreather mask, insert two 16-gauge IV lines, and run a rapid 1-liter crystalloid fluid bolus. If hemodynamics or airway swelling do not improve within 5 minutes, I will repeat the IM Adrenaline dose. The patient must be admitted and observed for at least 8 to 24 hours to monitor for biphasic reactions, and provided with an EpiPen auto-injector and ASCIA action plan upon discharge.”',
    examinerMarkingCriteria: [
      'Instant recognition of anaphylaxis vs simple allergy.',
      'Flawless knowledge of Adrenaline dose (0.5mg IM 1:1000) and site.',
      'Strict adherence to ABCDE emergency resuscitation protocol.',
      'Comprehensive discharge safety netting (EpiPen, ASCIA plan).'
    ],
    highYieldPoints: [
      'Adult Adrenaline IM Dose: 0.5 mg (0.5 mL of 1:1000). Paediatric Dose: 0.01 mg/kg (max 0.5 mg).',
      'Biphasic anaphylaxis can occur up to 72 hours after initial onset (most commonly within 8 hours).'
    ]
  }
];
