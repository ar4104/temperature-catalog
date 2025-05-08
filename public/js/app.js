document.getElementById('addTempForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const form = e.target;
  const data = {
    region: form.region.value,
    avgTemperature: parseFloat(form.avgTemperature.value),
    precipitation: parseFloat(form.precipitation.value),
    date: form.date.value
  };

  try {
    const response = await fetch('/api/temperature', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Ошибка при добавлении записи');
    alert('Запись успешно добавлена');
    form.reset();
  } catch (err) {
    alert(err.message);
  }
});

document.getElementById('minTempBtn').addEventListener('click', async () => {
  const date = document.getElementById('queryDate').value;
  if (!date) {
    alert('Пожалуйста, выберите дату');
    return;
  }
  try {
    const response = await fetch(`/api/temperature/min/${date}`);
    if (!response.ok) throw new Error('Данные не найдены для выбранной даты');
    const data = await response.json();
    document.getElementById('minTempResult').textContent =
      `Минимальная температура: ${data.avgTemperature}°C, регион: ${data.region}`;
  } catch (err) {
    alert(err.message);
    document.getElementById('minTempResult').textContent = '';
  }
});
