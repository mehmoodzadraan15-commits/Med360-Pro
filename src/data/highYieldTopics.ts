import { HighYieldTopic } from '../types';

export const HIGH_YIELD_TOPICS: HighYieldTopic[] = [
  {
    id: 'hy-1',
    title: 'Acute Coronary Syndromes (STEMI vs NSTEMI vs Unstable Angina)',
    subject: 'Medicine',
    system: 'Cardiovascular System',
    amcRelevance: 'Essential',
    difficulty: 'Hard',
    summary: 'Spectrum of clinical conditions ranging from unstable angina to non-ST-segment elevation myocardial infarction (NSTEMI) and ST-segment elevation myocardial infarction (STEMI), caused by acute disruption of atherosclerotic plaques.',
    keyFacts: [
      'STEMI: Persistent ST elevation ≥1mm in ≥2 contiguous leads (or ≥2mm in V2-V3 in men, ≥1.5mm in women) or new LBBB with positive cardiac biomarkers.',
      'NSTEMI: Myocardial necrosis with elevated Troponin without ST-segment elevation (may show ST depression or T-wave inversion).',
      'Unstable Angina: Ischemic chest pain at rest or with minimal exertion with normal cardiac biomarkers.'
    ],
    clinicalPearls: [
      'Primary PCI within 90 minutes of medical contact is the gold standard for STEMI. If transfer time >120 minutes, administer fibrinolysis within 30 minutes unless contraindicated.',
      'Dual antiplatelet therapy (Aspirin 300mg + Ticagrelor 180mg or Clopidogrel 300-600mg) reduces recurrent ischemic events and stent thrombosis.',
      'Right ventricular infarction (inferior STEMI + hypotension + clear lungs + elevated JVP) is preload dependent: DO NOT give Nitrates or Diuretics; give IV fluid bolus.'
    ],
    diagnosticCriteria: [
      'Rise and/or fall of cardiac biomarkers (preferably high-sensitivity cardiac troponin) above the 99th percentile URL with at least one: ischemic symptoms, new ischemic ECG changes, pathological Q waves, imaging evidence of loss of viable myocardium.'
    ],
    importantInvestigations: [
      '12-lead ECG within 10 minutes of arrival.',
      'High-sensitivity Cardiac Troponin (0h and 1h or 0h and 3h algorithms).',
      'Chest X-Ray (to rule out aortic dissection / pulmonary edema).',
      'Echocardiogram to assess regional wall motion abnormalities and ejection fraction.',
      'Urgent Coronary Angiography.'
    ],
    managementPrinciples: [
      'STEMI: MONA-B + PCI (Morphine, Oxygen only if SpO2 <90%, Nitrates, Aspirin 300mg, Beta-blocker if stable, Statin high-intensity).',
      'NSTEMI: Risk stratification using GRACE / TIMI score. High risk (refractory pain, hemodynamically unstable, sustained VT) requires early invasive strategy within 24 hours.',
      'Long-term secondary prevention: DAPT (12 months), Beta-blocker, High-dose Statin (Atorvastatin 80mg), ACE inhibitor/ARB, lifestyle modifications.'
    ],
    drugFacts: [
      'Aspirin 300mg loading dose (chewed for rapid absorption).',
      'Ticagrelor 180mg loading, then 90mg BD.',
      'Unfractionated Heparin (STEMI/PCI) or Enoxaparin 1mg/kg BD (NSTEMI).'
    ],
    redFlags: [
      'Hemodynamic instability, cardiogenic shock (hypotension + cold extremities + pulmonary rales).',
      'Ventricular tachycardia / Ventricular fibrillation (primary cause of out-of-hospital cardiac arrest).',
      'Mechanical complications (papillary muscle rupture causing acute severe mitral regurgitation, ventricular septal defect, free wall rupture with tamponade).'
    ],
    commonExamTraps: [
      'Giving nitrates to a patient with inferior STEMI and RV involvement (causes fatal drop in cardiac output).',
      'Giving supplemental oxygen to non-hypoxemic patients (causes coronary vasoconstriction and increased oxidative injury).',
      'Withholding PCI in elderly patients based solely on chronological age.'
    ],
    quickRevisionPoints: [
      'Inferior leads: II, III, aVF (RCA).',
      'Anterior/Septal leads: V1-V4 (LAD).',
      'Lateral leads: I, aVL, V5, V6 (LCx).',
      'Posterior MI: Tall R wave + ST depression in V1-V3 (check V7-V9).'
    ]
  },
  {
    id: 'hy-2',
    title: 'Abdominal Aortic Aneurysm (AAA) - Screening, Rupture & Repair',
    subject: 'Surgery',
    system: 'Cardiovascular System',
    amcRelevance: 'Essential',
    difficulty: 'Hard',
    summary: 'Localized abnormal dilation of the abdominal aorta greater than 3 cm or 50% larger than normal diameter, most commonly infrarenal. Rupture is a catastrophic vascular surgical emergency.',
    keyFacts: [
      'Most AAAs are asymptomatic and discovered incidentally on physical exam or abdominal imaging.',
      'Classical triad of ruptured AAA: Sudden severe abdominal/back pain, pulsatile abdominal mass, and hypotension.',
      'Elective surgical repair indicated when diameter ≥ 5.5 cm in males, ≥ 5.0 cm in females, or rapid growth (> 1 cm/year or > 0.5 cm/6 months).'
    ],
    clinicalPearls: [
      'In a hemodynamically unstable patient with known AAA or risk factors and acute back pain, proceed DIRECTLY to the operating theatre without delaying for CT angiography.',
      'In hemodynamically stable patients with suspected symptomatic or contained rupture, urgent Contrast-Enhanced CT Angiography of abdomen and pelvis is the gold standard.',
      'Permissive hypotension (target SBP 80-100 mmHg) prevents clot disruption while maintaining cerebral and coronary perfusion before vascular clamp placement.'
    ],
    diagnosticCriteria: [
      'Aortic diameter ≥ 3.0 cm on abdominal ultrasound or CT scan.',
      'Surveillance intervals: 3.0–3.9 cm (every 2-3 years), 4.0–4.9 cm (every 1 year), 5.0–5.4 cm (every 3-6 months).'
    ],
    importantInvestigations: [
      'Bedside POCUS / Abdominal Ultrasound (100% sensitive for detecting AAA presence; poor for detecting rupture).',
      'CT Angiography Abdomen/Pelvis (definitive anatomical planning for EVAR vs Open repair).',
      'Cross-match 6-10 units of packed RBCs, FFP, platelets, and fibrinogen.'
    ],
    managementPrinciples: [
      'Ruptured AAA: Immediate vascular surgery activation, high-flow oxygen, large-bore IV access, permissive hypotension, massive transfusion protocol.',
      'Endovascular Aneurysm Repair (EVAR) vs Open Transabdominal Aortic Grafting.',
      'Medical risk factor management: Smoking cessation (most important modifiable risk factor), Statin, tight BP control.'
    ],
    drugFacts: [
      'Statins and antiplatelets for all patients with documented AAA to reduce cardiovascular mortality.',
      'Avoid high-volume crystalloid resuscitation (causes hemodilution, coagulopathy, and dislodgement of hemostatic clot).'
    ],
    redFlags: [
      'Sudden syncope or unexplained hypotension in elderly male smoker with back pain.',
      'Flank ecchymosis (Grey Turner sign) or periumbilical ecchymosis (Cullen sign) indicating retroperitoneal hemorrhage.',
      'Aortoenteric fistula presenting with "herald bleed" gastrointestinal hemorrhage in patients with prior aortic graft repair.'
    ],
    commonExamTraps: [
      'Misdiagnosing ruptured AAA as renal colic / nephrolithiasis or acute lumbosacral disc herniation in an older patient.',
      'Sending an unstable patient to the CT scanner instead of straight to the operating room.'
    ],
    quickRevisionPoints: [
      'Screening: Ultrasound screening for men aged 65-75 with any smoking history.',
      'Major risk factors: Male sex, advanced age, cigarette smoking, atherosclerosis, family history.'
    ]
  },
  {
    id: 'hy-3',
    title: 'Paediatric Croup (Laryngotracheobronchitis) vs Epiglottitis',
    subject: 'Paediatrics',
    system: 'Respiratory System',
    amcRelevance: 'Essential',
    difficulty: 'Medium',
    summary: 'Viral infection of the upper respiratory tract causing subglottic edema, characterized by barking cough, inspiratory stridor, hoarseness, and respiratory distress in young children (6 months to 3 years).',
    keyFacts: [
      'Most common pathogen: Parainfluenza virus (Types 1 and 2).',
      'Peak incidence: Autumn/winter, typically ages 6 months to 3 years.',
      'Westley Croup Score categorizes into Mild (barking cough, no stridor at rest), Moderate (stridor at rest, mild retractions), and Severe (stridor at rest, severe chest indrawing, agitation).'
    ],
    clinicalPearls: [
      'Single dose of oral Dexamethasone (0.15 mg/kg to 0.6 mg/kg) is the cornerstone of treatment for ALL severities of croup (including mild).',
      'Nebulized adrenaline (0.5 mL/kg of 1:1000, max 5 mL) provides rapid reduction in airway edema within 10-30 minutes for moderate-to-severe croup with stridor at rest.',
      'Observe for at least 2-4 hours after nebulized adrenaline for rebound stridor.'
    ],
    diagnosticCriteria: [
      'Clinical diagnosis based on history of prodromal viral coryza followed by characteristic seal-like barking cough, inspiratory stridor, and hoarseness.'
    ],
    importantInvestigations: [
      'Clinical diagnosis — avoid upsetting the child with unnecessary blood tests or swabs.',
      'Neck X-ray (AP view) shows classic "Steeple sign" (subglottic narrowing), but is NOT required for diagnosis.'
    ],
    managementPrinciples: [
      'Keep child calm on parent’s lap; minimize distressing interventions (crying worsens subglottic edema).',
      'Mild: Oral Dexamethasone (0.15 mg/kg), discharge with clear parental advice.',
      'Moderate/Severe: Oral/IM Dexamethasone (0.6 mg/kg) + Nebulized Adrenaline (1:1000) with high-flow oxygen.',
      'Impending respiratory failure: ICU consult, Senior anesthesiologist/ENT for endotracheal intubation (use tube 0.5-1.0 size smaller due to subglottic swelling).'
    ],
    drugFacts: [
      'Oral Dexamethasone: 0.15 mg/kg (equally effective as 0.6 mg/kg for mild-moderate croup, onset within 1-2 hours).',
      'Nebulized Adrenaline 1:1000: 4 mL (0.5 mL/kg) via nebulizer with 6-8 L/min oxygen flow.'
    ],
    redFlags: [
      'Stridor at rest, sternal/intercostal chest wall indrawing, lethargy, cyanosis, drooling (drooling suggests acute epiglottitis or peritonsillar/retropharyngeal abscess).'
    ],
    commonExamTraps: [
      'Examining the throat with a tongue depressor in a child with suspected epiglottitis (can trigger fatal acute laryngospasm).',
      'Withholding oral steroids in mild croup.'
    ],
    quickRevisionPoints: [
      'Croup: Parainfluenza, barking seal cough, subglottic steeple sign, dexamethasone.',
      'Epiglottitis: H. influenzae type b, rapid toxic onset, high fever, tripod position, drooling, thumbprint sign, urgent intubation.'
    ]
  },
  {
    id: 'hy-4',
    title: 'Ectopic Pregnancy - Clinical Presentation, Ultrasound & Management',
    subject: "Women's Health (O&G)",
    system: 'Reproductive & Obstetrics',
    amcRelevance: 'Essential',
    difficulty: 'Hard',
    summary: 'Implantation of a fertilized ovum outside the uterine cavity, most frequently in the ampulla of the fallopian tube (95%). Ruptured ectopic pregnancy is a leading cause of maternal mortality in the first trimester.',
    keyFacts: [
      'Classic triad: Amenorrhea (6-8 weeks), unilateral pelvic/lower abdominal pain, and abnormal vaginal bleeding.',
      'Risk factors: Prior ectopic pregnancy (highest risk), history of pelvic inflammatory disease (PID / Chlamydia), previous tubal surgery, endometriosis, smoking, conception with IUD in situ or IVF.'
    ],
    clinicalPearls: [
      'ALWAYS order a urine and quantitative serum beta-hCG in any woman of reproductive age presenting with abdominal/pelvic pain or unexplained syncope.',
      'Discriminatory zone: Transvaginal ultrasound should visualize an intrauterine gestational sac when serum beta-hCG reaches 1,500–2,000 IU/L. An empty uterus above this threshold is ectopic until proven otherwise.',
      'Shoulder tip pain (Kehr sign) indicates diaphragmatic irritation from significant hemoperitoneum.'
    ],
    diagnosticCriteria: [
      'Transvaginal ultrasound showing extrauterine gestational sac (with or without yolk sac/fetal pole) or "tubal ring sign" (adnexal mass with ring-of-fire vascularity), free fluid in pouch of Douglas.',
      'Suboptimal serial beta-hCG rise (<35-53% increase over 48 hours).'
    ],
    importantInvestigations: [
      'Serum quantitative beta-hCG (serial at 0h and 48h).',
      'Transvaginal pelvic ultrasound (TVS).',
      'Full blood count, Group & Save, Cross-match, Rhesus blood group (give Anti-D immunoglobulin to Rh-negative mothers).'
    ],
    managementPrinciples: [
      'Ruptured / Unstable: Immediate emergency laparoscopy / laparotomy with Salpingectomy, fluid resuscitation, crossmatched blood, Anti-D immunoglobulin.',
      'Medical Management (Methotrexate IM): Criteria: Hemodynamically stable, beta-hCG <5,000 IU/L, no fetal cardiac activity on ultrasound, ectopic mass <3.5 cm, no severe pain, reliable for follow-up.',
      'Surgical (Laparoscopic Salpingectomy vs Salpingostomy): For unstable patients, contraindications to methotrexate, or large ectopic mass.'
    ],
    drugFacts: [
      'Methotrexate: 50 mg/m2 IM single dose. Monitor beta-hCG on days 4 and 7 (expect >15% drop between day 4 and 7).',
      'Anti-D immunoglobulin (RhD immunoglobulin): 250 IU (first trimester) for all RhD-negative non-sensitized women.'
    ],
    redFlags: [
      'Sudden excruciating lower abdominal pain, cervical motion tenderness, peritoneal signs, tachycardia, hypotension, dizziness/syncope.'
    ],
    commonExamTraps: [
      'Forgetting Anti-D immunoglobulin in Rh-negative mothers.',
      'Assuming that a normal intrauterine endometrial stripe rules out ectopic pregnancy (a pseudo-gestational sac can be seen in ectopic pregnancy).'
    ],
    quickRevisionPoints: [
      'Ampulla (70%) > Isthmus (12%) > Fimbria (11%) > Interstitial/Cornual (2% - dangerous, late rupture with massive hemorrhage).',
      'Methotrexate side effects: Abdominal cramping (separation pain), elevated transaminases, stomatitis.'
    ]
  },
  {
    id: 'hy-5',
    title: 'Australian Medical Council (AMC) Medical Ethics & Informed Consent',
    subject: 'Population Health & Ethics',
    system: 'Ethics, Legal & Australian Healthcare',
    amcRelevance: 'Essential',
    difficulty: 'Medium',
    summary: 'Core legal, ethical, and clinical governance principles governing Australian medical practice, including valid informed consent, patient autonomy, confidentiality, mandatory reporting, and culturally safe care.',
    keyFacts: [
      'Informed consent requires: 1) Capacity, 2) Voluntary decision without coercion, 3) Sufficient information regarding nature, risks, benefits, and alternatives (including no treatment).',
      'The "Material Risk" Test (Rogers v Whitaker): A doctor must warn of risks that a reasonable person would attach significance to, or that this particular patient has expressed concern about.',
      'Emergency Doctrine: Treatment can be given without consent if immediately necessary to save life or prevent serious deterioration in health and patient lacks capacity.'
    ],
    clinicalPearls: [
      'Gillick Competence / Mature Minor: A child under 18 can give valid consent for medical treatment if they have sufficient understanding and intelligence to fully comprehend what is proposed.',
      'Confidentiality can be breached without consent ONLY when: mandated by law (court subpoena, notifiable infectious diseases, mandatory reporting of child abuse), or where failure to disclose puts the patient or community at serious risk of harm (e.g. imminently violent psychiatric patient).',
      'Aboriginal and Torres Strait Islander health: Practice trauma-informed, culturally safe healthcare; offer Aboriginal Health Worker or Liaison Officer.'
    ],
    diagnosticCriteria: [
      'Assessment of decision-making capacity: Patient must be able to 1) Understand the information, 2) Retain the information, 3) Weigh the risks and benefits, 4) Communicate their choice.'
    ],
    importantInvestigations: [
      'Cognitive assessment (Mini-Mental State Exam, MoCA) when capacity is in doubt.',
      'Check for Advance Health Directives or Enduring Power of Attorney (Medical Treatment).'
    ],
    managementPrinciples: [
      'Hierarchy of medical decision makers for incapacitated adults in Australia: 1) Advance Health Directive, 2) Appointed Enduring Guardian / Medical Treatment Decision Maker, 3) Statutory next-of-kin (spouse/partner > adult child > parent > sibling), 4) Public Guardian / Civil Tribunal.',
      'Notifiable conditions in Australia: Tuberculosis, Measles, Meningococcal disease, HIV, Syphilis, Hepatitis A/B/C, COVID-19, pertussis.'
    ],
    drugFacts: [
      'Prescribing schedule 8 medications (opioids, stimulants) requires strict adherence to state drug and poisons legislation and real-time prescription monitoring (SafeScript in Australia).'
    ],
    redFlags: [
      'Suspected child physical abuse, sexual abuse, or neglect requires mandatory reporting to Child Protection services by law in all Australian states/territories.',
      'Impaired medical practitioner (drugs/alcohol/severe psychiatric illness posing danger to public) triggers mandatory notification to AHPRA (Australian Health Practitioner Regulation Agency).'
    ],
    commonExamTraps: [
      'Relying on family members as language interpreters instead of accredited Professional Telephone / Face-to-Face Healthcare Interpreters (TIS National).',
      'Refusing to accept a competent adult Jehovah’s Witness’s informed refusal of life-saving blood transfusions (autonomy must be respected if capacity is intact).'
    ],
    quickRevisionPoints: [
      'Rogers v Whitaker: Landmark Australian informed consent case on material risk disclosure.',
      'AHPRA: Medical Board of Australia regulator.',
      'TIS: Translating and Interpreting Service (131 450).'
    ]
  }
];
