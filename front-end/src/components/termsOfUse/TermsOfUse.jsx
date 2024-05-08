import React from "react";

// PrivacyPolicy와 scss를 공유함.

const TermsOfUse = () => {
  window.scrollTo({ top: 0 });
  return (
    <div className="privacy__policy__container">
      <div className="privacy__policy__title">[서비스 이용 약관]</div>
      <hr />
      <ul className="privacy__policy__ul">
        <li className="privacy__policy__sub__title">
          제 1 조 &#40;약관의 적용목적&#41;
        </li>
        <li className="privacy__policy__sub__content">
          이 약관은 TMP&#40;이하 “회사”라 한다&#41;이 운영하는 “TMP”에서
          제공하는 인터넷 서비스&#40;이하 “서비스”라 한다&#41;를 이용함에 있어
          “회사”와 “이용자”의 권리, 의무 및 책임 사항을 규정함을 목적으로
          합니다.
        </li>
        <li className="privacy__policy__sub__title">
          제 2조 &#40;용어의 정의&#41;
        </li>
        <li className="privacy__policy__sub__content">
          1. “TMP”라 함은 “회사”가 “파트너 회원”이 등록한 체육시설 및 코치의
          정보를 “이용자”에게 제공하기 위하여 컴퓨터 등 정보 통신 설비를
          이용하여 설정한 가상의 게시 공간을 말하며, 아울러 인터넷 사이트 및
          모바일 어플리케이션을 운영하는 회사의 의미로도 사용합니다.
        </li>
        <li className="privacy__policy__sub__content">
          2. “이용자”라 함은 “운동닥터” 서비스를 이용하는 “개인 사용자 회원”
          또는 “파트너 회원" 또는 “비회원”을 말합니다.
        </li>
        <li className="privacy__policy__sub__content">
          3. “회원”은 “개인 사용자 회원”과 “파트너 회원”을 의미합니다.
        </li>
        <li className="privacy__policy__sub__content">
          4. “개인 사용자 회원”이라 함은 “회사”가 정한 소정의 절차를 거쳐서 회원
          가입을 한 개인으로서, “TMP”의 정보를 지속적으로 제공 받고 이용할 수
          있는 권한을 가진 자를 말합니다.
        </li>
        <li className="privacy__policy__sub__content">
          5. “파트너 회원"이라 함은 “회사”가 정한 소정의 절차를 거쳐서 회원
          가입을 한 체육시설 담당자 또는 코치로서 “TMP”에 허락 받은 프로필을
          게시할 수 있는 권한을 가진 “회원”을 말합니다.
        </li>
        <li className="privacy__policy__sub__content">
          6. “비회원”이라 함은 회원으로 가입하지 않고 “회사”가 제공하는 서비스를
          이용하는 자를 말합니다.
        </li>
        <li className="privacy__policy__sub__content">
          7. “콘텐츠”라 함은 “파트너 회원”이 홍보를 위하여 게재한 모든 글, 사진
          등을 말합니다.
        </li>
        <li className="privacy__policy__sub__content">
          8. “050 연결 전화번호”라 함은 “회사”가 “파트너 회원”에게 무료로
          제공하는 050으로 시작하는 대체 전화번호를 의미합니다.
        </li>
        <li className="privacy__policy__sub__content">
          위 항에서 정의되지 않은 이 약관상의 용어의 의미는 일반적인 관행에
          의합니다.
        </li>
        <li className="privacy__policy__sub__title">
          제 3 조 &#40;약관 명시와 개정&#41;
        </li>
        <li className="privacy__policy__sub__content">
          1. “회사”는 이 약관의 내용을 회원가입 단계 및 서비스 내에서 확인할 수
          있도록 게시합니다.
        </li>
        <li className="privacy__policy__sub__content">
          2. “회사”는 약관의 규제에 관한 법률, 정보통신망 이용촉진 및 정보보호
          등에 관한 법률 등 관련법을 위배하지 않는 범위에서 이 약관을 개정할 수
          있습니다.
        </li>
        <li className="privacy__policy__sub__content">
          3. “회사”가 이 약관을 개정하는 경우에는 개정된 약관의 적용일자 및
          개정사유를 명시하여 현행 약관과 함께 그 적용일자 7일&#40;불리한 경우
          30일&#41; 이전부터 적용일자 전일까지 위 제1항의 방법으로 공지합니다.
          “회원”에게 불리한 약관의 개정은 이용자가 등록한 전자우편, 로그인 시
          팝업창 등의 전자적 수단을 통하여 통지하도록 합니다.
        </li>
        <li className="privacy__policy__sub__content">
          4. “회사”가 전항에 따라 개정약관을 공지 또는 통지하면서 “회원”에게 동
          기간 내에 의사표시를 하지 않으면 의사표시가 표명된 것으로 본다는 뜻을
          명확하게 공지 또는 통지하였음에도 “회원”이 명시적으로 거부의
          의사표시를 하지 아니한 경우 “회원”이 개정약관에 동의한 것으로 봅니다.
        </li>
        <li className="privacy__policy__sub__content">
          5. “회원”이 개정약관의 적용에 동의하지 않는 경우 “회사”는 개정 약관의
          내용을 적용할 수 없으며, 이 경우 “회원”은 이용계약을 해지할 수
          있습니다. 기존 약관을 적용할 수 없는 특별한 사정이 있는 경우에는
          “회사”는 이용계약을 해지할 수 있습니다.
        </li>
        <li className="privacy__policy__sub__content">
          6. 본 약관에서 정하지 아니한 사항과 본 약관의 해석에 관해서는 약관의
          규제 등에 관한 법률, 정보통신망 이용촉진 및 정보보호 등에 관한 법률
          또는 상관례에 의합니다.
        </li>
        <li className="privacy__policy__sub__title">
          제 4조 &#40;서비스의 제공 및 변경&#41;
        </li>
        <li className="privacy__policy__sub__content">
          1. "TMP"는 다음과 같은 업무를 수행합니다.
        </li>
        <li className="privacy__policy__sub__content">
          &emsp;&emsp;체육시설 정보 및 코치에 관한 정보 제공 서비스
        </li>
        <li className="privacy__policy__sub__content">
          &emsp;&emsp;기타 “TMP”의 이용자를 위하여 제공하는 서비스
        </li>
        <li className="privacy__policy__sub__content">
          &emsp;&emsp;“TMP”는 지적재산권, 부정경쟁방지법 등 관련법에 저촉되지
          않은 체육시설 정보를 직접 제공합니다. 또한, “파트너 회원”이 체육시설
          및 코치의 홍보를 위해 “콘텐츠”를 올릴 수 있는 플랫폼을 제공합니다.
          “이용자”는 자신이 생산하여 플랫폼에 제공한 “콘텐츠”에 대한 저작권을
          갖습니다. 따라서, “콘텐츠”에 대한 책임은 “콘텐츠”를 생산해서 올린
          원저작자에 있습니다.
        </li>
        <li className="privacy__policy__sub__content">
          &emsp;&emsp;“TMP”가 제공하기로 이용자와 계약을 체결한 서비스의 내용을
          기술적 사양의 변경 등의 사유로 변경할 경우에는, 그 변경이 실질적으로
          이용자에게 불리한 것이 아닌 경우 그 사유를 이용자에게 통지하거나,
          이용자가 알아볼 수 있도록 공지사항으로 게시합니다.
        </li>
        <li className="privacy__policy__sub__content">
          &emsp;&emsp;“TMP”는 정보 제공 목적으로 “이용자”에게 이메일,
          문자메세지, 푸시 알림&#40;App Push&#41;을 발송 할 수 있습니다.
        </li>
        <li className="privacy__policy__sub__title">
          제 5조 &#40;서비스의 중단&#41;
        </li>
        <li className="privacy__policy__sub__content">
          1. 회원의 서비스 기간은 “회사”에 서비스를 신청하여 이용 승낙이 있은
          날로부터 이용 계약 해지 시까지 입니다.
        </li>
        <li className="privacy__policy__sub__content">
          2. “TMP”는 컴퓨터 등 정보 통신 설비의 보수 점검, 교체 및 고장, 통신의
          두절, 천재지변 등 운영상 상당한 이유가 있는 경우에는 서비스의 제공을
          제한하거나 일시적으로 중단할 수 있습니다.
        </li>
        <li className="privacy__policy__sub__content">
          3. 사업종목의 전환, 사업의 포기, 업체 간의 통합 등의 이유로 서비스를
          제공할 수 없게 되는 경우에는 “운동닥터”는 제8조에 정한 방법으로 충분한
          기간을 두어 이용자에게 통지하거나 이용자가 알아볼 수 있도록 공지
          사항으로 게시합니다.
        </li>
        <li className="privacy__policy__sub__title">
          제 6조 &#40;대리 행위의 부인&#41;
        </li>
        <li className="privacy__policy__sub__content">
          “회사”는 효율적인 서비스를 위한 시스템 운영 및 관리 책임만을 부담하며,
          이용자가 운동닥터의 정보를 이용하는 중에 발생한 상담 및 직접거래와
          관련하여 당사자 중 어느 일방을 대리하지 아니하고, 이용자 사이에 성립된
          거래 및 회원이 제공하고 등록한 정보에 대해서는 해당 이용자가 그에 대한
          책임을 부담하여야 합니다.
        </li>
        <li className="privacy__policy__sub__title">
          제 7조 &#40;보증의 부인&#41;
        </li>
        <li className="privacy__policy__sub__content">
          “회사”는 신고 받은 허위 정보의 삭제조치를 취하는 등의 서비스
          관리자로서의 책임을 부담합니다. 단, 이용자가 TMP를 이용해 얻은 정보를
          기반으로 별도의 이용자 간 계약을 체결할 경우에 대한 위험과 책임은
          계약을 체결한 해당 이용자가 부담합니다.
        </li>
        <li className="privacy__policy__sub__title">
          제 8 조 &#40;회원에 대한 통지 및 공지&#41;
        </li>
        <li className="privacy__policy__sub__content">
          1. "회사”는 이동전화 단문 메시지 서비스&#40;SMS&#41; 또는
          푸시알림&#40;App push&#41; 등으로 회원에게 통지할 수 있습니다.
        </li>
        <li className="privacy__policy__sub__content">
          2. “회사”는 불특정다수 회원에 대한 통지의 경우 공지사항을 통하여
          게시함으로 개별 통지를 대신 할 수 있습니다. 다만, 회원 본인의 거래와
          관련하여 중대한 영향을 미치는 사항 또는 회원에게 불리한 약관 개정 등에
          대해서는 제1항의 방법 또는 문자메시지&#40;SMS&#41; 송신, 전자메일 송신
          등의 방법으로 개별적으로 통지합니다.
        </li>
        <li className="privacy__policy__sub__title">
          제9 조 &#40;회원가입&#41;
        </li>
        <li className="privacy__policy__sub__content">
          1. “이용자”는 “회사”가 정한 가입 양식에 따라 회원 정보를 기입함과
          함께, 이 약관에 동의한다는 의사표시를 함으로서 회원 가입을 신청합니다.
        </li>
        <li className="privacy__policy__sub__content">
          2. “회사”는 제1항과 같이 회원으로 가입할 것을 신청한 이용자 중 다음 각
          호에 해당하지 않는 한 “개인 사용자 회원” 또는 “파트너 회원"으로
          등록합니다.
        </li>
        <li className="privacy__policy__sub__content">
          &emsp;&emsp;등록 내용에 허위, 기재누락, 오기가 있는 경우
          <br />
          <br />
          &emsp;&emsp;가입 신청자가 이전에 회원 자격을 상실한 적이 있는
          경우&#40;다만 회원 자격 상실 후 “회사”가 필요하다고 판단하여 회원
          재가입에 대한 승낙을 얻은 경우에는 예외로 합니다.&#41;
          <br />
          <br />
          &emsp;&emsp;“회사”로부터 회원 자격 정지 조치 등을 받은 회원이 그 조치
          기간 중에 이용 계약을 임의 해지하고 재가입 신청을 하는 경우
          <br />
          <br />
          &emsp;&emsp;기타 회원으로 등록하는 것이 “TMP”의 기술상 현저히
          곤란하다고 판단되는 경우
          <br />
          <br />
          &emsp;&emsp;본 약관에 위배되거나 위법 또는 부당한 이용신청임이 확인된
          경우
        </li>
        <li className="privacy__policy__sub__content">
          3. 회원 가입 계약의 성립 시기는 “TMP”의 승낙이 회원에게 도달한
          시점으로 합니다.
        </li>
        <li className="privacy__policy__sub__content">
          4. “회원”은 “서비스” 안에 “내 정보” 화면을 통하여 언제든지 본인의 개인
          정보를 열람하고 수정할 수 있습니다. 다만, “서비스” 관리를 위해서
          필요한 이동 전화 번호 등은 수정이 불가능 할 수 있습니다.
        </li>
        <li className="privacy__policy__sub__content">
          5. “회원”은 등록 사항에 변경이 있는 경우, 즉시 온라인 수정을 하거나
          전자우편 및 기타 방법으로 “회사”에 그 변경 사항을 알려야 합니다.
        </li>
        <li className="privacy__policy__sub__content">
          6. 제5항의 변경 사항을 “회사”에 알리지 않아 발생한 불이익에 대하여
          “회사”는 책임지지 않습니다.
        </li>
        <li className="privacy__policy__sub__content">
          7. 회원 가입은 반드시 본인의 진정한 정보를 통하여 가입할 수 있습니다.
          “회사”는 “회원”의 종류에 따라, 회원이 등록한 정보에 대하여 전문기관을
          통한 실명확인 및 본인인증을 요청하거나, 파트너 회원의 경우 관할
          행정기관에 연락하여 회원 가입 시 기재한 사항이 체육시설업 신고 현황과
          일치하는지 확인하는 등 기타 확인 조치를 할 수 있습니다. “회원”의
          정보가 “회원” 본인의 것이 아닌 경우 “회사”는 회원 가입을 거부할 수
          있습니다.
        </li>
        <li className="privacy__policy__sub__content">
          8. “회사”는 “회원”을 등급 별로 구분하여 이용 시간, 이용 회수, 서비스
          메뉴, 콘텐츠 등록 제한 등을 세분하여 서비스 이용에 차등을 둘 수
          있습니다.
        </li>
      </ul>
    </div>
  );
};

export default TermsOfUse;
