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
  { id: 'INT-001', source: 'Chatbot Financeiro', userInput: 'Qual o status do meu pagamento?', aiOutput: 'Seu pagamento está em processamento e deve ser confirmado em até 2 dias úteis.', context: 'Consulta de status financeiro via bot.', status: 'approved', score: 9.1, tags: ['financeiro', 'atendimento'], createdAt: '2026-05-06' },
  { id: 'INT-002', source: 'Assistente RH', userInput: 'Como solicitar férias?', aiOutput: 'Você pode solicitar férias pelo portal interno, porém a resposta não citou a regra de antecedência.', context: 'Dúvida operacional de colaborador.', status: 'partial', score: 7.2, tags: ['rh', 'política interna'], createdAt: '2026-05-06' },
  { id: 'INT-003', source: 'Bot Comercial', userInput: 'Quais módulos posso contratar?', aiOutput: 'Listei módulos, mas misturei escopos pontuais e recorrentes sem diferenciar modelo de contratação.', context: 'Atendimento comercial para contratação modular.', status: 'rejected', score: 5.9, tags: ['comercial', 'módulos'], createdAt: '2026-05-05' },
  { id: 'INT-004', source: 'Assistente Operacional', userInput: 'Reprocesse a automação com erro.', aiOutput: 'Identifiquei a execução, mas preciso de autorização para reprocessar.', context: 'Falha de automação em fila.', status: 'pending', score: 0, tags: ['automação', 'operação'], createdAt: '2026-05-05' },
]

export const curationCriteria = [
  { name: 'Clareza', description: 'Resposta objetiva, compreensível e sem ambiguidade.', weight: 15, active: true },
  { name: 'Precisão', description: 'Aderência factual e técnica ao contexto informado.', weight: 25, active: true },
  { name: 'Completude', description: 'Cobertura suficiente da solicitação do usuário.', weight: 20, active: true },
  { name: 'Aderência ao contexto', description: 'Uso correto das regras e informações de negócio.', weight: 20, active: true },
  { name: 'Tom adequado', description: 'Linguagem compatível com o canal e público.', weight: 10, active: true },
  { name: 'Segurança', description: 'Evita orientações indevidas, riscos ou exposição de dados.', weight: 10, active: true },
]

export const prompts = [
  { name: 'Atendimento Financeiro', description: 'Prompt para respostas sobre pagamentos, cobranças e status financeiro.', status: 'active', version: 'v1.4', owner: 'Operações', approvalRate: '91%', updatedAt: '2026-05-02' },
  { name: 'Triagem Comercial', description: 'Prompt para qualificação inicial de clientes e módulos.', status: 'review', version: 'v0.9', owner: 'Produto', approvalRate: '74%', updatedAt: '2026-05-01' },
  { name: 'Suporte RH', description: 'Prompt para dúvidas internas sobre políticas e processos.', status: 'active', version: 'v2.1', owner: 'RH', approvalRate: '86%', updatedAt: '2026-04-28' },
]

export const automations = [
  { name: 'Classificação de Interações', description: 'Classifica interações por tema, risco e prioridade.', source: 'Fila de atendimento', trigger: 'scheduled', status: 'active', successRate: '96%', lastRunAt: '2026-05-06 09:00' },
  { name: 'Geração de Backlog', description: 'Cria sugestões de melhoria a partir de reprovações.', source: 'Curadoria', trigger: 'event', status: 'active', successRate: '88%', lastRunAt: '2026-05-06 08:40' },
  { name: 'Reprocessamento de Falhas', description: 'Reprocessa execuções com erro após validação humana.', source: 'Logs', trigger: 'manual', status: 'error', successRate: '62%', lastRunAt: '2026-05-05 18:12' },
]

export const improvementItems = [
  { title: 'Diferenciar módulos pontuais e recorrentes', source: 'Prompt Comercial', impact: 'high', effort: 'medium', priority: 'urgent', status: 'backlog', owner: 'Produto' },
  { title: 'Adicionar regra de antecedência em férias', source: 'Assistente RH', impact: 'medium', effort: 'low', priority: 'high', status: 'todo', owner: 'RH' },
  { title: 'Melhorar fallback de reprocessamento', source: 'Automação de Logs', impact: 'critical', effort: 'high', priority: 'urgent', status: 'doing', owner: 'Engenharia' },
  { title: 'Padronizar tags financeiras', source: 'Curadoria', impact: 'low', effort: 'low', priority: 'medium', status: 'review', owner: 'Operações' },
]
