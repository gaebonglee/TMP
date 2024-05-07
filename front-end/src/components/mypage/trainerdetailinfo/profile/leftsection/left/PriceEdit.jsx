import React, { useEffect, useState } from "react";
import "./PriceEdit.scss";

const PriceEdit = ({ content, setContent }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // 배열을 받고, 배열의 길이가 4보다 작으면 빈 객체를 추가하여 길이를 4로 맞춥니다.
    if (content) {
      const newData = [...content];
      while (newData.length < 4) {
        newData.push({ count: "", total_price: "" }); // 빈 객체를 추가합니다.
      }
      setData(newData);
    }
  }, [content]);

  const handlePrice = (objectName, value, index) => {
    const newData = [...data];
    newData[index][objectName] = value;
    setData(newData);
    setContent(newData);
  };
  return (
    <div>
      <div className="priceEdit_container">
        <div className="subtitle">
          <p>트레이너님의 레슨 가격을 알려주세요.</p>
        </div>
        <div className="precautions_wrap">
          <ul>
            <li>• 가격이 낮을수록 더 많은 회원이 상담을 신청합니다.</li>
            <li>• 다양한 가격대를 입력해주세요. (ex. 10, 20, 30회)</li>
            <li>• 30회 기준으로 대표가격이 설정됩니다.</li>
            <li>• 부가세 포함 금액 기준으로 작성해주세요.</li>
          </ul>
        </div>
        <div className="tableWrap">
          <div className="priceEdit_table">
            <table className="priceEdit_content">
              <thead>
                <tr>
                  <th scope="col">횟수</th>
                  <th scope="col">가격</th>
                </tr>
              </thead>
              <tbody>
                {data.map((v, i) => {
                  return (
                    <tr key={i}>
                      <td>
                        <input
                          type="text"
                          placeholder="숫자만 입력"
                          name="times"
                          maxLength={5}
                          value={v.count}
                          onChange={(e) =>
                            handlePrice("count", e.target.value, i)
                          }
                        />
                      </td>
                      <td>
                        <div className="priceEdit_won">원</div>
                        <input
                          type="text"
                          placeholder="숫자만 입력"
                          name="price"
                          maxLength={9}
                          value={v.total_price}
                          onChange={(e) =>
                            handlePrice("total_price", e.target.value, i)
                          }
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceEdit;
