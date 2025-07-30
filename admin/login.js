// login.js
document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  try {
    const res = await fetch('https://autogmbh-backend.onrender.com/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok && data.token) {
      localStorage.setItem('token', data.token);
      window.location.href = 'admin-add.html'; // ose ndonjë faqe tjetër admini
    } else {
      alert(data.message || 'Login fehlgeschlagen!');
    }
  } catch (err) {
    console.error('Gabim gjatë login:', err);
    alert('Server-Fehler beim Login!');
  }
});
