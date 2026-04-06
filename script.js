document.addEventListener("DOMContentLoaded", function () {
    const tabButtons = document.querySelectorAll(".tab-button");
    const tabPanels = document.querySelectorAll(".tab-panel");

    const hubDetails = {
        center: {
            title: "DISA Megacenter",
            subtitle: "Integrated digital infrastructure model",
            text: "The megacenter model brings compute, storage, networking, security, automation, and cloud integration into a common, repeatable architecture that can scale by pod and operate consistently across all three sites."
        },
        iac: {
            title: "Infrastructure as Code (IaC)",
            subtitle: "Standardized deployment and lifecycle management",
            text: "IaC supports consistent builds, faster environment provisioning, and stronger configuration control across all megacenters. It helps reduce drift between sites and improves maintainability over time."
        },
        sdn: {
            title: "Software Defined Networking (SDN)",
            subtitle: "Policy-driven segmentation and fabric control",
            text: "The architecture uses a software-defined network fabric to simplify segmentation, tenant isolation, and policy consistency while supporting high-bandwidth east-west and inter-site traffic."
        },
        sda: {
            title: "Software Defined Access (SDA)",
            subtitle: "Identity-aware access and policy enforcement",
            text: "Software-defined access patterns improve how users, devices, and workloads are admitted and segmented, helping align connectivity with mission and security requirements."
        },
        zt: {
            title: "Zero Trust Architecture",
            subtitle: "Security embedded across all layers",
            text: "Zero trust is treated as a foundational design principle, combining continuous verification, segmentation, strong identity enforcement, and encryption to protect users, systems, and data."
        },
        auto: {
            title: "Automation & AI Orchestration",
            subtitle: "Operational efficiency and future workload readiness",
            text: "Automation supports consistent operations, while orchestration patterns help the platform support advanced analytics, AI/ML workloads, and more responsive infrastructure management."
        },
        cloud: {
            title: "Hybrid & Multi-Cloud",
            subtitle: "Connected, portable, and flexible service delivery",
            text: "The megacenters are designed to operate as part of a broader hybrid model, supporting workload portability and interoperability with DISA and JWCC-connected cloud environments."
        },
        icam: {
            title: "ICAM (Identity & Access)",
            subtitle: "Identity-centric control model",
            text: "Identity, credential, and access management is central to platform security. It supports attribute-based access, stronger governance, and better control inheritance across hosted environments."
        },
        hosting: {
            title: "Enterprise Hosting",
            subtitle: "Scalable hosting for mission and enterprise platforms",
            text: "The megacenter model provides standardized enterprise hosting for a broad mix of mission systems, business platforms, and future high-density workloads through modular pods and shared platform services."
        },
        cyber: {
            title: "Cyber Operations",
            subtitle: "Visibility, defense, and operational response",
            text: "Cyber operations are strengthened through centralized monitoring, automated compliance, stronger segmentation, and a more consistent security baseline across all sites."
        }
    };

    const siteDetails = {
        ogdn: {
            title: "OGDN",
            subtitle: "Western hub",
            text: "OGDN serves as the western megacenter hub, supporting Pacific and western mission needs while forming one half of the primary paired backbone with COLS."
        },
        okc: {
            title: "OKC",
            subtitle: "Central swing site",
            text: "OKC serves as the central swing site, providing surge capacity, migration flexibility, and additional disaster-recovery support across the three-site model."
        },
        cols: {
            title: "COLS",
            subtitle: "Eastern hub",
            text: "COLS serves as the eastern megacenter hub, supporting Atlantic and eastern mission needs while forming one half of the primary paired backbone with OGDN."
        }
    };

    const networkDetails = {
        cloud: {
            title: "Cloud & Enterprise Edge",
            subtitle: "External connectivity and hybrid integration",
            text: "This layer represents secure interconnect to enterprise environments, mission partners, and cloud services. It supports hybrid operations and allows the megacenter network to function as part of a broader hosting ecosystem."
        },
        backbone: {
            title: "Inter-Site Backbone",
            subtitle: "High-bandwidth cross-site connectivity",
            text: "The backbone ties the three megacenters together and supports replication, mobility, continuity, and coordinated operations across sites. It is central to making the three-site model act like a unified platform."
        },
        fabric: {
            title: "Software-Defined Network Fabric",
            subtitle: "Core architecture layer",
            text: "The fabric is the operational center of the network model. It supports segmentation, tenant isolation, policy consistency, and scalable connectivity across megacenters without requiring the site narrative to be tied to one vendor-specific implementation."
        },
        security: {
            title: "Segmentation & Security",
            subtitle: "Identity-aware control and inspection",
            text: "Security is embedded into the network through zero-trust principles, segmentation, traffic inspection, and policy enforcement. This enables mixed mission hosting with stronger boundaries and more consistent control."
        },
        ops: {
            title: "Operations & Visibility",
            subtitle: "Telemetry, monitoring, and automation",
            text: "Network operations depend on strong visibility and automation. Telemetry, monitoring, and integrated operational tools help DISA maintain performance, troubleshoot issues, and manage the estate more consistently."
        }
    };

    function activateTab(targetId) {
        tabButtons.forEach(function (button) {
            const isActive = button.getAttribute("data-tab") === targetId;
            button.classList.toggle("active", isActive);
            button.setAttribute("aria-selected", String(isActive));
            button.tabIndex = isActive ? 0 : -1;
        });

        tabPanels.forEach(function (panel) {
            const isActive = panel.id === targetId;
            panel.classList.toggle("active", isActive);
            panel.hidden = !isActive;
        });
    }

    tabButtons.forEach(function (button, index) {
        button.addEventListener("keydown", function (event) {
            if (event.key !== "ArrowRight" && event.key !== "ArrowLeft" && event.key !== "Home" && event.key !== "End") {
                return;
            }

            event.preventDefault();

            let nextIndex = index;
            if (event.key === "ArrowRight") nextIndex = (index + 1) % tabButtons.length;
            if (event.key === "ArrowLeft") nextIndex = (index - 1 + tabButtons.length) % tabButtons.length;
            if (event.key === "Home") nextIndex = 0;
            if (event.key === "End") nextIndex = tabButtons.length - 1;

            const nextButton = tabButtons[nextIndex];
            nextButton.focus();
            activateTab(nextButton.getAttribute("data-tab"));
        });
    });

    tabButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            const targetId = button.getAttribute("data-tab");
            activateTab(targetId);
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    });

    document.querySelectorAll(".accordion").forEach(function (item, index) {
        const button = item.querySelector(".accordion-button");
        const body = item.querySelector(".accordion-body");
        if (!button || !body) return;

        const panelId = "accordion-panel-" + (index + 1);
        button.setAttribute("aria-controls", panelId);
        button.setAttribute("aria-expanded", String(item.classList.contains("open")));
        body.id = panelId;
    });

    document.querySelectorAll(".timeline-phase").forEach(function (item, index) {
        const button = item.querySelector(".accordion-button");
        const body = item.querySelector(".timeline-phase-body");
        if (!button || !body) return;

        const panelId = "timeline-panel-" + (index + 1);
        button.setAttribute("aria-controls", panelId);
        button.setAttribute("aria-expanded", String(item.classList.contains("open")));
        body.id = panelId;
    });

    window.toggleAccordion = function (button) {
        const item = button.closest(".accordion");
        if (item) {
            item.classList.toggle("open");
            button.setAttribute("aria-expanded", String(item.classList.contains("open")));
        }
    };

    window.toggleTimeline = function (button) {
        const item = button.closest(".timeline-phase");
        if (item) {
            item.classList.toggle("open");
            button.setAttribute("aria-expanded", String(item.classList.contains("open")));
        }
    };

    window.showHubDetail = function (key) {
        const detail = hubDetails[key];
        if (!detail) return;

        const title = document.getElementById("hub-detail-title");
        const subtitle = document.getElementById("hub-detail-subtitle");
        const text = document.getElementById("hub-detail-text");

        if (title) title.textContent = detail.title;
        if (subtitle) subtitle.textContent = detail.subtitle;
        if (text) text.textContent = detail.text;
    };

    window.showSiteDetail = function (key) {
        const detail = siteDetails[key];
        if (!detail) return;

        const title = document.getElementById("site-detail-title");
        const subtitle = document.getElementById("site-detail-subtitle");
        const text = document.getElementById("site-detail-text");

        if (title) title.textContent = detail.title;
        if (subtitle) subtitle.textContent = detail.subtitle;
        if (text) text.textContent = detail.text;
    };

    window.showNetworkDetail = function (key) {
        const detail = networkDetails[key];
        if (!detail) return;

        const title = document.getElementById("network-detail-title");
        const subtitle = document.getElementById("network-detail-subtitle");
        const text = document.getElementById("network-detail-text");

        if (title) title.textContent = detail.title;
        if (subtitle) subtitle.textContent = detail.subtitle;
        if (text) text.textContent = detail.text;
    };

    activateTab("overview");
    showHubDetail("center");
    showSiteDetail("ogdn");
    showNetworkDetail("fabric");
});

