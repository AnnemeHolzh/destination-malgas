document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const canvas = document.getElementById('color-canvas');
    const context = canvas.getContext('2d');
    const logoArea = { x: 0, y: 0, width: 200, height: 200 }; // Adjust as needed

    function updateBackgroundClass() {
        canvas.width = logoArea.width;
        canvas.height = logoArea.height;

        context.drawImage(
            document.body,
            logoArea.x, logoArea.y,
            logoArea.width,
            logoArea.height,
            0, 0,
            logoArea.width,
            logoArea.height
        );

        const imageData = context.getImageData(0, 0, logoArea.width, logoArea.height);
        const colors = {};

        for (let i = 0; i < imageData.data.length; i += 4) {
            const r = imageData.data[i];
            const g = imageData.data[i + 1];
            const b = imageData.data[i + 2];
            const rgb = `${r},${g},${b}`;
            colors[rgb] = (colors[rgb] || 0) + 1;
        }

        const mostFrequentColor = Object.keys(colors).reduce((a, b) => colors[a] > colors[b] ? a : b);
        const [r, g, b] = mostFrequentColor.split(',').map(Number);

        const avgBrightness = (r + g + b) / 3;
        body.classList.toggle('header-light', avgBrightness >= 128);
        body.classList.toggle('header-dark', avgBrightness < 128);
    }

    updateBackgroundClass();
});
