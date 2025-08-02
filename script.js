// Danh sách phần thưởng
const rewards = [500, 1000, 300, 800, 700, 2500, 1200, 1500, 2000];
let shuffledRewards = [];
let opened = false;

// Khi tải trang, bắt đầu game
window.onload = () => {
  resetGame();
};

// Hàm xáo trộn phần thưởng
function shuffle(array) {
  let arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Mở hộp quà với delay 2 giây
function openBox(element) {
  if (element.classList.contains('opened')) return;
  if (opened) return;

  opened = true;

  const index = parseInt(element.getAttribute('data-index'));
  const reward = shuffledRewards[index];
// Sau 2 giây hiển thị phần thưởng
setTimeout(() => {
  element.querySelector('.box-number').innerText = `${reward}₦`;

  // 👉 Hiện chúc mừng
  const congrats = document.getElementById('congratsMessage');
  const rewardSpan = document.getElementById('rewardAmount');
  rewardSpan.innerText = `${reward}₦`;
  congrats.classList.remove('hidden');

  // 👉 Ẩn sau 4.5 giây
  setTimeout(() => {
    congrats.classList.add('hidden');
  }, 4500);
}, 2000);

  // Phát âm thanh mở hộp
  const sound = document.getElementById('openSound');
  sound.currentTime = 0;
  sound.play();

  // Đổi giao diện hộp + hiển thị chữ "Opening..."
  element.classList.add('opened');
  element.querySelector('.box-number').innerText = "Opening...";

  // Sau 1 giây hiển thị phần thưởng
  setTimeout(() => {
    element.querySelector('.box-number').innerText = `${reward}₦`;
  }, 1000);
}

// Reset lại trò chơi
function resetGame() {
  opened = false;
  shuffledRewards = shuffle(rewards);

  document.querySelectorAll('.box').forEach((box, idx) => {
    box.classList.remove('opened');
    box.innerHTML = `
      <img src="1.png" alt="Gift Box">
      <div class="box-number">${idx + 1}</div>
    `;
  });
}
