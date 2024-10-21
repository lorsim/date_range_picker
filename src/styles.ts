import styled, { css, keyframes } from "styled-components";

export const DatePickerWrapper = styled.div`
  font-family: Arial, sans-serif;
  width: 60rem;
  background-color: #ffffff;
  border-radius: 0.8rem;
  box-shadow: 0 0.4rem 0.6rem rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

export const CalendarContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const CalendarPane = styled.div`
  width: 50%;
  padding: 1.6rem;
`;

export const MonthHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.6rem;
`;

export const MonthTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: bold;
  margin: 0;
`;

const buttonStyles = css`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.6rem;
  color: #333;
  padding: 0.4rem 0.8rem;
  border-radius: 0.4rem;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f0f0f0;
  }

  &:focus {
    outline: 0.2rem solid #007bff;
    outline-offset: 0.2rem;
  }
`;

export const NavigationButton = styled.button`
  ${buttonStyles}
`;

export const WeekdayHeader = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.4rem;
  margin-bottom: 0.8rem;
`;

export const WeekdayLabel = styled.span`
  text-align: center;
  font-size: 1.4rem;
  color: #777;
`;

export const DaysGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.4rem;
`;

interface DayButtonProps {
  isSelected: boolean;
  isInRange: boolean | null;
  isDisabled: boolean;
}

export const DayButton = styled.button<DayButtonProps>`
  ${buttonStyles}
  width: 100%;
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;

  ${({ isSelected, isInRange, isDisabled }) => css`
    background-color: ${isSelected
      ? "#007bff"
      : isInRange
      ? "#e6f2ff"
      : "transparent"};
    color: ${isSelected ? "#ffffff" : isDisabled ? "#ccc" : "#333"};
    cursor: ${isDisabled ? "not-allowed" : "pointer"};
    pointer-events: ${isDisabled ? "none" : "auto"};

    &:hover {
      background-color: ${isSelected ? "#0056b3" : "#f0f0f0"};
    }
  `}
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

export const AnimatedCalendarPane = styled(CalendarPane)`
  animation: ${fadeIn} 0.3s ease-in-out;
`;

export const AdvancedOptionsContainer = styled.div`
  padding: 1.6rem;
  border-top: 0.1rem solid #e0e0e0;
`;

export const AdvancedOptionLabel = styled.label`
  display: flex;
  align-items: center;
  margin-bottom: 0.8rem;
  font-size: 1.4rem;
`;

export const AdvancedOptionInput = styled.input`
  margin-right: 0.8rem;
`;
