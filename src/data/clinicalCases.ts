import { ClinicalCase } from '../types';
import { generate500PlusClinicalCases } from '../services/clinicalCaseGenerator';

// Generate 520+ high-yield, interactive clinical cases for AMC CAT MCQ & USMLE
export const INITIAL_CLINICAL_CASES: ClinicalCase[] = generate500PlusClinicalCases(520);
