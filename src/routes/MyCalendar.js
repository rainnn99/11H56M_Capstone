import { Calendar, Button } from 'antd';
import { useState } from 'react';
import MyModal from './MyModal';

function MyCalendar() {
  const [visible, setVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [data, setData] = useState({});

  const handleCancel = () => {
    setVisible(false);
  };

  const handleSelect = (date) => {
    setSelectedDate(date);
    setVisible(true);
  };

  const dateCellRender = (value) => {
    const dateString = value.format('YYYY-MM-DD');
    const dayData = data[dateString];

    return (
      <div>
        {dayData && (
          <div>
            <p style={{marginBottom:"0px"}}>아침: {dayData.breakfast}</p>
            <p style={{marginBottom:"0px"}}>점심: {dayData.lunch}</p>
            <p style={{marginBottom:"0px"}}>저녁: {dayData.dinner}</p>
            <p style={{marginBottom:"0px"}}>Kcal: </p>
          </div>
        )}
        <Button type="dashed" onClick={() => handleSelect(value)}>추가</Button>
      </div>
    );
  };

  const saveData = (date, newData) => {
    const dateString = date.format('YYYY-MM-DD');
    setData(prevData => ({
      ...prevData,
      [dateString]: newData,
    }));
  };
  
  return (
    <div>
      <div className="CalName">
        <h1>이번 달 내가 먹은건?</h1>
      </div>
      <div>
        <Calendar
          style={{ maxWidth: '1100px', margin: '0 auto', border: 'none' }}
          dateCellRender={dateCellRender}
          headerRender={({ value, type, onChange }) => {
            const year = value.format('YYYY');
            const month = value.format('M월');

            return (
              <div style={{ padding: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div className="year" style={{ marginRight: 'auto' }}>{`${year}년 ${month}`}</div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Button type="ghost" style={{ borderColor: '#f78923', color: '#f78923', margin: '0 20px' }} onClick={() => onChange(value.clone().subtract(1, type))}>◀</Button>
                  <Button type="ghost" style={{ borderColor: '#f78923', color: '#f78923' }} onClick={() => onChange(value.clone().add(1, type))}>▶</Button>
                </div>
              </div>
            )
          }}
          onSelect={() => { }}
        />

        {selectedDate && (
          <MyModal
            visible={visible}
            onCancel={handleCancel}
            onSave={(newData) => saveData(selectedDate, newData)}
            date={selectedDate}
            data={data[selectedDate.format('YYYY-MM-DD')]}
          />
        )}
      </div>
    </div>
  );
}

export default MyCalendar;