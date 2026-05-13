// Little Spark Wireless cloud adapter
// Current mode: local-first with cloud-ready hooks.
// When Firebase/Supabase credentials are added, route writes through this adapter.

window.LittleSparkCloud = (() => {
  const config = window.LITTLE_SPARK_CLOUD_CONFIG || { enabled: false };

  function isEnabled() {
    return Boolean(config.enabled && config.provider);
  }

  async function saveLead(lead) {
    if (!isEnabled()) return { ok: false, mode: 'local', reason: 'Cloud disabled' };
    // Future Firebase/Supabase write goes here.
    return { ok: false, mode: 'stub', reason: 'Cloud provider not connected yet', lead };
  }

  async function saveTicket(ticket) {
    if (!isEnabled()) return { ok: false, mode: 'local', reason: 'Cloud disabled' };
    // Future Firebase/Supabase write goes here.
    return { ok: false, mode: 'stub', reason: 'Cloud provider not connected yet', ticket };
  }

  async function saveUser(user) {
    if (!isEnabled()) return { ok: false, mode: 'local', reason: 'Cloud disabled' };
    // Future Firebase/Supabase write goes here.
    return { ok: false, mode: 'stub', reason: 'Cloud provider not connected yet', user };
  }

  async function saveSale(sale) {
    if (!isEnabled()) return { ok: false, mode: 'local', reason: 'Cloud disabled' };
    // Future Firebase/Supabase write goes here.
    return { ok: false, mode: 'stub', reason: 'Cloud provider not connected yet', sale };
  }

  return { isEnabled, saveLead, saveTicket, saveUser, saveSale };
})();
