export const kpis = {
  interactions: '1.284',
  approvalRate: '87,4%',
  pendingReviews: '42',
  failedAutomations: '3',
  averageScore: '8,6',
}

export const qualityTrend = [
  { month: 'Jan', score: 7.8 },
  { month: 'Fev', score: 8.1 },
  { month: 'Mar', score: 8.3 },
  { month: 'Abr', score: 8.6 },
]

export const interactions = [
  {
    id: 'INT-001',
    source: 'Chatbot Financeiro',
    userInput: 'Qual o status do meu pagamento?',
    status: 'approved',
    score: 9.1,
    tags: ['financeiro', 'atendimento'],
    createdAt: '2026-05-06',
  },
  {
    id: 'INT-002',
    source: 'Assistente RH',
    userInput: 'Como solicitar férias?',
    status: 'partial',
    score: 7.2,
    tags: ['rh'],
    createdAt: '2026-05-06',
  },
]
