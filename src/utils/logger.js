export const mockBackendLog = (payload) => {
  console.log("=== BACKEND PAYLOAD LOG ===");
  const formattedLog = {
    dispute_id: payload.dispute_id,
    dispute_type: payload.dispute_type,
    decision: payload.decision,
    refund_amount: payload.refund_amount,
    status: payload.status,
    agent_notes: payload.agent_notes,
    agent_id: payload.agent_id
  };
  
  console.log(JSON.stringify(formattedLog, null, 2));
  console.log("===========================");
};
