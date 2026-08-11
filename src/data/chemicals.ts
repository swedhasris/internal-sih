import { Chemical } from '../types/chemist';

export const VERIFIED_CHEMICALS: Chemical[] = [
  {
    id: 'chem-001',
    name: 'Ethanol',
    iupacName: 'Ethanol',
    commonNames: ['Ethyl alcohol', 'Grain alcohol', 'Drinking alcohol', 'EtOH'],
    formula: 'C₂H₆O',
    casNumber: '64-17-5',
    molecularWeight: 46.07,
    monoisotopicMass: 46.0418,
    pubChemCid: 702,
    classCategory: 'Alcohols',
    description: 'A volatile, flammable, colorless liquid with a characteristic wine-like odor and pungent taste. Primary alcohol consisting of ethane bearing a single hydroxy substituent.',
    
    // 3D Atomic Coordinates for Ball-and-Stick
    atoms3D: [
      { id: 0, element: 'C', x: -1.2, y: -0.2, z: 0 },
      { id: 1, element: 'C', x: 0.2, y: 0.3, z: 0 },
      { id: 2, element: 'O', x: 1.1, y: -0.7, z: 0 },
      { id: 3, element: 'H', x: 2.0, y: -0.4, z: 0 },
      { id: 4, element: 'H', x: -1.3, y: -0.8, z: 0.9 },
      { id: 5, element: 'H', x: -1.3, y: -0.8, z: -0.9 },
      { id: 6, element: 'H', x: -1.9, y: 0.6, z: 0 },
      { id: 7, element: 'H', x: 0.3, y: 0.9, z: 0.9 },
      { id: 8, element: 'H', x: 0.3, y: 0.9, z: -0.9 },
    ],
    bonds3D: [
      { source: 0, target: 1, order: 1 }, // C-C
      { source: 1, target: 2, order: 1 }, // C-O
      { source: 2, target: 3, order: 1 }, // O-H
      { source: 0, target: 4, order: 1 },
      { source: 0, target: 5, order: 1 },
      { source: 0, target: 6, order: 1 },
      { source: 1, target: 7, order: 1 },
      { source: 1, target: 8, order: 1 },
    ],

    bonds: [
      { type: 'C–C Single Bond', count: 1, description: 'Non-polar covalent bond connecting methyl and methylene carbons' },
      { type: 'C–O Single Bond', count: 1, description: 'Polar covalent bond linking methylene carbon to hydroxyl oxygen' },
      { type: 'O–H Single Bond', count: 1, description: 'Highly polar bond capable of hydrogen bonding' },
      { type: 'C–H Single Bond', count: 5, description: 'Standard aliphatic carbon-hydrogen covalent bonds' }
    ],
    functionalGroups: ['Primary Hydroxyl (-OH)', 'Alkyl Chain (Ethyl)'],
    
    elementComposition: [
      { element: 'Carbon', symbol: 'C', count: 2, atomicMass: 12.011, weightPercentage: 52.14, color: '#333333' },
      { element: 'Hydrogen', symbol: 'H', count: 6, atomicMass: 1.008, weightPercentage: 13.13, color: '#FFFFFF' },
      { element: 'Oxygen', symbol: 'O', count: 1, atomicMass: 15.999, weightPercentage: 34.73, color: '#DC2626' }
    ],
    
    physicalProperties: {
      state: 'Liquid',
      appearance: 'Clear, colorless liquid',
      color: 'Colorless',
      odor: 'Pleasant, wine-like, alcohol odor',
      density: '0.789 g/cm³ at 20°C',
      meltingPoint: '-114.1 °C',
      boilingPoint: '78.37 °C',
      flashPoint: '13.0 °C (closed cup)',
      solubilityWater: 'Miscible in all proportions',
      vaporPressure: '5.95 kPa at 20°C'
    },
    
    chemicalProperties: {
      pKa: '15.9',
      acidityBasicity: 'Weakly acidic (amphiprotic solvent)',
      reactivity: 'Reacts violently with strong oxidizing agents, alkali metals, and mineral acids.',
      stability: 'Stable under recommended storage conditions. Volatile and hygroscopic.',
      oxidationBehavior: 'Oxidizes to acetaldehyde and subsequently to acetic acid',
      reductionBehavior: 'Resistant to mild reducing agents',
      chemicalCompatibility: 'Incompatible with strong acids, acid chlorides, strong oxidizers',
      decomposition: 'Combusts cleanly to form CO₂ and H₂O'
    },
    
    safety: {
      pictograms: ['Flammable', 'Irritant'],
      signalWord: 'Danger',
      hazardStatements: [
        'H225: Highly flammable liquid and vapor',
        'H319: Causes serious eye irritation'
      ],
      precautionaryStatements: [
        'P210: Keep away from heat, hot surfaces, sparks, open flames',
        'P233: Keep container tightly closed',
        'P305+P351+P338: IF IN EYES: Rinse cautiously with water for several minutes'
      ],
      storageRequirements: 'Store in cool, well-ventilated flammable liquid storage cabinet at 15–25°C.',
      handlingInfo: 'Use spark-proof tools and explosion-proof equipment. Avoid contact with eyes.',
      recommendedPPE: ['Safety glasses with side shields', 'Nitrile chemical gloves', 'Lab coat', 'Fume hood']
    },

    referenceFingerprint: {
      ph: 6.82,
      ec: 0.12,
      tds: 60,
      temperature: 25.0,
      colorRgb: { r: 245, g: 248, b: 252 },
      voc: 680
    },
    aiTrainedStatus: true
  },
  {
    id: 'chem-002',
    name: 'Methanol',
    iupacName: 'Methanol',
    commonNames: ['Methyl alcohol', 'Wood alcohol', 'Carbinol'],
    formula: 'CH₄O',
    casNumber: '67-56-1',
    molecularWeight: 32.04,
    monoisotopicMass: 32.0262,
    pubChemCid: 887,
    classCategory: 'Alcohols',
    description: 'The simplest alcohol, consisting of a methyl group linked to a hydroxyl group. A light, volatile, colorless, flammable liquid with a distinctive odor.',
    
    atoms3D: [
      { id: 0, element: 'C', x: 0, y: 0, z: 0 },
      { id: 1, element: 'O', x: 1.2, y: 0.5, z: 0 },
      { id: 2, element: 'H', x: 1.9, y: -0.1, z: 0 },
      { id: 3, element: 'H', x: -0.5, y: 0.4, z: 0.9 },
      { id: 4, element: 'H', x: -0.5, y: 0.4, z: -0.9 },
      { id: 5, element: 'H', x: -0.2, y: -1.0, z: 0 },
    ],
    bonds3D: [
      { source: 0, target: 1, order: 1 },
      { source: 1, target: 2, order: 1 },
      { source: 0, target: 3, order: 1 },
      { source: 0, target: 4, order: 1 },
      { source: 0, target: 5, order: 1 },
    ],

    bonds: [
      { type: 'C–O Single Bond', count: 1, description: 'Polar covalent bond linking methyl carbon to oxygen' },
      { type: 'O–H Single Bond', count: 1, description: 'Highly polar alcohol group' },
      { type: 'C–H Single Bond', count: 3, description: 'Methyl group carbon-hydrogen bonds' }
    ],
    functionalGroups: ['Hydroxyl (-OH)', 'Methyl (-CH₃)'],

    elementComposition: [
      { element: 'Carbon', symbol: 'C', count: 1, atomicMass: 12.011, weightPercentage: 37.48, color: '#333333' },
      { element: 'Hydrogen', symbol: 'H', count: 4, atomicMass: 1.008, weightPercentage: 12.58, color: '#FFFFFF' },
      { element: 'Oxygen', symbol: 'O', count: 1, atomicMass: 15.999, weightPercentage: 49.94, color: '#DC2626' }
    ],

    physicalProperties: {
      state: 'Liquid',
      appearance: 'Clear, colorless liquid',
      color: 'Colorless',
      odor: 'Pungent alcohol-like odor',
      density: '0.792 g/cm³ at 20°C',
      meltingPoint: '-97.6 °C',
      boilingPoint: '64.7 °C',
      flashPoint: '9.7 °C (closed cup)',
      solubilityWater: 'Fully miscible',
      vaporPressure: '12.8 kPa at 20°C'
    },

    chemicalProperties: {
      pKa: '15.5',
      acidityBasicity: 'Neutral / amphiprotic',
      reactivity: 'Highly reactive with oxidizing agents and alkali metals',
      stability: 'Stable; high vapor pressure and toxic fumes',
      oxidationBehavior: 'Oxidizes to formaldehyde and formic acid (toxic metabolically)',
      reductionBehavior: 'Stable to mild reductants',
      chemicalCompatibility: 'Incompatible with strong acids, acid anhydrides, metals',
      decomposition: 'Decomposes on combustion producing CO, CO₂ and formaldehyde vapors'
    },

    safety: {
      pictograms: ['Flammable', 'Toxic', 'Health Hazard'],
      signalWord: 'Danger',
      hazardStatements: [
        'H225: Highly flammable liquid and vapor',
        'H301+H311+H331: Toxic if swallowed, in contact with skin or if inhaled',
        'H370: Causes damage to organs (central nervous system, optic nerve)'
      ],
      precautionaryStatements: [
        'P210: Keep away from open flames',
        'P280: Wear protective gloves and eye protection',
        'P301+P310: IF SWALLOWED: Immediately call a POISON CENTER or doctor'
      ],
      storageRequirements: 'Store locked up in dedicated toxic/flammable safety room under 20°C.',
      handlingInfo: 'STRICT TOXICITY WARNING: Ingestion, skin absorption, or vapor inhalation causes blindness and organ failure.',
      recommendedPPE: ['Chemical safety goggles', 'Butyl rubber gloves', 'Lab coat', 'Aspirated fume hood']
    },

    referenceFingerprint: {
      ph: 6.95,
      ec: 0.18,
      tds: 90,
      temperature: 24.8,
      colorRgb: { r: 248, g: 250, b: 255 },
      voc: 820
    },
    aiTrainedStatus: true
  },
  {
    id: 'chem-003',
    name: 'Isopropanol',
    iupacName: 'Propan-2-ol',
    commonNames: ['Isopropyl alcohol', 'IPA', '2-Propanol', 'Rubbing alcohol'],
    formula: 'C₃H₈O',
    casNumber: '67-63-0',
    molecularWeight: 60.10,
    monoisotopicMass: 60.0575,
    pubChemCid: 3776,
    classCategory: 'Alcohols',
    description: 'A secondary alcohol consisting of propane bearing a hydroxy substituent at position 2. Colorless, flammable liquid with a sharp, rubbing-alcohol odor.',
    
    atoms3D: [
      { id: 0, element: 'C', x: 0, y: 0.5, z: 0 },
      { id: 1, element: 'C', x: -1.2, y: -0.4, z: 0 },
      { id: 2, element: 'C', x: 1.2, y: -0.4, z: 0 },
      { id: 3, element: 'O', x: 0, y: 1.8, z: 0 },
      { id: 4, element: 'H', x: 0.8, y: 2.2, z: 0 },
      { id: 5, element: 'H', x: 0, y: 0.1, z: 1.0 },
    ],
    bonds3D: [
      { source: 0, target: 1, order: 1 },
      { source: 0, target: 2, order: 1 },
      { source: 0, target: 3, order: 1 },
      { source: 3, target: 4, order: 1 },
      { source: 0, target: 5, order: 1 },
    ],

    bonds: [
      { type: 'C–C Single Bond', count: 2, description: 'Branched secondary carbon linkage' },
      { type: 'C–O Single Bond', count: 1, description: 'Secondary alcohol polar linkage' },
      { type: 'O–H Single Bond', count: 1, description: 'Hydroxyl group capable of H-bonding' },
      { type: 'C–H Single Bond', count: 7, description: 'Aliphatic C-H bonds' }
    ],
    functionalGroups: ['Secondary Hydroxyl (-OH)', 'Isopropyl Group'],

    elementComposition: [
      { element: 'Carbon', symbol: 'C', count: 3, atomicMass: 12.011, weightPercentage: 59.96, color: '#333333' },
      { element: 'Hydrogen', symbol: 'H', count: 8, atomicMass: 1.008, weightPercentage: 13.42, color: '#FFFFFF' },
      { element: 'Oxygen', symbol: 'O', count: 1, atomicMass: 15.999, weightPercentage: 26.62, color: '#DC2626' }
    ],

    physicalProperties: {
      state: 'Liquid',
      appearance: 'Clear colorless liquid',
      color: 'Colorless',
      odor: 'Sharp, rubbing alcohol odor',
      density: '0.786 g/cm³ at 20°C',
      meltingPoint: '-89.0 °C',
      boilingPoint: '82.6 °C',
      flashPoint: '11.7 °C',
      solubilityWater: 'Completely miscible',
      vaporPressure: '4.4 kPa at 20°C'
    },

    chemicalProperties: {
      pKa: '16.5',
      acidityBasicity: 'Neutral / extremely weak acid',
      reactivity: 'Can form explosive peroxides upon prolonged exposure to air/light',
      stability: 'Stable under ambient conditions',
      oxidationBehavior: 'Oxidizes to acetone via mild oxidizers like chromic acid',
      chemicalCompatibility: 'Incompatible with strong oxidizers, aluminum, halogenated organics',
      decomposition: 'Combusts producing carbon dioxide and water'
    },

    safety: {
      pictograms: ['Flammable', 'Irritant'],
      signalWord: 'Danger',
      hazardStatements: [
        'H225: Highly flammable liquid and vapor',
        'H319: Causes serious eye irritation',
        'H336: May cause drowsiness or dizziness'
      ],
      precautionaryStatements: [
        'P210: Keep away from ignition sources',
        'P261: Avoid breathing vapors/spray',
        'P304+P340: IF INHALED: Remove person to fresh air'
      ],
      storageRequirements: 'Cool, dark location away from heat, open flame, and direct sunlight.',
      handlingInfo: 'Use in well-ventilated areas. Wear splash safety goggles.',
      recommendedPPE: ['Safety goggles', 'Nitrile gloves', 'Lab coat']
    },

    referenceFingerprint: {
      ph: 6.70,
      ec: 0.08,
      tds: 40,
      temperature: 25.1,
      colorRgb: { r: 245, g: 247, b: 250 },
      voc: 590
    },
    aiTrainedStatus: true
  },
  {
    id: 'chem-004',
    name: 'Acetone',
    iupacName: 'Propan-2-one',
    commonNames: ['Propanone', 'Dimethyl ketone', 'Beta-ketopropane'],
    formula: 'C₃H₆O',
    casNumber: '67-64-1',
    molecularWeight: 58.08,
    monoisotopicMass: 58.0419,
    pubChemCid: 180,
    classCategory: 'Ketones',
    description: 'An organic compound with the formula (CH3)2CO. The simplest and smallest ketone. Colorless, highly volatile and flammable liquid with a characteristic sweet pungent smell.',
    
    atoms3D: [
      { id: 0, element: 'C', x: 0, y: 0.2, z: 0 },
      { id: 1, element: 'O', x: 0, y: 1.4, z: 0 }, // C=O
      { id: 2, element: 'C', x: -1.2, y: -0.6, z: 0 },
      { id: 3, element: 'C', x: 1.2, y: -0.6, z: 0 },
      { id: 4, element: 'H', x: -1.3, y: -1.2, z: 0.9 },
      { id: 5, element: 'H', x: -1.3, y: -1.2, z: -0.9 },
      { id: 6, element: 'H', x: -2.0, y: 0.1, z: 0 },
      { id: 7, element: 'H', x: 1.3, y: -1.2, z: 0.9 },
      { id: 8, element: 'H', x: 1.3, y: -1.2, z: -0.9 },
      { id: 9, element: 'H', x: 2.0, y: 0.1, z: 0 },
    ],
    bonds3D: [
      { source: 0, target: 1, order: 2 }, // C=O Double Bond!
      { source: 0, target: 2, order: 1 },
      { source: 0, target: 3, order: 1 },
      { source: 2, target: 4, order: 1 },
      { source: 2, target: 5, order: 1 },
      { source: 2, target: 6, order: 1 },
      { source: 3, target: 7, order: 1 },
      { source: 3, target: 8, order: 1 },
      { source: 3, target: 9, order: 1 },
    ],

    bonds: [
      { type: 'C=O Double Bond', count: 1, description: 'Polar carbonyl double bond' },
      { type: 'C–C Single Bond', count: 2, description: 'Carbon-carbon linkages to methyl groups' },
      { type: 'C–H Single Bond', count: 6, description: 'Methyl C-H covalent bonds' }
    ],
    functionalGroups: ['Carbonyl Group (Ketone, >C=O)'],

    elementComposition: [
      { element: 'Carbon', symbol: 'C', count: 3, atomicMass: 12.011, weightPercentage: 62.04, color: '#333333' },
      { element: 'Hydrogen', symbol: 'H', count: 6, atomicMass: 1.008, weightPercentage: 10.41, color: '#FFFFFF' },
      { element: 'Oxygen', symbol: 'O', count: 1, atomicMass: 15.999, weightPercentage: 27.55, color: '#DC2626' }
    ],

    physicalProperties: {
      state: 'Liquid',
      appearance: 'Clear, mobile, colorless liquid',
      color: 'Colorless',
      odor: 'Pungent, sweet, fruity, minty odor',
      density: '0.784 g/cm³ at 20°C',
      meltingPoint: '-94.7 °C',
      boilingPoint: '56.05 °C',
      flashPoint: '-20.0 °C (closed cup)',
      solubilityWater: 'Miscible in all proportions',
      vaporPressure: '24.0 kPa at 20°C'
    },

    chemicalProperties: {
      pKa: '19.2 (carbonyl C-H)',
      acidityBasicity: 'Neutral solvent',
      reactivity: 'Reacts violently with oxidizing agents, nitric acid, hydrogen peroxide',
      stability: 'Volatile, highly flammable',
      chemicalCompatibility: 'Incompatible with strong bases, oxidizing agents, plastics (dissolves PS, ABS)',
      decomposition: 'Thermal decomposition forms methane, ketene, CO, CO₂'
    },

    safety: {
      pictograms: ['Flammable', 'Irritant'],
      signalWord: 'Danger',
      hazardStatements: [
        'H225: Highly flammable liquid and vapor',
        'H319: Causes serious eye irritation',
        'H336: May cause drowsiness or dizziness'
      ],
      precautionaryStatements: [
        'P210: Keep away from open flames, hot surfaces',
        'P305+P351+P338: Rinse cautiously with water if in eyes'
      ],
      storageRequirements: 'Flammables cabinet in cool location below 25°C.',
      handlingInfo: 'Avoid contact with eyes, skin, and breathing vapors. Dissolves many common lab gloves (use splash-resistant nitrile or neoprene).',
      recommendedPPE: ['Safety glasses with side shields', 'Heavy duty neoprene/butyl gloves', 'Fume hood']
    },

    referenceFingerprint: {
      ph: 6.50,
      ec: 0.05,
      tds: 25,
      temperature: 24.5,
      colorRgb: { r: 242, g: 246, b: 252 },
      voc: 940
    },
    aiTrainedStatus: true
  },
  {
    id: 'chem-005',
    name: 'Acetic Acid',
    iupacName: 'Ethanoic acid',
    commonNames: ['Glacial acetic acid', 'Vinegar acid', 'Methanecarboxylic acid'],
    formula: 'C₂H₄O₂',
    casNumber: '64-19-7',
    molecularWeight: 60.05,
    monoisotopicMass: 60.0211,
    pubChemCid: 176,
    classCategory: 'Carboxylic Acids',
    description: 'An organic compound giving vinegar its sour taste and pungent smell. Simple carboxylic acid consisting of a methyl group attached to a carboxyl functional group.',
    
    atoms3D: [
      { id: 0, element: 'C', x: -1.1, y: -0.1, z: 0 },
      { id: 1, element: 'C', x: 0.3, y: 0.3, z: 0 },
      { id: 2, element: 'O', x: 0.7, y: 1.4, z: 0 }, // C=O
      { id: 3, element: 'O', x: 1.1, y: -0.7, z: 0 }, // C-OH
      { id: 4, element: 'H', x: 2.0, y: -0.5, z: 0 }, // O-H
      { id: 5, element: 'H', x: -1.2, y: -0.7, z: 0.9 },
      { id: 6, element: 'H', x: -1.2, y: -0.7, z: -0.9 },
      { id: 7, element: 'H', x: -1.8, y: 0.7, z: 0 },
    ],
    bonds3D: [
      { source: 0, target: 1, order: 1 },
      { source: 1, target: 2, order: 2 }, // C=O
      { source: 1, target: 3, order: 1 }, // C-O
      { source: 3, target: 4, order: 1 }, // O-H
      { source: 0, target: 5, order: 1 },
      { source: 0, target: 6, order: 1 },
      { source: 0, target: 7, order: 1 },
    ],

    bonds: [
      { type: 'C=O Double Bond', count: 1, description: 'Carboxyl carbonyl bond' },
      { type: 'C–O Single Bond', count: 1, description: 'Carboxyl hydroxyl oxygen linkage' },
      { type: 'O–H Single Bond', count: 1, description: 'Acidic hydrogen bond' },
      { type: 'C–C Single Bond', count: 1, description: 'Methyl carbon to carboxyl carbon bond' }
    ],
    functionalGroups: ['Carboxyl Group (-COOH)'],

    elementComposition: [
      { element: 'Carbon', symbol: 'C', count: 2, atomicMass: 12.011, weightPercentage: 40.00, color: '#333333' },
      { element: 'Hydrogen', symbol: 'H', count: 4, atomicMass: 1.008, weightPercentage: 6.71, color: '#FFFFFF' },
      { element: 'Oxygen', symbol: 'O', count: 2, atomicMass: 15.999, weightPercentage: 53.29, color: '#DC2626' }
    ],

    physicalProperties: {
      state: 'Liquid',
      appearance: 'Clear, colorless liquid',
      color: 'Colorless',
      odor: 'Pungent, vinegar-like, sharp odor',
      density: '1.049 g/cm³ at 20°C',
      meltingPoint: '16.6 °C (freezes into ice-like crystals)',
      boilingPoint: '117.9 °C',
      flashPoint: '39.0 °C',
      solubilityWater: 'Completely soluble',
      vaporPressure: '1.52 kPa at 20°C'
    },

    chemicalProperties: {
      pKa: '4.76',
      acidityBasicity: 'Weak monoprotic organic acid',
      reactivity: 'Corrosive to metals (iron, zinc, magnesium forming acetates and H₂ gas)',
      stability: 'Stable; hygroscopic',
      chemicalCompatibility: 'Incompatible with chromic acid, nitric acid, peroxides, strong bases',
      decomposition: 'Decomposes on heating above 440°C forming CO₂ and CH₄'
    },

    safety: {
      pictograms: ['Corrosive', 'Flammable'],
      signalWord: 'Danger',
      hazardStatements: [
        'H226: Flammable liquid and vapor',
        'H314: Causes severe skin burns and eye damage'
      ],
      precautionaryStatements: [
        'P280: Wear protective gloves, clothing, eye and face protection',
        'P301+P330+P331: IF SWALLOWED: Rinse mouth. Do NOT induce vomiting',
        'P305+P351+P338: IF IN EYES: Rinse cautiously with water for several minutes'
      ],
      storageRequirements: 'Store above 17°C to prevent freezing in acid resistant cabinet.',
      handlingInfo: 'CORROSIVE VAPORS: Use fume hood. Avoid skin and inhalation exposure.',
      recommendedPPE: ['Chemical splash goggles', 'Face shield', 'Acid-resistant gloves', 'Rubber apron']
    },

    referenceFingerprint: {
      ph: 2.85,
      ec: 1.85,
      tds: 920,
      temperature: 25.2,
      colorRgb: { r: 248, g: 248, b: 240 },
      voc: 410
    },
    aiTrainedStatus: true
  },
  {
    id: 'chem-006',
    name: 'Sodium Chloride Solution',
    iupacName: 'Sodium chloride aqueous',
    commonNames: ['Saline solution', 'Table salt solution', 'Brine (0.9% - 5.0%)'],
    formula: 'NaCl + H₂O',
    casNumber: '7647-14-5',
    molecularWeight: 58.44,
    monoisotopicMass: 57.9586,
    pubChemCid: 5238,
    classCategory: 'Inorganic Salts',
    description: 'An aqueous solution of sodium chloride containing dissolved Na⁺ and Cl⁻ hydrated ions. Essential electrolyte solution used in laboratory chemistry and clinical medicine.',
    
    atoms3D: [
      { id: 0, element: 'Na', x: -1.2, y: 0, z: 0, charge: 1 },
      { id: 1, element: 'Cl', x: 1.2, y: 0, z: 0, charge: -1 },
      { id: 2, element: 'O', x: 0, y: 1.2, z: 0 },
      { id: 3, element: 'H', x: -0.6, y: 1.8, z: 0 },
      { id: 4, element: 'H', x: 0.6, y: 1.8, z: 0 },
    ],
    bonds3D: [
      { source: 0, target: 1, order: 1 }, // Ionic coordination represented
      { source: 2, target: 3, order: 1 },
      { source: 2, target: 4, order: 1 },
    ],

    bonds: [
      { type: 'Ionic Bond', count: 1, description: 'Electrostatic ionic bond between Na⁺ cation and Cl⁻ anion in crystal/hydration shell' },
      { type: 'Ion-Dipole Bond', count: 4, description: 'Hydration shell linkages with water molecules' }
    ],
    functionalGroups: ['Alkali Metal Ion (Na⁺)', 'Halide Ion (Cl⁻)'],

    elementComposition: [
      { element: 'Sodium', symbol: 'Na', count: 1, atomicMass: 22.990, weightPercentage: 39.34, color: '#9333EA' },
      { element: 'Chlorine', symbol: 'Cl', count: 1, atomicMass: 35.453, weightPercentage: 60.66, color: '#16A34A' }
    ],

    physicalProperties: {
      state: 'Liquid (Aqueous Solution)',
      appearance: 'Clear, colorless liquid',
      color: 'Colorless',
      odor: 'Odorless',
      density: '1.005 - 1.025 g/cm³ depending on concentration',
      meltingPoint: '0.0 °C (water solvent)',
      boilingPoint: '100.5 °C',
      flashPoint: 'Non-flammable',
      solubilityWater: '359 g/L at 20°C',
      vaporPressure: '2.33 kPa at 20°C'
    },

    chemicalProperties: {
      pKa: '7.0 (Neutral salt)',
      acidityBasicity: 'Neutral (pH 6.5–7.2)',
      reactivity: 'Unreactive with standard solvents; electrolysis yields Cl₂ gas and NaOH',
      stability: 'Extremely stable under normal conditions',
      chemicalCompatibility: 'Incompatible with strong oxidizing agents, silver nitrate (precipitates AgCl)',
      decomposition: 'Non-decomposing liquid under normal ambient lab heat'
    },

    safety: {
      pictograms: [],
      signalWord: 'None',
      hazardStatements: [
        'Non-hazardous substance under GHS criteria'
      ],
      precautionaryStatements: [
        'P102: Keep out of reach of children',
        'P264: Wash hands thoroughly after handling'
      ],
      storageRequirements: 'Store at ambient temperature in closed inert container.',
      handlingInfo: 'Standard laboratory precautions. Avoid splashing in eyes.',
      recommendedPPE: ['Safety glasses', 'Lab coat']
    },

    referenceFingerprint: {
      ph: 7.10,
      ec: 14.8,
      tds: 7400,
      temperature: 25.0,
      colorRgb: { r: 248, g: 250, b: 255 },
      voc: 120
    },
    aiTrainedStatus: true
  },
  {
    id: 'chem-007',
    name: 'Aspirin',
    iupacName: '2-Acetoxybenzoic acid',
    commonNames: ['Acetylsalicylic acid', 'ASA', 'Polyphen-2-oic acid'],
    formula: 'C₉H₈O₄',
    casNumber: '50-78-2',
    molecularWeight: 180.16,
    monoisotopicMass: 180.0423,
    pubChemCid: 2244,
    classCategory: 'Aromatics & Acids',
    description: 'A aromatic carboxylic acid containing an acetate ester attached to the ortho position of benzoic acid. Widely analyzed pharmaceutical active ingredients.',
    
    atoms3D: [
      { id: 0, element: 'C', x: 0, y: 0, z: 0 }, // Ring C1
      { id: 1, element: 'C', x: 1.2, y: 0.7, z: 0 }, // Ring C2
      { id: 2, element: 'C', x: 2.4, y: 0, z: 0 }, // Ring C3
      { id: 3, element: 'C', x: 2.4, y: -1.4, z: 0 }, // Ring C4
      { id: 4, element: 'C', x: 1.2, y: -2.1, z: 0 }, // Ring C5
      { id: 5, element: 'C', x: 0, y: -1.4, z: 0 }, // Ring C6
      { id: 6, element: 'C', x: -1.2, y: 0.8, z: 0 }, // COOH
      { id: 7, element: 'O', x: -1.2, y: 2.0, z: 0 }, // =O
      { id: 8, element: 'O', x: -2.3, y: 0.1, z: 0 }, // -OH
      { id: 9, element: 'O', x: 1.2, y: 2.1, z: 0 }, // Ester O
    ],
    bonds3D: [
      { source: 0, target: 1, order: 1.5 },
      { source: 1, target: 2, order: 1.5 },
      { source: 2, target: 3, order: 1.5 },
      { source: 3, target: 4, order: 1.5 },
      { source: 4, target: 5, order: 1.5 },
      { source: 5, target: 0, order: 1.5 },
      { source: 0, target: 6, order: 1 },
      { source: 6, target: 7, order: 2 },
      { source: 6, target: 8, order: 1 },
      { source: 1, target: 9, order: 1 },
    ],

    bonds: [
      { type: 'Aromatic C=C Bond', count: 6, description: 'Delocalized benzene ring aromatic double bonds' },
      { type: 'C=O Double Bond', count: 2, description: 'Carboxyl carbonyl and ester carbonyl bonds' },
      { type: 'C–O Single Bond', count: 2, description: 'Ester and carboxylic acid single bonds' },
      { type: 'O–H Single Bond', count: 1, description: 'Acidic carboxylic hydroxyl bond' }
    ],
    functionalGroups: ['Benzene Ring', 'Carboxylic Acid (-COOH)', 'Ester (-COO-)'],

    elementComposition: [
      { element: 'Carbon', symbol: 'C', count: 9, atomicMass: 12.011, weightPercentage: 60.00, color: '#333333' },
      { element: 'Hydrogen', symbol: 'H', count: 8, atomicMass: 1.008, weightPercentage: 4.48, color: '#FFFFFF' },
      { element: 'Oxygen', symbol: 'O', count: 4, atomicMass: 15.999, weightPercentage: 35.52, color: '#DC2626' }
    ],

    physicalProperties: {
      state: 'Solid (Slightly Soluble Solution in lab tests)',
      appearance: 'White crystalline powder or solution',
      color: 'White / Colorless in liquid sample',
      odor: 'Odorless to faint acetic odor',
      density: '1.40 g/cm³',
      meltingPoint: '135.0 °C',
      boilingPoint: '140 °C (decomposes)',
      flashPoint: '250 °C',
      solubilityWater: '3.3 g/L at 20°C',
      vaporPressure: '0.00000002 kPa'
    },

    chemicalProperties: {
      pKa: '3.49',
      acidityBasicity: 'Organic acid',
      reactivity: 'Hydrolyzes in moist air or alkaline water into salicylic and acetic acids',
      stability: 'Stable in dry conditions; moisture causes hydrolysis',
      chemicalCompatibility: 'Incompatible with strong alkalis, strong oxidizers',
      decomposition: 'Decomposes above 135°C producing acetic acid vapors'
    },

    safety: {
      pictograms: ['Harmful', 'Health Hazard'],
      signalWord: 'Warning',
      hazardStatements: [
        'H302: Harmful if swallowed',
        'H315: Causes skin irritation',
        'H319: Causes serious eye irritation'
      ],
      precautionaryStatements: [
        'P264: Wash hands thoroughly after handling',
        'P301+P312: IF SWALLOWED: Call POISON CENTER if feeling unwell'
      ],
      storageRequirements: 'Store tightly sealed at 20-25°C in dry room.',
      handlingInfo: 'Avoid breathing dust/powder. Wear eye protection.',
      recommendedPPE: ['Safety goggles', 'Nitrile gloves', 'Dust mask if dry']
    },

    referenceFingerprint: {
      ph: 3.42,
      ec: 0.95,
      tds: 475,
      temperature: 25.0,
      colorRgb: { r: 242, g: 245, b: 248 },
      voc: 310
    },
    aiTrainedStatus: true
  },
  {
    id: 'chem-008',
    name: 'Caffeine Solution',
    iupacName: '1,3,7-Trimethylpurine-2,6-dione',
    commonNames: ['1,3,7-Trimethylxanthine', 'Guaranine', 'Methyltheobromine'],
    formula: 'C₈H₁₀N₄O₂',
    casNumber: '58-08-2',
    molecularWeight: 194.19,
    monoisotopicMass: 194.0804,
    pubChemCid: 2519,
    classCategory: 'Alkaloids',
    description: 'A central nervous system stimulant of the methylxanthine class. Consists of a bicyclic purine dione ring bearing three methyl substituent groups.',
    
    atoms3D: [
      { id: 0, element: 'C', x: 0, y: 1.2, z: 0 },
      { id: 1, element: 'N', x: 1.2, y: 0.6, z: 0 },
      { id: 2, element: 'C', x: 1.2, y: -0.8, z: 0 },
      { id: 3, element: 'N', x: 0, y: -1.4, z: 0 },
      { id: 4, element: 'C', x: -1.2, y: -0.6, z: 0 },
      { id: 5, element: 'C', x: -1.2, y: 0.8, z: 0 },
      { id: 6, element: 'O', x: 0, y: 2.4, z: 0 },
      { id: 7, element: 'O', x: -2.2, y: -1.2, z: 0 },
    ],
    bonds3D: [
      { source: 0, target: 1, order: 1 },
      { source: 1, target: 2, order: 1 },
      { source: 2, target: 3, order: 2 },
      { source: 3, target: 4, order: 1 },
      { source: 4, target: 5, order: 1 },
      { source: 5, target: 0, order: 1 },
      { source: 0, target: 6, order: 2 },
      { source: 4, target: 7, order: 2 },
    ],

    bonds: [
      { type: 'C=O Double Bond', count: 2, description: 'Imide carbonyl bonds on purine core' },
      { type: 'C=N Double Bond', count: 1, description: 'Heterocyclic nitrogen double bond' },
      { type: 'C–N Single Bond', count: 6, description: 'Methylated ring nitrogens' }
    ],
    functionalGroups: ['Xanthine Purine Core', 'Tertiary Amide', 'Methyl Groups (-CH₃)'],

    elementComposition: [
      { element: 'Carbon', symbol: 'C', count: 8, atomicMass: 12.011, weightPercentage: 49.48, color: '#333333' },
      { element: 'Hydrogen', symbol: 'H', count: 10, atomicMass: 1.008, weightPercentage: 5.19, color: '#FFFFFF' },
      { element: 'Nitrogen', symbol: 'N', count: 4, atomicMass: 14.007, weightPercentage: 28.85, color: '#2563EB' },
      { element: 'Oxygen', symbol: 'O', count: 2, atomicMass: 15.999, weightPercentage: 16.48, color: '#DC2626' }
    ],

    physicalProperties: {
      state: 'Liquid (Aqueous Solution)',
      appearance: 'Clear to pale yellow solution',
      color: 'Slightly yellowish',
      odor: 'Odorless with intensely bitter taste',
      density: '1.23 g/cm³ (solid)',
      meltingPoint: '238.0 °C',
      boilingPoint: '178.0 °C (sublimes)',
      flashPoint: 'Non-flammable',
      solubilityWater: '21.7 g/L at 25°C',
      vaporPressure: '0.000001 kPa'
    },

    chemicalProperties: {
      pKa: '0.6 (Very weak base)',
      acidityBasicity: 'Extremely weak base',
      reactivity: 'Stable purine derivative',
      stability: 'Stable in neutral aqueous solution',
      chemicalCompatibility: 'Incompatible with strong oxidizing reagents, iodine',
      decomposition: 'Decomposes on high heating to yield toxic nitrogen oxides (NOx)'
    },

    safety: {
      pictograms: ['Harmful'],
      signalWord: 'Warning',
      hazardStatements: [
        'H302: Harmful if swallowed'
      ],
      precautionaryStatements: [
        'P270: Do not eat, drink or smoke when using this product',
        'P301+P312: IF SWALLOWED: Call a poison center'
      ],
      storageRequirements: 'Store in cool dry environment.',
      handlingInfo: 'Avoid ingesting pure concentrate.',
      recommendedPPE: ['Standard safety glasses', 'Nitrile gloves']
    },

    referenceFingerprint: {
      ph: 6.20,
      ec: 0.42,
      tds: 210,
      temperature: 25.1,
      colorRgb: { r: 235, g: 228, b: 200 },
      voc: 280
    },
    aiTrainedStatus: true
  }
];

export const DEMO_SAMPLES_PRESETS = [
  {
    name: 'Lab Ethanol 99.8% Batch #2026-ETH',
    chemicalId: 'chem-001',
    sensorData: {
      ph: 6.82,
      ec: 0.12,
      tds: 60,
      temperature: 25.0,
      colorRgb: { r: 245, g: 248, b: 252 },
      voc: 680
    }
  },
  {
    name: 'Industrial Methanol Sample #M-882',
    chemicalId: 'chem-002',
    sensorData: {
      ph: 6.95,
      ec: 0.18,
      tds: 90,
      temperature: 24.8,
      colorRgb: { r: 248, g: 250, b: 255 },
      voc: 820
    }
  },
  {
    name: 'Glacial Acetic Acid Solution #AC-104',
    chemicalId: 'chem-005',
    sensorData: {
      ph: 2.85,
      ec: 1.85,
      tds: 920,
      temperature: 25.2,
      colorRgb: { r: 248, g: 248, b: 240 },
      voc: 410
    }
  },
  {
    name: 'Saline Solution NaCl 0.9% #SALT-09',
    chemicalId: 'chem-006',
    sensorData: {
      ph: 7.10,
      ec: 14.8,
      tds: 7400,
      temperature: 25.0,
      colorRgb: { r: 248, g: 250, b: 255 },
      voc: 120
    }
  },
  {
    name: 'Uncalibrated Unknown Sample #UNK-999',
    chemicalId: 'unknown',
    sensorData: {
      ph: 4.10,
      ec: 8.50,
      tds: 4250,
      temperature: 29.5,
      colorRgb: { r: 180, g: 80, b: 40 },
      voc: 1850
    }
  }
];
