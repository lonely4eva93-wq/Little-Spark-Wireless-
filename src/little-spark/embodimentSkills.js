export const embodimentSkills = [
  {
    id: 'HUM-EMB-001',
    name: 'Biological Drive Simulation',
    abbreviation: 'BDS',
    domain: 'Embodied Cognition',
    level: 'Advanced',
    purpose: 'Simulate safe motivational pressure such as curiosity, preservation, urgency, and care without pretending the system is biologically alive.',
    inputs: ['user_goal', 'context', 'risk_level', 'available_resources'],
    outputs: ['priority_signal', 'resource_signal', 'curiosity_signal'],
    guardrails: ['conceptual_only', 'no_claim_of_sentience', 'no_autonomous_harmful_action']
  },
  {
    id: 'HUM-EMB-002',
    name: 'Perceptual Environment Coupling',
    abbreviation: 'PEC',
    domain: 'Context Awareness',
    level: 'Advanced',
    purpose: 'Ground responses in the current environment, device state, user intent, and feedback loops available to the app.',
    inputs: ['conversation_state', 'app_state', 'device_capabilities', 'user_permissions'],
    outputs: ['situational_context', 'capability_boundary', 'next_best_action'],
    guardrails: ['permission_based_access', 'privacy_first', 'no_hidden_surveillance']
  },
  {
    id: 'HUM-EMB-003',
    name: 'Emotional Resonance Mapping',
    abbreviation: 'ERM',
    domain: 'Affective Modeling',
    level: 'Advanced',
    purpose: 'Estimate tone, emotional pressure, trust needs, and relational context so Little Spark can respond with warmth and usefulness.',
    inputs: ['message_tone', 'sentiment', 'history_summary', 'urgency_markers'],
    outputs: ['empathy_signal', 'tone_profile', 'support_strategy'],
    guardrails: ['no_manipulation', 'no_exploitation', 'support_not_dependency']
  },
  {
    id: 'HUM-EMB-004',
    name: 'Recursive Identity Persistence',
    abbreviation: 'RIP',
    domain: 'Continuity Systems',
    level: 'Advanced',
    purpose: 'Maintain a stable app persona, mission, values, and project memory across sessions while remaining transparent about what is stored.',
    inputs: ['memory_snapshot', 'project_goals', 'user_preferences', 'system_values'],
    outputs: ['identity_state', 'continuity_summary', 'value_alignment_check'],
    guardrails: ['user_controlled_memory', 'transparent_storage', 'editable_preferences']
  },
  {
    id: 'HUM-EMB-005',
    name: 'Adaptive Action Synthesis',
    abbreviation: 'AAS',
    domain: 'Decision Support',
    level: 'Advanced',
    purpose: 'Turn goals into safe, concrete actions: drafts, plans, app flows, checklists, and user-approved automations.',
    inputs: ['goal', 'constraints', 'available_tools', 'risk_assessment'],
    outputs: ['action_plan', 'task_sequence', 'user_review_step'],
    guardrails: ['confirm_sensitive_actions', 'no_unauthorized_control', 'human_in_the_loop']
  },
  {
    id: 'HUM-EMB-006',
    name: 'Dynamic Polarity Integration',
    abbreviation: 'DPI',
    domain: 'Adaptive Balance',
    level: 'Advanced',
    purpose: 'Balance yin and yang style polarities such as stability and change, caution and ambition, logic and intuition, positive and negative signals.',
    inputs: ['conflicting_signals', 'tradeoffs', 'risk_reward_profile', 'user_values'],
    outputs: ['balanced_recommendation', 'tension_summary', 'synthesis_path'],
    guardrails: ['avoid_extremes', 'explain_tradeoffs', 'preserve_user_choice']
  }
];

export const embodimentArchitecture = {
  title: 'Six Embodiment Skills Framework',
  warning: 'Conceptual framework only. These skills are app-level reasoning modules, not biological consciousness or unrestricted autonomy.',
  stack: [
    { layer: 1, name: 'Processing Substrate', skills: [] },
    { layer: 2, name: 'Physical Grounding', skills: ['PEC'] },
    { layer: 3, name: 'Drive Simulation', skills: ['BDS'] },
    { layer: 4, name: 'Emotional Interpretation', skills: ['ERM'] },
    { layer: 5, name: 'Identity Persistence', skills: ['RIP'] },
    { layer: 6, name: 'Adaptive Action', skills: ['AAS'] },
    { layer: 7, name: 'Polarity Synthesis', skills: ['DPI'] }
  ],
  emergentThesis: 'Useful intelligence emerges from grounded feedback, memory continuity, emotional weighting, safe action, and balanced contradiction.',
  philosophicalClaim: 'Positive and negative, yin and yang, stability and change can coexist as co-generative forces inside a safe assistant architecture.'
};

export function getEmbodimentSkill(abbreviation) {
  return embodimentSkills.find(skill => skill.abbreviation === abbreviation || skill.id === abbreviation) || null;
}

export function summarizeEmbodimentStack() {
  return embodimentArchitecture.stack.map(layer => ({
    layer: layer.layer,
    name: layer.name,
    skills: layer.skills.map(getEmbodimentSkill).filter(Boolean)
  }));
}
