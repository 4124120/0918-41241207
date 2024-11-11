let playerScore = 0;     // 玩家當前分數
let computerScore = 0;   // 電腦當前分數
const winningScore = 2;  // 三戰兩勝的目標分數

function playerChoice(playerChoice) {
    // 檢查是否已經有贏家
    if (playerScore >= winningScore || computerScore >= winningScore) {
        alert("遊戲已結束！請重置遊戲以重新開始。");
        return;
    }

    // 定義選項
    const choices = ["剪刀", "石頭", "布"];
    
    // 電腦隨機選擇
    const computerChoice = Math.floor(Math.random() * 3) + 1;
    
    // 根據選項的索引值來取得名稱
    const player = choices[playerChoice - 1];
    const computer = choices[computerChoice - 1];
    
    // 顯示玩家和電腦的選擇
    let resultText = `你選擇了 ${player}，電腦選擇了 ${computer}。`;

    // 判斷勝負
    if (playerChoice === computerChoice) {
        resultText += " 平手！";
        updateResult(resultText, "draw");
    } else if (
        (playerChoice === 1 && computerChoice === 3) ||
        (playerChoice === 2 && computerChoice === 1) ||
        (playerChoice === 3 && computerChoice === 2)
    ) {
        resultText += " 你贏了！";
        playerScore++;
        updateResult(resultText, "win");
    } else {
        resultText += " 你輸了！";
        computerScore++;
        updateResult(resultText, "lose");
    }

    // 更新分數顯示
    document.getElementById("score").innerText = `玩家：${playerScore} | 電腦：${computerScore}`;

    // 檢查是否有贏家
    checkWinner();
}

function checkWinner() {
    if (playerScore === winningScore) {
        Swal.fire({
            title: "恭喜！你贏了三戰兩勝！",
            icon: "success",
            confirmButtonText: "重新開始"
        }).then(() => resetGame());
    } else if (computerScore === winningScore) {
        Swal.fire({
            title: "很遺憾，電腦贏得了三戰兩勝。",
            icon: "error",
            confirmButtonText: "重新開始"
        }).then(() => resetGame());
    }
}

function updateResult(text, result) {
    const resultElement = document.getElementById("result");
    resultElement.innerText = text;
    
    // 根據結果類型設置不同的樣式
    resultElement.className = "result";
    if (result === "win") {
        resultElement.classList.add("win");
    } else if (result === "draw") {
        resultElement.classList.add("draw");
    } else {
        resultElement.classList.add("lose");
    }
}

// 重置遊戲
function resetGame() {
    playerScore = 0;
    computerScore = 0;
    document.getElementById("score").innerText = `玩家：${playerScore} | 電腦：${computerScore}`;
    document.getElementById("result").innerText = "";
}
