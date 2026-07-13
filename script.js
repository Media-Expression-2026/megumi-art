let rotX = 0;
let rotY = 0;

// 1. p5.js: 初期設定
function setup() {
    // 左下のコンテナ（200x200）の中にWEBGLキャンバスを作成
    let canvas = createCanvas(200, 200, WEBGL);
    canvas.parent('canvas-container');
    noStroke();
}

// 2. p5.js: 毎フレームの描画処理（ここで土星を作ります）
function draw() {
    // キャンバス背景を完全に透明にして、Webサイトの宇宙背景が見えるようにする
    clear(); 

    // ライト（光）を当てて、綺麗な球体と輪っかの立体感を出す
    ambientLight(60);
    directionalLight(255, 255, 255, 0.5, 0.5, -0.5); // 斜め前からの光
    directionalLight(150, 150, 180, -0.5, -0.5, -0.5); // 宇宙の反射光

    // --- 🪐 マウスの移動方向・距離・速さによって回転量を計算 ---
    if (mouseIsPressed || mouseX !== pmouseX || mouseY !== pmouseY) {
        rotY += movedX * 0.002; // 左右の動きでY軸回転
        rotX += movedY * 0.002; // 上下の動きでX軸回転
    } else {
        // マウスが動いていない時は、慣性でゆっくり自動回転させる
        rotY += 0.0005;
    }

    push();
    // ① まず地軸の傾き（約23.4度）をセット
    rotateZ(radians(23.4));
    
    // ② マウス連動による回転を適用
    rotateY(rotY);
    rotateX(rotX);

    // 🪐 土星の「本体（球体）」を描画
// 🪐 土星の「本体（球体）」を描画
    push();
    fill(240, 210, 160); // 土星っぽいクリーム色
    // 【変更前】 sphere(40, 24, 24); 
    sphere(28, 24, 24);   // 👈 半径を 40 から 28 に小さくしました
    pop();

    // 🪐 土星の「輪っか（薄い円盤）」を描画
    push();
    fill(210, 190, 160, 180); // 少し透明感のある輪っかの色
    rotateX(1.57); // 輪っかを水平に寝かせる
    // torus(輪全体の半径, 輪の太さ)
    // 【変更前】 torus(65, 12, 30, 2);
    torus(45, 8, 30, 2);  // 👈 全体の半径を 65→45 に、太さを 12→8 に小さくしました
    pop();
    pop();
}

// ----------------------------------------------------
// 3. その他のWebページエフェクト（スクロール・ホバー消去）
// ----------------------------------------------------
function initPageEffects() {
    // 背景画像のスクロールパララックス
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    if (maxScroll > 0) {
        window.addEventListener('scroll', function() {
            const scrolled = window.scrollY;
            const scrollPercent = scrolled / maxScroll;
            document.body.style.backgroundPosition = `center ${scrollPercent * 100}%`;
        });
    }

    // リンクホバー時にp5.jsキャンバスを消す処理
    const canvasContainer = document.getElementById('canvas-container');
    const links = document.querySelectorAll('.card a');

    if (canvasContainer) {
        links.forEach(link => {
            link.addEventListener('mouseenter', () => canvasContainer.classList.add('hide'));
            link.addEventListener('mouseleave', () => canvasContainer.classList.remove('hide'));
        });
    }
}

// ページ読み込み完了時にWebエフェクトを起動
window.addEventListener('DOMContentLoaded', initPageEffects);