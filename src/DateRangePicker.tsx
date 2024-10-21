import React, { useState, useCallback, useEffect } from 'react';
import {
  DatePickerWrapper,
  CalendarContainer,
  AnimatedCalendarPane,
  MonthHeader,
  MonthTitle,
  NavigationButton,
  WeekdayHeader,
  WeekdayLabel,
  DaysGrid,
  DayButton,
  AdvancedOptionsContainer,
  AdvancedOptionLabel,
  AdvancedOptionInput,
} from './styles';

interface DateRange {
  startDate: Date | null;
  endDate: Date | null;
}

interface DateRangePickerProps {
  onChange: (range: DateRange) => void;
  minDate?: Date;
  maxDate?: Date;
  maxRange?: number;
  disabledDates?: Date[];
  advancedMode?: boolean;
}

const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const DateRangePicker: React.FC<DateRangePickerProps> = ({
  onChange,
  minDate = new Date(),
  maxDate,
  maxRange = 30,
  disabledDates = [],
  advancedMode = false,
}) => {
  const [leftMonth, setLeftMonth] = useState(new Date());
  const [rightMonth, setRightMonth] = useState(new Date(new Date().setMonth(new Date().getMonth() + 1)));
  const [selectedRange, setSelectedRange] = useState<DateRange>({ startDate: null, endDate: null });
  const [excludeWeekends, setExcludeWeekends] = useState(false);

  const isDateDisabled = useCallback((date: Date) => {
    const isBeforeMin = date < new Date(minDate.setHours(0, 0, 0, 0));
    const isAfterMax = maxDate && date > new Date(maxDate.setHours(23, 59, 59, 999));
    const isDisabledDate = disabledDates.some(disabledDate => 
      disabledDate.toDateString() === date.toDateString()
    );
    const isWeekend = excludeWeekends && (date.getDay() === 0 || date.getDay() === 6);

    return isBeforeMin || isAfterMax || isDisabledDate || isWeekend;
  }, [minDate, maxDate, disabledDates, excludeWeekends]);

  const handleDateClick = useCallback((date: Date) => {
    if (isDateDisabled(date)) return;

    setSelectedRange(prevRange => {
      if (!prevRange.startDate || (prevRange.startDate && prevRange.endDate)) {
        return { startDate: date, endDate: null };
      } else {
        const newStartDate = prevRange.startDate < date ? prevRange.startDate : date;
        const newEndDate = prevRange.startDate < date ? date : prevRange.startDate;
        
        if (maxRange) {
          const daysDiff = (newEndDate.getTime() - newStartDate.getTime()) / (1000 * 3600 * 24);
          if (daysDiff > maxRange) return prevRange;
        }

        return { startDate: newStartDate, endDate: newEndDate };
      }
    });
  }, [isDateDisabled, maxRange]);

  const renderCalendar = (month: Date) => {
    const firstDayOfMonth = new Date(month.getFullYear(), month.getMonth(), 1);
    const lastDayOfMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0);
    const daysInMonth = lastDayOfMonth.getDate();
    const startingDayOfWeek = firstDayOfMonth.getDay();

    const days = [];
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(<DayButton key={`empty-${i}`} isSelected={false} isInRange={false} isDisabled={true} />);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(month.getFullYear(), month.getMonth(), day);
      const isSelected = selectedRange.startDate?.toDateString() === date.toDateString() ||
                         selectedRange.endDate?.toDateString() === date.toDateString();
      const isInRange = selectedRange.startDate && selectedRange.endDate &&
                        date > selectedRange.startDate && date < selectedRange.endDate;
      const isDisabled = isDateDisabled(date);

      days.push(
        <DayButton
          key={day}
          onClick={() => handleDateClick(date)}
          isSelected={isSelected}
          isInRange={isInRange}
          isDisabled={isDisabled}
          aria-label={`${MONTHS[month.getMonth()]} ${day}, ${month.getFullYear()}`}
        >
          {day}
        </DayButton>
      );
    }

    return days;
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    const monthDiff = direction === 'next' ? 1 : -1;
    setLeftMonth(prevMonth => {
      const newMonth = new Date(prevMonth);
      newMonth.setMonth(prevMonth.getMonth() + monthDiff);
      return newMonth;
    });
    setRightMonth(prevMonth => {
      const newMonth = new Date(prevMonth);
      newMonth.setMonth(prevMonth.getMonth() + monthDiff);
      return newMonth;
    });
  };

  useEffect(() => {
    if (selectedRange.startDate && selectedRange.endDate) {
      onChange(selectedRange);
    }
  }, [selectedRange, onChange]);

  useEffect(() => {
    setSelectedRange({ startDate: null, endDate: null });
  }, [excludeWeekends]);

  return (
    <DatePickerWrapper>
      <CalendarContainer>
        <AnimatedCalendarPane>
          <MonthHeader>
            <NavigationButton onClick={() => navigateMonth('prev')} aria-label="Previous month">
              &lt;
            </NavigationButton>
            <MonthTitle>{`${MONTHS[leftMonth.getMonth()]} ${leftMonth.getFullYear()}`}</MonthTitle>
          </MonthHeader>
          <WeekdayHeader>
            {DAYS_OF_WEEK.map(day => <WeekdayLabel key={day}>{day}</WeekdayLabel>)}
          </WeekdayHeader>
          <DaysGrid>
            {renderCalendar(leftMonth)}
          </DaysGrid>
        </AnimatedCalendarPane>
        <AnimatedCalendarPane>
          <MonthHeader>
            <MonthTitle>{`${MONTHS[rightMonth.getMonth()]} ${rightMonth.getFullYear()}`}</MonthTitle>
            <NavigationButton onClick={() => navigateMonth('next')} aria-label="Next month">
              &gt;
            </NavigationButton>
          </MonthHeader>
          <WeekdayHeader>
            {DAYS_OF_WEEK.map(day => <WeekdayLabel key={day}>{day}</WeekdayLabel>)}
          </WeekdayHeader>
          <DaysGrid>
            {renderCalendar(rightMonth)}
          </DaysGrid>
        </AnimatedCalendarPane>
      </CalendarContainer>
      {advancedMode && (
        <AdvancedOptionsContainer>
          <AdvancedOptionLabel>
            <AdvancedOptionInput
              type="checkbox"
              checked={excludeWeekends}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setExcludeWeekends(e.target.checked)}
            />
            Exclude weekends
          </AdvancedOptionLabel>
        </AdvancedOptionsContainer>
      )}
    </DatePickerWrapper>
  );
};

export default DateRangePicker;