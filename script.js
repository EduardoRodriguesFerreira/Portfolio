const WHATSAPP_NUMBER = "5511993862231";

const root = document.documentElement;
const themeToggle = document.getElementById("themeToggle");
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");
const quoteForm = document.getElementById("quoteForm");

const formatCurrency = (value) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 }).format(value);

function buildWhatsAppUrl(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function getInitialTheme() {
  const savedTheme = localStorage.getItem("portfolio-theme");
  if (savedTheme === "light" || savedTheme === "dark") return savedTheme;
  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

function updateThemeIcon() {
  const icon = themeToggle?.querySelector("i");
  if (!icon) return;
  const isDark = root.getAttribute("data-theme") === "dark";
  icon.className = isDark ? "fa-solid fa-sun" : "fa-solid fa-moon";
  themeToggle.setAttribute("aria-label", isDark ? "Ativar tema claro" : "Ativar tema escuro");
}

function setupTheme() {
  root.setAttribute("data-theme", getInitialTheme());
  updateThemeIcon();
  themeToggle?.addEventListener("click", () => {
    const nextTheme = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", nextTheme);
    localStorage.setItem("portfolio-theme", nextTheme);
    updateThemeIcon();
  });
}

function setupMenu() {
  navToggle?.addEventListener("click", () => {
    const isOpen = navMenu?.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    navToggle.querySelector("i").className = isOpen ? "fa-solid fa-xmark" : "fa-solid fa-bars";
  });

  navMenu?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("open");
      navToggle?.setAttribute("aria-expanded", "false");
      const icon = navToggle?.querySelector("i");
      if (icon) icon.className = "fa-solid fa-bars";
    });
  });
}

function setupReveal() {
  const revealItems = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  revealItems.forEach((item) => observer.observe(item));
}

function setupWhatsAppLinks() {
  document.querySelectorAll("[data-whatsapp-message]").forEach((link) => {
    link.setAttribute("href", buildWhatsAppUrl(link.dataset.whatsappMessage));
    link.setAttribute("target", "_blank");
    link.setAttribute("rel", "noreferrer");
  });

  document.querySelectorAll("[data-service-name]").forEach((link) => {
    const service = link.dataset.serviceName;
    link.setAttribute("href", buildWhatsAppUrl(`Olá, vi seu portfólio e tenho interesse no serviço de ${service}. Gostaria de conversar sobre um orçamento.`));
    link.setAttribute("target", "_blank");
    link.setAttribute("rel", "noreferrer");
  });

  document.querySelectorAll("[data-project-name]").forEach((link) => {
    const project = link.dataset.projectName;
    link.setAttribute("href", buildWhatsAppUrl(`Olá, vi o projeto ${project} no seu portfólio e gostaria de algo parecido.`));
    link.setAttribute("target", "_blank");
    link.setAttribute("rel", "noreferrer");
  });
}

function setupProjectFilters() {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      filterButtons.forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      const selectedFilter = button.dataset.filter;
      projectCards.forEach((card) => {
        const categories = card.dataset.category || "";
        card.hidden = !(selectedFilter === "all" || categories.includes(selectedFilter));
      });
    });
  });
}

function setupQuoteForm() {
  quoteForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    const selectedServices = Array.from(quoteForm.querySelectorAll('input[name="budgetService"]:checked')).map((input) => input.value);
    const servicesText = selectedServices.length ? selectedServices.join(", ") : "ainda não defini exatamente o serviço";
    const message = `Olá, vi seu portfólio e tenho interesse nos seguintes serviços: ${servicesText}. Gostaria de conversar sobre um orçamento.`;
    window.open(buildWhatsAppUrl(message), "_blank", "noopener,noreferrer");
  });
}

function setupFunctionalApps() {
  const app = document.body.dataset.app;
  if (app === "clinic-landing") setupLandingForm("clinicAppointmentForm", "Landing Page Cl\u00ednica");
  if (app === "service-landing") setupLandingForm("serviceContactForm", "Landing Page Consultoria");
  if (app === "financial-dashboard") setupFinancialDashboardApp();
  if (app === "sales-dashboard") setupSalesDashboardApp();
  if (app === "admin-system") setupAdminSystemApp();
  if (app === "proposals-contracts") setupProposalApp();
  if (app === "service-crm") setupCrmApp();
  if (app === "api-integrations") setupConnectApiApp();
}

function setupLandingForm(formId, projectName) {
  const form = document.getElementById(formId);
  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const name = data.get("name") || "Visitante";
    const service = data.get("service") || "servi\u00e7o";
    const company = data.get("company");
    const email = data.get("email");
    const phone = data.get("phone");
    const unit = data.get("unit");
    const date = data.get("date");
    const time = data.get("time");
    const budget = data.get("budget");
    const deadline = data.get("deadline");
    const notes = data.get("message");
    const feedback = form.querySelector("[data-form-feedback]") || document.getElementById(`${formId}Feedback`) || document.getElementById("clinicFormFeedback");
    const details = [
      company && `Empresa: ${company}`,
      email && `E-mail: ${email}`,
      phone && `Telefone: ${phone}`,
      unit && `Unidade: ${unit}`,
      date && `Data preferida: ${formatFormDate(date)}`,
      time && `Hor\u00e1rio: ${time}`,
      budget && `Investimento: ${budget}`,
      deadline && `Prazo: ${deadline}`,
      notes && `Observa\u00e7\u00e3o: ${notes}`
    ].filter(Boolean);
    const message = [
      `Ol\u00e1, meu nome \u00e9 ${name}.`,
      `Vi o projeto ${projectName} no seu portf\u00f3lio e tenho interesse em ${service}.`,
      details.length ? `Dados enviados: ${details.join(" | ")}.` : "",
      "Gostaria de conversar sobre um projeto parecido."
    ].filter(Boolean).join(" ");
    if (feedback) feedback.textContent = "Mensagem pronta aberta no WhatsApp.";
    window.open(buildWhatsAppUrl(message), "_blank", "noopener,noreferrer");
  });
}

function formatFormDate(dateValue) {
  if (!dateValue) return "";
  const [year, month, day] = dateValue.split("-");
  if (!year || !month || !day) return dateValue;
  return `${day}/${month}/${year}`;
}

function setupFinancialDashboardApp() {
  const periodFilter = document.getElementById("financePeriodFilter");
  const table = document.getElementById("financeTable");
  const chart = document.getElementById("financeChart");
  const rows = [
    { period: "Jan", type: "Receita", status: "Recebido", description: "Serviços digitais", amount: 42000 },
    { period: "Jan", type: "Despesa", status: "Pago", description: "Ferramentas e operação", amount: 12000 },
    { period: "Fev", type: "Receita", status: "Recebido", description: "Projetos web", amount: 56000 },
    { period: "Fev", type: "Despesa", status: "Pago", description: "Operação mensal", amount: 18000 },
    { period: "Mar", type: "Receita", status: "Pendente", description: "Contratos recorrentes", amount: 64000 },
    { period: "Mar", type: "Despesa", status: "Pago", description: "Serviços terceiros", amount: 21000 }
  ];

  function render() {
    const period = periodFilter?.value || "Todos";
    const visible = period === "Todos" ? rows : rows.filter((item) => item.period === period);
    const revenue = visible.filter((item) => item.type === "Receita").reduce((sum, item) => sum + item.amount, 0);
    const expense = visible.filter((item) => item.type === "Despesa").reduce((sum, item) => sum + item.amount, 0);
    const profit = revenue - expense;
    const margin = revenue ? Math.round((profit / revenue) * 100) : 0;
    setText("financeRevenue", formatCurrency(revenue));
    setText("financeExpense", formatCurrency(expense));
    setText("financeProfit", formatCurrency(profit));
    setText("financeMargin", `${margin}%`);

    if (chart) {
      const periods = ["Jan", "Fev", "Mar"];
      const values = periods.map((item) => rows.filter((row) => row.period === item && row.type === "Receita").reduce((sum, row) => sum + row.amount, 0));
      const max = Math.max(...values);
      chart.innerHTML = periods.map((item, index) => `<div class="chart-row"><span>${item}</span><i style="width:${Math.max(8, Math.round((values[index] / max) * 100))}%"></i><b>${formatCurrency(values[index])}</b></div>`).join("");
    }

    if (table) {
      table.innerHTML = visible.map((item) => `
        <tr>
          <td>${item.period}</td>
          <td>${item.description}</td>
          <td>${item.type}</td>
          <td><span class="status ${item.status === "Pendente" ? "warn" : "ok"}">${item.status}</span></td>
          <td>${formatCurrency(item.amount)}</td>
        </tr>
      `).join("");
    }
  }

  periodFilter?.addEventListener("change", render);
  render();
}

function setupSalesDashboardApp() {
  const monthFilter = document.getElementById("salesMonthFilter");
  const channelFilter = document.getElementById("salesChannelFilter");
  const table = document.getElementById("salesTable");
  const chart = document.getElementById("salesChart");
  const rows = [
    { month: "Jan", channel: "WhatsApp", opportunity: "Landing page", leads: 42, conversion: 26, sales: 11, ticket: 2400 },
    { month: "Fev", channel: "Instagram", opportunity: "Site institucional", leads: 58, conversion: 31, sales: 18, ticket: 3100 },
    { month: "Mar", channel: "Indicação", opportunity: "Sistema interno", leads: 33, conversion: 42, sales: 14, ticket: 5200 },
    { month: "Abr", channel: "Google", opportunity: "Dashboard", leads: 47, conversion: 34, sales: 16, ticket: 4300 }
  ];

  function render() {
    const month = monthFilter?.value || "Todos";
    const channel = channelFilter?.value || "Todos";
    const visible = rows.filter((item) => (month === "Todos" || item.month === month) && (channel === "Todos" || item.channel === channel));
    const leads = visible.reduce((sum, item) => sum + item.leads, 0);
    const sales = visible.reduce((sum, item) => sum + item.sales, 0);
    const averageTicket = sales ? Math.round(visible.reduce((sum, item) => sum + item.ticket * item.sales, 0) / sales) : 0;
    const conversion = leads ? Math.round((sales / leads) * 100) : 0;
    setText("salesLeads", leads);
    setText("salesConversion", `${conversion}%`);
    setText("salesClosed", sales);
    setText("salesTicket", formatCurrency(averageTicket));

    if (chart) {
      const max = Math.max(...rows.map((item) => item.leads));
      chart.innerHTML = rows.map((item) => `<div class="chart-row"><span>${item.channel}</span><i style="width:${Math.max(8, Math.round((item.leads / max) * 100))}%"></i><b>${item.leads}</b></div>`).join("");
    }

    if (table) {
      table.innerHTML = visible.map((item) => `
        <tr>
          <td>${item.month}</td>
          <td>${item.opportunity}</td>
          <td>${item.channel}</td>
          <td>${item.leads}</td>
          <td>${item.conversion}%</td>
          <td>${formatCurrency(item.ticket)}</td>
        </tr>
      `).join("");
    }
  }

  [monthFilter, channelFilter].forEach((control) => control?.addEventListener("change", render));
  render();
}

function setupAdminSystemApp() {
  const form = document.getElementById("adminForm");
  const table = document.getElementById("adminTable");
  const statusFilter = document.getElementById("adminStatusFilter");
  let records = [
    { client: "Cliente 01", service: "Site institucional", status: "Em andamento", value: 5400 },
    { client: "Cliente 02", service: "Dashboard financeiro", status: "Concluído", value: 7200 },
    { client: "Cliente 03", service: "Automação de relatório", status: "Pendente", value: 3900 }
  ];

  function render() {
    const filter = statusFilter?.value || "Todos";
    const visible = filter === "Todos" ? records : records.filter((item) => item.status === filter);
    setText("adminClients", new Set(records.map((item) => item.client)).size);
    setText("adminServices", records.length);
    setText("adminOpen", records.filter((item) => item.status !== "Concluído").length);
    setText("adminValue", formatCurrency(records.reduce((sum, item) => sum + item.value, 0)));
    if (table) {
      table.innerHTML = visible.map((item) => `
        <tr>
          <td>${item.client}</td>
          <td>${item.service}</td>
          <td><span class="status ${item.status === "Concluído" ? "ok" : item.status === "Pendente" ? "warn" : "info"}">${item.status}</span></td>
          <td>${formatCurrency(item.value)}</td>
        </tr>
      `).join("");
    }
  }

  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    records.unshift({
      client: data.get("client") || "Novo cliente",
      service: data.get("service") || "Novo serviço",
      status: data.get("status") || "Pendente",
      value: Number(data.get("value")) || 0
    });
    form.reset();
    render();
  });

  statusFilter?.addEventListener("change", render);
  render();
}

function setupProposalApp() {
  const form = document.getElementById("proposalForm");
  const statusFilter = document.getElementById("proposalStatusFilter");
  const table = document.getElementById("proposalTable");
  const pipeline = document.getElementById("proposalPipeline");
  const preview = document.getElementById("contractPreview");
  let proposals = [
    { client: "Cliente Saúde", title: "Landing page com agendamento", value: 8900, status: "aprovada", owner: "Eduardo" },
    { client: "Cliente Varejo", title: "Dashboard comercial", value: 5200, status: "enviada", owner: "Eduardo" },
    { client: "Cliente Consultoria", title: "Automação de relatórios", value: 3600, status: "convertida", owner: "Eduardo" },
    { client: "Cliente Serviços", title: "Sistema administrativo", value: 12400, status: "rascunho", owner: "Eduardo" },
    { client: "Cliente Educação", title: "Portal de atendimento", value: 7200, status: "recusada", owner: "Eduardo" }
  ];

  function render() {
    const selectedStatus = statusFilter?.value || "todos";
    const visible = selectedStatus === "todos" ? proposals : proposals.filter((item) => item.status === selectedStatus);
    const total = proposals.length;
    const approved = proposals.filter((item) => item.status === "aprovada" || item.status === "convertida").length;
    const approvalRate = total ? Math.round((approved / total) * 100) : 0;
    const forecast = proposals.filter((item) => item.status !== "recusada" && item.status !== "rascunho").reduce((sum, item) => sum + item.value, 0);
    setText("proposalTotal", total);
    setText("proposalApproval", `${approvalRate}%`);
    setText("proposalForecast", formatCurrency(forecast));
    setText("proposalContracts", proposals.filter((item) => item.status === "convertida").length);

    if (table) {
      table.innerHTML = visible.map((item) => `
        <tr>
          <td><strong>${item.title}</strong><br><small>${item.client}</small></td>
          <td><span class="status ${statusClass(item.status)}">${item.status}</span></td>
          <td>${formatCurrency(item.value)}</td>
          <td>${item.owner}</td>
          <td><div class="table-actions"><button class="mini-btn primary" type="button" data-contract="${proposals.indexOf(item)}">Gerar contrato</button><button class="mini-btn" type="button" data-next-status="${proposals.indexOf(item)}">Avançar</button></div></td>
        </tr>
      `).join("");
    }

    if (pipeline) {
      const statuses = ["rascunho", "enviada", "aprovada", "convertida", "recusada"];
      pipeline.innerHTML = statuses.map((status) => {
        const items = proposals.filter((item) => item.status === status);
        return `<section class="pipeline-column"><h3>${status}</h3>${items.length ? items.map((item) => `<article class="deal-card"><strong>${item.client}</strong><small>${item.title} • ${formatCurrency(item.value)}</small></article>`).join("") : '<div class="empty-state">Sem itens</div>'}</section>`;
      }).join("");
    }
  }

  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    proposals.unshift({
      client: data.get("client") || "Novo cliente",
      title: data.get("title") || "Nova proposta",
      value: Number(data.get("value")) || 0,
      status: data.get("status") || "rascunho",
      owner: data.get("owner") || "Eduardo"
    });
    form.reset();
    render();
  });

  table?.addEventListener("click", (event) => {
    const contractButton = event.target.closest("[data-contract]");
    const nextButton = event.target.closest("[data-next-status]");
    if (contractButton) {
      const item = proposals[Number(contractButton.dataset.contract)];
      if (item && preview) {
        preview.innerHTML = `<h3>Contrato de prestação de serviços</h3><p><strong>Cliente:</strong> ${item.client}</p><p><strong>Objeto:</strong> ${item.title}</p><p><strong>Valor:</strong> ${formatCurrency(item.value)}</p><p>Este documento é uma simulação gerada automaticamente com base nos dados cadastrados na proposta.</p><p>Responsável pelo atendimento: ${item.owner}.</p>`;
      }
    }
    if (nextButton) {
      const item = proposals[Number(nextButton.dataset.nextStatus)];
      if (!item) return;
      const flow = ["rascunho", "enviada", "aprovada", "convertida"];
      const current = flow.indexOf(item.status);
      item.status = flow[current + 1] || "convertida";
      render();
    }
  });

  statusFilter?.addEventListener("change", render);
  render();
}

function setupCrmApp() {
  const form = document.getElementById("crmForm");
  const stageFilter = document.getElementById("crmStageFilter");
  const board = document.getElementById("crmBoard");
  const table = document.getElementById("crmTable");
  let clients = [
    { name: "Cliente Saúde", contact: "Contato 01", stage: "Novo lead", next: "2026-05-25", note: "Quer landing page para agendamento" },
    { name: "Cliente Varejo", contact: "Contato 02", stage: "Em atendimento", next: "2026-05-24", note: "Aguardando orçamento de dashboard" },
    { name: "Cliente Serviços", contact: "Contato 03", stage: "Proposta enviada", next: "2026-05-28", note: "Sistema administrativo simples" },
    { name: "Cliente Alimentação", contact: "Contato 04", stage: "Cliente ativo", next: "2026-06-03", note: "Manutenção mensal" }
  ];

  function render() {
    const selectedStage = stageFilter?.value || "Todos";
    const visible = selectedStage === "Todos" ? clients : clients.filter((item) => item.stage === selectedStage);
    setText("crmLeads", clients.filter((item) => item.stage !== "Cliente ativo").length);
    setText("crmActive", clients.filter((item) => item.stage === "Cliente ativo").length);
    setText("crmFollowups", clients.filter((item) => item.next).length);
    setText("crmTotal", clients.length);

    if (board) {
      const stages = ["Novo lead", "Em atendimento", "Proposta enviada", "Cliente ativo"];
      board.innerHTML = stages.map((stage) => {
        const items = clients.filter((item) => item.stage === stage);
        return `<section class="pipeline-column"><h3>${stage}</h3>${items.length ? items.map((item) => `<article class="client-card"><strong>${item.name}</strong><small>${item.contact} • ${item.next}</small></article>`).join("") : '<div class="empty-state">Sem clientes</div>'}</section>`;
      }).join("");
    }

    if (table) {
      table.innerHTML = visible.map((item) => `<tr><td><strong>${item.name}</strong><br><small>${item.note}</small></td><td>${item.contact}</td><td><span class="status info">${item.stage}</span></td><td>${item.next}</td><td><button class="mini-btn primary" type="button" data-crm-next="${clients.indexOf(item)}">Avançar</button></td></tr>`).join("");
    }
  }

  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    clients.unshift({
      name: data.get("name") || "Novo cliente",
      contact: data.get("contact") || "Contato",
      stage: data.get("stage") || "Novo lead",
      next: data.get("next") || "Sem data",
      note: data.get("note") || "Sem observações"
    });
    form.reset();
    render();
  });

  table?.addEventListener("click", (event) => {
    const button = event.target.closest("[data-crm-next]");
    if (!button) return;
    const item = clients[Number(button.dataset.crmNext)];
    const flow = ["Novo lead", "Em atendimento", "Proposta enviada", "Cliente ativo"];
    const current = flow.indexOf(item.stage);
    item.stage = flow[current + 1] || "Cliente ativo";
    render();
  });

  stageFilter?.addEventListener("change", render);
  render();
}

function setupConnectApiApp() {
  const endpointButtons = document.querySelectorAll("[data-endpoint]");
  const responseBox = document.getElementById("apiResponse");
  const logs = document.getElementById("apiLogs");
  const responses = {
    clientes: { status: "success", data: [{ id: 1, nome: "Cliente Saúde", status: "ativo" }, { id: 2, nome: "Cliente Varejo", status: "lead" }] },
    pedidos: { status: "created", pedido_id: 2401, origem: "landing-page", dashboard_sync: true },
    financeiro: { status: "success", receita: 184000, despesa: 72000, lucro: 112000 },
    token: { access_token: "eyJhbGciOiJIUzI1NiJ9.demo", token_type: "Bearer", expires_in: 3600 }
  };
  let requestCount = 12842;

  function renderResponse(endpoint) {
    endpointButtons.forEach((button) => button.classList.toggle("active", button.dataset.endpoint === endpoint));
    const payload = responses[endpoint] || responses.clientes;
    if (responseBox) responseBox.textContent = JSON.stringify(payload, null, 2);
    requestCount += 1;
    setText("apiRequests", requestCount.toLocaleString("pt-BR"));
    if (logs) {
      const line = document.createElement("div");
      line.className = "log-line";
      line.innerHTML = `<span>${new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit", second: "2-digit" })}</span><span>${endpoint.toUpperCase()}</span><span class="status ok">200</span>`;
      logs.prepend(line);
    }
  }

  endpointButtons.forEach((button) => button.addEventListener("click", () => renderResponse(button.dataset.endpoint)));
  renderResponse("clientes");
}

function setText(id, value) {
  const element = document.getElementById(id);
  if (element) element.textContent = value;
}

function statusClass(status) {
  if (status === "aprovada" || status === "convertida") return "ok";
  if (status === "recusada") return "danger";
  if (status === "enviada") return "info";
  return "warn";
}

setupTheme();
setupMenu();
setupReveal();
setupProjectFilters();
setupWhatsAppLinks();
setupQuoteForm();
setupFunctionalApps();
