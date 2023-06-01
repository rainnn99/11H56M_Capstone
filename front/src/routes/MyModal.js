import { Modal, Button } from "antd";
import { useState, useEffect } from "react";

function MyModal({ visible, onCancel, onSave, date, data }) {
  const [newData, setNewData] = useState(data || {});
  const [breakfastMenu, setBreakfastMenu] = useState(""); // 아침메뉴
  const [lunchMenu, setLunchMenu] = useState(""); // 점심메뉴
  const [dinnerMenu, setDinnerMenu] = useState(""); // 저녁 메뉴


  useEffect(() => {
    setNewData(data || {});
    setBreakfastMenu(data?.breakfast || "");
    setLunchMenu(data?.lunch || "");
    setDinnerMenu(data?.dinner || "");
  }, [data]);

  const handleSave = () => {
    const updatedData = {
      ...newData,
      breakfast: breakfastMenu,
      lunch: lunchMenu,
      dinner: dinnerMenu,
    };
    onSave(updatedData);
    setNewData({});
    setBreakfastMenu("");
    setLunchMenu("");
    setDinnerMenu("");
    onCancel();
  };

  return (
    <Modal
      title={date.format("MM월 DD일")}
      visible={visible}
      onCancel={onCancel}
      footer={null}
      centered
      style={{ textAlign: "center" }}
    >
      <div style={{ display: "flex", flexDirection: "column", marginTop: 50, textAlign: "center"  }}>
        <div
          className="breakfast"
          style={{
            display: "flex",
            alignItems: "center",
            textAlign: "center",
            marginBottom: 10,
            justifyContent: "center",
          }}
        >
          <p style={{ margin: 0, marginRight: 10 }}>아침</p>
          <input
            type="text"
            value={breakfastMenu}
            onChange={(e) => setBreakfastMenu(e.target.value)}
          />
          

        </div>
        <div
          className="lunch"
          style={{
            display: "flex",
            alignItems: "center",
            textAlign: "center",
            marginBottom: 10,
            justifyContent: "center",
          }}
        >
          <p style={{ margin: 0, marginRight: 10 }}>점심</p>
          <input
            type="text"
            value={lunchMenu}
            onChange={(e) => setLunchMenu(e.target.value)}
          />
          


        </div>
        <div
          className="dinner"
          style={{
            display: "flex",
            alignItems: "center",
            textAlign: "center",
            marginBottom: 10,
            justifyContent: "center", // 중앙 정렬
          }}
        >
          <p style={{ margin: 0, marginRight: 10 }}>저녁</p>
          <input
            type="text"
            value={dinnerMenu}
            onChange={(e) => setDinnerMenu(e.target.value)}
          />
          

        </div>
        
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button onClick={handleSave} style={{ marginLeft: 10 }}>
          저장
        </Button>
      </div>
    </Modal>
  );
}

export default MyModal;