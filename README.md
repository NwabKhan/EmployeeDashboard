# Max ERP - Employee Dashboard

A modern, responsive Employee Dashboard built with React, featuring attendance tracking, performance reviews, profile management, and data visualization.

## 🚀 Features

### 📊 Dashboard Overview
- **Employee Profile Management** - View and edit personal information
- **Attendance Visualization** - Interactive charts showing attendance patterns
- **Attendance History** - Detailed table with filtering and pagination
- **Performance Reviews** - Professional review summaries with trends

### 🔧 Profile Management
- **Editable Profile** - Update name, phone, and department
- **Form Validation** - Real-time validation with helpful error messages
- **Toast Notifications** - Success/error feedback using react-hot-toast
- **Local State Management** - Changes persist during session

### 📈 Data Visualization
- **Pie Chart** - Attendance distribution (Present/Absent/Late/Leave)
- **Bar Chart** - Weekly attendance breakdown
- **Summary Cards** - Key metrics at a glance
- **Responsive Charts** - Built with Recharts library

### 🎨 Modern UI/UX
- **Responsive Design** - Works on desktop, tablet, and mobile
- **Professional Styling** - Clean, modern interface with Tailwind CSS
- **Interactive Components** - Collapsible sections, hover effects
- **Accessibility** - Proper ARIA labels and keyboard navigation

## 🛠️ Technology Stack

- **Frontend Framework:** React 19.1.1
- **Styling:** Tailwind CSS 4.1.13
- **Form Management:** React Hook Form 7.62.0
- **Data Visualization:** Recharts 3.2.1
- **Notifications:** React Hot Toast 2.6.0
- **UI Components:** Headless UI 2.2.8
- **Icons:** Lucide React 0.544.0
- **Build Tool:** Vite
- **Routing:** React Router DOM 7.9.1

## 📁 Project Structure

```
frontend/
├── public/
│   └── mock-data/           # JSON mock data files
├── src/
│   ├── components/
│   │   ├── ui/              # Reusable UI components
│   │   │   ├── Button.jsx
│   │   │   ├── Input.jsx
│   │   │   ├── Select.jsx
│   │   │   ├── Loader.jsx
│   │   │   ├── ErrorState.jsx
│   │   │   ├── Header.jsx
│   │   │   ├── Section.jsx
│   │   │   ├── DateFilter.jsx
│   │   │   ├── ToastProvider.jsx
│   │   │   └── index.js
│   │   └── employee_dashboard/  # Dashboard-specific components
│   │       ├── ProfileCard.jsx
│   │       ├── ProfileEditForm.jsx
│   │       ├── AttendanceChart.jsx
│   │       ├── AttendanceTable.jsx
│   │       ├── PerformanceReviewSummary.jsx
│   │       └── index.js
│   ├── pages/
│   │   └── EmployeeDashboard.jsx
│   ├── services/
│   │   └── dataService.js   # Mock data service
│   ├── App.jsx
│   └── main.jsx
├── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/NwabKhan/EmployeeDashboard.git
   cd EmployeeDashboard/frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` (or the port shown in terminal)

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📊 Mock Data Structure

The application uses JSON mock data files located in `public/mock-data/`:

### Employee Profile (`employeeProfile.json`)
```json
{
  "id": "EMP001",
  "name": "John Doe",
  "role": "Senior Software Engineer",
  "department": "Engineering",
  "phone": "+1234567890",
  "location": "New York, NY",
  "joinedOn": "2022-03-15",
  "avatarUrl": "https://example.com/avatar.jpg"
}
```

### Attendance Data (`attendance.json`)
```json
[
  {
    "date": "2024-01-15",
    "checkIn": "09:00",
    "checkOut": "17:30",
    "totalMinutes": 510,
    "status": "present"
  }
]
```

### Performance Reviews (`performanceReviews.json`)
```json
[
  {
    "id": "REV001",
    "period": "2024 Q1",
    "score": 4.2,
    "rating": "green",
    "reviewer": "Jane Smith"
  }
]
```

## ✨ Key Features Explained

### 1. Profile Edit Form
- **Validation Rules:**
  - Name: 4-50 characters, letters and spaces only
  - Phone: 10-15 digits, optional + prefix
  - Department: Required selection from predefined list
- **Real-time validation** with `mode: "onChange"`
- **Loading states** during form submission
- **Success notifications** with toast messages

### 2. Attendance Visualization
- **Last 30 days analysis** - Automatically filters recent data
- **Multiple chart types:**
  - Pie chart for overall distribution
  - Stacked bar chart for weekly breakdown
- **Summary metrics:**
  - Total present days
  - Total absent days (including leave)
  - Attendance rate percentage

### 3. Data Management
- **Local state persistence** - Changes last during session
- **Error handling** - Graceful fallbacks for missing data
- **Loading states** - Smooth user experience
- **Mock service layer** - Simulates API calls

### 4. Responsive Design
- **Mobile-first approach** - Works on all screen sizes
- **Flexible grid layouts** - Adapts to different viewports
- **Touch-friendly** - Optimized for mobile interactions

## 🔧 Assumptions Made

### Data Assumptions
1. **Mock Data Only** - No real backend integration; all data is static JSON
2. **Local Storage** - Profile changes persist only during browser session
3. **Date Format** - All dates in ISO format (YYYY-MM-DD)
4. **Phone Numbers** - International format with optional + prefix
5. **Attendance Status** - Limited to: present, late, absent, leave, weekend

### Business Logic Assumptions
1. **30-Day Window** - Charts show last 30 days of attendance data
2. **Working Days** - Weekends are tracked but treated separately
3. **Department List** - Fixed list of 8 departments (Engineering, Marketing, etc.)
4. **Performance Ratings** - Color-coded system (green/yellow/red)
5. **Attendance Rate** - Calculated as present days / total working days

### Technical Assumptions
1. **Modern Browsers** - Supports ES6+ features
2. **JavaScript Enabled** - Application requires JS to function
3. **Network Access** - For loading external fonts and potential API calls
4. **Local Development** - Optimized for development environment
5. **Single User** - No authentication or multi-user support

### UI/UX Assumptions
1. **Desktop Primary** - Optimized for desktop but responsive
2. **English Language** - All text in English only
3. **Standard Timezone** - No timezone conversion logic
4. **Toast Duration** - 3-second notification display
5. **Form Validation** - Client-side only, no server validation

## 🎯 Future Enhancements

- **Backend Integration** - Connect to real API endpoints
- **Authentication** - User login and session management
- **Data Persistence** - Real database storage
- **Advanced Charts** - More visualization options
- **Export Features** - PDF/Excel export capabilities
- **Notifications** - Real-time updates and alerts
- **Multi-language** - Internationalization support
- **Dark Mode** - Theme switching capability

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is created for demonstration purposes as part of a technical assessment.

## 👨‍💻 Developer

**Nwab Khan**
- GitHub: [@NwabKhan](https://github.com/NwabKhan)
- Project: Employee Dashboard

---

