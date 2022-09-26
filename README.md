# 행복을 사다
<img width="500" alt="image" src="https://user-images.githubusercontent.com/30457954/192203084-09dbead4-9b2f-423a-a2ef-898b1c441be1.png">

<b><행복을 사다></b>는 간편하게 로또 복권 관리를 도와주는 앱입니다. 앱 내의 카메라를 통해 구매한 로또의 QR코드를 촬영하면 자동으로 회차와 번호를 기록해주는 것은 물론, 로또 api를 활용해 당첨번호가 발표되면 회차별 당첨 여부를 알려줍니다. 
기존 복권 관리 서비스는 트렌드에 뒤쳐진 디자인과 낮은 가독성, 불필요한 기능들로 인해 사용성이 떨어지지만 마땅한 대안이 없는 상황이었기 때문에, 꼭 필요한 기능들만 넣어 디자인을 개선한 <b><행복을 사다></b>를 제작하게 되었습니다.

## 기술 스택
- react-native CLI
- typescript

## 구현 기능
- 카메라 연동을 통해 로또 QR코드 데이터 분석 및 회차, 번호 정보를 local storage에 저장
- 매주 토요일 정해진 시간에 추첨 완료 알림 (local notification)
  - 알림 On/Off 기능
- 기록 삭제 기능
- 당첨 번호와 대조 후 색상을 통해 당첨 여부 표현

## 결과물
<a href="https://play.google.com/store/apps/details?id=com.happyweek">Google Playstore</a><br/>
<img width="607" alt="image" src="https://user-images.githubusercontent.com/30457954/192204036-d05efc89-4624-4e1f-ad57-33f4fe9e4ae1.png">

<a href="https://apps.apple.com/kr/app/%ED%96%89%EB%B3%B5%EC%9D%84-%EC%82%AC%EB%8B%A4-%EB%A1%9C%EB%98%90-%EB%8B%B9%EC%B2%A8-%ED%99%95%EC%9D%B8/id1606761959">Apple Appstore</a><br/>
<img width="604" alt="image" src="https://user-images.githubusercontent.com/30457954/192204079-420327d0-61e9-4552-abee-a4bffca0730a.png">

