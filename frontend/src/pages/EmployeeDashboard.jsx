import React, { useState, useEffect } from 'react';
import { dataService } from '../services/dataService';

import { Loader, ErrorState, Header, Section } from '../components/ui';
import { ProfileCard, PerformanceReviewSummary, AttendanceTable, ProfileEditForm, AttendanceChart } from '../components/employee_dashboard';

const EmployeeDashboard = () => {
    const [dashboardData, setDashboardData] = useState({
        profile: null,
        attendance: null,
        reviews: null
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditingProfile, setIsEditingProfile] = useState(false);

    const loadDashboardData = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await dataService.getDashboardData();
            setDashboardData(data);
        } catch (err) {
            setError('Failed to load dashboard data. Please try again.');
            console.error('Dashboard data loading error:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadDashboardData();
    }, []);

    const handleProfileUpdate = (updatedProfile) => {
        setDashboardData(prev => ({
            ...prev,
            profile: updatedProfile
        }));
    };

    const handleEditProfile = () => {
        setIsEditingProfile(true);
    };

    const handleCancelEdit = () => {
        setIsEditingProfile(false);
    };

    if (loading) {
        return <Loader />;
    }

    if (error) {
        return <ErrorState message={error} onRetry={loadDashboardData} />;
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Header
                title="Employee Dashboard"
                subtitle={`Welcome back, ${dashboardData.profile?.name || 'Employee'}! Here's your overview.`}
                onRefresh={loadDashboardData}
                loading={loading}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-1">
                        {isEditingProfile ? (
                            <ProfileEditForm
                                profile={dashboardData.profile}
                                onUpdate={handleProfileUpdate}
                                onCancel={handleCancelEdit}
                            />
                        ) : (
                            <Section title="Employee Profile" collapsible={false}>
                                <ProfileCard 
                                    profile={dashboardData.profile} 
                                    onEdit={handleEditProfile}
                                />
                            </Section>
                        )}
                    </div>

                    <div className="lg:col-span-2 space-y-6">
                        <Section title="Attendance Visualization" defaultOpen>
                            <AttendanceChart attendanceData={dashboardData.attendance} />
                        </Section>

                        <Section title="Attendance History" defaultOpen>
                            <AttendanceTable attendanceData={dashboardData.attendance} />
                        </Section>

                        <Section title="Performance Review Summary" defaultOpen>
                            <PerformanceReviewSummary reviewsData={dashboardData.reviews} />
                        </Section>
                    </div>
                </div>
            </div>

            <footer className="bg-white border-t border-gray-200 mt-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="text-center text-sm text-gray-500">
                        <p>© 2025 Max ERP - Employee Dashboard. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default EmployeeDashboard;
