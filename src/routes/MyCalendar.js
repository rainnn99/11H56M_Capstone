import { Calendar, Button } from 'antd';
import { useState } from 'react';
import MyModal from './MyModal';
import MyNav from "./../MyNav";

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
  
    const handleEdit = () => {
      setSelectedDate(value);
      setVisible(true);
    };
    
    let totalAmount = 0;
    if(dayData) {
      totalAmount = parseInt(dayData.breakfastValue) + parseInt(dayData.lunchValue) + parseInt(dayData.dinnerValue);
    }
    return (
      <div>
        {/* <MyNav /> */}
        {dayData ? (
          <div>
            <p style={{ marginBottom: "0px", textAlign: "left"}}><span className='calendarMenu'>아침 </span> {dayData.breakfast}</p>
            <p style={{ marginBottom: "0px", textAlign: "left" }}><span className='calendarMenu'>점심 </span>{dayData.lunch}</p>
            <p style={{ marginBottom: "0px", textAlign: "left" }}><span className='calendarMenu'>저녁 </span>{dayData.dinner}</p>
            <p style={{ marginBottom: "0px", textAlign: "left" }}><span className='calendar_kcal'>Kcal </span>{dayData.kcal}</p>
            <p style={{ marginBottom: "0px", textAlign: "left" }}><span className='calendarMenu'>총 식비: </span>{totalAmount}</p>
            <Button type="dashed" onClick={handleEdit} style={{ marginTop: 10, textAlign: "right" }}>수정</Button>
          </div>
        ) : (
          <Button type="dashed" onClick={() => handleSelect(value)} style={{ marginTop: 10, textAlign: "right" }}>추가</Button>
        )}
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
        <h1>나의 식단 캘린더</h1>
      </div>
      <div>
        <Calendar
          style={{ maxWidth: '1100px', margin: '0 auto', border: 'none' }}
          dateCellRender={dateCellRender}
          headerRender={({ value, type, onChange }) => {
            // const year = value.format('YYYY');
            const month = value.format('M월');

            return (
              <div style={{ padding: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div className="year" style={{ marginRight: 'auto' }}>{`${month}`}</div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Button type="ghost" style={{ borderColor: 'black', color: 'black', margin: '0 20px' }} onClick={() => onChange(value.clone().subtract(1, type))}>◀</Button>
                  <Button type="ghost" style={{  borderColor: 'black', color: 'black' }} onClick={() => onChange(value.clone().add(1, type))}>▶</Button>
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