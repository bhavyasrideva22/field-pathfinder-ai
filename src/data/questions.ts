import { Question } from "@/types/assessment";

export const psychometricQuestions: Question[] = [
  {
    id: "psych_1",
    text: "I enjoy solving technical problems in real-world settings.",
    type: "likert",
    category: "psychometric",
    subcategory: "interest",
    weight: 1.2
  },
  {
    id: "psych_2", 
    text: "I prefer working independently rather than in a team environment.",
    type: "likert",
    category: "psychometric",
    subcategory: "personality",
    weight: 1.0
  },
  {
    id: "psych_3",
    text: "I remain calm under pressure when dealing with upset customers.",
    type: "likert",
    category: "psychometric",
    subcategory: "personality",
    weight: 1.3
  },
  {
    id: "psych_4",
    text: "I find satisfaction in hands-on mechanical or electrical work.",
    type: "likert",
    category: "psychometric",
    subcategory: "interest",
    weight: 1.4
  },
  {
    id: "psych_5",
    text: "I am comfortable adapting to different work environments and schedules.",
    type: "likert",
    category: "psychometric",
    subcategory: "adaptability",
    weight: 1.1
  },
  {
    id: "psych_6",
    text: "I enjoy explaining technical concepts to non-technical people.",
    type: "likert",
    category: "psychometric",
    subcategory: "communication",
    weight: 1.2
  },
  {
    id: "psych_7",
    text: "I prefer structured procedures over creative problem-solving.",
    type: "likert",
    category: "psychometric",
    subcategory: "cognitive",
    weight: 0.9
  },
  {
    id: "psych_8",
    text: "I am motivated by helping others solve their problems.",
    type: "likert",
    category: "psychometric",
    subcategory: "motivation",
    weight: 1.0
  }
];

export const technicalQuestions: Question[] = [
  {
    id: "tech_1",
    text: "Which tool would you use to measure electrical current?",
    type: "multiple-choice",
    category: "technical",
    subcategory: "tools",
    options: ["Voltmeter", "Ammeter", "Ohmmeter", "Oscilloscope"],
    correctAnswer: "Ammeter",
    weight: 1.0
  },
  {
    id: "tech_2",
    text: "What is the first step when troubleshooting a non-functioning machine?",
    type: "multiple-choice",
    category: "technical",
    subcategory: "troubleshooting",
    options: [
      "Replace the most expensive component",
      "Check power supply and connections", 
      "Call the manufacturer",
      "Disassemble the entire unit"
    ],
    correctAnswer: "Check power supply and connections",
    weight: 1.3
  },
  {
    id: "tech_3",
    text: "A customer reports their HVAC system is making unusual noises. What would you do first?",
    type: "scenario",
    category: "technical", 
    subcategory: "customer_service",
    options: [
      "Ask detailed questions about when the noise occurs",
      "Immediately start disassembling the unit",
      "Tell them it's normal wear and tear",
      "Schedule a return visit without investigating"
    ],
    correctAnswer: "Ask detailed questions about when the noise occurs",
    weight: 1.2
  },
  {
    id: "tech_4",
    text: "What does IP65 rating typically indicate for electrical equipment?",
    type: "multiple-choice",
    category: "technical",
    subcategory: "safety",
    options: [
      "Temperature resistance",
      "Dust and water protection",
      "Voltage capacity", 
      "Installation procedure"
    ],
    correctAnswer: "Dust and water protection",
    weight: 1.0
  },
  {
    id: "tech_5",
    text: "When working on electrical systems, what is the most important safety practice?",
    type: "multiple-choice",
    category: "technical",
    subcategory: "safety",
    options: [
      "Work quickly to minimize exposure",
      "Lock-out/Tag-out procedures",
      "Use the newest tools available",
      "Work in pairs always"
    ],
    correctAnswer: "Lock-out/Tag-out procedures",
    weight: 1.5
  }
];

export const wiscarQuestions: Question[] = [
  {
    id: "wiscar_will_1",
    text: "When facing a complex technical problem, I persist until I find a solution.",
    type: "likert",
    category: "wiscar",
    subcategory: "will",
    weight: 1.0
  },
  {
    id: "wiscar_interest_1", 
    text: "I actively seek out opportunities to learn about new technologies and equipment.",
    type: "likert",
    category: "wiscar",
    subcategory: "interest",
    weight: 1.0
  },
  {
    id: "wiscar_skill_1",
    text: "I have experience using diagnostic software and technical documentation.",
    type: "likert",
    category: "wiscar",
    subcategory: "skill",
    weight: 1.0
  },
  {
    id: "wiscar_cognitive_1",
    text: "I can quickly identify patterns and relationships in complex systems.",
    type: "likert",
    category: "wiscar",
    subcategory: "cognitive",
    weight: 1.0
  },
  {
    id: "wiscar_learning_1",
    text: "I actively seek feedback to improve my technical skills.",
    type: "likert",
    category: "wiscar",
    subcategory: "abilityToLearn",
    weight: 1.0
  },
  {
    id: "wiscar_real_1",
    text: "I am comfortable working in various field conditions and locations.",
    type: "likert",
    category: "wiscar",
    subcategory: "realWorldAlignment",
    weight: 1.0
  }
];

export const likertOptions = [
  { value: 1, label: "Strongly Disagree" },
  { value: 2, label: "Disagree" },
  { value: 3, label: "Neutral" },
  { value: 4, label: "Agree" },
  { value: 5, label: "Strongly Agree" }
];