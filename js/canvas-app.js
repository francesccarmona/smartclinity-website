document.addEventListener('DOMContentLoaded', () => {
    // 1. Populate standard sections from Row A
    const sections = [
        'keyPartners', 'keyActivities', 'keyResources', 'competitiveAdvantage',
        'valueProposition', 'customerRelationships', 'channels', 'customerSegments'
    ];

    sections.forEach(key => {
        const data = window.canvasData[key];
        const cardElement = document.getElementById(`card-${data.id}`);
        
        if (cardElement) {
            if (key === 'valueProposition') {
                // Special layout for Value Proposition
                cardElement.innerHTML = `
                    <div class="card-title">${data.title}</div>
                    <div class="val-prop-text">${data.globalSlogan}</div>
                `;
            } else {
                // Render Icon Cluster
                let iconClusterHtml = '<div class="icon-cluster">';
                data.icons.forEach(iconObj => {
                    iconClusterHtml += `
                        <div class="icon-item">
                            <div class="icon-svg">${iconObj.svg}</div>
                            <div class="icon-label">${iconObj.label}</div>
                        </div>
                    `;
                });
                iconClusterHtml += '</div>';

                // Standard layout for other Row A cards
                cardElement.innerHTML = `
                    <div class="card-title">${data.title}</div>
                    ${iconClusterHtml}
                    <div class="card-slogan">${data.globalSlogan}</div>
                `;
            }
            
            // Interaction: use brand hover class based on context
            // Purple for tech/data, Green for human/care
            const purpleSections = ['keyActivities', 'keyResources', 'competitiveAdvantage', 'channels'];
            const hoverClass = purpleSections.includes(key) ? 'hover-purple' : 'hover-green';
            cardElement.classList.add(hoverClass);

            // Add click event for modal
            cardElement.addEventListener('click', () => openModal(data));
            cardElement.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openModal(data);
                }
            });
        }
    });

    // 2. Populate Combined Bands (Row B & C)
    const economic = window.canvasData.economicEngine;
    
    let econIconsHtml = '<div class="icon-cluster band-cluster" style="height: 100%;">';
    economic.opportunity.icons.forEach(iconObj => {
        econIconsHtml += `
            <div class="icon-item" style="width: 100%;">
                <div class="icon-svg" style="width: 100%; height: 150px; display: flex; align-items: center; justify-content: center;">${iconObj.svg}</div>
            </div>
        `;
    });
    econIconsHtml += '</div>';

    document.getElementById('band-economic').innerHTML = `
        <div class="band-concern">
            <div class="band-title">Operational Cost</div>
            <div class="concern-text">${economic.concern}</div>
        </div>
        <div class="band-opportunity">
            <div class="band-title">Scalable Recurring Model</div>
            ${econIconsHtml}
            <div class="opp-text">${economic.opportunity.coreSentence}</div>
        </div>
    `;

    const social = window.canvasData.socialImpact;

    let socialIconsHtml = '<div class="icon-cluster band-cluster" style="height: 100%;">';
    social.opportunity.icons.forEach(iconObj => {
        socialIconsHtml += `
            <div class="icon-item" style="width: 100%;">
                <div class="icon-svg" style="width: 100%; height: 135px; display: flex; align-items: center; justify-content: center;">${iconObj.svg}</div>
            </div>
        `;
    });
    socialIconsHtml += '</div>';

    document.getElementById('band-social').innerHTML = `
        <div class="band-concern">
            <div class="band-title">Double Concern</div>
            <div class="concern-text">${social.concern}</div>
        </div>
        <div class="band-opportunity">
            <div class="band-title">Positive Impact</div>
            ${socialIconsHtml}
            <div class="opp-text">${social.opportunity.coreSentence}</div>
        </div>
    `;

    const econDataForModal = {
        title: economic.title,
        mainIcon: economic.opportunity.icons[0].svg, // SaaS or related
        coreSentence: economic.opportunity.coreSentence,
        bullets: [
            "Operational Concern: " + economic.concern,
            `Hardware deploys: ${economic.opportunity.pillars[0].desc}`,
            `Software retains: ${economic.opportunity.pillars[1].desc}`,
            `Data compounds: ${economic.opportunity.pillars[2].desc}`
        ]
    };

    const socialDataForModal = {
        title: social.title,
        mainIcon: social.opportunity.icons[0].svg, // Human Care or related
        coreSentence: social.opportunity.coreSentence,
        bullets: [
            "Double Concern: " + social.concern,
            `Human Care: ${social.opportunity.pillars[0].desc}`,
            `Ethical AI: ${social.opportunity.pillars[1].desc}`,
            `Sustainable Efficiency: ${social.opportunity.pillars[2].desc}`
        ]
    };

    const bindBandModal = (elementId, data, hoverClass) => {
        const element = document.getElementById(elementId);
        element.classList.add(hoverClass);
        element.addEventListener('click', () => openModal(data));
        element.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openModal(data);
            }
        });
    };

    bindBandModal('band-economic', econDataForModal, 'hover-purple');
    bindBandModal('band-social', socialDataForModal, 'hover-green');

    // 3. Modal Logic
    const modal = document.getElementById('modal');
    const closeBtn = document.getElementById('close-modal');
    
    // Modal Elements
    const mIcon = document.getElementById('modal-icon');
    const mTitle = document.getElementById('modal-title');
    const mCore = document.getElementById('modal-core-sentence');
    const mBullets = document.getElementById('modal-bullets');

    function openModal(data) {
        mIcon.innerHTML = data.mainIcon;
        mTitle.innerText = data.title;
        mCore.innerHTML = data.coreSentence; // allow HTML tags
        
        mBullets.innerHTML = '';
        data.bullets.forEach(b => {
            const li = document.createElement('li');
            li.innerHTML = b; // allow HTML tags
            mBullets.appendChild(li);
        });

        modal.classList.add('active');
        closeBtn.focus();
    }

    function closeModal() {
        modal.classList.remove('active');
    }

    closeBtn.addEventListener('click', closeModal);
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
});
