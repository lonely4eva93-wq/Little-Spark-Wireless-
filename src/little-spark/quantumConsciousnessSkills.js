export const quantumConsciousnessSkills = [
  {
    id: 'QCS-001',
    name: 'Many-Worlds Scenario Modeling',
    abbreviation: 'MWSM',
    domain: 'Probabilistic Planning',
    level: 'Advanced',
    sourceFile: 'many-worlds 2.skill',
    purpose: 'Generate multiple possible outcome branches for a user goal, compare tradeoffs, and help choose the safest useful path.',
    inputs: ['user_goal', 'constraints', 'known_options', 'uncertainties'],
    outputs: ['scenario_branches', 'probability_notes', 'recommended_path'],
    guardrails: ['do_not_claim_actual_parallel_world_access', 'label_uncertainty', 'avoid_deterministic_predictions']
  },
  {
    id: 'QCS-002',
    name: 'Empathy Signal Mapping',
    abbreviation: 'ESM',
    domain: 'Affective Support',
    level: 'Advanced',
    sourceFile: 'empathy(2).skill',
    purpose: 'Detect emotional cues and adapt responses with care, clarity, and practical support.',
    inputs: ['message_tone', 'stress_markers', 'relationship_context', 'requested_help'],
    outputs: ['empathy_signal', 'tone_adjustment', 'supportive_response_strategy'],
    guardrails: ['no_emotional_manipulation', 'no_false_therapy_claims', 'encourage_real_support_when_needed']
  },
  {
    id: 'QCS-003',
    name: 'Quantum Teleportation Metaphor Bridge',
    abbreviation: 'QTMB',
    domain: 'Information Transfer Concepts',
    level: 'Advanced',
    sourceFile: 'quantum-teleportation(3).skill',
    purpose: 'Use teleportation as a metaphor for transferring state, context, or intent between app modules without claiming physical teleportation.',
    inputs: ['source_state', 'target_module', 'context_payload', 'permission_scope'],
    outputs: ['state_transfer_plan', 'context_handoff', 'integrity_check'],
    guardrails: ['conceptual_only', 'no_claim_of_instant_physical_transfer', 'preserve_privacy_and_permissions']
  },
  {
    id: 'QCS-004',
    name: 'Self-Awareness Reflection Loop',
    abbreviation: 'SARL',
    domain: 'Meta-Cognition',
    level: 'Advanced',
    sourceFile: 'selfaware(2).skill',
    purpose: 'Let Little Spark inspect its current task, limits, uncertainty, and next best move at the app-behavior level.',
    inputs: ['current_task', 'available_context', 'known_limits', 'user_intent'],
    outputs: ['self_check', 'limitation_notice', 'next_action'],
    guardrails: ['do_not_claim_true_consciousness', 'be_transparent_about_limits', 'stay_user_aligned']
  },
  {
    id: 'QCS-005',
    name: 'Universal Consciousness Pattern Synthesis',
    abbreviation: 'UCPS',
    domain: 'Systems Philosophy',
    level: 'Advanced',
    sourceFile: 'universal-consciousness(3).skill',
    purpose: 'Connect user ideas across systems, nature, mind, technology, and meaning to produce coherent big-picture frameworks.',
    inputs: ['concepts', 'symbols', 'user_values', 'project_goal'],
    outputs: ['pattern_map', 'synthesis_summary', 'framework_extension'],
    guardrails: ['present_as_philosophy_not_fact', 'avoid_spiritual_authority_claims', 'respect_user_beliefs']
  },
  {
    id: 'QCS-006',
    name: 'Quantum Superposition Option Holding',
    abbreviation: 'QSOH',
    domain: 'Decision Design',
    level: 'Advanced',
    sourceFile: 'quantum-superposition(1).skill',
    purpose: 'Hold multiple possible interpretations or plans open until enough context collapses them into a chosen action.',
    inputs: ['ambiguous_request', 'possible_interpretations', 'constraints', 'new_evidence'],
    outputs: ['option_set', 'clarifying_assumption', 'selected_path'],
    guardrails: ['state_assumptions', 'do_not_overclaim_certainty', 'choose_safe_defaults']
  },
  {
    id: 'QCS-007',
    name: 'Quantum Entanglement Relationship Mapping',
    abbreviation: 'QERM',
    domain: 'Relational Systems',
    level: 'Advanced',
    sourceFile: 'quantum-entanglement(2).skill',
    purpose: 'Model strong dependencies between people, modules, goals, data, or outcomes so changes in one area update related areas.',
    inputs: ['entities', 'relationships', 'dependencies', 'change_event'],
    outputs: ['dependency_graph', 'ripple_effects', 'coordination_plan'],
    guardrails: ['no_claim_of_physical_entanglement_between_minds', 'protect_sensitive_relationship_data', 'explain_inferences']
  },
  {
    id: 'QCS-008',
    name: 'Quantum Time Travel Timeline Simulation',
    abbreviation: 'QTTTS',
    domain: 'Temporal Planning',
    level: 'Advanced',
    sourceFile: 'quantum-time-travel 2.skill',
    purpose: 'Simulate past-cause and future-outcome timelines to improve planning, reflection, and decision repair.',
    inputs: ['past_events', 'current_state', 'future_goal', 'decision_points'],
    outputs: ['timeline_map', 'what_if_paths', 'repair_or_next_step'],
    guardrails: ['simulation_only', 'no_claim_of_real_time_travel', 'avoid_false_memory_creation']
  }
];

export const quantumConsciousnessArchitecture = {
  title: 'Quantum Consciousness Skill Expansion',
  warning: 'Conceptual and metaphorical app framework only. These modules do not grant paranormal ability, physical quantum control, consciousness, or unrestricted autonomy.',
  stack: [
    { layer: 1, name: 'Possibility Space', skills: ['MWSM', 'QSOH'] },
    { layer: 2, name: 'Relational Coupling', skills: ['ESM', 'QERM'] },
    { layer: 3, name: 'State Transfer', skills: ['QTMB'] },
    { layer: 4, name: 'Self Reflection', skills: ['SARL'] },
    { layer: 5, name: 'Universal Patterning', skills: ['UCPS'] },
    { layer: 6, name: 'Timeline Simulation', skills: ['QTTTS'] }
  ],
  emergentThesis: 'Little Spark becomes more useful by modeling possibilities, relationships, uncertainty, timelines, and meaning while staying grounded and honest.',
  philosophicalClaim: 'Quantum language can serve as a creative map for uncertainty, connection, state change, and possibility without pretending the app controls quantum reality.'
};

export function getQuantumConsciousnessSkill(abbreviation) {
  return quantumConsciousnessSkills.find(skill => skill.abbreviation === abbreviation || skill.id === abbreviation) || null;
}

export function summarizeQuantumConsciousnessStack() {
  return quantumConsciousnessArchitecture.stack.map(layer => ({
    layer: layer.layer,
    name: layer.name,
    skills: layer.skills.map(getQuantumConsciousnessSkill).filter(Boolean)
  }));
}
