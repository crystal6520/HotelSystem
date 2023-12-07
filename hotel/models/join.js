function registerUser() {
  var userid = document.getElementById("userid").value;
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var confirmPassword = document.getElementById("confirm-password").value;

  // 필수 항목이 비어있는지 확인
  if (!userid || !email || !password || !confirmPassword) {
    alert("모든 필수 항목을 입력하세요.");
    return;
  }

  // 여기에서 중복된 사용자명 체크 (간단한 예시로 'admin'이 중복 사용자로 설정)
  if (userid === 'admin') {
    document.getElementById("userid-error").innerText = "중복된 아이디입니다.";
    return;
  } else {
    document.getElementById("userid-error").innerText = "";
  }

  // 비밀번호와 확인 비밀번호가 일치하는지 확인
  if (password !== confirmPassword) {
    alert("비밀번호가 일치하지 않습니다.");
    return;
  }

  // 서버에 회원가입 정보 전송
  fetch('/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userid,
      name,
      email,
      password,
    }),
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      alert("회원 가입이 완료되었습니다!");
      window.location.href = "index.html"; // 로그인 페이지의 경로로 수정하세요
    } else {
      alert("회원 가입에 실패했습니다.");
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });
}
