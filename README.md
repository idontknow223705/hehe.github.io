<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Aplikasi Multistep</title>
  <style>
    .hidden { display: none; }
    .button-lock { pointer-events: none; opacity: 0.5; }
    .btn { padding: 10px 20px; margin: 10px; font-size: 16px; cursor: pointer; }
    .green { background-color: green; color: white; }
    .red { background-color: red; color: white; }
    .yellow { background-color: gold; color: black; }
  </style>
</head>
<body onload="restoreState()">
  <!-- Halaman 1 -->
  <div id="page1">
    <h2>Masukkan nama lengkap mu semua hurufnya besar dan masukkan tanggal lahir mu contoh “1 Januari”</h2>
    <input type="text" id="input1" placeholder="Nama lengkap"><br>
    <input type="text" id="input2" placeholder="Tanggal lahir"><br>
    <button onclick="checkPasswords()">Lanjut</button>
    <p id="error" style="color:red"></p>
  </div>

  <!-- Halaman 2 -->
  <div id="page2" class="hidden">
    <h2>PERHATIAN</h2>
    <p>Baca dengan teliti kolom ketiga pada halaman selanjutnya sebelum memilih ya cantik</p>
    <button onclick="goToPage(3)">Saya Mengerti</button>
  </div>

  <!-- Halaman 3 -->
  <div id="page3" class="hidden">
    <h2>Hai sayang, eh Hai cantik atau sayang ya? </h2>
    <p id="mainText">Lupakan itu!
Sebenarnya aku suka sama kamu dari dulu, tapi aku belum sempat ngungkapin. Maaf ya baru sekarang aku ngungkapin nya. Kamu pasti belum tau ini dari siapa ya, yang pasti bukan orang yang ngasih ini ke kamu. Klik ciri-ciri untuk mengetahui siapa aku. </p>
    <button id="mainBtn" onclick="showChoiceButtons()">Ciri-ciri</button>
    <p id="afterMainText" class="hidden">Aku itu tinggi, baik, pinter, kadang ngeselin, dan inisial ku huruf ke 23 setelah huruf T(vwxyzabc dan seterusnya hingga huruf ke 23).</p>
    <div id="countdownContainer" class="hidden">
      <p id="countdownText"></p>
    </div>
    <div id="choiceButtons" class="hidden">
      <button id="greenBtn" class="btn green button-lock" onclick="choose('green')">Iya</button>
      <button id="redBtn" class="btn red button-lock" onclick="choose('red')">Tidak</button>
    </div>
    <p id="result"></p>
    <hr>
    <input type="text" id="resetCheck" placeholder="Reset">
    <button id="resetBtn" class="btn yellow button-lock" onclick="resetAll()">Reset</button>
  </div>

  <script>
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
          document.getElementById('countdownText').textContent = "Silakan pilih tombol. Jangan salah pilih tombolnya ya cantik, pilihan tidak bisa di ubah. ";
          localStorage.setItem('buttonsEnabled', 'true');
        }
      }, 1000);
    }

    function choose(color) {
      if (localStorage.getItem('chosen')) return;
      localStorage.setItem('chosen', color);
      chosen = color;
      document.getElementById('result').textContent =
        color === 'green' ? "Serius Rin? Kalau begitu kasih kertas dengan kode 705 ke Dedi jangan katakan apapun tentang isi kertas itu, oh ya kalau kamu mau mengatakan sesuatu tulis saja di kertas itu. Hubungan kita mungkin sebentar karena jalur pendidikan kita berbeda, atau kalau kamu mau bertahan aku akan menerima nya" : "Ya sudah jika ini memang yang terbaik untuk mu aku akan Terima. Karena beberapa minggu lagi mungkin kita tidak akan bertemu.";      document.getElementById(color === 'green' ? 'redBtn' : 'greenBtn').classList.add('button-lock');
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
            storedChoice === 'green' ? "Serius Rin? Kalau begitu kasih kertas dengan kode 705 ke Dedi jangan katakan apapun tentang isi kertas itu, oh ya kalau kamu mau mengatakan sesuatu tulis saja di kertas itu. Hubungan kita mungkin sebentar karena jalur pendidikan kita berbeda, atau kalau kamu mau bertahan aku akan menerima nya" : "Ya sudah jika ini memang yang terbaik untuk mu aku akan Terima. Karena beberapa minggu lagi mungkin kita tidak akan bertemu.";          document.getElementById(storedChoice === 'green' ? 'redBtn' : 'greenBtn').classList.add('button-lock');
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
  </script>
</body>
</html>
