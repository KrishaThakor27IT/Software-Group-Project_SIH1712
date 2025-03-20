// Pie Chart Data and Configuration
const ctx = document.getElementById('pieChart').getContext('2d');

const data = {
    labels: ['Completed Tasks', 'Pending Tasks'],
    datasets: [{
        data: [8, 10], // Example data based on table values
        backgroundColor: ['#b3ffab', '#12fff7'],
        hoverBackgroundColor: ['#00C897', '#00E676'],
    }]
};

const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            position: 'bottom',
            labels: {
                color: '#2C3E50'
            }
        }
    }
};

// Render Pie Chart
new Chart(ctx, {
    type: 'pie',
    data: data,
    options: options
});

// Page Transition Effect
document.addEventListener('DOMContentLoaded', function() {
    document.body.style.opacity = 1;
});

// Navigation Link Hover Effect (Optional Enhancement)
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('mouseenter', () => {
        link.style.color = '#00C897';
    });
    link.addEventListener('mouseleave', () => {
        link.style.color = '#2C3E50';
    });
});
