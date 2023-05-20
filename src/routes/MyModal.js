import { Modal, Button } from "antd";
import { useState, useEffect } from "react";

function MyModal({ visible, onCancel, onSave, date, data }) {
  const [newData, setNewData] = useState(data || {});
  const [breakfastMenu, setBreakfastMenu] = useState("");
  const [breakfastValue, setBreakfastValue] = useState("");
  const [lunchMenu, setLunchMenu] = useState("");
  const [lunchValue, setLunchValue] = useState("");
  const [dinnerMenu, setDinnerMenu] = useState("");
  const [dinnerValue, setDinnerValue] = useState("");

  const calculateTotal = () => {
    const total = parseInt(breakfastValue) + parseInt(lunchValue) + parseInt(dinnerValue);
    return total;
  };
  const totalAmount = calculateTotal();
  console.log(totalAmount); // 총액 출력

  useEffect(() => {
    setNewData(data || {});
    setBreakfastMenu(data?.breakfast || "");
    setBreakfastValue(data?.breakfastValue || "");
    setLunchMenu(data?.lunch || "");
    setLunchValue(data?.lunchValue || "");
    setDinnerMenu(data?.dinner || "");
    setDinnerValue(data?.dinnerValue || "");
  }, [data]);

  const handleSave = () => {
    const updatedData = {
      ...newData,
      breakfast: breakfastMenu,
      breakfastValue,
      lunch: lunchMenu,
      lunchValue,
      dinner: dinnerMenu,
      dinnerValue,
    };
    onSave(updatedData);
    setNewData({});
    setBreakfastMenu("");
    setBreakfastValue("");
    setLunchMenu("");
    setLunchValue("");
    setDinnerMenu("");
    setDinnerValue("");
    onCancel();
  };

  return (
    <Modal
      title={date.format("YYYY년 MM월 DD일")}
      visible={visible}
      onCancel={onCancel}
      footer={null}
    >
      <div style={{ display: "flex", flexDirection: "column", marginTop: 50, marginLeft: 50 }}>
        <div
          className="breakfast"
          style={{
            display: "flex",
            alignItems: "center",
            textAlign: "left",
            marginBottom: 10,
          }}
        >
          <p style={{ margin: 0, marginRight: 10 }}>아침</p>
          <input
            type="text"
            value={breakfastMenu}
            onChange={(e) => setBreakfastMenu(e.target.value)}
          />
          <input
            type="text"
            value={breakfastValue}
            onChange={(e) => setBreakfastValue(e.target.value)}
            style={{ width: "100px", marginLeft: 20, textAlign: "right" }}
            placeholder="원"
            onKeyDown={(e) => {
              if (e.key === "Backspace") {
                e.preventDefault();
                if (breakfastValue.length > 0) {
                  setBreakfastValue(breakfastValue.slice(0, -1));
                }
              }
            }}
            onBlur={() => {
              if (!breakfastValue.endsWith("원")) {
                setBreakfastValue(breakfastValue + "원");
              }
            }}
          />

        </div>
        <div
          className="lunch"
          style={{
            display: "flex",
            alignItems: "center",
            textAlign: "left",
            marginBottom: 10,
          }}
        >
          <p style={{ margin: 0, marginRight: 10 }}>점심</p>
          <input
            type="text"
            value={lunchMenu}
            onChange={(e) => setLunchMenu(e.target.value)}
          />
          <input
            type="text"
            value={lunchValue}
            onChange={(e) => setLunchValue(e.target.value)}
            style={{ width: "100px", marginLeft: 20, textAlign: "right" }}
            placeholder="원"
            onKeyDown={(e) => {
              if (e.key === "Backspace") {
                e.preventDefault();
                if (lunchValue.length > 0) {
                  setLunchValue(lunchValue.slice(0, -1));
                }
              }
            }}
            onBlur={() => {
              if (!lunchValue.endsWith("원")) {
                setLunchValue(lunchValue + "원");
              }
            }}
          />


        </div>
        <div
          className="dinner"
          style={{
            display: "flex",
            alignItems: "center",
            textAlign: "left",
            marginBottom: 10,
          }}
        >
          <p style={{ margin: 0, marginRight: 10 }}>저녁</p>
          <input
            type="text"
            value={dinnerMenu}
            onChange={(e) => setDinnerMenu(e.target.value)}
          />
          <input
            type="text"
            value={dinnerValue}
            onChange={(e) => setDinnerValue(e.target.value)}
            style={{ width: "100px", marginLeft: 20, textAlign: "right" }}
            placeholder="원"
            onKeyDown={(e) => {
              if (e.key === "Backspace") {
                e.preventDefault();
                if (dinnerValue.length > 0) {
                  setDinnerValue(dinnerValue.slice(0, -1));
                }
              }
            }}
            onBlur={() => {
              if (!dinnerValue.endsWith("원")) {
                setDinnerValue(dinnerValue + "원");
              }
            }}
          />

        </div>
        <div className="kcal"></div>
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