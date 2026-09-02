import { Question } from '../types';

export const INITIAL_QUESTIONS: Question[] = [
  // --- Exact AMC Clinical Exam Question (Screenshot 4 Reference) ---
  {
    id: 'amc-cat-001',
    exam: 'AMC CAT MCQ',
    subject: 'Surgery',
    system: 'Cardiovascular System',
    topic: 'Abdominal Aortic Aneurysms & Differential Diagnosis',
    difficulty: 'Medium',
    vignette: 'A 68-year-old male presents for a routine check-up. He has a 30-pack-year smoking history and ceased smoking 22 years ago.\n\nOn examination his pulse is 90/min, blood pressure 134/76 mmHg and temperature 37.0°C. His abdomen is soft and non-tender. There is a 3cm palpable mass in umbilical region of the abdomen. The mass is firm, non-motile and non-reducible. The rest of the abdominal examination is normal and there are no other significant findings.',
    question: 'Which of the following diagnoses need to be considered? Select 3 answers.',
    isMultipleChoice: true,
    requiredSelectionsCount: 3,
    options: [
      { id: 'A', text: 'Small bowel obstruction' },
      { id: 'B', text: 'Peri-umbilical hernia' },
      { id: 'C', text: 'Abdominal aortic aneurysm' },
      { id: 'D', text: 'Large bowel obstruction' },
      { id: 'E', text: 'Acute appendicitis' },
      { id: 'F', text: 'Gastroenteritis' }
    ],
    correctOptionId: 'B', // Primary fallback
    correctOptionIds: ['B', 'C', 'A'], // Multi-select key: Peri-umbilical hernia, AAA, and potential small bowel mass/hernia obstruction
    educationalObjective: 'A palpable periumbilical mass in an older male smoker must prompt consideration of vascular (Abdominal Aortic Aneurysm), parietal/hernia (Peri-umbilical / para-umbilical hernia), and gastrointestinal/intra-abdominal masses (small bowel lesion/mass).',
    explanation: 'In an older male patient with a substantial smoking history who is asymptomatic with a 3cm firm, non-motile mass in the umbilical region:\n\n1. Abdominal Aortic Aneurysm (AAA) is a crucial consideration given age, male gender, and heavy smoking history. An aneurysm >3.0 cm is clinically significant and palpated in the epigastric/umbilical region.\n2. Peri-umbilical / Para-umbilical hernia is a common parietal cause of a non-reducible or firm umbilical mass.\n3. Small bowel obstruction or neoplasm/gastrointestinal mass can present with localized palpable fullness in the central umbilical region prior to acute distension.\n\nAcute appendicitis, large bowel obstruction, and gastroenteritis typically present with severe inflammatory/colicky pain, vomiting, or altered bowel habits rather than an isolated asymptomatic firm mass.',
    distractorExplanations: {
      'D': 'Large bowel obstruction typically presents with prominent generalized abdominal distension, obstipation, and vomiting rather than an isolated non-tender 3cm umbilical mass.',
      'E': 'Acute appendicitis presents with migratory right iliac fossa peritonism, anorexia, and localized guarding.',
      'F': 'Gastroenteritis is characterized by acute watery diarrhea, cramping, and hyperactive bowel sounds without a firm palpable mass.'
    },
    highYieldTopic: 'Abdominal Aortic Aneurysm (AAA)',
    highYieldPearl: 'Ultrasound screening is indicated for men aged 65-75 with smoking history. Elective repair threshold is ≥5.5 cm in men, ≥5.0 cm in women.',
    keyLearningPoint: 'Any palpable epigastric or periumbilical mass in an older smoker requires urgent vascular ultrasound to rule out abdominal aortic aneurysm.',
    amcRelevance: 'High-Yield AMC Clinical Surgery MCQ',
    references: 'Australian Guidelines for the Management of Abdominal Aortic Aneurysms, AMC Handbook of Clinical Assessment',
    cohort: 'Adult'
  },
  {
    id: 'amc-cat-002',
    exam: 'AMC CAT MCQ',
    subject: 'Medicine',
    system: 'Cardiovascular System',
    topic: 'Atrial Fibrillation & Anticoagulation Strategy',
    difficulty: 'Medium',
    vignette: 'A 72-year-old female presents to her general practitioner for a routine health check. She feels well and denies palpitations, dyspnea, or chest discomfort. Her medical history includes well-controlled hypertension (on Candesartan 16mg daily) and Type 2 Diabetes Mellitus (HbA1c 6.8% on Metformin 1000mg BD). On examination, her pulse is 84 bpm and irregularly irregular. Blood pressure is 132/78 mmHg. A 12-lead ECG confirms Atrial Fibrillation with a ventricular rate of 82-96 bpm.',
    question: 'Which of the following is the most appropriate long-term management strategy to reduce this patient’s risk of thromboembolic stroke?',
    options: [
      { id: 'A', text: 'Prescribe Aspirin 100 mg daily' },
      { id: 'B', text: 'Prescribe Dual Antiplatelet Therapy with Aspirin and Clopidogrel' },
      { id: 'C', text: 'Initiate Direct Oral Anticoagulant (DOAC) such as Apixaban or Rivaroxaban' },
      { id: 'D', text: 'No antithrombotic therapy is required because she is asymptomatic' },
      { id: 'E', text: 'Perform immediate Electrical Cardioversion without prior anticoagulation' }
    ],
    correctOptionId: 'C',
    educationalObjective: 'Calculate CHA2DS2-VASc score for non-valvular atrial fibrillation. In females with a score ≥ 3 (or males ≥ 2), oral anticoagulation with a DOAC is first-line for stroke prevention unless contraindicated.',
    explanation: 'This patient has non-valvular Atrial Fibrillation. Calculating her CHA2DS2-VASc score:\n- Congestive Heart Failure: 0\n- Hypertension: 1\n- Age ≥75: 0 (Age 65-74 = 1)\n- Diabetes Mellitus: 1\n- Stroke / TIA / TE: 0\n- Vascular Disease: 0\n- Age 65-74: 1\n- Sex Category (Female): 1\nTotal CHA2DS2-VASc Score = 4 (Hypertension + Diabetes + Age 72 + Female).\n\nAccording to national and international guidelines (National Heart Foundation of Australia / CSANZ), a CHA2DS2-VASc score ≥ 2 in males or ≥ 3 in females warrants oral anticoagulation. Direct Oral Anticoagulants (DOACs: Apixaban, Rivaroxaban, Dabigatran) are preferred over Warfarin due to superior efficacy, lower intracranial hemorrhage risk, and no requirement for routine INR monitoring.',
    distractorExplanations: {
      'A': 'Aspirin is NOT recommended for stroke prevention in atrial fibrillation as antiplatelets provide negligible stroke reduction while significantly increasing bleeding risks.',
      'B': 'Dual antiplatelet therapy is inferior to oral anticoagulation for stroke prevention in AF and carries a high bleeding hazard.',
      'D': 'Stroke risk is determined by vascular risk factors (CHA2DS2-VASc), NOT whether AF symptoms are present.',
      'E': 'Elective cardioversion for AF of unknown or >48h duration without 3 weeks of prior therapeutic anticoagulation (or TOE ruling out LAA thrombus) risks precipitating acute thromboembolic stroke.'
    },
    highYieldTopic: 'Atrial Fibrillation Management (Rate vs Rhythm & Anticoagulation)',
    highYieldPearl: 'CHA2DS2-VASc: Score ≥2 in men or ≥3 in women = DOAC indicated. Antiplatelet monotherapy has NO role in AF stroke prevention.',
    keyLearningPoint: 'Asymptomatic AF carries the exact same stroke risk as symptomatic AF; risk stratify using CHA2DS2-VASc.',
    amcRelevance: 'Essential AMC Clinical Medicine MCQ',
    references: 'Heart Foundation and CSANZ Australian Clinical Guidelines for the Management of Atrial Fibrillation',
    cohort: 'Adult'
  },
  {
    id: 'amc-cat-003',
    exam: 'AMC CAT MCQ',
    subject: "Women's Health (O&G)",
    system: 'Reproductive & Obstetrics',
    topic: 'Postpartum Hemorrhage (PPH) Management',
    difficulty: 'Hard',
    vignette: 'A 28-year-old Primigravida at 39 weeks gestation undergoes an uncomplicated spontaneous vaginal delivery of a 4.1 kg infant. Active management of the third stage of labor was performed with 10 units of IM Oxytocin. Fifteen minutes after placental delivery, the midwife notes heavy vaginal bleeding. On assessment, 600 mL of blood has collected in the bed. The patient’s heart rate is 108 bpm and blood pressure is 98/62 mmHg. On abdominal palpation, the uterine fundus is soft, boggy, and palpated 2 cm above the umbilicus.',
    question: 'Which of the following is the most appropriate next immediate management step?',
    options: [
      { id: 'A', text: 'Perform bimanual uterine compression and administer repeat uterotonics (IV Oxytocin infusion)' },
      { id: 'B', text: 'Transfer immediately to operating theatre for emergency hysterectomy' },
      { id: 'C', text: 'Administer oral Tranexamic acid 500 mg and observe for 30 minutes' },
      { id: 'D', text: 'Perform immediate exploratory laparotomy' },
      { id: 'E', text: 'Administer IM Ergometrine without checking blood pressure' }
    ],
    correctOptionId: 'A',
    educationalObjective: 'Uterine atony is the most common cause of Primary Postpartum Hemorrhage (70-80%). First-line management involves mechanical uterine massage / bimanual compression, bladder catheterization, and aggressive uterotonic pharmacotherapy.',
    explanation: 'The patient is experiencing Primary Postpartum Hemorrhage (blood loss ≥ 500 mL following vaginal delivery). The palpation of a soft, boggy, enlarged uterine fundus confirms Uterine Atony (the "Tone" in the 4Ts of PPH: Tone, Tissue, Trauma, Thrombin).\n\nImmediate management follows a structured protocol:\n1. Call for multidisciplinary obstetric emergency help.\n2. Fundal uterine massage and continuous bimanual uterine compression to stimulate mechanical contraction.\n3. High-dose IV Oxytocin infusion (e.g. 40 IU in 1000 mL Hartmann\'s solution) ± secondary uterotonics (Ergometrine, Carboprost, Misoprostol).\n4. Empty the bladder with an indwelling catheter (a full bladder displaces the uterus and prevents contraction).\n5. Administer IV Tranexamic Acid (1g IV within 3 hours of delivery).\n6. Two large-bore IV cannulae, bloods for FBC, Coags, Group & Hold.',
    distractorExplanations: {
      'B': 'Hysterectomy is the ultimate last resort when medical therapies, intrauterine balloon tamponade (Bakri balloon), and surgical hemostatic sutures (B-Lynch) have failed.',
      'C': 'Tranexamic acid must be given intravenously (1g IV over 10 min), and observation alone without uterine massage and uterotonics will result in fatal hemorrhagic shock.',
      'D': 'Exploratory laparotomy is premature before bedside bimanual compression, uterotonics, and intrauterine tamponade are attempted.',
      'E': 'Ergometrine is contraindicated in patients with hypertension or preeclampsia; BP must always be verified first.'
    },
    highYieldTopic: 'Postpartum Hemorrhage (4 Ts: Tone, Trauma, Tissue, Thrombin)',
    highYieldPearl: '4 Ts of PPH: Tone (Uterine atony - 70%), Trauma (lacerations - 20%), Tissue (retained placenta - 10%), Thrombin (coagulopathy - 1%).',
    keyLearningPoint: 'Uterine atony presents with a soft, boggy fundus. First-line: Call help, bimanual uterine compression, empty bladder, and IV Oxytocin.',
    amcRelevance: 'Essential AMC Obstetrics MCQ',
    references: 'RANZCOG Guidelines: Management of Postpartum Hemorrhage',
    cohort: 'Adult'
  },
  {
    id: 'amc-cat-004',
    exam: 'AMC CAT MCQ',
    subject: 'Paediatrics',
    system: 'Respiratory System',
    topic: 'Paediatric Croup & Stridor Assessment',
    difficulty: 'Medium',
    vignette: 'A 20-month-old toddler is brought to the emergency department at 2:00 AM by his parents due to sudden breathlessness and a harsh, barking cough. Over the preceding 2 days, he had mild nasal congestion and a low-grade fever of 37.8°C. On examination, the child is sitting comfortably on his mother\'s lap. He has a seal-like barking cough, audible inspiratory stridor when agitated, but no stridor at rest. There is mild intercostal recession. Oxygen saturation is 98% on room air, respiratory rate is 28/min, and heart rate is 110 bpm. He is drinking fluids well and not drooling.',
    question: 'Which of the following is the most appropriate initial treatment for this child?',
    options: [
      { id: 'A', text: 'Administer a single dose of oral Dexamethasone (0.15 mg/kg)' },
      { id: 'B', text: 'Administer Nebulized Adrenaline 1:1000 and admit to paediatric ICU' },
      { id: 'C', text: 'Prescribe oral Amoxicillin/Clavulanate for 7 days' },
      { id: 'D', text: 'Perform flexible nasendoscopy in the emergency department' },
      { id: 'E', text: 'Reassure parents with cool mist humidifier therapy with no medications' }
    ],
    correctOptionId: 'A',
    educationalObjective: 'Mild-to-moderate viral croup (Laryngotracheobronchitis) responds rapidly to a single dose of oral corticosteroid (Dexamethasone 0.15–0.6 mg/kg or Prednisolone 1 mg/kg), which reduces subglottic inflammation and hospital re-presentation.',
    explanation: 'This child presents with classic features of mild-to-moderate Croup (Laryngotracheobronchitis, most commonly caused by Parainfluenza virus): prodromal coryza followed by seal-like barking cough, hoarseness, and inspiratory stridor with agitation. On the Westley Croup Score, he has mild-to-moderate disease (no stridor at rest, minimal retractions).\n\nAccording to the Royal Children\'s Hospital (RCH) Melbourne Clinical Practice Guidelines, a single dose of oral Dexamethasone (0.15 mg/kg) is recommended for all severities of croup (including mild cases). It has proven efficacy in reducing symptom duration, hospital admission rates, and need for nebulized adrenaline.',
    distractorExplanations: {
      'B': 'Nebulized adrenaline is reserved for moderate-to-severe croup with stridor at rest and significant respiratory distress.',
      'C': 'Croup is viral (parainfluenza); antibiotics have no role and do not treat subglottic edema.',
      'D': 'Unnecessary invasive instrumentation of the upper airway is contraindicated and causes severe distress that worsens subglottic airway obstruction.',
      'E': 'Cool mist/humidification has no evidence of clinical benefit over oral corticosteroids in randomized trials.'
    },
    highYieldTopic: 'Croup vs Epiglottitis vs Bacterial Tracheitis',
    highYieldPearl: 'Croup = Parainfluenza virus, seal barking cough, Dexamethasone 0.15 mg/kg oral. Nebulized adrenaline if stridor at rest.',
    keyLearningPoint: 'A single dose of oral Dexamethasone (0.15 mg/kg) should be given to all children presenting with croup, regardless of severity.',
    amcRelevance: 'Essential AMC Paediatrics MCQ',
    references: 'Royal Children’s Hospital (RCH) Melbourne Clinical Practice Guidelines - Croup',
    cohort: 'Paediatric'
  },
  {
    id: 'amc-cat-005',
    exam: 'AMC CAT MCQ',
    subject: 'Psychiatry',
    system: 'Nervous System & Special Senses',
    topic: 'Major Depressive Disorder & Suicide Risk Assessment',
    difficulty: 'Medium',
    vignette: 'A 54-year-old accountant presents to his GP complaining of persistent fatigue, insomnia with early morning awakening (3:00 AM), decreased appetite with a 5-kg weight loss over 6 weeks, and loss of interest in his hobbies. He states, "My family would be better off financially without me due to my life insurance policy." When questioned gently, he admits to having thoughts of ending his life and has researched carbon monoxide poisoning in his garage.',
    question: 'Which of the following is the most appropriate immediate clinical action?',
    options: [
      { id: 'A', text: 'Ensure patient safety, do not leave him unattended, and arrange urgent mental health assessment (crisis assessment / inpatient admission)' },
      { id: 'B', text: 'Prescribe Fluoxetine 20 mg and schedule a routine follow-up appointment in 4 weeks' },
      { id: 'C', text: 'Ask the patient to sign a "no-harm contract" and allow him to drive home alone' },
      { id: 'D', text: 'Recommend cognitive behavioral therapy and send an email referral to a private psychologist' },
      { id: 'E', text: 'Prescribe Amitriptyline 50 mg at night to help with insomnia' },
    ],
    correctOptionId: 'A',
    educationalObjective: 'Identify high-risk suicidal ideation (explicit plan, intent, lethal means, feelings of burdensomeness). Immediate safety protocols and emergency psychiatric evaluation take precedence over routine outpatient pharmacotherapy.',
    explanation: 'This patient demonstrates major depressive disorder with melancholic features and acute, high-risk suicidal intent (explicit plan with lethal means, early morning waking, perceived burdensomeness). A patient with an active plan and lethal means must never be left alone or discharged home with a distant outpatient follow-up.\n\nThe immediate priority is ensuring patient safety: keep the patient under direct continuous observation, involve his support network/family with consent, and organize an urgent psychiatric evaluation via the local Crisis Assessment and Treatment Team (CATT) or emergency department for voluntary or involuntary psychiatric stabilization under the relevant Mental Health Act.',
    distractorExplanations: {
      'B': 'Starting an SSRI with follow-up in 4 weeks is dangerous; SSRIs take 2-4 weeks to exert therapeutic antidepressant effect and early activation can paradoxically increase energy to act on suicidal plans.',
      'C': '"No-harm contracts" have no proven efficacy in preventing suicide and do not replace formal risk containment.',
      'D': 'Outpatient CBT referral is appropriate for long-term psychotherapy once the acute crisis has been stabilized.',
      'E': 'Tricyclic antidepressants like Amitriptyline are highly lethal in overdose due to fatal cardiac arrhythmias (sodium channel blockade) and should be avoided in suicidal patients.'
    },
    highYieldTopic: 'Suicide Risk Assessment & Mental Health Act Protocols',
    highYieldPearl: 'High suicide risk = Plan + Means + Intent + Burdensomeness. Never leave patient unattended; emergency psychiatric containment is mandatory.',
    keyLearningPoint: 'Immediate patient safety and emergency psychiatric assessment take priority over outpatient medication prescribing in active suicidal crisis.',
    amcRelevance: 'Essential AMC Psychiatry MCQ',
    references: 'RANZCP Clinical Practice Guidelines for Mood Disorders, Australian Mental Health Act',
    cohort: 'Adult'
  },
  {
    id: 'amc-cat-006',
    exam: 'AMC CAT MCQ',
    subject: 'Population Health & Ethics',
    system: 'Ethics, Legal & Australian Healthcare',
    topic: 'Informed Consent, Autonomy & Blood Transfusion in Jehovah’s Witnesses',
    difficulty: 'Hard',
    vignette: 'A 34-year-old male is brought to the emergency department following a high-speed motorcycle collision. He is conscious, fully alert, and oriented (GCS 15). He has a complex open pelvic fracture with active internal arterial bleeding. His blood pressure is 82/48 mmHg and heart rate is 126 bpm despite 2 liters of IV crystalloid resuscitation. His hemoglobin is 62 g/L. The trauma surgeon explains that he will die from hemorrhagic shock without an urgent blood transfusion and embolization.\n\nThe patient produces a valid, witnessed Advance Health Directive card stating he is a practicing Jehovah’s Witness and explicitly refuses all whole blood and red cell transfusions under any circumstances. When re-assessed, he calmly and clearly reiterates that he understands he will die without blood, but refuses all blood products on religious grounds.',
    question: 'Under Australian common law and medical ethics, what is the most appropriate action for the medical team?',
    options: [
      { id: 'A', text: 'Respect the patient’s competent refusal of blood products, administer non-blood volume expanders, and proceed with emergency embolization/surgery' },
      { id: 'B', text: 'Overrule the patient’s refusal and administer blood products under the Emergency Doctrine of necessity' },
      { id: 'C', text: 'Obtain an emergency court order to force transfusion against his stated religious directive' },
      { id: 'D', text: 'Declare the patient mentally incompetent due to hypovolemic shock and transfuse blood' },
      { id: 'E', text: 'Refuse to provide any surgical or medical care because the patient is non-compliant' }
    ],
    correctOptionId: 'A',
    educationalObjective: 'An adult patient with decision-making capacity has the absolute legal and ethical right to refuse any medical treatment (including life-saving blood transfusion). The emergency doctrine applies ONLY when the patient lacks capacity.',
    explanation: 'Under Australian law and medical ethics, an adult patient with decision-making capacity possesses bodily autonomy and the right to self-determination, which includes the right to refuse any medical intervention—even if that refusal leads to death.\n\nIn this scenario:\n1. The patient is conscious, alert, and demonstrates clear understanding of the diagnosis, prognosis, and fatal consequence of his decision (intact decision-making capacity).\n2. The emergency doctrine of necessity applies ONLY when an incapacitated person has not made their wishes known.\n3. The medical team must respect his refusal of whole blood/red blood cells, optimize bloodless resuscitation techniques (crystalloids, tranexamic acid, cell salvage if accepted, erythropoiesis stimulating agents, urgent surgical/angiographic hemostasis), and continue full active medical care.',
    distractorExplanations: {
      'B': 'Administering blood against a competent adult’s known explicit refusal constitutes battery/assault under Australian law.',
      'C': 'Courts in Australia uphold the competent adult\'s right to refuse treatment; emergency court intervention is only for minors (where court acts under parens patriae jurisdiction to protect the child\'s life).',
      'D': 'Hypovolemic shock does not automatically invalidate capacity if the patient is fully lucid and understands the consequences.',
      'E': 'Abandoning the patient is unethical; doctors have a duty of care to provide all other available therapies.'
    },
    highYieldTopic: 'Autonomy, Capacity & Jehovah’s Witness Refusal of Blood',
    highYieldPearl: 'Competent adult refusal of blood MUST be respected in Australia. For children of Jehovah’s Witnesses, the Supreme Court / parens patriae jurisdiction authorizes life-saving blood transfusions.',
    keyLearningPoint: 'Patient autonomy supersedes beneficence when a competent adult refuses life-saving blood transfusions.',
    amcRelevance: 'Essential AMC Medical Ethics MCQ',
    references: 'Australian Medical Association (AMA) Code of Ethics, NHMRC Guidelines on Ethical Dilemmas in Healthcare',
    cohort: 'Adult'
  },
  {
    id: 'usmle-s1-001',
    exam: 'USMLE Step 1',
    subject: 'Pathology',
    system: 'Cardiovascular System',
    topic: 'Myocardial Infarction Histopathology Timeline',
    difficulty: 'Medium',
    vignette: 'A 62-year-old male with a history of poorly controlled hypertension and heavy cigarette smoking is brought to the emergency department after experiencing severe, crushing substernal chest pain that began 4 days ago while shoveling snow. He delayed seeking medical care hoping the symptoms would subside. Blood pressure is 98/60 mm Hg and pulse is 112/min. On cardiac auscultation, a new harsh holosystolic murmur is heard best at the left lower sternal border with an associated thrill. Transthoracic echocardiography reveals a rupture of the interventricular septum with left-to-right shunting.',
    question: 'Which of the following histologic processes is most prominent in the infarcted myocardial tissue at this stage?',
    options: [
      { id: 'A', text: 'Wavy myocardial fibers with contraction band necrosis' },
      { id: 'B', text: 'Dense collagenous scar tissue with loss of cellularity' },
      { id: 'C', text: 'Abundant macrophages with early phagocytosis of dead cardiomyocytes and granulation tissue at margins' },
      { id: 'D', text: 'Extensive neutrophil infiltration with coagulative necrosis' },
      { id: 'E', text: 'No discernible microscopic alterations except intracellular edema' }
    ],
    correctOptionId: 'C',
    educationalObjective: 'Mechanical complications of acute myocardial infarction (such as free wall rupture, papillary muscle rupture, or ventricular septal defect) typically occur 3–7 days post-MI due to macrophage-mediated tissue degradation and weakening prior to collagen deposition.',
    explanation: 'Ventricular septal rupture is a life-threatening mechanical complication of transmural myocardial infarction that most commonly occurs between days 3 and 7 post-infarct. At this time point (day 4 in this patient), the primary histologic hallmark is abundant macrophage infiltration actively clearing necrotic cardiomyocytes and lysing matrix components, leaving the ventricular wall structurally weakest before robust fibroblastic granulation tissue and collagen deposition (which predominate after 10-14 days to weeks).',
    distractorExplanations: {
      'A': 'Wavy fibers and contraction band necrosis appear during the early hyperacute phase (0.5 to 4 hours post-infarct) following reperfusion injury.',
      'B': 'Dense collagenous scar formation occurs weeks to months (> 2 weeks to 2 months) after the ischemic event.',
      'D': 'Extensive neutrophilic infiltrate with acute coagulative necrosis peaks between 24 and 72 hours (1–3 days) post-MI.',
      'E': 'Under 4 hours, light microscopy typically demonstrates no obvious histopathologic changes.'
    },
    highYieldTopic: 'Myocardial Infarction Histopathology Timeline',
    highYieldPearl: 'MI Timeline: 1-3 days = Neutrophils (coagulative necrosis); 3-7 days = Macrophages (peak risk of cardiac rupture & VSD); 10-14 days = Granulation tissue; >2 months = Dense collagenous scar.',
    keyLearningPoint: 'Macrophage infiltration peaks between days 3 and 7, causing structural weakening and peak incidence of myocardial rupture.',
    references: 'Robbins & Cotran Pathologic Basis of Disease, First Aid for the USMLE Step 1',
    cohort: 'Adult'
  }
];
