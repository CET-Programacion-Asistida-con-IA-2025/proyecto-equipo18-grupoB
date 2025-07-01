
 <!DOCTYPE html>
<html>
<head>
  <title>Chatbot</title>
  <style>
    #chat-container {
      width: 500px;
      height: 600px;
      border: 1px solid #ccc;
      padding: 20px;
      overflow-y: auto;
    }
  </style>
</head>
<body>
  <div id="chat-container">
    <div id="chat-log"></div>
    <input id="user-input" type="text" placeholder="Escribe algo...">
    <button id="send-btn">Enviar</button>
  </div>

  <script>
    const chatLog = document.getElementById('chat-log');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');

    sendBtn.addEventListener('click', () => {
      const userMessage = userInput.value.trim();
      if (userMessage !== '') {
        chatLog.innerHTML += `<p>Usuario: ${userMessage}</p>`;
        userInput.value = '';

        // Lógica del chatbot
        if (userMessage.toLowerCase().includes('calcular riesgo')) {
          calcularRiesgo();
        } else {
          chatLog.innerHTML += `<p>Chatbot: No entiendo tu mensaje. Puedes escribir "calcular riesgo" para realizar un cálculo de riesgo.</p>`;
        }
      }
    });

    function calcularRiesgo() {
      // Pide los valores al usuario
      chatLog.innerHTML += `<p>Chatbot: Por favor, ingresa la concentración del contaminante (μg/L):</p>`;
      userInput.focus();

      // Simula una espera para que el usuario ingrese el valor
      setTimeout(() => {
        const concentration = parseFloat(prompt("Ingresa la concentración del contaminante (μg/L):"));
        const consumption = parseFloat(prompt("Ingresa la cantidad de agua consumida diariamente (L):"));
        const weight = parseFloat(prompt("Ingresa tu peso (kg):"));

        // Calcula el riesgo
        const dailyIntake = (concentration * consumption) / weight;
        const referenceDose = 0.3;
        const riskRatio = dailyIntake / referenceDose;

        // Muestra el resultado
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

        chatLog.innerHTML += `<p>Chatbot: Nivel de Riesgo: ${riskLevel}</p>`;
        chatLog.innerHTML += `<p>Chatbot: Ingesta diaria calculada: ${dailyIntake.toFixed(3)} μg/kg/día</p>`;
        chatLog.innerHTML += `<p>Chatbot: Ratio de riesgo: ${riskRatio.toFixed(2)}</p>`;
        chatLog.innerHTML += `<p>Chatbot: Recomendaciones: ${recommendations}</p>`;
      }, 1000);
    }
  </script>
</body>
</html> 

    
