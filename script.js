const correct1 = "RINA SULASTRI";
const correct2 = "23 Februari";
const resetKey = "223♡705";
let countdown = 10;
let chosen = null;

function checkPasswords() {
  const input1 = document.getElementById('input1').value;
  const input2 = document.getElementById('input2').value;
  if (input1 === correct1 && input2 === correct2) {
    localStorage.setItem('userLogin', 'true');
    goToPage(2);
  } else {
    document.getElementById('error').textContent = "Maaf tapi kamu salah!";
  }
}

function goToPage(num) {
  for (let i = 1; i <= 3; i++) {
    document.getElementById('page' + i).classList.add('hidden');
  }
  document.getElementById('page' + num).classList.remove('hidden');
}

function showChoiceButtons() {
  document.getElementById('mainBtn').disabled = true;
  document.getElementById('afterMainText').classList.remove('hidden');
  document.getElementById('countdownContainer').classList.remove('hidden');
  document.getElementById('choiceButtons').classList.remove('hidden');

  localStorage.setItem('mainBtnPressed', 'true');

  const interval = setInterval(() => {
    document.getElementById('countdownText').textContent = `${countdown} detik lagi tombol bisa ditekan.`;
    countdown--;
    if (countdown < 0) {
      clearInterval(interval);
      document.getElementById('greenBtn').classList.remove('button-lock');
      document.getElementById('redBtn').classList.remove('button-lock');
      document.getElementById('countdownText').textContent = "Silakan pilih tombol. Jangan salah pilih tombolnya ya cantik, pilihan tidak bisa di ubah.";
      localStorage.setItem('buttonsEnabled', 'true');
    }
  }, 1000);
}

function choose(color) {
  if (localStorage.getItem('chosen')) return;
  localStorage.setItem('chosen', color);
  chosen = color;
  document.getElementById('result').textContent =
    color === 'green'
      ? "Serius Rin? Kalau begitu kasih kertas dengan kode 705 ke Dedi jangan katakan apapun tentang isi kertas itu, oh ya kalau kamu mau mengatakan sesuatu tulis saja di kertas itu. Hubungan kita mungkin sebentar karena jalur pendidikan kita berbeda, atau kalau kamu mau bertahan aku akan menerima nya"
      : "Ya sudah jika ini memang yang terbaik untuk mu aku akan Terima. Karena beberapa minggu lagi mungkin kita tidak akan bertemu.";
  document.getElementById(color === 'green' ? 'redBtn' : 'greenBtn').classList.add('button-lock');
}

function restoreState() {
  if (localStorage.getItem('mainBtnPressed') === 'true') {
    goToPage(3);
    document.getElementById('mainBtn').disabled = true;
    document.getElementById('afterMainText').classList.remove('hidden');
    document.getElementById('countdownContainer').classList.remove('hidden');
    document.getElementById('choiceButtons').classList.remove('hidden');

    if (localStorage.getItem('buttonsEnabled') === 'true') {
      document.getElementById('greenBtn').classList.remove('button-lock');
      document.getElementById('redBtn').classList.remove('button-lock');
      document.getElementById('countdownText').textContent = "Silakan pilih tombol.";
    } else {
      document.getElementById('countdownText').textContent = "Tunggu hingga tombol aktif...";
    }

    const storedChoice = localStorage.getItem('chosen');
    if (storedChoice) {
      document.getElementById('result').textContent =
        storedChoice === 'green'
          ? "Serius Rin? Kalau begitu kasih kertas dengan kode 705 ke Dedi jangan katakan apapun tentang isi kertas itu, oh ya kalau kamu mau mengatakan sesuatu tulis saja di kertas itu. Hubungan kita mungkin sebentar karena jalur pendidikan kita berbeda, atau kalau kamu mau bertahan aku akan menerima nya"
          : "Ya sudah jika ini memang yang terbaik untuk mu aku akan Terima. Karena beberapa minggu lagi mungkin kita tidak akan bertemu.";
      document.getElementById(storedChoice === 'green' ? 'redBtn' : 'greenBtn').classList.add('button-lock');
    }
  }

  document.getElementById('resetCheck').addEventListener('input', function () {
    if (this.value === resetKey) {
      document.getElementById('resetBtn').classList.remove('button-lock');
    } else {
      document.getElementById('resetBtn').classList.add('button-lock');
    }
  });
}

function resetAll() {
  localStorage.clear();
  location.reload();
}
