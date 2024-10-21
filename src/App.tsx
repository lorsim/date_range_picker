import { useState } from 'react';
import styled from 'styled-components';
import DateRangePicker from './DateRangePicker';

const CalendarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  font-family: Arial, sans-serif;
`;

const Title = styled.h1`
  margin-bottom: 2rem;
`;

const SelectedRange = styled.div`
  margin-top: 2rem;
  font-size: 1.6rem;
  text-align: center;
`;

const App: React.FC = () => {
  const [dateRange, setDateRange] = useState<{ startDate: Date | null; endDate: Date | null }>({ 
    startDate: null, 
    endDate: null 
  });


  const handleDateRangeChange = (range: { startDate: Date | null; endDate: Date | null }) => {
    setDateRange(range);
  };

  return (
    <CalendarWrapper>
      <Title>Date Range Picker</Title>
      <DateRangePicker
        onChange={handleDateRangeChange}
        minDate={new Date()}
        maxDate={new Date(new Date().setFullYear(new Date().getFullYear() + 1))}
        maxRange={30}
        disabledDates={[new Date(new Date().setDate(new Date().getDate() + 5))]}
        advancedMode={true}
      />
      <SelectedRange>
        <p>Selected Range:</p>
        <p>Start: {dateRange.startDate ? dateRange.startDate.toDateString() : 'Not selected'}</p>
        <p>End: {dateRange.endDate ? dateRange.endDate.toDateString() : 'Not selected'}</p>
      </SelectedRange>
    </CalendarWrapper>
  );
};

export default App;
