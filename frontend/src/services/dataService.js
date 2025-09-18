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
