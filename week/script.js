// 表示させたい画像の配列
const images = [
    "a1.png",
    "a2.png",
    "a3.png"
];

// すべての音楽の最大音量（0.0 〜 1.0 の間で指定。0.2 は20%の音量）
const maxVolume = 0.1;

let currentIndex = 0; // 初期状態（a1.png）
let isStarted = false; // 最初に音楽をスタートしたかどうかのフラグ

const displayImage = document.getElementById('display-image');

// 3つの音楽要素を配列で管理
const audios = [
    document.getElementById('music1'),
    document.getElementById('music2'),
    document.getElementById('music3')
];

// 初期設定：すべての音楽にループを設定し、音量を下げ、ミュート状態を正しくセットする
audios.forEach((audio, index) => {
    audio.loop = true;       // JavaScript側でも確実にループ再生を有効化
    audio.volume = maxVolume; // 全体の音量を一括で下げる
    
    // 初期状態（インデックス0以外）はあらかじめミュートにしておく
    if (index === 0) {
        audio.muted = false;
    } else {
        audio.muted = true;
    }
});

// 指定されたインデックスの音楽だけ音を出し、他をミュートにする関数
function updateMuteStatus(activeIndex) {
    audios.forEach((audio, index) => {
        if (index === activeIndex) {
            audio.muted = false; // 表示中の画像に対応する音楽のミュートを解除
        } else {
            audio.muted = true;  // それ以外の音楽をすべてミュート
        }
    });
}

// 画面全体がタップされた時の処理
document.body.addEventListener('click', () => {
    // 【最初の1タップ目のみ】すべての音楽を同時に、裏でループ再生開始する
    if (!isStarted) {
        audios.forEach(audio => {
            audio.play().catch(error => console.error("再生エラー:", error));
        });
        isStarted = true;
    }

    // 次の画像（インデックス）に進める
    currentIndex++;
    if (currentIndex >= images.length) {
        currentIndex = 0;
    }

    // 画像の変更
    displayImage.src = images[currentIndex];

    // 画像に連動してミュート状態を更新（裏で流れている音楽の音量を切り替える）
    updateMuteStatus(currentIndex);
});