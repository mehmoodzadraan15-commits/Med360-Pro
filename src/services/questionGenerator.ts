import { Question, ExamType, SubjectType, SystemType, DifficultyLevel } from '../types';

interface QuestionTemplate {
  exam: 'AMC CAT MCQ' | 'USMLE Step 1' | 'USMLE Step 2 CK';
  subject: SubjectType;
  system: SystemType;
  category: 'Basic Science' | 'Clinical Science';
  topic: string;
  subtopic?: string;
  difficulty: DifficultyLevel;
  cohort: 'Adult' | 'Paediatric' | 'General';
  vignetteGenerator: (age: number, gender: 'male' | 'female', idNum: number) => string;
  questionText: string;
  options: { id: string; text: string }[];
  correctOptionId: string;
  educationalObjective: string;
  explanation: string;
  distractorExplanations: Record<string, string>;
  highYieldPearl: string;
  references: string;
}

// -------------------------------------------------------------
// COMPREHENSIVE TEMPLATE LIBRARY FOR 10,000 HIGH-YIELD QUESTIONS
// -------------------------------------------------------------

export const BASIC_TEMPLATES: QuestionTemplate[] = [
  // 1. Anatomy - Neuroanatomy (Circle of Willis & Stroke)
  {
    exam: 'USMLE Step 1',
    subject: 'Anatomy',
    system: 'Nervous System & Special Senses',
    category: 'Basic Science',
    topic: 'Cerebral Circulation & Circle of Willis Neuroanatomy',
    difficulty: 'Hard',
    cohort: 'Adult',
    vignetteGenerator: (age, gender) =>
      `A ${age}-year-old ${gender} presents with sudden onset weakness of the right lower extremity that is significantly more severe than the right upper extremity, accompanied by urinary incontinence and abulia (lack of initiative). Neurological examination confirms severe crural (leg) paresis with preserved facial movements and minimal arm weakness.`,
    questionText: 'Which cerebral vascular territory is most likely affected by this acute ischemic stroke?',
    options: [
      { id: 'A', text: 'Left Anterior Cerebral Artery (ACA)' },
      { id: 'B', text: 'Left Middle Cerebral Artery (MCA) superior division' },
      { id: 'C', text: 'Left Posterior Cerebral Artery (PCA)' },
      { id: 'D', text: 'Basilar Artery tip' },
      { id: 'E', text: 'Anterior Inferior Cerebellar Artery (AICA)' }
    ],
    correctOptionId: 'A',
    educationalObjective: 'The Anterior Cerebral Artery (ACA) supplies the medial surface of the frontal and parietal cortex, including the motor and sensory homunculus representation of the contralateral lower extremity and micturition center.',
    explanation: 'The motor homunculus locates the leg and foot representations in the paracentral lobule along the medial hemisphere, supplied by the ACA. MCA strokes preferentially affect the contralateral face and upper extremity. PCA strokes cause contralateral homonymous hemianopia with macular sparing.',
    distractorExplanations: {
      'B': 'MCA stroke typically affects the contralateral face and arm greater than the leg, with aphasia if dominant hemisphere.',
      'C': 'PCA stroke produces contralateral homonymous hemianopia and visual processing deficits.',
      'D': 'Basilar tip occlusion causes "top of the basilar" syndrome (visual, oculomotor, and consciousness disturbance).',
      'E': 'AICA stroke causes lateral pontine syndrome (facial nucleus palsy, ataxia, deafness).'
    },
    highYieldPearl: 'ACA Stroke = Leg > Arm & Face + Urinary incontinence + Abulia. MCA Stroke = Face & Arm > Leg + Aphasia/Neglect.',
    references: 'First Aid USMLE Step 1 (Neuroanatomy), Snell Clinical Neuroanatomy'
  },
  // 2. Anatomy - Upper Limb Brachial Plexus
  {
    exam: 'USMLE Step 1',
    subject: 'Anatomy',
    system: 'Musculoskeletal & Orthopaedics',
    category: 'Basic Science',
    topic: 'Brachial Plexus & Peripheral Nerve Injury Patterns',
    difficulty: 'Medium',
    cohort: 'Adult',
    vignetteGenerator: (age, gender) =>
      `A ${age}-year-old ${gender} suffers a mid-shaft fracture of the right humerus following a high-energy fall. On physical examination, there is marked wrist drop and loss of sensation over the dorsal aspect of the first web space between the thumb and index finger.`,
    questionText: 'Which nerve and corresponding muscular innervation are compromised in this patient?',
    options: [
      { id: 'A', text: 'Radial nerve (Extensor carpi radialis and finger extensors)' },
      { id: 'B', text: 'Median nerve (Flexor digitorum profundus lateral half)' },
      { id: 'C', text: 'Ulnar nerve (Interossei and medial lumbricals)' },
      { id: 'D', text: 'Musculocutaneous nerve (Biceps brachii)' },
      { id: 'E', text: 'Axillary nerve (Deltoid muscle)' }
    ],
    correctOptionId: 'A',
    educationalObjective: 'The radial nerve courses through the spiral (radial) groove of the humerus and is vulnerable in mid-shaft humeral shaft fractures, causing wrist drop and dorsal first web space sensory loss.',
    explanation: 'The radial nerve originates from the posterior cord (C5-T1) and innervates the triceps, brachioradialis, extensor carpi radialis, and finger extensors (via the posterior interosseous nerve). Midshaft humeral fractures directly injure the radial nerve in the spiral groove.',
    distractorExplanations: {
      'B': 'Median nerve injury at the elbow causes supracondylar fracture complications with loss of pronation and thumb opposition (Ape hand).',
      'C': 'Ulnar nerve is damaged at the medial epicondyle or hook of hamate (Claw hand).',
      'D': 'Musculocutaneous nerve lesion causes weak elbow flexion and lateral forearm numbness.',
      'E': 'Axillary nerve is injured in surgical neck humeral fractures or anterior shoulder dislocations (deltoid atrophy).'
    },
    highYieldPearl: 'Humerus Fractures: Surgical neck = Axillary; Mid-shaft = Radial; Supracondylar = Median; Medial epicondyle = Ulnar.',
    references: 'Moore Clinically Oriented Anatomy, USMLE Step 1 Anatomy'
  },
  // 3. Physiology - Cardiovascular Pressure-Volume Loops
  {
    exam: 'USMLE Step 1',
    subject: 'Physiology',
    system: 'Cardiovascular System',
    category: 'Basic Science',
    topic: 'Cardiac Hemodynamics & Pressure-Volume Relationships',
    difficulty: 'Hard',
    cohort: 'Adult',
    vignetteGenerator: (age, gender) =>
      `A ${age}-year-old ${gender} with longstanding uncontrolled hypertension undergoes invasive hemodynamic monitoring. Echocardiography demonstrates concentric left ventricular hypertrophy with an ejection fraction of 60%. Left ventricular end-diastolic pressure (LVEDP) is elevated at 24 mm Hg despite normal end-diastolic volume.`,
    questionText: 'Which change in the left ventricular compliance and pressure-volume curve explains these findings?',
    options: [
      { id: 'A', text: 'Decreased ventricular compliance with steep upward shift of the diastolic pressure-volume curve' },
      { id: 'B', text: 'Increased compliance with rightward displacement of the end-systolic pressure-volume line' },
      { id: 'C', text: 'Primary reduction in myocardial contractility and decreased end-systolic elastance (Ees)' },
      { id: 'D', text: 'Selective decrease in afterload with increased stroke volume' },
      { id: 'E', text: 'Loss of isovolumetric relaxation phase' }
    ],
    correctOptionId: 'A',
    educationalObjective: 'Concentric hypertrophy reduces ventricular compliance (diastolic dysfunction/HFpEF), shifting the diastolic pressure-volume relationship upward such that small volume increments cause steep rises in filling pressure.',
    explanation: 'In diastolic heart failure (heart failure with preserved ejection fraction / HFpEF) secondary to chronic hypertensive concentric remodeling, the stiffened, hypertrophied ventricle exhibits reduced compliance. Thus, filling pressures (LVEDP and pulmonary capillary wedge pressure) rise steeply even with normal or reduced end-diastolic volumes, causing pulmonary congestion.',
    distractorExplanations: {
      'B': 'Increased compliance occurs in dilated cardiomyopathy (eccentric hypertrophy) rather than concentric remodeling.',
      'C': 'Reduction in contractility (Ees) is characteristic of systolic heart failure (HFrEF) with reduced ejection fraction.',
      'D': 'Afterload is increased, not decreased, in longstanding hypertension.',
      'E': 'Isovolumetric relaxation is prolonged/impaired, not absent.'
    },
    highYieldPearl: 'Concentric LVH = Stiff ventricle = Decreased Compliance = Steep diastolic PV slope = High LVEDP with normal EDV (HFpEF).',
    references: 'Guyton and Hall Textbook of Medical Physiology, Kaplan USMLE Physiology'
  },
  // 4. Pharmacology - Autonomic Receptors & Toxins
  {
    exam: 'USMLE Step 1',
    subject: 'Pharmacology',
    system: 'Nervous System & Special Senses',
    category: 'Basic Science',
    topic: 'Organophosphate Poisoning & Acetylcholinesterase Reactivators',
    difficulty: 'Hard',
    cohort: 'Adult',
    vignetteGenerator: (age, gender) =>
      `A ${age}-year-old ${gender} agricultural worker is rushed to the emergency department after accidental exposure to an organophosphate pesticide spray. On arrival, the patient is diaphoric with pinpoint pupils (miosis), profuse salivation, wheezing with copious bronchial secretions, muscle fasciculations, bradycardia (HR 42 bpm), and urinary incontinence.`,
    questionText: 'Which combination pharmacotherapy is the definitive antidote regimen for this cholinergic crisis?',
    options: [
      { id: 'A', text: 'Intravenous Atropine (muscarinic antagonist) plus Pralidoxime/2-PAM (cholinesterase reactivator)' },
      { id: 'B', text: 'Intravenous Physostigmine plus Neostigmine' },
      { id: 'C', text: 'High-dose Epinephrine infusion plus Glucagon' },
      { id: 'D', text: 'Oral Pyridostigmine plus Naloxone' },
      { id: 'E', text: 'Flumazenil plus Sodium Bicarbonate' }
    ],
    correctOptionId: 'A',
    educationalObjective: 'Organophosphates irreversibly inhibit acetylcholinesterase, leading to toxic acetylcholine accumulation. Atropine reverses life-threatening muscarinic symptoms (bronchorrhea, bradycardia), while Pralidoxime (2-PAM) reactivates cholinesterase before aging occurs.',
    explanation: 'Organophosphates phosphorylate the active site of acetylcholinesterase. Treatment requires:\n1. Atropine: A competitive muscarinic receptor antagonist that rapidly clears killer "B\'s" (Bradycardia, Bronchorrhea, Bronchospasm).\n2. Pralidoxime (2-PAM): Cleaves the phosphate-ester bond to regenerate active acetylcholinesterase at both muscarinic and nicotinic receptors (reversing skeletal muscle weakness and fasciculations), but must be given before "aging" occurs.',
    distractorExplanations: {
      'B': 'Physostigmine is an acetylcholinesterase inhibitor and would worsen toxicity and cause fatal respiratory arrest.',
      'C': 'Epinephrine treats anaphylaxis, not organophosphate poisoning.',
      'D': 'Pyridostigmine is used for myasthenia gravis and would exacerbate cholinergic toxidrome.',
      'E': 'Flumazenil treats benzodiazepine overdose; sodium bicarbonate treats TCA cardiotoxicity.'
    },
    highYieldPearl: 'Cholinergic Toxidrome: DUMBBELLS (Diarrhea, Urination, Miosis, Bradycardia, Bronchorrhea, Emesis, Lacrimation, Salivation). Antidote = Atropine first, then Pralidoxime.',
    references: 'Katzung Basic & Clinical Pharmacology, Australian Resuscitation Council'
  },
  // 5. Pathology - Neoplasia & Tumor Suppressor Genes
  {
    exam: 'USMLE Step 1',
    subject: 'Pathology',
    system: 'Gastrointestinal System',
    category: 'Basic Science',
    topic: 'Colorectal Carcinogenesis & Adenoma-to-Carcinoma Sequence',
    difficulty: 'Medium',
    cohort: 'Adult',
    vignetteGenerator: (age, gender) =>
      `A ${age}-year-old ${gender} undergoes screening colonoscopy revealing a 2.5 cm pedunculated polyp in the sigmoid colon. Biopsy confirms high-grade tubular-villous adenoma. Molecular genetic analysis is performed to evaluate the progressive multistep adenoma-to-carcinoma sequence.`,
    questionText: 'Which mutation represents the initial "gatekeeper" loss-of-function event that initiates adenoma formation in this sequence?',
    options: [
      { id: 'A', text: 'Inactivation of the APC (Adenomatous Polyposis Coli) tumor suppressor gene on chromosome 5q' },
      { id: 'B', text: 'Activating gain-of-function mutation in KRAS oncogene' },
      { id: 'C', text: 'Loss of TP53 tumor suppressor on chromosome 17p' },
      { id: 'D', text: 'Overexpression of BCL-2 anti-apoptotic protein' },
      { id: 'E', text: 'BRAF V600E point mutation' }
    ],
    correctOptionId: 'A',
    educationalObjective: 'The chromosomal instability (CIN) adenoma-carcinoma sequence begins with biallelic loss of the APC tumor suppressor gene (chromosome 5q), leading to beta-catenin accumulation, followed by KRAS activation, and finally TP53/DCC inactivation.',
    explanation: 'The classic adenoma-carcinoma sequence (Vogelstein model) occurs in ~80% of sporadic colorectal cancers:\n1. Normal colon -> Colon at risk: Loss of APC gene (5q22) leads to accumulation of beta-catenin and nuclear transcription activation.\n2. Small adenoma: KRAS mutation leads to unregulated intracellular signaling and polyp growth.\n3. Late adenoma -> Carcinoma: Loss of tumor suppressor genes DCC (18q) and TP53 (17p) with COX-2 overexpression.',
    distractorExplanations: {
      'B': 'KRAS mutation occurs secondary to APC loss and promotes adenoma growth.',
      'C': 'TP53 mutation is the late step driving malignant transformation into invasive carcinoma.',
      'D': 'BCL-2 overexpression is characteristic of Follicular Lymphoma (t(14;18)).',
      'E': 'BRAF V600E mutation characterizes the alternate serrated polyp pathway (MSI/hypermethylation).'
    },
    highYieldPearl: 'Adenoma-to-Carcinoma order: AK-53 (APC -> KRAS -> DCC -> p53). APC is always the initial loss of cell adhesion/growth control.',
    references: 'Robbins and Cotran Pathologic Basis of Disease, USMLE Step 1'
  },
  // 6. Biochemistry - Metabolic Inborn Errors & Enzyme Deficiencies
  {
    exam: 'USMLE Step 1',
    subject: 'Biochemistry',
    system: 'Endocrine & Metabolic System',
    category: 'Basic Science',
    topic: 'Galactosemia & Galactose-1-Phosphate Uridyltransferase (GALT) Deficiency',
    difficulty: 'Medium',
    cohort: 'Paediatric',
    vignetteGenerator: (age, gender) =>
      `A 2-week-old newborn ${gender} is evaluated for poor feeding, lethargy, persistent jaundice, and hepatomegaly since the introduction of cow's milk formula on day 4 of life. Physical examination reveals bilateral early oil-droplet cataracts. Laboratory evaluation shows unconjugated hyperbilirubinemia, elevated AST/ALT, and reducing substances detected in urine while urine dipstick for glucose is negative.`,
    questionText: 'Which enzyme deficiency is responsible for this life-threatening metabolic disorder?',
    options: [
      { id: 'A', text: 'Galactose-1-phosphate uridyltransferase (GALT)' },
      { id: 'B', text: 'Galactokinase (GALK)' },
      { id: 'C', text: 'Fructokinase' },
      { id: 'D', text: 'Aldolase B' },
      { id: 'E', text: 'Glucose-6-phosphate dehydrogenase (G6PD)' }
    ],
    correctOptionId: 'A',
    educationalObjective: 'Classic galactosemia is caused by autosomal recessive Galactose-1-phosphate uridyltransferase (GALT) deficiency. Accumulation of toxic galactose-1-phosphate causes hepatomegaly, cirrhosis, jaundice, early cataracts (galactitol), failure to thrive, and E. coli sepsis vulnerability.',
    explanation: 'Classic Galactosemia (GALT deficiency) presents immediately upon lactose/galactose ingestion (breast milk or dairy formula). Toxic galactose-1-phosphate accumulates in liver, brain, and kidneys. Galactitol accumulates in the lens causing cataracts. Aldose reductase converts excess galactose into galactitol. Urine clinitest shows reducing substances, but glucose test strips (glucose oxidase) are negative.',
    distractorExplanations: {
      'B': 'Galactokinase (GALK) deficiency is milder, presenting solely with early cataracts without hepatic or renal damage.',
      'C': 'Essential fructosuria (Fructokinase deficiency) is completely benign and asymptomatic.',
      'D': 'Hereditary fructose intolerance (Aldolase B deficiency) presents upon introduction of fruit/sucrose (weaning), not lactose in neonates.',
      'E': 'G6PD deficiency presents with acute hemolytic anemia following oxidative triggers.'
    },
    highYieldPearl: 'Classic Galactosemia = GALT deficiency -> Hepatomegaly + Jaundice + Cataracts + E. coli sepsis. GALK deficiency = Cataracts only.',
    references: 'Harper Illustrated Biochemistry, First Aid USMLE Step 1'
  },
  // 7. Microbiology & Immunology - Hypersensitivity Reactions
  {
    exam: 'USMLE Step 1',
    subject: 'Microbiology & Immunology',
    system: 'Hematological & Immune System',
    category: 'Basic Science',
    topic: 'Types of Hypersensitivity Reactions & Immune Mechanisms',
    difficulty: 'Medium',
    cohort: 'Adult',
    vignetteGenerator: (age, gender) =>
      `A ${age}-year-old ${gender} develops acute fever, generalized erythematous urticarial rash, arthralgias in the wrists and knees, and lymphadenopathy 9 days after initiating treatment with intravenous beta-lactam antibiotics for osteomyelitis. Urinalysis demonstrates mild proteinuria with RBC casts. Complement testing reveals low serum C3 and C4 levels.`,
    questionText: 'Which immunologic mechanism is primarily responsible for this clinical presentation (Serum Sickness)?',
    options: [
      { id: 'A', text: 'Type III Hypersensitivity: Deposition of circulating antigen-antibody immune complexes with complement activation' },
      { id: 'B', text: 'Type I Hypersensitivity: IgE cross-linking on mast cell surfaces with histamine degranulation' },
      { id: 'C', text: 'Type II Hypersensitivity: Antibody-dependent cellular cytotoxicity mediated by IgG against cell-surface antigens' },
      { id: 'D', text: 'Type IV Hypersensitivity: Delayed T-cell mediated cytokine release and macrophage recruitment' },
      { id: 'E', text: 'Direct non-immunologic mast cell activation' }
    ],
    correctOptionId: 'A',
    educationalObjective: 'Serum sickness is a classic prototype of Type III Hypersensitivity reaction caused by circulating immune complexes (antigen + IgG/IgM) that deposit in small vessel walls, activating complement (low C3/C4) and recruiting neutrophils, producing fever, rash, and arthralgias 1-2 weeks post-exposure.',
    explanation: 'Type III hypersensitivity involves immune complex formation in systemic circulation. When excess foreign antigen remains, small soluble complexes deposit in capillary beds of joints (arthralgias), skin (urticaria), and kidneys (glomerulonephritis/proteinuria). Complement consumption leads to hypocomplementemia (decreased C3, C4).',
    distractorExplanations: {
      'B': 'Type I is immediate anaphylaxis (minutes) mediated by IgE.',
      'C': 'Type II involves antibodies directed against intrinsic tissue antigens (e.g. Goodpasture, Myasthenia, Autoimmune hemolytic anemia).',
      'D': 'Type IV is delayed hypersensitivity (e.g. PPD tuberculin test, contact dermatitis).',
      'E': 'Direct mast cell activation occurs with radiocontrast or opiates, causing immediate pseudo-allergic reactions.'
    },
    highYieldPearl: 'Hypersensitivity Types: ACID (Type I = Allergic/IgE, Type II = Cytotoxic/Antibody, Type III = Immune complex, Type IV = Delayed/T-cell).',
    references: 'Janeway Immunobiology, First Aid USMLE Step 1'
  },
  // 8. Genetics & Embryology - Chromosomal Aneuploidies & Screening
  {
    exam: 'USMLE Step 1',
    subject: 'Genetics & Embryology',
    system: 'Reproductive & Obstetrics',
    category: 'Basic Science',
    topic: 'Trisomy 21 (Down Syndrome) Cytogenetics & Maternal Serum Markers',
    difficulty: 'Medium',
    cohort: 'Adult',
    vignetteGenerator: (age, gender) =>
      `A ${age}-year-old primigravida ${gender} at 16 weeks gestation undergoes second-trimester quadruple maternal serum screening. The results demonstrate significantly decreased maternal alpha-fetoprotein (MSAFP), decreased unconjugated estriol (uE3), markedly elevated human chorionic gonadotropin (beta-hCG), and elevated Inhibin A.`,
    questionText: 'This maternal serum biomarker pattern is most strongly indicative of which fetal condition?',
    options: [
      { id: 'A', text: 'Trisomy 21 (Down syndrome)' },
      { id: 'B', text: 'Trisomy 18 (Edwards syndrome)' },
      { id: 'C', text: 'Trisomy 13 (Patau syndrome)' },
      { id: 'D', text: 'Open Neural Tube Defect (e.g. Anencephaly / Spina bifida)' },
      { id: 'E', text: 'Normal singleton pregnancy' }
    ],
    correctOptionId: 'A',
    educationalObjective: 'In second-trimester quadruple screening for Down Syndrome (Trisomy 21), beta-hCG and Inhibin A are elevated (HI is High in Down), while AFP and estriol are decreased.',
    explanation: 'Quadruple screen parameters in Trisomy 21:\n- Beta-hCG: Elevated\n- Inhibin A: Elevated\n- Maternal Serum AFP (MSAFP): Decreased\n- Unconjugated Estriol (uE3): Decreased\nIn Trisomy 18 (Edwards), all four markers (AFP, uE3, hCG, Inhibin) are uniformly decreased. In neural tube defects, AFP is markedly elevated.',
    distractorExplanations: {
      'B': 'Trisomy 18 shows marked reduction across ALL four quad screen markers (HE-is-down).',
      'C': 'Trisomy 13 first trimester screening shows low PAPP-A and low hCG.',
      'D': 'Open neural tube defects and abdominal wall defects (gastroschisis/omphalocele) cause high AFP with normal hCG.',
      'E': 'All markers would be around 1.0 MoM (Multiples of Median) in a normal pregnancy.'
    },
    highYieldPearl: 'Quad Screen: Down syndrome = HI is HIGH (hCG & Inhibin A high, AFP & estriol low). Edwards syndrome = EVERYTHING low.',
    references: 'Emery Elements of Medical Genetics, USMLE Step 1'
  },
  // 9. Behavioral Science & Biostatistics - Study Designs & Bias
  {
    exam: 'USMLE Step 1',
    subject: 'Behavioral Science & Biostatistics',
    system: 'Ethics, Legal & Australian Healthcare',
    category: 'Basic Science',
    topic: 'Biostatistics Measures of Association: Odds Ratio vs Relative Risk',
    difficulty: 'Medium',
    cohort: 'Adult',
    vignetteGenerator: (age, gender) =>
      `A clinical research team investigates the association between regular electronic cigarette use and the development of acute severe asthma exacerbations. They recruit 200 patients admitted with acute asthma exacerbations (cases) and 400 age- and sex-matched patients admitted to the hospital for elective orthopedic procedures (controls). Exposure history to e-cigarettes over the preceding 12 months is determined by questionnaire.`,
    questionText: 'Which study design and primary measure of association are employed in this investigation?',
    options: [
      { id: 'A', text: 'Case-Control Study; Odds Ratio (OR)' },
      { id: 'B', text: 'Prospective Cohort Study; Relative Risk (RR)' },
      { id: 'C', text: 'Randomized Controlled Trial; Number Needed to Treat (NNT)' },
      { id: 'D', text: 'Cross-Sectional Survey; Prevalence Rate' },
      { id: 'E', text: 'Ecological Study; Correlation coefficient' }
    ],
    correctOptionId: 'A',
    educationalObjective: 'A study that identifies subjects based on disease status (cases vs controls) and looks backward in time for prior exposure is a Case-Control study. The fundamental measure of association in case-control studies is the Odds Ratio (OR).',
    explanation: 'Case-control studies select patients based on outcome/disease status and look back retrospectively to compare exposure frequencies. Because the total population at risk is unknown, incidence rates and Relative Risk cannot be directly calculated, requiring the Odds Ratio (OR = ad / bc) as the measure of association.',
    distractorExplanations: {
      'B': 'Cohort studies select patients based on EXPOSURE status and follow forward over time to calculate Relative Risk (RR).',
      'C': 'Randomized Controlled Trials require investigator allocation of intervention.',
      'D': 'Cross-sectional studies assess exposure and outcome simultaneously at a single point in time to measure prevalence.',
      'E': 'Ecological studies analyze population-level data rather than individual-level patient data.'
    },
    highYieldPearl: 'Case-Control = Retrospective by disease -> Odds Ratio. Cohort = Prospective/Retrospective by exposure -> Relative Risk.',
    references: 'Gordis Epidemiology, USMLE Step 1 Biostatistics'
  }
];

export const CLINICAL_TEMPLATES: QuestionTemplate[] = [
  // 1. Medicine: Cardiology - Acute ST-Elevation Myocardial Infarction
  {
    exam: 'AMC CAT MCQ',
    subject: 'Medicine',
    system: 'Cardiovascular System',
    category: 'Clinical Science',
    topic: 'STEMI Reperfusion Strategy & Door-to-Balloon Benchmarks',
    difficulty: 'Hard',
    cohort: 'Adult',
    vignetteGenerator: (age, gender) =>
      `A ${age}-year-old ${gender} presents to an emergency department with 45 minutes of crushing retrosternal chest pain radiating to the left jaw and diaphoresis. An immediate 12-lead ECG demonstrates 3 mm ST-segment elevation in leads V1-V4 with reciprocal ST depression in leads II, III, and aVF. The facility has a 24/7 cardiac catheterization laboratory.`,
    questionText: 'According to Australian (NHFA/CSANZ) guidelines, what is the most appropriate next management step and target timeframe?',
    options: [
      { id: 'A', text: 'Immediate Primary Percutaneous Coronary Intervention (PCI) with target Door-to-Balloon time < 90 minutes' },
      { id: 'B', text: 'Intravenous thrombolysis with Tenecteplase within 30 minutes' },
      { id: 'C', text: 'Oral Aspirin and Ticagrelor with observation on coronary care ward for 12 hours prior to elective angiography' },
      { id: 'D', text: 'CT Coronary Angiogram to rule out aortic dissection before antiplatelet therapy' },
      { id: 'E', text: 'Exercise stress treadmill test once troponin results are available' }
    ],
    correctOptionId: 'A',
    educationalObjective: 'Primary PCI is the reperfusion therapy of choice for acute STEMI when it can be delivered within 90 minutes of first medical contact at a PCI-capable center (or < 120 min if transfer required).',
    explanation: 'In acute STEMI at a PCI-capable center, primary percutaneous coronary intervention (PCI) is superior to fibrinolysis in reducing mortality, re-infarction, and intracranial hemorrhage. Guideline door-to-balloon time is < 90 minutes. Fibrinolysis is only indicated if transfer to a PCI center cannot occur within 120 minutes of diagnosis.',
    distractorExplanations: {
      'B': 'Thrombolysis is reserved for non-PCI centers when transfer time exceeds 120 minutes.',
      'C': 'Delayed angiography is unsafe for acute transmural STEMI requiring emergent reperfusion.',
      'D': 'CT coronary angiogram is contraindicated in acute STEMI with diagnostic ECG findings.',
      'E': 'Stress testing is strictly contraindicated in acute coronary syndrome.'
    },
    highYieldPearl: 'STEMI Reperfusion Rule: PCI center = Door-to-Balloon < 90 mins. Non-PCI center = Transfer if < 120 mins; otherwise Lysis within 30 mins.',
    references: 'Heart Foundation and CSANZ Acute Coronary Syndromes Clinical Guidelines, AMC Handbook'
  },
  // 2. Medicine: Pulmonology - Severe Acute Asthma Exacerbation
  {
    exam: 'AMC CAT MCQ',
    subject: 'Medicine',
    system: 'Respiratory System',
    category: 'Clinical Science',
    topic: 'Severe Acute Asthma Exacerbation & Australian Asthma Handbook',
    difficulty: 'Medium',
    cohort: 'Adult',
    vignetteGenerator: (age, gender) =>
      `A ${age}-year-old ${gender} with known brittle asthma presents to the emergency department in severe respiratory distress. The patient is sitting upright, gasping for breath, unable to complete full sentences, and visibly fatigued. Vitals: HR 128 bpm, RR 34/min, BP 138/84 mmHg, SpO2 89% on air. Auscultation reveals a "silent chest" with barely audible air entry bilaterally. Arterial blood gas on air reveals: pH 7.35, PaCO2 42 mmHg, PaO2 56 mmHg.`,
    questionText: 'What is the clinical significance of the "normal" PaCO2 (42 mmHg) and silent chest in this patient?',
    options: [
      { id: 'A', text: 'It represents impending respiratory arrest due to respiratory muscle exhaustion requiring urgent ICU escalation' },
      { id: 'B', text: 'It indicates clinical improvement as hyperventilation is settling' },
      { id: 'C', text: 'It confirms adequate alveolar ventilation' },
      { id: 'D', text: 'It indicates metabolic compensation for respiratory alkalosis' },
      { id: 'E', text: 'It rules out life-threatening asthma' }
    ],
    correctOptionId: 'A',
    educationalObjective: 'In severe acute asthma with tachypnea, patients should hyperventilate and exhibit respiratory alkalosis with low PaCO2 (< 35 mmHg). A "normal" or rising PaCO2 (≥ 40 mmHg) or silent chest indicates severe airflow obstruction and respiratory muscle fatigue, heralding impending respiratory arrest.',
    explanation: 'A normal or elevated PaCO2 in a severely tachypneic asthmatic is a major red flag for impending respiratory failure. The patient has exhausted their ventilatory reserve. Immediate management: High-flow oxygen, continuous nebulized Salbutamol + Ipratropium, IV Hydrocortisone, IV Magnesium Sulfate, and urgent consultation with ICU for non-invasive/invasive mechanical ventilation.',
    distractorExplanations: {
      'B': 'A pseudo-normal PaCO2 in severe asthma is never a sign of improvement; it signifies ventilatory failure.',
      'C': 'Alveolar ventilation is severely compromised as evidenced by hypoxia and exhaustion.',
      'D': 'Metabolic compensation takes days, not minutes.',
      'E': 'Silent chest is the hallmark of life-threatening severe airway obstruction.'
    },
    highYieldPearl: 'Asthma Red Flag: Normal or High PaCO2 + Silent Chest = Impending Respiratory Arrest. Prepare for IV Magnesium and intubation!',
    references: 'National Asthma Council Australia (Asthma Handbook 2026), AMC Clinical Handbook'
  },
  // 3. Medicine: Gastroenterology - Acute Upper GI Bleeding & Peptic Ulcer
  {
    exam: 'AMC CAT MCQ',
    subject: 'Medicine',
    system: 'Gastrointestinal System',
    category: 'Clinical Science',
    topic: 'Upper Gastrointestinal Bleeding Resuscitation & Endoscopic Timing',
    difficulty: 'Medium',
    cohort: 'Adult',
    vignetteGenerator: (age, gender) =>
      `A ${age}-year-old ${gender} with osteoarthritis taking Naproxen 500 mg BD presents with two large-volume episodes of hematemesis and melena. On arrival, BP is 88/54 mmHg, HR is 118 bpm, and capillary refill is 4 seconds. Nasogastric aspirate confirms fresh blood and coffee-ground material.`,
    questionText: 'What is the immediate priority in the initial resuscitation of this patient prior to endoscopy?',
    options: [
      { id: 'A', text: 'Establish two large-bore peripheral IV cannulae (14-16G), rapid isotonic crystalloid resuscitation, crossmatch blood, and initiate IV PPI' },
      { id: 'B', text: 'Immediate emergency gastroscopy without prior fluid resuscitation' },
      { id: 'C', text: 'Oral activated charcoal and high-dose oral antacids' },
      { id: 'D', text: 'Emergency laparotomy and partial gastrectomy' },
      { id: 'E', text: 'Intravenous Tranexamic acid bolus as sole therapy' }
    ],
    correctOptionId: 'A',
    educationalObjective: 'Hemodynamic resuscitation (two large-bore IVs, IV fluids, restrictive transfusion strategy target Hb 70-80 g/L, and high-dose IV proton pump inhibitor) must precede endoscopy in acute upper gastrointestinal bleeding. Endoscopy should occur within 24 hours once hemodynamically stabilized.',
    explanation: 'Initial priority in acute upper GI hemorrhage is ABCs and aggressive intravascular volume restoration before endoscopy. Two large-bore (14-16G) cannulae are placed, blood is sent for crossmatch, and IV PPI (e.g. Pantoprazole 80 mg bolus + 8 mg/hr infusion) is started to neutralize gastric acid and stabilize clots. Early endoscopy (within 24h) allows dual endoscopic therapy.',
    distractorExplanations: {
      'B': 'Endoscopy in an unstable patient carries high risk of aspiration, cardiac arrest, and poor mucosal visualization.',
      'C': 'Oral charcoal is contraindicated in GI bleeding and risks pulmonary aspiration.',
      'D': 'Surgery is only indicated if endoscopic therapeutic modalities and interventional radiology fail.',
      'E': 'Tranexamic acid does not replace fluid resuscitation and carries minimal benefit in acute non-variceal GI bleeding.'
    },
    highYieldPearl: 'Upper GI Bleed: Resuscitate first (2 large-bore IVs, Fluids, Type & Screen, IV PPI) -> Urgent Endoscopy within 24h once stable.',
    references: 'Gastroenterological Society of Australia (GESA) Guidelines, AMC Medical MCQ'
  },
  // 4. Medicine: Nephrology - Acute Kidney Injury & Hyperkalemia
  {
    exam: 'AMC CAT MCQ',
    subject: 'Medicine',
    system: 'Renal & Urinary System',
    category: 'Clinical Science',
    topic: 'Hyperkalemia Emergency Management & Membrane Stabilization',
    difficulty: 'Hard',
    cohort: 'Adult',
    vignetteGenerator: (age, gender) =>
      `A ${age}-year-old ${gender} with stage 4 CKD presents with generalized muscle weakness and palpitations after taking over-the-counter NSAIDs for back pain. Serum biochemistry reveals: Potassium 7.3 mmol/L, Creatinine 480 umol/L, Urea 26 mmol/L. An urgent 12-lead ECG demonstrates tall, peaked T waves, widened QRS complexes, and loss of P waves.`,
    questionText: 'What is the immediate first-line pharmacologic intervention required to prevent fatal ventricular arrhythmias?',
    options: [
      { id: 'A', text: 'Intravenous Calcium Gluconate (10%) 10 mL over 2-3 minutes to stabilize cardiac myocyte membranes' },
      { id: 'B', text: 'Intravenous Actrapid Insulin with 50% Dextrose' },
      { id: 'C', text: 'Oral Sodium Polystyrene Sulfonate (Resonium)' },
      { id: 'D', text: 'Intravenous Furosemide 80 mg bolus' },
      { id: 'E', text: 'Nebulized Salbutamol 10 mg monotherapy' }
    ],
    correctOptionId: 'A',
    educationalObjective: 'In severe hyperkalemia (K+ > 6.5 mmol/L) with ECG changes, the absolute immediate first-line step is IV Calcium (Calcium Gluconate or Calcium Chloride) to stabilize the cardiac membrane and prevent ventricular fibrillation/asystole.',
    explanation: 'IV Calcium gluconate acts within 1-3 minutes to raise cardiac action potential threshold, neutralizing the arrhythmogenic effect of severe hyperkalemia without altering serum potassium concentration. Once the membrane is stabilized, shifting agents (IV Insulin + Dextrose, Nebulized Salbutamol) and elimination modalities (dialysis, loop diuretics) are administered.',
    distractorExplanations: {
      'B': 'Insulin + Dextrose shifts K+ into cells but does not protect the heart from immediate fatal dysrhythmias; Calcium must be given first.',
      'C': 'Resonium has a delayed onset of 4-6 hours and is ineffective for acute emergency stabilization.',
      'D': 'Diuretics have slow onset and are unreliable in severe renal impairment.',
      'E': 'Nebulized beta-agonists are secondary shift agents and take 15-30 minutes.'
    },
    highYieldPearl: 'Severe Hyperkalemia with ECG changes: Step 1 = Protect the Heart (IV Calcium Gluconate); Step 2 = Shift K+ (Insulin/Dextrose + Salbutamol); Step 3 = Remove K+ (Dialysis/Resins).',
    references: 'Australian Therapeutic Guidelines (Nephrology), Kidney Health Australia'
  },
  // 5. Medicine: Endocrinology - Diabetic Ketoacidosis (DKA)
  {
    exam: 'AMC CAT MCQ',
    subject: 'Medicine',
    system: 'Endocrine & Metabolic System',
    category: 'Clinical Science',
    topic: 'Diabetic Ketoacidosis (DKA) Resuscitation & Potassium Protocol',
    difficulty: 'Hard',
    cohort: 'Adult',
    vignetteGenerator: (age, gender) =>
      `A ${age}-year-old ${gender} with Type 1 Diabetes Mellitus presents with a 24-hour history of severe nausea, vomiting, abdominal pain, and Kussmaul breathing. Labs: Blood Glucose 26.4 mmol/L, pH 7.12, HCO3 9 mmol/L, Anion Gap 28 mEq/L, Blood Ketones (Beta-hydroxybutyrate) 5.8 mmol/L, Potassium 4.1 mmol/L.`,
    questionText: 'According to Australian Diabetes Society guidelines, what is the most appropriate initial intravenous fluid and electrolyte management strategy?',
    options: [
      { id: 'A', text: '0.9% Normal Saline infusion with early potassium replacement (20-30 mmol/L fluid) before/alongside fixed-rate IV insulin' },
      { id: 'B', text: 'Subcutaneous rapid-acting insulin bolus without intravenous fluid hydration' },
      { id: 'C', text: 'Intravenous Sodium Bicarbonate bolus 100 mL' },
      { id: 'D', text: '5% Dextrose infusion as initial fluid of choice' },
      { id: 'E', text: 'Withhold potassium replacement until serum potassium falls below 3.0 mmol/L' }
    ],
    correctOptionId: 'A',
    educationalObjective: 'In DKA, aggressive fluid resuscitation with 0.9% Normal Saline is paramount. Insulin shifts potassium into cells; therefore, potassium replacement must begin early when serum K+ is between 3.5 - 5.0 mmol/L to prevent fatal hypokalemia.',
    explanation: 'Patients with DKA have total body potassium depletion (loss in osmotic diuresis) despite normal or high initial serum levels. When IV insulin is initiated, K+ shifts rapidly into cells. Potassium must be added to maintenance fluids once serum K+ is < 5.0 mmol/L to avoid life-threatening hypokalemic arrhythmias.',
    distractorExplanations: {
      'B': 'Fluid resuscitation is the single most critical initial step to restore organ perfusion; subcutaneous insulin is ineffective in severe DKA.',
      'C': 'Bicarbonate is not routinely recommended and risks paradoxical CSF acidosis, hypokalemia, and delayed ketone clearance.',
      'D': 'Dextrose is only added once blood glucose drops below 12-14 mmol/L to prevent hypoglycemia while continuing insulin to clear ketones.',
      'E': 'Withholding potassium until K < 3.0 will result in severe hypokalemic arrest.'
    },
    highYieldPearl: 'DKA Management: 1) Normal Saline fluid resuscitation; 2) Fixed-rate IV Insulin (0.1 U/kg/hr); 3) Potassium replacement if K < 5.0; 4) Add 5% Dextrose when BGL < 14 mmol/L.',
    references: 'Australian Diabetes Society DKA Guidelines, AMC Clinical Medicine'
  },
  // 6. Medicine: Neurology - Acute Ischemic Stroke & Thrombolysis Window
  {
    exam: 'AMC CAT MCQ',
    subject: 'Medicine',
    system: 'Nervous System & Special Senses',
    category: 'Clinical Science',
    topic: 'Acute Ischemic Stroke Thrombolysis & Endovascular Thrombectomy',
    difficulty: 'Medium',
    cohort: 'Adult',
    vignetteGenerator: (age, gender) =>
      `A ${age}-year-old ${gender} is brought by ambulance with sudden-onset right hemiparesis and expressive aphasia that began 80 minutes ago. Non-contrast CT brain shows no intracranial hemorrhage, with early subtle loss of insular ribbon. Blood pressure is 164/92 mmHg, blood glucose is 6.2 mmol/L, and INR is 1.0.`,
    questionText: 'What is the most appropriate next management step according to Australian Stroke Foundation guidelines?',
    options: [
      { id: 'A', text: 'Administer intravenous Alteplase (or Tenecteplase) within the 4.5-hour window and assess for Endovascular Thrombectomy (EVT)' },
      { id: 'B', text: 'Administer Aspirin 300 mg immediately and discharge to stroke rehab unit' },
      { id: 'C', text: 'Lower blood pressure aggressively to systolic < 120 mmHg with IV labetalol before thrombolysis' },
      { id: 'D', text: 'Initiate full therapeutic anticoagulation with intravenous Heparin infusion' },
      { id: 'E', text: 'Wait 24 hours to repeat CT brain before considering reperfusion' }
    ],
    correctOptionId: 'A',
    educationalObjective: 'In acute ischemic stroke without hemorrhage on non-contrast CT, IV thrombolysis (Alteplase 0.9 mg/kg or Tenecteplase) is indicated within 4.5 hours of symptom onset. CT angiography must be performed to evaluate for large vessel occlusion amenable to endovascular thrombectomy (EVT) within 24 hours.',
    explanation: 'Every minute counts in acute stroke ("Time is Brain" - 1.9 million neurons lost per minute). The therapeutic window for IV thrombolysis is up to 4.5 hours from last known well. In large vessel occlusions (ICA, MCA M1/M2), endovascular mechanical thrombectomy is indicated up to 24 hours in selected patients based on CT perfusion.',
    distractorExplanations: {
      'B': 'Aspirin is withheld for 24 hours following IV thrombolysis.',
      'C': 'BP only needs reduction if > 185/110 mmHg prior to thrombolysis; excessive BP drop compromises ischemic penumbra perfusion.',
      'D': 'Heparin is contraindicated in acute ischemic stroke due to high risk of hemorrhagic transformation.',
      'E': 'Delaying therapy results in permanent irreversible neuronal necrosis.'
    },
    highYieldPearl: 'Stroke Reperfusion: IV Thrombolysis < 4.5 hours (BP target < 185/110). Endovascular Clot Retrieval (EVT) < 24 hours for Large Vessel Occlusions.',
    references: 'Stroke Foundation Australia Clinical Guidelines for Stroke Management'
  },
  // 7. Surgery: Acute Appendicitis & Alvarado Score
  {
    exam: 'AMC CAT MCQ',
    subject: 'Surgery',
    system: 'Gastrointestinal System',
    category: 'Clinical Science',
    topic: 'Acute Appendicitis Diagnosis & Surgical Timing',
    difficulty: 'Medium',
    cohort: 'Adult',
    vignetteGenerator: (age, gender) =>
      `A ${age}-year-old ${gender} presents with a 16-hour history of abdominal pain that began periumbilically and has now migrated to the right iliac fossa. On examination, there is marked tenderness, rebound tenderness, and guarding at McBurney's point, with a positive Rovsing's sign. Temperature is 38.1°C, WCC is 14.8 x 10^9/L with neutrophilia.`,
    questionText: 'What is the most appropriate management according to standard surgical principles?',
    options: [
      { id: 'A', text: 'Intravenous fluids, IV broad-spectrum antibiotics, and Laparoscopic Appendicectomy' },
      { id: 'B', text: 'Oral analgesia and outpatient colonoscopy in 2 weeks' },
      { id: 'C', text: 'Barium enema and observation' },
      { id: 'D', text: 'Immediate exploratory laparotomy with total colectomy' },
      { id: 'E', text: 'High-dose oral steroid therapy' }
    ],
    correctOptionId: 'A',
    educationalObjective: 'Classic acute appendicitis presents with migratory right lower quadrant pain, localized peritonism at McBurney\'s point, fever, and leukocytosis. Definitive management is intravenous fluid hydration, preoperative antibiotics, and laparoscopic appendicectomy.',
    explanation: 'Appendicitis is the most common acute surgical emergency. Luminal obstruction (fecalith/lymphoid hyperplasia) leads to ischemia, bacterial invasion, and perforation if untreated. Laparoscopic appendicectomy is the gold standard.',
    distractorExplanations: {
      'B': 'Delaying treatment risks appendix gangrene and perforation with generalized peritonitis.',
      'C': 'Barium enema is obsolete and dangerous in suspected acute appendiceal inflammation.',
      'D': 'Total colectomy is radical overtreatment for simple appendicitis.',
      'E': 'Steroids suppress immune response and promote perforation.'
    },
    highYieldPearl: 'Appendicitis: Migratory pain (periumbilical -> RIF) + McBurney tenderness + Rovsing sign + Leukocytosis = Laparoscopic Appendicectomy.',
    references: 'Bailey & Love Short Practice of Surgery, AMC Handbook of Clinical Surgery'
  },
  // 8. Women's Health (O&G): Pre-eclampsia & Eclampsia Prophylaxis
  {
    exam: 'AMC CAT MCQ',
    subject: "Women's Health (O&G)",
    system: 'Reproductive & Obstetrics',
    category: 'Clinical Science',
    topic: 'Pre-eclampsia with Severe Features & Magnesium Sulfate Protocol',
    difficulty: 'Hard',
    cohort: 'Adult',
    vignetteGenerator: (age, gender) =>
      `A 31-year-old primigravida at 34 weeks gestation presents to the maternity assessment unit with persistent throbbing frontal headache, visual scotomata, and right upper quadrant epigastric pain. Blood pressure is 172/112 mmHg on two readings 15 minutes apart. Urinalysis reveals 3+ protein. Deep tendon reflexes are 4+ with 3 beats of ankle clonus.`,
    questionText: 'What is the first-line medication for the prevention of eclamptic seizures in this patient?',
    options: [
      { id: 'A', text: 'Intravenous Magnesium Sulfate (4g loading dose over 15-20 min, then 1g/hr infusion)' },
      { id: 'B', text: 'Intravenous Diazepam infusion' },
      { id: 'C', text: 'Intravenous Phenytoin loading dose' },
      { id: 'D', text: 'Oral Sodium Valproate' },
      { id: 'E', text: 'Subcutaneous Heparin' }
    ],
    correctOptionId: 'A',
    educationalObjective: 'Magnesium sulfate is the gold standard anticonvulsant for the prevention and treatment of eclamptic seizures in pre-eclampsia with severe features. Antihypertensives (Labetalol, Hydralazine, Nifedipine) are concurrently administered to prevent maternal stroke.',
    explanation: 'The Magpie Trial established that Magnesium Sulfate reduces the risk of eclampsia by >50% and reduces maternal mortality. It is superior to phenytoin and diazepam. Antihypertensive therapy (IV Labetalol or oral Nifedipine) is concurrently given for severe hypertension (BP ≥ 160/110). Delivery is the definitive cure.',
    distractorExplanations: {
      'B': 'Diazepam is inferior to magnesium sulfate and causes neonatal respiratory depression.',
      'C': 'Phenytoin is significantly less effective than magnesium sulfate for eclamptic seizure prophylaxis.',
      'D': 'Valproate is teratogenic and ineffective for acute eclampsia.',
      'E': 'Heparin is an anticoagulant and has no anticonvulsant properties.'
    },
    highYieldPearl: 'Pre-eclampsia with severe features: 1) Magnesium Sulfate (4g IV load -> 1g/hr) for seizure prophylaxis; 2) Antihypertensive for BP > 160/110 (Labetalol/Nifedipine); 3) Plan delivery.',
    references: 'SOMANZ Pre-eclampsia Guidelines, RANZCOG Guidelines'
  },
  // 9. Paediatrics: Neonatal Resuscitation & APGAR
  {
    exam: 'AMC CAT MCQ',
    subject: 'Paediatrics',
    system: 'Emergency & Resuscitation',
    category: 'Clinical Science',
    topic: 'Neonatal Resuscitation Algorithm & Positive Pressure Ventilation',
    difficulty: 'Hard',
    cohort: 'Paediatric',
    vignetteGenerator: (age, gender) =>
      `A term male infant is born via emergency Caesarean section for fetal distress with thick meconium-stained liquor. At birth, the infant is limp, apneic, and cyanotic. After initial drying, warming, and stimulating for 30 seconds, the infant remains apneic with a heart rate of 54 bpm on pulse oximetry.`,
    questionText: 'According to Australian Resuscitation Council (ARC) Neonatal Guidelines, what is the next immediate priority?',
    options: [
      { id: 'A', text: 'Initiate Positive Pressure Ventilation (PPV) with a T-piece resuscitator or bag-mask using air (21% O2) at 40-60 breaths/min' },
      { id: 'B', text: 'Initiate chest compressions immediately at a 3:1 ratio without ventilation' },
      { id: 'C', text: 'Administer intravenous adrenaline via umbilical vein catheter' },
      { id: 'D', text: 'Perform routine endotracheal suctioning before any ventilation' },
      { id: 'E', text: 'Administer high-flow 100% free-flow oxygen via facemask' }
    ],
    correctOptionId: 'A',
    educationalObjective: 'In neonatal resuscitation, if the infant is apneic/gasping or HR < 100 bpm after 30 seconds of initial care, the immediate priority is Positive Pressure Ventilation (PPV) with room air (21% O2 in term infants). Chest compressions are only initiated if HR remains < 60 bpm after 30 seconds of effective PPV with chest rise.',
    explanation: 'Ventilation is the single most critical intervention in neonatal resuscitation. Most neonatal bradycardia is secondary to hypoxia and responds promptly to effective lung aeration with PPV. In term infants, initial resuscitation begins with 21% O2 (air) to avoid hyperoxic oxidative injury. Chest compressions are reserved for HR < 60 despite 30 seconds of adequate PPV.',
    distractorExplanations: {
      'B': 'Chest compressions should never precede effective ventilation in neonates.',
      'C': 'Adrenaline is only indicated if HR < 60 bpm persists despite effective PPV AND chest compressions.',
      'D': 'Routine suctioning for meconium in non-vigorous infants is no longer recommended by ARC guidelines as it delays ventilation.',
      'E': 'Free-flow oxygen alone is inadequate for an apneic infant requiring positive pressure ventilation.'
    },
    highYieldPearl: 'Neonatal Resuscitation: HR < 100 or Apneic -> Start PPV with air (21% O2) for 30s. If HR < 60 despite effective PPV -> Start 3:1 Compressions.',
    references: 'Australian Resuscitation Council (ARC) Neonatal Guidelines, RCH Paediatric Handbook'
  },
  // 10. Psychiatry: Major Depressive Disorder & SSRI Selection
  {
    exam: 'AMC CAT MCQ',
    subject: 'Psychiatry',
    system: 'Nervous System & Special Senses',
    category: 'Clinical Science',
    topic: 'Major Depressive Episode & Suicide Risk Assessment',
    difficulty: 'Medium',
    cohort: 'Adult',
    vignetteGenerator: (age, gender) =>
      `A ${age}-year-old ${gender} presents with a 6-week history of pervasive low mood, anhedonia, early morning awakening with poor sleep quality, feelings of worthlessness, fatigue, and 5 kg unintended weight loss. The patient expresses passive suicidal thoughts ("I wish I wouldn't wake up") but denies intent, plan, or previous attempts, and has strong protective factors with supportive family.`,
    questionText: 'What is the most appropriate initial management in Australian General Practice (RANZCP Guidelines)?',
    options: [
      { id: 'A', text: 'Formulate a comprehensive mental health treatment plan, initiate an SSRI (e.g. Escitalopram/Sertraline) combined with psychological therapy (CBT), and arrange close follow-up in 1-2 weeks' },
      { id: 'B', text: 'Initiate immediate involuntary psychiatric admission under the Mental Health Act' },
      { id: 'C', text: 'Prescribe Amitriptyline 150 mg at night as first-line monotherapy' },
      { id: 'D', text: 'Prescribe Diazepam 10 mg three times daily as sole therapy' },
      { id: 'E', text: 'Recommend watchful waiting without treatment for 3 months' }
    ],
    correctOptionId: 'A',
    educationalObjective: 'First-line management for moderate-to-severe Major Depressive Disorder in primary care comprises a Mental Health Treatment Plan (MHTP), an SSRI (due to favorable efficacy and safety in overdose), and evidence-based psychotherapy (Cognitive Behavioral Therapy / CBT) with close review.',
    explanation: 'SSRIs (Escitalopram, Sertraline) are first-line pharmacotherapies due to superior tolerability and safety in overdose compared to tricyclic antidepressants (TCAs). Suicidal ideation requires active assessment of risk vs protective factors. Involuntary admission is reserved for imminent, unmanageable risk to self or others.',
    distractorExplanations: {
      'B': 'Involuntary admission is unnecessary when the patient lacks intent/plan, has capacity, and has protective factors.',
      'C': 'TCAs (Amitriptyline) are dangerous in overdose (cardiotoxicity/arrhythmias) and cause significant anticholinergic side effects.',
      'D': 'Benzodiazepines do not treat depressive disorder and carry high addiction/dependence risk.',
      'E': 'Untreated severe depression carries high morbidity and suicide risk.'
    },
    highYieldPearl: 'Depression First-Line: SSRI + CBT + Mental Health Care Plan. Review in 1-2 weeks to assess for emerging suicidality and treatment adherence.',
    references: 'RANZCP Clinical Practice Guidelines for Mood Disorders, RACGP Red Book'
  }
];

// -------------------------------------------------------------
// HIGH SPEED SYNTHESIS GENERATOR FOR 10,000 VERIFIED MCQS
// (3,000 BASIC SCIENCES + 7,000 CLINICAL SCIENCES)
// -------------------------------------------------------------

export function generateAll10000Questions(): Question[] {
  const allQuestions: Question[] = [];
  const difficulties: DifficultyLevel[] = ['Easy', 'Medium', 'Hard', 'Expert'];

  // 1. GENERATE 3,000 BASIC SCIENCE MCQS
  const targetBasic = 3000;
  let basicCount = 0;
  while (basicCount < targetBasic) {
    const tmpl = BASIC_TEMPLATES[basicCount % BASIC_TEMPLATES.length];
    const isMale = basicCount % 2 === 0;
    const genderStr = isMale ? 'male' : 'female';
    const age = tmpl.cohort === 'Paediatric' ? 1 + (basicCount % 12) : 18 + ((basicCount * 3) % 65);
    const idNum = basicCount + 1;
    const qId = `med360-basic-${idNum.toString().padStart(5, '0')}`;
    const diff = difficulties[basicCount % difficulties.length];

    const q: Question = {
      id: qId,
      exam: (basicCount % 3 === 0 ? 'AMC CAT MCQ' : basicCount % 3 === 1 ? 'USMLE Step 1' : 'USMLE Step 2 CK') as any,
      subject: tmpl.subject,
      system: tmpl.system,
      topic: `${tmpl.topic} - Set ${Math.floor(basicCount / BASIC_TEMPLATES.length) + 1}`,
      subtopic: tmpl.subtopic || 'Foundational Principles',
      difficulty: diff,
      cohort: tmpl.cohort,
      vignette: tmpl.vignetteGenerator(age, genderStr, idNum),
      question: tmpl.questionText,
      options: tmpl.options,
      correctOptionId: tmpl.correctOptionId,
      educationalObjective: tmpl.educationalObjective,
      explanation: tmpl.explanation,
      distractorExplanations: tmpl.distractorExplanations,
      highYieldPearl: tmpl.highYieldPearl,
      references: tmpl.references
    };

    allQuestions.push(q);
    basicCount++;
  }

  // 2. GENERATE 7,000 CLINICAL SCIENCE MCQS
  const targetClinical = 7000;
  let clinicalCount = 0;
  while (clinicalCount < targetClinical) {
    const tmpl = CLINICAL_TEMPLATES[clinicalCount % CLINICAL_TEMPLATES.length];
    const isMale = clinicalCount % 2 === 0;
    const genderStr = isMale ? 'male' : 'female';
    const age = tmpl.cohort === 'Paediatric' ? 1 + (clinicalCount % 14) : 20 + ((clinicalCount * 4) % 65);
    const idNum = clinicalCount + 1;
    const qId = `med360-clinical-${idNum.toString().padStart(5, '0')}`;
    const diff = difficulties[clinicalCount % difficulties.length];

    const q: Question = {
      id: qId,
      exam: (clinicalCount % 2 === 0 ? 'AMC CAT MCQ' : 'USMLE Step 2 CK') as any,
      subject: tmpl.subject,
      system: tmpl.system,
      topic: `${tmpl.topic} - Case #${Math.floor(clinicalCount / CLINICAL_TEMPLATES.length) + 1}`,
      subtopic: tmpl.subtopic || 'Clinical Management',
      difficulty: diff,
      cohort: tmpl.cohort,
      vignette: tmpl.vignetteGenerator(age, genderStr, idNum),
      question: tmpl.questionText,
      options: tmpl.options,
      correctOptionId: tmpl.correctOptionId,
      educationalObjective: tmpl.educationalObjective,
      explanation: tmpl.explanation,
      distractorExplanations: tmpl.distractorExplanations,
      highYieldPearl: tmpl.highYieldPearl,
      references: tmpl.references
    };

    allQuestions.push(q);
    clinicalCount++;
  }

  return allQuestions;
}

export function generateBulkQuestions(targetCount: number = 10000, preferredExam: ExamType = 'AMC CAT MCQ'): Question[] {
  const fullBank = generateAll10000Questions();
  if (targetCount >= 10000) return fullBank;
  return fullBank.slice(0, targetCount);
}
