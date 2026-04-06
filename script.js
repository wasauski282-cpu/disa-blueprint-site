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
        core: {
            title: "Spine-Leaf Physical Fabric",
            subtitle: "Full-mesh spine-to-leaf connectivity below the SDN layer",
            text: "The physical fabric is shown as a simple spine-leaf topology. Multiple spine nodes connect to every leaf node, creating predictable east-west paths and a scalable underlay for workload access."
        },
        cloud: {
            title: "Enterprise & Cloud Interconnect",
            subtitle: "DISN, JWCC / DHMC, and external mission connectivity",
            text: "The top layer represents enterprise and cloud-facing access, linking DISN, JWCC / DHMC, and external mission or partner connectivity into the architecture through a defined interconnect layer."
        },
        backbone: {
            title: "Inter-Site Backbone / DCI",
            subtitle: "High-bandwidth transport for mobility and resilience",
            text: "This layer provides the high-bandwidth transport needed for replication, workload mobility, and resilience. The blueprint supports 100 Gbps class capability without tying the design to a specific vendor implementation."
        },
        fabric: {
            title: "Software-Defined Network Fabric",
            subtitle: "Segmentation, isolation, policy, and orchestration",
            text: "This is the operational center of the diagram. The software-defined fabric applies segmentation, tenant isolation, policy enforcement, and traffic orchestration across the environment."
        },
        workloads: {
            title: "Workload / Service Zones",
            subtitle: "Examples of hosted environments below the fabric",
            text: "The bottom tier shows how the common fabric supports distinct hosting domains. Mission Zones represent priority enclaves, Enterprise Hosting supports shared business and platform services, Data Platforms cover analytics and storage services, and AI / HPC Pods support high-density compute environments."
        },
        security: {
            title: "Zero Trust Security",
            subtitle: "Identity-based access, microsegmentation, and policy enforcement",
            text: "The left pillar represents the security functions applied across every layer of the architecture. Identity-based access controls who connects, microsegmentation constrains east-west movement, and policy enforcement keeps traffic aligned to mission and enterprise boundaries."
        },
        ops: {
            title: "Operations & Visibility",
            subtitle: "Telemetry, monitoring, automation, and DCIM / NOC awareness",
            text: "The right pillar represents the operational plane that supports the network. Telemetry and monitoring provide visibility, automation improves consistency and response time, and DCIM / NOC functions help coordinate health, capacity, and infrastructure operations."
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

        document.querySelectorAll(".network-hotspot").forEach(function (item) {
            item.classList.toggle("is-active", item.getAttribute("data-network-detail") === key);
        });
    };

    document.querySelectorAll(".network-hotspot").forEach(function (item) {
        item.addEventListener("click", function () {
            const key = item.getAttribute("data-network-detail");
            if (key) showNetworkDetail(key);
        });

        item.addEventListener("keydown", function (event) {
            if (event.key !== "Enter" && event.key !== " ") return;
            event.preventDefault();
            const key = item.getAttribute("data-network-detail");
            if (key) showNetworkDetail(key);
        });
    });

    activateTab("overview");
    showHubDetail("center");
    showSiteDetail("ogdn");
    showNetworkDetail("fabric");
});

