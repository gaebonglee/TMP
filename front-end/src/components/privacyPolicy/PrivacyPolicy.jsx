import React from "react";
import "./PrivacyPolicy.scss";

const PrivacyPolicy = () => {
  window.scrollTo({ top: 0 });
  return (
    <div className="privacy__policy__container">
      <div className="privacy__policy__title">[개인정보 처리 방침]</div>
      <hr />
      <ul className="privacy__policy__ul">
        <li className="privacy__policy__sub__title">개인정보 처리 방침</li>
        <li className="privacy__policy__sub__content">
          주식회사 TMP[이하 TMP 또는 “회사”라 한다]은 정보통신망 이용촉진 및
          정보보호 등에 관한 법률, 개인정보 보호법을 비롯한 모든 개인정보보호
          관련 규정을 준수함에 따라 개인정보 처리방침을 수립∙공개하고 있습니다.
          회사는 이를 인터넷 홈페이지 및 모바일 애플리케이션에 공개하여 이용자가
          언제나 용이하게 열람할 수 있도록 하여 이용자 권익보호에 최선을 다하고
          있습니다.
        </li>
        <li className="privacy__policy__sub__title">
          제1조 개인정보의 처리 목적
        </li>
        <li className="privacy__policy__sub__content">
          회사는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는
          개인정보는 다음 목적 이외의 용도로는 이용되지 않으며, 이용 목적이
          변경되는 경우에는 별도의 동의를 받는 등 필요한 조치를 이행할
          예정입니다.
        </li>
        <li className="privacy__policy__sub__content">
          1. TMP 회원가입 및 관리
          <br />
          회원 가입의사 확인, 회원제 서비스 제공에 따른 본인 식별∙인증, 회원자격
          유지∙관리, 본인확인, 서비스 부정이용 방지, 각종 고지∙통지, 고충처리
          등을 목적으로 개인정보를 처리합니다.
        </li>
        <li className="privacy__policy__sub__content">
          2. 서비스 제공
          <br />
          서비스 제공, 콘텐츠 제공, 맞춤서비스 제공 등을 목적으로 개인정보를
          처리합니다.
        </li>
        <li className="privacy__policy__sub__content">
          3. 마케팅 또는 이벤트 실시
          <br />
          마케팅 또는 이벤트 참여기회 제공, 광고정보 제공 등의 목적으로
          개인정보를 처리합니다.
        </li>
        <li className="privacy__policy__sub__title">
          제2조 개인정보의 처리 및 보유기간
        </li>
        <li className="privacy__policy__sub__content">
          회사는 법령과 운영 방침에 따른 개인정보 보유∙이용기간 또는
          정보주체로부터 개인정보를 수집 시 동의 받은 개인정보 보유∙이용기간
          내에서 개인정보를 처리∙보유합니다.
        </li>
        <li className="privacy__policy__sub__content">
          1. TMP 회원가입 및 관리: 회원 탈퇴 시 까지
          <br />
          다만, 다음의 사유에 해당하는 경우에는 해당 사유 종료 시까지
        </li>
        <li className="privacy__policy__sub__content">
          &emsp;&emsp;1&#41; 관계 법령 위반에 따른 수사∙조사 등이 진행중인 경우,
          해당 수사 ∙조사 종료 시까지
          <br />
          &emsp;&emsp;2&#41; 회원이 2년간 서비스 이용기록이 없는 경우,
          정보통신망 이용촉진 및 정보보호 등에 관한 법률 제29조에 따라 회원에게
          사전 통지하고 즉시 파기합니다.
        </li>
        <li className="privacy__policy__sub__content">
          2. 마케팅 또는 이벤트 실시: 마케팅 또는 이벤트 종료 후 60일
          <br />
          다만, 이용자가 철회 요청하는 경우 지체 없이 해당 개인정보를 파기함
        </li>
        <li className="privacy__policy__sub__content">
          3. 서비스 제공: 서비스 공급완료 및 요금 결제∙정산 완료 시<br />
          다만, 다음의 사유에 해당하는 경우에는 해당 사유 종료 시까지
        </li>
        <li className="privacy__policy__sub__content">
          &emsp;&emsp;1&#41; 「전자상거래 등에서의 소비자보호에 관한 법률」에
          따른 표시∙광고, 계약내용 및 이행 등 거래에 관한 기록
          <br />
          <br />
          &emsp;&emsp;표시 및 광고에 관한 기록: 6개월
          <br />
          &emsp;&emsp;계약 또는 청약철회 등에 관한 기록: 5년
          <br />
          &emsp;&emsp;대금결제 및 재화 등의 공급에 관한 기록: 5년
          <br />
          &emsp;&emsp;소비자의 불만 또는 분쟁처리에 관한 기록: 3년
        </li>
        <li className="privacy__policy__sub__title">
          제3조 개인정보의 제3자 제공
        </li>
        <li className="privacy__policy__sub__content">
          회사는 이용자의 개인정보를 ‘제2조 개인정보의 수집∙이용 목적’에서
          고지한 범위 내에서 사용하며, 동의 범위를 초과하여 이용하거나
          원칙적으로 제3자에게 제공하지 않습니다.
          <br />
          다만, 다음의 경우에는 개인정보를 제3자에게 제공할 수 있습니다.
        </li>
        <li className="privacy__policy__sub__content">
          1. 통계작성, 학술연구나 시장조사를 위해 특정 개인을 식별할 수 없는
          형태로 가공하여 제공하는 경우
        </li>
        <li className="privacy__policy__sub__content">
          2. 이용자들이 사전에 동의한 경우
        </li>
        <li className="privacy__policy__sub__content">
          3. 법령의 규정에 의거하거나, 수사 목적으로 법령에 정해진 절차와 방법에
          따라 수사기관의 요구가 있는 경우
        </li>
        <li className="privacy__policy__sub__content">
          4. 단, 원활한 서비스 제공을 위해 상품/서비스 구매 시 상품/서비스
          제공자에게 이용자의 개인정보를 제3 자 제공에 동의하는 경우에는 서비스
          제공 및 본인확인 등을 위하여 필요한 최소한의 개인정보만을 서비스
          제공자&#40;판매자&#41;에게 제공합니다.
        </li>
        <li className="privacy__policy__sub__content">
          - 제공받는 자 : 상품/서비스 제공자&#40;판매자&#41;
          <br />
          - 제공 항목 : 구매자 이름, 휴대전화번호, 성별, 연령대
          <br />
          - 제공 목적 : 원활한 레슨 진행, 고객상담 및 민원처리
          <br />- 보유 및 이용기간 : 회원탈퇴 시 또는 위 개인정보 이용목적 달성
          시 까지 이용합니다.
        </li>
        <li className="privacy__policy__sub__title">
          제4조 개인정보처리의 위탁
        </li>
        <li className="privacy__policy__sub__content">
          회사는 더 나은 서비스를 제공하기 위하여 이용자의 개인정보 처리를
          외부전문기관에 위탁할 수 있으며, 위탁하는 업무의 내용과 수탁자를
          언제든지 쉽게 확인할 수 있도록 회사의 개인정보 처리방침에 지속적으로
          게재하여 공개합니다.
        </li>
        <li className="privacy__policy__sub__content">
          1. 회사는 원활한 개인정보 업무처리를 위하여 다음과 같이 개인정보
          처리업무를 위탁하고 있습니다.
        </li>
        <li className="privacy__policy__sub__content">
          &emsp;&emsp;1&#41; 수탁 업체 : Amazon Web Service inc.
          <br />
          &emsp;&emsp;위탁 내용 : 데이터 보관
          <br />
          &emsp;&emsp;위탁 기간 : 위탁계약 종료 시 또는 회원탈퇴 시<br />
          &emsp;&emsp;위탁 국가 : 대한민국 서울&#40;AWS Seoul Region&#41;
        </li>
        <li className="privacy__policy__sub__content">
          2. 위탁업무의 내용이나 수탁자가 변경될 경우에는 지체 없이 본 개인정보
          처리방침을 통하여 공개합니다.
        </li>
        <li className="privacy__policy__sub__title">
          제5조 정보주체의 권리∙의무 및 행사방법
        </li>
        <li className="privacy__policy__sub__content">
          1. 이용자는 언제든지 다음 각 호의 개인정보 보호 관련 권리를 행사할 수
          있습니다.
        </li>
        <li className="privacy__policy__sub__content">
          &emsp;&emsp;1&#41; 개인정보 열람요구
          <br />
          &emsp;&emsp;2&#41; 오류 등이 있을 경우 정정 요구
          <br />
          &emsp;&emsp;3&#41; 삭제요구
          <br />
          &emsp;&emsp;4&#41; 처리정지 요구
          <br />
        </li>
        <li className="privacy__policy__sub__content">
          2. 제1항에 따른 권리 행사는 서면, 전화, 전자우편, 팩스 등을 통하여
          하실 수 있으며 회사는 이에 대해 지체 없이 조치합니다.
        </li>
        <li className="privacy__policy__sub__content">
          3. 이용자가 개인정보의 오류 등에 대한 정정 또는 삭제를 요구한 경우,
          회사는 정정 또는 삭제를 완료할 때까지 당해 개인정보를 이용하거나
          제공하지 않습니다.
        </li>
        <li className="privacy__policy__sub__content">
          4. 제1항에 따른 권리 행사는 이용자의 법정대리인이나 위임을 받은 자 등
          대리인을 통해 할 수 있습니다.
        </li>
        <li className="privacy__policy__sub__content">
          5. 이용자는 정보통신망법, 개인정보 보호법 등 관계법령을 위반하여
          회사가 처리하고 있는 이용자 본인이나 타인의 개인정보 및 사생활을
          침해할 수 없습니다.
        </li>
        <li className="privacy__policy__sub__title">
          제6조 처리하는 개인정보 항목
        </li>
        <li className="privacy__policy__sub__content">
          회사는 다음의 개인정보 항목을 처리하고 있습니다.
        </li>
        <li className="privacy__policy__sub__content">
          <table border={1}>
            <tr>
              <td className="col1 privacy__policy__table__textCenter privacy__policy__table__weight">
                회원 구분
              </td>
              <td className="col2 privacy__policy__table__textCenter privacy__policy__table__weight">
                수집 목적
              </td>
              <td className="col3 privacy__policy__table__textCenter privacy__policy__table__weight">
                수집 이용 항목
              </td>
            </tr>
            <tr>
              <td className="col1 privacy__policy__table__textCenter">
                개인 사용자 회원
              </td>
              <td rowSpan={2}>
                회원 가입, 중복 확인, 서비스 제공 및 상담, 부정 이용 방지
              </td>
              <td>성명, 휴대전화번호, 프로필 이미지, *SNS 가입 정보</td>
            </tr>
            <tr>
              <td
                rowSpan={2}
                className="col1 privacy__policy__table__textCenter"
              >
                파트너 회원
              </td>
              <td>
                - 필수: 성명, 휴대전화번호, *SNS 가입 정보, 성별, 소속 체육시설
                정보&#40;체육시설 명칭, 주소, 전화번호, 대상 고객 성별&#41;
                <br />- 선택: 예명
              </td>
            </tr>
            <tr>
              <td>운동닥터 정산 이용 시 정산에 필요한 정보 수집</td>
              <td>
                - 센터로 정산 시: 사업자등록정보&#40;사업자등록증,
                사업자등록번호, 사업자명&#41;
                <br />
                - 파트너 회원 직접 정산 시: 주민등록정보&#40;주민등록증,
                주민등록번호&#41;
                <br />- 공통: 계좌 정보&#40;은행명, 예금주, 계좌번호&#41;
              </td>
            </tr>
            <tr>
              <td
                rowSpan={2}
                className="col1 privacy__policy__table__textCenter"
              >
                공통
              </td>
              <td>마케팅 또는 이벤트 실시</td>
              <td>성명, 휴대전화번호, 마케팅 또는 이벤트 관련 응모내용</td>
            </tr>
            <tr>
              <td>
                서비스 방문 빛 이용 기록 분석, 앱 사용 문의에 관한 파악 및 상담
                제공
              </td>
              <td>
                서비스 이용기록, 방문기록, IP주소, 쿠키, MAC주소, 모바일
                기기정보&#40;앱 버전, OS 버전&#41;, 광고식별자
              </td>
            </tr>
          </table>
        </li>
        <li className="privacy__policy__sub__content">
          * 회사가 제 3자로부터 제공받는 정보&#40;SNS 가입 정보&#41;
          <br />
          - 카카오 이용 시: 이메일 주소, 카카오 ID 코드, 프로필 사진
          <br />
          - 네이버 이용 시: 이메일 주소, 네이버 ID 코드, 프로필 사진
          <br />- 구글 이용 시: 이메일 주소, 구글 ID 코드, 프로필 사진
        </li>
        <li className="privacy__policy__sub__title">제7조 개인정보의 파기</li>
        <li className="privacy__policy__sub__content">
          1. 회사는 개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가
          불필요하게 되었을 때에는 지체 없이 개인정보를 파기합니다.
        </li>
        <li className="privacy__policy__sub__content">
          2. 이용자로부터 동의받은 개인정보 보유기간이 경과하거나 처리목적이
          달성되었음에도 불구하고 다른 법령에 따라 개인정보를 계속 보존하여야
          하는 경우에는 해당 개인정보를 별도의 데이터베이스&#40;DB&#41;에
          옮기거나 보관장소를 달리하여 보존합니다.
        </li>
        <li className="privacy__policy__sub__content">
          3. 개인정보 파기 절차 및 방법은 다음과 같습니다.
        </li>
        <li className="privacy__policy__sub__content">
          &emsp;&emsp;1&#41; 파기절차
          <br />
          &emsp;&emsp;회사는 파기 사유가 발생한 개인정보를 선정하고, 회사의
          개인정보 보호책임자의 승인을 받아 개인정보를 파기합니다.
        </li>
        <li className="privacy__policy__sub__content">
          &emsp;&emsp;2&#41; 파기방법
          <br />
          &emsp;&emsp;회사는 전자적 파일 형태로 기록∙저장된 개인정보는 기록을
          재생할 수 없는 기술적 방법을 사용합니다.종이 문서에 기록 ∙저장된
          개인정보는 분쇄기로 분쇄하여 파기합니다.
        </li>
        <li className="privacy__policy__sub__title">
          제8조 개인정보의 안전성 확보조치
        </li>
        <li className="privacy__policy__sub__content">
          회사는 이용자의 개인정보를 처리함에 있어 개인정보가 분실, 도난, 유출,
          변조 또는 훼손되지 않도록 안전성 확보를 위하여 다음과 같은
          기술적∙관리적 ∙물리적 조치를 취하고 있습니다.
        </li>
        <li className="privacy__policy__sub__content">
          1. 관리적 조치
          <br />
          <br />
          &emsp;&emsp;개인정보 내부관리계획의 수립 및 시행
          <br />
          &emsp;&emsp;개인정보취급자 지정 최소화 및 교육 <br />
          <br />
          2. 기술적 조치
          <br />
          <br />
          &emsp;&emsp;개인정보 접근 제한 접속기록 보관 및 위∙변조 방지 <br />
          <br />
          3. 물리적 조치
          <br />
          <br />
          &emsp;&emsp;비인가자에 대한 출입 통제
          <br />
          <br />
          회사는 이용자 개인의 실수나 기본적인 인터넷의 위험성 때문에 일어나는
          일들에 대해 책임을 지지 않습니다.회원 개개인이 본인의 개인정보를
          보호하기 위해서 자신의 아이디와 비밀번호를 적절하게 관리하고 여기에
          대한 책임을 져야 합니다.
        </li>
        <li className="privacy__policy__sub__content"></li>
        <li className="privacy__policy__sub__title"></li>
      </ul>
    </div>
  );
};

export default PrivacyPolicy;
