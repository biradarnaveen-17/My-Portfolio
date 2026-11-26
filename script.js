// =========================================================
// 6. LIVE VISITOR COUNTER
// =========================================================
const counterElement = document.getElementById('visit-count');

async function updateCounter() {
    if (!counterElement) return;

    const namespace = 'naveen-biradar-portfolio-2025';
    const key = 'visits';

    try {
        const response = await fetch(
            `https://api.counterapi.dev/v1/${namespace}/${key}/up`,
            { cache: 'no-store' }
        );

        if (!response.ok) {
            throw new Error(`CounterAPI returned HTTP ${response.status}`);
        }

        const data = await response.json();

        if (typeof data.count !== 'number') {
            throw new Error('CounterAPI returned an invalid response');
        }

        counterElement.textContent = data.count.toLocaleString();
        counterElement.style.opacity = 1;
    } catch (error) {
        console.error('Visitor count failed:', error);
        counterElement.textContent = 'Unavailable';
    }
}

document.addEventListener('DOMContentLoaded', updateCounter);
