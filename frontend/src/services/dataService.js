// Mock data service to simulate API calls
const BASE_PATH = '/mock-data';

export const dataService = {
  // Load employee profile data
  async getEmployeeProfile() {
    try {
      const response = await fetch(`${BASE_PATH}/employeeProfile.json`);
      if (!response.ok) {
        throw new Error('Failed to fetch employee profile');
      }
      return await response.json();
    } catch (error) {
      console.error('Error loading employee profile:', error);
      // Return fallback data
      return {
        id: "emp-1024",
        name: "Ayesha Khan",
        role: "Frontend Engineer",
        department: "Engineering",
        phone: "+923001112223",
        email: "ayesha.khan@example.com",
        avatarUrl: "https://i.pravatar.cc/150?img=47",
        location: "Karachi",
        joinedOn: "2022-03-14"
      };
    }
  },

  // Load attendance data
  async getAttendanceData() {
    try {
      const response = await fetch(`${BASE_PATH}/attendance.json`);
      if (!response.ok) {
        throw new Error('Failed to fetch attendance data');
      }
      return await response.json();
    } catch (error) {
      console.error('Error loading attendance data:', error);
      // Return empty array as fallback
      return [];
    }
  },

  // Load performance reviews data
  async getPerformanceReviews() {
    try {
      const response = await fetch(`${BASE_PATH}/performanceReviews.json`);
      if (!response.ok) {
        throw new Error('Failed to fetch performance reviews');
      }
      return await response.json();
    } catch (error) {
      console.error('Error loading performance reviews:', error);
      // Return empty array as fallback
      return [];
    }
  },

  // Load all dashboard data
  async getDashboardData() {
    try {
      const [profile, attendance, reviews] = await Promise.all([
        this.getEmployeeProfile(),
        this.getAttendanceData(),
        this.getPerformanceReviews()
      ]);

      return {
        profile,
        attendance,
        reviews
      };
    } catch (error) {
      console.error('Error loading dashboard data:', error);
      throw error;
    }
  }
};
