import { Calendar, Button } from 'antd';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import MyModal from './MyModal';
import axios from 'axios';

function MyCalendar() {
  const [visible, setVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [data, setData] = useState({});
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  let navigate = useNavigate();

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
    
    return (
      <div>
        {dayData ? (
          <div>
            <p style={{ marginBottom: "0px", textAlign: "left" }}>아침: {dayData.breakfast}</p>
            <p style={{ marginBottom: "0px", textAlign: "left" }}>점심: {dayData.lunch}</p>
            <p style={{ marginBottom: "0px", textAlign: "left" }}>저녁: {dayData.dinner}</p>
            <p style={{ marginBottom: "0px", textAlign: "left" }}>Kcal: </p>
           
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
  
    const requestBody = {
      날짜: dateString,
      음식이름1: newData.breakfast,
      음식이름2: newData.lunch,
      음식이름3: newData.dinner,
    };
  
    axios.post('/calender', requestBody)
      .then(response => {
        const return_code = response.data;
        console.log(return_code)
        if (return_code.success) {
          console.log(return_code.success)
          navigate("/mycalendar"); //홈화면으로
        } else {
          alert("사용자의 데이터를 입력하는데 실패했습니다");
        }
      })
      .catch(error => {
        console.error("Error:", error);
        alert("사용자의 데이터를 입력하는데에 실패했습니다. 나중에 다시 시도해주세요.");
      });
  
    setData(prevData => ({
      ...prevData,
      [dateString]: newData,
    }));
  };

  const fetchData = (year, month) => {
    const monthString = month.replace('월', '').padStart(2, '0');
    const yearMonthString = `${year}${monthString}`;

    axios.get(`/calender/${yearMonthString}`)
      .then(response => {
        const receivedData = response.data;
        console.log(receivedData)
        const modifiedData = transformData(receivedData); // 데이터 형식 변환 함수 호출
        setData(modifiedData);
      })
      .catch(error => {
        // 오류 처리
      });
  };
  
  const transformData = (data) => {
    const modifiedData = {};

    data.forEach(item => {
      const { 날짜, 음식이름1, 음식이름2, 음식이름3 } = item;
  
      if (!modifiedData[날짜]) {
        modifiedData[날짜] = [];
      }
  
      if (음식이름1) {
        modifiedData[날짜].push({
          음식이름: 음식이름1,
          시간: '아침',
          칼로리: '',
        });
      }
  
      if (음식이름2) {
        modifiedData[날짜].push({
          음식이름: 음식이름2,
          시간: '점심',
          칼로리: '',
        });
      }
  
      if (음식이름3) {
        modifiedData[날짜].push({
          음식이름: 음식이름3,
          시간: '저녁',
          칼로리: '',
        });
      }
    });
    setData(modifiedData);
    return modifiedData;
  };
  
  useEffect(() => {
    // 초기 렌더링 이후에만 실행되도록 조건문 추가
    if (year !== '' && month !== '') {
      fetchData(year, month);
    }
  }, [year, month]);

  useEffect(() => {
    // 컴포넌트가 마운트될 때 현재 날짜로 year와 month 설정
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear().toString();
    const currentMonth = (currentDate.getMonth() + 1).toString();
    setYear(currentYear);
    setMonth(currentMonth);
  }, []);

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
            const currentYear = value.format('YYYY');
            const currentMonth = value.format('M월');
            setYear(currentYear);
            setMonth(currentMonth);

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