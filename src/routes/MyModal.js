import { Modal, Button } from "antd";
import { useState } from "react";

function MyModal({ visible, onCancel, onSave, date, data }) {
  const [newData, setNewData] = useState(data || {});

  const handleChange = (e, key) => {
    setNewData((prevData) => ({
      ...prevData,
      [key]: e.target.value,
    }));
  };

  const handleSave = () => {
    onSave(newData);
    setNewData({});
  };

  return (
    <Modal
      title={date.format("YYYY년 MM월 DD일")}
      visible={visible}
      onCancel={onCancel}
      footer={
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div>
            <div
              className="breakfast"
              style={{
                display: "flex",
                alignItems: "center",
                textAlign: "left",
              }}
            >
              <p style={{ margin: 10 }}>아침</p>
              <input
                type="text"
                value={newData.breakfast || ""}
                onChange={(e) => handleChange(e, "breakfast")}
              />
            </div>
            <div
              className="lunch"
              style={{
                display: "flex",
                alignItems: "center",
                textAlign: "left",
              }}
            >
              <p style={{ margin: 10 }}>점심</p>
              <input
                type="text"
                value={newData.lunch || ""}
                onChange={(e) => handleChange(e, "lunch")}
              />
            </div>
            <div
              className="dinner"
              style={{
                display: "flex",
                alignItems: "center",
                textAlign: "left",
              }}
            >
              <p style={{ margin: 10 }}>저녁</p>
              <input
                type="text"
                value={newData.dinner || ""}
                onChange={(e) => handleChange(e, "dinner")}
              />
            </div>
          </div>
        </div>
      }
    >
      <Button onClick={handleSave}>저장</Button>
    </Modal>
  );
}

export default MyModal;
