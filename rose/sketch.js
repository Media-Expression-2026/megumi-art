let img;
let isImageLoaded = false;

function preload() {
    // 💡 エラーで画面が固まるのを防ぐため、読み込み成功/失敗を監視します
    img = loadImage("rosemono.jpg", 
        () => { isImageLoaded = true; console.log("画像が正常に読み込まれました！"); },
        () => { isImageLoaded = false; console.error("画像が見つかりません。ファイル名を確認してください。"); }
    );
}

function setup() {
    createCanvas(400, 400);
    colorMode(HSB, 360, 100, 100, 255);
}

function draw() {
    // 画像がない間は、わかりやすく赤い背景にして警告を出します
    if (!isImageLoaded) {
        background(0, 80, 80); // 赤い背景
        fill(255);
        textAlign(CENTER, CENTER);
        textSize(16);
        text("【警告】画像「image.jpg」が\n読み込めないため処理を停止しています。\n\nファイル名や場所、または\nLive Serverで開いているか確認してください。", width/2, height/2);
        return; // 画像がない場合はこれ以降の重い処理をスキップ
    }

    // --- ここから画像がある場合の正常な処理 ---
    background(220);

    // キャンバスサイズに合わせて画像を描画
// --- 🪐 【新機能】縦横比（アスペクト比）を維持して描画する計算 ---
    let imgRatio = img.width / img.height;       // 画像の比率
    let canvasRatio = width / height;            // キャンバスの比率
    
    let renderW, renderH; // 最終的に描画する横幅と縦幅
    let renderX, renderY; // 描画する開始位置（中央寄せ用）

    if (imgRatio > canvasRatio) {
        // 画像の方が横長の場合：横幅をキャンバスに合わせ、縦幅を縮小
        renderW = width;
        renderH = width / imgRatio;
        renderX = 0;
        renderY = (height - renderH) / 2; // 上下に黒い隙間を作って中央寄せ
    } else {
        // 画像の方が縦長（または正方形）の場合：縦幅をキャンバスに合わせ、横幅を縮小
        renderW = height * imgRatio;
        renderH = height;
        renderX = (width - renderW) / 2;  // 左右に黒い隙間を作って中央寄せ
        renderY = 0;
    }

    // 背景を暗いグレーにして、画像の隙間（余白）が綺麗に見えるようにします
    background(30);

    // 👑 計算したサイズと位置（中央寄せ）で画像を描画
    image(img, renderX, renderY, renderW, renderH);
    let targetHue = map(mouseX, 0, width, 0, 360);
    let targetSat = map(mouseY, 0, height, 0, 100);
    loadPixels();
    
    for (let i = 0; i < pixels.length; i += 4) {
        let r = pixels[i];
        let g = pixels[i + 1];
        let b = pixels[i + 2];
        let a = pixels[i + 3];

        // カラー成分の判定
        if (abs(r - g) > 8 || abs(g - b) > 8 || abs(r - b) > 8) {
            let originalColor = color(r, g, b);
            let currentBright = brightness(originalColor);
            let newColor = color(targetHue, targetSat, currentBright, a);

            pixels[i] = red(newColor);
            pixels[i + 1] = green(newColor);
            pixels[i + 2] = blue(newColor);
            pixels[i + 3] = a;
        }
    }
    
    updatePixels();
}