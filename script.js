async function fetchResult() {
    const raceNumber = document.getElementById('raceNumberInput').value;
    const resultContainer = document.getElementById('resultContainer');
    
    if (!raceNumber) {
        alert('Please enter a race number');
        return;
    }

    try {
        const apiKey = 'YOUR_API_KEY'; // Replace with your actual API key
        const sheetId = 'YOUR_SHEET_ID'; // Replace with your actual Google Sheets ID
        const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/Runner%20Masterlist!A:G?key=${apiKey}`);
        const data = await response.json();
        const rows = data.values;
        
        // Find the runner by race number
        const runner = rows.find(row => row[0] === raceNumber);
        
        if (runner) {
            const [raceNumber, name, team, gender, category, time, ranking] = runner;
            resultContainer.innerHTML = `
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Team:</strong> ${team}</p>
                <p><strong>Gender:</strong> ${gender}</p>
                <p><strong>Overall Ranking:</strong> ${ranking}</p>
            `;
            resultContainer.style.display = 'block';
        } else {
            resultContainer.innerHTML = `<p>Runner not found</p>`;
            resultContainer.style.display = 'block';
        }
    } catch (error) {
        console.error('Error fetching data', error);
        alert('Error fetching data');
    }
}
