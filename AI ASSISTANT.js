 
    // Timetable logic
    const form = document.getElementById('timetableForm');
    const table = document.getElementById('timetable');
    const units = [];

    form.addEventListener('submit', async function(event) {
      event.preventDefault();

      const course = document.getElementById('course').value;
      const unit = document.getElementById('unit').value;
      const time = document.getElementById('time').value;

      units.push({ course, unit, time });

      const aiGeneratedSchedule = await generateTimetableWithAI(units);

      while (table.rows.length > 1) {
        table.deleteRow(1);
      }

      aiGeneratedSchedule.forEach(item => {
        const row = table.insertRow();
        row.insertCell(0).textContent = item.course;
        row.insertCell(1).textContent = item.unit;
        row.insertCell(2).textContent = item.scheduledTime;
      });

      form.reset();
    });

    async function generateTimetableWithAI(units) {
      // Placeholder AI logic
      return units.map((u, i) => ({
        course: u.course,
        unit: u.unit,
        scheduledTime: u.time + " (Day " + (i+1) + ")"
      }));
    }

    // Chatbot logic
    function sendMessage() {
  const input = document.getElementById('user-input');
  const chatBox = document.getElementById('chat-box');
  const message = input.value.trim();

  if (message) {
    const userMsg = document.createElement('p');
    userMsg.innerHTML = "<strong>You:</strong> " + message;
    chatBox.appendChild(userMsg);

    let botReply = "";

    // NEW: Assess timetable data when user asks for a study plan
    if (message.toLowerCase().includes("study plan")) {
  if (units.length === 0) {
    botReply = "You haven't added any units yet. Please submit your timetable first.";
  } else {
    // Shuffle units
    const shuffled = [...units].sort(() => Math.random() - 0.5);

    botReply = "Here’s a shuffled study plan using 5pm–9pm slots:<br>";
    shuffled.forEach((u, i) => {
      const day = i + 1;
      botReply += `Day ${day}: Study <em>${u.unit}</em> (${u.course}) from <strong>5pm–9pm</strong><br>`;
    });
  }
}

    const botMsg = document.createElement('p');
    botMsg.innerHTML = "<strong>Bot:</strong> " + botReply;
    chatBox.appendChild(botMsg);

    input.value = "";
    chatBox.scrollTop = chatBox.scrollHeight;
  }
}

  