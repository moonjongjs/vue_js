<!DOCTYPE HTML>
<html>
<head>
	<title> 정보전송완료 메시지 Response(응답) </title>
	<meta charset='utf-8'>
		
	
</head>
<body>
	<h1> 폼의 정보가 성공적으로 전송 되었습니다. </h1>
	
	<ul class='response-wrap'>
		<li>이름 :  <? echo $_POST[irum]; ?>  </li>	
		<li>이메일 : <? echo $_POST[email]; ?>  </li>	
		<li>메시지 : <? echo $_POST[message]; ?>  </li>	
		<li><a href='index.html'>홈으로</a></li>	
	</ul>
	
</body>
</html>