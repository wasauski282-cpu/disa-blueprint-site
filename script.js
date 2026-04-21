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

    const securityDetails = {
        partner: {
            title: "Mission Partner",
            subtitle: "Federated access into approved mission services",
            text: "Mission partner traffic follows the standard zero trust path, but its destination is tightly bounded to approved mission services. Federation, request context, and policy keep partner access interoperable without exposing broader enterprise or management functions."
        },
        end_user: {
            title: "End User",
            subtitle: "Standard enterprise path with least-privilege access",
            text: "End users follow the full zero trust sequence through identity verification, device and session evaluation, policy decision, segmented access, and continuous monitoring before reaching approved enterprise services."
        },
        privileged: {
            title: "Privileged User",
            subtitle: "Administrative path with stronger controls and oversight",
            text: "Privileged users do not bypass zero trust controls. They traverse the same identity, context, policy, segmentation, and monitoring path as everyone else, then pass through an additional elevated-control checkpoint before reaching the management and automation plane."
        },
        authenticate: {
            title: "Identity Verification",
            subtitle: "Establish who is requesting access",
            text: "The path begins by verifying identity, credentials, and role. Strong authentication and approved trust relationships establish whether the request is legitimate enough to move forward."
        },
        context: {
            title: "Device & Session Context",
            subtitle: "Assess posture, session health, and environment",
            text: "Identity alone is not enough. Device posture, session state, request source, and environmental context are evaluated so risk can be factored into the access decision."
        },
        policy: {
            title: "Policy Decision Point",
            subtitle: "Apply zero trust decision logic",
            text: "This is the core zero trust decision point. Identity, device state, mission need, and user role are combined to determine whether access is allowed and what boundaries must apply."
        },
        segment: {
            title: "Policy Enforcement / Segmented Access",
            subtitle: "Permit only the approved path to the approved zone",
            text: "Approved requests are routed only into the specific service segment they are authorized to reach. Mission, enterprise, and management environments remain isolated even when they share infrastructure."
        },
        monitor: {
            title: "Continuous Monitoring",
            subtitle: "Observe, log, and reassess throughout the session",
            text: "Security does not stop once access is granted. Telemetry, audit events, alerts, and operational monitoring continue to assess the session for anomalies, misuse, or policy drift."
        },
        privileged_controls: {
            title: "Privileged / Elevated Control",
            subtitle: "Additional gates for administrative actions",
            text: "Administrative access is subject to stronger approval and monitoring requirements. The privileged path adds extra checks and oversight before any request can reach management systems or high-impact control planes."
        },
        mission_services: {
            title: "Mission Services",
            subtitle: "Approved partner and mission user destination zone",
            text: "Mission services are reachable only through approved mission-aligned policy paths. Partner and mission user traffic is constrained so it cannot expand laterally beyond the required enclave or service set."
        },
        enterprise_services: {
            title: "Enterprise Services",
            subtitle: "Standard business and support service zone",
            text: "Enterprise services provide the shared capabilities most end users need. Access is still policy-bound, segmented, and continuously monitored even when the destination is a routine business service."
        },
        management_plane: {
            title: "Management & Automation Plane",
            subtitle: "Administrative destination with strict elevation controls",
            text: "Management and automation functions sit behind the most restrictive path in the diagram. Only privileged users who satisfy the elevated-control step can reach this plane, and their actions remain under expanded audit and monitoring."
        }
    };

    const cloudDetails = {
        mission: {
            title: "Mission Workloads",
            subtitle: "Primary hosting remains inside the megacenter when mission constraints demand it",
            text: "Mission systems that require tight control, deterministic connectivity, or bounded hosting can remain resident in the megacenter while still participating in the broader hybrid model."
        },
        governance: {
            title: "Bounded Interconnect",
            subtitle: "Shared identity, policy, and transport between hosting domains",
            text: "The center lane represents the controlled exchange layer. Identity, policy, transport, and operational guardrails govern how workloads extend beyond the megacenter without losing control inheritance."
        },
        mission_cloud: {
            title: "Mission Extension",
            subtitle: "Selective cloud reach for approved mission use cases",
            text: "Some mission capabilities may extend into connected cloud services when that improves flexibility or service delivery, but those paths remain bounded rather than broadly open."
        },
        enterprise: {
            title: "Enterprise Platforms",
            subtitle: "Shared business and platform services can span hosting locations",
            text: "Enterprise platforms often benefit from consistent operations across megacenter and cloud environments. Standardized constructs help these services move or interoperate more cleanly."
        },
        portable_ops: {
            title: "Portable Operations",
            subtitle: "Common tooling and lifecycle models across hosting choices",
            text: "The hybrid blueprint assumes that identity, automation, templates, and management patterns should work across both on-prem and connected cloud environments so teams do not operate two separate worlds."
        },
        enterprise_cloud: {
            title: "Cloud Services",
            subtitle: "Elastic enterprise consumption aligned to JWCC / DHMC connectivity",
            text: "Enterprise workloads that benefit from flexibility or broader service consumption can use cloud-connected capacity while remaining tied into DISA-aligned controls and operating models."
        },
        data: {
            title: "Data & Analytics",
            subtitle: "Data services move only through governed exchange paths",
            text: "Analytics and data platforms can remain local to the megacenter or interact with cloud-adjacent services, but movement and exposure should follow controlled replication and exchange paths."
        },
        data_fabric: {
            title: "Data Movement Controls",
            subtitle: "Replication and governed exchange across hosting environments",
            text: "This lane represents the policy and transport controls that allow data to move deliberately between hosting zones without treating cloud connectivity as an unrestricted extension."
        },
        data_cloud: {
            title: "Analytics Services",
            subtitle: "Cloud-adjacent processing where it supports mission outcomes",
            text: "Some analytics or storage-adjacent services may be better consumed from connected cloud environments, especially when scale or specialized service models matter."
        },
        ai: {
            title: "AI / Burst Compute",
            subtitle: "High-density or burst-oriented workloads start with placement choice",
            text: "AI, burst compute, or other elastic workloads may run on-prem when locality matters or extend outward when scale and specialized capacity justify cloud-aligned hosting."
        },
        placement: {
            title: "Placement Decision",
            subtitle: "Latency, classification, sovereignty, and elasticity determine the right destination",
            text: "The hybrid model is not a blanket move to cloud. It provides a governed placement decision so workloads can remain in the megacenter, extend outward through shared controls, or consume JWCC-aligned services when that model is a better fit."
        },
        ai_cloud: {
            title: "Burst / Specialized Capacity",
            subtitle: "JWCC-aligned expansion for elastic or specialized demand",
            text: "Connected cloud services can absorb burst demand or provide specialized capacity, but only when the workload profile, data handling rules, and mission dependencies make that path appropriate."
        }
    };

    const sustainabilityDetails = {
        cooling: {
            title: "Cooling Plant",
            subtitle: "Thermal infrastructure is designed for both general and high-density loads",
            text: "The facility uses a mixed cooling strategy so standard workloads do not inherit the cost profile of dense compute unnecessarily, while high-density zones still have the thermal support they need."
        },
        thermal: {
            title: "Thermal Optimization",
            subtitle: "Cooling efficiency is designed into the facility, not added later",
            text: "Closed-loop liquid-assisted support, zoned cooling, and selective free-cooling opportunities help the facility handle dense workloads while using energy more deliberately."
        },
        density: {
            title: "High-Density Readiness",
            subtitle: "AI, analytics, and burst racks can be supported without a full-site redesign",
            text: "The sustainability model supports denser compute profiles where needed, allowing specialized zones to absorb AI or burst demand while the rest of the facility remains efficient for traditional loads."
        },
        power: {
            title: "Power Train",
            subtitle: "Electrical design supports resilience and efficient delivery together",
            text: "Power infrastructure is not only sized for uptime. It is also monitored and managed so the facility can reduce unnecessary waste while still meeting mission reliability expectations."
        },
        load: {
            title: "Load Intelligence",
            subtitle: "Telemetry informs placement, maintenance, and operational tuning",
            text: "Comprehensive monitoring and AI-assisted optimization can improve placement decisions, surface anomalies earlier, and help operators tune the environment before inefficiency becomes structural."
        },
        pue: {
            title: "Lower PUE",
            subtitle: "Energy waste is reduced across cooling, power, and placement decisions",
            text: "The target PUE reflects coordinated design choices rather than a single technology. Cooling efficiency, electrical visibility, and better workload placement all contribute to the result."
        },
        water: {
            title: "Water Stewardship",
            subtitle: "Water use is treated as a design constraint, not an afterthought",
            text: "The blueprint aims to limit ongoing water consumption through operating choices that favor closed-loop or low-consumption approaches wherever they fit the site and climate profile."
        },
        water_controls: {
            title: "Water-Aware Controls",
            subtitle: "Closed-loop and low-consumption operations reduce dependency on water-intensive cooling",
            text: "Water efficiency comes from deliberate system choices and control logic that reduce unnecessary draw while still supporting thermal requirements for the workload mix."
        },
        wue: {
            title: "Near-Zero WUE",
            subtitle: "Operational water intensity stays intentionally low",
            text: "Near-zero WUE is an outcome of the overall cooling and control strategy. The goal is to keep water use minimal even as compute density and mission demand increase over time."
        },
        renewables: {
            title: "Renewable Sourcing",
            subtitle: "Energy sourcing improves over time rather than waiting for a perfect end state",
            text: "The plan uses phased renewable adoption so sustainability improvements can start early and continue to mature as procurement options, utility conditions, and site capabilities evolve."
        },
        procurement: {
            title: "Energy Procurement",
            subtitle: "Contracts and sourcing strategy are part of the operating model",
            text: "Renewable progress depends on how energy is acquired as much as on-site design. Procurement strategy helps translate facility objectives into practical improvements over time."
        },
        renewable_growth: {
            title: "Renewable Growth",
            subtitle: "The roadmap moves from 20% at opening toward 50% by 2030",
            text: "The renewable adoption path is phased to keep momentum realistic. Early targets establish progress at opening, and later milestones continue to improve the facility's sustainability profile."
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

    window.showSecurityDetail = function (key) {
        const detail = securityDetails[key];
        if (!detail) return;

        const title = document.getElementById("security-detail-title");
        const subtitle = document.getElementById("security-detail-subtitle");
        const text = document.getElementById("security-detail-text");

        if (title) title.textContent = detail.title;
        if (subtitle) subtitle.textContent = detail.subtitle;
        if (text) text.textContent = detail.text;

        document.querySelectorAll(".security-hotspot").forEach(function (item) {
            item.classList.toggle("is-active", item.getAttribute("data-security-detail") === key);
        });
    };

    window.showCloudDetail = function (key) {
        const detail = cloudDetails[key];
        if (!detail) return;

        const title = document.getElementById("cloud-detail-title");
        const subtitle = document.getElementById("cloud-detail-subtitle");
        const text = document.getElementById("cloud-detail-text");

        if (title) title.textContent = detail.title;
        if (subtitle) subtitle.textContent = detail.subtitle;
        if (text) text.textContent = detail.text;

        document.querySelectorAll(".cloud-hotspot").forEach(function (item) {
            item.classList.toggle("is-active", item.getAttribute("data-cloud-detail") === key);
        });
    };

    window.showSustainabilityDetail = function (key) {
        const detail = sustainabilityDetails[key];
        if (!detail) return;

        const title = document.getElementById("sustainability-detail-title");
        const subtitle = document.getElementById("sustainability-detail-subtitle");
        const text = document.getElementById("sustainability-detail-text");

        if (title) title.textContent = detail.title;
        if (subtitle) subtitle.textContent = detail.subtitle;
        if (text) text.textContent = detail.text;

        document.querySelectorAll(".sustainability-hotspot").forEach(function (item) {
            item.classList.toggle("is-active", item.getAttribute("data-sustainability-detail") === key);
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

    document.querySelectorAll(".security-hotspot").forEach(function (item) {
        item.addEventListener("keydown", function (event) {
            if (event.key !== "Enter" && event.key !== " ") return;
            event.preventDefault();
            const key = item.getAttribute("data-security-detail");
            if (key) showSecurityDetail(key);
        });
    });

    document.querySelectorAll(".cloud-hotspot").forEach(function (item) {
        item.addEventListener("keydown", function (event) {
            if (event.key !== "Enter" && event.key !== " ") return;
            event.preventDefault();
            const key = item.getAttribute("data-cloud-detail");
            if (key) showCloudDetail(key);
        });
    });

    document.querySelectorAll(".sustainability-hotspot").forEach(function (item) {
        item.addEventListener("keydown", function (event) {
            if (event.key !== "Enter" && event.key !== " ") return;
            event.preventDefault();
            const key = item.getAttribute("data-sustainability-detail");
            if (key) showSustainabilityDetail(key);
        });
    });

    activateTab("overview");
    showHubDetail("center");
    showSiteDetail("ogdn");
    showNetworkDetail("fabric");
    showSecurityDetail("policy");
    showCloudDetail("placement");
    showSustainabilityDetail("thermal");
});

