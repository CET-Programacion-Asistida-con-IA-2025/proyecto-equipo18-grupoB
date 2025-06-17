// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Risk Calculator
document.getElementById('riskCalculator').addEventListener('submit', function (e) {
    e.preventDefault();

    const concentration = parseFloat(document.getElementById('concentration').value);
    const consumption = parseFloat(document.getElementById('consumption').value);
    const weight = parseFloat(document.getElementById('weight').value);
    const age = document.getElementById('age').value;

    // Validate inputs
    if (isNaN(concentration) || isNaN(consumption) || isNaN(weight) ||
        concentration <= 0 || consumption <= 0 || weight <= 0) {
        alert('Por favor, ingrese valores numéricos válidos mayores a cero.');
        return;
    }

    // Calculate daily intake (μg/kg/day)
    const dailyIntake = (concentration * consumption) / weight;

    // WHO reference dose: 0.3 μg/kg/day
    const referenceDose = 0.3; // Corregido: era "referenceDoze"
    const riskRatio = dailyIntake / referenceDose;

    let riskLevel, riskClass, recommendations;

    if (riskRatio <= 0.5) {
        riskLevel = "BAJO";
        riskClass = "alert-success";
        recommendations = "Su nivel de exposición está dentro de los parámetros seguros. Continúe monitoreando periódicamente.";
    } else if (riskRatio <= 1.0) {
        riskLevel = "MODERADO";
        riskClass = "alert-warning";
        recommendations = "Su exposición se acerca a los límites recomendados. Considere instalar un sistema de filtración y realizar análisis más frecuentes.";
    } else {
        riskLevel = "ALTO";
        riskClass = "alert-danger";
        recommendations = "Su exposición excede los límites seguros. Es URGENTE implementar un sistema de tratamiento de agua y consultar con profesionales de la salud.";
    }

    // Display results
    const resultDiv = document.getElementById('riskResult');
    resultDiv.innerHTML = `
        <div class="alert ${riskClass}">
            <h4>Nivel de Riesgo: ${riskLevel}</h4>
            <p><strong>Ingesta diaria calculada:</strong> ${dailyIntake.toFixed(3)} μg/kg/día</p>
            <p><strong>Ratio de riesgo:</strong> ${riskRatio.toFixed(2)}</p>
            <p><strong>Recomendaciones:</strong> ${recommendations}</p>
        </div>
    `;

    // Show the result section
    resultDiv.style.display = 'block';
});