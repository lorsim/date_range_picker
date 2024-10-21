# Date Range Picker

The date range picker component was built with React and TypeScript.

## Table of Contents

1. [Setup Instructions](#setup-instructions)
2. [Component Architecture](#component-architecture)
3. [Technologies Used](#technologies-used)
4. [Key Design Decisions](#key-design-decisions)
5. [Implementation Details](#implementation-details)

## Setup Instructions

To get the Date Range Picker component running, follow these steps:

1. Ensure you have Node.js (version 14 or later) and npm installed on your system.

2. Install the required dependencies:

   ```
   npm install
   ```

3. Run your application:
   ```
   npm start
   ```

## Component Architecture

The Date Range Picker is composed of the following main parts:

1. **DateRangePicker**: The main component that orchestrates the date selection logic and renders the calendar interface.
2. **Styled Components**: A set of styled components that define the look of the date picker.

The component uses a dual-pane layout to display two months side by side, allowing for easy selection of date ranges spanning multiple months.

## Technologies Used

- **React**: For building the user interface and managing component state.
- **TypeScript**: For adding static typing to the JavaScript code, improving code quality.
- **styled-components**: For creating modular, reusable CSS-in-JS styles.

## Key Design Decisions

1. **Dual-Pane Layout**: We chose a dual-pane layout to display two months simultaneously, making it easier for users to select date ranges spanning multiple months without excessive navigation.

2. **Controlled Component**: The DateRangePicker is designed as a controlled component, allowing parent components to manage and respond to state changes.

3. **Customizability**: The component accepts various props (e.g., `minDate`, `maxDate`, `maxRange`, `disabledDates`) to allow for easy customization of its behavior.

4. **Advanced Mode**: An optional advanced mode is included to demonstrate how additional features (like excluding weekends) can be incorporated into the component.

5. **Accessibility**: The component is designed with accessibility in mind, using semantic HTML and ARIA attributes.

## Implementation Details

1. **Date Selection Logic**: The component uses the `useState` hook to manage the selected date range. The `handleDateClick` function implements the logic for selecting start and end dates.

2. **Date Disabling**: The `isDateDisabled` function checks various conditions (min/max dates, explicitly disabled dates, weekends in advanced mode) to determine if a date should be disabled.

3. **Calendar Rendering**: The `renderCalendar` function dynamically generates the calendar grid for each month, taking into account the number of days and the starting day of the week.

4. **Month Navigation**: The `navigateMonth` function allows users to move between months, updating both the left and right calendar panes simultaneously.

5. **Styling**: Styled components are used to create a modular and easily customizable styling system. The styles are defined in a separate `styles.ts` file for better organization.

6. **Animations**: CSS animations are used to provide smooth transitions when navigating between months, enhancing the user experience.

7. **Responsive Design**: The component uses flexbox and grid layouts to ensure responsiveness across different screen sizes.

By leveraging these implementation details and design decisions, the Date Range Picker provides a flexible, user-friendly, and performant solution for date range selection in web applications.
